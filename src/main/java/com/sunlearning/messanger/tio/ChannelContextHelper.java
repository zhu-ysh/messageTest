package com.sunlearning.messanger.tio;

import com.sunlearning.messanger.pojo.UserInfo;
import com.sunlearning.messanger.proto.ProtoMessage.InstantMessageInfo;
import org.tio.core.ChannelContext;
import org.tio.core.Tio;
import org.tio.websocket.common.WsResponse;

public final class ChannelContextHelper {

  private ChannelContextHelper() {
  }


  public static boolean sendToUser(ChannelContext context, String userCode, InstantMessageInfo info, boolean blocking) {
    WsResponse response = WsResponse.fromBytes(info.toByteArray());

    if (blocking) {
      Tio.bSendToUser(context.getGroupContext(), userCode, response);
    } else {
      Tio.sendToUser(context.getGroupContext(), userCode, response);
    }

    return true;
  }

  public static boolean send(ChannelContext context, InstantMessageInfo info, boolean blocking) {
    if (isOnline(context)) {
      WsResponse response = WsResponse.fromBytes(info.toByteArray());

      if (blocking) {
        Tio.bSend(context, response);
      } else {
        Tio.send(context, response);
      }

      return true;
    } else {
      return false;
    }
  }

  public static void bindUser(ChannelContext context, UserInfo user) {
    Tio.bindUser(context, user.getOguCode());
    context.setAttribute("User", user);
    // todo: 用这个不灵活 groupList.forEach(g -> Tio.bindGroup(context, g.getGroupCode()));
  }

  public static boolean isOnline(ChannelContext context) {
    return context != null && context.isClosed == false && context.isRemoved == false;
  }

}
