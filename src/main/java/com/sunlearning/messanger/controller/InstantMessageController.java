package com.sunlearning.messanger.controller;

import com.google.common.collect.Lists;
import com.sunlearning.messanger.configuration.InstantMessageProperties;
import com.sunlearning.messanger.library.entity.ResponseResult;
import com.sunlearning.messanger.library.exception.MessangerException;
import com.sunlearning.messanger.library.exception.MessangerExceptionCode;
import com.sunlearning.messanger.library.utility.FileSaveHelper;
import com.sunlearning.messanger.library.utility.FileSaveHelper.FileSaveInfo;
import com.sunlearning.messanger.library.utility.SecurityJwtHelper;
import com.sunlearning.messanger.pojo.*;
import com.sunlearning.messanger.service.InstantMessageService;

import io.netty.util.internal.StringUtil;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/InstantMessage")
public class InstantMessageController {

  @Autowired
  private InstantMessageService service;
  @Autowired
  private InstantMessageProperties properties;

  @RequestMapping(path = "/logon", method = RequestMethod.POST)
  public ResponseResult<AuthInfo> logon(@RequestBody UserLoginDto dto) {

    AuthInfo info = service.login(dto.getUserCode(), dto.getPassword());

    return ResponseResult.success(info);
  }

  @RequestMapping(path = "/getUserGroupList", method = RequestMethod.GET)
  public ResponseResult<List<GroupInfo>> getUserGroupList(@RequestParam String userCode) {
    List<GroupInfo> groupList = this.service.getGroupListByUser(userCode);

    return ResponseResult.success(groupList);
  }

  @RequestMapping(path = "/getDeptList", method = RequestMethod.GET)
  public ResponseResult<List<DeptInfo>> getDeptList() {
    List<DeptInfo> deptList = this.service.getDeptList();

    return ResponseResult.success(deptList);
  }

  @RequestMapping(path = "/getUserList", method = RequestMethod.GET)
  public ResponseResult<List<UserInfo>> getUserList() {
    List<UserInfo> userList = this.service.getUserList();

    return ResponseResult.success(userList);
  }

  @RequestMapping(path = "/getUser", method = RequestMethod.GET)
  public ResponseResult<UserInfo> getUser(@RequestParam String userCode) {
    UserInfo userInfo = this.service.getUser(userCode);

    return ResponseResult.success(userInfo);
  }

  @RequestMapping(path = "/getInitUserData", method = RequestMethod.GET)
  public ResponseResult<UserInitDto> getUserInfo(@RequestParam String userCode) {
    UserInfo user = this.service.getUser(userCode);

    List<GroupInfo> groupList = this.service.getGroupListByUser(userCode);

    List<OguBaseInfo> oguList = this.getOguList();

    UserInitDto result = UserInitDto.builder().user(user).groupList(groupList).oguList(oguList).build();
    return ResponseResult.success(result);
  }

  private List<OguBaseInfo> getOguList() {
    List<OguBaseInfo> result = Lists.newArrayList();

    List<UserInfo> userList = this.service.getUserList();
    List<DeptInfo> deptList = this.service.getDeptList();

    for (DeptInfo dept : deptList) {
      if (StringUtils.isEmpty(dept.getParentCode())) {
        this.setChildren(dept, deptList, userList);

        result.add(dept);
      }
    }

    return result;
  }

  private void setChildren(DeptInfo dept, List<DeptInfo> deptList, List<UserInfo> userList)  {
    List<DeptInfo> deptChildren = deptList.stream().filter(ogu -> ogu.getParentCode().equals(dept.getOguCode())).collect(Collectors.toList());
    List<UserInfo> userChildren = userList.stream().filter(ogu -> ogu.getParentCode().equals(dept.getOguCode())).collect(Collectors.toList());

    dept.setDeptList(deptChildren);
    dept.setUserList(userChildren);

    for (DeptInfo child : deptChildren) {
      this.setChildren(child, deptList, userList);
    }
  }

  @RequestMapping(path = "/uploadFile", method = RequestMethod.POST)
  public ResponseResult<String> uploadFile(@RequestBody MultipartFile file) {
    if (file.isEmpty()) {
      throw new MessangerException(MessangerExceptionCode.FILE_UPLOAD_FAIL);
    }

    try (InputStream input = file.getInputStream()) {
      FileSaveInfo saveInfo = FileSaveInfo.builder().fileName(file.getOriginalFilename()).contentType(file.getContentType())
          .stream(input).build();

      String fileName = FileSaveHelper.saveFile(this.properties.getSaveDir(), saveInfo);

      return ResponseResult.success(fileName);
    } catch (Exception e) {
      throw new MessangerException(MessangerExceptionCode.FILE_UPLOAD_FAIL);
    }
  }

  @RequestMapping(path = "/downloadFile", method = RequestMethod.GET)
  public void downloadFile(@RequestParam String messageId, @RequestParam boolean thumb) {
    HttpServletResponse response = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getResponse();

    MessageStoreInfo messageInfo = this.service.getMessage(messageId);

    response.setHeader("Pragma", "No-cache");
    response.setHeader("Cache-Control", "no-cache");
    response.setDateHeader("Expires", 0);
    if (thumb) {
      response.setContentType("image/jpeg");
    } else {
      response.setContentType(messageInfo.getContentType());
    }

    try {
      OutputStream stream = response.getOutputStream();
      messageInfo.getFileName()
    } catch (IOException e) {
      throw new MessangerException(MessangerExceptionCode.FILE_UPLOAD_FAIL);
    }
  }
}
