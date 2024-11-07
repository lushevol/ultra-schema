//package com.ratanone.shuaipoc.repository;
//
//import com.ratanone.shuaipoc.model.RatanCashflowScbmlHistory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.jdbc.core.JdbcTemplate;
//import org.springframework.stereotype.Repository;
//import org.springframework.jdbc.core.BeanPropertyRowMapper;
//
//import java.util.List;
//
//@Repository
//public class JdbcRepository {
//    @Autowired
//    private JdbcTemplate jdbcTemplate;
//
//    public List<RatanCashflowScbmlHistory> findAll() {
//        return jdbcTemplate.query("SELECT * from tutorials", BeanPropertyRowMapper.newInstance(RatanCashflowScbmlHistory.class));
//    }
//}
