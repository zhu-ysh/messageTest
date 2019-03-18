package com.sunlearning.messanger.pojo;

import lombok.Data;

@Data
public class AuthInfo {

  private UserInfo user;
  
  private String token;
  
  private Long expired;
  
}
