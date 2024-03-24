import{_ as a,c as n,o as s,a4 as e}from"./chunks/framework.DLF8A2I8.js";const k=JSON.parse('{"title":"实战：Netty 实现客户端登录","description":"","frontmatter":{},"headers":[],"relativePath":"doc/Netty/9.md","filePath":"doc/Netty/9.md"}'),p={name:"doc/Netty/9.md"},t=e(`<h2 id="本资源由-itjc8-com-收集整理" tabindex="-1">本资源由 itjc8.com 收集整理 <a class="header-anchor" href="#本资源由-itjc8-com-收集整理" aria-label="Permalink to &quot;本资源由 itjc8.com 收集整理&quot;">​</a></h2><h1 id="实战-netty-实现客户端登录" tabindex="-1">实战：Netty 实现客户端登录 <a class="header-anchor" href="#实战-netty-实现客户端登录" aria-label="Permalink to &quot;实战：Netty 实现客户端登录&quot;">​</a></h1><blockquote><p>本小节，我们来实现客户端登录到服务端的过程</p></blockquote><h2 id="登录流程" tabindex="-1">登录流程 <a class="header-anchor" href="#登录流程" aria-label="Permalink to &quot;登录流程&quot;">​</a></h2><p><img src="https://user-gold-cdn.xitu.io/2018/8/14/16535d7424e02d3a?w=1240&amp;h=426&amp;f=png&amp;s=54856" alt="image.png"></p><p>从上图中我们可以看到，客户端连接上服务端之后</p><ol><li>客户端会构建一个登录请求对象，然后通过编码把请求对象编码为 ByteBuf，写到服务端。</li><li>服务端接受到 ByteBuf 之后，首先通过解码把 ByteBuf 解码为登录请求响应，然后进行校验。</li><li>服务端校验通过之后，构造一个登录响应对象，依然经过编码，然后再写回到客户端。</li><li>客户端接收到服务端的之后，解码 ByteBuf，拿到登录响应响应，判断是否登陆成功</li></ol><h2 id="逻辑处理器" tabindex="-1">逻辑处理器 <a class="header-anchor" href="#逻辑处理器" aria-label="Permalink to &quot;逻辑处理器&quot;">​</a></h2><p>接下来，我们分别实现一下上述四个过程，开始之前，我们先来回顾一下客户端与服务端的启动流程，客户端启动的时候，我们会在引导类 <code>Bootstrap</code> 中配置客户端的处理逻辑，本小节中，我们给客户端配置的逻辑处理器叫做 <code>ClientHandler</code></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public class ClientHandler extends ChannelInboundHandlerAdapter {</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>然后，客户端启动的时候，我们给 <code>Bootstrap</code> 配置上这个逻辑处理器</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>bootstrap.handler(new ChannelInitializer&lt;SocketChannel&gt;() {</span></span>
<span class="line"><span>            @Override</span></span>
<span class="line"><span>            public void initChannel(SocketChannel ch) {</span></span>
<span class="line"><span>                ch.pipeline().addLast(new ClientHandler());</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        });</span></span></code></pre></div><p>这样，在客户端侧，Netty 中 IO 事件相关的回调就能够回调到我们的 <code>ClientHandler</code>。</p><p>同样，我们给服务端引导类 <code>ServerBootstrap</code> 也配置一个逻辑处理器 <code>ServerHandler</code></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public class ServerHandler extends ChannelInboundHandlerAdapter {</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>serverBootstrap.childHandler(new ChannelInitializer&lt;NioSocketChannel&gt;() {</span></span>
<span class="line"><span>            protected void initChannel(NioSocketChannel ch) {</span></span>
<span class="line"><span>                ch.pipeline().addLast(new ServerHandler());</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span></code></pre></div><p>这样，在服务端侧，Netty 中 IO 事件相关的回调就能够回调到我们的 <code>ServerHandler</code>。</p><p>接下来，我们就围绕这两个 Handler 来编写我们的处理逻辑。</p><h2 id="客户端发送登录请求" tabindex="-1">客户端发送登录请求 <a class="header-anchor" href="#客户端发送登录请求" aria-label="Permalink to &quot;客户端发送登录请求&quot;">​</a></h2><h3 id="客户端处理登录请求" tabindex="-1">客户端处理登录请求 <a class="header-anchor" href="#客户端处理登录请求" aria-label="Permalink to &quot;客户端处理登录请求&quot;">​</a></h3><p>我们实现在客户端连接上服务端之后，立即登录。在连接上服务端之后，Netty 会回调到 <code>ClientHandler</code> 的 <code>channelActive()</code> 方法，我们在这个方法体里面编写相应的逻辑</p><blockquote><p>ClientHandler.java</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public void channelActive(ChannelHandlerContext ctx) {</span></span>
<span class="line"><span>    System.out.println(new Date() + &quot;: 客户端开始登录&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 创建登录对象</span></span>
<span class="line"><span>    LoginRequestPacket loginRequestPacket = new LoginRequestPacket();</span></span>
<span class="line"><span>    loginRequestPacket.setUserId(UUID.randomUUID().toString());</span></span>
<span class="line"><span>    loginRequestPacket.setUsername(&quot;flash&quot;);</span></span>
<span class="line"><span>    loginRequestPacket.setPassword(&quot;pwd&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 编码</span></span>
<span class="line"><span>    ByteBuf buffer = PacketCodeC.INSTANCE.encode(ctx.alloc(), loginRequestPacket);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 写数据</span></span>
<span class="line"><span>    ctx.channel().writeAndFlush(buffer);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>这里，我们按照前面所描述的三个步骤来分别实现，在编码的环节，我们把 <code>PacketCodeC</code> 变成单例模式，然后把 <code>ByteBuf</code> 分配器抽取出一个参数，这里第一个实参 <code>ctx.alloc()</code> 获取的就是与当前连接相关的 <code>ByteBuf</code> 分配器，建议这样来使用。</p><p>写数据的时候，我们通过 <code>ctx.channel()</code> 获取到当前连接（Netty 对连接的抽象为 Channel，后面小节会分析），然后调用 <code>writeAndFlush()</code> 就能把二进制数据写到服务端。这样，客户端发送登录请求的逻辑就完成了，接下来，我们来看一下，服务端接受到这个数据之后是如何来处理的。</p><h3 id="服务端处理登录请求" tabindex="-1">服务端处理登录请求 <a class="header-anchor" href="#服务端处理登录请求" aria-label="Permalink to &quot;服务端处理登录请求&quot;">​</a></h3><blockquote><p>ServerHandler.java</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public void channelRead(ChannelHandlerContext ctx, Object msg) {</span></span>
<span class="line"><span>    ByteBuf requestByteBuf = (ByteBuf) msg;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 解码</span></span>
<span class="line"><span>    Packet packet = PacketCodeC.INSTANCE.decode(requestByteBuf);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 判断是否是登录请求数据包</span></span>
<span class="line"><span>    if (packet instanceof LoginRequestPacket) {</span></span>
<span class="line"><span>        LoginRequestPacket loginRequestPacket = (LoginRequestPacket) packet;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 登录校验</span></span>
<span class="line"><span>        if (valid(loginRequestPacket)) {</span></span>
<span class="line"><span>            // 校验成功</span></span>
<span class="line"><span>        } else {</span></span>
<span class="line"><span>            // 校验失败</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>private boolean valid(LoginRequestPacket loginRequestPacket) {</span></span>
<span class="line"><span>    return true;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>我们向服务端引导类 <code>ServerBootstrap</code> 中添加了逻辑处理器 <code>ServerHandler</code> 之后，Netty 在收到数据之后，会回调 <code>channelRead()</code> 方法，这里的第二个参数 <code>msg</code>，在我们这个场景中，可以直接强转为 <code>ByteBuf</code>，为什么 Netty 不直接把这个参数类型定义为 <code>ByteBuf</code> ？我们在后续的小节会分析到。</p><p>拿到 <code>ByteBuf</code> 之后，首先要做的事情就是解码，解码出 java 数据包对象，然后判断如果是登录请求数据包 <code>LoginRequestPacket</code>，就进行登录逻辑的处理，这里，我们假设所有的登录都是成功的，<code>valid()</code> 方法返回 true。 服务端校验通过之后，接下来就需要向客户端发送登录响应，我们继续编写服务端的逻辑。</p><h2 id="服务端发送登录响应" tabindex="-1">服务端发送登录响应 <a class="header-anchor" href="#服务端发送登录响应" aria-label="Permalink to &quot;服务端发送登录响应&quot;">​</a></h2><h3 id="服务端处理登录响应" tabindex="-1">服务端处理登录响应 <a class="header-anchor" href="#服务端处理登录响应" aria-label="Permalink to &quot;服务端处理登录响应&quot;">​</a></h3><blockquote><p>ServerHandler.java</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>LoginResponsePacket loginResponsePacket = new LoginResponsePacket();</span></span>
<span class="line"><span>loginResponsePacket.setVersion(packet.getVersion());</span></span>
<span class="line"><span>if (valid(loginRequestPacket)) {</span></span>
<span class="line"><span>    loginResponsePacket.setSuccess(true);</span></span>
<span class="line"><span>} else {</span></span>
<span class="line"><span>    loginResponsePacket.setReason(&quot;账号密码校验失败&quot;);</span></span>
<span class="line"><span>    loginResponsePacket.setSuccess(false);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>// 编码</span></span>
<span class="line"><span>ByteBuf responseByteBuf = PacketCodeC.INSTANCE.encode(ctx.alloc(), loginResponsePacket);</span></span>
<span class="line"><span>ctx.channel().writeAndFlush(responseByteBuf);</span></span></code></pre></div><p>这段逻辑仍然是在服务端逻辑处理器 <code>ServerHandler</code> 的 <code>channelRead()</code> 方法里，我们构造一个登录响应包 <code>LoginResponsePacket</code>，然后在校验成功和失败的时候分别设置标志位，接下来，调用编码器把 Java 对象编码成 <code>ByteBuf</code>，调用 <code>writeAndFlush()</code> 写到客户端，至此，服务端的登录逻辑编写完成，接下来，我们还有最后一步，客户端处理登录响应。</p><h3 id="客户端处理登录响应" tabindex="-1">客户端处理登录响应 <a class="header-anchor" href="#客户端处理登录响应" aria-label="Permalink to &quot;客户端处理登录响应&quot;">​</a></h3><blockquote><p>ClientHandler.java</p></blockquote><p>客户端接收服务端数据的处理逻辑也是在 <code>ClientHandler</code> 的 <code>channelRead()</code> 方法</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public void channelRead(ChannelHandlerContext ctx, Object msg) {</span></span>
<span class="line"><span>    ByteBuf byteBuf = (ByteBuf) msg;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    Packet packet = PacketCodeC.INSTANCE.decode(byteBuf);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if (packet instanceof LoginResponsePacket) {</span></span>
<span class="line"><span>        LoginResponsePacket loginResponsePacket = (LoginResponsePacket) packet;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        if (loginResponsePacket.isSuccess()) {</span></span>
<span class="line"><span>            System.out.println(new Date() + &quot;: 客户端登录成功&quot;);</span></span>
<span class="line"><span>        } else {</span></span>
<span class="line"><span>            System.out.println(new Date() + &quot;: 客户端登录失败，原因：&quot; + loginResponsePacket.getReason());</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>客户端拿到数据之后，调用 <code>PacketCodeC</code> 进行解码操作，如果类型是登录响应数据包，我们这里逻辑比较简单，在控制台打印出一条消息。</p><p>至此，客户端整个登录流程到这里就结束了，这里为了给大家演示，我们的客户端和服务端的处理逻辑较为简单，但是相信大家应该已经掌握了使用 Netty 来做服务端与客户端交互的基本思路，基于这个思路，再运用到实际项目中，并不是难事。</p><p>最后，我们再来看一下效果，下面分别是客户端与服务端的控制台输出，完整的代码参考 <a href="https://github.com/lightningMan/flash-netty/tree/%E5%AE%9E%E7%8E%B0%E5%AE%A2%E6%88%B7%E7%AB%AF%E7%99%BB%E5%BD%95" target="_blank" rel="noreferrer">GitHub</a>, 分别启动 <code>NettyServer.java</code> 与 <code>NettyClient.java</code> 即可看到效果。</p><blockquote><p>服务端</p></blockquote><p><img src="https://user-gold-cdn.xitu.io/2018/8/14/16535d7424c10fa9?w=1240&amp;h=554&amp;f=png&amp;s=203021" alt="image.png"></p><blockquote><p>客户端</p></blockquote><p><img src="https://user-gold-cdn.xitu.io/2018/8/14/16535d7427d7e4f2?w=1196&amp;h=530&amp;f=png&amp;s=94727" alt="image.png"></p><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>本小节，我们们梳理了一下客户端登录的基本流程，然后结合上一小节的编解码逻辑，我们使用 Netty 实现了完整的客户端登录流程。</p><h2 id="思考" tabindex="-1">思考 <a class="header-anchor" href="#思考" aria-label="Permalink to &quot;思考&quot;">​</a></h2><p>客户端登录成功或者失败之后，如果把成功或者失败的标识绑定在客户端的连接上？服务端又是如何高效避免客户端重新登录？ 欢迎留言讨论。</p>`,49),l=[t];function c(o,i,d,r,u,h){return s(),n("div",null,l)}const b=a(p,[["render",c]]);export{k as __pageData,b as default};
