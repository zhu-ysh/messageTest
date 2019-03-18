package com.sunlearning.messanger.library.reflection;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EnumNameInfo {

  private String code;
  private String name;
  private String description;
}

