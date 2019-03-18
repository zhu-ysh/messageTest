package com.sunlearning.messanger.library.exception;

public class MessangerExceptionBody {
  private String exceptionMessage;

  public MessangerExceptionBody(MessangerException e) {
    this.exceptionMessage = e.getMessage();
  }

  public MessangerExceptionBody(Throwable e) {
    this.exceptionMessage = e.getMessage();
  }

  public String getExceptionMessage() {
    return this.exceptionMessage;
  }
}
