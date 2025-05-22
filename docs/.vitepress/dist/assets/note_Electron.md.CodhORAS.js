import{_ as a,c as s,o as e,ag as p}from"./chunks/framework.CPUF7_g-.js";const h=JSON.parse('{"title":"闲来无事，玩了一下Web程序桌面端打包。感觉挺好玩，随手记录下。","description":"","frontmatter":{"prev":{"text":"Electron","link":"/note/Electron"},"next":{"text":"webpack","link":"/note/webpack"}},"headers":[],"relativePath":"note/Electron.md","filePath":"note/Electron.md"}'),l={name:"note/Electron.md"};function t(i,n,o,c,r,u){return e(),s("div",null,n[0]||(n[0]=[p(`<h1 id="闲来无事-玩了一下web程序桌面端打包。感觉挺好玩-随手记录下。" tabindex="-1">闲来无事，玩了一下Web程序桌面端打包。感觉挺好玩，随手记录下。 <a class="header-anchor" href="#闲来无事-玩了一下web程序桌面端打包。感觉挺好玩-随手记录下。" aria-label="Permalink to &quot;闲来无事，玩了一下Web程序桌面端打包。感觉挺好玩，随手记录下。&quot;">​</a></h1><h2 id="_1-安装node-略" tabindex="-1">1. 安装Node（略） <a class="header-anchor" href="#_1-安装node-略" aria-label="Permalink to &quot;1. 安装Node（略）&quot;">​</a></h2><h2 id="_2-安装electron" tabindex="-1">2. 安装electron <a class="header-anchor" href="#_2-安装electron" aria-label="Permalink to &quot;2. 安装electron&quot;">​</a></h2><pre><code>  npm install electron --save-dev --verbose
</code></pre><h2 id="_3-将自己的web项目-名为webapp-放到test文件夹中。我的web项目是html、css、js三件套写的。如下。" tabindex="-1">3. 将自己的web项目（名为webApp）放到test文件夹中。我的web项目是html、css、js三件套写的。如下。 <a class="header-anchor" href="#_3-将自己的web项目-名为webapp-放到test文件夹中。我的web项目是html、css、js三件套写的。如下。" aria-label="Permalink to &quot;3. 将自己的web项目（名为webApp）放到test文件夹中。我的web项目是html、css、js三件套写的。如下。&quot;">​</a></h2><h2 id="_4-新建一个js入口文件-名为index-js。-注意-要与-package-json文件中的-main属性对应的文件名相同" tabindex="-1">4. 新建一个js入口文件，名为index.js。 注意：要与 package.json文件中的 main属性对应的文件名相同！ <a class="header-anchor" href="#_4-新建一个js入口文件-名为index-js。-注意-要与-package-json文件中的-main属性对应的文件名相同" aria-label="Permalink to &quot;4. 新建一个js入口文件，名为index.js。 注意：要与 package.json文件中的 main属性对应的文件名相同！&quot;">​</a></h2><p>根据你的文件路径，进行适当修改（注：下列代码icon属性和pathname属性对应的路径，均替换为你的web项目对应的图标和html路径）</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>  const electron = require(&#39;electron&#39;);</span></span>
<span class="line"><span>  const app = electron.app;</span></span>
<span class="line"><span>  const path = require(&#39;path&#39;);</span></span>
<span class="line"><span>  const url = require(&#39;url&#39;);</span></span>
<span class="line"><span>  const BrowserWindow = electron.BrowserWindow;</span></span>
<span class="line"><span>  //创建主窗口</span></span>
<span class="line"><span>  app.on(&#39;ready&#39;, function() {</span></span>
<span class="line"><span>      // 创建窗口</span></span>
<span class="line"><span>      mainWindow = new BrowserWindow({</span></span>
<span class="line"><span>          minimizable: true,//最小化</span></span>
<span class="line"><span>          maximizable: true,//最大化</span></span>
<span class="line"><span>          closable: true,</span></span>
<span class="line"><span>          movable: true,</span></span>
<span class="line"><span>          frame: true,//边框</span></span>
<span class="line"><span>      fullscreen: false,//全屏</span></span>
<span class="line"><span>      titleBarStyle: &#39;hidden&#39;,</span></span>
<span class="line"><span>      autoHideMenuBar: true,</span></span>
<span class="line"><span>      //图标</span></span>
<span class="line"><span>      icon: path.join(__dirname, &#39;/webApp/icon.png&#39;)</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>    // 最大化窗口</span></span>
<span class="line"><span>    mainWindow.maximize();</span></span>
<span class="line"><span>      // 载入应用的index.html</span></span>
<span class="line"><span>      mainWindow.loadURL(url.format({</span></span>
<span class="line"><span>          pathname: path.join(__dirname, &#39;/webApp/index.html&#39;),</span></span>
<span class="line"><span>          protocol: &#39;file:&#39;,</span></span>
<span class="line"><span>          slashes: true</span></span>
<span class="line"><span>    }));</span></span>
<span class="line"><span>      // 窗口关闭时触发</span></span>
<span class="line"><span>      mainWindow.on(&#39;closed&#39;, function() {</span></span>
<span class="line"><span>          // 想要取消窗口对象的引用， 如果你的应用支持多窗口，你需要将所有的窗口对象存储到一个数组中，然后在这里删除    想对应的元素</span></span>
<span class="line"><span>          mainWindow = null</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>  });</span></span></code></pre></div><h2 id="_5-安装electron打包工具" tabindex="-1">5. 安装electron打包工具 <a class="header-anchor" href="#_5-安装electron打包工具" aria-label="Permalink to &quot;5. 安装electron打包工具&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>npm install electron-packager -g</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>  {</span></span>
<span class="line"><span>  &quot;name&quot;: &quot;test&quot;,</span></span>
<span class="line"><span>  &quot;version&quot;: &quot;1.0.0&quot;,</span></span>
<span class="line"><span>  &quot;description&quot;: &quot;&quot;,</span></span>
<span class="line"><span>  &quot;main&quot;: &quot;index.js&quot;,</span></span>
<span class="line"><span>  &quot;scripts&quot;: {</span></span>
<span class="line"><span>    &quot;start&quot;: &quot;electron .&quot;,</span></span>
<span class="line"><span>    //下面这行</span></span>
<span class="line"><span>    &quot;packager&quot;:&quot;electron-packager ./ ISCS --platform=win32 --arch=x64 --electron-version=1.8.4 --out --overwrite&quot;</span><span> //新增</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  &quot;keywords&quot;: [],</span></span>
<span class="line"><span>  &quot;author&quot;: &quot;&quot;,</span></span>
<span class="line"><span>  &quot;license&quot;: &quot;ISC&quot;,</span></span>
<span class="line"><span>  &quot;devDependencies&quot;: {</span></span>
<span class="line"><span>    &quot;electron&quot;: &quot;^29.1.5&quot;</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>  }</span></span></code></pre></div><p>每一个属性说明： ./表示当前路径 ISCS ：exe应用的名称 platform: 打包平台 darwin, linux, mas, win32或者选择all arch: 可选 ia32, x64, armv7l, arm64或者选择all electron-version： electron的版本（） out：生成的exe保存目录 overwrite:添加此属性在每次打包可以直接覆盖原来的exe文件了。</p><h2 id="打包" tabindex="-1">打包 <a class="header-anchor" href="#打包" aria-label="Permalink to &quot;打包&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>npm run-script packager</span></span></code></pre></div>`,14)]))}const m=a(l,[["render",t]]);export{h as __pageData,m as default};
