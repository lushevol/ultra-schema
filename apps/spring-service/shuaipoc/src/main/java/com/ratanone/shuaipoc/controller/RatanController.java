package com.ratanone.shuaipoc.controller;
import java.util.ArrayList;
import java.util.List;

import com.ratanone.shuaipoc.model.DashboardQuery;
import com.ratanone.shuaipoc.model.RatanCashflowScbmlHistory;
//import com.ratanone.shuaipoc.repository.JdbcRepository;
//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api/ratan/dashboard/query")
public class RatanController {

//    @Autowired
//    JdbcRepository jdbcRepository;

    @PostMapping("/rcsh")
    public ResponseEntity<List<RatanCashflowScbmlHistory>> getAll(@RequestBody DashboardQuery payload) {
        try {
            List<RatanCashflowScbmlHistory> result = new ArrayList<RatanCashflowScbmlHistory>();

            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    }
