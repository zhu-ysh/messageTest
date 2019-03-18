package com.sunlearning.messanger.library.exception;

import java.util.Objects;
import javax.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class MessangerExceptionAdvice {

  @ExceptionHandler(value = MessangerException.class)
  public ResponseEntity<MessangerExceptionBody> handleFrameworkException(HttpServletRequest req, MessangerException exception) {
    HttpStatus status = HttpStatus.SERVICE_UNAVAILABLE;
    
    return new ResponseEntity<MessangerExceptionBody>(new MessangerExceptionBody(exception), status);
  }

  @ExceptionHandler(value = Exception.class)
  public ResponseEntity<MessangerExceptionBody> handleFrameworkException(HttpServletRequest req, Exception exception) {
    HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
    
    if (Objects.isNull(exception.getCause())) {
      return new ResponseEntity<MessangerExceptionBody>(new MessangerExceptionBody(exception), status);
    } else {
      return new ResponseEntity<MessangerExceptionBody>(new MessangerExceptionBody(exception.getCause()), status);
    }
  }

}
