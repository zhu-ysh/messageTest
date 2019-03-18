package com.sunlearning.messanger.pojo;

import java.io.Serializable;
import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
public class DeptInfo extends OguBaseInfo implements Serializable {

  private static final long serialVersionUID = -2306475182416097572L;

  private String oguCode;

  private String oguName;

  public OguType getOguType() {
    return OguType.ORGANIZATION;
  }

  private String parentCode;

  private String pathCode;

  private String pathName;

  private long sortOrder;

  private List<DeptInfo> deptList;

  private List<UserInfo> userList;
}
