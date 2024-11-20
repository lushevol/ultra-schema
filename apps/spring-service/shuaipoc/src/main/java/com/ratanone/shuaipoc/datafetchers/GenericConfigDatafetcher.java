package com.ratanone.shuaipoc.datafetchers;

import com.netflix.graphql.dgs.*;
import com.ratanone.shuaipoc.generated.types.*;
import com.ratanone.shuaipoc.services.RuleService;
import com.ratanone.shuaipoc.services.UpdatedRulePool;
import org.reactivestreams.Publisher;

import java.util.List;

@DgsComponent
public class GenericConfigDatafetcher {
    private final UpdatedGenericConfigsPool updatedRulePool = new UpdatedGenericConfigsPool();
    private final RuleService ruleService;

    public GenericConfigDatafetcher(RuleService ruleService) {
        this.ruleService = ruleService;
    }

    @DgsQuery
    public List<Rule> rules(@InputArgument("ruleType") String ruleType, @InputArgument("businessFlow") String businessFlow) {
        return ruleService.rules(ruleType, businessFlow);
    }

    @DgsQuery
    public Rule rule(@InputArgument("id") String id) {
        return ruleService.rule(id);
    }

    @DgsMutation
    public Rule addRule(@InputArgument("addRuleInput") AddRuleInput addRuleInput) {
        return ruleService.addRule(addRuleInput);
    }

    @DgsMutation
    public Rule removeRule(@InputArgument("id") String id) {
        return ruleService.removeRule(id);
    }

    @DgsMutation
    public Rule updateRule(@InputArgument("id") String id, @InputArgument("action") ActionType action, @InputArgument("payload") MutableRuleInput payload) {
        RuleStatusType status = null;
        switch (action) {
            case Create -> status = RuleStatusType.ADD_PENDING;
            case Reject_Creation -> status = RuleStatusType.DISCARDED;
            case Update -> status = RuleStatusType.UPDATE_PENDING;
            case Approve_Creation, Reject_Deletion, Approve_Update, Reject_Update -> status = RuleStatusType.SAVE_CONFIRMED;
            case Delete -> status = RuleStatusType.DELETE_PENDING;
            case Approve_Deletion -> status = RuleStatusType.DELETE_CONFIRMED;
        }
        Rule updatedRule = ruleService.updateRuleStatus(id, status);
        updatedRulePool.add(updatedRule);
        return updatedRule;
    }

    @DgsSubscription
    // /subscribtions
    public Publisher<List<Rule>> onRuleUpdated(@InputArgument("ruleType") String ruleType, @InputArgument("businessFlow") String businessFlow) {
        return updatedRulePool.getPublisher();
    }
}
