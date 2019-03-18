package com.sunlearning.messanger.controller;

import com.sunlearning.messanger.pojo.GroupInfo;
import com.sunlearning.messanger.pojo.OguBaseInfo;
import com.sunlearning.messanger.pojo.UserInfo;
import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserInitDto {

  private UserInfo user;
  private List<GroupInfo> groupList;
  private List<OguBaseInfo> oguList;

}
