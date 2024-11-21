package com.ratanone.shuaipoc.datafetchers;

import com.ratanone.shuaipoc.generated.types.GenericConfigChangeNotification;
import java.util.ArrayList;
import java.util.List;
import reactor.core.CoreSubscriber;
import reactor.core.publisher.Flux;

public class UpdatedGenericConfigsPool {
  private final List<GenericConfigChangeNotification> updatedGenericConfigs = new ArrayList<>();
  List<CoreSubscriber<? super List<GenericConfigChangeNotification>>> subscribers =
      new ArrayList<>();

  Flux<List<GenericConfigChangeNotification>> publisher =
      new Flux<>() {
        @Override
        public void subscribe(
            CoreSubscriber<? super List<GenericConfigChangeNotification>> coreSubscriber) {
          subscribers.add(coreSubscriber);
        }
      };

  public void add(GenericConfigChangeNotification genericConfigChangeNotification) {
    updatedGenericConfigs.add(genericConfigChangeNotification);
    subscribers.forEach(s -> s.onNext(updatedGenericConfigs));
    updatedGenericConfigs.clear();
  }

  public Flux<List<GenericConfigChangeNotification>> getPublisher() {
    return publisher;
  }
}
