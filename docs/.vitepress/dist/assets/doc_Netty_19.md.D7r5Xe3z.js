import{_ as n,c as s,o as e,ag as p}from"./chunks/framework.CPUF7_g-.js";const u=JSON.parse('{"title":"群聊消息的收发及 Netty 性能优化","description":"","frontmatter":{},"headers":[],"relativePath":"doc/Netty/19.md","filePath":"doc/Netty/19.md"}'),l={name:"doc/Netty/19.md"};function t(i,a,c,d,o,r){return e(),s("div",null,a[0]||(a[0]=[p(`<h2 id="本资源由-itjc8-com-收集整理" tabindex="-1">本资源由 itjc8.com 收集整理 <a class="header-anchor" href="#本资源由-itjc8-com-收集整理" aria-label="Permalink to &quot;本资源由 itjc8.com 收集整理&quot;">​</a></h2><h1 id="群聊消息的收发及-netty-性能优化" tabindex="-1">群聊消息的收发及 Netty 性能优化 <a class="header-anchor" href="#群聊消息的收发及-netty-性能优化" aria-label="Permalink to &quot;群聊消息的收发及 Netty 性能优化&quot;">​</a></h1><blockquote><p>通过前面小节的学习，相信大家看到本小节标题就已经知道该如何实现本小节的功能了吧，为了给大家学到更多的知识，在实现了群聊消息收发之后，本小节将带给大家更多的惊喜。</p></blockquote><p>开始实现之前，我们还是先来看一下群聊的最终效果。</p><h2 id="_1-群聊消息最终效果" tabindex="-1">1. 群聊消息最终效果 <a class="header-anchor" href="#_1-群聊消息最终效果" aria-label="Permalink to &quot;1\\. 群聊消息最终效果&quot;">​</a></h2><blockquote><p>服务端</p></blockquote><p><img src="https://user-gold-cdn.xitu.io/2018/10/7/1664b767dd41fc1f?w=1240&amp;h=269&amp;f=png&amp;s=109386" alt="image.png"></p><p>闪电侠，逆闪，极速先后登录，然后闪电侠拉逆闪，极速和自己加入群聊，下面，我们来看一下各位客户端的控制台界面</p><blockquote><p>客户端 - 闪电侠</p></blockquote><p><img src="https://user-gold-cdn.xitu.io/2018/10/7/1664b767dd448222?w=1240&amp;h=377&amp;f=png&amp;s=275928" alt="image.png"></p><p>闪电侠第一个输入 &quot;sendToGroup&quot; 发送群消息。</p><blockquote><p>客户端 - 逆闪</p></blockquote><p><img src="https://user-gold-cdn.xitu.io/2018/10/7/1664b767ddbe6c2d?w=1240&amp;h=308&amp;f=png&amp;s=217249" alt="image.png"></p><p>逆闪第二个输入 &quot;sendToGroup&quot; 发送群消息，在前面已经收到了闪电侠的消息。</p><blockquote><p>客户端 - 极速</p></blockquote><p><img src="https://user-gold-cdn.xitu.io/2018/10/7/1664b767ddc6b7a9?w=1240&amp;h=335&amp;f=png&amp;s=236321" alt="image.png"></p><p>逆闪最后一个输入 &quot;sendToGroup&quot; 发送消息，在前面已经收到了闪电侠和逆闪的消息。</p><ol><li>在闪电侠的控制台，输入 &quot;sendToGroup&quot; 指令之后，再输入 groupId + 空格 + 消息内容，发送消息给群里各位用户，随后，群组里的所有用户的控制台都显示了群消息。</li><li>随后，陆续在逆闪和极速的控制台做做相同的操作，群组里的所有用户的控制台陆续展示了群消息。</li></ol><p>这个实现过程和我们前面的套路一样，下面我们仅关注核心实现部分。</p><h2 id="_2-群聊消息的收发的实现" tabindex="-1">2. 群聊消息的收发的实现 <a class="header-anchor" href="#_2-群聊消息的收发的实现" aria-label="Permalink to &quot;2\\. 群聊消息的收发的实现&quot;">​</a></h2><p>核心实现部分其实就是服务端处理群消息的 handler - <code>GroupMessageRequestHandler</code></p><blockquote><p>GroupMessageRequestHandler.java</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>public class GroupMessageRequestHandler extends SimpleChannelInboundHandler&lt;GroupMessageRequestPacket&gt; {</span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    protected void channelRead0(ChannelHandlerContext ctx, GroupMessageRequestPacket requestPacket) {</span></span>
<span class="line"><span>        // 1.拿到 groupId 构造群聊消息的响应</span></span>
<span class="line"><span>        String groupId = requestPacket.getToGroupId();</span></span>
<span class="line"><span>        GroupMessageResponsePacket responsePacket = new GroupMessageResponsePacket();</span></span>
<span class="line"><span>        responsePacket.setFromGroupId(groupId);</span></span>
<span class="line"><span>        responsePacket.setMessage(requestPacket.getMessage());</span></span>
<span class="line"><span>        responsePacket.setFromUser(SessionUtil.getSession(ctx.channel()));</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 2. 拿到群聊对应的 channelGroup，写到每个客户端</span></span>
<span class="line"><span>        ChannelGroup channelGroup = SessionUtil.getChannelGroup(groupId);</span></span>
<span class="line"><span>        channelGroup.writeAndFlush(responsePacket);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><ol><li>首先，通过 groupId 构造群聊响应 <code>GroupMessageResponsePacket</code>，然后再把发送群聊的用户信息填入，这里的用户信息我们就直接复用与 channel 绑定的 session了。</li><li>然后，我们拿到对应群组的 <code>ChannelGroup</code>，通过 <code>writeAndFlush()</code> 写到客户端。</li></ol><p>完整代码大家可以参考 <a href="https://github.com/lightningMan/flash-netty" target="_blank" rel="noreferrer">github</a> <strong>对应本小节分支</strong>，下面进入我们本小节的几个重要知识点，可以拿小本本开始记了。</p><h2 id="_3-共享-handler" tabindex="-1">3. 共享 handler <a class="header-anchor" href="#_3-共享-handler" aria-label="Permalink to &quot;3\\. 共享 handler&quot;">​</a></h2><p>在使用 Netty 完成了一个 IM 系统的核心功能之后，我们再来仔细看一下服务端</p><blockquote><p>NettyServer.java</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>serverBootstrap</span></span>
<span class="line"><span>                .childHandler(new ChannelInitializer&lt;NioSocketChannel&gt;() {</span></span>
<span class="line"><span>                    protected void initChannel(NioSocketChannel ch) {</span></span>
<span class="line"><span>                        ch.pipeline().addLast(new Spliter());</span></span>
<span class="line"><span>                        ch.pipeline().addLast(new PacketDecoder());</span></span>
<span class="line"><span>                        ch.pipeline().addLast(new LoginRequestHandler());</span></span>
<span class="line"><span>                        ch.pipeline().addLast(new AuthHandler());</span></span>
<span class="line"><span>                        ch.pipeline().addLast(new MessageRequestHandler());</span></span>
<span class="line"><span>                        ch.pipeline().addLast(new CreateGroupRequestHandler());</span></span>
<span class="line"><span>                        ch.pipeline().addLast(new JoinGroupRequestHandler());</span></span>
<span class="line"><span>                        ch.pipeline().addLast(new QuitGroupRequestHandler());</span></span>
<span class="line"><span>                        ch.pipeline().addLast(new ListGroupMembersRequestHandler());</span></span>
<span class="line"><span>                        ch.pipeline().addLast(new GroupMessageRequestHandler());</span></span>
<span class="line"><span>                        ch.pipeline().addLast(new LogoutRequestHandler());</span></span>
<span class="line"><span>                        ch.pipeline().addLast(new PacketEncoder());</span></span>
<span class="line"><span>                    }</span></span>
<span class="line"><span>                });</span></span></code></pre></div><ol><li>我们看到，服务端的 pipeline 链里面已经有 12 个 handler，其中，与指令相关的 handler 有 9 个。</li><li>Netty 在这里的逻辑是：每次有新连接到来的时候，都会调用 <code>ChannelInitializer</code> 的 <code>initChannel()</code> 方法，然后这里 9 个指令相关的 handler 都会被 new 一次。</li><li>我们可以看到，其实这里的每一个指令 handler，他们内部都是没有成员变量的，也就是说是无状态的，我们完全可以使用单例模式，即调用 <code>pipeline().addLast()</code> 方法的时候，都直接使用单例，不需要每次都 new，提高效率，也避免了创建很多小的对象。</li></ol><p>比如，我们拿 <code>LoginRequestHandler</code> 举例，来看一下如何改造</p><blockquote><p>LoginRequestHandler.java</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>// 1. 加上注解标识，表明该 handler 是可以多个 channel 共享的</span></span>
<span class="line"><span>@ChannelHandler.Sharable</span></span>
<span class="line"><span>public class LoginRequestHandler extends SimpleChannelInboundHandler&lt;LoginRequestPacket&gt; {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 2. 构造单例</span></span>
<span class="line"><span>    public static final LoginRequestHandler INSTANCE = new LoginRequestHandler();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    protected LoginRequestHandler() {</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre></div><ol><li>首先，非常重要的一点，如果一个 handler 要被多个 channel 进行共享，必须要加上 <code>@ChannelHandler.Sharable</code> 显示地告诉 Netty，这个 handler 是支持多个 channel 共享的，否则会报错，读者可以自行尝试一下。</li><li>然后，我们仿照 Netty 源码里面单例模式的写法，构造一个单例模式的类。</li></ol><p>接着，我们在服务端的代理里面就可以这么写</p><blockquote><p>NettyServer.java</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>serverBootstrap</span></span>
<span class="line"><span>        .childHandler(new ChannelInitializer&lt;NioSocketChannel&gt;() {</span></span>
<span class="line"><span>            protected void initChannel(NioSocketChannel ch) {</span></span>
<span class="line"><span>                // ...单例模式，多个 channel 共享同一个 handler</span></span>
<span class="line"><span>                ch.pipeline().addLast(LoginRequestHandler.INSTANCE);</span></span>
<span class="line"><span>                // ...</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        });</span></span></code></pre></div><p>这样的话，每来一次新的连接，添加 handler 的时候就不需要每次都 new 了，剩下的 8 个 指令，读者可以自行尝试改造一下。</p><h2 id="_4-压缩-handler-合并编解码器" tabindex="-1">4. 压缩 handler - 合并编解码器 <a class="header-anchor" href="#_4-压缩-handler-合并编解码器" aria-label="Permalink to &quot;4\\. 压缩 handler - 合并编解码器&quot;">​</a></h2><p>当我们改造完了之后，我们再来看一下服务端代码</p><blockquote><p>NettyServer.java</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>serverBootstrap</span></span>
<span class="line"><span>        .childHandler(new ChannelInitializer&lt;NioSocketChannel&gt;() {</span></span>
<span class="line"><span>            protected void initChannel(NioSocketChannel ch) {</span></span>
<span class="line"><span>                ch.pipeline().addLast(new Spliter());</span></span>
<span class="line"><span>                ch.pipeline().addLast(new PacketDecoder());</span></span>
<span class="line"><span>                ch.pipeline().addLast(LoginRequestHandler.INSTANCE);</span></span>
<span class="line"><span>                ch.pipeline().addLast(AuthHandler.INSTANCE);</span></span>
<span class="line"><span>                ch.pipeline().addLast(MessageRequestHandler.INSTANCE);</span></span>
<span class="line"><span>                ch.pipeline().addLast(CreateGroupRequestHandler.INSTANCE);</span></span>
<span class="line"><span>                ch.pipeline().addLast(JoinGroupRequestHandler.INSTANCE);</span></span>
<span class="line"><span>                ch.pipeline().addLast(QuitGroupRequestHandler.INSTANCE);</span></span>
<span class="line"><span>                ch.pipeline().addLast(ListGroupMembersRequestHandler.INSTANCE);</span></span>
<span class="line"><span>                ch.pipeline().addLast(GroupMessageRequestHandler.INSTANCE);</span></span>
<span class="line"><span>                ch.pipeline().addLast(LogoutRequestHandler.INSTANCE);</span></span>
<span class="line"><span>                ch.pipeline().addLast(new PacketEncoder());</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        });</span></span></code></pre></div><p>pipeline 中第一个 handler - <code>Spliter</code>，我们是无法动它的，因为他内部实现是与每个 <code>channel</code> 有关，每个 <code>Spliter</code> 需要维持每个 channel 当前读到的数据，也就是说他是有状态的。 而 <code>PacketDecoder</code> 与 <code>PacketEncoder</code> 我们是可以继续改造的，Netty 内部提供了一个类，叫做 <code>MessageToMessageCodec</code>，使用它可以让我们的编解码操作放到一个类里面去实现，首先我们定义一个 <code>PacketCodecHandler</code></p><blockquote><p>PacketCodecHandler.java</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>@ChannelHandler.Sharable</span></span>
<span class="line"><span>public class PacketCodecHandler extends MessageToMessageCodec&lt;ByteBuf, Packet&gt; {</span></span>
<span class="line"><span>    public static final PacketCodecHandler INSTANCE = new PacketCodecHandler();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private PacketCodecHandler() {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    protected void decode(ChannelHandlerContext ctx, ByteBuf byteBuf, List&lt;Object&gt; out) {</span></span>
<span class="line"><span>        out.add(PacketCodec.INSTANCE.decode(byteBuf));</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    protected void encode(ChannelHandlerContext ctx, Packet packet, List&lt;Object&gt; out) {</span></span>
<span class="line"><span>        ByteBuf byteBuf = ctx.channel().alloc().ioBuffer();</span></span>
<span class="line"><span>        PacketCodec.INSTANCE.encode(byteBuf, packet);</span></span>
<span class="line"><span>        out.add(byteBuf);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><ol><li>首先，这里 <code>PacketCodecHandler</code>，他是一个无状态的 handler，因此，同样可以使用单例模式来实现。</li><li>我们看到，我们需要实现 <code>decode()</code> 和 <code>encode()</code> 方法，decode 是将二进制数据 ByteBuf 转换为 java 对象 Packet，而 encode 操作是一个相反的过程，在 <code>encode()</code> 方法里面，我们调用了 channel 的 内存分配器手工分配了 <code>ByteBuf</code>。</li></ol><p>接着，<code>PacketDecoder</code> 和 <code>PacketEncoder</code>都可以删掉，我们的 server 端代码就成了如下的样子</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>serverBootstrap</span></span>
<span class="line"><span>        .childHandler(new ChannelInitializer&lt;NioSocketChannel&gt;() {</span></span>
<span class="line"><span>            protected void initChannel(NioSocketChannel ch) {</span></span>
<span class="line"><span>                ch.pipeline().addLast(new Spliter());</span></span>
<span class="line"><span>                ch.pipeline().addLast(PacketCodecHandler.INSTANCE);</span></span>
<span class="line"><span>                ch.pipeline().addLast(LoginRequestHandler.INSTANCE);</span></span>
<span class="line"><span>                ch.pipeline().addLast(AuthHandler.INSTANCE);</span></span>
<span class="line"><span>                ch.pipeline().addLast(MessageRequestHandler.INSTANCE);</span></span>
<span class="line"><span>                ch.pipeline().addLast(CreateGroupRequestHandler.INSTANCE);</span></span>
<span class="line"><span>                ch.pipeline().addLast(JoinGroupRequestHandler.INSTANCE);</span></span>
<span class="line"><span>                ch.pipeline().addLast(QuitGroupRequestHandler.INSTANCE);</span></span>
<span class="line"><span>                ch.pipeline().addLast(ListGroupMembersRequestHandler.INSTANCE);</span></span>
<span class="line"><span>                ch.pipeline().addLast(GroupMessageRequestHandler.INSTANCE);</span></span>
<span class="line"><span>                ch.pipeline().addLast(LogoutRequestHandler.INSTANCE);</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        });</span></span></code></pre></div><p>可以看到，除了拆包器，所有的 handler 都写成了单例，当然，如果你的 handler 里有与 channel 相关成员变量，那就不要写成单例的，不过，其实所有的状态都可以绑定在 channel 的属性上，依然是可以改造成单例模式。</p><p><strong>这里，我提一个问题，为什么 <code>PacketCodecHandler</code> 这个 handler 可以直接移到前面去，原来的 <code>PacketEncoder</code> 不是在最后吗？读者可以结合前面 handler 与 pipeline 相关的小节思考一下。</strong></p><p>如果我们再仔细观察我们的服务端代码，发现，我们的 pipeline 链中，绝大部分都是与指令相关的 handler，我们把这些 handler 编排在一起，是为了逻辑简洁，但是随着指令相关的 handler 越来越多，handler 链越来越长，在事件传播过程中性能损耗会被逐渐放大，因为解码器解出来的每个 Packet 对象都要在每个 handler 上经过一遍，我们接下来来看一下如何缩短这个事件传播的路径。</p><h2 id="_5-缩短事件传播路径" tabindex="-1">5. 缩短事件传播路径 <a class="header-anchor" href="#_5-缩短事件传播路径" aria-label="Permalink to &quot;5\\. 缩短事件传播路径&quot;">​</a></h2><h3 id="_5-1-压缩-handler-合并平行-handler" tabindex="-1">5.1 压缩 handler - 合并平行 handler <a class="header-anchor" href="#_5-1-压缩-handler-合并平行-handler" aria-label="Permalink to &quot;5.1 压缩 handler - 合并平行 handler&quot;">​</a></h3><p>对我们这个应用程序来说，每次 decode 出来一个指令对象之后，其实只会在一个指令 handler 上进行处理，因此，我们其实可以把这么多的指令 handler 压缩为一个 handler，我们来看一下如何实现</p><p>我们定义一个 <code>IMHandler</code>，实现如下：</p><blockquote><p>IMHandler.java</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>@ChannelHandler.Sharable</span></span>
<span class="line"><span>public class IMHandler extends SimpleChannelInboundHandler&lt;Packet&gt; {</span></span>
<span class="line"><span>    public static final IMHandler INSTANCE = new IMHandler();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private Map&lt;Byte, SimpleChannelInboundHandler&lt;? extends Packet&gt;&gt; handlerMap;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private IMHandler() {</span></span>
<span class="line"><span>        handlerMap = new HashMap&lt;&gt;();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        handlerMap.put(MESSAGE_REQUEST, MessageRequestHandler.INSTANCE);</span></span>
<span class="line"><span>        handlerMap.put(CREATE_GROUP_REQUEST, CreateGroupRequestHandler.INSTANCE);</span></span>
<span class="line"><span>        handlerMap.put(JOIN_GROUP_REQUEST, JoinGroupRequestHandler.INSTANCE);</span></span>
<span class="line"><span>        handlerMap.put(QUIT_GROUP_REQUEST, QuitGroupRequestHandler.INSTANCE);</span></span>
<span class="line"><span>        handlerMap.put(LIST_GROUP_MEMBERS_REQUEST, ListGroupMembersRequestHandler.INSTANCE);</span></span>
<span class="line"><span>        handlerMap.put(GROUP_MESSAGE_REQUEST, GroupMessageRequestHandler.INSTANCE);</span></span>
<span class="line"><span>        handlerMap.put(LOGOUT_REQUEST, LogoutRequestHandler.INSTANCE);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    protected void channelRead0(ChannelHandlerContext ctx, Packet packet) throws Exception {</span></span>
<span class="line"><span>        handlerMap.get(packet.getCommand()).channelRead(ctx, packet);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><ol><li>首先，IMHandler 是无状态的，依然是可以写成一个单例模式的类。</li><li>我们定义一个 map，存放指令到各个指令处理器的映射。</li><li>每次回调到 IMHandler 的 <code>channelRead0()</code> 方法的时候，我们通过指令找到具体的 handler，然后调用指令 handler 的 <code>channelRead</code>，他内部会做指令类型转换，最终调用到每个指令 handler 的 <code>channelRead0()</code> 方法。</li></ol><p>接下来，我们来看一下，如此压缩之后，我们的服务端代码</p><blockquote><p>NettyServer.java</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>serverBootstrap</span></span>
<span class="line"><span>        .childHandler(new ChannelInitializer&lt;NioSocketChannel&gt;() {</span></span>
<span class="line"><span>            protected void initChannel(NioSocketChannel ch) {</span></span>
<span class="line"><span>                ch.pipeline().addLast(new Spliter());</span></span>
<span class="line"><span>                ch.pipeline().addLast(PacketCodecHandler.INSTANCE);</span></span>
<span class="line"><span>                ch.pipeline().addLast(LoginRequestHandler.INSTANCE);</span></span>
<span class="line"><span>                ch.pipeline().addLast(AuthHandler.INSTANCE);</span></span>
<span class="line"><span>                ch.pipeline().addLast(IMHandler.INSTANCE);</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        });</span></span></code></pre></div><p>可以看到，现在，我们服务端的代码已经变得很清爽了，所有的平行指令处理 handler，我们都压缩到了一个 <code>IMHandler</code>，并且 <code>IMHandler</code> 和指令 handler 均为单例模式，在单机十几万甚至几十万的连接情况下，性能能得到一定程度的提升，创建的对象也大大减少了。</p><p>当然，如果你对性能要求没这么高，大可不必搞得这么复杂，还是按照我们前面小节的方式来实现即可，比如，我们的客户端多数情况下是单连接的，其实并不需要搞得如此复杂，还是保持原样即可。</p><h3 id="_5-2-更改事件传播源" tabindex="-1">5.2 更改事件传播源 <a class="header-anchor" href="#_5-2-更改事件传播源" aria-label="Permalink to &quot;5.2 更改事件传播源&quot;">​</a></h3><p>另外，关于缩短事件传播路径，除了压缩 handler，还有一个就是，如果你的 outBound 类型的 handler 较多，在写数据的时候能用 <code>ctx.writeAndFlush()</code> 就用这个方法。</p><blockquote><p><code>ctx.writeAndFlush()</code> 事件传播路径</p></blockquote><p><code>ctx.writeAndFlush()</code> 是从 pipeline 链中的当前节点开始往前找到第一个 outBound 类型的 handler 把对象往前进行传播，如果这个对象确认不需要经过其他 outBound 类型的 handler 处理，就使用这个方法。</p><p><img src="https://user-gold-cdn.xitu.io/2018/10/7/1664b767ddcf7711?w=1240&amp;h=266&amp;f=png&amp;s=56566" alt="image.png"></p><p>如上图，在某个 inBound 类型的 handler 处理完逻辑之后，调用 <code>ctx.writeAndFlush()</code> 可以直接一口气把对象送到 codec 中编码，然后写出去。</p><blockquote><p><code>ctx.channel().writeAndFlush()</code> 事件传播路径</p></blockquote><p><code>ctx.channel().writeAndFlush()</code> 是从 pipeline 链中的最后一个 outBound 类型的 handler 开始，把对象往前进行传播，如果你确认当前创建的对象需要经过后面的 outBound 类型的 handler，那么就调用此方法。</p><p><img src="https://user-gold-cdn.xitu.io/2018/10/7/1664b767de0cf5ea?w=1240&amp;h=297&amp;f=png&amp;s=66038" alt="image.png"></p><p>如上图，在某个 inBound 类型的 handler 处理完逻辑之后，调用 <code>ctx.channel().writeAndFlush()</code>，对象会从最后一个 outBound 类型的 handler 开始，逐个往前进行传播，路径是要比 <code>ctx.writeAndFlush()</code> 要长的。</p><p>由此可见，在我们的应用程序中，当我们没有改造编解码之前，我们必须调用 <code>ctx.channel().writeAndFlush()</code>, 而经过改造之后，我们的编码器（既属于 inBound, 又属于 outBound 类型的 handler）已处于 pipeline 的最前面，因此，可以大胆使用 <code>ctx.writeAndFlush()</code>。</p><h2 id="_6-减少阻塞主线程的操作" tabindex="-1">6. 减少阻塞主线程的操作 <a class="header-anchor" href="#_6-减少阻塞主线程的操作" aria-label="Permalink to &quot;6\\. 减少阻塞主线程的操作&quot;">​</a></h2><p><strong>这部分内容可能会引起部分读者不适，如果不能理解，记住结论即可。</strong></p><p>通常我们的应用程序会涉及到数据库或者网络，比如以下这个例子</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>protected void channelRead0(ChannelHandlerContext ctx, T packet) {</span></span>
<span class="line"><span>    // 1. balabala 一些逻辑</span></span>
<span class="line"><span>    // 2. 数据库或者网络等一些耗时的操作</span></span>
<span class="line"><span>    // 3. writeAndFlush()</span></span>
<span class="line"><span>    // 4. balabala 其他的逻辑</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>我们看到，在 <code>channelRead0()</code> 这个方法里面，第二个过程中，我们有一些耗时的操作，这个时候，我们万万不能将这个操作直接就在这个方法中处理了，为什么？</p><p>默认情况下，Netty 在启动的时候会开启 2 倍的 cpu 核数个 NIO 线程，而通常情况下我们单机会有几万或者十几万的连接，因此，一条 NIO 线程会管理着几千或几万个连接，在传播事件的过程中，单条 NIO 线程的处理逻辑可以抽象成以下一个步骤，我们就拿 <code>channelRead0()</code> 举例</p><blockquote><p>单个 NIO 线程执行的抽象逻辑</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>List&lt;Channel&gt; channelList = 已有数据可读的 channel</span></span>
<span class="line"><span>for (Channel channel in channelist) {</span></span>
<span class="line"><span>   for (ChannelHandler handler in channel.pipeline()) {</span></span>
<span class="line"><span>       handler.channelRead0();</span></span>
<span class="line"><span>   } </span></span>
<span class="line"><span>}</span></span></code></pre></div><p>从上面的抽象逻辑中可以看到，其中只要有一个 channel 的一个 handler 中的 <code>channelRead0()</code> 方法阻塞了 NIO 线程，最终都会拖慢绑定在该 NIO 线程上的其他所有的 channel，当然，这里抽象的逻辑已经做了简化，想了解细节可以参考我关于 Netty 中 NIO 线程（即 reactor 线程）文章的分析， 「<a href="https://www.jianshu.com/p/0d0eece6d467" target="_blank" rel="noreferrer">netty 源码分析之揭开 reactor 线程的面纱（一）</a>」， 「<a href="https://www.jianshu.com/p/467a9b41833e" target="_blank" rel="noreferrer">netty 源码分析之揭开 reactor 线程的面纱（二）</a>」， 「<a href="https://www.jianshu.com/p/58fad8e42379" target="_blank" rel="noreferrer">netty 源码分析之揭开 reactor 线程的面纱（二）</a>」</p><p>而我们需要怎么做？对于耗时的操作，我们需要把这些耗时的操作丢到我们的业务线程池中去处理，下面是解决方案的伪代码</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>ThreadPool threadPool = xxx;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>protected void channelRead0(ChannelHandlerContext ctx, T packet) {</span></span>
<span class="line"><span>    threadPool.submit(new Runnable() {</span></span>
<span class="line"><span>        // 1. balabala 一些逻辑</span></span>
<span class="line"><span>        // 2. 数据库或者网络等一些耗时的操作</span></span>
<span class="line"><span>        // 3. writeAndFlush()</span></span>
<span class="line"><span>        // 4. balabala 其他的逻辑</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>这样，就可以避免一些耗时的操作影响 Netty 的 NIO 线程，从而影响其他的 channel。</p><h2 id="_7-如何准确统计处理时长" tabindex="-1">7. 如何准确统计处理时长 <a class="header-anchor" href="#_7-如何准确统计处理时长" aria-label="Permalink to &quot;7\\. 如何准确统计处理时长&quot;">​</a></h2><p>我们接着前面的逻辑来讨论，通常，应用程序都有统计某个操作响应时间的需求，比如，基于我们上面的栗子，我们会这么做</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>protected void channelRead0(ChannelHandlerContext ctx, T packet) {</span></span>
<span class="line"><span>    threadPool.submit(new Runnable() {</span></span>
<span class="line"><span>        long begin = System.currentTimeMillis();</span></span>
<span class="line"><span>        // 1. balabala 一些逻辑</span></span>
<span class="line"><span>        // 2. 数据库或者网络等一些耗时的操作</span></span>
<span class="line"><span>        // 3. writeAndFlush()</span></span>
<span class="line"><span>        // 4. balabala 其他的逻辑</span></span>
<span class="line"><span>        long time =  System.currentTimeMillis() - begin;</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>这种做法其实是不推荐的，为什么？因为 <code>writeAndFlush()</code> 这个方法如果在非 NIO 线程（这里，我们其实是在业务线程中调用了该方法）中执行，它是一个异步的操作，调用之后，其实是会立即返回的，剩下的所有的操作，都是 Netty 内部有一个任务队列异步执行的，想了解底层细节的可以阅读一下我的这篇文章 <a href="https://www.jianshu.com/p/feaeaab2ce56" target="_blank" rel="noreferrer">「netty 源码分析之 writeAndFlush 全解析」</a> 因此，这里的 <code>writeAndFlush()</code> 执行完毕之后，并不能代表相关的逻辑，比如事件传播、编码等逻辑执行完毕，只是表示 Netty 接收了这个任务，那么如何才能判断 <code>writeAndFlush()</code> 执行完毕呢？我们可以这么做</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>protected void channelRead0(ChannelHandlerContext ctx, T packet) {</span></span>
<span class="line"><span>    threadPool.submit(new Runnable() {</span></span>
<span class="line"><span>        long begin = System.currentTimeMillis();</span></span>
<span class="line"><span>        // 1. balabala 一些逻辑</span></span>
<span class="line"><span>        // 2. 数据库或者网络等一些耗时的操作</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        // 3. writeAndFlush</span></span>
<span class="line"><span>        xxx.writeAndFlush().addListener(future -&gt; {</span></span>
<span class="line"><span>            if (future.isDone()) {</span></span>
<span class="line"><span>                // 4. balabala 其他的逻辑</span></span>
<span class="line"><span>                long time =  System.currentTimeMillis() - begin;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        });</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><code>writeAndFlush()</code> 方法会返回一个 <code>ChannelFuture</code> 对象，我们给这个对象添加一个监听器，然后在回调方法里面，我们可以监听这个方法执行的结果，进而再执行其他逻辑，最后统计耗时，这样统计出来的耗时才是最准确的。</p><p>最后，需要提出的一点就是，Netty 里面很多方法都是异步的操作，在业务线程中如果要统计这部分操作的时间，都需要使用监听器回调的方式来统计耗时，如果在 NIO 线程中调用，就不需要这么干。</p><h2 id="_8-总结" tabindex="-1">8. 总结 <a class="header-anchor" href="#_8-总结" aria-label="Permalink to &quot;8\\. 总结&quot;">​</a></h2><p>这小节的知识点较多，每一个知识点都是我在线上千万级长连接应用摸索总结出来的实践经验，了解这些知识点会对你的线上应用有较大帮助，最后，我们来总结一下</p><ol><li>我们先在开头实现了群聊消息的最后一个部分：群聊消息的收发，这部分内容对大家来说已经非常平淡无奇了，因此没有贴完整的实现，重点在于实现完这最后一步接下来所做的改造和优化。</li><li>所有指令都实现完之后，我们发现我们的 handler 已经非常臃肿庞大了，接下来，我们通过单例模式改造、编解码器合并、平行指令 handler 合并、慎重选择两种类型的 <code>writeAndFlush()</code> 的方式来压缩优化。</li><li>在 handler 的处理中，如果有耗时的操作，我们需要把这些操作都丢到我们自定义的的业务线程池中处理，因为 NIO 线程是会有很多 channel 共享的，我们不能阻塞他。</li><li>对于统计耗时的场景，如果在自定义业务线程中调用类似 <code>writeAndFlush()</code> 的异步操作，需要通过添加监听器的方式来统计。</li></ol><h2 id="_9-思考" tabindex="-1">9. 思考 <a class="header-anchor" href="#_9-思考" aria-label="Permalink to &quot;9\\. 思考&quot;">​</a></h2><p>本文的思考题在文中已经穿插给出，欢迎留言讨论。</p>`,98)]))}const g=n(l,[["render",t]]);export{u as __pageData,g as default};
