package com.sunlearning.messanger.controller;

import com.sunlearning.messanger.pojo.GroupInfo;
import lombok.Data;

public final class UserRequestDto {

  @Data
  public static class AddFriendRequest {
    private String senderId;
    private String senderName;
    private String senderDept;
    private String receiverId;
    private String receiverName;
  }
  
  @Data
  public static class AgreeFriendRequest {
    private String senderId;
    private String receiverId;
  }
  
  @Data
  public static class DeleteFriendRequest {
    private String senderId;
    private String receiverId;
  }
  
  @Data
  public static class JoinGroupMemberRequest {
    private String senderId;
    private String senderName;
    private String senderDept;
    private String groupId;
    private String groupName;
  }
  
  @Data
  public static class AgreeGroupMemberRequest {
    private String senderId;
    private String senderName;
    private String applyId;
    private String applyName;
    private String applyDept;
    private String groupId;
  }
  
  @Data
  public static class KickGroupMemberRequest {
    private String senderId;
    private String senderName;
    private String receiverId;
    private String receiverName;
    private String groupId;
  }
  
  @Data
  public static class DeleteGroupMemberRequest {
    private String senderId;
    private String senderName;
    private String groupId;
  }

  @Data
  public static class CreateGroupRequest {
    private GroupInfo info;
    private String userCode;
    private String userName;
  }
}
