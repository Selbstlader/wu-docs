import{_ as s,c as a,o as n,a4 as e}from"./chunks/framework.DLF8A2I8.js";const k=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"doc/Electron/13.md","filePath":"doc/Electron/13.md"}'),p={name:"doc/Electron/13.md"},t=e(`<p>在上一节中我们介绍了如何升级 Electron 应用，现在我们已经介绍完了如何开发一个 Electron 应用以及如何把 Electron 应用分发给用户。如果按照一个产品的生命周期来考虑，那么我们现在面对的是如何观察、分析、调试线上应用了，如果你不了解 Electron 应用在用户侧的特征，那么就很难正确地分析线上应用的问题。</p><p>本节我们通过讲解 Electron 应用安装目录的结构、缓存目录的结构、注册表信息、全量升级缓存目录的结构等信息来介绍线上应用的特征，除此之外我们还会分析开发环境下 electron npm 包和 electron-builder npm 包的特征，以便于我们分析开发环境下的问题。</p><h2 id="应用程序安装目录" tabindex="-1">应用程序安装目录 <a class="header-anchor" href="#应用程序安装目录" aria-label="Permalink to &quot;应用程序安装目录&quot;">​</a></h2><p>如果你在使用 electron-builder 打包你的应用时设置了不允许用户修改应用程序安装目录，那么你的应用程序会安装在用户的如下目录中：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>64 位应用程序的安装目录：C:\\Program Files\\\\[yourAppName]</span></span>
<span class="line"><span>32 位应用程序的安装目录：C:\\Program Files (x86)\\\\[yourAppName]</span></span></code></pre></div><p>应用程序安装目录下的文件及其功用如下所示：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>应用程序的安装目录</span></span>
<span class="line"><span>├─ locales（Electron的多国语言文件）</span></span>
<span class="line"><span>│ │ ├─ en-GB.pak（英国英语）</span></span>
<span class="line"><span>│ │ ├─ en-US.pak（美国英语）</span></span>
<span class="line"><span>│ │ ├─ zh-CN.pak（简体中文）</span></span>
<span class="line"><span>│ │ ├─ zh-TW.pak（繁体中文）</span></span>
<span class="line"><span>│ │ ├─ .....（其他国家语言文件，一般情况下可以删除）</span></span>
<span class="line"><span>├─ resources（应用程序资源及编译后的源码）</span></span>
<span class="line"><span>│  ├─ app.asar（编译后的源码压缩文档）</span></span>
<span class="line"><span>│  ├─ app.asar.unpacked（编译后的源码未压缩文档）</span></span>
<span class="line"><span>│  ├─ app（如果没有app.asar或app.asar.unpacked，则编译后源码文档在此目录下）</span></span>
<span class="line"><span>│  ├─ app-update.yml（应用程序升级相关的配置文件）</span></span>
<span class="line"><span>│  ├─ .....（通过electron-builder配置的其他的额外资源）</span></span>
<span class="line"><span>├─ swiftshader（图形渲染引擎相关库）</span></span>
<span class="line"><span>├─ yourApp.exe（应用程序可执行文件，其实就是electron.exe修改图标和文件名后得来的）</span></span>
<span class="line"><span>├─ UnInstall yourApp.exe（卸载应用程序的可执行文件）</span></span>
<span class="line"><span>└─ ......（其他Electron应用程序使用的二进制资源）</span></span></code></pre></div><p>Electron 应用在 Mac 操作系统上安装之后，会以 app 应用的形式出现在用户的应用程序目录下，<strong>开发者可以通过右击菜单的<code>显示包内容</code>来查看应用程序内的文件组织情况</strong>，如下所示：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>应用程序.app</span></span>
<span class="line"><span>├─ Contents（根目录）</span></span>
<span class="line"><span>│ │ ├─ _CodeSignature（存放应用程序的签名信息）</span></span>
<span class="line"><span>│ │ ├─ Frameworks（存放Electron相关的二进制资源）</span></span>
<span class="line"><span>│ │ ├─ Info.plist（应用程序的配置文件，包含应用程序名称、id、图标以及底层接口权限的信息）</span></span>
<span class="line"><span>│ │ ├─ Resources（应用程序资源及编译后的源码）</span></span>
<span class="line"><span>│ │ │ ├─ app-update.yml（应用程序升级相关的配置文件）</span></span>
<span class="line"><span>│ │ │ ├─ app.asar（编译后的源码压缩文档）</span></span>
<span class="line"><span>│ │ │ ├─ app.asar.unpacked（编译后的源码未压缩文档）</span></span>
<span class="line"><span>│ │ │ ├─ app（如果没有app.asar或app.asar.unpacked文件，则编译后源码文档在此目录下）</span></span>
<span class="line"><span>│ │ │ ├─ ...（Electron内置的多国语言文件）</span></span>
<span class="line"><span>└─└─└─ ...（通过electron-builder配置的其他的额外资源）</span></span></code></pre></div><h2 id="应用程序缓存目录" tabindex="-1">应用程序缓存目录 <a class="header-anchor" href="#应用程序缓存目录" aria-label="Permalink to &quot;应用程序缓存目录&quot;">​</a></h2><p>用户第一次启动 Electron 应用后，Electron 会在如下目录创建相应的缓存文件，该目录的文件结构及功能说明如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>C:\\Users\\[yourOsUserName]\\AppData\\Roaming\\[yourAppName]</span></span>
<span class="line"><span>├─ IndexedDB（Electron应用渲染进程IndexedDB数据存放目录）</span></span>
<span class="line"><span>├─ Local Storage（Electron应用渲染进程Local Storage数据存放目录）</span></span>
<span class="line"><span>├─ Session Storage（Electron应用渲染进程Session Storage数据存放目录）</span></span>
<span class="line"><span>├─ Crashpad（Electron应用崩溃日志数据存放目录）</span></span>
<span class="line"><span>├─ Code Cache（Electron应用渲染进程源码文件缓存目录，wasm的缓存也会存在此处）</span></span>
<span class="line"><span>├─ Partitions（如果你的应用中适应了自定义协议，或根据字符串产生了session，此目录将有相应的内容）</span></span>
<span class="line"><span>├─ GPUCache（Electron应用渲染进程GPU运行过程产生的缓存数据）</span></span>
<span class="line"><span>└─ ......（其他Electron渲染进程缓存文件）</span></span></code></pre></div><p>Mac 操作系统下的缓存目录为：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>MacintoshHD/用户/[yourOsUserName]/资源库/ApplicationSupport/[yourAppName]</span></span></code></pre></div><p>该目录下的内容与子目录结构跟 Windows 操作系统类似，不再赘述。</p><p>需要注意的是，<strong>虽然以上目录内的文件都是加密存储的，但你只要把这个目录下的文件拷贝到另一台机器上，就可以用一个伪造的 Electron 程序读取到这些缓存文件内的数据</strong>。</p><p>另外，我们前面章节介绍的客户端数据库文件也是存放在这个目录下的。</p><p>Electron 为我们提供了一个便捷的 API 来获取此路径，此方法执行时会判断当前应用正运行在什么操作系统上，然后根据操作系统的名称返回具体的路径地址。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">app.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getPath</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;userData&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span></code></pre></div><h2 id="注册表键值" tabindex="-1">注册表键值 <a class="header-anchor" href="#注册表键值" aria-label="Permalink to &quot;注册表键值&quot;">​</a></h2><p>如果开发者使用 Electron 提供的开机自启动 API，为应用程序设置了开机自启动功能，那么在 Windows 操作系统下，用户注册表如下路径下会增加一个键值对：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>计算机\\HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Run</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>键：electron.app.[yourAppName]</span></span>
<span class="line"><span>值：C:\\Program Files (x86)\\[yourAppName]\\[yourAppName].exe</span></span></code></pre></div><p>设置开机自启动的代码如下所示：</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { app } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;electron&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">app.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">setLoginItemSettings</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  openAtLogin: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span></code></pre></div><p>另外 99% 的 Electron 应用是通过安装包分发给最终用户的，有安装包势必就有卸载程序，操作系统一般会在注册表如下三个路径下记录系统的卸载程序路径：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>计算机\\HKEY_LOCAL_MACHINE\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall</span></span>
<span class="line"><span>计算机\\HKEY_LOCAL_MACHINE\\Software\\\\Wow6432Node\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall</span></span>
<span class="line"><span>计算机\\HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall</span></span></code></pre></div><p>如果开发者使用 app 对象的 setAsDefaultProtocolClient 方法，把自己的应用设置成可以通过外部连接唤起的应用，那么这个操作也会在用户的注册表内留下痕迹，如下为 GitHubDesktop 在我的注册表中写入的内容：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>键：计算机\\HKEY_CURRENT_USER\\Software\\Classes\\github-windows\\shell\\open\\command</span></span>
<span class="line"><span>值：&quot;C:\\Users\\liuxiaolun\\AppData\\Local\\GitHubDesktop\\app-2.9.0\\GitHubDesktop.exe&quot; --protocol-launcher &quot;%1&quot;</span></span></code></pre></div><p>如你所见，当用户点击连接唤起我们的应用时，这个注册表键值不但给我的应用传递了--protocol-launcher 参数，还中转了连接中的参数给我的应用。</p><p>Mac 没有注册表，相关的信息都是通过 Info.plist 文件和应用程序共同完成的。</p><h2 id="升级程序缓存目录" tabindex="-1">升级程序缓存目录 <a class="header-anchor" href="#升级程序缓存目录" aria-label="Permalink to &quot;升级程序缓存目录&quot;">​</a></h2><p>前文我们介绍了全量升级 Electron 应用的方案，当 electron-updater 检测到升级服务器上存在新版本的应用程序时，会下载新版本相关的文件，并保存在如下目录中：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span> C:\\Users\\[userName]\\AppData\\Local\\[appName]-updater\\pending</span></span></code></pre></div><p>下载完成后会校验新版本安装文件哈希值是否与服务器上的安装文件的哈希值相同。</p><h2 id="任务栏快捷方式" tabindex="-1">任务栏快捷方式 <a class="header-anchor" href="#任务栏快捷方式" aria-label="Permalink to &quot;任务栏快捷方式&quot;">​</a></h2><p>如果用户把应用程序的快捷方式固定到任务栏，这个快捷方式的存放路径为：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>C:\\Users\\[userName]\\AppData\\Roaming\\Microsoft\\Internet Explorer\\Quick Launch\\User Pinned\\TaskBar</span></span></code></pre></div><p>在一些特殊的情况下，我们可能要更新这个快捷方式的目标程序，比如用户先安装了 32 位的应用程序，又安装 64 位的应用程序，此时用户固定在任务栏的图标指向的目标程序路径就是错的了。</p><p>Electron 为我们提供了读写快捷方式的 API：shell 模块下的 <code>readShortcutLink</code> 和 <code>writeShortcutLink</code>，开发者可以使用这两个 API 来更新任务栏上的快捷方式。</p><h2 id="electron-npm-包的特征" tabindex="-1">Electron npm 包的特征 <a class="header-anchor" href="#electron-npm-包的特征" aria-label="Permalink to &quot;Electron npm 包的特征&quot;">​</a></h2><p>Electron npm 包会被安装到工程的如下目录中：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>yourSolutionDir\\node_modules\\electron</span></span></code></pre></div><p>这个目录下 dist 子目录中存放着 Electron 的二进制文件，我们开发调试应用时，启动的就是下面这个应用程序：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>yourSolutionDir\\node_modules\\electron\\dist\\electron.exe</span></span></code></pre></div><p>这个包的导出文件是 index.js，这个文件并没有什么特殊的逻辑，只是返回了上面 electron.exe 的路径。如果你还记得我们在<a href="https://juejin.cn/book/7152717638173966349/section/7152720221663395853" target="_blank" rel="noreferrer">《如何开发 Vite3 插件构建 Electron 开发环境》</a>章节中介绍的知识，我们就是通过<code>require(&quot;electron&quot;)</code>获取 electron.exe 的路径的，如下代码所示：</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> electronProcess </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> spawn</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">require</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;electron&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">).</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">toString</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(), [], {});</span></span></code></pre></div><p>安装 Electron npm 包时，npm 会在如下路径下载 Electron 的二进制资源：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>https://github.com/electron/electron/releases/download/v20.1.3/electron-v20.1.3-win32-x64.zip</span></span></code></pre></div><p>这个地址包含如下了三个部分：</p><ul><li>镜像部分：<a href="https://github.com/electron/electron/releases/download/%E3%80%82" target="_blank" rel="noreferrer">https://github.com/electron/electron/releases/download/。</a></li><li>版本部分：v11.1.0/。</li><li>文件部分：electron-v11.1.0-win32-x64.zip。</li></ul><p>这三部分联合起来最终构成了下载地址，每个部分都有其默认值，也有对应的重写该部分值的环境变量。</p><ul><li>镜像部分的环境变量：ELECTRON_MIRROR。</li><li>版本部分的环境变量：ELECTRON_CUSTOM_DIR。</li><li>文件部分的环境变量：ELECTRON_CUSTOM_FILENAME。</li></ul><p>如果你因为网络环境问题而无法成功安装 Electron npm 包，那么可以尝试设置 ELECTRON_MIRROR 的环境变量为<a href="https://npm.taobao.org/mirrors/electron/" target="_blank" rel="noreferrer">https://npm.taobao.org/mirrors/electron/</a> ，这是阿里巴巴团队为国内开发者提供的镜像地址。</p><p>npm 会首先把下载到的 Electron 可执行文件及其二进制资源压缩包放置到如下目录中：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>C:\\Users\\ADMINI~1\\AppData\\Local\\Temp</span></span></code></pre></div><p>文件下载完成后，npm 会把它复制到缓存目录中以备下次使用。默认的缓存目录为：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>C:\\Users\\[your os username]\\AppData\\Local\\electron\\Cache</span></span></code></pre></div><p>开发者可以通过设置名为 electron_config_cache 的环境变量来自定义缓存目录。知道了缓存目录的位置之后，开发者就可以先手动把 Electron 可执行文件及其二进制资源压缩包和哈希文件放置到相应的缓存目录中。这样再通过 <code>npm install</code> 命令安装 Electron 依赖包时，就会先从你的缓存目录里获取相应的文件，而不是去网络上下载了。这对于工作在无外网环境下的开发者来说，无疑是一种非常有价值的手段。</p><p>需要注意的是，缓存目录子目录的命名方式是有要求的，如下所示：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>//二进制包文件的路径</span></span>
<span class="line"><span>[你的缓存目录]/httpsgithub.comelectronelectronreleasesdownloadv11.1.0electron-v11.1.0-win32-x64.zip/electron-v9.2.0-win32-x64.zip</span></span>
<span class="line"><span>//哈希值文件的路径</span></span>
<span class="line"><span>[你的缓存目录]/httpsgithub.comelectronelectronreleasesdownloadv11.1.0SHASUMS256.txt/SHASUMS256.txt</span></span></code></pre></div><p>路径中[你的缓存目录]下的子目录的命名方式看起来有些奇怪，这其实就是下载地址格式化得来的（去除了 url 路径中的斜杠，使得其能成为文件路径）。</p><h2 id="electron-builder-npm-包的特征" tabindex="-1">electron-builder npm 包的特征 <a class="header-anchor" href="#electron-builder-npm-包的特征" aria-label="Permalink to &quot;electron-builder npm 包的特征&quot;">​</a></h2><p>electron-builder 也包含一些二进制资源，这些二进制资源主要为生成安装包和应用程序签名服务。这些二进制资源默认存放在如下目录中。</p><ul><li>安装包制作工具：C:\\Users\\yourUserName\\AppData\\Local\\electron-builder\\Cache\\nsis。</li><li>应用程序签名工具：C:\\Users\\yourUserName\\AppData\\Local\\electron-builder\\Cache\\winCodeSign。</li></ul><p>electron-builder 下载并缓存 Electron 的逻辑与安装 Electron 依赖包时的下载和缓存逻辑不同。electron-builder 下载 Electron 时使用的镜像环境变量为： <code>ELECTRON_BUILDER_BINARIES_MIRROR</code>，缓存路径环境变量为： <code>ELECTRON_BUILDER_CACHE</code>。</p><p>当开发者在 64 位操作系统上打 32 位的应用程序安装包时，electron-builder 会去服务器下载 32 位的 Electron 二进制包，从而完成<strong>交叉编译</strong>的需求，这实际上并不是真正的交叉编译。</p><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>本节我们先介绍了 Electron 应用安装目录的结构，不知道你有没有注意到 Windows 安装目录和 Mac 安装目录的文件结构差异是非常巨大的；接着我们介绍了 Electron 应用在 Windows 和 Mac 操作系统下的缓存目录，这两个操作系统下的缓存目录作用是相同的；之后我们介绍了一个 Electron 应用会在 Windows 操作系统下留下哪些注册表信息；还讲解了 Electron 应用全量升级时升级文件的缓存目录。最后介绍的 electron npm 包和 electron-builder npm 包的特征主要是为了方便我们分析开发环境下的问题。</p><p>知道了 Electron 应用具备哪些特征之后，下一节我们将介绍如何调试用户侧的 Electron 应用。</p>`,70),i=[t];function l(o,c,r,d,h,u){return n(),a("div",null,i)}const E=s(p,[["render",l]]);export{k as __pageData,E as default};
