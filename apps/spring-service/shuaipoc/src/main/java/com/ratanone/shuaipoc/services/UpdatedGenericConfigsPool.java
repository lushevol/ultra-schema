package com.ratanone.shuaipoc.services;

import reactor.core.CoreSubscriber;
import reactor.core.publisher.Flux;

import java.util.ArrayList;
import java.util.List;

public class UpdatedGenericConfigsPool {
    private final List<GenericConfig> updatedRules = new ArrayList<>();
    List<CoreSubscriber<? super List<GenericConfig>>> subscribers = new ArrayList<>();

    Flux<List<Rule>> publisher = new Flux<>() {
        @Override
        public void subscribe(CoreSubscriber<? super List<Rule>> coreSubscriber) {
            subscribers.add(coreSubscriber);
        }
    };

    public void add (Rule rule) {
        updatedRules.add(rule);
        subscribers.forEach(s -> s.onNext(updatedRules));
        updatedRules.clear();
    }

    public Flux<List<Rule>> getPublisher() {
        return publisher;
    }
}
