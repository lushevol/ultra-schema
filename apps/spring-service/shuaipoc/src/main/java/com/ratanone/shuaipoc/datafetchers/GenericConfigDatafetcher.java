package com.ratanone.shuaipoc.datafetchers;

import com.netflix.graphql.dgs.*;
import com.ratanone.shuaipoc.generated.types.*;
import com.ratanone.shuaipoc.services.GenericConfigService;
import java.util.List;
import org.reactivestreams.Publisher;

@DgsComponent
public class GenericConfigDatafetcher {
  private final UpdatedGenericConfigsPool updatedGenericConfigsPool =
      new UpdatedGenericConfigsPool();
  private final GenericConfigService genericConfigService;

  public GenericConfigDatafetcher(GenericConfigService genericConfigService) {
    this.genericConfigService = genericConfigService;
  }

  @DgsQuery
  public UltraQueryResult genericConfigs(
      @InputArgument("ultraQueryInput") UltraQueryInput ultraQueryInput) {
    return genericConfigService.fetchGenericConfigs(ultraQueryInput);
  }

  @DgsQuery
  public GenericConfig genericConfig(@InputArgument("key") String key) {
    return genericConfigService.fetchGenericConfig(key);
  }

  @DgsMutation
  public GenericConfig addGenericConfig(
      @InputArgument("addGenericConfigInput") AddGenericConfigInput addGenericConfigInput) {
    GenericConfig gc = genericConfigService.addGenericConfig(addGenericConfigInput);
    updatedGenericConfigsPool.add(
        GenericConfigChangeNotification.newBuilder()
            .data(gc)
            .status(GenericConfigChangeStatus.ADDED)
            .build());
    return gc;
  }

  @DgsMutation
  public Boolean removeGenericConfig(@InputArgument("key") String key) {
    GenericConfig gc = genericConfig(key);
    updatedGenericConfigsPool.add(
        GenericConfigChangeNotification.newBuilder()
            .data(gc)
            .status(GenericConfigChangeStatus.DELETED)
            .build());
    return genericConfigService.removeGenericConfig(key);
  }

  @DgsMutation
  public GenericConfig updateGenericConfig(
      @InputArgument("key") String key,
      @InputArgument("payload") MutableGenericConfigInput payload) {
    GenericConfig gc = genericConfigService.updateGenericConfig(key, payload);
    updatedGenericConfigsPool.add(
        GenericConfigChangeNotification.newBuilder()
            .data(gc)
            .status(GenericConfigChangeStatus.UPDATED)
            .build());
    return gc;
  }

  @DgsSubscription
  public Publisher<List<GenericConfigChangeNotification>> onGenericConfigUpdated(
      @InputArgument("query") String query) {
    return updatedGenericConfigsPool.getPublisher();
  }
}
