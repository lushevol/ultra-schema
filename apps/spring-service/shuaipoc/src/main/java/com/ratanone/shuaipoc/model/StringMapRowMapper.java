package com.ratanone.shuaipoc.model;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
import org.springframework.jdbc.core.RowMapper;

public class StringMapRowMapper implements RowMapper<Map<String, String>> {
  @Override
  public Map<String, String> mapRow(ResultSet rs, int rowNum) throws SQLException {
    ResultSetMetaData metaData = rs.getMetaData();
    int columnCount = metaData.getColumnCount();
    Map<String, String> row = new HashMap<>();

    for (int i = 1; i <= columnCount; i++) {
      String columnName = metaData.getColumnLabel(i);
      String value = rs.getString(i);
      row.put(columnName, value);
    }

    return row;
  }
}
