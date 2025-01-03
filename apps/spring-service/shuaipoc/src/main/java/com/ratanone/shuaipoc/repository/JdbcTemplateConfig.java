package com.ratanone.shuaipoc.repository;

import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;

@Configuration
public class JdbcTemplateConfig {

  // @Bean(name = "realtimeJdbcTemplate")
  // public JdbcTemplate realtimeJdbcTemplate(
  //     @Qualifier("realtimeDataSource") DataSource realtimeDataSource) {
  //   return new JdbcTemplate(realtimeDataSource);
  // }

  // @Bean(name = "dailydumpJdbcTemplate")
  // public JdbcTemplate dailydumpJdbcTemplate(
  //     @Qualifier("dailydumpDataSource") DataSource dailydumpDataSource) {
  //   return new JdbcTemplate(dailydumpDataSource);
  // }

  @Bean(name = "supabaseJdbcTemplate")
  public JdbcTemplate supabaseJdbcTemplate(
      @Qualifier("supabaseDataSource") DataSource supabaseDataSource) {
    return new JdbcTemplate(supabaseDataSource);
  }
}
