package com.sunlearning.messanger.tio;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.tio.core.ChannelContext;
import org.tio.core.intf.Packet;
import org.tio.websocket.server.WsServerAioListener;

@Component
@Slf4j
public class IMServerListener extends WsServerAioListener {

  @Override
  public void onAfterConnected(ChannelContext channelContext, boolean isConnected, boolean isReconnect) throws Exception {
    super.onAfterConnected(channelContext, isConnected, isReconnect);

    log.info("onAfterConnected{}", channelContext);

    // Tio.bindGroup(channelContext, properties.getProtocolName());
  }

  @Override
  public void onAfterDecoded(ChannelContext channelContext, Packet packet, int packetSize) throws Exception {
    super.onAfterDecoded(channelContext, packet, packetSize);

    // log.info("onAfterDecoded {} {}", packet.logstr(), channelContext);
  }

  @Override
  public void onAfterSent(ChannelContext channelContext, Packet packet, boolean isSentSuccess) throws Exception {
    super.onAfterSent(channelContext, packet, isSentSuccess);

    // log.info("onAfterSent{} {}", packet.logstr(), channelContext);
  }

  @Override
  public void onBeforeClose(ChannelContext channelContext, Throwable throwable, String remark, boolean isRemove) throws Exception {
    super.onBeforeClose(channelContext, throwable, remark, isRemove);

    // log.info("onBeforeClose{} {}", channelContext);
  }

  @Override
  public void onAfterHandled(ChannelContext channelContext, Packet packet, long cost) throws Exception {
    super.onAfterHandled(channelContext, packet, cost);

    // log.info("onAfterHandled {} {}", packet.logstr(), channelContext);
  }

  @Override
  public void onAfterReceivedBytes(ChannelContext channelContext, int receivedBytes) throws Exception {
    super.onAfterReceivedBytes(channelContext, receivedBytes);

    // log.info("onAfterReceivedBytes {}", channelContext);
  }
}
