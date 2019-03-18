package com.sunlearning.messanger.pojo;


import com.sunlearning.messanger.library.reflection.EnumTypeInterface;

public enum UserRank implements EnumTypeInterface {
  CREATOR("创建者"), ADMIN("管理员"), NORMAL("普通用户");

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

  private UserRank(String name) {
    this.name = name;
    this.description = "";
  }
}
