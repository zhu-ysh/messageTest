package com.sunlearning.messanger.controller;

import lombok.Data;

@Data
public class UserLoginDto {
  private String userCode;
  private String password;
  private String verifyCode;
}
