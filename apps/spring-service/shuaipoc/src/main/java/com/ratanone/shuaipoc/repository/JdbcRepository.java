package com.ratanone.shuaipoc.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.ratanone.shuaipoc.model.StringMapRowMapper;

import java.util.List;
import java.util.Map;

@Repository
public class JdbcRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<Map<String, String>> queryList(String sql) {
        return jdbcTemplate.query(sql + " LIMIT 1000", new StringMapRowMapper());
    }
}
