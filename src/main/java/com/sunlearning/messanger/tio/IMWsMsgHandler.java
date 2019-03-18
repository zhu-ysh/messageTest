package com.sunlearning.messanger.tio;

import com.sunlearning.messanger.library.exception.MessangerException;
import com.sunlearning.messanger.library.exception.MessangerExceptionCode;
import com.sunlearning.messanger.library.utility.SecurityJwtHelper;
import com.sunlearning.messanger.pojo.MessageStoreInfo;
import com.sunlearning.messanger.pojo.UserInfo;
import com.sunlearning.messanger.proto.ProtoMessage.InstantMessageInfo;
import com.sunlearning.messanger.service.InstantMessageService;
import io.jsonwebtoken.Claims;
import java.util.List;
import java.util.Objects;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.tio.core.ChannelContext;
import org.tio.core.Tio;
import org.tio.http.common.HttpRequest;
import org.tio.http.common.HttpResponse;
import org.tio.websocket.common.WsRequest;
import org.tio.websocket.server.handler.IWsMsgHandler;

@Component
@Slf4j
public class IMWsMsgHandler implements IWsMsgHandler {

  @Autowired
  private SecurityJwtHelper jwtHelper;
  @Autowired
  private IMMessageProcessor processor;
  @Autowired
  private InstantMessageService service;

  // 获取用户
  @Override
  public HttpResponse handshake(HttpRequest request, HttpResponse response, ChannelContext channelContext) throws Exception {
    String token = request.getParam("token");

    Claims claims = jwtHelper.parseJwt(token);
    String userCode = claims.getSubject();

    if (StringUtils.isEmpty(userCode)) {
      log.info("Token解析失败");
      throw new MessangerException(MessangerExceptionCode.TOKEN_VALID_FAIL);
    }

    UserInfo user = this.service.getUser(userCode);
    if (Objects.isNull(user)) {
      log.info("用户{}不存在", userCode);
      throw new MessangerException(MessangerExceptionCode.USER_NOTEXIST, userCode);
    }

    ChannelContextHelper.bindUser(channelContext, user);

    return response;
  }

  // todo: 通知好友和组
  @Override
  public void onAfterHandshaked(HttpRequest httpRequest, HttpResponse httpResponse, ChannelContext channelContext) throws Exception {
    String userCode = channelContext.userid;

    List<MessageStoreInfo> list = this.service.getWaitingMessageListByUser(userCode);

    for (MessageStoreInfo storeInfo : list) {
      InstantMessageInfo instantInfo = MessageStoreInfo.toInstantMessageInfo(storeInfo);
      boolean success = ChannelContextHelper.send(channelContext, instantInfo, false);

      if (success) {
        this.service.deleteWaitingMessage(instantInfo.getMessageId());
      }
    }
  }

  @Override
  public Object onBytes(WsRequest wsRequest, byte[] bytes, ChannelContext channelContext) throws Exception {
    InstantMessageInfo recMsgInfo = InstantMessageInfo.parseFrom(bytes);

    this.processor.process(channelContext, recMsgInfo);

    return null;
  }

  @Override
  public Object onText(WsRequest wsRequest, String text, ChannelContext channelContext) throws Exception {
    if ("ping".equals(text)) {
      return null;
    }

    return null;
  }

  @Override
  public Object onClose(WsRequest wsRequest, byte[] bytes, ChannelContext channelContext) throws Exception {
    Tio.remove(channelContext, "receive close flag");

    return null;
  }

}
