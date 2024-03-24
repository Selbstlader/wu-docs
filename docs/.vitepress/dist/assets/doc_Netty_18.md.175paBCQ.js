import{_ as n,c as s,o as a,a4 as e}from"./chunks/framework.DLF8A2I8.js";const b=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"doc/Netty/18.md","filePath":"doc/Netty/18.md"}'),p={name:"doc/Netty/18.md"},l=e(`<h2 id="本资源由-itjc8-com-收集整理" tabindex="-1">本资源由 itjc8.com 收集整理 <a class="header-anchor" href="#本资源由-itjc8-com-收集整理" aria-label="Permalink to &quot;本资源由 itjc8.com 收集整理&quot;">​</a></h2><blockquote><p>上一小节，我们已经学习了如何创建群聊并通知到群聊的各位成员。本小节，我们来实现群成员管理，包括群的加入退出，获取成员列表两大功能。有了前面两小节的基础，相信本小节的内容对你来说会比较简单。</p></blockquote><p>在开始之前，我们依然是先来看一下最终的效果。</p><h2 id="_1-最终效果" tabindex="-1">1. 最终效果 <a class="header-anchor" href="#_1-最终效果" aria-label="Permalink to &quot;1\\. 最终效果&quot;">​</a></h2><blockquote><p>服务端</p></blockquote><p><img src="https://user-gold-cdn.xitu.io/2018/10/5/1664484871ef2aec?w=1240&amp;h=319&amp;f=png&amp;s=122094" alt="image.png"></p><p>从服务端可以看到，闪电侠、逆闪、极速先后登录到服务器，然后随后，闪电侠创建一个群聊，接下来，萨维塔也登录了。这里，客户端我们只展示闪电侠和萨维塔的控制台界面</p><blockquote><p>客户端 - 闪电侠</p></blockquote><p><img src="https://user-gold-cdn.xitu.io/2018/10/5/1664484872148954?w=1240&amp;h=444&amp;f=png&amp;s=301020" alt="image.png"></p><blockquote><p>客户端 - 萨维塔</p></blockquote><p><img src="https://user-gold-cdn.xitu.io/2018/10/5/1664484871f648d4?w=1240&amp;h=386&amp;f=png&amp;s=184393" alt="image.png"></p><p>我们可以看到最终效果是四位用户登录成功之后</p><ol><li>闪电侠先拉逆闪和极速加入了群聊，控制台输出群创建成功的消息。</li><li>随后在萨维塔的控制台输入 &quot;joinGroup&quot; 之后再输入群聊的 id，加入群聊，控制台显示加入群成功。</li><li>在闪电侠的控制台输入 &quot;listGroupMembers&quot; 之后再输入群聊的 id，展示了当前群聊成员包括了极速、萨维塔、闪电侠、逆闪。</li><li>萨维塔的控制台输入 &quot;quitGroup&quot; 之后再输入群聊的 id，退出群聊，控制台显示退群成功。</li><li>最后在闪电侠的控制台输入 &quot;listGroupMembers&quot; 之后再输入群聊的 ID，展示了当前群聊成员已无萨维塔。</li></ol><p>接下来，我们就来实现加入群聊，退出群聊，获取成员列表三大功能。</p><h2 id="_2-群的加入" tabindex="-1">2. 群的加入 <a class="header-anchor" href="#_2-群的加入" aria-label="Permalink to &quot;2\\. 群的加入&quot;">​</a></h2><h3 id="_2-1-控制台添加群加入命令处理器" tabindex="-1">2.1 控制台添加群加入命令处理器 <a class="header-anchor" href="#_2-1-控制台添加群加入命令处理器" aria-label="Permalink to &quot;2.1 控制台添加群加入命令处理器&quot;">​</a></h3><blockquote><p>JoinGroupConsoleCommand.java</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public class JoinGroupConsoleCommand implements ConsoleCommand {</span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public void exec(Scanner scanner, Channel channel) {</span></span>
<span class="line"><span>        JoinGroupRequestPacket joinGroupRequestPacket = new JoinGroupRequestPacket();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        System.out.print(&quot;输入 groupId，加入群聊：&quot;);</span></span>
<span class="line"><span>        String groupId = scanner.next();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        joinGroupRequestPacket.setGroupId(groupId);</span></span>
<span class="line"><span>        channel.writeAndFlush(joinGroupRequestPacket);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>按照前面两小节的套路，我们在控制台先添加群加入命令处理器 <code>JoinGroupConsoleCommand</code>，在这个处理器中，我们创建一个指令对象 <code>JoinGroupRequestPacket</code>，填上群 id 之后，将数据包发送至服务端。之后，我们将该控制台指令添加到 <code>ConsoleCommandManager</code>。</p><blockquote><p>ConsoleCommandManager.java</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public class ConsoleCommandManager implements ConsoleCommand {</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    public ConsoleCommandManager() {</span></span>
<span class="line"><span>        // ...</span></span>
<span class="line"><span>        consoleCommandMap.put(&quot;joinGroup&quot;, new JoinGroupConsoleCommand());</span></span>
<span class="line"><span>        // ...</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>接下来，就轮到服务端来处理加群请求了。</p><h3 id="_2-2-服务端处理群加入请求" tabindex="-1">2.2 服务端处理群加入请求 <a class="header-anchor" href="#_2-2-服务端处理群加入请求" aria-label="Permalink to &quot;2.2 服务端处理群加入请求&quot;">​</a></h3><p>服务端的 pipeline 中添加对应的 handler - <code>JoinGroupRequestHandler</code></p><blockquote><p>NettyServer.java</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span></span></span>
<span class="line"><span>.childHandler(new ChannelInitializer&lt;NioSocketChannel&gt;() {</span></span>
<span class="line"><span>    protected void initChannel(NioSocketChannel ch) {</span></span>
<span class="line"><span>        // 添加加群请求处理器</span></span>
<span class="line"><span>        ch.pipeline().addLast(new JoinGroupRequestHandler());</span></span>
<span class="line"><span>        // ..</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>});</span></span></code></pre></div><p><code>JoinGroupRequestHandler</code> 的具体逻辑为</p><blockquote><p>JoinGroupRequestHandler.java</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public class JoinGroupRequestHandler extends SimpleChannelInboundHandler&lt;JoinGroupRequestPacket&gt; {</span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    protected void channelRead0(ChannelHandlerContext ctx, JoinGroupRequestPacket requestPacket) {</span></span>
<span class="line"><span>        // 1. 获取群对应的 channelGroup，然后将当前用户的 channel 添加进去</span></span>
<span class="line"><span>        String groupId = requestPacket.getGroupId();</span></span>
<span class="line"><span>        ChannelGroup channelGroup = SessionUtil.getChannelGroup(groupId);</span></span>
<span class="line"><span>        channelGroup.add(ctx.channel());</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 2. 构造加群响应发送给客户端</span></span>
<span class="line"><span>        JoinGroupResponsePacket responsePacket = new JoinGroupResponsePacket();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        responsePacket.setSuccess(true);</span></span>
<span class="line"><span>        responsePacket.setGroupId(groupId);</span></span>
<span class="line"><span>        ctx.channel().writeAndFlush(responsePacket);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><ol><li>首先，通过 groupId 拿到对应的 <code>ChannelGroup</code>，之后，只需要调用 <code>ChannelGroup.add()</code> 方法，将加入群聊的用户的 channel 添加进去，服务端即完成了加入群聊的逻辑。</li><li>然后，构造一个加群响应，填入 groupId 之后，调用 <code>writeAndFlush()</code> 发送给加入群聊的客户端。</li></ol><h3 id="_2-3-客户端处理群加入响应" tabindex="-1">2.3 客户端处理群加入响应 <a class="header-anchor" href="#_2-3-客户端处理群加入响应" aria-label="Permalink to &quot;2.3 客户端处理群加入响应&quot;">​</a></h3><p>我们在客户端的 pipeline 中添加对应的 handler - <code>JoinGroupResponseHandler</code> 来处理加群之后的响应</p><blockquote><p>NettyClient.java</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>.handler(new ChannelInitializer&lt;SocketChannel&gt;() {</span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public void initChannel(SocketChannel ch) {</span></span>
<span class="line"><span>        // 添加加群响应处理器</span></span>
<span class="line"><span>        ch.pipeline().addLast(new JoinGroupResponseHandler());</span></span>
<span class="line"><span>        // ...</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>});</span></span></code></pre></div><p><code>JoinGroupResponseHandler</code> 对应的逻辑为</p><blockquote><p>JoinGroupResponseHandler.java</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public class JoinGroupResponseHandler extends SimpleChannelInboundHandler&lt;JoinGroupResponsePacket&gt; {</span></span>
<span class="line"><span>    protected void channelRead0(ChannelHandlerContext ctx, JoinGroupResponsePacket responsePacket) {</span></span>
<span class="line"><span>        if (responsePacket.isSuccess()) {</span></span>
<span class="line"><span>            System.out.println(&quot;加入群[&quot; + responsePacket.getGroupId() + &quot;]成功!&quot;);</span></span>
<span class="line"><span>        } else {</span></span>
<span class="line"><span>            System.err.println(&quot;加入群[&quot; + responsePacket.getGroupId() + &quot;]失败，原因为：&quot; + responsePacket.getReason());</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>该处理器的逻辑很简单，只是简单的将加群的结果输出到控制台，实际生产环境 IM 可能比这个要复杂，但是修改起来也是非常容易的。至此，加群相关的逻辑到这里就结束了。</p><h2 id="_3-群的退出" tabindex="-1">3. 群的退出 <a class="header-anchor" href="#_3-群的退出" aria-label="Permalink to &quot;3\\. 群的退出&quot;">​</a></h2><p>关于群的退出和群的加入逻辑非常类似，这里展示一下关键代码，完整代码请参考 <a href="https://github.com/lightningMan/flash-netty" target="_blank" rel="noreferrer">github</a> <strong>对应本小节分支</strong></p><p>服务端退群的核心逻辑为 <code>QuitGroupRequestHandler</code></p><blockquote><p>QuitGroupRequestHandler.java</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public class QuitGroupRequestHandler extends SimpleChannelInboundHandler&lt;QuitGroupRequestPacket&gt; {</span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    protected void channelRead0(ChannelHandlerContext ctx, QuitGroupRequestPacket requestPacket) {</span></span>
<span class="line"><span>        // 1. 获取群对应的 channelGroup，然后将当前用户的 channel 移除</span></span>
<span class="line"><span>        String groupId = requestPacket.getGroupId();</span></span>
<span class="line"><span>        ChannelGroup channelGroup = SessionUtil.getChannelGroup(groupId);</span></span>
<span class="line"><span>        channelGroup.remove(ctx.channel());</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 2. 构造退群响应发送给客户端</span></span>
<span class="line"><span>        QuitGroupResponsePacket responsePacket = new QuitGroupResponsePacket();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        responsePacket.setGroupId(requestPacket.getGroupId());</span></span>
<span class="line"><span>        responsePacket.setSuccess(true);</span></span>
<span class="line"><span>        ctx.channel().writeAndFlush(responsePacket);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>从上面代码其实可以看到，<code>QuitGroupRequestHandler</code> 和 <code>JoinGroupRequestHandler</code> 其实是一个逆向的过程</p><ol><li>首先，通过 groupId 拿到对应的 <code>ChannelGroup</code>，之后，只需要调用 <code>ChannelGroup.remove()</code> 方法，将当前用户的 channel 删除，服务端即完成了退群的逻辑。</li><li>然后，构造一个退群响应，填入 groupId 之后，调用 <code>writeAndFlush()</code> 发送给退群的客户端。</li></ol><p>至此，加群和退群的逻辑到这里就结束了，最后，我们来看一下获取成员列表的逻辑。</p><h2 id="_4-获取成员列表" tabindex="-1">4. 获取成员列表 <a class="header-anchor" href="#_4-获取成员列表" aria-label="Permalink to &quot;4\\. 获取成员列表&quot;">​</a></h2><h3 id="_4-1-控制台添加获取群列表命令处理器" tabindex="-1">4.1 控制台添加获取群列表命令处理器 <a class="header-anchor" href="#_4-1-控制台添加获取群列表命令处理器" aria-label="Permalink to &quot;4.1 控制台添加获取群列表命令处理器&quot;">​</a></h3><blockquote><p>ListGroupMembersConsoleCommand.java</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public class ListGroupMembersConsoleCommand implements ConsoleCommand {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public void exec(Scanner scanner, Channel channel) {</span></span>
<span class="line"><span>        ListGroupMembersRequestPacket listGroupMembersRequestPacket = new ListGroupMembersRequestPacket();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        System.out.print(&quot;输入 groupId，获取群成员列表：&quot;);</span></span>
<span class="line"><span>        String groupId = scanner.next();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        listGroupMembersRequestPacket.setGroupId(groupId);</span></span>
<span class="line"><span>        channel.writeAndFlush(listGroupMembersRequestPacket);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>依旧按照一定的的套路，我们在控制台先添加获取群列表命令处理器 <code>ListGroupMembersConsoleCommand</code>，在这个处理器中，我们创建一个指令对象 <code>ListGroupMembersRequestPacket</code>，填上群 id 之后，将数据包发送至服务端。之后，我们将该控制台指令添加到 <code>ConsoleCommandManager</code>。</p><blockquote><p>ConsoleCommandManager.java</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public class ConsoleCommandManager implements ConsoleCommand {</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    public ConsoleCommandManager() {</span></span>
<span class="line"><span>        // ...</span></span>
<span class="line"><span>        consoleCommandMap.put(&quot;listGroupMembers&quot;, new ListGroupMembersConsoleCommand());</span></span>
<span class="line"><span>        // ...</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>接着，轮到服务端来处理获取成员列表请求。</p><h3 id="_4-2-服务端处理获取成员列表请求" tabindex="-1">4.2 服务端处理获取成员列表请求 <a class="header-anchor" href="#_4-2-服务端处理获取成员列表请求" aria-label="Permalink to &quot;4.2 服务端处理获取成员列表请求&quot;">​</a></h3><p>服务端的 pipeline 中添加对应的 handler - <code>ListGroupMembersRequestHandler</code></p><blockquote><p>NettyServer.java</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span></span></span>
<span class="line"><span>.childHandler(new ChannelInitializer&lt;NioSocketChannel&gt;() {</span></span>
<span class="line"><span>    protected void initChannel(NioSocketChannel ch) {</span></span>
<span class="line"><span>        // 添加获取群成员请求处理器</span></span>
<span class="line"><span>        ch.pipeline().addLast(new ListGroupMembersRequestHandler());</span></span>
<span class="line"><span>        // ..</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>});</span></span></code></pre></div><p><code>ListGroupMembersRequestHandler</code> 的具体逻辑为</p><blockquote><p>ListGroupMembersRequestHandler.java</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public class ListGroupMembersRequestHandler extends SimpleChannelInboundHandler&lt;ListGroupMembersRequestPacket&gt; {</span></span>
<span class="line"><span>    protected void channelRead0(ChannelHandlerContext ctx, JoinGroupRequestPacket requestPacket) {</span></span>
<span class="line"><span>        // 1. 获取群的 ChannelGroup</span></span>
<span class="line"><span>        String groupId = requestPacket.getGroupId();</span></span>
<span class="line"><span>        ChannelGroup channelGroup = SessionUtil.getChannelGroup(groupId);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 2. 遍历群成员的 channel，对应的 session，构造群成员的信息</span></span>
<span class="line"><span>        List&lt;Session&gt; sessionList = new ArrayList&lt;&gt;();</span></span>
<span class="line"><span>        for (Channel channel : channelGroup) {</span></span>
<span class="line"><span>            Session session = SessionUtil.getSession(channel);</span></span>
<span class="line"><span>            sessionList.add(session);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 3. 构建获取成员列表响应写回到客户端</span></span>
<span class="line"><span>        ListGroupMembersResponsePacket responsePacket = new ListGroupMembersResponsePacket();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        responsePacket.setGroupId(groupId);</span></span>
<span class="line"><span>        responsePacket.setSessionList(sessionList);</span></span>
<span class="line"><span>        ctx.channel().writeAndFlush(responsePacket);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><ol><li>首先，我们通过 groupId 拿到对应的 <code>ChannelGroup</code>。</li><li>接着，我们创建一个 sessionList 用来装载群成员信息，我们遍历 channel 的每个 session，把对应的用户信息装到 sessionList 中，实际生产环境中，这里可能会构造另外一个对象来装载用户信息而非 Session，这里我们就简单粗暴点了，改造起来不难。</li><li>最后，我们构造一个获取成员列表的响应指令数据包，填入 groupId 和群成员的信息之后，调用 <code>writeAndFlush()</code> 发送给发起获取成员列表的客户端。</li></ol><p>最后，就剩下客户端来处理获取群成员列表的响应了。</p><h3 id="_4-3-客户端处理获取成员列表响应" tabindex="-1">4.3 客户端处理获取成员列表响应 <a class="header-anchor" href="#_4-3-客户端处理获取成员列表响应" aria-label="Permalink to &quot;4.3 客户端处理获取成员列表响应&quot;">​</a></h3><p>套路和前面一样，我们在客户端的 pipeline 中添加一个 handler - <code>ListGroupMembersResponseHandler</code></p><blockquote><p>NettyClient.java</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>.handler(new ChannelInitializer&lt;SocketChannel&gt;() {</span></span>
<span class="line"><span>    public void initChannel(SocketChannel ch) {</span></span>
<span class="line"><span>        // ...</span></span>
<span class="line"><span>        // 添加获取群成员响应处理器</span></span>
<span class="line"><span>        ch.pipeline().addLast(new ListGroupMembersResponseHandler());</span></span>
<span class="line"><span>        // ...</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>});</span></span></code></pre></div><p>而我们这里 <code>ListGroupMembersResponseHandler</code> 的逻辑也只是在控制台展示一下群成员的信息</p><blockquote><p>ListGroupMembersResponseHandler.java</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public class ListGroupMembersResponseHandler extends SimpleChannelInboundHandler&lt;ListGroupMembersResponsePacket&gt; {</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    protected void channelRead0(ChannelHandlerContext ctx, ListGroupMembersResponsePacket responsePacket) {</span></span>
<span class="line"><span>        System.out.println(&quot;群[&quot; + responsePacket.getGroupId() + &quot;]中的人包括：&quot; + responsePacket.getSessionList());</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>至此，群成员加入退出，获取群成员列表对应的逻辑到这里就全部实现了，其实从这小节和前面的一两个小节大家其实可以看到，我们添加一个新功能其实是有一定的套路的，我们在最后的总结给出这个套路。</p><h2 id="_5-总结" tabindex="-1">5. 总结 <a class="header-anchor" href="#_5-总结" aria-label="Permalink to &quot;5\\. 总结&quot;">​</a></h2><p>添加一个服务端和客户端交互的新功能只需要遵循以下的步骤：</p><ol><li>创建控制台指令对应的 <code>ConsoleCommand</code> 并添加到 <code>ConsoleCommandManager</code>。</li><li>控制台输入指令和数据之后填入协议对应的指令数据包 - <code>xxxRequestPacket</code>，将请求写到服务端。</li><li>服务端创建对应的 <code>xxxRequestPacketHandler</code> 并添加到服务端的 pipeline 中，在 <code>xxxRequestPacketHandler</code> 处理完之后构造对应的 <code>xxxResponsePacket</code> 发送给客户端。</li><li>客户端创建对应的 <code>xxxResponsePacketHandler</code> 并添加到客户端的 pipeline 中，最后在 <code>xxxResponsePacketHandler</code> 完成响应的处理。</li><li>最后，最容易忽略的一点就是，新添加 <code>xxxPacket</code> 别忘了完善编解码器 <code>PacketCodec</code> 中的 <code>packetTypeMap</code>！</li></ol><h2 id="思考" tabindex="-1">思考 <a class="header-anchor" href="#思考" aria-label="Permalink to &quot;思考&quot;">​</a></h2><ol><li>实现以下功能：客户端加入或者退出群聊，将加入群聊的消息也通知到群聊中的其他客户端，这个消息需要和发起群聊的客户端区分开，类似 &quot;xxx 加入群聊 yyy&quot; 的格式。</li><li>实现当一个群的人数为 0 的时候，清理掉内存中群相关的信息。</li></ol><p>欢迎留言讨论。</p>`,77),o=[l];function t(i,c,r,d,u,h){return a(),s("div",null,o)}const k=n(p,[["render",t]]);export{b as __pageData,k as default};
