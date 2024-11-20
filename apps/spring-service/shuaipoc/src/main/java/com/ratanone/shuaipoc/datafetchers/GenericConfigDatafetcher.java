package com.ratanone.shuaipoc.datafetchers;

import com.netflix.graphql.dgs.*;
import com.ratanone.shuaipoc.generated.types.*;
import com.ratanone.shuaipoc.services.GenericConfigService;
import com.ratanone.shuaipoc.services.UpdatedGenericConfigsPool;
import java.util.List;
import org.reactivestreams.Publisher;

@DgsComponent
public class GenericConfigDatafetcher {
  private final UpdatedGenericConfigsPool updatedGenericConfigsPool =
      new UpdatedGenericConfigsPool();
  private GenericConfigService genericConfigService;

  @DgsQuery
  public List<GenericConfig> genericConfigs(@InputArgument("query") String query) {
    return null;
  }

  @DgsQuery
  public GenericConfig genericConfig(@InputArgument("key") String key) {
    return null;
  }

  @DgsMutation
  public GenericConfig addGenericConfig(
      @InputArgument("addGenericConfigInput") AddGenericConfigInput addGenericConfigInput) {
    return null;
  }

  @DgsMutation
  public GenericConfig removeGenericConfig(@InputArgument("key") String key) {
    return null;
  }

  @DgsMutation
  public GenericConfig updateGenericConfig(
      @InputArgument("key") String key,
      @InputArgument("payload") MutableGenericConfigInput payload) {
    return null;
  }

  @DgsSubscription
  // /subscribtions
  public Publisher<List<GenericConfig>> onGenericConfigUpdated(
      @InputArgument("query") String query) {
    return updatedGenericConfigsPool.getPublisher();
  }
}
