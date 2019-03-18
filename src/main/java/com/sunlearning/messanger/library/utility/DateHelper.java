package com.sunlearning.messanger.library.utility;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

public final class DateHelper {

  // 01. java.util.Date --> java.time.LocalDateTime
  public static LocalDateTime DateToLocalDateTime(Date date) {
    Instant instant = date.toInstant();
    ZoneId zone = ZoneId.systemDefault();
    return LocalDateTime.ofInstant(instant, zone);
  }

  // 02. java.util.Date --> java.time.LocalDate
  public static LocalDate DateToLocalDate(Date date) {
    Instant instant = date.toInstant();
    ZoneId zone = ZoneId.systemDefault();
    LocalDateTime localDateTime = LocalDateTime.ofInstant(instant, zone);
    return localDateTime.toLocalDate();
  }


  // 04. java.time.LocalDateTime --> java.util.Date
  public static Date LocalDateTimeToDate(LocalDateTime localDateTime) {
    ZoneId zone = ZoneId.systemDefault();
    Instant instant = localDateTime.atZone(zone).toInstant();
    return Date.from(instant);
  }


  // 05. java.time.LocalDate --> java.util.Date
  public static Date LocalDateToDate(LocalDate localDate) {
    ZoneId zone = ZoneId.systemDefault();
    Instant instant = localDate.atStartOfDay().atZone(zone).toInstant();
    return Date.from(instant);
  }

}
