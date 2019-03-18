package com.sunlearning.messanger.configuration;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "sunlearning")
@Data
public class InstantMessageProperties {
  private String protocolName;

  private int serverPort;

  private int heartBeatTimeout;

  private String saveDir;

  private String appSecerty;

  private String issuer;

  private String audience;

  private int accessTokenExpiration;
}
