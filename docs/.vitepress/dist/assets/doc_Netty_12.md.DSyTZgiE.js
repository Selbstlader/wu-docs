import{_ as e,c as a,o as n,a4 as s}from"./chunks/framework.DLF8A2I8.js";const b=JSON.parse('{"title":"实战：构建客户端与服务端 pipeline","description":"","frontmatter":{},"headers":[],"relativePath":"doc/Netty/12.md","filePath":"doc/Netty/12.md"}'),p={name:"doc/Netty/12.md"},l=s(`<h2 id="本资源由-itjc8-com-收集整理" tabindex="-1">本资源由 itjc8.com 收集整理 <a class="header-anchor" href="#本资源由-itjc8-com-收集整理" aria-label="Permalink to &quot;本资源由 itjc8.com 收集整理&quot;">​</a></h2><h1 id="实战-构建客户端与服务端-pipeline" tabindex="-1">实战：构建客户端与服务端 pipeline <a class="header-anchor" href="#实战-构建客户端与服务端-pipeline" aria-label="Permalink to &quot;实战：构建客户端与服务端 pipeline&quot;">​</a></h1><blockquote><p>通过<a href="https://juejin.im/book/5b4bc28bf265da0f60130116/section/5b4db06d5188251afc257383" target="_blank" rel="noreferrer">上小节</a>的学习，我们已经了解 pipeline 和 channelHandler 的基本概念。本小节，我们使用上一小节的理论知识来重新构建服务端和客户端的 pipeline，把复杂的逻辑从单独的一个 channelHandler 中抽取出来。</p></blockquote><p>Netty 内置了很多开箱即用的 ChannelHandler。下面，我们通过学习 Netty 内置的 ChannelHandler 来逐步构建我们的 pipeline。</p><h2 id="channelinboundhandleradapter-与-channeloutboundhandleradapter" tabindex="-1">ChannelInboundHandlerAdapter 与 ChannelOutboundHandlerAdapter <a class="header-anchor" href="#channelinboundhandleradapter-与-channeloutboundhandleradapter" aria-label="Permalink to &quot;ChannelInboundHandlerAdapter 与 ChannelOutboundHandlerAdapter&quot;">​</a></h2><p>首先是 <code>ChannelInboundHandlerAdapter</code> ，这个适配器主要用于实现其接口 <code>ChannelInboundHandler</code> 的所有方法，这样我们在编写自己的 handler 的时候就不需要实现 handler 里面的每一种方法，而只需要实现我们所关心的方法，默认情况下，对于 <code>ChannelInboundHandlerAdapter</code>，我们比较关心的是他的如下方法</p><blockquote><p>ChannelInboundHandlerAdapter.java</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>@Override</span></span>
<span class="line"><span>public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {</span></span>
<span class="line"><span>    ctx.fireChannelRead(msg);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>他的作用就是接收上一个 handler 的输出，这里的 <code>msg</code> 就是上一个 handler 的输出。大家也可以看到，默认情况下 adapter 会通过 <code>fireChannelRead()</code> 方法直接把上一个 handler 的输出结果传递到下一个 handler。</p><p>与 <code>ChannelInboundHandlerAdapter</code> 类似的类是 <code>ChannelOutboundHandlerAdapter</code>，它的核心方法如下</p><blockquote><p>ChannelOutboundHandlerAdapter.java</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>@Override</span></span>
<span class="line"><span>public void write(ChannelHandlerContext ctx, Object msg, ChannelPromise promise) throws Exception {</span></span>
<span class="line"><span>    ctx.write(msg, promise);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>默认情况下，这个 adapter 也会把对象传递到下一个 outBound 节点，它的传播顺序与 inboundHandler 相反，这里就不再对这个类展开了。</p><p>我们往 pipeline 添加的第一个 handler 中的 <code>channelRead</code> 方法中，<code>msg</code> 对象其实就是 <code>ByteBuf</code>。服务端在接受到数据之后，应该首先要做的第一步逻辑就是把这个 ByteBuf 进行解码，然后把解码后的结果传递到下一个 handler，像这样</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>@Override</span></span>
<span class="line"><span>public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {</span></span>
<span class="line"><span>        ByteBuf requestByteBuf = (ByteBuf) msg;</span></span>
<span class="line"><span>        // 解码</span></span>
<span class="line"><span>        Packet packet = PacketCodeC.INSTANCE.decode(requestByteBuf);</span></span>
<span class="line"><span>        // 解码后的对象传递到下一个 handler 处理</span></span>
<span class="line"><span>        ctx.fireChannelRead(packet)</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>不过在开始解码之前，我们来了解一下另外一个特殊的 handler</p><h2 id="bytetomessagedecoder" tabindex="-1">ByteToMessageDecoder <a class="header-anchor" href="#bytetomessagedecoder" aria-label="Permalink to &quot;ByteToMessageDecoder&quot;">​</a></h2><p>通常情况下，无论我们是在客户端还是服务端，当我们收到数据之后，首先要做的事情就是把二进制数据转换到我们的一个 Java 对象，所以 Netty 很贴心地写了一个父类，来专门做这个事情，下面我们来看一下，如何使用这个类来实现服务端的解码</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public class PacketDecoder extends ByteToMessageDecoder {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    protected void decode(ChannelHandlerContext ctx, ByteBuf in, List out) {</span></span>
<span class="line"><span>        out.add(PacketCodeC.INSTANCE.decode(in));</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>当我们继承了 <code>ByteToMessageDecoder</code> 这个类之后，我们只需要实现一下 <code>decode()</code> 方法，这里的 in 大家可以看到，传递进来的时候就已经是 ByteBuf 类型，所以我们不再需要强转，第三个参数是 <code>List</code> 类型，我们通过往这个 <code>List</code> 里面添加解码后的结果对象，就可以自动实现结果往下一个 handler 进行传递，这样，我们就实现了解码的逻辑 handler。</p><p>另外，值得注意的一点，对于 Netty 里面的 ByteBuf，我们使用 <code>4.1.6.Final</code> 版本，默认情况下用的是堆外内存，在 <a href="https://juejin.im/book/5b4bc28bf265da0f60130116/section/5b4db03b6fb9a04fe91a6e93" target="_blank" rel="noreferrer">ByteBuf</a> 这一小节中我们提到，堆外内存我们需要自行释放，在我们前面小节的解码的例子中，其实我们已经漏掉了这个操作，这一点是非常致命的，随着程序运行越来越久，内存泄露的问题就慢慢暴露出来了， 而这里我们使用 <code>ByteToMessageDecoder</code>，Netty 会自动进行内存的释放，我们不用操心太多的内存管理方面的逻辑，关于如何自动释放内存大家有兴趣可以参考一下 <a href="https://coding.imooc.com/class/chapter/230.html#Anchor" target="_blank" rel="noreferrer">ByteToMessageDecoder的实现原理(8-2)</a>。</p><p>当我们通过解码器把二进制数据转换到 Java 对象即指令数据包之后，就可以针对每一种指令数据包编写逻辑了。</p><h2 id="simplechannelinboundhandler" tabindex="-1">SimpleChannelInboundHandler <a class="header-anchor" href="#simplechannelinboundhandler" aria-label="Permalink to &quot;SimpleChannelInboundHandler&quot;">​</a></h2><p>回顾一下我们前面处理 Java 对象的逻辑</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>if (packet instanceof LoginRequestPacket) {</span></span>
<span class="line"><span>    // ...</span></span>
<span class="line"><span>} else if (packet instanceof MessageRequestPacket) {</span></span>
<span class="line"><span>    // ...</span></span>
<span class="line"><span>} else if ...</span></span></code></pre></div><p>我们通过 <code>if else</code> 逻辑进行逻辑的处理，当我们要处理的指令越来越多的时候，代码会显得越来越臃肿，我们可以通过给 pipeline 添加多个 handler(ChannelInboundHandlerAdapter的子类) 来解决过多的 <code>if else</code> 问题，如下</p><blockquote><p>XXXHandler.java</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>if (packet instanceof XXXPacket) {</span></span>
<span class="line"><span>    // ...处理</span></span>
<span class="line"><span>} else {</span></span>
<span class="line"><span>   ctx.fireChannelRead(packet); </span></span>
<span class="line"><span>}</span></span></code></pre></div><p>这样一个好处就是，每次添加一个指令处理器，逻辑处理的框架都是一致的，</p><p>但是，大家应该也注意到了，这里我们编写指令处理 handler 的时候，依然编写了一段我们其实可以不用关心的 if else 判断，然后还要手动传递无法处理的对象 (XXXPacket) 至下一个指令处理器，这也是一段重复度极高的代码，因此，Netty 基于这种考虑抽象出了一个 <code>SimpleChannelInboundHandler</code> 对象，类型判断和对象传递的活都自动帮我们实现了，而我们可以专注于处理我们所关心的指令即可。</p><p>下面，我们来看一下如何使用 <code>SimpleChannelInboundHandler</code> 来简化我们的指令处理逻辑</p><blockquote><p>LoginRequestHandler.java</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public class LoginRequestHandler extends SimpleChannelInboundHandler&lt;LoginRequestPacket&gt; {</span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    protected void channelRead0(ChannelHandlerContext ctx, LoginRequestPacket loginRequestPacket) {</span></span>
<span class="line"><span>        // 登录逻辑</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><code>SimpleChannelInboundHandler</code> 从字面意思也可以看到，使用它非常简单，我们在继承这个类的时候，给他传递一个泛型参数，然后在 <code>channelRead0()</code> 方法里面，我们不用再通过 if 逻辑来判断当前对象是否是本 handler 可以处理的对象，也不用强转，不用往下传递本 handler 处理不了的对象，这一切都已经交给父类 <code>SimpleChannelInboundHandler</code> 来实现了，我们只需要专注于我们要处理的业务逻辑即可。</p><p>上面的 <code>LoginRequestHandler</code> 是用来处理登录的逻辑，同理，我们可以很轻松地编写一个消息处理逻辑处理器</p><blockquote><p>MessageRequestHandler.java</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public class MessageRequestHandler extends SimpleChannelInboundHandler&lt;MessageRequestPacket&gt; {</span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    protected void channelRead0(ChannelHandlerContext ctx, MessageRequestPacket messageRequestPacket) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="messagetobyteencoder" tabindex="-1">MessageToByteEncoder <a class="header-anchor" href="#messagetobyteencoder" aria-label="Permalink to &quot;MessageToByteEncoder&quot;">​</a></h2><p>在前面几个小节，我们已经实现了登录和消息处理逻辑，处理完请求之后，我们都会给客户端一个响应，在写响应之前，我们需要把响应对象编码成 ByteBuf，结合我们本小节的内容，最后的逻辑框架如下</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public class LoginRequestHandler extends SimpleChannelInboundHandler&lt;LoginRequestPacket&gt; {</span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    protected void channelRead0(ChannelHandlerContext ctx, LoginRequestPacket loginRequestPacket) {</span></span>
<span class="line"><span>        LoginResponsePacket loginResponsePacket = login(loginRequestPacket);</span></span>
<span class="line"><span>        ByteBuf responseByteBuf = PacketCodeC.INSTANCE.encode(ctx.alloc(), loginResponsePacket);</span></span>
<span class="line"><span>        ctx.channel().writeAndFlush(responseByteBuf);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public class MessageRequestHandler extends SimpleChannelInboundHandler&lt;MessageRequestPacket&gt; {</span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    protected void channelRead0(ChannelHandlerContext ctx, MessageRequestPacket messageRequestPacket) {</span></span>
<span class="line"><span>        MessageResponsePacket messageResponsePacket = receiveMessage(messageRequestPacket);</span></span>
<span class="line"><span>        ByteBuf responseByteBuf = PacketCodeC.INSTANCE.encode(ctx.alloc(), messageRequestPacket);</span></span>
<span class="line"><span>        ctx.channel().writeAndFlush(responseByteBuf);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>我们注意到，我们处理每一种指令完成之后的逻辑是类似的，都需要进行编码，然后调用 <code>writeAndFlush()</code> 将数据写到客户端，这个编码的过程其实也是重复的逻辑，而且在编码的过程中，我们还需要手动去创建一个 ByteBuf，如下过程</p><blockquote><p>PacketCodeC.java</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public ByteBuf encode(ByteBufAllocator byteBufAllocator, Packet packet) {</span></span>
<span class="line"><span>    // 1. 创建 ByteBuf 对象</span></span>
<span class="line"><span>    ByteBuf byteBuf = byteBufAllocator.ioBuffer();</span></span>
<span class="line"><span>    // 2. 序列化 java 对象</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 3. 实际编码过程</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    return byteBuf;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>而Netty 提供了一个特殊的 channelHandler 来专门处理编码逻辑，我们不需要每一次将响应写到对端的时候调用一次编码逻辑进行编码，也不需要自行创建 ByteBuf，这个类叫做 <code>MessageToByteEncoder</code>，从字面意思也可以看出，它的功能就是将对象转换到二进制数据。</p><p>下面，我们来看一下，我们如何来实现编码逻辑</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public class PacketEncoder extends MessageToByteEncoder&lt;Packet&gt; {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    protected void encode(ChannelHandlerContext ctx, Packet packet, ByteBuf out) {</span></span>
<span class="line"><span>        PacketCodeC.INSTANCE.encode(out, packet);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><code>PacketEncoder</code> 继承自 <code>MessageToByteEncoder</code>，泛型参数 <code>Packet</code> 表示这个类的作用是实现 <code>Packet</code> 类型对象到二进制的转换。</p><p>这里我们只需要实现 <code>encode()</code> 方法，我们注意到，在这个方法里面，第二个参数是 Java 对象，而第三个参数是 ByteBuf 对象，我们在这个方法里面要做的事情就是把 Java 对象里面的字段写到 ByteBuf，我们不再需要自行去分配 ByteBuf，因此，大家注意到，<code>PacketCodeC</code> 的 <code>encode()</code> 方法的定义也改了，下面是更改前后的对比</p><blockquote><p>PacketCodeC.java</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 更改前的定义</span></span>
<span class="line"><span>public ByteBuf encode(ByteBufAllocator byteBufAllocator, Packet packet) {</span></span>
<span class="line"><span>    // 1. 创建 ByteBuf 对象</span></span>
<span class="line"><span>    ByteBuf byteBuf = byteBufAllocator.ioBuffer();</span></span>
<span class="line"><span>    // 2. 序列化 java 对象</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 3. 实际编码过程</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    return byteBuf;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>// 更改后的定义</span></span>
<span class="line"><span>public void encode(ByteBuf byteBuf, Packet packet) {</span></span>
<span class="line"><span>    // 1. 序列化 java 对象</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 2. 实际编码过程</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>我们可以看到，<code>PacketCodeC</code> 不再需要手动创建对象，不再需要再把创建完的 ByteBuf 进行返回。当我们向 pipeline 中添加了这个编码器之后，我们在指令处理完毕之后就只需要 writeAndFlush java 对象即可，像这样</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public class LoginRequestHandler extends SimpleChannelInboundHandler&lt;LoginRequestPacket&gt; {</span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    protected void channelRead0(ChannelHandlerContext ctx, LoginRequestPacket loginRequestPacket) {</span></span>
<span class="line"><span>        ctx.channel().writeAndFlush(login(loginRequestPacket));</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public class MessageRequestHandler extends SimpleChannelInboundHandler&lt;MessageResponsePacket&gt; {</span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    protected void channelRead0(ChannelHandlerContext ctx, MessageResponsePacket messageRequestPacket) {</span></span>
<span class="line"><span>        ctx.channel().writeAndFlush(receiveMessage(messageRequestPacket));</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>通过我们前面的分析，可以看到，Netty 为了让我们逻辑更为清晰简洁，帮我们做了很多工作，能直接用 Netty 自带的 handler 来解决的问题，不要重复造轮子。在接下里的小节，我们会继续探讨 Netty 还有哪些开箱即用的 handler。</p><p>分析完服务端的 pipeline 的 handler 组成结构，相信读者也不难自行分析出客户端的 handler 结构，最后，我们来看一下服务端和客户端完整的 pipeline 的 handler 结构</p><h2 id="构建客户端与服务端-pipeline" tabindex="-1">构建客户端与服务端 pipeline <a class="header-anchor" href="#构建客户端与服务端-pipeline" aria-label="Permalink to &quot;构建客户端与服务端 pipeline&quot;">​</a></h2><p><img src="https://user-gold-cdn.xitu.io/2018/10/14/1666fd9cc2b9c089?w=2900&amp;h=898&amp;f=png&amp;s=160242" alt=""></p><p>对应我们的代码</p><blockquote><p>服务端</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>serverBootstrap</span></span>
<span class="line"><span>               .childHandler(new ChannelInitializer&lt;NioSocketChannel&gt;() {</span></span>
<span class="line"><span>                    protected void initChannel(NioSocketChannel ch) {</span></span>
<span class="line"><span>                        ch.pipeline().addLast(new PacketDecoder());</span></span>
<span class="line"><span>                        ch.pipeline().addLast(new LoginRequestHandler());</span></span>
<span class="line"><span>                        ch.pipeline().addLast(new MessageRequestHandler());</span></span>
<span class="line"><span>                        ch.pipeline().addLast(new PacketEncoder());</span></span>
<span class="line"><span>                    }</span></span>
<span class="line"><span>            });</span></span></code></pre></div><blockquote><p>客户端</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>bootstrap</span></span>
<span class="line"><span>        .handler(new ChannelInitializer&lt;SocketChannel&gt;() {</span></span>
<span class="line"><span>            @Override</span></span>
<span class="line"><span>            public void initChannel(SocketChannel ch) {</span></span>
<span class="line"><span>                ch.pipeline().addLast(new PacketDecoder());</span></span>
<span class="line"><span>                ch.pipeline().addLast(new LoginResponseHandler());</span></span>
<span class="line"><span>                ch.pipeline().addLast(new MessageResponseHandler());</span></span>
<span class="line"><span>                ch.pipeline().addLast(new PacketEncoder());</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        });</span></span></code></pre></div><blockquote><p>完整代码在<a href="https://github.com/lightningMan/flash-netty/tree/%E6%9E%84%E5%BB%BA%E5%AE%A2%E6%88%B7%E7%AB%AF%E4%B8%8E%E6%9C%8D%E5%8A%A1%E7%AB%AFpipeline" target="_blank" rel="noreferrer">github</a> 对应的本小节分支，大家在本地可以行切换对应分支进行学习。</p></blockquote><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>本小节，我们通过学习 netty 内置的 channelHandler 来逐步构建我们的服务端 pipeline，通过内置的 channelHandler 可以减少很多重复逻辑。</p><ol><li>基于 ByteToMessageDecoder，我们可以实现自定义解码，而不用关心 ByteBuf 的强转和 解码结果的传递。</li><li>基于 SimpleChannelInboundHandler，我们可以实现每一种指令的处理，不再需要强转，不再有冗长乏味的 <code>if else</code> 逻辑，不需要手动传递对象。</li><li>基于 <code>MessageToByteEncoder</code>，我们可以实现自定义编码，而不用关心 ByteBuf 的创建，不用每次向对端写 Java 对象都进行一次编码。</li></ol><h2 id="思考" tabindex="-1">思考 <a class="header-anchor" href="#思考" aria-label="Permalink to &quot;思考&quot;">​</a></h2><p>在 <code>LoginRequestHandler</code> 以及 <code>MessageRequestHandler</code> 的 <code>channelRead0()</code> 方法中，第二个参数对象（XXXRequestPacket）是从哪里传递过来的？ 欢迎留言讨论。</p>`,67),t=[l];function c(i,o,d,r,h,u){return n(),a("div",null,t)}const k=e(p,[["render",c]]);export{b as __pageData,k as default};
