package com.ratanone.shuaipoc.datafetchers;

import com.netflix.graphql.dgs.*;
import com.ratanone.shuaipoc.generated.types.TrackingRecord;
import com.ratanone.shuaipoc.generated.types.TrackingRecordChangeNotification;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import java.time.Instant;
import java.util.*;
import java.util.concurrent.*;
import org.reactivestreams.Publisher;
import org.springframework.web.bind.annotation.RequestHeader;

@DgsComponent
public class TrackingRecordDatafetcher {
  private static final long CLEANUP_INTERVAL_MS = 20 * 60 * 1000; // 20 minutes
  private final UpdatedTrackingRecordsPool updatedTrackingRecordsPool =
      new UpdatedTrackingRecordsPool();
  private final List<TrackingRecord> inMemoryRecords =
      Collections.synchronizedList(new ArrayList<>());
  private final ScheduledExecutorService cleanupExecutor =
      Executors.newSingleThreadScheduledExecutor();

  @PostConstruct
  public void init() {
    scheduleCleanup();
  }

  @PreDestroy
  public void destroy() {
    cleanupExecutor.shutdown();
  }

  private void scheduleCleanup() {
    cleanupExecutor.scheduleAtFixedRate(
        this::cleanupOldRecords, CLEANUP_INTERVAL_MS, CLEANUP_INTERVAL_MS, TimeUnit.MILLISECONDS);
  }

  private void cleanupOldRecords() {
    Instant cutoffTime = Instant.now().minusMillis(CLEANUP_INTERVAL_MS);
    List<TrackingRecord> recordsToRemove = new ArrayList<>();

    synchronized (inMemoryRecords) {
      Iterator<TrackingRecord> iterator = inMemoryRecords.iterator();
      while (iterator.hasNext()) {
        TrackingRecord record = iterator.next();
        Instant recordTime = Instant.parse(record.getTimestamp());
        if (recordTime.isBefore(cutoffTime)) {
          recordsToRemove.add(record);
          iterator.remove();
        }
      }
    }

    if (!recordsToRemove.isEmpty()) {
      updatedTrackingRecordsPool.removeAll(recordsToRemove);
    }
  }

  @DgsQuery
  public List<TrackingRecord> trackingRecords(@InputArgument("keys") List<String> keys) {
    synchronized (inMemoryRecords) {
      return inMemoryRecords.stream().filter(record -> keys.contains(record.getKey())).toList();
    }
  }

  @DgsMutation
  public List<TrackingRecord> updateTrackingRecords(
      @InputArgument("keys") List<String> keys, @RequestHeader("x-ratan-user-id") String userId) {
    List<TrackingRecord> newRecords = new ArrayList<>();
    List<TrackingRecord> updatedRecords = new ArrayList<>();
    List<TrackingRecord> deletedRecords = new ArrayList<>();

    synchronized (inMemoryRecords) {
      // Find records where current user previously tracked keys but are not in the new keys list
      List<TrackingRecord> recordsToDelete =
          inMemoryRecords.stream()
              .filter(
                  record -> record.getUserId().equals(userId) && !keys.contains(record.getKey()))
              .toList();

      if (!recordsToDelete.isEmpty()) {
        deletedRecords.addAll(recordsToDelete);
        inMemoryRecords.removeAll(recordsToDelete);
      }
      for (String key : keys) {
        // Find existing record if present
        Optional<TrackingRecord> existingRecord =
            inMemoryRecords.stream().filter(record -> record.getKey().equals(key)).findFirst();

        // Create new record
        TrackingRecord newRecord =
            TrackingRecord.newBuilder()
                .id(UUID.randomUUID().toString())
                .key(key)
                .userId(userId)
                .timestamp(Instant.now().toString())
                .build();

        // Track changes
        if (existingRecord.isPresent()) {
          updatedRecords.add(newRecord);
          inMemoryRecords.remove(existingRecord.get());
        } else {
          newRecords.add(newRecord);
        }

        inMemoryRecords.add(newRecord);
      }
    }

    // Notify subscribers of all changes
    if (!deletedRecords.isEmpty()) {
      updatedTrackingRecordsPool.removeAll(deletedRecords);
    }
    if (!updatedRecords.isEmpty()) {
      updatedTrackingRecordsPool.updateAll(updatedRecords);
    }
    if (!newRecords.isEmpty()) {
      updatedTrackingRecordsPool.addAll(newRecords);
    }

    // Return all modified records
    List<TrackingRecord> allModifiedRecords = new ArrayList<>();
    allModifiedRecords.addAll(newRecords);
    allModifiedRecords.addAll(updatedRecords);
    return allModifiedRecords;
  }

  @DgsSubscription
  public Publisher<List<TrackingRecordChangeNotification>> onTrackingRecordsUpdated(
      @InputArgument("keys") List<String> keys) {
    return updatedTrackingRecordsPool.getPublisher();
  }
}
