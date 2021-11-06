<article class="Post-Main Post-NormalMain" tabindex="-1">
  <div class="Post-RichTextContainer">
    <div class="css-1yuhvjn">
      <div class="RichText ztext Post-RichText css-hnrfcf" options="[object Object]">
        <p><b>​前言</b></p>
        <p>Prototype 是 JavaScript 里的一个基础概念，原本应该很容易理解。然而，出于各种原因，大部分前端开发者（包括我），在刚开始学习 JS 时，原型和原型链都是一个需要克服的困难。</p>
        <p>不知道你是否也曾经被下面这种连线图，绕晕过：</p>
        <p class="ztext-empty-paragraph"><br></p>
        <figure data-size="normal"><noscript><img src="https://pic3.zhimg.com/v2-bfa564d76444f44533069cd0df8f2caa_b.jpg"
              data-caption="" data-size="normal" data-rawwidth="1080" data-rawheight="1344"
              class="origin_image zh-lightbox-thumb" width="1080"
              data-original="https://pic3.zhimg.com/v2-bfa564d76444f44533069cd0df8f2caa_r.jpg" /></noscript><img
            src="https://pic3.zhimg.com/80/v2-bfa564d76444f44533069cd0df8f2caa_1440w.jpg" data-caption=""
            data-size="normal" data-rawwidth="1080" data-rawheight="1344" class="origin_image zh-lightbox-thumb lazy"
            width="1080" data-original="https://pic3.zhimg.com/v2-bfa564d76444f44533069cd0df8f2caa_r.jpg"
            data-actualsrc="https://pic3.zhimg.com/v2-bfa564d76444f44533069cd0df8f2caa_b.jpg" data-lazy-status="ok">
        </figure>
        <p class="ztext-empty-paragraph"><br></p>
        <p>其实看不懂上图也没关系，请不必自责，这不是你跟我的问题。尽管上图并没有画错。</p>
        <p>只能说，在我理解 JS 原型之后，我对 JS 原型的想象图景（心智模型），跟图中的并不一样。我可以用我掌握的知识，检验它有没有画错。但若说它能促进我对 JS 原型的理解，却也谈不上。</p>
        <p>JS 原型其实是一个具有复杂背景的简单事物。</p>
        <p>大部分讲 JS 原型的文章，总体来说，内容都太简单了，形式上却搞得很复杂（各种连线）。对它的复杂背景也缺乏叙述。以至于对于读者来说，JS 原型仿佛是一个凭空出现的，需要强行理解的概念。</p>
        <p>这篇文章想做另一个尝试，揭露 JS 原型背后的复杂背景，以及它自身的简单性。让大家可以在一个更宏观的角度，审视 JS 原型。希望能帮助到部分读者。</p>
        <p><b>1、ES2019 规范里描述的 Prototype</b></p>
        <p><a href="https://link.zhihu.com/?target=https%3A//www.ecma-international.org/ecma-262/10.0"
            class=" wrap external" target="_blank" rel="nofollow noreferrer" data-za-detail-view-id="1043">ES2019</a>
          是当前最新的语言规范，可以作为我们理解 JS 原型的权威素材来源。</p>
        <p>我们先从规范开始，看看里面如何介绍 Prototype。</p>
        <p><b>1.1、prototype 的定义</b></p>
        <blockquote>4.3.5 prototype <br><br>object that provides shared properties for other objects</blockquote>
        <p><b>在规范里，prototype 被定义为：给其它对象提供共享属性的对象。</b></p>
        <p><b>也就是说，prototype 自己也是对象，只是被用以承担某个职能罢了。</b></p>
        <p>给定所有对象，我们当然可以为不同对象分配不同职能，然后给予不同称谓。</p>
        <p>prototype 只是其中一种划分，我们也可以根据自己的需要，做出自己的划分和命名。</p>
        <p>比如实现 pubsub pattern 订阅/发布模式时，我们将某个对象称之为 subscriber 订阅者，另一个对象称之为 publisher 发布者。</p>
        <p>并非因为 subscriber 对象有跟其它对象有什么本质的不同，只是一个约定。</p>
        <p><b>同理，当某个对象，承担了为其它对象提供共享属性的职责时，它就成了该对象的 prototype。当它失去这个职能（比如子对象的原型被设置为其它对象），它就不叫该对象的 prototype。</b></p>
        <p><b>换句话说，当我们说 prototype 对象时，是在做一个简略描述，实际上说的是 “xxx 对象的 prototype 对象”。如果不跟其它对象产生关联，就不构成 prototype 这个称谓。</b></p>
        <p>因此，prototype 描述的是两个对象之间的某种关系（其中一个，为另一个提供属性访问权限）。它是类似 father 父亲一样的称谓，而不是具有超能力的异常对象。</p>
        <p>所有对象，都可以作为另一个对象的 prototype 来用。</p>
        <p>那么，一个对象，具体如何为另一个对象提供属性访问呢？</p>
        <p><b>1.1.1、所有 object 对象都有一个隐式引用</b></p>
        <blockquote>Every object has an implicit reference (called the object's prototype)</blockquote>
        <p>规范中明确描述了所有对象，都有一个隐式引用，它被称之为这个对象的 prototype 原型。</p>
        <p>什么叫隐式引用？</p>
        <figure data-size="normal"><noscript><img src="https://pic2.zhimg.com/v2-ef829a2a66ead946af331470c7ba9c21_b.jpg"
              data-caption="" data-size="normal" data-rawwidth="367" data-rawheight="354" class="content_image"
              width="367" /></noscript><img
            src="https://pic2.zhimg.com/80/v2-ef829a2a66ead946af331470c7ba9c21_1440w.jpg" data-caption=""
            data-size="normal" data-rawwidth="367" data-rawheight="354" class="content_image lazy" width="367"
            data-actualsrc="https://pic2.zhimg.com/v2-ef829a2a66ead946af331470c7ba9c21_b.jpg" data-lazy-status="ok">
        </figure>
        <p>如上图所示，在我们编写的代码里，只声明了 obj 对象的 a 和 b 两个属性。</p>
        <p>在控制台却可以发现它有 __proto__ 属性，这意味着 obj 被隐式地挂载了另一个对象的引用，置于 __proto__ 属性中。</p>
        <p>也就是说，所谓的隐式，是指不是由开发者(你和我)亲自创建/操作。</p>
        <p><b>1.1.2、历史问题：__proto__ </b></p>
        <p>前面我的措辞是“隐式地挂载引用”，这跟规范里描述的“隐式引用”，有一定的差别。</p>
        <p>它们是两个维度。</p>
        <p>一个是在操作层面上的隐式：是否偷偷做了挂载属性的动作。</p>
        <p>一个是在关系层面上的隐式：这个属性能不能被直接访问。</p>
        <p>__proto__ 的例子，说起来比较复杂，可以说是一个历史问题。</p>
        <p>ECMAScript 规范描述 prototype 是一个隐式引用，但之前的一些浏览器，已经私自实现了 __proto__ 这个属性，使得可以通过 obj.__proto__
          这个显式的属性访问，访问到被定义为隐式属性的 prototype。</p>
        <p>其中的关系类似于，A 跟 B 说了一个秘密，要求 B 保密，但 B 大嘴巴，四处散播 A 的秘密。最后 A 的秘密，在事实上已经不是一个秘密了。到底 A 的秘密，还能不能叫秘密？</p>
        <figure data-size="normal"><noscript><img src="https://pic2.zhimg.com/v2-525aca0c99b5f53ffd9fd8b9e24792fd_b.jpg"
              data-caption="" data-size="normal" data-rawwidth="360" data-rawheight="277" class="content_image"
              width="360" /></noscript><img
            src="https://pic2.zhimg.com/80/v2-525aca0c99b5f53ffd9fd8b9e24792fd_1440w.jpg" data-caption=""
            data-size="normal" data-rawwidth="360" data-rawheight="277" class="content_image lazy" width="360"
            data-actualsrc="https://pic2.zhimg.com/v2-525aca0c99b5f53ffd9fd8b9e24792fd_b.jpg" data-lazy-status="ok">
        </figure>
        <p>因此，情况是这样的，ECMAScript 规范说 prototype 应当是一个隐式引用:</p>
        <p>1）通过 Object.getPrototypeOf(obj) 间接访问指定对象的 prototype 对象。</p>
        <p>2）通过 Object.setPrototypeOf(obj, anotherObj) 间接设置指定对象的 prototype 对象。</p>
        <p>3）部分浏览器提前开了 __proto__ 的口子，使得可以通过 obj.__proto__ 直接访问原型，通过 obj.__proto__ = anotherObj 直接设置原型。</p>
        <p>4）ECMAScript 2015 规范只好向事实低头，将 __proto__ 属性纳入了规范的一部分。</p>
        <figure data-size="normal"><noscript><img src="https://pic3.zhimg.com/v2-84aa5b5f553bb19d093aa8fa0af1a452_b.jpg"
              data-caption="" data-size="normal" data-rawwidth="883" data-rawheight="624"
              class="origin_image zh-lightbox-thumb" width="883"
              data-original="https://pic3.zhimg.com/v2-84aa5b5f553bb19d093aa8fa0af1a452_r.jpg" /></noscript><img
            src="https://pic3.zhimg.com/80/v2-84aa5b5f553bb19d093aa8fa0af1a452_1440w.jpg" data-caption=""
            data-size="normal" data-rawwidth="883" data-rawheight="624" class="origin_image zh-lightbox-thumb lazy"
            width="883" data-original="https://pic3.zhimg.com/v2-84aa5b5f553bb19d093aa8fa0af1a452_r.jpg"
            data-actualsrc="https://pic3.zhimg.com/v2-84aa5b5f553bb19d093aa8fa0af1a452_b.jpg" data-lazy-status="ok">
        </figure>
        <p>在 Object.prototype 上有 __proto__ 属性，它是一个 accessor property，在 get 方法里调用 getPrototypeOf，在 set 方法里调用
          setPrototypeOf。如此，可以让之前浏览器的不规范做法，作为规范的特殊场景。</p>
        <p>像这种访问器属性，如果我们愿意，也随时可以实现出来：</p>
        <figure data-size="normal"><noscript><img src="https://pic2.zhimg.com/v2-98c4bcb9f3d0cecc709cfea3dd2800c1_b.jpg"
              data-caption="" data-size="normal" data-rawwidth="332" data-rawheight="173" class="content_image"
              width="332" /></noscript><img
            src="https://pic2.zhimg.com/80/v2-98c4bcb9f3d0cecc709cfea3dd2800c1_1440w.jpg" data-caption=""
            data-size="normal" data-rawwidth="332" data-rawheight="173" class="content_image lazy" width="332"
            data-actualsrc="https://pic2.zhimg.com/v2-98c4bcb9f3d0cecc709cfea3dd2800c1_b.jpg" data-lazy-status="ok">
        </figure>
        <p>如上，我们也基于 getter/setter 和 getPrototyoeOf/setPrototyoeOf，封装了一个指向对象 prototype 的属性。为了表明这种做法的任意性，我随意选择了 a 作为属性名。
        </p>
        <p>此外，规范里还表明了另一个事实：</p>
        <figure data-size="normal"><noscript><img src="https://pic4.zhimg.com/v2-e653e829240404cf07201ddf1095e0ef_b.jpg"
              data-caption="" data-size="normal" data-rawwidth="361" data-rawheight="263" class="content_image"
              width="361" /></noscript><img
            src="https://pic4.zhimg.com/80/v2-e653e829240404cf07201ddf1095e0ef_1440w.jpg" data-caption=""
            data-size="normal" data-rawwidth="361" data-rawheight="263" class="content_image lazy" width="361"
            data-actualsrc="https://pic4.zhimg.com/v2-e653e829240404cf07201ddf1095e0ef_b.jpg" data-lazy-status="ok">
        </figure>
        <p>表面上看，上图的对象里存在一个 __proto__ 属性。实际上，它只是开发者工具为了方便让开发者查看原型，故意渲染出来的虚拟节点。虽然跟对象的其它属性并列，但并不在该对象中。</p>
        <p>__proto__ 属性既不能被 for in 遍历出来，也不能被 Object.keys(obj) 查找出来。</p>
        <p>访问对象的 obj.__proto__ 属性，默认走的是 Object.prototype 对象上 __proto__ 属性的 get/set 方法。</p>
        <figure data-size="normal"><noscript><img src="https://pic4.zhimg.com/v2-51ef6ce4c3c7228c77d5febf597c0cb3_b.jpg"
              data-caption="" data-size="normal" data-rawwidth="375" data-rawheight="139" class="content_image"
              width="375" /></noscript><img
            src="https://pic4.zhimg.com/80/v2-51ef6ce4c3c7228c77d5febf597c0cb3_1440w.jpg" data-caption=""
            data-size="normal" data-rawwidth="375" data-rawheight="139" class="content_image lazy" width="375"
            data-actualsrc="https://pic4.zhimg.com/v2-51ef6ce4c3c7228c77d5febf597c0cb3_b.jpg" data-lazy-status="ok">
        </figure>
        <p>通过覆盖 Object.prototype.__proto__ 我们可以看到，访问普通对象的 __proto__ 触发了 Object.prototype 上的 __proto__ 的 get 方法。</p>
        <p>因此，普通对象创建时，只需要将它内部的隐式引用指向 Object.prototype 对象，就能兼容 __proto__ 属性访问行为，不需要将原型隐式挂载到对象的 __proto__ 属性。</p>
        <p><br><b>1.1.3、prototype chain 原型链</b></p>
        <blockquote>a prototype may have a non-null implicit reference to its prototype, and so on; this is called the
          <i>prototype chain</i>.</blockquote>
        <p>如上，在 ECMAScript 2019 规范里，只通过短短的一句话，就介绍完了 prototype chain。</p>
        <p>原型链的概念，仅仅是在原型这个概念基础上所作的直接推论。</p>
        <p>既然 prototype 只是恰好作为另一个对象的隐式引用的普通对象。那么，它也是对象，也符合一个对象的基本特征。</p>
        <p>也就是说，prototype 对象也有自己的隐式引用，有自己的 prototype 对象。</p>
        <p>如此，构成了对象的原型的原型的原型的链条，直到某个对象的隐式引用为 null，整个链条终止。</p>
        <p><b>1.1.4、属性查找路径</b></p>
        <p>我们做一个 role playing 角色扮演，假设 JS 是我们的产品。</p>
        <p>我们的产品经理给了 PRD，描述了需求是：prototype 原型的职能，是为其它对象提供共享的属性访问。</p>
        <p>我们的架构师设计了一个方案：所有对象创建时，包含一个隐式引用，它就是该对象的原型。</p>
        <p>需求跟方案不是代码，它们跑不起来。</p>
        <p>需要我们的工程师将方案翻译成代码，落地。</p>
        <p>他们实现了一个属性访问的查找路径算法：</p>
        <p>1）将 current 设置为 obj</p>
        <p>2）检查 current 自身是否包含 name 属性，如果包含，则返回该值</p>
        <p>3）将 current 设置为 obj 的隐式引用（即 prototype 对象）</p>
        <p>4）若 current 为 null，返回 undefined</p>
        <p>5） 否则回到步骤 2</p>
        <p>JS 代码模拟如下：</p>
        <figure data-size="normal"><noscript><img src="https://pic3.zhimg.com/v2-e94d6292e1fba9861659799f3e4144a6_b.jpg"
              data-caption="" data-size="normal" data-rawwidth="577" data-rawheight="281"
              class="origin_image zh-lightbox-thumb" width="577"
              data-original="https://pic3.zhimg.com/v2-e94d6292e1fba9861659799f3e4144a6_r.jpg" /></noscript><img
            src="https://pic3.zhimg.com/80/v2-e94d6292e1fba9861659799f3e4144a6_1440w.jpg" data-caption=""
            data-size="normal" data-rawwidth="577" data-rawheight="281" class="origin_image zh-lightbox-thumb lazy"
            width="577" data-original="https://pic3.zhimg.com/v2-e94d6292e1fba9861659799f3e4144a6_r.jpg"
            data-actualsrc="https://pic3.zhimg.com/v2-e94d6292e1fba9861659799f3e4144a6_b.jpg" data-lazy-status="ok">
        </figure>
        <p>通过这个查找属性算法，我们只需要将同个对象，设置为多个其它对象的原型，就能实现共享属性的功能了。</p>
        <p>每次都要求开发者手动调用 lookupProperty 函数去访问自身属性+共享属性，显然是不现实的。</p>
        <p>我们的产品经理要求优化用户体验，不要让用户亲自调用，在后台默默服务好就可以了。</p>
        <p>我们的架构师根据新的需求提出方案：修改 obj.name 和 obj[name] 这个语句的行为，将 obj 和 name 作为参数传入 lookupProperty(obj, name)。</p>
        <p>如此，用户以为自己在访问对象的属性，其实它是在整条原型链上查找。只是大部分情况下，恰好原型链上的第一个对象就包含该属性罢了。</p>
        <p>用户以为自己在操作一个对象，哈哈。其实他们在操作由隐式引用关联起来的多个对象。</p>
        <p><b>1.2、对象的创建和关联原型</b></p>
        <p>许多介绍 JS 原型的文章，都从 constructor 构造函数和 prototype 入手。本文并没有这样做。</p>
        <p>因为 prototype 的概念，跟对象的构造方式和原型关联方式，其实是两个问题。</p>
        <p>JavaScript 只是其中一个 prototype-based inheritance 的语言，其它同样包含 prototype 概念的语言，并不像 JS 那样通过 constructor 和 prototype
          构造对象和关联其原型。</p>
        <p>因此，当我们谈论 prototype 时，它可以跟 constructor 和 constructor.prototype 无关。</p>
        <p><b>1.2.1、两类原型继承方式</b></p>
        <p>所谓的原型继承，就是指设置某个对象为另一个对象的原型（塞进该对象的隐式引用位置）。</p>
        <p>在 JavaScript 中，有两类原型继承的方式：显式继承和隐式继承。</p>
        <p><b>1.2.1.1、显式原型继承</b></p>
        <p>在前文我们曾描述过显式跟隐式的差别：是否由开发者亲自操作。</p>
        <p>所谓的显式原型继承，就是指我们亲自将某个对象设置为另一个对象的原型。</p>
        <figure data-size="normal"><noscript><img src="https://pic4.zhimg.com/v2-c50762625518620f8e000f36471fe86f_b.jpg"
              data-caption="" data-size="normal" data-rawwidth="475" data-rawheight="303"
              class="origin_image zh-lightbox-thumb" width="475"
              data-original="https://pic4.zhimg.com/v2-c50762625518620f8e000f36471fe86f_r.jpg" /></noscript><img
            src="https://pic4.zhimg.com/80/v2-c50762625518620f8e000f36471fe86f_1440w.jpg" data-caption=""
            data-size="normal" data-rawwidth="475" data-rawheight="303" class="origin_image zh-lightbox-thumb lazy"
            width="475" data-original="https://pic4.zhimg.com/v2-c50762625518620f8e000f36471fe86f_r.jpg"
            data-actualsrc="https://pic4.zhimg.com/v2-c50762625518620f8e000f36471fe86f_b.jpg" data-lazy-status="ok">
        </figure>
        <p>如上，通过调用 Object.setPrototypeOf 方法，我们将 obj_a 设置为 obj_b 的原型。访问 obj_b.a 时，lookupProperty 过程，先检查 obj_b 是否有 a
          属性，没有就检查其原型 obj_a，可以找到 obj_a.a，最后返回 1。</p>
        <figure data-size="normal"><noscript><img src="https://pic4.zhimg.com/v2-1b54d82fa0956bd6cadb37c972f30997_b.jpg"
              data-caption="" data-size="normal" data-rawwidth="441" data-rawheight="234"
              class="origin_image zh-lightbox-thumb" width="441"
              data-original="https://pic4.zhimg.com/v2-1b54d82fa0956bd6cadb37c972f30997_r.jpg" /></noscript><img
            src="https://pic4.zhimg.com/80/v2-1b54d82fa0956bd6cadb37c972f30997_1440w.jpg" data-caption=""
            data-size="normal" data-rawwidth="441" data-rawheight="234" class="origin_image zh-lightbox-thumb lazy"
            width="441" data-original="https://pic4.zhimg.com/v2-1b54d82fa0956bd6cadb37c972f30997_r.jpg"
            data-actualsrc="https://pic4.zhimg.com/v2-1b54d82fa0956bd6cadb37c972f30997_b.jpg" data-lazy-status="ok">
        </figure>
        <p>除了 Object.setPrototypeOf 方法以外，还有另一种途径。即是通过 Object.create 方法，直接继承另一个对象。</p>
        <p>Object.setPropertyOf 和 Object.create 的差别在于：</p>
        <p>1）Object.setPropertyOf，给我两个对象，我把其中一个设置为另一个的原型。</p>
        <p>2）Object.create，给我一个对象，它将作为我创建的新对象的原型。</p>
        <p>当我们已经拥有两个对象时，要构建原型关联，可以通过 Object.setPrototypeOf 来处理。</p>
        <p>当我们只有一个对象，想以它为原型，创建新对象，则通过 Object.create 来处理。</p>
        <figure data-size="normal"><noscript><img src="https://pic2.zhimg.com/v2-3affd34ce2eca9b2886ca09107c1c99d_b.jpg"
              data-caption="" data-size="normal" data-rawwidth="485" data-rawheight="761"
              class="origin_image zh-lightbox-thumb" width="485"
              data-original="https://pic2.zhimg.com/v2-3affd34ce2eca9b2886ca09107c1c99d_r.jpg" /></noscript><img
            src="https://pic2.zhimg.com/80/v2-3affd34ce2eca9b2886ca09107c1c99d_1440w.jpg" data-caption=""
            data-size="normal" data-rawwidth="485" data-rawheight="761" class="origin_image zh-lightbox-thumb lazy"
            width="485" data-original="https://pic2.zhimg.com/v2-3affd34ce2eca9b2886ca09107c1c99d_r.jpg"
            data-actualsrc="https://pic2.zhimg.com/v2-3affd34ce2eca9b2886ca09107c1c99d_b.jpg" data-lazy-status="ok">
        </figure>
        <p>如上图所示，我们先创建好 6 个对象 a, b, c, d, e 和 f，然后用 Object.setPrototypeOf 将它们依次关联起来，最后用 Object.create 基于 f 创建新对象。</p>
        <p>从控制台可以看到，第一层是一个空对象，第二层则是 f，f 的原型是 e，e 的原型是 d，依次类推，最后兜底的原型是 Object.prototype。</p>
        <p><b>1.2.1.2 隐式原型继承</b></p>
        <p>JavaScript 提供了隐式的原型继承方式，在讨论它之前，我们先把事情描述的更细致一些。</p>
        <p>想要得到一个包含了数据、方法以及关联原型三个组成部分的丰满对象，一个相对具体的步骤如下：</p>
        <p>1）创建空对象</p>
        <p>2）设置该空对象的原型为另一个对象或者 null</p>
        <p>3）填充该对象，增加属性或方法。</p>
        <p>假设没有隐式原型继承，创建一个普通的 js 对象，要向下面这样：</p>
        <figure data-size="normal"><noscript><img src="https://pic2.zhimg.com/v2-3e5791f6c3505aceee10ab9977f5ff05_b.jpg"
              data-caption="" data-size="normal" data-rawwidth="539" data-rawheight="428"
              class="origin_image zh-lightbox-thumb" width="539"
              data-original="https://pic2.zhimg.com/v2-3e5791f6c3505aceee10ab9977f5ff05_r.jpg" /></noscript><img
            src="https://pic2.zhimg.com/80/v2-3e5791f6c3505aceee10ab9977f5ff05_1440w.jpg" data-caption=""
            data-size="normal" data-rawwidth="539" data-rawheight="428" class="origin_image zh-lightbox-thumb lazy"
            width="539" data-original="https://pic2.zhimg.com/v2-3e5791f6c3505aceee10ab9977f5ff05_r.jpg"
            data-actualsrc="https://pic2.zhimg.com/v2-3e5791f6c3505aceee10ab9977f5ff05_b.jpg" data-lazy-status="ok">
        </figure>
        <p>看起来比较繁琐。</p>
        <p>产品经理又发话了，要让用户无感知的完成创建对象、原型继承和属性初始化的过程。</p>
        <p>架构师想了一下，设计了一个方案：</p>
        <p>1）我们将某些函数称之为 constructor，专门用来做属性初始化。</p>
        <figure data-size="normal"><noscript><img src="https://pic3.zhimg.com/v2-2777f5b8fd2c6d9e333aee105757bff6_b.jpg"
              data-caption="" data-size="normal" data-rawwidth="339" data-rawheight="110" class="content_image"
              width="339" /></noscript><img
            src="https://pic3.zhimg.com/80/v2-2777f5b8fd2c6d9e333aee105757bff6_1440w.jpg" data-caption=""
            data-size="normal" data-rawwidth="339" data-rawheight="110" class="content_image lazy" width="339"
            data-actualsrc="https://pic3.zhimg.com/v2-2777f5b8fd2c6d9e333aee105757bff6_b.jpg" data-lazy-status="ok">
        </figure>
        <p>2）我们约定，constructor 函数，有一个特殊属性 prototype</p>
        <figure data-size="normal"><noscript><img src="https://pic1.zhimg.com/v2-7ad0e2b381d1dcb2eccf7d5f230a56f8_b.png"
              data-caption="" data-size="normal" data-rawwidth="437" data-rawheight="47"
              class="origin_image zh-lightbox-thumb" width="437"
              data-original="https://pic1.zhimg.com/v2-7ad0e2b381d1dcb2eccf7d5f230a56f8_r.jpg" /></noscript><img
            src="https://pic1.zhimg.com/80/v2-7ad0e2b381d1dcb2eccf7d5f230a56f8_1440w.png" data-caption=""
            data-size="normal" data-rawwidth="437" data-rawheight="47" class="origin_image zh-lightbox-thumb lazy"
            width="437" data-original="https://pic1.zhimg.com/v2-7ad0e2b381d1dcb2eccf7d5f230a56f8_r.jpg"
            data-actualsrc="https://pic1.zhimg.com/v2-7ad0e2b381d1dcb2eccf7d5f230a56f8_b.png" data-lazy-status="ok">
        </figure>
        <p>3）让用户使用 new 关键字，去创建新对象</p>
        <figure data-size="normal"><noscript><img src="https://pic4.zhimg.com/v2-62bb9e64027f3b39d21f6afa26a0f7a3_b.png"
              data-caption="" data-size="normal" data-rawwidth="337" data-rawheight="47" class="content_image"
              width="337" /></noscript><img
            src="https://pic4.zhimg.com/80/v2-62bb9e64027f3b39d21f6afa26a0f7a3_1440w.png" data-caption=""
            data-size="normal" data-rawwidth="337" data-rawheight="47" class="content_image lazy" width="337"
            data-actualsrc="https://pic4.zhimg.com/v2-62bb9e64027f3b39d21f6afa26a0f7a3_b.png" data-lazy-status="ok">
        </figure>
        <p>4）在内部，我们偷偷做创建对象，关联原型和属性初始化等一系列过程。</p>
        <figure data-size="normal"><noscript><img src="https://pic3.zhimg.com/v2-59d12911f04395dacd7d32c2fad7e536_b.jpg"
              data-caption="" data-size="normal" data-rawwidth="634" data-rawheight="377"
              class="origin_image zh-lightbox-thumb" width="634"
              data-original="https://pic3.zhimg.com/v2-59d12911f04395dacd7d32c2fad7e536_r.jpg" /></noscript><img
            src="https://pic3.zhimg.com/80/v2-59d12911f04395dacd7d32c2fad7e536_1440w.jpg" data-caption=""
            data-size="normal" data-rawwidth="634" data-rawheight="377" class="origin_image zh-lightbox-thumb lazy"
            width="634" data-original="https://pic3.zhimg.com/v2-59d12911f04395dacd7d32c2fad7e536_r.jpg"
            data-actualsrc="https://pic3.zhimg.com/v2-59d12911f04395dacd7d32c2fad7e536_b.jpg" data-lazy-status="ok">
        </figure>
        <p>用户能拿到跟自己手动创建一样的结果，但从 3 件事情，减少到了 2 件。他们不用亲自创建空对象了。</p>
        <p>产品经理又表示，用户最好只做一件事情，这样就完美了。</p>
        <p>架构师说，好吧，我让所有函数，都有 prototype 属性，它默认是以 Object.prototype 为原型的对象。</p>
        <p>这样用户通常只需要编写 constructor 函数，描述如何初始化对象的属性即可。除非他们需要新增方法，否则都不必操作 constructor 的 prototype 对象。</p>
        <figure data-size="normal"><noscript><img src="https://pic4.zhimg.com/v2-efc9dd2b0dcd638bd42ead17726cd493_b.jpg"
              data-caption="" data-size="normal" data-rawwidth="300" data-rawheight="204" class="content_image"
              width="300" /></noscript><img
            src="https://pic4.zhimg.com/80/v2-efc9dd2b0dcd638bd42ead17726cd493_1440w.jpg" data-caption=""
            data-size="normal" data-rawwidth="300" data-rawheight="204" class="content_image lazy" width="300"
            data-actualsrc="https://pic4.zhimg.com/v2-efc9dd2b0dcd638bd42ead17726cd493_b.jpg" data-lazy-status="ok">
        </figure>
        <p>如上，普通函数创建时，自带了 prototype 属性，该属性是一个对象，包含 constructor 一个字段，指向构造函数。</p>
        <figure data-size="normal"><noscript><img src="https://pic1.zhimg.com/v2-62926af51491945c2706f5e2b3c9a838_b.jpg"
              data-caption="" data-size="normal" data-rawwidth="441" data-rawheight="259"
              class="origin_image zh-lightbox-thumb" width="441"
              data-original="https://pic1.zhimg.com/v2-62926af51491945c2706f5e2b3c9a838_r.jpg" /></noscript><img
            src="https://pic1.zhimg.com/80/v2-62926af51491945c2706f5e2b3c9a838_1440w.jpg" data-caption=""
            data-size="normal" data-rawwidth="441" data-rawheight="259" class="origin_image zh-lightbox-thumb lazy"
            width="441" data-original="https://pic1.zhimg.com/v2-62926af51491945c2706f5e2b3c9a838_r.jpg"
            data-actualsrc="https://pic1.zhimg.com/v2-62926af51491945c2706f5e2b3c9a838_b.jpg" data-lazy-status="ok">
        </figure>
        <p>我们的 User 定义，简化为一个 User 函数，通过 new 去创建 user 对象，可以通过 user.consturctor 访问到它的构造函数。</p>
        <p><b>1.2.2 内置的构造函数和语法糖</b></p>
        <p>JavaScript 的主流继承方式，选择了隐式原型继承，它提供了几个内置的 constructor 函数，如 Object, Array, Boolean, String, Number 等。</p>
        <figure data-size="normal"><noscript><img src="https://pic1.zhimg.com/v2-13496f57a4ee7e551f28b9943c88981c_b.jpg"
              data-caption="" data-size="normal" data-rawwidth="251" data-rawheight="147" class="content_image"
              width="251" /></noscript><img
            src="https://pic1.zhimg.com/80/v2-13496f57a4ee7e551f28b9943c88981c_1440w.jpg" data-caption=""
            data-size="normal" data-rawwidth="251" data-rawheight="147" class="content_image lazy" width="251"
            data-actualsrc="https://pic1.zhimg.com/v2-13496f57a4ee7e551f28b9943c88981c_b.jpg" data-lazy-status="ok">
        </figure>
        <p>向上面那样创建一个新对象时，按照隐式原型继承的规则，它先创建一个空对象，然后将 Object.prototype 对象设置为该空对象的原型，然后执行 Object 函数里的属性初始化。</p>
        <p>恰好，Object 函数没有增加任何属性，因此 user 是一个空对象，我们后续手动添加了 firstname 和 lastname 属性。</p>
        <p>按照之前一贯的思路，这种繁琐的方式，将被一个语法糖化简掉。</p>
        <figure data-size="normal"><noscript><img src="https://pic1.zhimg.com/v2-b7c13a15c045fee6ce025803a7f25b3c_b.jpg"
              data-caption="" data-size="normal" data-rawwidth="221" data-rawheight="114" class="content_image"
              width="221" /></noscript><img
            src="https://pic1.zhimg.com/80/v2-b7c13a15c045fee6ce025803a7f25b3c_1440w.jpg" data-caption=""
            data-size="normal" data-rawwidth="221" data-rawheight="114" class="content_image lazy" width="221"
            data-actualsrc="https://pic1.zhimg.com/v2-b7c13a15c045fee6ce025803a7f25b3c_b.jpg" data-lazy-status="ok">
        </figure>
        <p>如上，这种写法叫对象字面量。它等价于前面 new Object 再挂载属性的过程。</p>
        <p>并非所有语言都做这种等价转换，也就是说，对象字面量代表的行为，是可以不同的。</p>
        <p>完全可以让上面的 user，真的只包含 firstname 和 lastname 而跟 Object.prototype 无关。</p>
        <p>完全可以让 {} 空花括号，作为一个真正的空对象看待。</p>
        <figure data-size="normal"><noscript><img src="https://pic1.zhimg.com/v2-f93c017a75ef455edaef35e74aa03bec_b.jpg"
              data-caption="" data-size="normal" data-rawwidth="235" data-rawheight="40" class="content_image"
              width="235" /></noscript><img
            src="https://pic1.zhimg.com/80/v2-f93c017a75ef455edaef35e74aa03bec_1440w.jpg" data-caption=""
            data-size="normal" data-rawwidth="235" data-rawheight="40" class="content_image lazy" width="235"
            data-actualsrc="https://pic1.zhimg.com/v2-f93c017a75ef455edaef35e74aa03bec_b.jpg" data-lazy-status="ok">
        </figure>
        <p>同理，数组字面量，就是 new Array() 后再填充数据的语法糖。</p>
        <p>JS 原型背景的复杂性，在此可见一斑。</p>
        <p>当我们使用对象字面量创建一个新对象时，它有两层隐式行为。</p>
        <p>1）隐式的通过 new Object() 去创建对象</p>
        <p>2）隐式的进行原型继承</p>
        <p>一个简单的语句，也包含了许多复杂的过程。</p>
        <p>不仅如此，在名称的选择上，也没有特意去规避误解。</p>
        <p>constructor 是一个函数，而所有函数都是 new Function 创建出来的，函数字面量可以看作是它的语法糖。</p>
        <figure data-size="normal"><noscript><img src="https://pic4.zhimg.com/v2-900bd3a6110a6a7280d20c0b2adda9db_b.jpg"
              data-caption="" data-size="normal" data-rawwidth="522" data-rawheight="96"
              class="origin_image zh-lightbox-thumb" width="522"
              data-original="https://pic4.zhimg.com/v2-900bd3a6110a6a7280d20c0b2adda9db_r.jpg" /></noscript><img
            src="https://pic4.zhimg.com/80/v2-900bd3a6110a6a7280d20c0b2adda9db_1440w.jpg" data-caption=""
            data-size="normal" data-rawwidth="522" data-rawheight="96" class="origin_image zh-lightbox-thumb lazy"
            width="522" data-original="https://pic4.zhimg.com/v2-900bd3a6110a6a7280d20c0b2adda9db_r.jpg"
            data-actualsrc="https://pic4.zhimg.com/v2-900bd3a6110a6a7280d20c0b2adda9db_b.jpg" data-lazy-status="ok">
        </figure>
        <p>Function 在 ECMAScript 规范里，被定义为对象的一种。</p>
        <p>也就是说，函数也是对象，也有自己的隐式引用（原型）。但函数的 prototype 属性，却不是该函数对象的原型。</p>
        <p>而是基于前面介绍的隐式原型继承规则，作为原型，挂载到 new F() 创建出来的新对象内部。</p>
        <figure data-size="normal"><noscript><img src="https://pic4.zhimg.com/v2-f5e1527cc8a444368d2fd4fea951841b_b.jpg"
              data-caption="" data-size="normal" data-rawwidth="447" data-rawheight="304"
              class="origin_image zh-lightbox-thumb" width="447"
              data-original="https://pic4.zhimg.com/v2-f5e1527cc8a444368d2fd4fea951841b_r.jpg" /></noscript><img
            src="https://pic4.zhimg.com/80/v2-f5e1527cc8a444368d2fd4fea951841b_1440w.jpg" data-caption=""
            data-size="normal" data-rawwidth="447" data-rawheight="304" class="origin_image zh-lightbox-thumb lazy"
            width="447" data-original="https://pic4.zhimg.com/v2-f5e1527cc8a444368d2fd4fea951841b_r.jpg"
            data-actualsrc="https://pic4.zhimg.com/v2-f5e1527cc8a444368d2fd4fea951841b_b.jpg" data-lazy-status="ok">
        </figure>
        <p>我想任何刚接触的，心智正常的开发者，在控制台看到函数的 prototype 和 __proto__ 两个属性，都会感到困惑吧。</p>
        <p>可以说，JS 原型之所以难以理解，主要原因是设计上的问题，而非技术难度。</p>
        <p>如果将 constructor 函数的 prototype 改名为 properties。问题可能少很多。或者进一步简写成 props，理解上将更加简单。不就是 new Constructor 时，自带了它的
          Constructor.props 对象嘛。</p>
        <p><b>2、隐式原型继承和显式原型继承的互操作性</b></p>
        <p>不管是隐式原型继承，还是显式原型继承，只是外在形态，核心是具备设置对象的隐式引用的功能。它们之间具备一定互操作性，也就是说，拥有其中一个，可以实现另一个的部分行为。</p>
        <p><b>2.1、从隐式原型继承中剥离出 Object.create 方法</b></p>
        <p>如前所述，隐式原型继承，是将 create, linking, initilize 等多个步骤耦合到一起。我们可以做一些解耦动作。</p>
        <figure data-size="normal"><noscript><img src="https://pic2.zhimg.com/v2-b0fe7e095e9a2757b75df44d81ea7041_b.jpg"
              data-caption="" data-size="normal" data-rawwidth="296" data-rawheight="130" class="content_image"
              width="296" /></noscript><img
            src="https://pic2.zhimg.com/80/v2-b0fe7e095e9a2757b75df44d81ea7041_1440w.jpg" data-caption=""
            data-size="normal" data-rawwidth="296" data-rawheight="130" class="content_image lazy" width="296"
            data-actualsrc="https://pic2.zhimg.com/v2-b0fe7e095e9a2757b75df44d81ea7041_b.jpg" data-lazy-status="ok">
        </figure>
        <p>如上，我们实现了一个简单的 Object.create 方法，它可以根据给定对象，创建以该对象为原型的新对象（Object.create 有第二个参数，按下不表）。</p>
        <p>做法很简单，将 constructor 设置成空函数，相当于没有了属性初始化的过程，只剩下创建和关联原型两个动作。</p>
        <p>有趣的是，在 ES5 之前，JS 里只有隐式原型继承。大家都是利用类似上面的解耦做法，去得到一个可以显式原型继承的函数。</p>
        <p><b>2.2、用显式原型继承的方式完成 constructor 初始化过程</b></p>
        <p>显式原型继承，是指使用 Object.setPrototypeOf 或 Object.create 方法，手动设置原型。它比隐式原型继承，更细粒度。</p>
        <p>我们可以通过更细粒度的特性，去实现 new 语句所做的内容。</p>
        <figure data-size="normal"><noscript><img src="https://pic4.zhimg.com/v2-1d5b082897a1dd0295a34f35be28f307_b.jpg"
              data-caption="" data-size="normal" data-rawwidth="489" data-rawheight="126"
              class="origin_image zh-lightbox-thumb" width="489"
              data-original="https://pic4.zhimg.com/v2-1d5b082897a1dd0295a34f35be28f307_r.jpg" /></noscript><img
            src="https://pic4.zhimg.com/80/v2-1d5b082897a1dd0295a34f35be28f307_1440w.jpg" data-caption=""
            data-size="normal" data-rawwidth="489" data-rawheight="126" class="origin_image zh-lightbox-thumb lazy"
            width="489" data-original="https://pic4.zhimg.com/v2-1d5b082897a1dd0295a34f35be28f307_r.jpg"
            data-actualsrc="https://pic4.zhimg.com/v2-1d5b082897a1dd0295a34f35be28f307_b.jpg" data-lazy-status="ok">
        </figure>
        <p>如上，实现一个 createInstance 创建实例对象的普通函数，它接受一个 Constructor 构造函数参数，和 args 参数。</p>
        <p>按照隐式原型继承中描述的步骤，先将 Constructor.prototype 作为原型，创建一个空对象，然后通过 Constructor.call 将构造函数内部的 this 指向 instance 变量，将
          args 传入。在构造函数内部完成属性初始化的过程。</p>
        <figure data-size="normal"><noscript><img src="https://pic4.zhimg.com/v2-897068905c82ea526f4bcb471bd20547_b.jpg"
              data-caption="" data-size="normal" data-rawwidth="632" data-rawheight="471"
              class="origin_image zh-lightbox-thumb" width="632"
              data-original="https://pic4.zhimg.com/v2-897068905c82ea526f4bcb471bd20547_r.jpg" /></noscript><img
            src="https://pic4.zhimg.com/80/v2-897068905c82ea526f4bcb471bd20547_1440w.jpg" data-caption=""
            data-size="normal" data-rawwidth="632" data-rawheight="471" class="origin_image zh-lightbox-thumb lazy"
            width="632" data-original="https://pic4.zhimg.com/v2-897068905c82ea526f4bcb471bd20547_r.jpg"
            data-actualsrc="https://pic4.zhimg.com/v2-897068905c82ea526f4bcb471bd20547_b.jpg" data-lazy-status="ok">
        </figure>
        <p>使用 createInstance 创建 user 对象，跟 new User 得到的结果一样。</p>
        <p>通过了解两类原型继承方式之间的互操作性，我们可以更好的理解它们的内在关联。</p>
        <p><b>3、Prototype-based inheritance VS Class-based inheritance</b></p>
        <p>关于 prototype 原型的另一个复杂背景是，基于原型的继承和基于类的继承之间的差别和争议，已经持续了很多年。</p>
        <p><b>3.1、从朴素的演化角度理解 class 的产生过程</b></p>
        <p>我们可以尝试抛开 object-oriented programming 里的一些带有浓厚哲学色彩的说辞。从朴素的演化角度，去理解 class 的产生过程。</p>
        <p>首先，编程语言提供了一些变量声明、赋值、控制语句、基本数据类型，以及函数和循环等的复用代码的途径。通过这些特性，我们按照命令式的风格，编写我们的代码。</p>
        <p>很快我们发现，其实很多数据有它们内在的关联性，比如描述矩形的宽和高。但在代码上，它们是离散的变量，并不能体现这种关联。</p>
        <p>然后我们开始用 struct 声明一个结构体，将多个关联的数据写到一起。</p>
        <figure data-size="normal"><noscript><img src="https://pic4.zhimg.com/v2-d91970730f4e35f7e06c985fe7d809b3_b.png"
              data-caption="" data-size="normal" data-rawwidth="167" data-rawheight="105" class="content_image"
              width="167" /></noscript><img
            src="https://pic4.zhimg.com/80/v2-d91970730f4e35f7e06c985fe7d809b3_1440w.png" data-caption=""
            data-size="normal" data-rawwidth="167" data-rawheight="105" class="content_image lazy" width="167"
            data-actualsrc="https://pic4.zhimg.com/v2-d91970730f4e35f7e06c985fe7d809b3_b.png" data-lazy-status="ok">
        </figure>
        <p>如上，我们将表征一个球的圆心位置和半径，写到了一起。</p>
        <p>紧接着，在使用 struct + function 进行编程的过程中，我们又发现：其实很多 struct 结构体，都对应着某些函数。</p>
        <p>比如我们可以为上面的 sphere 实现求圆的面积，周长等的函数。</p>
        <p>也就是说，不仅数据之间有关联关系，数据和行为之间也有关联关系。</p>
        <p>我们是否可以将 data 数据和 behavior 行为在代码上也关联起来？</p>
        <p>好像并没有什么困难。我们可以将包含 data 数据和 behavior 行为的存在，称之为 object 对象。</p>
        <p>为了方便多次创建同一类对象，我们可以设计一个对象生成模板，将对象内部的 data 属性，和 behavior 写到一起。</p>
        <p>所有具体的对象，都由这个对象模板 + 参数产生出来。</p>
        <p>可以称这个对象模板为一个 class，而由该模板产生的对象，则称之为该 class 的 instance 实例。</p>
        <figure data-size="normal"><noscript><img src="https://pic4.zhimg.com/v2-91468ca7940c49937ee8e3f79b840b9f_b.jpg"
              data-caption="" data-size="normal" data-rawwidth="295" data-rawheight="285" class="content_image"
              width="295" /></noscript><img
            src="https://pic4.zhimg.com/80/v2-91468ca7940c49937ee8e3f79b840b9f_1440w.jpg" data-caption=""
            data-size="normal" data-rawwidth="295" data-rawheight="285" class="content_image lazy" width="295"
            data-actualsrc="https://pic4.zhimg.com/v2-91468ca7940c49937ee8e3f79b840b9f_b.jpg" data-lazy-status="ok">
        </figure>
        <p>数据和行为，是一个横向的关联。我们很快发现，不同的 class 之间，存在着纵向的关联关系。</p>
        <p>比如 Dog class 和 Cat class 里都单独实现了在 Animal class 里已经实现过的方法/行为。</p>
        <p>我们需要设计一种复用 class 这种模板的方式。在实践中，我们观察到，这种复用性，通常发生在类型范围缩小的场景。</p>
        <p>越是抽象和宽泛的 class 类型，它里面的方法，越有可能被其子类型所复用。</p>
        <p>那么，可以称这种垂直关联过程为 inherit 继承。</p>
        <p>class 这种对象创建模板和垂直关联的事物，其能力的上限是否真如 OO 布道者所说的那样强大，可以建模整个世界，我们不太能确信。</p>
        <p>通过上面的朴素角度，我们起码可以了解它的能力下限。在数据和行为之间，存在横向和纵向的关联时，class 能发挥一定的作用。</p>
        <p><b>3.2、从 class 角度理解 prototype</b></p>
        <p>class 的职责是充当创建 object 的模板， 通常来说，data 数据是由 instance 承载，而 methods 行为/方法则在 class 里。</p>
        <p>也就是说，基于 class 的继承，继承的是行为和结构，但没有继承数据。</p>
        <p>而基于 prototype 的继承，可以继承数据、结构和行为三者。</p>
        <p>这是因为，prototype 无非是另一个对象，它跟其它对象一样，拥有自己的非函数属性（数据）和函数属性（方法）。</p>
        <p>作为对象的 prototype，不仅可以被继承，还能被当作值传递，它跟其它普通对象，并没有不同。</p>
        <p>class-based 和 prototype-based 的差异可以概括如下：</p>
        <p>1) class -&gt; class 之间存在继承关系，object 基于某个已完成继承关系的 class 模板所创建。</p>
        <p>2）object -&gt; object 之间存在继承关系，object 可以由各种方式创建。可以在创建时设置继承对象，也可以在创建后修改继承对象。</p>
        <p>基于上述差异，有些开发者认为 prototype-based 的模式，比 class-based 的模式，更加面向对象。他们表示：难以想象还有比直接继承另一个已存在的对象，更加面向对象了。</p>
        <figure data-size="normal"><noscript><img src="https://pic4.zhimg.com/v2-f4dcbbbef82aa445b482bbe02a171673_b.jpg"
              data-caption="" data-size="normal" data-rawwidth="215" data-rawheight="219" class="content_image"
              width="215" /></noscript><img
            src="https://pic4.zhimg.com/80/v2-f4dcbbbef82aa445b482bbe02a171673_1440w.jpg" data-caption=""
            data-size="normal" data-rawwidth="215" data-rawheight="219" class="content_image lazy" width="215"
            data-actualsrc="https://pic4.zhimg.com/v2-f4dcbbbef82aa445b482bbe02a171673_b.jpg" data-lazy-status="ok">
        </figure>
        <p>在 JS 里的，class 是用 prototype 所模拟的，为了迎合 class 的基本行为。prototype 继承数据的能力被屏蔽了。</p>
        <p>如上图所示，不管我们通过 class fields 语法，还是在 constructor 里面声明数据。最后，它们都将出现在实例对象上，而非原型对象上。</p>
        <figure data-size="normal"><noscript><img src="https://pic4.zhimg.com/v2-3800bda6306af01ee3c27cf7acbe6017_b.jpg"
              data-caption="" data-size="normal" data-rawwidth="349" data-rawheight="273" class="content_image"
              width="349" /></noscript><img
            src="https://pic4.zhimg.com/80/v2-3800bda6306af01ee3c27cf7acbe6017_1440w.jpg" data-caption=""
            data-size="normal" data-rawwidth="349" data-rawheight="273" class="content_image lazy" width="349"
            data-actualsrc="https://pic4.zhimg.com/v2-3800bda6306af01ee3c27cf7acbe6017_b.jpg" data-lazy-status="ok">
        </figure>
        <p>只有 methods 方法的部分，出现在该 class 对应的原型上。</p>
        <p>如果我们想得到 prototype-based 继承数据的能力，需要自己手动操作 constructor 的 prototype 对象，挂载数据上去。不过此时，它已经超出了 class 的默认行为，进入原型继承的领域。
        </p>
        <p><b>3.3、揭开语法糖包裹的实质</b></p>
        <p>正如我在《<a href="https://zhuanlan.zhihu.com/p/83965949" class="internal">100 行代码实现 Promises/A+
            规范</a>》中描述的那样，语法糖不一定提供了更强的表达能力，往往相反。语法糖主要是为了开发者的便利性而设计。</p>
        <p>最灵活的 prototype-based，是跟 constructor 和 class 都无关的，纯粹基于 object 对象的显式原型继承。</p>
        <p>我们只需要创建对象，指定它的关联原型即可。</p>
        <p>当我们想要通过模板化的语法糖，如 constructor + prototype 属性模式，或者 class 模式，我们首先因为耦合了对象创建、对象关联、对象属性初始化等过程，而变得更呆板，失去一些精细的控制空间。
        </p>
        <p>当然，迎来的是代码在表面上的简洁性和可读性的提升。</p>
        <p>为什么说是表面上？</p>
        <p>因为，不管是 constructor 还是 class
          ，它们仅是让创建特定对象这个过程模板化了，但对象之间是需要组合和交互的。只优化了创建的部分，没有考虑后续的对象交互和组合，甚至产生反效果的话，总体上看，就只剩创建部分得到提高，而其它部分得到贬损，未必利大于弊。</p>
        <p>面向对象领域诸多语焉不详的设计模式，就是在描述 class 和 object 的交互和组合。可以作为上述案例。</p>
        <p>在《JavaScript 高级程序设计》一书里，描述了所谓的寄生、组合、借用以及寄生组合式继承等名词。相信许多看过这本书的前端工程师，都曾经反复查阅和思考，试图从中领略到原型和继承的真谛。</p>
        <p>可惜的是，那些名词和概念，没有太多价值，也不曾成为前端开发里的主流术语。更多的是，把一个简单的东西复杂化。在一个错误的设计里，将错就错。</p>
        <p>它们无非是在试图组合两个 constructor 及其 prototype，协调它们在属性初始化和原型继承上的关系。因为 constructor
          模式，耦合了多个过程在内，导致开发者需要通过一些技巧，去屏蔽自己不想要的行为。</p>
        <p>如果不用隐式原型继承，而改用显式继承的方式。很容易发觉，里面并没有什么技术含量，是一个简单的算法。</p>
        <figure data-size="normal"><noscript><img src="https://pic3.zhimg.com/v2-134ff27dd74b4675c76110a78de023b2_b.jpg"
              data-caption="" data-size="normal" data-rawwidth="474" data-rawheight="511"
              class="origin_image zh-lightbox-thumb" width="474"
              data-original="https://pic3.zhimg.com/v2-134ff27dd74b4675c76110a78de023b2_r.jpg" /></noscript><img
            src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='474' height='511'></svg>"
            data-caption="" data-size="normal" data-rawwidth="474" data-rawheight="511"
            class="origin_image zh-lightbox-thumb lazy" width="474"
            data-original="https://pic3.zhimg.com/v2-134ff27dd74b4675c76110a78de023b2_r.jpg"
            data-actualsrc="https://pic3.zhimg.com/v2-134ff27dd74b4675c76110a78de023b2_b.jpg"></figure>
        <p>如上，我们实现了一个简单的 inherit 函数。</p>
        <p>通过构造一个新的 constructor 函数，将 SuperConstructor 和 properties 里的 constructor 里的属性初始化行为合并到一起。</p>
        <p>通过 Object.setPrototypeOf 将 Super 和 Sub 的原型关联起来。</p>
        <p>使用方式类似于 class 语法，如下所示：</p>
        <figure data-size="normal"><noscript><img src="https://pic1.zhimg.com/v2-c031d88b0e101e40b10292bf6164495c_b.jpg"
              data-caption="" data-size="normal" data-rawwidth="587" data-rawheight="713"
              class="origin_image zh-lightbox-thumb" width="587"
              data-original="https://pic1.zhimg.com/v2-c031d88b0e101e40b10292bf6164495c_r.jpg" /></noscript><img
            src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='587' height='713'></svg>"
            data-caption="" data-size="normal" data-rawwidth="587" data-rawheight="713"
            class="origin_image zh-lightbox-thumb lazy" width="587"
            data-original="https://pic1.zhimg.com/v2-c031d88b0e101e40b10292bf6164495c_r.jpg"
            data-actualsrc="https://pic1.zhimg.com/v2-c031d88b0e101e40b10292bf6164495c_b.jpg"></figure>
        <p>继承 Object 实现 Human，继承 Human 实现 User，实例化 user，查看原型链，第一层是 user 实例自身的数据，第二层是 User.prototype(拥有 showName 方法)，第三层是
          Human.prototype（拥有 showAge 方法），第四层是 Object.prototype。Object.prototype 的原型是 null，因此没有第五层。</p>
        <figure data-size="normal"><noscript><img src="https://pic1.zhimg.com/v2-2eb96f76e1b1562268cef139c11afc70_b.jpg"
              data-caption="" data-size="normal" data-rawwidth="532" data-rawheight="596"
              class="origin_image zh-lightbox-thumb" width="532"
              data-original="https://pic1.zhimg.com/v2-2eb96f76e1b1562268cef139c11afc70_r.jpg" /></noscript><img
            src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='532' height='596'></svg>"
            data-caption="" data-size="normal" data-rawwidth="532" data-rawheight="596"
            class="origin_image zh-lightbox-thumb lazy" width="532"
            data-original="https://pic1.zhimg.com/v2-2eb96f76e1b1562268cef139c11afc70_r.jpg"
            data-actualsrc="https://pic1.zhimg.com/v2-2eb96f76e1b1562268cef139c11afc70_b.jpg"></figure>
        <p>如上，不需要 constructor 的辅助，我们直接声明对象字面量，手动设置原型，也能得到一样的结果。</p>
        <p>当我们抛开 class, instance, inherit, constructor 等附加概念时，我们回归到最朴素的对象身上，我们关注的是真正起作用的部分。</p>
        <p>1）对象如何创建，由谁创建？</p>
        <p>2）对象如何跟其它对象或者方法，关联起来，由谁关联起来？</p>
        <p>3）对象的属性/数据如何初始化/填充，由谁填充？</p>
        <p>抓住上述要点，有助于理解不同语法糖包裹下的面向对象风格。</p>
        <p><b>4、从数据结构和算法的角度理解 prototype 和 class</b></p>
        <p>我们不仅需要洞察语法糖背后的实质行为，还需要洞察概念和术语背后对应的实质结构。</p>
        <p>如果我们只掌握了对方给定的词汇，去描述某些概念。那么，一旦这些词汇过分宽泛，带有浓重的哲学色彩，或者神秘化，开发者不敢质疑，唯恐暴露自己的无知。如此，在这个领域无法形成真正的有效讨论，最终陷入意识形态上的争论中。
        </p>
        <p>如果我们相信程序是简单的、可解释的，无非是数据结构+算法。那么，所有编程范式，语言风格，最终都将落实到具体的数据结构和算法上。</p>
        <p>我们先问，JS Prototype 原型对应的数据结构和算法是什么？</p>
        <p>JS 原型其实是一个隐式的单向链表。</p>
        <p>Singley Linked Lists 是常见的数据结构之一，它的显著特征就是每个 item/node 中存储了指向下一个 item/node 的引用，通常是 next。</p>
        <figure data-size="normal"><noscript><img src="https://pic3.zhimg.com/v2-4d2c0c8f42c39ff4b9628ce3c960f4ce_b.jpg"
              data-caption="" data-size="normal" data-rawwidth="669" data-rawheight="131"
              class="origin_image zh-lightbox-thumb" width="669"
              data-original="https://pic3.zhimg.com/v2-4d2c0c8f42c39ff4b9628ce3c960f4ce_r.jpg" /></noscript><img
            src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='669' height='131'></svg>"
            data-caption="" data-size="normal" data-rawwidth="669" data-rawheight="131"
            class="origin_image zh-lightbox-thumb lazy" width="669"
            data-original="https://pic3.zhimg.com/v2-4d2c0c8f42c39ff4b9628ce3c960f4ce_r.jpg"
            data-actualsrc="https://pic3.zhimg.com/v2-4d2c0c8f42c39ff4b9628ce3c960f4ce_b.jpg"></figure>
        <p>很容易发现，prototype 除了不叫 next，以及是一个隐式引用外，跟上述单向链表结构如出一辙。</p>
        <p>在某些场景下，我们甚至可以直接把 Prototype 当作 JS 里内置的单向链表来用，而不必手动实现。</p>
        <figure data-size="normal"><noscript><img src="https://pic4.zhimg.com/v2-e9ace5a745b673f67da29c8f0170c09f_b.jpg"
              data-caption="" data-size="normal" data-rawwidth="435" data-rawheight="199"
              class="origin_image zh-lightbox-thumb" width="435"
              data-original="https://pic4.zhimg.com/v2-e9ace5a745b673f67da29c8f0170c09f_r.jpg" /></noscript><img
            src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='435' height='199'></svg>"
            data-caption="" data-size="normal" data-rawwidth="435" data-rawheight="199"
            class="origin_image zh-lightbox-thumb lazy" width="435"
            data-original="https://pic4.zhimg.com/v2-e9ace5a745b673f67da29c8f0170c09f_r.jpg"
            data-actualsrc="https://pic4.zhimg.com/v2-e9ace5a745b673f67da29c8f0170c09f_b.jpg"></figure>
        <p>首先，我们使用之前介绍过的访问器属性，像定义 __proto__ 一样，定义 next。这样显得更加像链表，尽管 obj.__proto__ 和 obj.next 访问的是同一个对象，但 next
          无疑更符合链表的语义。并且，我们屏蔽了通过 next 访问到 Object.prototype，直接返回 null 表示没有 next 元素了。</p>
        <figure data-size="normal"><noscript><img src="https://pic1.zhimg.com/v2-cfdff19607a7d19589459d23460020c4_b.jpg"
              data-caption="" data-size="normal" data-rawwidth="269" data-rawheight="465" class="content_image"
              width="269" /></noscript><img
            src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='269' height='465'></svg>"
            data-caption="" data-size="normal" data-rawwidth="269" data-rawheight="465" class="content_image lazy"
            width="269" data-actualsrc="https://pic1.zhimg.com/v2-cfdff19607a7d19589459d23460020c4_b.jpg"></figure>
        <p>然后创建 4 个对象，通过赋值 next（背后调用 Object.setPrototypeOf 函数），将它们依次链接起来。跟前面关于链表的截图一样，我们让 A 作为链表的第一个元素（head）。</p>
        <figure data-size="normal"><noscript><img src="https://pic2.zhimg.com/v2-1515d7218317110b116f27f32389b889_b.jpg"
              data-caption="" data-size="normal" data-rawwidth="304" data-rawheight="262" class="content_image"
              width="304" /></noscript><img
            src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='304' height='262'></svg>"
            data-caption="" data-size="normal" data-rawwidth="304" data-rawheight="262" class="content_image lazy"
            width="304" data-actualsrc="https://pic2.zhimg.com/v2-1515d7218317110b116f27f32389b889_b.jpg"></figure>
        <p>如上图所示，我们通过链表的第一个元素 a 以及 next 指针，将链表里的元素逐个打印了出来。</p>
        <p>一种结构，是否是单向链表，其实跟它把指向下一个元素的字段叫什么无关，跟它以什么方式去储存下一个元素无关。很容易可以通过一层转换，将它恢复成我们熟悉的样貌。</p>
        <p>基于原型链的属性查找算法，在前文我们已经展示过了，就是一个简单的算法：在一个单向链表上进行遍历，逐个检查每个节点是否包含某个属性名，返回第一个包含该属性名的节点的属性值。</p>
        <p>我们可以重新梳理一下对 JS 原型的表述：一个以隐式引用作为存储方式，以点操作符和属性访问语句作为语法糖的单向链表。</p>
        <p>并且，原型链并没有发挥出单向链表的全部能力。大部分情况下，只用到了 addFirst 这个操作（即原型继承）。极少场景使用 addLast, traversing, insertBefore, insertAfter
          等链表操作。</p>
        <p>换句话说，JS 原型是一个只用了部分能力的单向链表。</p>
        <p>而 class 可以被更细粒度的 Prototype 所模拟，意味着它里面包含的表达能力，还低于 prototype，亦即低于单向链表。</p>
        <p>当有人跟你说：“我相信只需要单向链表的部分能力，加上一些语法糖，就能对世界进行灵活和有效的建模”。</p>
        <p>或者是说：“我相信只要将关联数据和关联行为的代码过程模板化，再让模板之间可以简单垂直关联，就能对世界进行可靠的建模”。</p>
        <p>你可能会觉得对方是疯了。</p>
        <p>然而，如果他采用 class, object, instance, inherit, prototype, constructor 等带有哲学色彩的词汇，加以渲染。你会开始犹豫，怀疑是否自己理解得不够深。</p>
        <p>再看他添油加醋，嘴里念叨起多态、继承、封装、消息传递，然后连耍 40 个设计模式的套路。你立刻确信是自己理解水平不到。</p>
        <p>你开始硬背设计模式、寄生组合式继承等套路。忘记了它们背后对应的算法和数据结构，可能只是你刷 Leetcode 的热身部分。</p>
        <p>如果我们能用更标准的、通用的、可解释性高的词汇，去描述当下流行的一些行业概念，或许我们更够更加容易区分，哪些是可靠的，哪些是营造的。</p>
        <p><b>5、class 和 prototype 对 web 开发都不友好</b></p>
        <p>尽管 prototype 是 JS 的核心概念，class 也已经成为 ECMAScript 标准的一部分，但不意味着它们就一定适合 web 开发。</p>
        <p>实际上，许多案例昭示着相反的结论。</p>
        <p><b>5.1、隐式属性访问让程序更不可靠，也容易带来困惑</b></p>
        <p>通过点操作符访问属性，实质是隐式地搜索原型链上各个对象的属性。它带来便利的同时，也带来困惑。</p>
        <p>明明我没有声明某些属性和方法，我却能访问到？</p>
        <p>明明它不是对象，也能调用方法？</p>
        <p>我难以理清我访问的属性和方法，来自原型链的哪一个对象。</p>
        <p>所有属性和方法，都是不可靠的，它们很容易通过原型继承后，加以篡改。</p>
        <p>因此，几乎所有 JS Library，它们都不会直接通过 obj.hasOwnProperty 这种方式去调用该方法。</p>
        <figure data-size="normal"><noscript><img src="https://pic3.zhimg.com/v2-c2dc4f0bce6a5afd832802d2ce50fb06_b.jpg"
              data-caption="" data-size="normal" data-rawwidth="420" data-rawheight="93" class="content_image"
              width="420" /></noscript><img
            src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='420' height='93'></svg>"
            data-caption="" data-size="normal" data-rawwidth="420" data-rawheight="93" class="content_image lazy"
            width="420" data-actualsrc="https://pic3.zhimg.com/v2-c2dc4f0bce6a5afd832802d2ce50fb06_b.jpg"></figure>
        <p>它们会先将 Object.prototype.hasOwnProperty 保存在一个变量里，然后通过 call 的方式去调用。如此可以保证 hasOwnProperty 的行为，明确知道它是在
          Object.prototype 层面的方法。</p>
        <p>否则将可能陷入下面这种困境。</p>
        <figure data-size="normal"><noscript><img src="https://pic1.zhimg.com/v2-3615129d38b5d6d6be8085e4899edfb0_b.jpg"
              data-caption="" data-size="normal" data-rawwidth="210" data-rawheight="162" class="content_image"
              width="210" /></noscript><img
            src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='210' height='162'></svg>"
            data-caption="" data-size="normal" data-rawwidth="210" data-rawheight="162" class="content_image lazy"
            width="210" data-actualsrc="https://pic1.zhimg.com/v2-3615129d38b5d6d6be8085e4899edfb0_b.jpg"></figure>
        <p>早年 for in 操作能将整个原型链上的属性都遍历出来，也给开发者带来了巨大的负担。</p>
        <figure data-size="normal"><noscript><img src="https://pic4.zhimg.com/v2-67c23ef3eac345482f90e042733083e3_b.jpg"
              data-caption="" data-size="normal" data-rawwidth="306" data-rawheight="131" class="content_image"
              width="306" /></noscript><img
            src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='306' height='131'></svg>"
            data-caption="" data-size="normal" data-rawwidth="306" data-rawheight="131" class="content_image lazy"
            width="306" data-actualsrc="https://pic4.zhimg.com/v2-67c23ef3eac345482f90e042733083e3_b.jpg"></figure>
        <p>我们需要手动判断 key 是否属于 obj 自身，然后进行真正的操作。因此，有一些开发者，建议不用 for in，总是使用 Object.keys。</p>
        <figure data-size="normal"><noscript><img src="https://pic2.zhimg.com/v2-e71c6898010814c9b486a4774c4b3311_b.jpg"
              data-caption="" data-size="normal" data-rawwidth="299" data-rawheight="154" class="content_image"
              width="299" /></noscript><img
            src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='299' height='154'></svg>"
            data-caption="" data-size="normal" data-rawwidth="299" data-rawheight="154" class="content_image lazy"
            width="299" data-actualsrc="https://pic2.zhimg.com/v2-e71c6898010814c9b486a4774c4b3311_b.jpg"></figure>
        <p>Object.keys 是 ES5 新增的静态方法，它将 obj 自身包含的所有可遍历的 key，装配成数组形式返回。配合同样是 ES5 新增的数组 forEach 方法，可以实现遍历对象的功能。</p>
        <p>此外，在原型上追加数据和方法，会影响到所有继承该原型的对象。这原本是 prototype-based inheritance 的一大亮点。然而，在实践中，大家对此感到非常不安。</p>
        <p>我们的页面里的代码，通常不会只包含我们自己编写的，还会包含第三方的库和框架，别的部门同事提供的 sdk，埋点，监控，组件等代码。</p>
        <p>如果大家都往原型上挂载自己编写的方法，特别是挂载到 Object, Array, Number 等全局构造函数的原型上。所有代码都变得更不可靠，所有行为都更加难以预测，所有经验都更难复用。</p>
        <p>每个开发者都难以控制，访问属性访问的是哪里的数据，调用方法调用的是谁编写的方法？</p>
        <p>大家认为这种做法，相当于对全局变量和命名空间的滥用。很多年前，整个前端开发社区就达成了高度的共识，如无必要，不要随意往原型上拓展方法，特别是全局构造函数里的原型。</p>
        <p>至于 constructor + prototype 做隐式原型继承带来的困惑，前文已经做过详细描述，这里不再赘述。</p>
        <p>总的而言，几乎所有 prototype 在 JS 里隐式的、自动的行为，都对 Web 应用的开发者带来了很大的困惑和困扰。大家想方设法的禁用 prototype 的特性和卖点，换取更可靠的代码组织方式。</p>
        <p>听起来是不是很有趣？当我们好不容易掌握了原型的概念和用法，准备好好利用它们的灵活性，大展拳脚，却被告知要自我克制。只能在很有限的层次上，小心翼翼地使用。</p>
        <p><b>5.2、prototype 和 class 不利于体积优化</b></p>
        <p>web 开发跟其它开发场景，有一个显著不同是，它对代码体积非常敏感。</p>
        <p>基于 prototype 和 class 编写的代码，很难通过代码分析，在构建时进行移除不必要的代码。这项技术叫 Tree-Shaking 或者 Dead Code Elimination。</p>
        <p>rxjs从 v5 升级到 v6 版本时，将原本基于 prototype 的链式调用用法，修改成基于 pipe 函数的的用法。</p>
        <figure data-size="normal"><noscript><img src="https://pic4.zhimg.com/v2-feb056fa9b7d3d8f8925aa753588ebeb_b.jpg"
              data-caption="" data-size="normal" data-rawwidth="492" data-rawheight="482"
              class="origin_image zh-lightbox-thumb" width="492"
              data-original="https://pic4.zhimg.com/v2-feb056fa9b7d3d8f8925aa753588ebeb_r.jpg" /></noscript><img
            src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='492' height='482'></svg>"
            data-caption="" data-size="normal" data-rawwidth="492" data-rawheight="482"
            class="origin_image zh-lightbox-thumb lazy" width="492"
            data-original="https://pic4.zhimg.com/v2-feb056fa9b7d3d8f8925aa753588ebeb_r.jpg"
            data-actualsrc="https://pic4.zhimg.com/v2-feb056fa9b7d3d8f8925aa753588ebeb_b.jpg"></figure>
        <p>如上图所示，前半部分是 rxjs v5 版本，采用了名为 do-chaining 链式调用的风格(jQuery 也是)。</p>
        <p>后半部分是 rxjs v6 选用的风格，基于 pipe 的高阶函数组合。</p>
        <p>不得不说，rxjs v5 风格，在现阶段看起来更加直观一点。不过，rxjs v6 风格的 operators
          不在原型上，而是独立的方法。所有使用的地方，都由用户显式引入，或者内部显式引入，很容易分析是否参与了代码执行。</p>
        <p>当我们挂载 operators 到原型上时，基于 this[method] 访问的动态性，原型链上的任意方法，不管有没有显式调用，都不能轻易移除。为其它对象提供共享的属性和方法，这个承诺一旦做出，就难以收回。</p>
        <p>从这点来看，对于体积敏感的 web 开发来说，rxjs v6 风格无疑是更好的。</p>
        <figure data-size="normal"><noscript><img src="https://pic1.zhimg.com/v2-7ee0e5bdbd5d2e7a93cbffbef9f18878_b.jpg"
              data-caption="" data-size="normal" data-rawwidth="474" data-rawheight="243"
              class="origin_image zh-lightbox-thumb" width="474"
              data-original="https://pic1.zhimg.com/v2-7ee0e5bdbd5d2e7a93cbffbef9f18878_r.jpg" /></noscript><img
            src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='474' height='243'></svg>"
            data-caption="" data-size="normal" data-rawwidth="474" data-rawheight="243"
            class="origin_image zh-lightbox-thumb lazy" width="474"
            data-original="https://pic1.zhimg.com/v2-7ee0e5bdbd5d2e7a93cbffbef9f18878_r.jpg"
            data-actualsrc="https://pic1.zhimg.com/v2-7ee0e5bdbd5d2e7a93cbffbef9f18878_b.jpg"></figure>
        <p>配合将来的 pipeline-operator 语言特性，rxjs v6 风格也有望变得更易读。</p>
        <p><b>5.3、prototype/class 不利于代码复用</b></p>
        <p>React team 曾在 2018 年 10 月介绍 react-hooks 时，描述了 class-based component 的诸多问题。</p>
        <p>1）许多逻辑处理都要使用生命周期方法，但它们各自只有一个，并且跟 class 声明强行绑定，难以找到有效的实现逻辑复用的途径。</p>
        <p>2）状态存储必须集中在一个 state 中进行管理，不易拆分。</p>
        <p>生命周期声明和数据状态当然得 class 绑定，这正是 class 作为对象创建的模板，将对象包含的数据和行为关联起来的职责所在。因此，从某种意义上，class-component 的问题不是一个能在 class
          层面克服的问题。</p>
        <p>使用基于函数组合的 react-hooks 模式，我们发现，原来数据和行为的关联和复用，有其它思路。</p>
        <figure data-size="normal"><noscript><img src="https://pic3.zhimg.com/v2-9abb18ce3c38731f42fff379daaa9bea_b.jpg"
              data-caption="" data-size="normal" data-rawwidth="505" data-rawheight="308"
              class="origin_image zh-lightbox-thumb" width="505"
              data-original="https://pic3.zhimg.com/v2-9abb18ce3c38731f42fff379daaa9bea_r.jpg" /></noscript><img
            src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='505' height='308'></svg>"
            data-caption="" data-size="normal" data-rawwidth="505" data-rawheight="308"
            class="origin_image zh-lightbox-thumb lazy" width="505"
            data-original="https://pic3.zhimg.com/v2-9abb18ce3c38731f42fff379daaa9bea_r.jpg"
            data-actualsrc="https://pic3.zhimg.com/v2-9abb18ce3c38731f42fff379daaa9bea_b.jpg"></figure>
        <p>在 class-component 里，我们需要在同一个生命周期里做不同的事情，并且在不同的生命周期里协调同一件事情的不同阶段。</p>
        <figure data-size="normal"><noscript><img src="https://pic3.zhimg.com/v2-6c410eb23df0e1860169610bc3e93c0e_b.jpg"
              data-caption="" data-size="normal" data-rawwidth="301" data-rawheight="142" class="content_image"
              width="301" /></noscript><img
            src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='301' height='142'></svg>"
            data-caption="" data-size="normal" data-rawwidth="301" data-rawheight="142" class="content_image lazy"
            width="301" data-actualsrc="https://pic3.zhimg.com/v2-6c410eb23df0e1860169610bc3e93c0e_b.jpg"></figure>
        <p>我们要把状态都集中在 state 中，通过隐式的 this 和 setState 方法去访问和更新状态。</p>
        <figure data-size="normal"><noscript><img src="https://pic1.zhimg.com/v2-c3bb235bb9140c7c704d4c030bf76ec4_b.jpg"
              data-caption="" data-size="normal" data-rawwidth="444" data-rawheight="114"
              class="origin_image zh-lightbox-thumb" width="444"
              data-original="https://pic1.zhimg.com/v2-c3bb235bb9140c7c704d4c030bf76ec4_r.jpg" /></noscript><img
            src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='444' height='114'></svg>"
            data-caption="" data-size="normal" data-rawwidth="444" data-rawheight="114"
            class="origin_image zh-lightbox-thumb lazy" width="444"
            data-original="https://pic1.zhimg.com/v2-c3bb235bb9140c7c704d4c030bf76ec4_r.jpg"
            data-actualsrc="https://pic1.zhimg.com/v2-c3bb235bb9140c7c704d4c030bf76ec4_b.jpg"></figure>
        <p>在 function-component 里，我们则能将同一件事情的数据和行为封装到一个 custom hooks 里，使用时不需要再考虑协调问题，可以简单的获取数据或触发特定行为。</p>
        <p>思考一下，react-hooks 模式如何使代码复用变得更简单，它跟 class-component 的差别是什么？</p>
        <p>差别是，对象这个概念的瓦解——数据、行为及其关联是三个维度，它们不应被捆绑在对象中。</p>
        <p>数据可以单独声明（useState），行为也可以单独声明（useEffect），数据和行为可以进行可选的关联（custom-hooks）。</p>
        <p>数据可以单独组合，行为可以单独组合，组合的数据和组合的行为可以进行再度组合。</p>
        <p>组合的维度得到了横向和纵向的自由度扩展。</p>
        <p><b>6、重新思考对象这个概念的必要性</b></p>
        <p>回想一下，我们如何从朴素的变量，到结构体，到对象与 class？</p>
        <p>这其中概念演进的理由，是否真的足够充分?</p>
        <p>数据与数据之间存在关联，以结构体的方式联合起来。</p>
        <p>数据与行为之间存在关联，作为属性和方法在对象中联合起来。</p>
        <p>这种联合，是没有代价的吗？</p>
        <p>不是的。</p>
        <p>在实践中，我们发现，数据和行为各有自己的组合维度。</p>
        <p>数据与数据的组合，如果通过对象这种捆绑了行为的方式去实施，我们经常需要去屏蔽默认行为（override 覆写方法, diamond problem 等）。</p>
        <p>行为与行为的组合，如果通过对象这种捆绑了数据的方式去实施，我们经常需要去屏蔽多余的、冲突的字段、类型与结构。</p>
        <p>数据、行为及其关联，不应被默认捆绑在 class 或者 object 概念中。应该以正交的 3 个独立的维度形式进行组织。</p>
        <p>有编程语言是这样做的吗？</p>
        <p>有的。</p>
        <p>Functional Programing Language 里就有这样做的，比如在 Haskell 里的情况。</p>
        <p>数据结构由 data 关键字声明。</p>
        <figure data-size="normal"><noscript><img src="https://pic4.zhimg.com/v2-af5c07e64b5dcc7f06c7a847b6c90683_b.jpg"
              data-caption="" data-size="normal" data-rawwidth="305" data-rawheight="56" class="content_image"
              width="305" /></noscript><img
            src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='305' height='56'></svg>"
            data-caption="" data-size="normal" data-rawwidth="305" data-rawheight="56" class="content_image lazy"
            width="305" data-actualsrc="https://pic4.zhimg.com/v2-af5c07e64b5dcc7f06c7a847b6c90683_b.jpg"></figure>
        <p>上图我声明了一个 Optional 数据类型，它要么是 None 要么是 Value a。当它作为集合看待时，它里面的元素，等于 None 集合的元素 + Value a
          集合的元素，就是一个类型层面的或运算。因此也被称之为 Sum Types。</p>
        <figure data-size="normal"><noscript><img src="https://pic1.zhimg.com/v2-1c5d005aacbb8f4ecb09fbbe2ae1fe74_b.png"
              data-caption="" data-size="normal" data-rawwidth="259" data-rawheight="38" class="content_image"
              width="259" /></noscript><img
            src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='259' height='38'></svg>"
            data-caption="" data-size="normal" data-rawwidth="259" data-rawheight="38" class="content_image lazy"
            width="259" data-actualsrc="https://pic1.zhimg.com/v2-1c5d005aacbb8f4ecb09fbbe2ae1fe74_b.png"></figure>
        <p>上图我声明了一个 Pair 数据类型，它既包含 a， 也包含 b，将 a 和 b 作为整体。将它视为集合时，其元素是 a 集合的元素 * b 集合的元素。相当于 a 跟 b 进行排列组合，每个 a 都跟所有可能的 b
          配对，当然是相乘啦。因此这种类型也被称之为 Product Types。</p>
        <p>通过 data 关键字声明类型，基于内置的 Basic Types 基本数据类型， 配合 Sum Types 和 Product Types
          等进行组合操作，我们可以完成数据结构维度上的组合。这种实践被称之为代数数据类型（Algebraic Data Types）。得名于其心智模型，是在对类型进行相加或相乘的代数操作。</p>
        <p>有了数据类型和结构，我们可以通过模式匹配+递归的方式，编写相关行为。在命令式风格的代码里也是这样，此处不做额外展示。关键是，当几个行为之间有关联时，怎么去组织这种关联。</p>
        <p>在 Haskell 里，可以通过名为 typeclasses 的特性，描述一组关联的行为。</p>
        <p>比如我们想让上面的 Optional a 类型，具备 comparable 的行为特征，即可以用 a == b 检查是否相等，用 a != b 检查是否不相等。</p>
        <p>相等和不相等，是 comparable 行为特征的两个部分，它们在代码组织上应该被关联起来。</p>
        <p>关联行为不是用 data 关键字来声明，而是用 class 关键字。</p>
        <figure data-size="normal"><noscript><img src="https://pic3.zhimg.com/v2-d33158e743dbd3165ea184a6880e1f12_b.jpg"
              data-caption="" data-size="normal" data-rawwidth="241" data-rawheight="95" class="content_image"
              width="241" /></noscript><img
            src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='241' height='95'></svg>"
            data-caption="" data-size="normal" data-rawwidth="241" data-rawheight="95" class="content_image lazy"
            width="241" data-actualsrc="https://pic3.zhimg.com/v2-d33158e743dbd3165ea184a6880e1f12_b.jpg"></figure>
        <p>如上，我们通过 class 关键字声明了 Eq（Equal 的缩写）这个行为特性，它包含两个函数（按照不同喜好，可以将它们叫做方法或行为）。</p>
        <p>这个 class 不是跟面向对象的 class 关键字一样，作为对象创建模板，既包含数据，也包含行为，以及数据和行为的实现。</p>
        <p>在这里，class 只是定义了一个行为特性包含的结构。并没有代码实现。</p>
        <figure data-size="normal"><noscript><img src="https://pic3.zhimg.com/v2-1078f4201595908a341ab59a391bc2f2_b.jpg"
              data-caption="" data-size="normal" data-rawwidth="368" data-rawheight="196" class="content_image"
              width="368" /></noscript><img
            src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='368' height='196'></svg>"
            data-caption="" data-size="normal" data-rawwidth="368" data-rawheight="196" class="content_image lazy"
            width="368" data-actualsrc="https://pic3.zhimg.com/v2-1078f4201595908a341ab59a391bc2f2_b.jpg"></figure>
        <p>如上，我们用 instance 关键字，声明了我们的 Optional a 数据类型，如何满足和实现 Eq 行为特性。我们通过数据匹配关系，定义了如何判断是否相等。然后在实现 \= 方法时，偷懒地用取反的方式。</p>
        <p>instance 在面向对象中，是实例化一个对象。在 typeclasses 语境中，并非如此，它只是表达某个类型如何满足和实现某个行为结构的要求。</p>
        <figure data-size="normal"><noscript><img src="https://pic1.zhimg.com/v2-06769637f667e49a0265c033704f52f0_b.jpg"
              data-caption="" data-size="normal" data-rawwidth="247" data-rawheight="139" class="content_image"
              width="247" /></noscript><img
            src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='247' height='139'></svg>"
            data-caption="" data-size="normal" data-rawwidth="247" data-rawheight="139" class="content_image lazy"
            width="247" data-actualsrc="https://pic1.zhimg.com/v2-06769637f667e49a0265c033704f52f0_b.jpg"></figure>
        <p>如上，我们测试了 4 个 cases。只要实现了 Eq 要求的行为结构，在后续代码中，我们就可以使用 == 和 \== 这两个操作。</p>
        <p>Eq 只是其中一个，我们还可以为 Optional a 实现其它行为特征，比如可比较大小(Orderable)，可映射(Mappable)等等。</p>
        <p>通过 typeclasses，行为特性的声明、实现及其组织关系，可以独立于具体的数据类型。</p>
        <p>所有数据类型，都可以去自行实现 Eq 等行为特征。</p>
        <p>数据和行为之间的交互，则是通过类型推断，在编译期完成。</p>
        <p>编译器知道我们在调用操作时，是哪个类型的数据在进行操作，它会找到这个类型通过 instance 语句所实现的操作函数，将它们隐式传入该函数。</p>
        <p>跟面向对象将对象传入隐式参数 this 不同，typeclasses 里没有对象概念，它会追踪到具体方法，精准的传递该方法。因此，它不需要像 Java 那样进行 dynamic dispatch
          在运行时去确认方法来源于哪个 class。typeclasses 在编译器就完成了这个调度过程。</p>
        <figure data-size="normal"><noscript><img src="https://pic3.zhimg.com/v2-ccd1ed72f02bf28c03b33b8a8c7ee60a_b.jpg"
              data-caption="" data-size="normal" data-rawwidth="680" data-rawheight="119"
              class="origin_image zh-lightbox-thumb" width="680"
              data-original="https://pic3.zhimg.com/v2-ccd1ed72f02bf28c03b33b8a8c7ee60a_r.jpg" /></noscript><img
            src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='680' height='119'></svg>"
            data-caption="" data-size="normal" data-rawwidth="680" data-rawheight="119"
            class="origin_image zh-lightbox-thumb lazy" width="680"
            data-original="https://pic3.zhimg.com/v2-ccd1ed72f02bf28c03b33b8a8c7ee60a_r.jpg"
            data-actualsrc="https://pic3.zhimg.com/v2-ccd1ed72f02bf28c03b33b8a8c7ee60a_b.jpg"></figure>
        <p>如上，表面上看，我们的 square 只有 1 个参数，用到了 * 操作。在调用时，也只传了 1 个参数。</p>
        <figure data-size="normal"><noscript><img src="https://pic4.zhimg.com/v2-b1dff752e312bf06feab645edab1269f_b.jpg"
              data-caption="" data-size="normal" data-rawwidth="644" data-rawheight="140"
              class="origin_image zh-lightbox-thumb" width="644"
              data-original="https://pic4.zhimg.com/v2-b1dff752e312bf06feab645edab1269f_r.jpg" /></noscript><img
            src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='644' height='140'></svg>"
            data-caption="" data-size="normal" data-rawwidth="644" data-rawheight="140"
            class="origin_image zh-lightbox-thumb lazy" width="644"
            data-original="https://pic4.zhimg.com/v2-b1dff752e312bf06feab645edab1269f_r.jpg"
            data-actualsrc="https://pic4.zhimg.com/v2-b1dff752e312bf06feab645edab1269f_b.jpg"></figure>
        <p>经过编译器的编译后，它所隐藏的参数，都被自动添加上去。在调用时，缺失的参数，也自动补全。</p>
        <p>也就是说，行为之间的组合和关联，相当部分是编译器自动完成的。</p>
        <p>完全不需要对象这个概念，我们也得到了在数据、行为及其交互三个维度上的组合能力，甚至做得更好。</p>
        <p><b>7、真正的设计模式</b></p>
        <p>设计模式的兴起，源于面向对象编程。然而，它们并没有很明确的定义和验证规则，总体上是开发者之间形成的朦胧共识。</p>
        <p>很容易想到，函数式编程里采用了不同的方式去看待数据、行为及其关联，它们也应该会产出类似设计模式的事物吧？</p>
        <p>没错。</p>
        <p>FP 里不仅有类似设计模式的东西，而且定义上更明确，不只是有自然语言描述，还可以作为 Library 和 Frameworks。更妙的是，它们有数学上的对应。</p>
        <p>可以视为 Algebraic Structures 在 Programming 里的体现。因为它们之间的关系，太紧密，以至于很多地方选用了相同的名称。</p>
        <p>令不少 FP 新手闻风丧胆的 Monad/Monoid 是其中之一。</p>
        <figure data-size="normal"><noscript><img src="https://pic4.zhimg.com/v2-801c84aa286c7c1b931c736573fa3073_b.jpg"
              data-caption="" data-size="normal" data-rawwidth="403" data-rawheight="371" class="content_image"
              width="403" /></noscript><img
            src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='403' height='371'></svg>"
            data-caption="" data-size="normal" data-rawwidth="403" data-rawheight="371" class="content_image lazy"
            width="403" data-actualsrc="https://pic4.zhimg.com/v2-801c84aa286c7c1b931c736573fa3073_b.jpg"></figure>
        <p>具体内容，不是本文的重点，按下不表。在此我们只要知道，它们有 laws，是可验证的，甚至在类型系统更完善和严格的语言中是可证明的。</p>
        <p>我们从访问者模式，模板牧师，策略模式，观察者模式，解释器模式，享元模式等贴近生活经验的词汇，转向了 Semigroup, Monoid, Group, Functor, Monad 等更学术化和数学化的表达。</p>
        <p>我觉得这是一个显著的进步。</p>
        <p><b>8、新的概念营造：OOP VS COP</b></p>
        <p>一下子从面向对象跳跃到函数式编程，很容易感到不适应。我们可以回到面向对象的语境中，重新梳理一下，从 FP 里可以得到什么启发。</p>
        <p>仿照 react 将 class-component 的功能拆散，称之为 react-hooks 的做法。</p>
        <p>我们可以把将 class 拆成数据和行为两部分自由组织的功能，称之为 class-hooks。</p>
        <p>然后构建 class-oriented programming，将它作为 object-oriented programming 的演进版本，营造新的概念，以便于兜售（让新手程序员不产生学术抵抗心理）。</p>
        <p>从 OOP 转向我们新的 COP 范式，显著的差别是什么？</p>
        <p>差别在于，我们不再用单一的 class 去同时声明数据初始化和定义方法。</p>
        <figure data-size="normal"><noscript><img src="https://pic2.zhimg.com/v2-9b863e2710da2e611b42ab113685927d_b.jpg"
              data-caption="" data-size="normal" data-rawwidth="362" data-rawheight="97" class="content_image"
              width="362" /></noscript><img
            src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='362' height='97'></svg>"
            data-caption="" data-size="normal" data-rawwidth="362" data-rawheight="97" class="content_image lazy"
            width="362" data-actualsrc="https://pic2.zhimg.com/v2-9b863e2710da2e611b42ab113685927d_b.jpg"></figure>
        <p>我们使用 dataclass 去单独声明数据结构，通过 Sum Types 和 Product Types 进行组合。</p>
        <p>dataclass 的 instance 则是具体的数据。</p>
        <figure data-size="normal"><noscript><img src="https://pic2.zhimg.com/v2-3ca26fa1dd9a8f6aedff4183e1043f11_b.jpg"
              data-caption="" data-size="normal" data-rawwidth="385" data-rawheight="315" class="content_image"
              width="385" /></noscript><img
            src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='385' height='315'></svg>"
            data-caption="" data-size="normal" data-rawwidth="385" data-rawheight="315" class="content_image lazy"
            width="385" data-actualsrc="https://pic2.zhimg.com/v2-3ca26fa1dd9a8f6aedff4183e1043f11_b.jpg"></figure>
        <p>我们通过 methodclass 去声明行为结构。</p>
        <p>methodclass 的 instance 是具体的方法实现。</p>
        <p>如此，我们细分了数据类和行为类，数据实例和行为实例。</p>
        <p>相比将行为和数据捆绑在一起的 class 继承，我们的数据类和行为类都可以单独进行继承，实现起来更灵活。</p>
        <p>多重继承的场景，也不会遇到面向对象语言 C++ 多重继承里的 <a
            href="https://link.zhihu.com/?target=https%3A//en.wikipedia.org/wiki/Multiple_inheritance"
            class=" wrap external" target="_blank" rel="nofollow noreferrer">Diamond Problem</a></p>
        <figure data-size="normal"><noscript><img src="https://pic4.zhimg.com/v2-12b9e36eaf4633c3a090c14da7e08aeb_b.jpg"
              data-caption="" data-size="normal" data-rawwidth="220" data-rawheight="330" class="content_image"
              width="220" /></noscript><img
            src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='330'></svg>"
            data-caption="" data-size="normal" data-rawwidth="220" data-rawheight="330" class="content_image lazy"
            width="220" data-actualsrc="https://pic4.zhimg.com/v2-12b9e36eaf4633c3a090c14da7e08aeb_b.jpg"></figure>
        <p>在 OOP 里，D 多重继承了 B 和 C，而 B 和 C 都继承了 A，则 B，C 和 A 之间的同名方法协调上存在不明确空间。</p>
        <p>在 COP 里，同个数据类跟多个行为类的组合，总是扁平化的。只要类型是明确的，行为上不会有含混空间。</p>
        <p>我们将强调，COP 比 OOP 更加 object-based。</p>
        <p>在 OOP 中，object 是在形式上捆绑在一起的数据和行为。</p>
        <p>问题是，一个对象是否构成对象，跟它写在一起，还是分开写，还是其它表达形式，有直接关系吗？</p>
        <p>对象之所以是对象，是基于它们事实上具有本质上的关联，跟它分开写，还是放到一起写无关。</p>
        <p>在我们的 COP 中，数据和行为可以分开定义，但它们的类型昭示着它们是同一对象的两个方面：数据和行为。</p>
        <p>我们将揶揄，以捆绑到一起的对象为中心的 OOP，从未表达过真正的对象。</p>
        <p>对于 Animal 类，它们从未完整实现过真正的 Animal 应该具备的行为，而只是不完整的 jump 方法，run 方法。</p>
        <p>实际上，animal 之所以会 jump 和 run，不是因为它有那个方法名，而是比 jump 和 run 更微观的行为和数据，支撑起了 jump 操作和 rum 操作。</p>
        <p>OOP 架空实质，只围绕了方法名、类名等做文章。</p>
        <p>在我们的 COP 中，并不追求形式上把整个对象放到一起。我们非常了解，程序只能反映对象的某些方面和片段的行为。我们不需要完整的对象，只需要对象中我们所关心的数据和行为。</p>
        <p>这正式“抽象”这个词汇所表达的：舍去无关的部分。</p>
        <figure data-size="normal"><noscript><img src="https://pic4.zhimg.com/v2-6c8cb7af4233eb7d186abf0c968d1073_b.jpg"
              data-caption="" data-size="normal" data-rawwidth="445" data-rawheight="134"
              class="origin_image zh-lightbox-thumb" width="445"
              data-original="https://pic4.zhimg.com/v2-6c8cb7af4233eb7d186abf0c968d1073_r.jpg" /></noscript><img
            src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='445' height='134'></svg>"
            data-caption="" data-size="normal" data-rawwidth="445" data-rawheight="134"
            class="origin_image zh-lightbox-thumb lazy" width="445"
            data-original="https://pic4.zhimg.com/v2-6c8cb7af4233eb7d186abf0c968d1073_r.jpg"
            data-actualsrc="https://pic4.zhimg.com/v2-6c8cb7af4233eb7d186abf0c968d1073_b.jpg"></figure>
        <p>因此，从上面的 compare 函数我们可以看到，Optional 表征的对象是否可以进行比较，不仅仅跟它的方法名是否叫 compare 有关，跟它内部结构是否可比较有关。</p>
        <p>COP 是一个更真切的、富有层次感的对象建模过程。</p>
        <p>我们指出 OOP 是 COP 的退化形式，只要将 dataclass 和 methodclass 耦合起来，就得到了 OOP 的形态。</p>
        <p>同时我们将抗议，学术领域的 FP 使用者，将 COP 包装以专业术语等可怕的样子呈现给普通开发，抹黑了它原本的简洁性和美感；并且常年将它跟 OOP 对立起来。</p>
        <p>我们将提倡，不要再用 FP 这个词儿了，用 COP，class-oriented programing，面向类编程。</p>
        <p>其实 OOP 开发者早就逐渐意识到捆绑带来的问题，开始呼吁组合优于继承云云。</p>
        <p>声明一个不带行为的 class，能部分起到 dataclass 的作用。</p>
        <p>OOP 里的 interface 跟 COP 里的 methodclass 也拥有类似的功能。即声明一组行为结构，任何 implements 了该接口的 class 都能参与某些操作，如 Readable
          等（Haskell 的 typeclasses 在 1989 年就提出了，Java 还未出生。《How to make ad-hoc polymorphism less ad hoc》）</p>
        <p><b>尾声</b></p>
        <p>这不是一篇函数式编程的劝学文，这是一篇讲 JavaScript 原型的文章。</p>
        <p>要展开 JS 原型的复杂背景，我们需要将镜头拉远，看到不同编程语言和编程范式下，如何组织数据和行为。从这种宏观的，对比的角度中，了解 prototype 看待数据和行为的方式、其优势和劣势在哪里。如此得到更全面的理解。
        </p>
        <p>若限制在 JS 原型里，只好把简单的链表操作，以复杂的连线图形式画出来。通过表面的复杂性，来安慰自己掌握到了足够坚实的知识。</p>
        <p>尽管在 JS/TS 中都没有明确的 Algebraic Data Type 代数数据类型和 typeclasses 特性。我们还有 react-hooks 和 vue-composition api
          这类能将数据和行为分开定义并自由组织的功能。</p>
        <p>最后，我们以一个关于 JS 原型的面试过程的 role playing 结束本文，当作一个内容总结和回顾。</p>
        <p>面试官：<b>谈谈你对 JS 原型和原型链的理解？</b></p>
        <p>候选人：JS 原型是指为其它对象提供共享属性访问的对象。在创建对象时，每个对象都包含一个隐式引用指向它的原型对象或者 null。</p>
        <p>原型也是对象，因此它也有自己的原型。这样构成一个原型链。</p>
        <p>面试官：<b>原型链有什么作用？</b></p>
        <p>候选人：在访问一个对象的属性时，实际上是在查询原型链。这个对象是原型链的第一个元素，先检查它是否包含属性名，如果包含则返回属性值，否则检查原型链上的第二个元素，以此类推。</p>
        <p>面试官：<b>那如何实现原型继承呢？</b></p>
        <p>候选人：有两种方式。一种是通过 Object.create 或者 Object.setPrototypeOf 显式继承另一个对象，将它设置为原型。</p>
        <p>另一种是通过 constructor 构造函数，在使用 new 关键字实例化时，会自动继承 constructor 的 prototype 对象，作为实例的原型。</p>
        <p>在 ES2015 中提供了 class 的风格，背后跟 constructor 工作方式一样，写起来更内聚一些。</p>
        <p>面试官：<b>ConstructorB 如何继承 ConstructorA ？</b></p>
        <p>候选人：JS 里的继承，是对象跟对象之间的继承。constructor 的主要用途是初始化对象的属性。</p>
        <p>因此，两个 Constructor 之间的继承，需要分开两个步骤。</p>
        <p>第一步是，编写新的 constructor，将两个 constructor 通过 call/apply 的方式，合并它们的属性初始化。按照超类优先的顺序进行。</p>
        <p>第二步是，取出超类和子类的原型对象，通过 Object.create/Object.setPrototypeOf 显式原型继承的方式，设置子类的原型为超类原型。</p>
        <p>整个过程手动编写起来比较繁琐，因此建议通过 ES2015 提供的 class 和 extends 关键字去完成继承，它们内置了上述两个步骤。</p>
        <p>面试官：<b>看起来你挺了解原型，你能说一个原型里比较少人知道的特性吗？</b></p>
        <p>候选人：在 ES3 时代，只有访问属性的 get 操作能触发对原型链的查找。在 ES5 时代，新增了 accessor property 访问器属性的概念。它可以定义属性的 getter/setter 操作。</p>
        <p>具有访问器属性 setter 操作的对象，作为另一个对象的原型的时候，设置属性的 set 操作，也能触发对原型链的查找。</p>
        <p>普通对象的 __proto__ 属性，其实就是在原型链查找出来的，它定义在 Object.prototype 对象上。</p>
        <p>面试官：很好，你被录取了，明天就来上班，我们有个基于 prototype.js 的老项目，很久没人能维护了。</p>
      </div>
    </div>
  </div> 
</article>