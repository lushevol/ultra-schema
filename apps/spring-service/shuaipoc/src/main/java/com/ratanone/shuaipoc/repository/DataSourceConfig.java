package com.ratanone.shuaipoc.repository;

import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

@Configuration
public class DataSourceConfig {

  @Value("${spring.datasource.realtime.url}")
  private String realtimeDbUrl;

  @Value("${spring.datasource.realtime.username}")
  private String realtimeDbUsername;

  @Value("${spring.datasource.realtime.password}")
  private String realtimeDbPassword;

  @Value("${spring.datasource.realtime.driver-class-name}")
  private String realtimeDbDriverClassName;

  @Value("${spring.datasource.dailydump.url}")
  private String dailydumpDbUrl;

  @Value("${spring.datasource.dailydump.username}")
  private String dailydumpDbUsername;

  @Value("${spring.datasource.dailydump.password}")
  private String dailydumpDbPassword;

  @Value("${spring.datasource.dailydump.driver-class-name}")
  private String dailydumpDbDriverClassName;

  @Value("${spring.datasource.supabase.url}")
  private String supabaseUrl;

  @Primary
  @Bean(name = "realtimeDataSource")
  public DataSource realtimeDataSource() {
    return DataSourceBuilder.create()
        .url(realtimeDbUrl)
        .username(realtimeDbUsername)
        .password(realtimeDbPassword)
        .driverClassName(realtimeDbDriverClassName)
        .build();
  }

  @Bean(name = "dailydumpDataSource")
  public DataSource dailydumpDataSource() {
    return DataSourceBuilder.create()
        .url(dailydumpDbUrl)
        .username(dailydumpDbUsername)
        .password(dailydumpDbPassword)
        .driverClassName(dailydumpDbDriverClassName)
        .build();
  }

  @Bean(name = "supabaseDataSource")
  public DataSource supabaseDataSource() {
    return DataSourceBuilder.create().url(supabaseUrl).build();
  }
}
