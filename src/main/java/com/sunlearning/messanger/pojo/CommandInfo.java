package com.sunlearning.messanger.pojo;

import lombok.Data;

@Data
public class CommandInfo {

  private String commandCode;

  private String userCode;

  private String userName;

  private String pathName;

  private String destCode;

  private String destName;

  private String destPath;
}
