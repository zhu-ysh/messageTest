package com.sunlearning.messanger.library;

import java.lang.annotation.Annotation;
import java.util.Map;
import java.util.Objects;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

@Component
public class SpringContextHolder implements ApplicationContextAware {

  private static ApplicationContext applicationContext;

  @Override
  public void setApplicationContext(ApplicationContext applicationContext) {
    System.out.println("SpringContextHolder");
    if (Objects.isNull(SpringContextHolder.applicationContext )) {
      SpringContextHolder.applicationContext = applicationContext;
    }
  }

  public static ApplicationContext getApplicationContext() {
    return applicationContext;
  }

  public static Object getBean(String name) {
    return applicationContext.getBean(name);
  }

  public static <T> T getBean(Class<T> clazz) {
    return applicationContext.getBean(clazz);
  }

  public static <T> T getBean(String name, Class<T> clazz) {
    return applicationContext.getBean(name, clazz);
  }
  
  public static <T> Map<String, T> getBeansOfType(Class<T> type) {
    return applicationContext.getBeansOfType(type);
  }
  
  public static Map<String, Object> getBeansWithAnnotation(Class<? extends Annotation> annotationType) {
    return applicationContext.getBeansWithAnnotation(annotationType);
  }
  
}
