package com.scb.ratan.rulev2.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "poc_graphql_rule_v2")
public class RepoRule {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String id;

    private String status;

    private Integer version;

    private String businessFlow;

    private String reason;

    private String rule;

    private String ruleType;

    public String getId() {
        return id;
    }

    public String getStatus() {
        return status;
    }

    public Integer getVersion() {
        return version;
    }

    public String getBusinessFlow() {
        return businessFlow;
    }

    public String getReason() {
        return reason;
    }

    public String getRule() {
        return rule;
    }

    public String getRuleType() {
        return ruleType;
    }

    public RepoRule() {

    }

    public RepoRule(String id, String rule, String ruleType, String businessFlow, String reason, String status) {
        this.id = id;
        this.rule = rule;
        this.ruleType = ruleType;
        this.businessFlow = businessFlow;
        this.reason = reason;
        this.status = status;
    }
}
