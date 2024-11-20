package com.ratanone.shuaipoc.repository;

import com.ratanone.shuaipoc.generated.types.AddGenericConfigInput;
import com.ratanone.shuaipoc.generated.types.GenericConfig;
import com.ratanone.shuaipoc.generated.types.MutableGenericConfigInput;
import com.ratanone.shuaipoc.model.StringMapRowMapper;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
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

  public List<GenericConfig> queryGenericConfigsFromRealtime(String query) {
    return realtimeJdbcTemplate.query(
        "SELECT * FROM generic_config WHERE " + query,
        BeanPropertyRowMapper.newInstance(GenericConfig.class));
  }

  public GenericConfig queryGenericConfigsByKey(String key) {
    return queryGenericConfigsFromRealtime("key = '" + key + "'").get(0);
  }

  public GenericConfig addGenericConfig(AddGenericConfigInput addGenericConfigInput) {
    realtimeJdbcTemplate.update(
        "INSERT INTO generic_config (key, config, validation, created_at, updated_at) VALUES (?, ?, ?, ?, ?)",
        new Object[] {
          addGenericConfigInput.getKey(),
          addGenericConfigInput.getConfig(),
          addGenericConfigInput.getValidation(),
        },
        BeanPropertyRowMapper.newInstance(GenericConfig.class));
    return queryGenericConfigsByKey(addGenericConfigInput.getKey());
  }

  public GenericConfig updateGenericConfig(
      String key, MutableGenericConfigInput mutableGenericConfigInput) {
    realtimeJdbcTemplate.update(
        "UPDATE generic_config SET config = ?, validation = ? WHERE key = ?",
        new Object[] {
          mutableGenericConfigInput.getConfig(), mutableGenericConfigInput.getValidation(), key
        });
    return queryGenericConfigsByKey(key);
  }

  public boolean removeGenericConfig(String key) {
    return realtimeJdbcTemplate.update(
            "DELETE FROM generic_config WHERE key = ?", new Object[] {key})
        > 0;
  }
}
