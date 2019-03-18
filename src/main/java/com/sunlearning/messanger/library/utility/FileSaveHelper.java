package com.sunlearning.messanger.library.utility;

import com.sunlearning.messanger.library.exception.MessangerException;
import com.sunlearning.messanger.library.exception.MessangerExceptionCode;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import lombok.Builder;
import lombok.Data;

public final class FileSaveHelper {
  
  public static String saveFile(String saveDir, String fileName, String contentType, InputStream stream) {
    String path = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));

    String newFileName = UUIDHelper.generate() + fileName.substring(fileName.lastIndexOf("."));

    String fullFileName = save(saveDir + path, newFileName, stream);

    if (contentType.startsWith("image")) {
      ThumbUtil.getImageThumb(fileName);
    } else if (contentType.startsWith("video")) {
      ThumbUtil.getVideoThumb(fileName);
    }

    return path + "/" + newFileName;
  }

  private static String save(String fileDirectory, String fileName, InputStream stream) {
    createDirectory(fileDirectory);

    String filePath = String.join(File.separator, fileDirectory, fileName);
    File file = new File(filePath);

    try (FileOutputStream fileOutput = new FileOutputStream(file, false);
        BufferedOutputStream bufOutput = new BufferedOutputStream(fileOutput);) {
      byte[] bytes = new byte[1024];

      int length = 0;

      while ((length = stream.read(bytes)) != -1) {
        bufOutput.write(bytes, 0, length);
      }

      bufOutput.flush();

      return filePath;
    } catch (Exception e) {
      throw new MessangerException(MessangerExceptionCode.FILE_SAVE_FAIL, e, filePath);
    }
  }

  private static void createDirectory(String directory) {
    File file = new File(directory);

    if (file.exists()) {
      return;
    }

    if (!directory.endsWith(File.pathSeparator)) {
      directory = directory + File.pathSeparator;
    }

    if (!file.mkdirs()) {
      throw new MessangerException(MessangerExceptionCode.CREATE_DIRECTORY_FAIL, directory);
    }
  }

  @Data
  @Builder
  public static class FileSaveInfo {

    private String fileName;

    private String contentType;

    private InputStream stream;
  }

}
