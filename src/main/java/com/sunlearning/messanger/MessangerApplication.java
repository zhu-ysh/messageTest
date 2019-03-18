package com.sunlearning.messanger;

import com.sunlearning.messanger.tio.IMServerStarter;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@EnableTransactionManagement
@SpringBootApplication
public class MessangerApplication implements CommandLineRunner {

  public static void main(String[] args) {
    SpringApplication.run(MessangerApplication.class, args);
  }

  @Override
  public void run(String... args) throws Exception {
    Thread.currentThread().sleep(1000);
    IMServerStarter.start();
  }
}
