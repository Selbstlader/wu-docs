import{_ as s,c as i,o as a,a4 as t}from"./chunks/framework.DLF8A2I8.js";const y=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"doc/Electron/15.md","filePath":"doc/Electron/15.md"}'),n={name:"doc/Electron/15.md"},h=t(`<p>开发普通的桌面应用单凭我们前面介绍的 Electron 和 Vue 知识或许已经足够了，但我们应该知道桌面应用开发所涉及的知识浩如烟海，即使你掌握了所有 Electron 和 Vue 的知识也还是远远不够。本节我们就将介绍一些特殊的需求、问题的处理方案，让你知道这个领域有很多有趣的问题等待我们去解决。</p><p>本节中我们通过“四个课题”来打开开发者的眼界：首先我们讲解如何把窗口钉在桌面上，其次介绍如何重新上传文件，接着再分析如何监控内存消耗，最后是如何模拟弱网环境。</p><h2 id="把窗口钉在桌面上" tabindex="-1">把窗口钉在桌面上 <a class="header-anchor" href="#把窗口钉在桌面上" aria-label="Permalink to &quot;把窗口钉在桌面上&quot;">​</a></h2><p>有一些特殊的应用，可以把窗口“钉”在桌面上，比如：桌面日历，当用户点击“显示桌面”时，所有的窗口都会隐藏，桌面会显示给用户，但桌面日历窗口，可以不被隐藏，依然显示在桌面上，就好像被“钉”在桌面上一样。</p><p>很显然 Electron 是没有类似的能力的，开发者要想实现这样的功能，可能最先想到的是使用原生模块来调用操作系统的 API 来完成这样的功能。</p><p>这确实是最直接的解决问题的办法，这里只简单介绍一下思路：</p><ol><li>得到当前窗口的句柄；</li><li>找到桌面窗口的窗口句柄（没错，桌面也是一个窗口）；</li><li>把当前窗口设置为桌面窗口的子窗口；</li><li>把当前窗口设置为最底层窗口（zOrder）；</li><li>不允许改变当前窗口的层级（zOrder）。</li></ol><p>更方便的做法是使用这个开源库：<a href="https://github.com/lowfront/electget" target="_blank" rel="noreferrer">electget</a> 。</p><p>为你的项目引入这个库，然后在主进程中执行如下代码：</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// import electget from &quot;electget&quot;;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">electget.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">preventFromAeroPeek</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(win);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">electget.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">preventFromShowDesktop</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(win);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">electget.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">moveToBottom</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(win);</span></span></code></pre></div><p>这时你的窗口就可以“钉”在桌面上了。为了更完美地满足需求，我们最好监控一下窗口聚焦事件，当用户聚焦窗口时，把窗口移至最底层，如下代码所示：</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">app.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">on</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;browser-window-focus&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">e</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">win</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> BrowserWindow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (win.id </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> mainWindow.id) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  electget.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">moveToBottom</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(mainWindow);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span></code></pre></div><p>这样做可以避免在用户与窗口交互后，被钉住的窗口浮到其他窗口之上。</p><blockquote><p>这个窗口虽然被钉在桌面上了，但它还是显示在桌面图标之上的，如果你想要把窗口放置在桌面图标之下（桌面背景之上），那么你需要使用更复杂的技术。可以参考这个开源项目 <a href="https://github.com/meslzy/electron-as-wallpaper" target="_blank" rel="noreferrer">electron-as-wallpaper</a> 和我写的<a href="https://zhuanlan.zhihu.com/p/580281260" target="_blank" rel="noreferrer">这篇文章</a>，此技术常用于开发动态桌面类产品。（此技术用到了操作系统未公开的 API，兼容性并不是很好。）</p></blockquote><p>我们之所以介绍这个库，主要目的并不是介绍它的能力，而是介绍它的实现方式，它并不能算一个真正的原生模块，它是基于 <a href="https://github.com/node-ffi-napi/node-ffi-napi" target="_blank" rel="noreferrer">ffi-napi</a> 开发的。开发者可以基于这个库使用纯 JavaScript 加载和调用动态库。也就是说，开发者可以使用 JavaScript 访问操作系统动态链接库，有了它开发者就不需要编写任何 C++ 代码完成原生功能了。</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ffi </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;ffi-napi&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> user32</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ffi.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Library</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;user32&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, { GetDesktopWindow: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;ulong&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, []] });</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> desktopHWnd</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> user32.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">GetDesktopWindow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span></code></pre></div><p>上面的代码就是使用<code>ffi-napi</code>模块获取桌面窗口的窗口句柄的示例代码。</p><p>本示例的代码请通过如下地址自行下载：</p><ul><li><a href="https://github.com/xland/51richeng" target="_blank" rel="noreferrer">源码仓储</a></li></ul><h2 id="文件重新上传" tabindex="-1">文件重新上传 <a class="header-anchor" href="#文件重新上传" aria-label="Permalink to &quot;文件重新上传&quot;">​</a></h2><p>如果你的桌面应用涉及到文件上传的功能，而且上传的文件有可能会很大的话，那么大概率你需要开发文件重新上传的功能。</p><p>当网络环境不好或者用户不小心退出了应用，上传过程就会中断，当上传环境恢复后，产品应该可以重新上传之前没上传成功的文件。</p><p>我们先来介绍有问题的方案，开发者在上传文件之前，把文件路径记录下来，重新上传文件时，直接用文件路径构造一个 File 对象，然后再上传到服务端。</p><p>使用文件路径构造 File 对象的代码如下所示：</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> extname </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> path.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">extname</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(filePath);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> buffer </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> await</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> fs.promises.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">readFile</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(filePath);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> file </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> window.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">File</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([Uint8Array.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">from</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(buffer)], path.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">basename</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(filePath), {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  type: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.ext2type[extname], </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//mimetype类似&quot;image/png&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span></code></pre></div><p>这种方法要把整个文件的内容都读出来放到 buffer 里，小文件还好，<strong>遇到大文件就极其消耗用户的内存了，而且 V8 并不会及时释放这块内存</strong>。</p><p>所以，更好的方案是一块一块读文件的内容，然后再附加到 POST 请求内。显然这样的 POST 请求要自行构建，可以参考 <a href="https://xhr.spec.whatwg.org/#the-formdata-interface" target="_blank" rel="noreferrer">W3C 的文档</a> 。</p><p>有一个开源库—— <a href="https://github.com/form-data/form-data" target="_blank" rel="noreferrer">form-data</a>，可以帮我们大大简化这方面的工作。</p><p>把 form-data 引入工程内后，可以使用如下代码构造上传表单，用这种方法上传文件就是分片上传的。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> FormData </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> require</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;form-data&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> fs </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> require</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;fs&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> form </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> FormData</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">form.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">append</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;yourFile&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, fs.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">createReadStream</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;/your/file/path.7z&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">));</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">form.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">submit</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;http://yourFileService.com/upload&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span></code></pre></div><p>如果你要开发取消上传、显示文件上传进度等功能，可以参考如下代码：</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">new</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Promise</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">resolve</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">reject</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> req </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> formData.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">submit</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(params, (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">err</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">res</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> body</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [];</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    res.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">on</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;data&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">chunk</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      body.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">push</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(chunk);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    });</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    res.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">on</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;end&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> resString </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Buffer.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">concat</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(body).</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">toString</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> resObj </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> JSON</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">parse</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(resString);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      eventer.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">off</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;setXhrAbort&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, abort);</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">      resolve</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(res);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    });</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  });</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  req.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">on</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;socket&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    req.socket.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">on</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;drain&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> percent </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> parseInt</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">((req.socket.bytesWritten </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> file.size) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 100</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      //此处显示文件上传进度的逻辑</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    })</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  );</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  let</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> abort</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    req.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">destroy</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    //调用此方法结束文件上传</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  };</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span></code></pre></div><p>formData.submit 方法内部执行的其实是 Node.js 的 http.request 方法，返回的是 http.ClientRequest 对象，关于这个对象的详细介绍，请参考<a href="https://nodejs.org/dist/latest-v16.x/docs/api/http.html#class-httpclientrequest" target="_blank" rel="noreferrer">该官方文档</a> 。</p><h2 id="内存消耗监控" tabindex="-1">内存消耗监控 <a class="header-anchor" href="#内存消耗监控" aria-label="Permalink to &quot;内存消耗监控&quot;">​</a></h2><p>就像我们前面说的，如果应用突然内存消耗暴涨又没有及时释放的话，我们该如何及时发现这种问题呢？Chromium 为开发者提供了内存监控工具，Electron 也因此具备此能力，打开 Electron 的开发者调试工具，切换到 Memory 面板，如下图所示：</p><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a1d5374d05c44bbf9d25edffb57c36a3~tplv-k3u1fbpfcp-watermark.image?" alt="neicun.png"></p><p>面板中提供了三种监控内存的方式。</p><ul><li><strong>Heap snapshot</strong>：用于打印内存堆快照，堆快照用于分析页面 JavaScript 对象和相关 dom 节点之间的内存分布情况。</li><li><strong>Allocation instrumentation on timeline</strong>：用于从时间维度观察内存的变化情况。</li><li><strong>Allocation sampling</strong>：用于采样内存分配信息，由于其开销较小，可以用于长时间记录内存的变化情况。</li></ul><p>选择 Heap snapshot，并点击 Take snapshot 按钮，截取当前应用内存堆栈的快照信息，生成的快照信息可以通过三个维度查看。</p><ul><li><strong>Summary</strong>：以构造函数分类显示堆栈使用情况。</li><li><strong>Containment</strong>：以 GC 路径（深度）分类显示堆栈使用情况（较少使用）。</li><li><strong>Statistics</strong>：以饼状图显示内存占用信息。</li></ul><p>把界面切换到 Summary 模式，如下图所示：</p><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/290027cb66184818b00b00f65cf25032~tplv-k3u1fbpfcp-watermark.image?" alt="neicun2.png"></p><p>此界面包含以下四列内容。</p><ul><li><strong>Constructor</strong>：构造函数名，例如 Object、Module、Socket、Array、string 等，构造函数名后 <code>x21210</code> 代表着此行信息存在着 21210 个该类型的实例。</li><li><strong>Distance</strong>：指当前对象到根对象的距离，对于 Electron 应用来说，根对象有可能是 window 对象，也有可能是 global 对象。此值越大，说明引用层次越深。</li><li><strong>Shallow Size</strong>：指对象自身的大小，不包括它所引用的对象，也就是该对象自有的布尔类型、数字类型和字符串类型所占内存之和。</li><li><strong>Retained Size</strong>：指对象的总大小，包括它所引用的对象的大小，同样也是该对象被 GC 之后所能回收的内存的大小。</li></ul><p>一般情况下，开发者会依据 Retained Size 降序展示以分析内存消耗情况。</p><p>选中一行内存消耗较高的记录后，视图的下方将会出现与这行内存占用有关的业务逻辑信息，开发者可以通过此视图内的链接切换到业务代码中观察哪行代码导致此处内存消耗增加了。</p><p>需要注意的是 Constructor 列中，值为（closure）的项，这里记录着因闭包函数引用而未被释放的内存，这类内存泄漏问题是开发时最容易忽略、调优时最难发现的问题。开发者应尤为注意。</p><h2 id="模拟弱网环境" tabindex="-1">模拟弱网环境 <a class="header-anchor" href="#模拟弱网环境" aria-label="Permalink to &quot;模拟弱网环境&quot;">​</a></h2><p>对于一些需要在极端环境下运行的应用程序来说，网络环境状况是否会影响应用程序的正常运行是测试过程中的一项重要工作。Chromium 具备模拟弱网的能力，打开开发者工具，切换到 Network 标签页。</p><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/234d1ec1a67b45d4bde302d09556b022~tplv-k3u1fbpfcp-watermark.image?" alt="ruowang.png"></p><p>在 Network throttling 处选择 Slow 3G，可以使 Chromium 模拟较慢的 3G 移动网络，建议做此设置前先把 Caching 项禁用，避免 Chromium 加载缓存的内容，而不去请求网络。</p><p>如果你需要更精准地控制应用的上行、下行速率，可以使用 session 对象提供的 API，代码如下所示：</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">window.webContents.session.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">enableNetworkEmulation</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  latency: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">500</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  downloadThroughput: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">6400</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  uploadThroughput: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">6400</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span></code></pre></div><p>这段代码通过 session 对象的 enableNetworkEmulation 方法模拟 50kbps 的弱网环境。</p><p>开发者还可以使用 WebContents.debugger 对象提供的 API 来完成这项工作，代码如下所示：</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> dbg</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> win.webContents.debugger;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">dbg.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">attach</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">await</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> dbg.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sendCommand</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Network.enable&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">await</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> dbg.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sendCommand</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Network.emulateNetworkConditions&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  latency: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">500</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  downloadThroughput: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">6400</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  uploadThroughput: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">6400</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span></code></pre></div><p>这种方案是使用 Chromium 为调试器定义的协议（Chrome DevTools Protocol）来完成弱网模拟的，Chrome DevTools Protocol 协议还有很多其他的 API，功能非常强大，详情请参考：<a href="https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-emulateNetworkConditions" target="_blank" rel="noreferrer">Chrome DevTools Protocol 官方文档</a> 。</p><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>本节的主要目的不是带领大家解决几个疑难杂症，而是教会大家<code>用更开阔的视野看待桌面应用开发</code>。</p><p>首先我们介绍了如何把窗口钉在桌面上，这里我们介绍了 electget 库，以及 electget 库使用的 ffi-napi 库，教会大家如何不用 C++ 也可以调用操作系统的 API。</p><p>接着我们介绍了如何实现文件重新上传的功能，这个看似简单的功能其实隐藏着一个“重要”的陷阱：内存暴增且无法及时释放，此处我们讲解了如何使用 form-data 库以避免误入陷阱。</p>`,61),p=[h];function l(k,e,r,E,d,g){return a(),i("div",null,p)}const c=s(n,[["render",l]]);export{y as __pageData,c as default};