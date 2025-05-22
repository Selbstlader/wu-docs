import{_ as n,c as a,o as e,ag as p}from"./chunks/framework.CPUF7_g-.js";const u=JSON.parse('{"title":"实战：客户端互聊原理与实现","description":"","frontmatter":{},"headers":[],"relativePath":"doc/Netty/16.md","filePath":"doc/Netty/16.md"}'),l={name:"doc/Netty/16.md"};function i(t,s,c,o,d,r){return e(),a("div",null,s[0]||(s[0]=[p(`<h2 id="本资源由-itjc8-com-收集整理" tabindex="-1">本资源由 itjc8.com 收集整理 <a class="header-anchor" href="#本资源由-itjc8-com-收集整理" aria-label="Permalink to &quot;本资源由 itjc8.com 收集整理&quot;">​</a></h2><h1 id="实战-客户端互聊原理与实现" tabindex="-1">实战：客户端互聊原理与实现 <a class="header-anchor" href="#实战-客户端互聊原理与实现" aria-label="Permalink to &quot;实战：客户端互聊原理与实现&quot;">​</a></h1><blockquote><p>之前写过一篇非严肃的<a href="https://mp.weixin.qq.com/s?__biz=MzI1OTUzMTQyMA==&amp;mid=2247484094&amp;idx=1&amp;sn=d3c89ca9897f11e94deaa85e16e09e8c&amp;chksm=ea76354ddd01bc5b49da25fc47237137796e1151e69ad975d47d37241cfefcca3762ee35017e&amp;token=1671319965&amp;lang=zh_CN#rd" target="_blank" rel="noreferrer">微信单聊原理</a>，得到广大网友的一致好评，有很多读者留言问我如何使用 Netty 来具体实现这个逻辑，学完本小节，你会发现其实很简单。</p></blockquote><p>在开始本小节之前，我们先来看一下本小节学完之后，单聊的实现的效果是什么样的？</p><h2 id="_1-最终效果" tabindex="-1">1. 最终效果 <a class="header-anchor" href="#_1-最终效果" aria-label="Permalink to &quot;1\\. 最终效果&quot;">​</a></h2><blockquote><p>服务端</p></blockquote><p><img src="https://user-gold-cdn.xitu.io/2018/10/4/1663cf72744c1c77?w=1240&amp;h=178&amp;f=png&amp;s=70340" alt="image.png"></p><p>服务端启动之后，两个客户端陆续登录</p><blockquote><p>客户端 1</p></blockquote><p><img src="https://user-gold-cdn.xitu.io/2018/10/4/1663cf72743c2381?w=1240&amp;h=233&amp;f=png&amp;s=130573" alt="image.png"></p><blockquote><p>客户端 2</p></blockquote><p><img src="https://user-gold-cdn.xitu.io/2018/10/4/1663cf727482a24b?w=1240&amp;h=236&amp;f=png&amp;s=128012" alt="image.png"></p><ol><li><p>客户端启动之后，我们在控制台输入用户名，服务端随机分配一个 userId 给客户端，这里我们省去了通过账号密码注册的过程，userId 就在服务端随机生成了，生产环境中可能会持久化在数据库，然后每次通过账号密码去“捞”。</p></li><li><p>当有两个客户端登录成功之后，在控制台输入<code>userId + 空格 + 消息</code>，这里的 userId 是消息接收方的标识， 消息接收方的控制台接着就会显示另外一个客户端发来的消息。</p></li></ol><p>一对一单聊的本质其实就这么简单，稍加改动其实就可以用在生产环境下，下面，我们就来一起学习一下如何实现控制台一对一单聊</p><h2 id="_2-一对一单聊原理" tabindex="-1">2. 一对一单聊原理 <a class="header-anchor" href="#_2-一对一单聊原理" aria-label="Permalink to &quot;2\\. 一对一单聊原理&quot;">​</a></h2><p>一对一单聊的原理我们在 <a href="https://juejin.im/book/5b4bc28bf265da0f60130116/section/5b6a1a9cf265da0f87595521" target="_blank" rel="noreferrer">仿微信 IM 系统简介</a> 已经学习过，我们再来重温一下</p><p><img src="https://user-gold-cdn.xitu.io/2018/8/9/1651c08e91cdd8e6?w=1228&amp;h=836&amp;f=png&amp;s=94796" alt="单聊流程"></p><ol><li>如上图，A 要和 B 聊天，首先 A 和 B 需要与服务器建立连接，然后进行一次登录流程，服务端保存用户标识和 TCP 连接的映射关系。</li><li>A 发消息给 B，首先需要将带有 B 标识的消息数据包发送到服务器，然后服务器从消息数据包中拿到 B 的标识，找到对应的 B 的连接，将消息发送给 B。</li></ol><p>原理掌握之后，接下来我们就来逐个实现这里面的逻辑</p><h2 id="_3-一对一单聊实现" tabindex="-1">3. 一对一单聊实现 <a class="header-anchor" href="#_3-一对一单聊实现" aria-label="Permalink to &quot;3\\. 一对一单聊实现&quot;">​</a></h2><h3 id="_3-1-用户登录状态与-channel-的绑定" tabindex="-1">3.1 用户登录状态与 channel 的绑定 <a class="header-anchor" href="#_3-1-用户登录状态与-channel-的绑定" aria-label="Permalink to &quot;3.1 用户登录状态与 channel 的绑定&quot;">​</a></h3><p>我们先来看一下，服务端在单聊实现中是如何处理登录消息的</p><blockquote><p>LoginRequestHandler.java</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 我们略去了非关键部分的代码，详细可以本地更新下代码，切换到本小节名称对应的 git 分支</span></span>
<span class="line"><span>protected void channelRead0(ChannelHandlerContext ctx, LoginRequestPacket loginRequestPacket) {</span></span>
<span class="line"><span>    LoginResponsePacket loginResponsePacket = xxx;</span></span>
<span class="line"><span>    String userId = randomUserId();</span></span>
<span class="line"><span>    loginResponsePacket.setUserId(userId);</span></span>
<span class="line"><span>    SessionUtil.bindSession(new Session(userId, loginRequestPacket.getUserName()), ctx.channel());</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 登录响应</span></span>
<span class="line"><span>    ctx.channel().writeAndFlush(loginResponsePacket);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 用户断线之后取消绑定</span></span>
<span class="line"><span>public void channelInactive(ChannelHandlerContext ctx) {</span></span>
<span class="line"><span>    SessionUtil.unBindSession(ctx.channel());</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>登录成功之后，服务端创建一个 <code>Session</code> 对象，这个对象表示用户当前的会话信息，在我们这个应用程序里面，<code>Session</code> 只有两个字段</p><blockquote><p>Session.java</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>public class Session {</span></span>
<span class="line"><span>    // 用户唯一性标识</span></span>
<span class="line"><span>    private String userId;</span></span>
<span class="line"><span>    private String userName;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>实际生产环境中 <code>Session</code> 中的字段可能较多，比如头像 url，年龄，性别等等。</p><p>然后，我们调用 <code>SessionUtil.bindSession()</code> 保存用户的会话信息，具体实现如下</p><blockquote><p>SessionUtil.java</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>public class SessionUtil {</span></span>
<span class="line"><span>    // userId -&gt; channel 的映射</span></span>
<span class="line"><span>    private static final Map&lt;String, Channel&gt; userIdChannelMap = new ConcurrentHashMap&lt;&gt;();</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public static void bindSession(Session session, Channel channel) {</span></span>
<span class="line"><span>        userIdChannelMap.put(session.getUserId(), channel);</span></span>
<span class="line"><span>        channel.attr(Attributes.SESSION).set(session);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public static void unBindSession(Channel channel) {</span></span>
<span class="line"><span>        if (hasLogin(channel)) {</span></span>
<span class="line"><span>            userIdChannelMap.remove(getSession(channel).getUserId());</span></span>
<span class="line"><span>            channel.attr(Attributes.SESSION).set(null);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    public static boolean hasLogin(Channel channel) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        return channel.hasAttr(Attributes.SESSION);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public static Session getSession(Channel channel) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        return channel.attr(Attributes.SESSION).get();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public static Channel getChannel(String userId) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        return userIdChannelMap.get(userId);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><ol><li><code>SessionUtil</code> 里面维持了一个 useId -&gt; channel 的映射 map，调用 <code>bindSession()</code> 方法的时候，在 map 里面保存这个映射关系，<code>SessionUtil</code> 还提供了 <code>getChannel()</code> 方法，这样就可以通过 userId 拿到对应的 channel。</li><li>除了在 map 里面维持映射关系之外，在 <code>bindSession()</code> 方法中，我们还给 channel 附上了一个属性，这个属性就是当前用户的 <code>Session</code>，我们也提供了 <code>getSession()</code> 方法，非常方便地拿到对应 channel 的会话信息。</li><li>这里的 <code>SessionUtil</code> 其实就是前面小节的 <code>LoginUtil</code>，这里重构了一下，其中 <code>hasLogin()</code> 方法，只需要判断当前是否有用户的会话信息即可。</li><li>在 <code>LoginRequestHandler</code> 中，我们还重写了 <code>channelInactive()</code> 方法，用户下线之后，我们需要在内存里面自动删除 userId 到 channel 的映射关系，这是通过调用 <code>SessionUtil.unBindSession()</code> 来实现的。</li></ol><p>关于用户会话信息的保存的逻辑其实就这么多，总结一点就是：登录的时候保存会话信息，登出的时候删除会话信息，接下来，我们就来实现服务端接收消息并转发的逻辑。</p><h3 id="_3-2-服务端接收消息并转发的实现" tabindex="-1">3.2 服务端接收消息并转发的实现 <a class="header-anchor" href="#_3-2-服务端接收消息并转发的实现" aria-label="Permalink to &quot;3.2 服务端接收消息并转发的实现&quot;">​</a></h3><p>我们重新来定义一下客户端发送给服务端的消息的数据包格式</p><blockquote><p>MessageRequestPacket.java</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>public class MessageRequestPacket extends Packet {</span></span>
<span class="line"><span>    private String toUserId;</span></span>
<span class="line"><span>    private String message;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>数据包格式很简单，<code>toUserId</code> 表示要发送给哪个用户，<code>message</code> 表示具体内容，接下来，我们来看一下服务端的消息处理 handler 是如何来处理消息的</p><blockquote><p>MessageRequestHandler.java</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>public class MessageRequestHandler extends SimpleChannelInboundHandler&lt;MessageRequestPacket&gt; {</span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    protected void channelRead0(ChannelHandlerContext ctx, MessageRequestPacket messageRequestPacket) {</span></span>
<span class="line"><span>        // 1.拿到消息发送方的会话信息</span></span>
<span class="line"><span>        Session session = SessionUtil.getSession(ctx.channel());</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 2.通过消息发送方的会话信息构造要发送的消息</span></span>
<span class="line"><span>        MessageResponsePacket messageResponsePacket = new MessageResponsePacket();</span></span>
<span class="line"><span>        messageResponsePacket.setFromUserId(session.getUserId());</span></span>
<span class="line"><span>        messageResponsePacket.setFromUserName(session.getUserName());</span></span>
<span class="line"><span>        messageResponsePacket.setMessage(messageRequestPacket.getMessage());</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 3.拿到消息接收方的 channel</span></span>
<span class="line"><span>        Channel toUserChannel = SessionUtil.getChannel(messageRequestPacket.getToUserId());</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 4.将消息发送给消息接收方</span></span>
<span class="line"><span>        if (toUserChannel != null &amp;&amp; SessionUtil.hasLogin(toUserChannel)) {</span></span>
<span class="line"><span>            toUserChannel.writeAndFlush(messageResponsePacket);</span></span>
<span class="line"><span>        } else {</span></span>
<span class="line"><span>            System.err.println(&quot;[&quot; + messageRequestPacket.getToUserId() + &quot;] 不在线，发送失败!&quot;);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><ol><li>服务端在收到客户端发来的消息之后，首先拿到当前用户，也就是消息发送方的会话信息。</li><li>拿到消息发送方的会话信息之后，构造一个发送给客户端的消息对象 <code>MessageResponsePacket</code>，填上发送消息方的用户标识、昵称、消息内容。</li><li>通过消息接收方的标识拿到对应的 channel。</li><li>如果消息接收方当前是登录状态，直接发送，如果不在线，控制台打印出一条警告消息。</li></ol><p>这里，服务端的功能相当于消息转发：收到一个客户端的消息之后，构建一条发送给另一个客户端的消息，接着拿到另一个客户端的 channel，然后通过 <code>writeAndFlush()</code> 写出。接下来，我们再来看一下客户端收到消息之后的逻辑处理。</p><h3 id="_3-3-客户端收消息的逻辑处理" tabindex="-1">3.3 客户端收消息的逻辑处理 <a class="header-anchor" href="#_3-3-客户端收消息的逻辑处理" aria-label="Permalink to &quot;3.3 客户端收消息的逻辑处理&quot;">​</a></h3><blockquote><p>MessageResponseHandler.java</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>public class MessageResponseHandler extends SimpleChannelInboundHandler&lt;MessageResponsePacket&gt; {</span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    protected void channelRead0(ChannelHandlerContext ctx, MessageResponsePacket messageResponsePacket) {</span></span>
<span class="line"><span>        String fromUserId = messageResponsePacket.getFromUserId();</span></span>
<span class="line"><span>        String fromUserName = messageResponsePacket.getFromUserName();</span></span>
<span class="line"><span>        System.out.println(fromUserId + &quot;:&quot; + fromUserName + &quot; -&gt; &quot; + messageResponsePacket .getMessage());</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>客户端收到消息之后，只是把当前消息打印出来，这里把发送方的用户标识打印出来是为了方便我们在控制台回消息的时候，可以直接复制 ^ ^，到了这里，所有的核心逻辑其实已经完成了，我们还差最后一环：在客户端的控制台进行登录和发送消息逻辑。</p><h3 id="_3-4-客户端控制台登录和发送消息" tabindex="-1">3.4 客户端控制台登录和发送消息 <a class="header-anchor" href="#_3-4-客户端控制台登录和发送消息" aria-label="Permalink to &quot;3.4 客户端控制台登录和发送消息&quot;">​</a></h3><p>我们回到客户端的启动类，改造一下控制台的逻辑</p><blockquote><p>NettyClient.java</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>private static void startConsoleThread(Channel channel) {</span></span>
<span class="line"><span>    Scanner sc = new Scanner(System.in);</span></span>
<span class="line"><span>    LoginRequestPacket loginRequestPacket = new LoginRequestPacket();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    new Thread(() -&gt; {</span></span>
<span class="line"><span>        while (!Thread.interrupted()) {</span></span>
<span class="line"><span>            if (!SessionUtil.hasLogin(channel)) {</span></span>
<span class="line"><span>                System.out.print(&quot;输入用户名登录: &quot;);</span></span>
<span class="line"><span>                String username = sc.nextLine();</span></span>
<span class="line"><span>                loginRequestPacket.setUserName(username);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                // 密码使用默认的</span></span>
<span class="line"><span>                loginRequestPacket.setPassword(&quot;pwd&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                // 发送登录数据包</span></span>
<span class="line"><span>                channel.writeAndFlush(loginRequestPacket);</span></span>
<span class="line"><span>                waitForLoginResponse();</span></span>
<span class="line"><span>            } else {</span></span>
<span class="line"><span>                String toUserId = sc.next();</span></span>
<span class="line"><span>                String message = sc.next();</span></span>
<span class="line"><span>                channel.writeAndFlush(new MessageRequestPacket(toUserId, message));</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }).start();</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>private static void waitForLoginResponse() {</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        Thread.sleep(1000);</span></span>
<span class="line"><span>    } catch (InterruptedException ignored) {</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>我们在客户端启动的时候，起一个线程</p><ol><li>如果当前用户还未登录，我们在控制台输入一个用户名，然后构造一个登录数据包发送给服务器，发完之后，我们等待一个超时时间，可以当做是登录逻辑的最大处理时间，这里就简单粗暴点了。</li><li>如果当前用户已经是登录状态，我们可以在控制台输入消息接收方的 userId，然后输入一个空格，再输入消息的具体内容，然后，我们就可以构建一个消息数据包，发送到服务端。</li></ol><p>关于单聊的原理和实现，这小节到这里就结束了，最后，我们对本小节内容做一下总结。</p><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><ol><li>我们定义一个会话类 <code>Session</code> 用户维持用户的登录信息，用户登录的时候绑定 Session 与 channel，用户登出或者断线的时候解绑 Session 与 channel。</li><li>服务端处理消息的时候，通过消息接收方的标识，拿到消息接收方的 channel，调用 <code>writeAndFlush()</code> 将消息发送给消息接收方。</li></ol><h2 id="思考" tabindex="-1">思考 <a class="header-anchor" href="#思考" aria-label="Permalink to &quot;思考&quot;">​</a></h2><p>我们在本小节其实还少了用户登出请求和响应的指令处理，你是否能说出，对登出指令来说，服务端和客户端分别要干哪些事情？是否能够自行实现？</p><p>欢迎留言一起讨论，具体实现也会在下小节对应的代码分支上放出，读者可先自行尝试下实现。</p>`,58)]))}const g=n(l,[["render",i]]);export{u as __pageData,g as default};
