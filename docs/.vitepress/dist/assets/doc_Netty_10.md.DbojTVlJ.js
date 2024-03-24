import{_ as s,c as a,o as n,a4 as e}from"./chunks/framework.DLF8A2I8.js";const b=JSON.parse('{"title":"实战：实现客户端与服务端收发消息","description":"","frontmatter":{},"headers":[],"relativePath":"doc/Netty/10.md","filePath":"doc/Netty/10.md"}'),p={name:"doc/Netty/10.md"},t=e(`<h2 id="本资源由-itjc8-com-收集整理" tabindex="-1">本资源由 itjc8.com 收集整理 <a class="header-anchor" href="#本资源由-itjc8-com-收集整理" aria-label="Permalink to &quot;本资源由 itjc8.com 收集整理&quot;">​</a></h2><h1 id="实战-实现客户端与服务端收发消息" tabindex="-1">实战：实现客户端与服务端收发消息 <a class="header-anchor" href="#实战-实现客户端与服务端收发消息" aria-label="Permalink to &quot;实战：实现客户端与服务端收发消息&quot;">​</a></h1><blockquote><p>这一小节，我们来实现客户端与服务端收发消息，我们要实现的具体功能是：在控制台输入一条消息之后按回车，校验完客户端的登录状态之后，把消息发送到服务端，服务端收到消息之后打印并且向客户端发送一条消息，客户端收到之后打印。</p></blockquote><h2 id="收发消息对象" tabindex="-1">收发消息对象 <a class="header-anchor" href="#收发消息对象" aria-label="Permalink to &quot;收发消息对象&quot;">​</a></h2><p>首先，我们来定义一下客户端与服务端的收发消息对象，我们把客户端发送至服务端的消息对象定义为 <code>MessageRequestPacket</code>。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>@Data</span></span>
<span class="line"><span>public class MessageRequestPacket extends Packet {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private String message;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public Byte getCommand() {</span></span>
<span class="line"><span>        return MESSAGE_REQUEST;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>指令为 <code>MESSAGE_REQUEST ＝ 3</code></p><p>我们把服务端发送至客户端的消息对象定义为 <code>MessageResponsePacket</code></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>@Data</span></span>
<span class="line"><span>public class MessageResponsePacket extends Packet {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private String message;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public Byte getCommand() {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        return MESSAGE_RESPONSE;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>指令为 <code>MESSAGE_RESPONSE = 4</code></p><p>至此，我们的指令已经有如下四种</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public interface Command {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    Byte LOGIN_REQUEST = 1;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    Byte LOGIN_RESPONSE = 2;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    Byte MESSAGE_REQUEST = 3;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    Byte MESSAGE_RESPONSE = 4;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="判断客户端是否登录成功" tabindex="-1">判断客户端是否登录成功 <a class="header-anchor" href="#判断客户端是否登录成功" aria-label="Permalink to &quot;判断客户端是否登录成功&quot;">​</a></h2><p>在<a href="https://juejin.im/book/5b4bc28bf265da0f60130116/section/5b4db04be51d45191556ee9c" target="_blank" rel="noreferrer">前面一小节</a>，我们在文末出了一道思考题：如何判断客户端是否已经登录？</p><p>在<a href="https://juejin.im/book/5b4bc28bf265da0f60130116/section/5b4dafd4f265da0f98314cc7" target="_blank" rel="noreferrer">客户端启动流程</a>这一章节，我们有提到可以给客户端连接，也就是 Channel 绑定属性，通过 <code>channel.attr(xxx).set(xx)</code> 的方式，那么我们是否可以在登录成功之后，给 Channel 绑定一个登录成功的标志位，然后判断是否登录成功的时候取出这个标志位就可以了呢？答案是肯定的</p><p>我们先来定义一下是否登录成功的标志位</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public interface Attributes {</span></span>
<span class="line"><span>    AttributeKey&lt;Boolean&gt; LOGIN = AttributeKey.newInstance(&quot;login&quot;);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>然后，我们在客户端登录成功之后，给客户端绑定登录成功的标志位</p><blockquote><p>ClientHandler.java</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public void channelRead(ChannelHandlerContext ctx, Object msg) {</span></span>
<span class="line"><span>    // ...</span></span>
<span class="line"><span>        if (loginResponsePacket.isSuccess()) {</span></span>
<span class="line"><span>            LoginUtil.markAsLogin(ctx.channel());</span></span>
<span class="line"><span>            System.out.println(new Date() + &quot;: 客户端登录成功&quot;);</span></span>
<span class="line"><span>        } else {</span></span>
<span class="line"><span>            System.out.println(new Date() + &quot;: 客户端登录失败，原因：&quot; + loginResponsePacket.getReason());</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    // ...</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>这里，我们省去了非关键代码部分</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public class LoginUtil {</span></span>
<span class="line"><span>    public static void markAsLogin(Channel channel) {</span></span>
<span class="line"><span>        channel.attr(Attributes.LOGIN).set(true);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public static boolean hasLogin(Channel channel) {</span></span>
<span class="line"><span>        Attribute&lt;Boolean&gt; loginAttr = channel.attr(Attributes.LOGIN);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        return loginAttr.get() != null;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>如上所示，我们抽取出 <code>LoginUtil</code> 用于设置登录标志位以及判断是否有标志位，如果有标志位，不管标志位的值是什么，都表示已经成功登录过，接下来，我们来实现控制台输入消息并发送至服务端。</p><h2 id="控制台输入消息并发送" tabindex="-1">控制台输入消息并发送 <a class="header-anchor" href="#控制台输入消息并发送" aria-label="Permalink to &quot;控制台输入消息并发送&quot;">​</a></h2><p>在<a href="https://juejin.im/book/5b4bc28bf265da0f60130116/section/5b4daf9ee51d4518f543f130" target="_blank" rel="noreferrer">客户端启动</a>这小节中，我们已经学到了客户端的启动流程，现在，我们在客户端连接上服务端之后启动控制台线程，从控制台获取消息，然后发送至服务端</p><blockquote><p>NettyClient.java</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span></span></span>
<span class="line"><span>private static void connect(Bootstrap bootstrap, String host, int port, int retry) {</span></span>
<span class="line"><span>    bootstrap.connect(host, port).addListener(future -&gt; {</span></span>
<span class="line"><span>        if (future.isSuccess()) {</span></span>
<span class="line"><span>            Channel channel = ((ChannelFuture) future).channel();</span></span>
<span class="line"><span>            // 连接成功之后，启动控制台线程</span></span>
<span class="line"><span>            startConsoleThread(channel);</span></span>
<span class="line"><span>        } </span></span>
<span class="line"><span>        // ...</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>private static void startConsoleThread(Channel channel) {</span></span>
<span class="line"><span>    new Thread(() -&gt; {</span></span>
<span class="line"><span>        while (!Thread.interrupted()) {</span></span>
<span class="line"><span>            if (LoginUtil.hasLogin(channel)) {</span></span>
<span class="line"><span>                System.out.println(&quot;输入消息发送至服务端: &quot;);</span></span>
<span class="line"><span>                Scanner sc = new Scanner(System.in);</span></span>
<span class="line"><span>                String line = sc.nextLine();</span></span>
<span class="line"><span>                </span></span>
<span class="line"><span>                MessageRequestPacket packet = new MessageRequestPacket();</span></span>
<span class="line"><span>                packet.setMessage(line);</span></span>
<span class="line"><span>                ByteBuf byteBuf = PacketCodeC.INSTANCE.encode(channel.alloc(), packet);</span></span>
<span class="line"><span>                channel.writeAndFlush(byteBuf);</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }).start();</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>这里，我们省略了非关键代码，连接成功之后，我们调用 <code>startConsoleThread()</code> 开始启动控制台线程，然后在控制台线程中，判断只要当前 channel 是登录状态，就允许控制台输入消息。</p><p>从控制台获取消息之后，将消息封装成消息对象，然后将消息编码成 <code>ByteBuf</code>，最后通过 <code>writeAndFlush()</code> 将消息写到服务端，这个过程相信大家在学习了上小节的内容之后，应该不会太陌生。接下来，我们来看一下服务端收到消息之后是如何来处理的。</p><h2 id="服务端收发消息处理" tabindex="-1">服务端收发消息处理 <a class="header-anchor" href="#服务端收发消息处理" aria-label="Permalink to &quot;服务端收发消息处理&quot;">​</a></h2><blockquote><p>ServerHandler.java</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public void channelRead(ChannelHandlerContext ctx, Object msg) {</span></span>
<span class="line"><span>    ByteBuf requestByteBuf = (ByteBuf) msg;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    Packet packet = PacketCodeC.INSTANCE.decode(requestByteBuf);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if (packet instanceof LoginRequestPacket) {</span></span>
<span class="line"><span>        // 处理登录..</span></span>
<span class="line"><span>    } else if (packet instanceof MessageRequestPacket) {</span></span>
<span class="line"><span>        // 处理消息</span></span>
<span class="line"><span>        MessageRequestPacket messageRequestPacket = ((MessageRequestPacket) packet);</span></span>
<span class="line"><span>        System.out.println(new Date() + &quot;: 收到客户端消息: &quot; + messageRequestPacket.getMessage());</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        MessageResponsePacket messageResponsePacket = new MessageResponsePacket();</span></span>
<span class="line"><span>        messageResponsePacket.setMessage(&quot;服务端回复【&quot; + messageRequestPacket.getMessage() + &quot;】&quot;);</span></span>
<span class="line"><span>        ByteBuf responseByteBuf = PacketCodeC.INSTANCE.encode(ctx.alloc(), messageResponsePacket);</span></span>
<span class="line"><span>        ctx.channel().writeAndFlush(responseByteBuf);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>服务端在收到消息之后，仍然是回调到 <code>channelRead()</code> 方法，解码之后用一个 <code>else</code> 分支进入消息处理的流程。</p><p>首先，服务端将收到的消息打印到控制台，然后封装一个消息响应对象 <code>MessageResponsePacket</code>，接下来还是老样子，先编码成 <code>ByteBuf</code>，然后调用 <code>writeAndFlush()</code> 将数据写到客户端，最后，我们再来看一下客户端收到消息的逻辑。</p><h2 id="客户端收消息处理" tabindex="-1">客户端收消息处理 <a class="header-anchor" href="#客户端收消息处理" aria-label="Permalink to &quot;客户端收消息处理&quot;">​</a></h2><blockquote><p>ClientHandler.java</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public void channelRead(ChannelHandlerContext ctx, Object msg) {</span></span>
<span class="line"><span>    ByteBuf byteBuf = (ByteBuf) msg;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    Packet packet = PacketCodeC.INSTANCE.decode(byteBuf);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if (packet instanceof LoginResponsePacket) {</span></span>
<span class="line"><span>        // 登录逻辑...</span></span>
<span class="line"><span>    } else if (packet instanceof MessageResponsePacket) {</span></span>
<span class="line"><span>        MessageResponsePacket messageResponsePacket = (MessageResponsePacket) packet;</span></span>
<span class="line"><span>        System.out.println(new Date() + &quot;: 收到服务端的消息: &quot; + messageResponsePacket.getMessage());</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>客户端在收到消息之后，回调到 <code>channelRead()</code> 方法，仍然用一个 <code>else</code> 逻辑进入到消息处理的逻辑，这里我们仅仅是简单地打印出消息，最后，我们再来看一下服务端和客户端的运行效果</p><blockquote><p>完整的代码参考 <a href="https://github.com/lightningMan/flash-netty/tree/%E5%AE%9E%E7%8E%B0%E5%AE%A2%E6%88%B7%E7%AB%AF%E4%B8%8E%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%94%B6%E5%8F%91%E6%B6%88%E6%81%AF" target="_blank" rel="noreferrer">github</a>, 分别启动 <code>NettyServer.java</code> 与 <code>NettyClient.java</code> 即可看到效果。</p></blockquote><h2 id="控制台输出" tabindex="-1">控制台输出 <a class="header-anchor" href="#控制台输出" aria-label="Permalink to &quot;控制台输出&quot;">​</a></h2><blockquote><p>客户端</p></blockquote><p><img src="https://user-gold-cdn.xitu.io/2018/8/15/1653af2fb9fb346d?w=1240&amp;h=413&amp;f=png&amp;s=281289" alt="image.png"></p><blockquote><p>服务端</p></blockquote><p><img src="https://user-gold-cdn.xitu.io/2018/8/15/1653af2fba0b762a?w=1240&amp;h=308&amp;f=png&amp;s=224335" alt="image.png"></p><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>在本小节中</p><ol><li>我们定义了收发消息的 Java 对象进行消息的收发。</li><li>然后我们学到了 channel 的 <code>attr()</code> 的实际用法：可以通过给 channel 绑定属性来设置某些状态，获取某些状态，不需要额外的 map 来维持。</li><li>接着，我们学习了如何在控制台获取消息并且发送至服务端。</li><li>最后，我们实现了服务端回消息，客户端响应的逻辑，可以看到，这里的部分实际上和前面一小节的登录流程有点类似。</li></ol><h2 id="思考" tabindex="-1">思考 <a class="header-anchor" href="#思考" aria-label="Permalink to &quot;思考&quot;">​</a></h2><p>随着我们实现的指令越来越多，如何避免 <code>channelRead()</code> 中对指令处理的 <code>if else</code> 泛滥？欢迎留言讨论。</p>`,49),l=[t];function c(i,o,d,r,u,h){return n(),a("div",null,l)}const k=s(p,[["render",c]]);export{b as __pageData,k as default};
