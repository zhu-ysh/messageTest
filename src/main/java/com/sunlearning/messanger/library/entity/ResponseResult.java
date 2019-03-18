package com.sunlearning.messanger.library.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.StringUtils;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ResponseResult<T> {
  
  private ResponseStatus resultStatus;
  
  private String resultMsg;
  
  private T result;
  
  public static <T> ResponseResult<T> success(T data) {
    return new ResponseResult<T>(ResponseStatus.SUCCESS, StringUtils.EMPTY, data);
  }
  
  public static <T> ResponseResult<T> failure(String msg) {
    return new ResponseResult<T>(ResponseStatus.FAILURE, msg, null);
  }
  
}
