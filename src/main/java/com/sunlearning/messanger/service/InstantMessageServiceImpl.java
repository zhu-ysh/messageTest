package com.sunlearning.messanger.service;

import com.google.common.collect.Lists;
import com.sunlearning.messanger.library.utility.SecurityJwtHelper;
import com.sunlearning.messanger.library.utility.UUIDHelper;
import com.sunlearning.messanger.mapper.CommandMapper;
import com.sunlearning.messanger.mapper.DeptMapper;
import com.sunlearning.messanger.mapper.GroupMapper;
import com.sunlearning.messanger.mapper.GroupMemberMapper;
import com.sunlearning.messanger.mapper.MessageStoreMapper;
import com.sunlearning.messanger.mapper.UserMapper;
import com.sunlearning.messanger.pojo.AuthInfo;
import com.sunlearning.messanger.pojo.CommandInfo;
import com.sunlearning.messanger.pojo.DeptInfo;
import com.sunlearning.messanger.pojo.GroupInfo;
import com.sunlearning.messanger.pojo.GroupMemberInfo;
import com.sunlearning.messanger.pojo.MessageStoreInfo;
import com.sunlearning.messanger.pojo.UserInfo;
import com.sunlearning.messanger.pojo.UserRank;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.List;
import org.apache.commons.lang3.tuple.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class InstantMessageServiceImpl implements InstantMessageService {

  @Autowired
  private UserMapper userMapper;
  @Autowired
  private DeptMapper deptMapper;
  @Autowired
  private GroupMapper groupMapper;
  @Autowired
  private GroupMemberMapper groupMemberMapper;
  @Autowired
  private MessageStoreMapper messageMapper;
  @Autowired
  private CommandMapper commandMapper;
  @Autowired
  private SecurityJwtHelper authHelper;

  @Override
  public AuthInfo login(String userCode, String password) {
    UserInfo userInfo = this.userMapper.get(userCode);

    Pair<String, LocalDateTime> pair = this.authHelper.generateJwt(userInfo);

    AuthInfo info = new AuthInfo();
    info.setExpired(pair.getRight().toEpochSecond(ZoneOffset.of("+8")));
    info.setToken(pair.getLeft());
    info.setUser(userInfo);

    return info;
  }

  // ---------------------- User ---------------------------------
  @Override
  public UserInfo getUser(String userCode) {
    return this.userMapper.get(userCode);
  }

  @Override
  public List<UserInfo> getUserList() {
    return this.userMapper.getList();
  }


  // ------------------- Dept ----------------------------
  @Override
  public List<DeptInfo> getDeptList() {
    return this.deptMapper.getList();
  }

  // --------------------- Group -------------------------------
  @Transactional
  @Override
  public String insertGroup(GroupInfo info, UserInfo user) {
    String groupCode = UUIDHelper.generate();
    info.setGroupCode(groupCode);
    info.setCreateDate(LocalDateTime.now());

    int result = this.groupMapper.insert(info);
    if (result > 0) {
      GroupMemberInfo memberInfo = new GroupMemberInfo();
      memberInfo.setAddDate(LocalDateTime.now());
      memberInfo.setGroupCode(groupCode);
      memberInfo.setUserCode(user.getOguCode());
      memberInfo.setUserRank(UserRank.CREATOR);

      this.groupMemberMapper.insertList(Lists.newArrayList(memberInfo));
    }

    return groupCode;
  }

  @Override
  public int updateGroup(GroupInfo info) {
    int result = this.groupMapper.update(info);

    return result;
  }

  @Transactional
  @Override
  public int deleteGroup(String groupCode) {
    int result = this.groupMapper.delete(groupCode);

    if (result > 0) {
      this.groupMemberMapper.deleteByGroup(groupCode);
    }

    return result;
  }

  @Override
  public int insertGroupMemberList(List<GroupMemberInfo> members) {
    members.forEach(info -> info.setAddDate(LocalDateTime.now()));
    return this.groupMemberMapper.insertList(members);
  }

  @Override
  public int deleteGroupMember(String groupId, String userCode) {
    return this.groupMemberMapper.delete(groupId, userCode);
  }

  @Override
  public GroupInfo getGroup(String groupCode) {
    GroupInfo info = this.groupMapper.get(groupCode);
    List<GroupMemberInfo> members = this.groupMemberMapper.getList(groupCode);
    info.setMembers(members);

    return info;
  }

  @Override
  public List<GroupInfo> getGroupListByUser(String userCode) {
    return this.groupMapper.getListByUser(userCode);
  }

  @Override
  public List<GroupInfo> queryGroupListByKey(String searchKey) {
    return this.groupMapper.getListByKey(searchKey);
  }


  // ----------------------MessageStore----------------------------
  @Override
  public int insertHistoryMessage(MessageStoreInfo info) {
    return this.messageMapper.insertHistory(info);
  }

  @Override
  public int insertWaitingMessage(MessageStoreInfo info) {
    return this.messageMapper.insertWaiting(info);
  }

  @Override
  public int deleteWaitingMessage(String messageId) {
    return this.messageMapper.deleteWaiting(messageId);
  }

  @Override
  public List<MessageStoreInfo> getWaitingMessageListByUser(String userCode) {
    return this.messageMapper.getWaitingListByUser(userCode);
  }

  @Override
  public MessageStoreInfo getMessage(String messageId) {
    return this.messageMapper.get(messageId);
  }

  // ----------------------Command----------------------------
  @Override
  public int insertCommand(CommandInfo info) {
    return this.commandMapper.insert(info);
  }

  @Override
  public int deleteCommand(CommandInfo info) {
    return this.commandMapper.delete(info);
  }

  @Override
  public List<CommandInfo> getCommandList(String userCode) {
    return this.commandMapper.getList(userCode);
  }

}
