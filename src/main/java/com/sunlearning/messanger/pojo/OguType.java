package com.sunlearning.messanger.pojo;

import com.sunlearning.messanger.library.reflection.EnumTypeInterface;

public enum OguType implements EnumTypeInterface {
  USER("用户"),
  GROUP("部门"),
  ORGANIZATION("机构");

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

  private OguType(String name) {
    this.name = name;
    this.description = "";
  }
}
