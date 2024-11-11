package com.ratanone.shuaipoc.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.ratanone.shuaipoc.model.GenericRow;

import org.springframework.jdbc.core.BeanPropertyRowMapper;

import java.util.List;

@Repository
public class JdbcRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<GenericRow> queryList(String sql) {
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(GenericRow.class));
    }
}
