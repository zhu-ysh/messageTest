package com.sunlearning.messanger.mapper;

import com.sunlearning.messanger.pojo.UserInfo;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface UserMapper {

  UserInfo get(String userCode);
  List<UserInfo> getList();

}
