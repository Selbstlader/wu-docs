import{_ as s,c as n,o as a,a4 as p}from"./chunks/framework.DLF8A2I8.js";const b=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"Python/index.md","filePath":"Python/index.md"}'),l={name:"Python/index.md"},e=p(`<h2 id="变量" tabindex="-1">变量 <a class="header-anchor" href="#变量" aria-label="Permalink to &quot;变量&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>ints = 50</span></span>
<span class="line"><span>strs = &#39;string&#39;</span></span>
<span class="line"><span>floats = 13.14</span></span>
<span class="line"><span>true = True</span></span>
<span class="line"><span>false = False</span></span>
<span class="line"><span>null = None</span></span></code></pre></div><h2 id="数组" tabindex="-1">数组 <a class="header-anchor" href="#数组" aria-label="Permalink to &quot;数组&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>list = [0, 2, 3, 4, 10, 9, 49, 1]</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 前面加</span></span>
<span class="line"><span>list.append(100)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#指定位置加</span></span>
<span class="line"><span>list.insert(0, 100)</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 删除最后一个</span></span>
<span class="line"><span>list.remove(100)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#指定删除</span></span>
<span class="line"><span>list.pop(5)</span></span></code></pre></div><h2 id="对象" tabindex="-1">对象 <a class="header-anchor" href="#对象" aria-label="Permalink to &quot;对象&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>obj = {</span></span>
<span class="line"><span>    &quot;Python&quot;: 100,</span></span>
<span class="line"><span>    &quot;Java&quot;: 88,</span></span>
<span class="line"><span>    &quot;C++&quot;: 60,</span></span>
<span class="line"><span>    &quot;JavaScript&quot;: 70</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>print(obj[&#39;Python&#39;])</span></span></code></pre></div><h2 id="函数" tabindex="-1">函数 <a class="header-anchor" href="#函数" aria-label="Permalink to &quot;函数&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>def Fun(dog):</span></span>
<span class="line"><span>    if dog == &#39;米侯&#39;:</span></span>
<span class="line"><span>        print(&#39;米猴&#39;)</span></span>
<span class="line"><span>    elif dog == &#39;higou&#39;:</span></span>
<span class="line"><span>        print(&#39;海狗&#39;)</span></span>
<span class="line"><span>Fun(&#39;higou&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Python中的函数传值主要涉及以下几种类型或方式</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 位置参数（Positional Arguments）</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 这是最基本的参数传递方式，函数调用时按照参数在函数定义时的位置顺序一一对应地传递值。例如</span></span>
<span class="line"><span></span></span>
<span class="line"><span>def func(a, b):</span></span>
<span class="line"><span>    print(a, b)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func(1, 2)  # 此处1对应a，2对应b</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 默认值参数（Default Arguments）</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 某些参数可以被赋予默认值，这样在调用函数时，如果没有为这些参数提供值，它们就会采用定义时的默认值。例如</span></span>
<span class="line"><span></span></span>
<span class="line"><span>def func(a, b=10):</span></span>
<span class="line"><span>    print(a, b)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func(1)  # 输出: 1 10，因为b有默认值，所以可以不传</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 命名参数/关键字参数（Keyword Arguments）</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 调用函数时，可以通过参数名明确指定参数值，不必遵循定义时的顺序。例如</span></span>
<span class="line"><span></span></span>
<span class="line"><span>def func(a, b):</span></span>
<span class="line"><span>    print(a, b)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func(b=2, a=1)  # 参数顺序可以与定义时不同</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 可变位置参数（Variable-Length Positional Arguments）</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 使用*args收集额外的位置参数，允许传入任意数量的位置参数。例如</span></span>
<span class="line"><span></span></span>
<span class="line"><span>def func(*args):</span></span>
<span class="line"><span>    for arg in args:</span></span>
<span class="line"><span>        print(arg)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func(1, 2, 3)  # 输出: 1 2 3</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 可变关键字参数（Variable-Length Keyword Arguments）</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 使用**kwargs收集额外的关键字参数，允许传入任意数量的关键字参数。例如</span></span>
<span class="line"><span></span></span>
<span class="line"><span>def func(**kwargs):</span></span>
<span class="line"><span>    for key, value in kwargs.items():</span></span>
<span class="line"><span>        print(key, value)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func(a=1, b=2)  # 输出: a 1, b 2</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 强制命名参数（Required Keyword-Only Arguments）</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 当参数前有*时，之后的所有参数都必须以关键字形式传递，即使它们有默认值。例如</span></span>
<span class="line"><span></span></span>
<span class="line"><span>def func(*, a=1, b=2):  #* 后的参数只能作为关键字参数</span></span>
<span class="line"><span>    print(a, b)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func(a=3, b=4)  # 必须使用关键字传参</span></span></code></pre></div>`,8),i=[e];function c(t,o,r,d,u,h){return a(),n("div",null,i)}const f=s(l,[["render",c]]);export{b as __pageData,f as default};
