package com.sunlearning.messanger.mapper;

import com.sunlearning.messanger.pojo.GroupInfo;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface GroupMapper {

  int insert(GroupInfo info);

  int update(GroupInfo info);

  int delete(String groupCode);

  GroupInfo get(String groupCode);

  List<GroupInfo> getListByKey(@Param("searchKey") String searchKey);

  List<GroupInfo> getListByUser(String userCode);
}
