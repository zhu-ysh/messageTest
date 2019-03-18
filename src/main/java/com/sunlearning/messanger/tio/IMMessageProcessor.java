package com.sunlearning.messanger.tio;


import com.sunlearning.messanger.configuration.InstantMessageProperties;
import com.sunlearning.messanger.library.utility.FileSaveHelper;
import com.sunlearning.messanger.library.utility.FileSaveHelper.FileSaveInfo;
import com.sunlearning.messanger.library.utility.UUIDHelper;
import com.sunlearning.messanger.pojo.GroupInfo;
import com.sunlearning.messanger.pojo.GroupMemberInfo;
import com.sunlearning.messanger.pojo.MessageStoreInfo;
import com.sunlearning.messanger.proto.ProtoMessage.InstantMessageInfo;
import com.sunlearning.messanger.proto.ProtoMessage.InstantMessageInfo.Builder;
import com.sunlearning.messanger.service.InstantMessageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.tio.core.ChannelContext;

@Component
@Slf4j
public class IMMessageProcessor {

  @Autowired
  private InstantMessageProperties properties;
  @Autowired
  private InstantMessageService service;


  public void process(ChannelContext channelContext, InstantMessageInfo recMsgInfo) {
    if ("Command".equals(recMsgInfo.getContentType())) {
      processCommandMessage(channelContext, recMsgInfo);
    } else {
      processReceiveMessage(channelContext, recMsgInfo);
    }
  }

  private void processCommandMessage(ChannelContext context, InstantMessageInfo recMsgInfo) {
  }

  private void processReceiveMessage(ChannelContext context, InstantMessageInfo recMsgInfo) {
    InstantMessageInfo replyMsgInfo = preProcessReceiveMessage(recMsgInfo);

    MessageStoreInfo storeInfo = MessageStoreInfo.fromInstantMessageInfo(recMsgInfo);
    storeInfo.setFileName(replyMsgInfo.getFileName());
    storeInfo.setMessageTime(replyMsgInfo.getMessageTime());
    storeInfo.setMessageId(replyMsgInfo.getMessageId());
    this.service.insertHistoryMessage(storeInfo);

    // 发送本人所有在线客户端
    ChannelContextHelper.sendToUser(context, replyMsgInfo.getSenderCode(), replyMsgInfo, false);

    // 发送给接收者
    if ("USER".equals(replyMsgInfo.getReceiverType())) {
      InstantMessageInfo sendMsgInfo = replyMsgInfo.toBuilder().setChatCode(replyMsgInfo.getSenderCode()).setChatName(replyMsgInfo.getSenderName())
          .setChatAvatar(replyMsgInfo.getSenderAvatar()).build();

      this.sendToSingleUser(context, sendMsgInfo.getReceiverCode(), sendMsgInfo);
    } else if ("GROUP".equals(replyMsgInfo.getReceiverType())) {
      // 获取本组下的所有人员，除了发送者外，其他均发送
      GroupInfo groupInfo = this.service.getGroup(replyMsgInfo.getReceiverCode());

      for (GroupMemberInfo member : groupInfo.getMembers()) {
        if (!recMsgInfo.getSenderCode().equals(member.getUserCode())) {
          InstantMessageInfo sendMsgInfo = replyMsgInfo.toBuilder()
              .setChatCode(replyMsgInfo.getReceiverCode()).setChatName(replyMsgInfo.getReceiverName()).setChatAvatar(replyMsgInfo.getReceiverAvatar())
              .setReceiverCode(member.getUserCode()).setReceiverName(member.getUserName()).setReceiverAvatar(member.getAvatar())
              .build();

          this.sendToSingleUser(context, member.getUserCode(), sendMsgInfo);
        }
      }
    }
  }

  private InstantMessageInfo preProcessReceiveMessage(InstantMessageInfo recMsgInfo) {
    String messageId = UUIDHelper.generate();
    long time = System.currentTimeMillis() / 1000;

    Builder builder = recMsgInfo.toBuilder();

    InstantMessageInfo replyMsgInfo = builder.setOldMessageId(recMsgInfo.getMessageId()).setMessageId(messageId).setMessageTime(time).build();

    return replyMsgInfo;
  }

  private void sendToSingleUser(ChannelContext context, String userCode, InstantMessageInfo msgInfo) {
    boolean success = ChannelContextHelper.sendToUser(context, userCode, msgInfo, false);

    if (!success) {
      MessageStoreInfo storeInfo = MessageStoreInfo.fromInstantMessageInfo(msgInfo);
      this.service.insertWaitingMessage(storeInfo);
    }
  }
}
