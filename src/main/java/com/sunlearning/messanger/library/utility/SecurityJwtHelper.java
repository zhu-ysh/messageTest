package com.sunlearning.messanger.library.utility;

import com.google.common.collect.Maps;
import com.sunlearning.messanger.configuration.InstantMessageProperties;
import com.sunlearning.messanger.pojo.UserInfo;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;
import org.apache.commons.lang3.tuple.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class SecurityJwtHelper {

  @Autowired
  private InstantMessageProperties properties;
  
  public SecurityJwtHelper() {}
  
  public Pair<String, LocalDateTime> generateJwt(UserInfo user) {
    String appSecerty = this.properties.getAppSecerty();
    String id = UUID.randomUUID().toString();
    
    SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
    LocalDateTime now = LocalDateTime.now();
    LocalDateTime expired = now.plusDays(this.properties.getAccessTokenExpiration());
    
    Map<String,Object> claims = Maps.newHashMap();
    claims.put("userCode", user.getOguCode());
    
    JwtBuilder builder = Jwts.builder().setIssuer(this.properties.getIssuer()).setAudience(this.properties.getAudience()).setId(id).setHeaderParam("typ", "JWT")
        .setIssuedAt(DateHelper.LocalDateTimeToDate(now)).setExpiration(DateHelper.LocalDateTimeToDate(expired)).setSubject(user.getOguCode()).addClaims(claims)
        .signWith(signatureAlgorithm, appSecerty);
    
    return Pair.of(builder.compact(), expired);
  }
  
  public Claims parseJwt(String token) {
    String appSecerty = this.properties.getAppSecerty();
    
    Claims claims = Jwts.parser().setSigningKey(appSecerty).parseClaimsJws(token).getBody();
    
    return claims;
  }
  
}
