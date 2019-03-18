package com.sunlearning.messanger.library.exception;

import java.text.MessageFormat;

public class MessangerException extends RuntimeException {

  private static final long serialVersionUID = 83781453835438131L;

  public MessangerException(MessangerExceptionCode errorCode, Throwable cause, Object... params) {
    super(MessageFormat.format(errorCode.toString(), params), cause);
  }

  public MessangerException(MessangerExceptionCode errorCode, Object... params) {
    super(MessageFormat.format(errorCode.toString(), params));
  }

}
