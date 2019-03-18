package com.sunlearning.messanger.pojo;

import java.time.LocalDateTime;
import java.util.List;
import lombok.Data;

@Data
public class GroupInfo {
  private String groupCode;

  private String groupName;

  private String groupDesc;

  private String creatorCode;

  private String creatorName;

  private LocalDateTime createDate;

  private String avatar;

  private List<GroupMemberInfo> members;

}
