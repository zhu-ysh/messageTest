package com.sunlearning.messanger.mapper;

import com.sunlearning.messanger.pojo.MessageStoreInfo;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface MessageStoreMapper {

  int insertHistory(MessageStoreInfo info);

  int insertWaiting(MessageStoreInfo info);

  int deleteWaiting(String messageId);

  List<MessageStoreInfo> getWaitingListByUser(String userCode);

  MessageStoreInfo get(String messageId);

}
