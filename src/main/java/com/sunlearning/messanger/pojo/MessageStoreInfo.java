package com.sunlearning.messanger.pojo;

import com.sunlearning.messanger.proto.ProtoMessage.InstantMessageInfo;
import lombok.Data;

@Data
public class MessageStoreInfo {

  private String messageId;
  private String senderCode;
  private String senderName;
  private String senderAvatar;
  private String receiverCode;
  private String receiverName;
  private String receiverAvatar;
  private String receiverType;
  private String contentType;
  private String content;
  private String fileName;
  private long messageTime;
  private String chatCode;
  private String chatName;
  private String chatAvatar;

  public static InstantMessageInfo toInstantMessageInfo(MessageStoreInfo storeInfo) {
    InstantMessageInfo instantInfo = InstantMessageInfo.newBuilder().setMessageId(storeInfo.getMessageId())
      .setSenderCode(storeInfo.getSenderCode()).setSenderName(storeInfo.getSenderName()).setSenderAvatar(storeInfo.getSenderAvatar())
      .setReceiverCode(storeInfo.getReceiverCode()).setReceiverName(storeInfo.getReceiverName()).setReceiverAvatar(storeInfo.getReceiverAvatar())
      .setContentType(storeInfo.getContentType()).setStringContent(storeInfo.getContent()).setFileName(storeInfo.getFileName())
      .setChatCode(storeInfo.getChatCode()).setChatName(storeInfo.getChatName()).setChatAvatar(storeInfo.getChatAvatar())
      .setMessageTime(storeInfo.getMessageTime()).build();

    return instantInfo;
  }

  public static MessageStoreInfo fromInstantMessageInfo(InstantMessageInfo instantInfo) {
    MessageStoreInfo storeInfo = new MessageStoreInfo();
    storeInfo.setMessageId(instantInfo.getMessageId());
    storeInfo.setSenderCode(instantInfo.getSenderCode());
    storeInfo.setSenderName(instantInfo.getSenderName());
    storeInfo.setSenderAvatar(instantInfo.getSenderAvatar());
    storeInfo.setReceiverCode(instantInfo.getReceiverCode());
    storeInfo.setReceiverName(instantInfo.getReceiverName());
    storeInfo.setReceiverAvatar(instantInfo.getReceiverAvatar());
    storeInfo.setReceiverType(instantInfo.getReceiverType());
    storeInfo.setContentType(instantInfo.getContentType());
    storeInfo.setContent(instantInfo.getStringContent());
    storeInfo.setMessageTime(instantInfo.getMessageTime());
    storeInfo.setFileName(instantInfo.getFileName());
    storeInfo.setChatCode(instantInfo.getChatCode());
    storeInfo.setChatName(instantInfo.getChatName());
    storeInfo.setChatAvatar(instantInfo.getChatAvatar());

    return storeInfo;
  }
}
