package com.sunlearning.messanger.library.utility;

import com.sunlearning.messanger.library.exception.MessangerException;
import com.sunlearning.messanger.library.exception.MessangerExceptionCode;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.text.NumberFormat;
import java.util.Enumeration;
import java.util.Objects;
import java.util.concurrent.atomic.AtomicLong;
import org.apache.commons.lang3.StringUtils;

public final class UUIDHelper {

  private static final Long MaxLimit = 9999L;

  private static final int MaxLength = 4;

  private static AtomicLong seq = new AtomicLong(0L);

  private static AtomicLong timestamp = new AtomicLong(System.currentTimeMillis());

  private static String address;

  private static NumberFormat format = NumberFormat.getNumberInstance();

  static {
    address = getMacAddress();
    
    format.setMinimumIntegerDigits(MaxLength);
    format.setGroupingUsed(false);
  }

  public static String generate() {
    StringBuffer sb = new StringBuffer();

    sb.append(address);
    String time = Long.toHexString(System.currentTimeMillis());
    sb.append(StringUtils.leftPad(time, 12, '0'));
    sb.append(format.format(getSeq()));

    return sb.toString();
  }

  private static Long getSeq() {
    Long next = seq.get();

    while (next >= MaxLimit || !seq.compareAndSet(next, ++next)) {
      if (next >= MaxLimit && timestamp.longValue() >= System.currentTimeMillis()) {
        next = seq.get();
      } else if (next > MaxLimit) {
        if (seq.compareAndSet(MaxLength, 0)) {
          timestamp.set(System.currentTimeMillis());

          next = 0L;
        }
      }
    }

    return next;
  }

  private static String getMacAddress() {
    try {
      Enumeration<NetworkInterface> interfaces = NetworkInterface.getNetworkInterfaces();

      while (interfaces.hasMoreElements()) {
        NetworkInterface _interface = interfaces.nextElement();

        if (Objects.isNull(_interface) || _interface.isLoopback() || _interface.isVirtual() || !_interface.isUp()) {
          continue;
        }

        byte[] mac = _interface.getHardwareAddress();
        if (mac != null) {
          StringBuffer sb = new StringBuffer();

          for (int i = 0; i < mac.length; i++) {
            String s = String.format("%02X", mac[i]);
            sb.append(s);
          }
          
          return sb.toString().toLowerCase();
        }
      }
    } catch (SocketException e) {
      throw new MessangerException(MessangerExceptionCode.MACADDRESS_FAIL, e);
    }

    return StringUtils.leftPad(StringUtils.EMPTY, 12, '0');
  }

}
