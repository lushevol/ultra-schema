package com.ratanone.shuaipoc.model;

import java.sql.Timestamp;

public class RatanCashflowScbmlHistory {
    private String cashflow_id;
    private String cashflow_status;
    private String action;
    private Timestamp create_time;

    public String getCashflow_id() {
        return cashflow_id;
    }

    public void setCashflow_id(String cashflow_id) {
        this.cashflow_id = cashflow_id;
    }

    public String getCashflow_status() {
        return cashflow_status;
    }

    public void setCashflow_status(String cashflow_status) {
        this.cashflow_status = cashflow_status;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public Timestamp getCreate_time() {
        return create_time;
    }

    public void setCreate_time(Timestamp create_time) {
        this.create_time = create_time;
    }

    @Override
    public String toString() {
        return "RatanCashflowScbmlHistory {" +
                "cashflow_id='" + cashflow_id + '\'' +
                ", cashflow_status='" + cashflow_status + '\'' +
                ", action='" + action + '\'' +
                ", create_time=" + create_time +
                '}';
    }
}
