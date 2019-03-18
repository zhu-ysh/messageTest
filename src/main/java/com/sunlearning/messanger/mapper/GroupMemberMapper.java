package com.sunlearning.messanger.mapper;

import com.sunlearning.messanger.pojo.GroupMemberInfo;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface GroupMemberMapper {

  int insertList(@Param("members") List<GroupMemberInfo> members);

  int deleteByGroup(String groupCode);

  int delete(@Param("groupCode") String groupCode, @Param("userCode") String userCode);

  List<GroupMemberInfo> getList(String groupCode);

}
