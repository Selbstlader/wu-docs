import{_ as a,c as s,o as e,ag as p}from"./chunks/framework.CPUF7_g-.js";const h=JSON.parse('{"title":"客户端启动流程","description":"","frontmatter":{},"headers":[],"relativePath":"doc/Netty/5.md","filePath":"doc/Netty/5.md"}'),t={name:"doc/Netty/5.md"};function o(l,n,i,c,r,d){return e(),s("div",null,n[0]||(n[0]=[p(`<h2 id="本资源由-itjc8-com-收集整理" tabindex="-1">本资源由 itjc8.com 收集整理 <a class="header-anchor" href="#本资源由-itjc8-com-收集整理" aria-label="Permalink to &quot;本资源由 itjc8.com 收集整理&quot;">​</a></h2><h1 id="客户端启动流程" tabindex="-1">客户端启动流程 <a class="header-anchor" href="#客户端启动流程" aria-label="Permalink to &quot;客户端启动流程&quot;">​</a></h1><p>上一小节，我们已经学习了 Netty 服务端启动的流程，这一小节，我们来学习一下 Netty 客户端的启动流程。</p><h2 id="客户端启动-demo" tabindex="-1">客户端启动 Demo <a class="header-anchor" href="#客户端启动-demo" aria-label="Permalink to &quot;客户端启动 Demo&quot;">​</a></h2><p>对于客户端的启动来说，和服务端的启动类似，依然需要线程模型、IO 模型，以及 IO 业务处理逻辑三大参数，下面，我们来看一下客户端启动的标准流程</p><blockquote><p>NettyClient.java</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>public class NettyClient {</span></span>
<span class="line"><span>    public static void main(String[] args) {</span></span>
<span class="line"><span>        NioEventLoopGroup workerGroup = new NioEventLoopGroup();</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        Bootstrap bootstrap = new Bootstrap();</span></span>
<span class="line"><span>        bootstrap</span></span>
<span class="line"><span>                // 1.指定线程模型</span></span>
<span class="line"><span>                .group(workerGroup)</span></span>
<span class="line"><span>                // 2.指定 IO 类型为 NIO</span></span>
<span class="line"><span>                .channel(NioSocketChannel.class)</span></span>
<span class="line"><span>                // 3.IO 处理逻辑</span></span>
<span class="line"><span>                .handler(new ChannelInitializer&lt;SocketChannel&gt;() {</span></span>
<span class="line"><span>                    @Override</span></span>
<span class="line"><span>                    public void initChannel(SocketChannel ch) {</span></span>
<span class="line"><span>                    }</span></span>
<span class="line"><span>                });</span></span>
<span class="line"><span>        // 4.建立连接</span></span>
<span class="line"><span>        bootstrap.connect(&quot;juejin.im&quot;, 80).addListener(future -&gt; {</span></span>
<span class="line"><span>            if (future.isSuccess()) {</span></span>
<span class="line"><span>                System.out.println(&quot;连接成功!&quot;);</span></span>
<span class="line"><span>            } else {</span></span>
<span class="line"><span>                System.err.println(&quot;连接失败!&quot;);</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        });</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>从上面代码可以看到，客户端启动的引导类是 <code>Bootstrap</code>，负责启动客户端以及连接服务端，而上一小节我们在描述服务端的启动的时候，这个辅导类是 <code>ServerBootstrap</code>，引导类创建完成之后，下面我们描述一下客户端启动的流程</p><ol><li>首先，与服务端的启动一样，我们需要给它指定线程模型，驱动着连接的数据读写，这个线程的概念可以和第一小节<a href="https://juejin.im/book/5b4bc28bf265da0f60130116/section/5b4bc28b5188251b1f224ee5" target="_blank" rel="noreferrer">Netty是什么</a>中的 <code>IOClient.java</code> 创建的线程联系起来</li><li>然后，我们指定 IO 模型为 <code>NioSocketChannel</code>，表示 IO 模型为 NIO，当然，你可以可以设置 IO 模型为 <code>OioSocketChannel</code>，但是通常不会这么做，因为 Netty 的优势在于 NIO</li><li>接着，给引导类指定一个 <code>handler</code>，这里主要就是定义连接的业务处理逻辑，不理解没关系，在后面我们会详细分析</li><li>配置完线程模型、IO 模型、业务处理逻辑之后，调用 <code>connect</code> 方法进行连接，可以看到 <code>connect</code> 方法有两个参数，第一个参数可以填写 IP 或者域名，第二个参数填写的是端口号，由于 <code>connect</code> 方法返回的是一个 <code>Future</code>，也就是说这个方是异步的，我们通过 <code>addListener</code> 方法可以监听到连接是否成功，进而打印出连接信息</li></ol><p>到了这里，一个客户端的启动的 Demo 就完成了，其实只要和 客户端 Socket 编程模型对应起来，这里的三个概念就会显得非常简单，遗忘掉的同学可以回顾一下 <a href="https://juejin.im/book/5b4bc28bf265da0f60130116/section/5b4bc28b5188251b1f224ee5" target="_blank" rel="noreferrer">Netty是什么</a>中的 <code>IOClient.java</code> 再回来看这里的启动流程哦</p><h2 id="失败重连" tabindex="-1">失败重连 <a class="header-anchor" href="#失败重连" aria-label="Permalink to &quot;失败重连&quot;">​</a></h2><p>在网络情况差的情况下，客户端第一次连接可能会连接失败，这个时候我们可能会尝试重新连接，重新连接的逻辑写在连接失败的逻辑块里</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>bootstrap.connect(&quot;juejin.im&quot;, 80).addListener(future -&gt; {</span></span>
<span class="line"><span>    if (future.isSuccess()) {</span></span>
<span class="line"><span>        System.out.println(&quot;连接成功!&quot;);</span></span>
<span class="line"><span>    } else {</span></span>
<span class="line"><span>        System.err.println(&quot;连接失败!&quot;);</span></span>
<span class="line"><span>        // 重新连接</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>});</span></span></code></pre></div><p>重新连接的时候，依然是调用一样的逻辑，因此，我们把建立连接的逻辑先抽取出来，然后在重连失败的时候，递归调用自身</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>private static void connect(Bootstrap bootstrap, String host, int port) {</span></span>
<span class="line"><span>    bootstrap.connect(host, port).addListener(future -&gt; {</span></span>
<span class="line"><span>        if (future.isSuccess()) {</span></span>
<span class="line"><span>            System.out.println(&quot;连接成功!&quot;);</span></span>
<span class="line"><span>        } else {</span></span>
<span class="line"><span>            System.err.println(&quot;连接失败，开始重连&quot;);</span></span>
<span class="line"><span>            connect(bootstrap, host, port);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>上面这一段便是带有自动重连功能的逻辑，可以看到在连接建立失败的时候，会调用自身进行重连。</p><p>但是，通常情况下，连接建立失败不会立即重新连接，而是会通过一个指数退避的方式，比如每隔 1 秒、2 秒、4 秒、8 秒，以 2 的幂次来建立连接，然后到达一定次数之后就放弃连接，接下来我们就来实现一下这段逻辑，我们默认重试 5 次</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>connect(bootstrap, &quot;juejin.im&quot;, 80, MAX_RETRY);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>private static void connect(Bootstrap bootstrap, String host, int port, int retry) {</span></span>
<span class="line"><span>    bootstrap.connect(host, port).addListener(future -&gt; {</span></span>
<span class="line"><span>        if (future.isSuccess()) {</span></span>
<span class="line"><span>            System.out.println(&quot;连接成功!&quot;);</span></span>
<span class="line"><span>        } else if (retry == 0) {</span></span>
<span class="line"><span>            System.err.println(&quot;重试次数已用完，放弃连接！&quot;);</span></span>
<span class="line"><span>        } else {</span></span>
<span class="line"><span>            // 第几次重连</span></span>
<span class="line"><span>            int order = (MAX_RETRY - retry) + 1;</span></span>
<span class="line"><span>            // 本次重连的间隔</span></span>
<span class="line"><span>            int delay = 1 &lt;&lt; order;</span></span>
<span class="line"><span>            System.err.println(new Date() + &quot;: 连接失败，第&quot; + order + &quot;次重连……&quot;);</span></span>
<span class="line"><span>            bootstrap.config().group().schedule(() -&gt; connect(bootstrap, host, port, retry - 1), delay, TimeUnit</span></span>
<span class="line"><span>                    .SECONDS);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>从上面的代码可以看到，通过判断连接是否成功以及剩余重试次数，分别执行不同的逻辑</p><ol><li>如果连接成功则打印连接成功的消息</li><li>如果连接失败但是重试次数已经用完，放弃连接</li><li>如果连接失败但是重试次数仍然没有用完，则计算下一次重连间隔 <code>delay</code>，然后定期重连</li></ol><p>在上面的代码中，我们看到，我们定时任务是调用 <code>bootstrap.config().group().schedule()</code>, 其中 <code>bootstrap.config()</code> 这个方法返回的是 <code>BootstrapConfig</code>，他是对 <code>Bootstrap</code> 配置参数的抽象，然后 <code>bootstrap.config().group()</code> 返回的就是我们在一开始的时候配置的线程模型 <code>workerGroup</code>，调 <code>workerGroup</code> 的 <code>schedule</code> 方法即可实现定时任务逻辑。</p><p>在 <code>schedule</code> 方法块里面，前面四个参数我们原封不动地传递，最后一个重试次数参数减掉一，就是下一次建立连接时候的上下文信息。读者可以自行修改代码，更改到一个连接不上的服务端 Host 或者 Port，查看控制台日志就可以看到5次重连日志。</p><p>以上就是实现指数退避的客户端重连逻辑，接下来，我们来一起学习一下，客户端启动，我们的引导类<code>Bootstrap</code>除了指定线程模型，IO 模型，连接读写处理逻辑之外，他还可以干哪些事情？</p><h2 id="客户端启动其他方法" tabindex="-1">客户端启动其他方法 <a class="header-anchor" href="#客户端启动其他方法" aria-label="Permalink to &quot;客户端启动其他方法&quot;">​</a></h2><h3 id="attr-方法" tabindex="-1">attr() 方法 <a class="header-anchor" href="#attr-方法" aria-label="Permalink to &quot;attr() 方法&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>bootstrap.attr(AttributeKey.newInstance(&quot;clientName&quot;), &quot;nettyClient&quot;)</span></span></code></pre></div><p><code>attr()</code> 方法可以给客户端 Channel，也就是<code>NioSocketChannel</code>绑定自定义属性，然后我们可以通过<code>channel.attr()</code>取出这个属性，比如，上面的代码我们指定我们客户端 Channel 的一个<code>clientName</code>属性，属性值为<code>nettyClient</code>，其实说白了就是给<code>NioSocketChannel</code>维护一个 map 而已，后续在这个 <code>NioSocketChannel</code> 通过参数传来传去的时候，就可以通过他来取出设置的属性，非常方便。</p><h3 id="option-方法" tabindex="-1">option() 方法 <a class="header-anchor" href="#option-方法" aria-label="Permalink to &quot;option() 方法&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Bootstrap</span></span>
<span class="line"><span>        .option(ChannelOption.CONNECT_TIMEOUT_MILLIS, 5000)</span></span>
<span class="line"><span>        .option(ChannelOption.SO_KEEPALIVE, true)</span></span>
<span class="line"><span>        .option(ChannelOption.TCP_NODELAY, true)</span></span></code></pre></div><p><code>option()</code> 方法可以给连接设置一些 TCP 底层相关的属性，比如上面，我们设置了三种 TCP 属性，其中</p><ul><li><code>ChannelOption.CONNECT_TIMEOUT_MILLIS</code> 表示连接的超时时间，超过这个时间还是建立不上的话则代表连接失败</li><li><code>ChannelOption.SO_KEEPALIVE</code> 表示是否开启 TCP 底层心跳机制，true 为开启</li><li><code>ChannelOption.TCP_NODELAY</code> 表示是否开始 Nagle 算法，true 表示关闭，false 表示开启，通俗地说，如果要求高实时性，有数据发送时就马上发送，就设置为 true 关闭，如果需要减少发送次数减少网络交互，就设置为 false 开启</li></ul><p>其他的参数这里就不一一讲解，有兴趣的同学可以去这个类里面自行研究。</p><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><ul><li>本文中，我们首先学习了 Netty 客户端启动的流程，一句话来说就是：创建一个引导类，然后给他指定线程模型，IO 模型，连接读写处理逻辑，连接上特定主机和端口，客户端就启动起来了。</li><li>然后，我们学习到 <code>connect</code> 方法是异步的，我们可以通过这个异步回调机制来实现指数退避重连逻辑。</li><li>最后呢，我们讨论了 Netty 客户端启动额外的参数，主要包括给客户端 Channel 绑定自定义属性值，设置底层 TCP 参数。</li></ul><blockquote><p>本小节涉及到的源码已放置 <a href="https://github.com/lightningMan/flash-netty/tree/%E5%AE%A2%E6%88%B7%E7%AB%AF%E5%90%AF%E5%8A%A8%E6%B5%81%E7%A8%8B" target="_blank" rel="noreferrer">github仓库</a>，clone 到本地之后切换到本小节对应分支即可</p></blockquote><h2 id="思考题" tabindex="-1">思考题 <a class="header-anchor" href="#思考题" aria-label="Permalink to &quot;思考题&quot;">​</a></h2><p>与服务端启动相比，客户端启动的引导类少了哪些方法，为什么不需要这些方法？欢迎留言讨论。</p>`,37)]))}const b=a(t,[["render",o]]);export{h as __pageData,b as default};
