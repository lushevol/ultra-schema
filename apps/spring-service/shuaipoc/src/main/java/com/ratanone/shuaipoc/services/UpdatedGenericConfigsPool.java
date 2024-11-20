package com.ratanone.shuaipoc.services;

import com.ratanone.shuaipoc.generated.types.GenericConfig;
import java.util.ArrayList;
import java.util.List;
import reactor.core.CoreSubscriber;
import reactor.core.publisher.Flux;

public class UpdatedGenericConfigsPool {
  private final List<GenericConfig> updatedGenericConfigs = new ArrayList<>();
  List<CoreSubscriber<? super List<GenericConfig>>> subscribers = new ArrayList<>();

  Flux<List<GenericConfig>> publisher =
      new Flux<>() {
        @Override
        public void subscribe(CoreSubscriber<? super List<GenericConfig>> coreSubscriber) {
          subscribers.add(coreSubscriber);
        }
      };

  public void add(GenericConfig genericConfig) {
    updatedGenericConfigs.add(genericConfig);
    subscribers.forEach(s -> s.onNext(updatedGenericConfigs));
    updatedGenericConfigs.clear();
  }

  public Flux<List<GenericConfig>> getPublisher() {
    return publisher;
  }
}
