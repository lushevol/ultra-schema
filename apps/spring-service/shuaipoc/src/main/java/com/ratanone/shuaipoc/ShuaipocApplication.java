package com.ratanone.shuaipoc;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
public class ShuaipocApplication {

	public static void main(String[] args) {
		SpringApplication.run(ShuaipocApplication.class, args);
	}

}
