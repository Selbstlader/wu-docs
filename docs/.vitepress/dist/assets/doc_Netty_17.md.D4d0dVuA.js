import{_ as n,c as s,o as e,ag as p}from"./chunks/framework.CPUF7_g-.js";const h=JSON.parse('{"title":"群聊的发起与通知","description":"","frontmatter":{},"headers":[],"relativePath":"doc/Netty/17.md","filePath":"doc/Netty/17.md"}'),l={name:"doc/Netty/17.md"};function t(o,a,i,c,r,d){return e(),s("div",null,a[0]||(a[0]=[p(`<h2 id="本资源由-itjc8-com-收集整理" tabindex="-1">本资源由 itjc8.com 收集整理 <a class="header-anchor" href="#本资源由-itjc8-com-收集整理" aria-label="Permalink to &quot;本资源由 itjc8.com 收集整理&quot;">​</a></h2><h1 id="群聊的发起与通知" tabindex="-1">群聊的发起与通知 <a class="header-anchor" href="#群聊的发起与通知" aria-label="Permalink to &quot;群聊的发起与通知&quot;">​</a></h1><blockquote><p>这小节，我们来学习一下如何创建一个群聊，并通知到群聊中的各位成员</p></blockquote><p>我们依然是先来看一下最终的效果是什么样的。</p><h2 id="_1-最终效果" tabindex="-1">1. 最终效果 <a class="header-anchor" href="#_1-最终效果" aria-label="Permalink to &quot;1\\. 最终效果&quot;">​</a></h2><blockquote><p>服务端</p></blockquote><p><img src="https://user-gold-cdn.xitu.io/2018/10/5/16641505a75cded7?w=1240&amp;h=278&amp;f=png&amp;s=114205" alt="image.png"></p><blockquote><p>创建群聊的客户端</p></blockquote><p><img src="https://user-gold-cdn.xitu.io/2018/10/5/16641505aa8e0757?w=1240&amp;h=337&amp;f=png&amp;s=155352" alt="image.png"></p><blockquote><p>其他客户端</p></blockquote><p><img src="https://user-gold-cdn.xitu.io/2018/10/5/1664150595b149c0?w=1240&amp;h=268&amp;f=png&amp;s=117376" alt="image.png"></p><p><img src="https://user-gold-cdn.xitu.io/2018/10/5/166415059748e399?w=1240&amp;h=216&amp;f=png&amp;s=116068" alt="image.png"></p><ol><li>首先，依然是三位用户依次登录到服务器，分别是闪电侠、极速、萨维塔。</li><li>然后，我们在闪电侠的控制台输入 <code>createGroup</code> 指令，提示创建群聊需要输入 userId 列表，然后我们输入以英文逗号分隔的 userId。</li><li>群聊创建成功之后，分别在服务端和三个客户端弹出提示消息，包括群的 ID 以及群里各位用户的昵称。</li></ol><h2 id="_2-群聊原理" tabindex="-1">2. 群聊原理 <a class="header-anchor" href="#_2-群聊原理" aria-label="Permalink to &quot;2\\. 群聊原理&quot;">​</a></h2><p>群聊的原理我们在 <a href="https://juejin.im/book/5b4bc28bf265da0f60130116/section/5b6a1a9cf265da0f87595521" target="_blank" rel="noreferrer">仿微信 IM 系统简介</a> 已经学习过，我们再来重温一下</p><p>群聊指的是一个组内多个用户之间的聊天，一个用户发到群组的消息会被组内任何一个成员接收，下面我们来看一下群聊的基本流程。</p><p><img src="https://user-gold-cdn.xitu.io/2018/8/9/1651c08e91bfb935?w=1240&amp;h=872&amp;f=png&amp;s=183265" alt="image.png"></p><p>如上图，要实现群聊，其实和单聊类似</p><ol><li>A，B，C 依然会经历登录流程，服务端保存用户标识对应的 TCP 连接</li><li>A 发起群聊的时候，将 A，B，C 的标识发送至服务端，服务端拿到之后建立一个群聊 ID，然后把这个 ID 与 A，B，C 的标识绑定</li><li>群聊里面任意一方在群里聊天的时候，将群聊 ID 发送至服务端，服务端拿到群聊 ID 之后，取出对应的用户标识，遍历用户标识对应的 TCP 连接，就可以将消息发送至每一个群聊成员</li></ol><p>这一小节，我们把重点放在创建一个群聊上，由于控制台输入的指令越来越多，因此在正式开始之前，我们先对我们的控制台程序稍作重构。</p><h2 id="_2-控制台程序重构" tabindex="-1">2. 控制台程序重构 <a class="header-anchor" href="#_2-控制台程序重构" aria-label="Permalink to &quot;2\\. 控制台程序重构&quot;">​</a></h2><h3 id="_2-1-创建控制台命令执行器" tabindex="-1">2.1 创建控制台命令执行器 <a class="header-anchor" href="#_2-1-创建控制台命令执行器" aria-label="Permalink to &quot;2.1 创建控制台命令执行器&quot;">​</a></h3><p>首先，我们把在控制台要执行的操作抽象出来，抽象出一个接口</p><blockquote><p>ConsoleCommand.java</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>public interface ConsoleCommand {</span></span>
<span class="line"><span>    void exec(Scanner scanner, Channel channel);</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_2-2-管理控制台命令执行器" tabindex="-1">2.2 管理控制台命令执行器 <a class="header-anchor" href="#_2-2-管理控制台命令执行器" aria-label="Permalink to &quot;2.2 管理控制台命令执行器&quot;">​</a></h3><p>接着，我们创建一个管理类来对这些操作进行管理。</p><blockquote><p>ConsoleCommandManager.java</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>public class ConsoleCommandManager implements ConsoleCommand {</span></span>
<span class="line"><span>    private Map&lt;String, ConsoleCommand&gt; consoleCommandMap;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public ConsoleCommandManager() {</span></span>
<span class="line"><span>        consoleCommandMap = new HashMap&lt;&gt;();</span></span>
<span class="line"><span>        consoleCommandMap.put(&quot;sendToUser&quot;, new SendToUserConsoleCommand());</span></span>
<span class="line"><span>        consoleCommandMap.put(&quot;logout&quot;, new LogoutConsoleCommand());</span></span>
<span class="line"><span>        consoleCommandMap.put(&quot;createGroup&quot;, new CreateGroupConsoleCommand());</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public void exec(Scanner scanner, Channel channel) {</span></span>
<span class="line"><span>        //  获取第一个指令</span></span>
<span class="line"><span>        String command = scanner.next();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        ConsoleCommand consoleCommand = consoleCommandMap.get(command);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        if (consoleCommand != null) {</span></span>
<span class="line"><span>            consoleCommand.exec(scanner, channel);</span></span>
<span class="line"><span>        } else {</span></span>
<span class="line"><span>            System.err.println(&quot;无法识别[&quot; + command + &quot;]指令，请重新输入!&quot;);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><ol><li>我们在这个管理类中，把所有要管理的控制台指令都塞到一个 map 中。</li><li>执行具体操作的时候，我们先获取控制台第一个输入的指令，这里以字符串代替，比较清晰（这里我们已经实现了上小节课后思考题中的登出操作），然后通过这个指令拿到对应的控制台命令执行器执行。</li></ol><p>这里我们就拿创建群聊举个栗子：首先，我们在控制台输入 <code>createGroup</code>，然后我们按下回车，就会进入 <code>CreateGroupConsoleCommand</code> 这个类进行处理</p><blockquote><p>CreateGroupConsoleCommand.java</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>public class CreateGroupConsoleCommand implements ConsoleCommand {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private static final String USER_ID_SPLITER = &quot;,&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public void exec(Scanner scanner, Channel channel) {</span></span>
<span class="line"><span>        CreateGroupRequestPacket createGroupRequestPacket = new CreateGroupRequestPacket();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        System.out.print(&quot;【拉人群聊】输入 userId 列表，userId 之间英文逗号隔开：&quot;);</span></span>
<span class="line"><span>        String userIds = scanner.next();</span></span>
<span class="line"><span>        createGroupRequestPacket.setUserIdList(Arrays.asList(userIds.split(USER_ID_SPLITER)));</span></span>
<span class="line"><span>        channel.writeAndFlush(createGroupRequestPacket);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre></div><p>进入到 <code>CreateGroupConsoleCommand</code> 的逻辑之后，我们创建了一个群聊创建请求的数据包，然后提示输入以英文逗号分隔的 userId 的列表，填充完这个数据包之后，调用 <code>writeAndFlush()</code> 我们就可以发送一个创建群聊的指令到服务端。</p><p>最后，我们再来看一下经过我们的改造，客户端的控制台线程相关的代码。</p><blockquote><p>NettyClient.java</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>private static void startConsoleThread(Channel channel) {</span></span>
<span class="line"><span>    ConsoleCommandManager consoleCommandManager = new ConsoleCommandManager();</span></span>
<span class="line"><span>    LoginConsoleCommand loginConsoleCommand = new LoginConsoleCommand();</span></span>
<span class="line"><span>    Scanner scanner = new Scanner(System.in);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    new Thread(() -&gt; {</span></span>
<span class="line"><span>        while (!Thread.interrupted()) {</span></span>
<span class="line"><span>            if (!SessionUtil.hasLogin(channel)) {</span></span>
<span class="line"><span>                loginConsoleCommand.exec(scanner, channel);</span></span>
<span class="line"><span>            } else {</span></span>
<span class="line"><span>                consoleCommandManager.exec(scanner, channel);</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }).start();</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>抽取出控制台指令执行器之后，客户端控制台逻辑已经相对之前清晰很多了，可以非常方便地在控制台模拟各种在 IM 聊天窗口的操作，接下来，我们就来看一下如何创建群聊。</p><h2 id="_3-创建群聊的实现" tabindex="-1">3. 创建群聊的实现 <a class="header-anchor" href="#_3-创建群聊的实现" aria-label="Permalink to &quot;3\\. 创建群聊的实现&quot;">​</a></h2><h3 id="_3-1-客户端发送创建群聊请求" tabindex="-1">3.1 客户端发送创建群聊请求 <a class="header-anchor" href="#_3-1-客户端发送创建群聊请求" aria-label="Permalink to &quot;3.1 客户端发送创建群聊请求&quot;">​</a></h3><p>通过我们前面讲述控制台逻辑的重构，我们已经了解到我们是发送一个 <code>CreateGroupRequestPacket</code> 数据包到服务端，这个数据包的格式为：</p><blockquote><p>CreateGroupRequestPacket.java</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>public class CreateGroupRequestPacket extends Packet {</span></span>
<span class="line"><span>    private List&lt;String&gt; userIdList;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>它只包含了一个列表，这个列表就是需要拉取群聊的用户列表，接下来我们看下服务端如何处理的。</p><h3 id="_3-2-服务端处理创建群聊请求" tabindex="-1">3.2 服务端处理创建群聊请求 <a class="header-anchor" href="#_3-2-服务端处理创建群聊请求" aria-label="Permalink to &quot;3.2 服务端处理创建群聊请求&quot;">​</a></h3><p>我们依然是创建一个 handler 来处理新的指令。</p><blockquote><p>NettyServer.java</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>.childHandler(new ChannelInitializer&lt;NioSocketChannel&gt;() {</span></span>
<span class="line"><span>    protected void initChannel(NioSocketChannel ch) {</span></span>
<span class="line"><span>        // ...</span></span>
<span class="line"><span>        // 添加一个 handler </span></span>
<span class="line"><span>        ch.pipeline().addLast(new CreateGroupRequestHandler());</span></span>
<span class="line"><span>        // ...</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>});</span></span></code></pre></div><p>接下来，我们来看一下这个 handler 具体做哪些事情</p><blockquote><p>CreateGroupRequestHandler.java</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>public class CreateGroupRequestHandler extends SimpleChannelInboundHandler&lt;CreateGroupRequestPacket&gt; {</span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    protected void channelRead0(ChannelHandlerContext ctx, CreateGroupRequestPacket createGroupRequestPacket) {</span></span>
<span class="line"><span>        List&lt;String&gt; userIdList = createGroupRequestPacket.getUserIdList();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        List&lt;String&gt; userNameList = new ArrayList&lt;&gt;();</span></span>
<span class="line"><span>        // 1. 创建一个 channel 分组</span></span>
<span class="line"><span>        ChannelGroup channelGroup = new DefaultChannelGroup(ctx.executor());</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 2. 筛选出待加入群聊的用户的 channel 和 userName</span></span>
<span class="line"><span>        for (String userId : userIdList) {</span></span>
<span class="line"><span>            Channel channel = SessionUtil.getChannel(userId);</span></span>
<span class="line"><span>            if (channel != null) {</span></span>
<span class="line"><span>                channelGroup.add(channel);</span></span>
<span class="line"><span>                userNameList.add(SessionUtil.getSession(channel).getUserName());</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 3. 创建群聊创建结果的响应</span></span>
<span class="line"><span>        CreateGroupResponsePacket createGroupResponsePacket = new CreateGroupResponsePacket();</span></span>
<span class="line"><span>        createGroupResponsePacket.setSuccess(true);</span></span>
<span class="line"><span>        createGroupResponsePacket.setGroupId(IDUtil.randomId());</span></span>
<span class="line"><span>        createGroupResponsePacket.setUserNameList(userNameList);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 4. 给每个客户端发送拉群通知</span></span>
<span class="line"><span>        channelGroup.writeAndFlush(createGroupResponsePacket);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        System.out.print(&quot;群创建成功，id 为[&quot; + createGroupResponsePacket.getGroupId() + &quot;], &quot;);</span></span>
<span class="line"><span>        System.out.println(&quot;群里面有：&quot; + createGroupResponsePacket.getUserNameList());</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>整个过程可以分为以下几个过程</p><ol><li>首先，我们这里创建一个 <code>ChannelGroup</code>。这里简单介绍一下 <code>ChannelGroup</code>：它可以把多个 chanel 的操作聚合在一起，可以往它里面添加删除 channel，可以进行 channel 的批量读写，关闭等操作，详细的功能读者可以自行翻看这个接口的方法。这里我们一个群组其实就是一个 channel 的分组集合，使用 <code>ChannelGroup</code> 非常方便。</li><li>接下来，我们遍历待加入群聊的 userId，如果存在该用户，就把对应的 channel 添加到 <code>ChannelGroup</code> 中，用户昵称也添加到昵称列表中。</li><li>然后，我们创建一个创建群聊响应的对象，其中 <code>groupId</code> 是随机生成的，群聊创建结果一共三个字段，这里就不展开对这个类进行说明了。</li><li>最后，我们调用 <code>ChannelGroup</code> 的聚合发送功能，将拉群的通知批量地发送到客户端，接着在服务端控制台打印创建群聊成功的信息，至此，服务端处理创建群聊请求的逻辑结束。</li></ol><p>我们接下来再来看一下客户端处理创建群聊响应。</p><h3 id="_3-3-客户端处理创建群聊响应" tabindex="-1">3.3 客户端处理创建群聊响应 <a class="header-anchor" href="#_3-3-客户端处理创建群聊响应" aria-label="Permalink to &quot;3.3 客户端处理创建群聊响应&quot;">​</a></h3><p>客户端依然也是创建一个 handler 来处理新的指令。</p><blockquote><p>NettyClient.java</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>.handler(new ChannelInitializer&lt;SocketChannel&gt;() {</span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public void initChannel(SocketChannel ch) {</span></span>
<span class="line"><span>        // ...</span></span>
<span class="line"><span>        // 添加一个新的 handler 来处理创建群聊成功响应的指令</span></span>
<span class="line"><span>        ch.pipeline().addLast(new CreateGroupResponseHandler());</span></span>
<span class="line"><span>        // ...</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>});</span></span></code></pre></div><p>然后，在我们的应用程序里面，我们仅仅是把创建群聊成功之后的具体信息打印出来。</p><blockquote><p>CreateGroupResponseHandler.java</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>public class CreateGroupResponseHandler extends SimpleChannelInboundHandler&lt;CreateGroupResponsePacket&gt; {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    protected void channelRead0(ChannelHandlerContext ctx, CreateGroupResponsePacket createGroupResponsePacket) {</span></span>
<span class="line"><span>        System.out.print(&quot;群创建成功，id 为[&quot; + createGroupResponsePacket.getGroupId() + &quot;], &quot;);</span></span>
<span class="line"><span>        System.out.println(&quot;群里面有：&quot; + createGroupResponsePacket.getUserNameList());</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>在实际生产环境中，<code>CreateGroupResponsePacket</code> 对象里面可能有更多的信息，然后以上逻辑的处理也会更加复杂，不过我们这里已经能说明问题了。</p><p>到了这里，这小节的内容到这里就告一段落了，下小节，我们来学习群聊成员管理，包括添加删除成员，获取成员列表等等，最后，我们再对本小节内容做一下总结。</p><h2 id="_4-总结" tabindex="-1">4. 总结 <a class="header-anchor" href="#_4-总结" aria-label="Permalink to &quot;4\\. 总结&quot;">​</a></h2><ol><li>群聊的原理和单聊类似，无非都是通过标识拿到 channel。</li><li>本小节，我们重构了一下控制台的程序结构，在实际带有 UI 的 IM 应用中，我们输入的第一个指令其实就是对应我们点击 UI 的某些按钮或菜单的操作。</li><li>通过 <code>ChannelGroup</code>，我们可以很方便地对一组 channel 进行批量操作。</li></ol><h2 id="_5-思考" tabindex="-1">5. 思考 <a class="header-anchor" href="#_5-思考" aria-label="Permalink to &quot;5\\. 思考&quot;">​</a></h2><p>如何实现在某个客户端拉取群聊成员的时候，不需要输入自己的用户 ID，并且展示创建群聊消息的时候，不显示自己的昵称？欢迎留言讨论。</p>`,67)]))}const m=n(l,[["render",t]]);export{h as __pageData,m as default};
