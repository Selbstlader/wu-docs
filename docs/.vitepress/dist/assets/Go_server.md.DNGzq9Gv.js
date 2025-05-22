import{_ as s,c as a,o as p,ag as e}from"./chunks/framework.CPUF7_g-.js";const l="/wu-docs/assets/goServer.25YN8DeD.png",m=JSON.parse('{"title":"微服务特点","description":"","frontmatter":{},"headers":[],"relativePath":"Go/server.md","filePath":"Go/server.md"}'),t={name:"Go/server.md"};function i(c,n,r,o,u,d){return p(),a("div",null,n[0]||(n[0]=[e('<h2 id="微服务架构" tabindex="-1">微服务架构 <a class="header-anchor" href="#微服务架构" aria-label="Permalink to &quot;微服务架构&quot;">​</a></h2><h1 id="微服务特点" tabindex="-1">微服务特点 <a class="header-anchor" href="#微服务特点" aria-label="Permalink to &quot;微服务特点&quot;">​</a></h1><p>优势 独立性 技术灵活 高效团队</p><p>缺点 服务拆分 增加额外的工作 <img src="'+l+`" alt="Alternative text" title="optional title"></p><h2 id="rpc" tabindex="-1">RPC <a class="header-anchor" href="#rpc" aria-label="Permalink to &quot;RPC&quot;">​</a></h2><p>服务端 server.go</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>package main</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import (</span></span>
<span class="line"><span>	&quot;log&quot;</span></span>
<span class="line"><span>	&quot;net/http&quot;</span></span>
<span class="line"><span>	&quot;net/rpc&quot;</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 变量声明</span></span>
<span class="line"><span>type Rect struct {</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>type Params struct {</span></span>
<span class="line"><span>	Width  int</span></span>
<span class="line"><span>	Height int</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 定义求矩形的面积的方法 nil</span></span>
<span class="line"><span>func (r *Rect) Area(p Params, ret *int) error {</span></span>
<span class="line"><span>	*ret = p.Width * p.Height</span></span>
<span class="line"><span>	return nil</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 定义求矩形的周长的方法 返回nil</span></span>
<span class="line"><span>func (r *Rect) Perimeter(p Params, ret *int) error {</span></span>
<span class="line"><span>	*ret = 2 * (p.Width + p.Height)</span></span>
<span class="line"><span>	return nil</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func main() {</span></span>
<span class="line"><span>	// 创建一个Rect对象</span></span>
<span class="line"><span>	rect := new(Rect)</span></span>
<span class="line"><span>	// 注册rect对象</span></span>
<span class="line"><span>	rpc.Register(rect)</span></span>
<span class="line"><span>	// 把服务处理绑定在http上</span></span>
<span class="line"><span>	rpc.HandleHTTP()</span></span>
<span class="line"><span>	// 监听服务</span></span>
<span class="line"><span>	err := http.ListenAndServe(&quot;:8080&quot;, nil)</span></span>
<span class="line"><span>  // 结果记录</span></span>
<span class="line"><span>	log.Println(err)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre></div><p>业务层 client.go</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>package main</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import (</span></span>
<span class="line"><span>	&quot;fmt&quot;</span></span>
<span class="line"><span>	&quot;log&quot;</span></span>
<span class="line"><span>	&quot;net/rpc&quot;</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>type Params struct {</span></span>
<span class="line"><span>	Width  int</span></span>
<span class="line"><span>	Height int</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func main() {</span></span>
<span class="line"><span>	// 连接远程服务</span></span>
<span class="line"><span>	rp, err := rpc.DialHTTP(&quot;tcp&quot;, &quot;localhost:1234&quot;)</span></span>
<span class="line"><span>	if err != nil {</span></span>
<span class="line"><span>		log.Fatal(err)</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	// 调用远程方法</span></span>
<span class="line"><span>	// 定义接受服务端传回来的计算结构的变量</span></span>
<span class="line"><span>	var ret int</span></span>
<span class="line"><span>	err2 := rp.Call(&quot;Rect.Area&quot;, Params{50, 100}, &amp;ret)</span></span>
<span class="line"><span>	if err2 != nil {</span></span>
<span class="line"><span>		log.Fatal(err2)</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	fmt.Println(ret)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// 求周长的数据main</span></span>
<span class="line"><span>	err3 := rp.Call(&quot;Rect.Perimeter&quot;, Params{50, 100}, &amp;ret)</span></span>
<span class="line"><span>	if err3 != nil {</span></span>
<span class="line"><span>		log.Fatal(err3)</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	fmt.Println(ret)</span></span>
<span class="line"><span>  }</span></span></code></pre></div>`,9)]))}const g=s(t,[["render",i]]);export{m as __pageData,g as default};
