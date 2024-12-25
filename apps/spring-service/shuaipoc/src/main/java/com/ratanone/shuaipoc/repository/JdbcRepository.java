package com.ratanone.shuaipoc.repository;

import com.ratanone.shuaipoc.generated.types.*;
import java.sql.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class JdbcRepository {
  // @Autowired private final JdbcTemplate realtimeJdbcTemplate;

  // @Autowired private final JdbcTemplate dailydumpJdbcTemplate;

  @Autowired private final JdbcTemplate supabaseJdbcTemplate;

  public JdbcRepository(
      // @Qualifier("realtimeJdbcTemplate") JdbcTemplate realtimeJdbcTemplate,
      // @Qualifier("dailydumpJdbcTemplate") JdbcTemplate dailydumpJdbcTemplate,
      @Qualifier("supabaseJdbcTemplate") JdbcTemplate supabaseJdbcTemplate) {
    // this.realtimeJdbcTemplate = realtimeJdbcTemplate;
    // this.dailydumpJdbcTemplate = dailydumpJdbcTemplate;
    this.supabaseJdbcTemplate = supabaseJdbcTemplate;
  }

  // public List<Map<String, String>> queryListFromRealtime(String sql) {
  //   return realtimeJdbcTemplate.query(sql + " LIMIT 1000", new StringMapRowMapper());
  // }

  // public List<Map<String, String>> queryListFromDailyDump(String sql) {
  //   return dailydumpJdbcTemplate.query(sql + " LIMIT 1000", new StringMapRowMapper());
  // }

  public UltraQueryResult queryGenericConfigsFromRealtime(UltraQueryInput ultraQueryInput) {
    StringBuilder sb =
        new StringBuilder(
            "SELECT * FROM generic_config WHERE "
                + (ultraQueryInput.getQuery().isBlank() ? "1 = 1" : ultraQueryInput.getQuery())
                + " OFFSET "
                + ultraQueryInput.getIndex()
                + " LIMIT "
                + ultraQueryInput.getOffset());
    if (ultraQueryInput.getSorting() != null && !ultraQueryInput.getSorting().isEmpty()) {
      sb.append(
          " SORT BY "
              + ultraQueryInput.getSorting().get(0).getField()
              + " "
              + ultraQueryInput.getSorting().get(0).getSort());
    }
    List<GenericConfig> genericConfigs =
        supabaseJdbcTemplate.query(
            sb.toString(), BeanPropertyRowMapper.newInstance(GenericConfig.class));
    return UltraQueryResult.newBuilder()
        .data(genericConfigs)
        .index(ultraQueryInput.getIndex())
        .offset(ultraQueryInput.getOffset())
        .build();
  }

  public GenericConfig queryGenericConfigsByKey(String key) {
    return queryGenericConfigsFromRealtime(
            UltraQueryInput.newBuilder().query("key = '" + key + "'").index(0).offset(1).build())
        .getData()
        .get(0);
  }

  public GenericConfig addGenericConfig(AddGenericConfigInput addGenericConfigInput) {
    supabaseJdbcTemplate.update(
        "INSERT INTO generic_config (key, config, validation, version, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)",
        new Object[] {
          addGenericConfigInput.getKey(),
          addGenericConfigInput.getConfig(),
          addGenericConfigInput.getValidation(),
          0,
          new Date(System.currentTimeMillis()),
          new Date(System.currentTimeMillis()),
        },
        BeanPropertyRowMapper.newInstance(GenericConfig.class));
    return queryGenericConfigsByKey(addGenericConfigInput.getKey());
  }

  public GenericConfig updateGenericConfig(
      String key, MutableGenericConfigInput mutableGenericConfigInput) {
    supabaseJdbcTemplate.update(
        "UPDATE generic_config SET config = ?, version = version + 1 WHERE key = ?",
        new Object[] {mutableGenericConfigInput.getConfig(), key});
    return queryGenericConfigsByKey(key);
  }

  public boolean removeGenericConfig(String key) {
    return supabaseJdbcTemplate.update(
            "DELETE FROM generic_config WHERE key = ?", new Object[] {key})
        > 0;
  }
}
