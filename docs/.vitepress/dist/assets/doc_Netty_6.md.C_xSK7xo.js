import{_ as a,c as s,o as e,ag as p}from"./chunks/framework.CPUF7_g-.js";const h=JSON.parse('{"title":"实战：客户端与服务端双向通信","description":"","frontmatter":{},"headers":[],"relativePath":"doc/Netty/6.md","filePath":"doc/Netty/6.md"}'),l={name:"doc/Netty/6.md"};function t(i,n,c,o,d,r){return e(),s("div",null,n[0]||(n[0]=[p(`<h2 id="本资源由-itjc8-com-收集整理" tabindex="-1">本资源由 itjc8.com 收集整理 <a class="header-anchor" href="#本资源由-itjc8-com-收集整理" aria-label="Permalink to &quot;本资源由 itjc8.com 收集整理&quot;">​</a></h2><h1 id="实战-客户端与服务端双向通信" tabindex="-1">实战：客户端与服务端双向通信 <a class="header-anchor" href="#实战-客户端与服务端双向通信" aria-label="Permalink to &quot;实战：客户端与服务端双向通信&quot;">​</a></h1><p>在前面两个小节，我们已经学习了服务端启动与客户端启动的流程，熟悉了这两个过程之后，就可以建立服务端与客户端之间的通信了，本小节，我们用一个非常简单的 Demo 来了解一下服务端和客户端是如何来通信的。</p><blockquote><p>本小节，我们要实现的功能是：客户端连接成功之后，向服务端写一段数据 ，服务端收到数据之后打印，并向客户端回一段数据，文章里面展示的是核心代码，完整代码请参考 <a href="https://github.com/lightningMan/flash-netty/tree/%E5%AE%A2%E6%88%B7%E7%AB%AF%E4%B8%8E%E6%9C%8D%E5%8A%A1%E7%AB%AF%E5%8F%8C%E5%90%91%E9%80%9A%E4%BF%A1" target="_blank" rel="noreferrer">GitHub</a></p></blockquote><h2 id="客户端发数据到服务端" tabindex="-1">客户端发数据到服务端 <a class="header-anchor" href="#客户端发数据到服务端" aria-label="Permalink to &quot;客户端发数据到服务端&quot;">​</a></h2><p>在<a href="https://juejin.im/book/5b4bc28bf265da0f60130116/section/5b4dafd4f265da0f98314cc7" target="_blank" rel="noreferrer">客户端启动流程</a>这一小节，我们提到， 客户端相关的数据读写逻辑是通过 <code>Bootstrap</code> 的 <code>handler()</code> 方法指定</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>.handler(new ChannelInitializer&lt;SocketChannel&gt;() {</span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public void initChannel(SocketChannel ch) {</span></span>
<span class="line"><span>        // 指定连接数据读写逻辑</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>});</span></span></code></pre></div><p>现在，我们在 <code>initChannel()</code> 方法里面给客户端添加一个逻辑处理器，这个处理器的作用就是负责向服务端写数据</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>.handler(new ChannelInitializer&lt;SocketChannel&gt;() {</span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public void initChannel(SocketChannel ch) {</span></span>
<span class="line"><span>        ch.pipeline().addLast(new FirstClientHandler());</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>});</span></span></code></pre></div><ol><li><code>ch.pipeline()</code> 返回的是和这条连接相关的逻辑处理链，采用了责任链模式，这里不理解没关系，后面会讲到</li><li>然后再调用 <code>addLast()</code> 方法 添加一个逻辑处理器，这个逻辑处理器为的就是在客户端建立连接成功之后，向服务端写数据，下面是这个逻辑处理器相关的代码</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>public class FirstClientHandler extends ChannelInboundHandlerAdapter {</span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public void channelActive(ChannelHandlerContext ctx) {</span></span>
<span class="line"><span>        System.out.println(new Date() + &quot;: 客户端写出数据&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 1. 获取数据</span></span>
<span class="line"><span>        ByteBuf buffer = getByteBuf(ctx);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 2. 写数据</span></span>
<span class="line"><span>        ctx.channel().writeAndFlush(buffer);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private ByteBuf getByteBuf(ChannelHandlerContext ctx) {</span></span>
<span class="line"><span>        // 1. 获取二进制抽象 ByteBuf</span></span>
<span class="line"><span>        ByteBuf buffer = ctx.alloc().buffer();</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        // 2. 准备数据，指定字符串的字符集为 utf-8</span></span>
<span class="line"><span>        byte[] bytes = &quot;你好，闪电侠!&quot;.getBytes(Charset.forName(&quot;utf-8&quot;));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 3. 填充数据到 ByteBuf</span></span>
<span class="line"><span>        buffer.writeBytes(bytes);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        return buffer;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><ol><li>这个逻辑处理器继承自 <code>ChannelInboundHandlerAdapter</code>，然后覆盖了 <code>channelActive()</code>方法，这个方法会在客户端连接建立成功之后被调用</li><li>客户端连接建立成功之后，调用到 <code>channelActive()</code> 方法，在这个方法里面，我们编写向服务端写数据的逻辑</li><li>写数据的逻辑分为两步：首先我们需要获取一个 netty 对二进制数据的抽象 <code>ByteBuf</code>，上面代码中, <code>ctx.alloc()</code> 获取到一个 <code>ByteBuf</code> 的内存管理器，这个 内存管理器的作用就是分配一个 <code>ByteBuf</code>，然后我们把字符串的二进制数据填充到 <code>ByteBuf</code>，这样我们就获取到了 Netty 需要的一个数据格式，最后我们调用 <code>ctx.channel().writeAndFlush()</code> 把数据写到服务端</li></ol><p>以上就是客户端启动之后，向服务端写数据的逻辑，我们可以看到，和传统的 socket 编程不同的是，Netty 里面数据是以 ByteBuf 为单位的， 所有需要写出的数据都必须塞到一个 ByteBuf，数据的写出是如此，数据的读取亦是如此，接下来我们就来看一下服务端是如何读取到这段数据的。</p><h2 id="服务端读取客户端数据" tabindex="-1">服务端读取客户端数据 <a class="header-anchor" href="#服务端读取客户端数据" aria-label="Permalink to &quot;服务端读取客户端数据&quot;">​</a></h2><p>在<a href="https://juejin.im/book/5b4bc28bf265da0f60130116/section/5b4daf9ee51d4518f543f130" target="_blank" rel="noreferrer">服务端端启动流程</a>这一小节，我们提到， 服务端相关的数据处理逻辑是通过 <code>ServerBootstrap</code> 的 <code>childHandler()</code> 方法指定</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>.childHandler(new ChannelInitializer&lt;NioSocketChannel&gt;() {</span></span>
<span class="line"><span>   protected void initChannel(NioSocketChannel ch) {</span></span>
<span class="line"><span>       // 指定连接数据读写逻辑</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>});</span></span></code></pre></div><p>现在，我们在 <code>initChannel()</code> 方法里面给服务端添加一个逻辑处理器，这个处理器的作用就是负责读取客户端来的数据</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>.childHandler(new ChannelInitializer&lt;NioSocketChannel&gt;() {</span></span>
<span class="line"><span>    protected void initChannel(NioSocketChannel ch) {</span></span>
<span class="line"><span>        ch.pipeline().addLast(new FirstServerHandler());</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>});</span></span></code></pre></div><p>这个方法里面的逻辑和客户端侧类似，获取服务端侧关于这条连接的逻辑处理链 <code>pipeline</code>，然后添加一个逻辑处理器，负责读取客户端发来的数据</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>public class FirstServerHandler extends ChannelInboundHandlerAdapter {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public void channelRead(ChannelHandlerContext ctx, Object msg) {</span></span>
<span class="line"><span>        ByteBuf byteBuf = (ByteBuf) msg;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        System.out.println(new Date() + &quot;: 服务端读到数据 -&gt; &quot; + byteBuf.toString(Charset.forName(&quot;utf-8&quot;)));</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>服务端侧的逻辑处理器同样继承自 <code>ChannelInboundHandlerAdapter</code>，与客户端不同的是，这里覆盖的方法是 <code>channelRead()</code>，这个方法在接收到客户端发来的数据之后被回调。</p><p>这里的 <code>msg</code> 参数指的就是 Netty 里面数据读写的载体，为什么这里不直接是 <code>ByteBuf</code>，而需要我们强转一下，我们后面会分析到。这里我们强转之后，然后调用 <code>byteBuf.toString()</code> 就能够拿到我们客户端发过来的字符串数据。</p><p>我们先运行服务端，再运行客户端，下面分别是服务端控制台和客户端控制台的输出</p><blockquote><p>服务端</p></blockquote><p><img src="https://user-gold-cdn.xitu.io/2018/8/4/16502aacdb32ba78?w=1240&amp;h=117&amp;f=png&amp;s=55950" alt="客户端的输出"></p><blockquote><p>客户端</p></blockquote><p><img src="https://user-gold-cdn.xitu.io/2018/8/4/16502aacdb3f0d9f?w=1001&amp;h=143&amp;f=png&amp;s=23759" alt="服务端的输出"></p><p>到目前为止，我们已经实现了客户端发数据服务端打印，离我们本小节开始的目标还差一半，接下来的部分我们来实现另外一半：服务端收到数据之后向客户端回复数据</p><h2 id="服务端回数据给客户端" tabindex="-1">服务端回数据给客户端 <a class="header-anchor" href="#服务端回数据给客户端" aria-label="Permalink to &quot;服务端回数据给客户端&quot;">​</a></h2><p>服务端向客户端写数据逻辑与客户端侧的写数据逻辑一样，先创建一个 <code>ByteBuf</code>，然后填充二进制数据，最后调用 <code>writeAndFlush()</code> 方法写出去，下面是服务端回数据的代码</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>public class FirstServerHandler extends ChannelInboundHandlerAdapter {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public void channelRead(ChannelHandlerContext ctx, Object msg) {</span></span>
<span class="line"><span>        // ... 收数据逻辑省略</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 回复数据到客户端</span></span>
<span class="line"><span>        System.out.println(new Date() + &quot;: 服务端写出数据&quot;);</span></span>
<span class="line"><span>        ByteBuf out = getByteBuf(ctx);</span></span>
<span class="line"><span>        ctx.channel().writeAndFlush(out);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private ByteBuf getByteBuf(ChannelHandlerContext ctx) {</span></span>
<span class="line"><span>        byte[] bytes = &quot;你好，欢迎关注我的微信公众号，《闪电侠的博客》!&quot;.getBytes(Charset.forName(&quot;utf-8&quot;));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        ByteBuf buffer = ctx.alloc().buffer();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        buffer.writeBytes(bytes);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        return buffer;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>现在，轮到客户端了。客户端的读取数据的逻辑和服务端读取数据的逻辑一样，同样是覆盖 <code>ChannelRead()</code> 方法</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>public class FirstClientHandler extends ChannelInboundHandlerAdapter {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 写数据相关的逻辑省略</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public void channelRead(ChannelHandlerContext ctx, Object msg) {</span></span>
<span class="line"><span>        ByteBuf byteBuf = (ByteBuf) msg;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        System.out.println(new Date() + &quot;: 客户端读到数据 -&gt; &quot; + byteBuf.toString(Charset.forName(&quot;utf-8&quot;)));</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>将这段逻辑添加到客户端之后逻辑处理器 <code>FirstClientHandler</code> 之后，客户端就能收到服务端发来的数据，完整的代码参考 <a href="https://github.com/lightningMan/flash-netty/tree/%E5%AE%A2%E6%88%B7%E7%AB%AF%E4%B8%8E%E6%9C%8D%E5%8A%A1%E7%AB%AF%E5%8F%8C%E5%90%91%E9%80%9A%E4%BF%A1" target="_blank" rel="noreferrer">GitHub</a></p><p>客户端与服务端的读写数据的逻辑完成之后，我们先运行服务端，再运行客户端，控制台输出如下</p><blockquote><p>服务端</p></blockquote><p><img src="https://user-gold-cdn.xitu.io/2018/8/4/16502aacdb206194?w=1240&amp;h=205&amp;f=png&amp;s=90183" alt="image.png"></p><blockquote><p>客户端</p></blockquote><p><img src="https://user-gold-cdn.xitu.io/2018/8/4/16502aacdb1f1579?w=1240&amp;h=138&amp;f=png&amp;s=72965" alt="image.png"></p><p>到这里，我们本小节要实现的客户端与服务端双向通信的功能实现完毕，最后，我们对本小节做一个总结。</p><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><ul><li>本文中，我们了解到客户端和服务端的逻辑处理是均是在启动的时候，通过给逻辑处理链 <code>pipeline</code> 添加逻辑处理器，来编写数据的读写逻辑，<code>pipeline</code> 的逻辑我们在后面会分析。</li><li>接下来，我们学到，在客户端连接成功之后会回调到逻辑处理器的 <code>channelActive()</code> 方法，而不管是服务端还是客户端，收到数据之后都会调用到 <code>channelRead</code> 方法。</li><li>写数据调用<code>writeAndFlush</code>方法，客户端与服务端交互的二进制数据载体为 <code>ByteBuf</code>，<code>ByteBuf</code> 通过连接的内存管理器创建，字节数据填充到 <code>ByteBuf</code> 之后才能写到对端，接下来一小节，我们就来重点分析 <code>ByteBuf</code>。</li></ul><h2 id="思考题" tabindex="-1">思考题 <a class="header-anchor" href="#思考题" aria-label="Permalink to &quot;思考题&quot;">​</a></h2><p>如何实现新连接接入的时候，服务端主动向客户端推送消息，客户端回复服务端消息？欢迎留言讨论。</p>`,44)]))}const b=a(l,[["render",t]]);export{h as __pageData,b as default};
