package com.sunlearning.messanger.tio;

import com.sunlearning.messanger.configuration.InstantMessageProperties;
import com.sunlearning.messanger.library.SpringContextHolder;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.tio.server.ServerGroupContext;
import org.tio.websocket.server.WsServerStarter;

@Component
public class IMServerStarter {

  private WsServerStarter wsServerStarter;
  private ServerGroupContext serverGroupContext;

  public IMServerStarter(InstantMessageProperties properties, IMWsMsgHandler msgHandler, IMServerListener msgListener) throws IOException {
    this.wsServerStarter = new WsServerStarter(properties.getServerPort(), msgHandler);

    this.serverGroupContext = this.wsServerStarter.getServerGroupContext();
    this.serverGroupContext.setName("SunLearning");
    this.serverGroupContext.setServerAioListener(msgListener);
    this.serverGroupContext.setHeartbeatTimeout(properties.getHeartBeatTimeout());

  }

  public ServerGroupContext getServerGroupContext() {
    return this.serverGroupContext;
  }

  public WsServerStarter getWsServerStarter() {
    return this.wsServerStarter;
  }

  public static void start() throws IOException {
    IMServerStarter starter = SpringContextHolder.getBean(IMServerStarter.class);
    starter.getWsServerStarter().start();
  }
}
