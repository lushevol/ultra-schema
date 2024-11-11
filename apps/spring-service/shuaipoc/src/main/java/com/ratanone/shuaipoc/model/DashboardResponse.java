package com.ratanone.shuaipoc.model;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class DashboardResponse {
    List<String> columns;
    List<List<String>> rows;

    public void setColumns(List<GenericRow> list) {
        // get the keys of the first object
        this.columns = new ArrayList<>(list.get(0).row.keySet());
    }

    public void setRows(List<GenericRow> list) {
        this.rows = list.stream().map(row -> new ArrayList<>(row.row.values())).collect(Collectors.toList());
    }
}
