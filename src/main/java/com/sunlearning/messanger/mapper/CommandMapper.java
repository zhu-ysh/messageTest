package com.sunlearning.messanger.mapper;

import com.sunlearning.messanger.pojo.CommandInfo;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CommandMapper {
  int insert(CommandInfo info);
  
  int delete(CommandInfo info);

  List<CommandInfo> getList(String destCode);
}
