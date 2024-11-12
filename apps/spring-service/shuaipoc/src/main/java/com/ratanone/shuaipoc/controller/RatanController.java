package com.ratanone.shuaipoc.controller;
import java.util.List;
import java.util.Map;

import com.ratanone.shuaipoc.model.DashboardQuery;
import com.ratanone.shuaipoc.model.DashboardResponse;
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
@RequestMapping("/dashboard/query/pg")
public class RatanController {

    @Autowired
    JdbcRepository jdbcRepository;

    @PostMapping("/list")
    public ResponseEntity<DashboardResponse> queryList(@RequestBody DashboardQuery payload) {
        try {
            List<Map<String, String>> result = jdbcRepository.queryList(payload.getQuery());
            return new ResponseEntity<>(new DashboardResponse(result), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
