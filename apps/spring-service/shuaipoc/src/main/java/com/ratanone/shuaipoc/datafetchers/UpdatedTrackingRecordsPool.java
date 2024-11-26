package com.ratanone.shuaipoc.datafetchers;

import com.ratanone.shuaipoc.generated.types.TrackingRecord;
import com.ratanone.shuaipoc.generated.types.TrackingRecordChangeNotification;
import com.ratanone.shuaipoc.generated.types.TrackingRecordChangeStatus;
import java.util.ArrayList;
import java.util.List;
import reactor.core.CoreSubscriber;
import reactor.core.publisher.Flux;

public class UpdatedTrackingRecordsPool {
  private final List<TrackingRecordChangeNotification> addedTrackingRecords = new ArrayList<>();
  private final List<TrackingRecordChangeNotification> updatedTrackingRecords = new ArrayList<>();
  private final List<TrackingRecordChangeNotification> removedTrackingRecords = new ArrayList<>();
  List<CoreSubscriber<? super List<TrackingRecordChangeNotification>>> subscribers =
      new ArrayList<>();

  Flux<List<TrackingRecordChangeNotification>> publisher =
      new Flux<>() {
        @Override
        public void subscribe(
            CoreSubscriber<? super List<TrackingRecordChangeNotification>> coreSubscriber) {
          subscribers.add(coreSubscriber);
        }
      };

  public void add(TrackingRecord trackingRecord) {
    addedTrackingRecords.add(
        TrackingRecordChangeNotification.newBuilder()
            .data(trackingRecord)
            .status(TrackingRecordChangeStatus.ADDED)
            .build());
    notifySubscribers();
  }

  public void addAll(List<TrackingRecord> records) {
    records.forEach(
        record ->
            addedTrackingRecords.add(
                TrackingRecordChangeNotification.newBuilder()
                    .data(record)
                    .status(TrackingRecordChangeStatus.ADDED)
                    .build()));
    notifySubscribers();
  }

  public void remove(TrackingRecord trackingRecord) {
    removedTrackingRecords.add(
        TrackingRecordChangeNotification.newBuilder()
            .data(trackingRecord)
            .status(TrackingRecordChangeStatus.DELETED)
            .build());
    notifySubscribers();
  }

  public void removeAll(List<TrackingRecord> records) {
    records.forEach(
        record ->
            removedTrackingRecords.add(
                TrackingRecordChangeNotification.newBuilder()
                    .data(record)
                    .status(TrackingRecordChangeStatus.DELETED)
                    .build()));
    notifySubscribers();
  }

  public void update(TrackingRecord trackingRecord) {
    updatedTrackingRecords.add(
        TrackingRecordChangeNotification.newBuilder()
            .data(trackingRecord)
            .status(TrackingRecordChangeStatus.UPDATED)
            .build());
    notifySubscribers();
  }

  public void updateAll(List<TrackingRecord> records) {
    records.forEach(
        record ->
            updatedTrackingRecords.add(
                TrackingRecordChangeNotification.newBuilder()
                    .data(record)
                    .status(TrackingRecordChangeStatus.UPDATED)
                    .build()));
    notifySubscribers();
  }

  private void notifySubscribers() {
    List<TrackingRecordChangeNotification> allChanges = new ArrayList<>();
    allChanges.addAll(addedTrackingRecords);
    allChanges.addAll(updatedTrackingRecords);
    allChanges.addAll(removedTrackingRecords);

    subscribers.forEach(s -> s.onNext(allChanges));

    addedTrackingRecords.clear();
    updatedTrackingRecords.clear();
    removedTrackingRecords.clear();
  }

  public Flux<List<TrackingRecordChangeNotification>> getPublisher() {
    return publisher;
  }
}
