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
  private GenericConfigService genericConfigService;

  @DgsQuery
  public List<GenericConfig> genericConfigs(@InputArgument("query") String query) {
    return genericConfigService.fetchGenericConfigs(query);
  }

  @DgsQuery
  public GenericConfig genericConfig(@InputArgument("key") String key) {
    return genericConfigService.fetchGenericConfig(key);
  }

  @DgsMutation
  public GenericConfig addGenericConfig(
      @InputArgument("addGenericConfigInput") AddGenericConfigInput addGenericConfigInput) {
    GenericConfig gc = genericConfigService.addGenericConfig(addGenericConfigInput);
    updatedGenericConfigsPool.add(gc);
    return gc;
  }

  @DgsMutation
  public Boolean removeGenericConfig(@InputArgument("key") String key) {
    return genericConfigService.removeGenericConfig(key);
  }

  @DgsMutation
  public GenericConfig updateGenericConfig(
      @InputArgument("key") String key,
      @InputArgument("payload") MutableGenericConfigInput payload) {
    GenericConfig gc = genericConfigService.updateGenericConfig(key, payload);
    updatedGenericConfigsPool.add(gc);
    return gc;
  }

  @DgsSubscription
  public Publisher<List<GenericConfig>> onGenericConfigUpdated(
      @InputArgument("query") String query) {
    return updatedGenericConfigsPool.getPublisher();
  }
}
