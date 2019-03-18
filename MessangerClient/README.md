# 一、第三方组件安装步骤
__注意：修改 android\settings.gradle文件，将\\修改为\\\\__
__注意：必要时科学上网__

## （一）react-navigation
### 1、Android
+ 安装包
```
  yarn add react-navigation
  yarn add react-native-gesture-handler
```
+ Link所有原生依赖
```
  react-native link react-native-gesture-handler
```
+ 修改MainActivity.java
```
package com.reactnavigation.example;

import com.facebook.react.ReactActivity;
+ import com.facebook.react.ReactActivityDelegate;
+ import com.facebook.react.ReactRootView;
+ import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

public class MainActivity extends ReactActivity {

  @Override
  protected String getMainComponentName() {
    return "Example";
  }

+  @Override
+  protected ReactActivityDelegate createReactActivityDelegate() {
+    return new ReactActivityDelegate(this, getMainComponentName()) {
+      @Override
+      protected ReactRootView createRootView() {
+       return new RNGestureHandlerEnabledRootView(MainActivity.this);
+      }
+    };
+  }
}
```

### 2、iOS

## （二）react-native-splash-screen
### 1、Android
+ 安装包
```
  yarn add react-native-splash-screen
```
+ Link所有原生依赖
```
  react-native link react-native-splash-screen
```
+ 修改MainActivity.java
```
package com.reactnavigation.example;

import com.facebook.react.ReactActivity;
+ import android.os.Bundle;
+ import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

  @Override
  protected String getMainComponentName() {
    return "Example";
  }

+  @Override
+  protected void onCreate(Bundle savedInstanceState) {
+      SplashScreen.show(this);
+      super.onCreate(savedInstanceState);
+  }
}
```
+ 新增配置

新增目录：android/app/src/main/res/layout，下面增加文件：launch_screen.xml。
```
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical" android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@drawable/launch_screen">
</LinearLayout>
```
新建各个drawable目录，包括drawable-ldpi、drawable-mdpi、drawable-hdpi、drawable-xhdpi、drawable-xxhdpi、drawable-xxxhdpi，然后新建launch_screen.png放到这些目录下。

新建android/app/src/main/res/values/colors.xml文件。
```
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="primary_dark">#000000</color>
</resources>
```

## （三）react-native-vector-icons
### 1、Android
+ 安装包
```
yarn add react-native-vector-icons
```
+ Link所有原生依赖
```
react-native link react-native-vector-icons
```

## （四）react-native-image-crop-picker
### 1、Android
+ 安装包
```
yarn add react-native-image-crop-picker
```
+ Link所有原生依赖
```
react-native link react-native-image-crop-picker
```
+ 修改android/build.gradle
```
allprojects {
  repositories {
    mavenLocal()
    google()
    jcenter()
    maven {
      // All of React Native (JS, Obj-C sources, Android binaries) is installed from npm
      url "$rootDir/../node_modules/react-native/android"
    }
+    maven { url 'https://maven.google.com' }

+    maven { url "https://jitpack.io" }
  }
}
```
+ 修改android/app/build.gradle，确认compileSdkVersion 27，buildToolsVersion "27.0.3" targetSdkVersion 27以上版本
```
android {
  compileSdkVersion rootProject.ext.compileSdkVersion
  buildToolsVersion rootProject.ext.buildToolsVersion
  ...
  defaultConfig {
    ...
    targetSdkVersion rootProject.ext.targetSdkVersion
    + vectorDrawables.useSupportLibrary = true
  }
```
+ 修改app\src\main\AndroidManifest.xml，使用摄像头权限
```
<uses-permission android:name="android.permission.CAMERA"/>
<uses-feature android:name="android.hardware.camera" android:required="false" />
<uses-feature android:name="android.hardware.camera.front" android:required="false" />
```

## （五）react-native-camera
### 1、Android
+ 安装包
```
yarn add react-native-camera
```
+ Link所有原生依赖
```
react-native link react-native-camera
```
+ 修改app\src\main\AndroidManifest.xml，使用权限
```
<uses-permission android:name="android.permission.RECORD_AUDIO"/>
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

## （六）react-native-orientation
### 1、Android
+ 安装包
```
yarn add react-native-orientation
```
+ Link所有原生依赖
```
react-native link react-native-orientation
```

# （七）react-native-sqlite-storage
### 1、Android
+ 安装包
```
npm install --save react-native-sqlite-storage
```
+ Link所有原生依赖
```
react-native link react-native-sqlite-storage
```
+ 修改android/setting.gradle
```
include ':react-native-sqlite-storage'
project(':react-native-sqlite-storage').projectDir = new File(rootProject.projectDir, '..\\node_modules\\react-native-sqlite-storage\\src\\android')
```
+ 修改android/app/build.gradle
```
dependencies {
    ...
    implementation project(':react-native-sqlite-storage')
}
```
+ 修改android/app/src/main/java/com/XXXX/MainApplication.java
```
import org.pgsqlite.SQLitePluginPackage;

public class MainApplication extends Application implements ReactApplication {
    @Override
    protected List<ReactPackage> getPackages() {
      ...
      new SQLitePluginPackage()
    }
}
```
# （八）react-native-fs
### 1、Android
+ 安装包
```
npm install --save react-native-fs
```
+ Link所有原生依赖
```
react-native link react-native-fs
```
+ 修改android/app/src/main/java/com/XXXX/MainApplication.java
```
import com.rnfs.RNFSPackage;

public class MainApplication extends Application implements ReactApplication {
    @Override
    protected List<ReactPackage> getPackages() {
      ...
      new RNFSPackage()
    }
}
```

# （九）react-native-file-selector
###1、Android
+ 安装包
```
yarn add react-native-file-selector
```
+ Link原生依赖
```
react-native link react-native-file-selector
```
+ 修改build.gradle
```
allprojects {
    repositories {
        mavenLocal()
        jcenter()
        maven { url "https://maven.google.com" }
        maven {
            url  "http://dl.bintray.com/lukaville/maven"
        }
        ...
    }
}
```
+ 修改app/build.gradle
增加
```
android {
    defaultConfig {
        multiDexEnabled true
    }
    ...
    dependencies {
      implementation "com.android.support:appcompat-v7:${rootProject.ext.supportLibVersion}"
      implementation "com.android.support:design:${rootProject.ext.supportLibVersion}"
      implementation "com.android.support:support-v4:${rootProject.ext.supportLibVersion}"
      implementation "com.android.support:recyclerview-v7:${rootProject.ext.supportLibVersion}"
      implementation "com.android.support:support-media-compat:${rootProject.ext.supportLibVersion}"
      ...
```
+ 修改android/app/src/main/res/values/colors.xml
```
    <color name="colorPrimary">#3F51B5</color>
    <color name="colorPrimaryDark">#303F9F</color>
    <color name="colorAccent">#FF4081</color>
```
+ 添加权限 android\app\src\main\AndroidManifest.xml
```
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```


yarn add react-native-audio
react-native link react-native-audio

yarn add react-native-sound
react-native link react-native-sound

# 二、dev-tools安装
+ 全局安装
```
yarn add react-devtools
```
+ 配置package.json中命令
编辑package.json文件，在scripts节点中增加devtools节点
```
"devtools": "react-devtools"
```
+ 运行，会自动关联运行的RN
```
yarn run devtools
```

# 三、禁止横屏
+ 修改文件android\app\src\main\AndroidManifest.xml在application\activity下面增加如下内容：
```
android:screenOrientation="portrait"
```
