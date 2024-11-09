package com.ratanone.shuaipoc.controller;
import java.util.ArrayList;
import java.util.List;

import com.ratanone.shuaipoc.model.DashboardQuery;
import com.ratanone.shuaipoc.model.RatanCashflow;
import com.ratanone.shuaipoc.model.RatanCashflowScbmlHistory;
//import com.ratanone.shuaipoc.repository.JdbcRepository;
//import org.springframework.beans.factory.annotation.Autowired;
import com.ratanone.shuaipoc.repository.JdbcRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/dashboard/query")
public class RatanController {

    @Autowired
    JdbcRepository jdbcRepository;

    @PostMapping("/rcsh/list")
    public ResponseEntity<List<RatanCashflowScbmlHistory>> getAllRCSH(@RequestBody DashboardQuery payload) {
        try {
            List<RatanCashflowScbmlHistory> result = jdbcRepository.queryRCSHList(payload.getQuery());
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/cashflow/list")
    public ResponseEntity<List<RatanCashflow>> getAllCashflow(@RequestBody DashboardQuery payload) {
        try {
            List<RatanCashflow> result = jdbcRepository.queryCashflowList(payload.getQuery());
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
