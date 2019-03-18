package com.sunlearning.messanger.library.entity;


import com.sunlearning.messanger.library.reflection.EnumTypeInterface;

public enum ResponseStatus implements EnumTypeInterface {

  SUCCESS("成功"),
  FAILURE("失败");

  private String name;
  @Override
  public String getName() {
    return this.name;
  }
  
  private String description;
  @Override
  public String getDescription() {
    return this.description;
  }

  private ResponseStatus(String name) {
    this.name = name;
    this.description = "";
  }
  
}
