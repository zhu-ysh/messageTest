package com.sunlearning.messanger.service;

import com.sunlearning.messanger.pojo.AuthInfo;
import com.sunlearning.messanger.pojo.CommandInfo;
import com.sunlearning.messanger.pojo.DeptInfo;
import com.sunlearning.messanger.pojo.GroupInfo;
import com.sunlearning.messanger.pojo.GroupMemberInfo;
import com.sunlearning.messanger.pojo.MessageStoreInfo;
import com.sunlearning.messanger.pojo.UserInfo;
import java.util.List;

public interface InstantMessageService {

  AuthInfo login(String userCode, String password);

  UserInfo getUser(String userCode);

  List<UserInfo> getUserList();

  List<DeptInfo> getDeptList();


  String insertGroup(GroupInfo info, UserInfo user);

  int updateGroup(GroupInfo info);

  int deleteGroup(String groupId);

  int insertGroupMemberList(List<GroupMemberInfo> members);

  int deleteGroupMember(String groupId, String userCode);

  GroupInfo getGroup(String groupCode);

  List<GroupInfo> getGroupListByUser(String userCode);

  List<GroupInfo> queryGroupListByKey(String searchKey);


  int insertHistoryMessage(MessageStoreInfo info);

  int insertWaitingMessage(MessageStoreInfo info);

  int deleteWaitingMessage(String messageId);

  List<MessageStoreInfo> getWaitingMessageListByUser(String userCode);

  MessageStoreInfo getMessage(String messageId);

  int insertCommand(CommandInfo info);

  int deleteCommand(CommandInfo info);

  List<CommandInfo> getCommandList(String userCode);

}
