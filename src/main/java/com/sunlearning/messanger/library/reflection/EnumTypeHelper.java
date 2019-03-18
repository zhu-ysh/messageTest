package com.sunlearning.messanger.library.reflection;

import com.google.common.collect.Lists;
import com.sunlearning.messanger.library.exception.MessangerException;
import com.sunlearning.messanger.library.exception.MessangerExceptionCode;
import java.util.List;

public final class EnumTypeHelper {

  private EnumTypeHelper() {
  }

  public static <T extends Enum<?> & EnumTypeInterface> List<EnumNameInfo> getEnumTypeList(final Class<T> type) {
    if (!type.isEnum()) {
      throw new MessangerException(MessangerExceptionCode.NOT_ENUM_TYPE, type.getTypeName());
    }

    List<EnumNameInfo> result = Lists.newArrayList();

    T[] enums = type.getEnumConstants();

    for (T e : enums) {
      EnumNameInfo info = new EnumNameInfo(e.name(), e.getName(), e.getDescription());
      result.add(info);
    }

    return result;
  }

  public static <T extends Enum<?> & EnumTypeInterface> T getEnumTypeByName(final Class<T> type, String name) {

    T[] enums = type.getEnumConstants();

    for (T e : enums) {
      if (e.getName().equals(name)) {
        return e;
      }
    }
    return null;
  }

}
