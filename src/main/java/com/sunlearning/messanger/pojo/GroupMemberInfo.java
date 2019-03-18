package com.sunlearning.messanger.pojo;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class GroupMemberInfo {
  private String groupCode;

  private String userCode;

  private UserRank userRank;

  private String userName;

  private String pathName;

  private String avatar;

  private LocalDateTime addDate;

  private String mobile;

}
