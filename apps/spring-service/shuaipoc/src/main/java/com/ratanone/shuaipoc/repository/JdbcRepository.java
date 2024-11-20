package com.ratanone.shuaipoc.repository;

import com.ratanone.shuaipoc.model.StringMapRowMapper;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class JdbcRepository {
  @Autowired private final JdbcTemplate realtimeJdbcTemplate;

  @Autowired private final JdbcTemplate dailydumpJdbcTemplate;

  public JdbcRepository(
      @Qualifier("realtimeJdbcTemplate") JdbcTemplate realtimeJdbcTemplate,
      @Qualifier("dailydumpJdbcTemplate") JdbcTemplate dailydumpJdbcTemplate) {
    this.realtimeJdbcTemplate = realtimeJdbcTemplate;
    this.dailydumpJdbcTemplate = dailydumpJdbcTemplate;
  }

  public List<Map<String, String>> queryListFromRealtime(String sql) {
    return realtimeJdbcTemplate.query(sql + " LIMIT 1000", new StringMapRowMapper());
  }

  public List<Map<String, String>> queryListFromDailyDump(String sql) {
    return dailydumpJdbcTemplate.query(sql + " LIMIT 1000", new StringMapRowMapper());
  }
}
