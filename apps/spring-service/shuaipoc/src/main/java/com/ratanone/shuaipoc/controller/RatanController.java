package com.ratanone.shuaipoc.controller;
import java.util.List;

import com.ratanone.shuaipoc.model.DashboardQuery;
import com.ratanone.shuaipoc.model.DashboardResponse;
import com.ratanone.shuaipoc.model.GenericRow;
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
    public ResponseEntity<DashboardResponse> getAllRCSH(@RequestBody DashboardQuery payload) {
        try {
            List<GenericRow> result = jdbcRepository.queryList(payload.getQuery());
            DashboardResponse response = new DashboardResponse();
            response.setColumns(result);
            response.setRows(result);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
