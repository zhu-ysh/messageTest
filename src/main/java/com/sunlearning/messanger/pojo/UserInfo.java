package com.sunlearning.messanger.pojo;

import java.io.Serializable;
import lombok.Data;

@Data
public class UserInfo extends OguBaseInfo implements Serializable {

  private static final long serialVersionUID = 8626597028545663747L;

  private String oguCode;

  private String oguName;

  @Override
  public OguType getOguType() {
    return OguType.USER;
  }

  private String parentCode;

  private String pathCode;

  private String pathName;

  private String mobile;

  private String avatar;

  private long sortOrder;

}
