package com.sunlearning.messanger.library.utility;

import com.sunlearning.messanger.library.exception.MessangerException;
import com.sunlearning.messanger.library.exception.MessangerExceptionCode;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import javax.imageio.ImageIO;
import net.coobird.thumbnailator.Thumbnails;
import org.bytedeco.javacv.FFmpegFrameGrabber;
import org.bytedeco.javacv.Frame;
import org.bytedeco.javacv.Java2DFrameConverter;

public class ThumbUtil {

  private ThumbUtil() {
  }

  public static void getVideoThumb(String filePath) {
    try {
      FFmpegFrameGrabber ff = FFmpegFrameGrabber.createDefault(filePath);

      ff.start();
      int ffLength = ff.getLengthInFrames();

      Frame f;
      int i = 0;
      while (i < ffLength) {
        f = ff.grabImage();
        //截取第6帧
        if ((i > 5) && (f.image != null)) {
          //执行截图并放入指定位置
          doExecuteFrame(f, filePath + ".thumb.png");

          break;
        }
        i++;
      }

      ff.stop();
    } catch (IOException e) {
      throw new MessangerException(MessangerExceptionCode.FILE_SAVE_FAIL, filePath);
    }
  }

  /**
   * 截取缩略图
   *
   * @param f Frame
   */
  private static void doExecuteFrame(Frame f, String targerFilePath) throws IOException {
    if (null == f || null == f.image) {
      return;
    }

    Java2DFrameConverter converter = new Java2DFrameConverter();

    BufferedImage bi = converter.getBufferedImage(f);

    File output = new File(targerFilePath);

    ImageIO.write(bi, "png", output);
  }


  public static void getImageThumb(String filePath) {
    String outFileName = filePath + ".thumb.png";

    try {
      Thumbnails.of(filePath).size(200, 300).toFile(outFileName);
    } catch (IOException e) {
      throw new MessangerException(MessangerExceptionCode.FILE_SAVE_FAIL, filePath);
    }
  }
}
