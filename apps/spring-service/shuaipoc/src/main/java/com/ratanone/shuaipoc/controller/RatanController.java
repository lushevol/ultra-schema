package com.ratanone.shuaipoc.controller;

// import com.ratanone.shuaipoc.repository.JdbcRepository;
// import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dashboard/query/pg")
public class RatanController {

  // @Autowired JdbcRepository jdbcRepository;

  // @PostMapping("/real_time")
  // public ResponseEntity<List<Map<String, String>>> queryList(@RequestBody DashboardQuery payload)
  // {
  //   try {
  //     List<Map<String, String>> result =
  // jdbcRepository.queryListFromRealtime(payload.getQuery());
  //     return new ResponseEntity<>(result, HttpStatus.OK);
  //   } catch (Exception e) {
  //     return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  // }

  // @PostMapping("/daily_dump")
  // public ResponseEntity<List<Map<String, String>>> queryListFromDailyDump(
  //     @RequestBody DashboardQuery payload) {
  //   try {
  //     List<Map<String, String>> result =
  // jdbcRepository.queryListFromDailyDump(payload.getQuery());
  //     return new ResponseEntity<>(result, HttpStatus.OK);
  //   } catch (Exception e) {
  //     return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  // }
}
