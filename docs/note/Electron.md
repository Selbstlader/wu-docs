---
prev:
  text: 'Electron'
  link: '/note/Electron'
next:
  text: 'webpack'
  link: '/note/webpack'
---

# 闲来无事，玩了一下Web程序桌面端打包。感觉挺好玩，随手记录下。


## 1. 安装Node（略）

## 2. 安装electron
      npm install electron --save-dev --verbose

## 3. 将自己的web项目（名为webApp）放到test文件夹中。我的web项目是html、css、js三件套写的。如下。

## 4. 新建一个js入口文件，名为index.js。 注意：要与 package.json文件中的 main属性对应的文件名相同！

  根据你的文件路径，进行适当修改（注：下列代码icon属性和pathname属性对应的路径，均替换为你的web项目对应的图标和html路径）
  ```
    const electron = require('electron');
    const app = electron.app;
    const path = require('path');
    const url = require('url');
    const BrowserWindow = electron.BrowserWindow;
    //创建主窗口
    app.on('ready', function() {
        // 创建窗口
        mainWindow = new BrowserWindow({
            minimizable: true,//最小化
            maximizable: true,//最大化
            closable: true,
            movable: true,
            frame: true,//边框
        fullscreen: false,//全屏
        titleBarStyle: 'hidden',
        autoHideMenuBar: true,
        //图标
        icon: path.join(__dirname, '/webApp/icon.png')
      });
      // 最大化窗口
      mainWindow.maximize();
        // 载入应用的index.html
        mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, '/webApp/index.html'),
            protocol: 'file:',
            slashes: true
      }));
        // 窗口关闭时触发
        mainWindow.on('closed', function() {
            // 想要取消窗口对象的引用， 如果你的应用支持多窗口，你需要将所有的窗口对象存储到一个数组中，然后在这里删除    想对应的元素
            mainWindow = null
      });
    });

  ```
## 5. 安装electron打包工具
  
  ```
  npm install electron-packager -g
  ```
  ```
    {
    "name": "test",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "start": "electron .",
      //下面这行
      "packager":"electron-packager ./ ISCS --platform=win32 --arch=x64 --electron-version=1.8.4 --out --overwrite" //新增
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "devDependencies": {
      "electron": "^29.1.5"
     }
    }
  ```
  每一个属性说明：
  ./表示当前路径
  ISCS ：exe应用的名称
  platform: 打包平台 darwin, linux, mas, win32或者选择all
  arch: 可选 ia32, x64, armv7l, arm64或者选择all
  electron-version： electron的版本（）
  out：生成的exe保存目录
  overwrite:添加此属性在每次打包可以直接覆盖原来的exe文件了。

  ## 打包
  ```
  npm run-script packager
  ```