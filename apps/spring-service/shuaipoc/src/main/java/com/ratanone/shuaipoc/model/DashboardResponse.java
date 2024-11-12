package com.ratanone.shuaipoc.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class DashboardResponse {
    List<String> columns;
    List<List<String>> rows;

    public void setColumns(List<Map<String, String>> list) {
        // get the keys of the first object
        this.columns = new ArrayList<>(list.get(0).keySet());
    }

    public void setRows(List<Map<String, String>> list) {
        this.rows = list.stream().map(row -> new ArrayList<>(row.values())).collect(Collectors.toList());
    }
}
