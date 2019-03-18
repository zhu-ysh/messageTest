package com.sunlearning.messanger.library.exception;

public enum MessangerExceptionCode {
  NOT_ENUM_TYPE("100101", "{0}非枚举类型"),
  MACADDRESS_FAIL("100102", "MAC地址获取错误"),
  FILE_SAVE_FAIL("100103", "文件保存错误，文件：{0}"),
  FILE_UPLOAD_FAIL("100103", "上传文件接收错误"),
  CREATE_DIRECTORY_FAIL("100104", "目录创建错误，目录：{0}"),
  DECRYPT_AES_FAIL("100105", "AES解密错误"),
  TOKEN_VALID_FAIL("100106", "Token验证错误"),
  USER_NOTEXIST("100201", "用户{0}不存在"),
  EXCEL_CLASS_FAIL("100201", "Excel读取时，对象实例化或者字段错误"),
  REST_FAILE("100901", "Rest Api调用失败，原因：{0}"),
  FRIEND_USERS_EXISTS("100901", "好友分组下存在好友，不能删除！"),
  ;

  private String code;
  private String desc;

  private MessangerExceptionCode(String code, String desc) {
    this.code = code;
    this.desc = desc;
  }

  public String getCode() {
    return code;
  }

  public String getDesc() {
    return desc;
  }

  public String toString() {
    return "[" + this.code + "]" + this.desc;
  }

}
