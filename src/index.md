<script src="../common/d3/d3.min.js"></script>
<style type="text/css">
.test::before {
    display: block;
    text-align: right;
    padding-right: 10px;
    content: 'testing area';
    color: #bbb;
}

.test {
    margin: 15px 0;
    cursor: pointer;
    background-color: #eee;
    border-radius: 5px;
}

.test p {
    margin: 0;
    padding: 0 10px;
    font-size: 16px;
    line-height: 30px;
}
</style>

# D3 - Data-Driven Documents


D3.js is a JavaScript library for manipulating documents based on data. D3 helps you bring data to life using HTML, SVG, and CSS. D3’s emphasis on web standards gives you the full capabilities of modern browsers without tying yourself to a proprietary framework, combining powerful visualization components and a data-driven approach to DOM manipulation.

<https://d3js.org>

D3.js 是个Javascript库，用于操作`基于数据的文档`。

使用`HTML, SVG, 以及CSS技术`，将数据带入生活。专注于Web标准，使用现代浏览器的全部能力。

D3.js不是一个兼容层，如果浏览器不支持标准，也就无能为力了。



## 一、介绍

D3允许你将数据绑定至DOM，然后在DOM上展现数据驱动的各类转变。

举个例子，用D3将一个数字组成的数组生成HTML Table；或者使用同样的数据创建一个交互性强的SVG柱状图。

D3封装了`SVG的创建、CSS应用、样式变换和过渡`等功能，提供了各类便利方案，使用D3可以方便、快速的创建各类图形效果。



## 二、选择器功能

现代浏览器，使用`W3C Selectors API`，旧浏览器则使用`Sizzle`提供的功能。了解jQuery或者Prototype的人会觉得D3提供的Selector非常熟悉。

    d3.select('#test_1').on('click', function(){
        d3.selectAll('#test_1 p').style('color', 'red');
    });

点击以下阴影区，段落文本颜色发生变化，Selector API和jQuery很相似。

<div id="test_1" class="test">
<p>段落1</p>
<p>段落2</p>
<p>段落3</p>
<p>段落4</p>
</div>
<script>

d3.select('#test_1').on('click', function(){
    d3.selectAll('#test_1 p').style('color', 'red');
});

</script>





## 三、动态属性

在D3中，css style, DOM attributes以及其它属性（properties）可以用`数据函数`来表示。别看这挺简单，但这种扩展性带来的好处非常强大。比如`d3.geo.path`函数，将geographic坐标转换成SVG路径数据。D3提供了很多内建的可复用函数以及函数工厂，比如用于面积(area)、直线(line)、饼图(pie charts)的图形原语。




### 3.1 例子：随机颜色

点击以下阴影区域获取随机文本颜色：

<div id="test_2" class="test">
<p>随机颜色1</p>
<p>随机颜色2</p>
<p>随机颜色3</p>
</div>
<script>

d3.select('#test_2').on('click', function(){
    d3.selectAll('#test_2 p').style('color', function(){
        return 'hsl(' + Math.random() * 360 + ',100%,50%)';
    });
});

</script>

    d3.select('#test_2').on('click', function(){
        d3.selectAll('#test_2 p').style('color', function(){
            return 'hsl(' + Math.random() * 360 + ',100%,50%)';
        });
    });









### 3.2 例子：交替背景颜色

点击以下阴影区域交替设置奇偶节点的灰色背景色。

<div id="test_3" class="test">
<p>第1行</p>
<p>第2行</p>
<p>第3行</p>
<p>第4行</p>
<p>第5行</p>
</div>
<script>

var _switch = 1;
d3.select('#test_3').on('click', function(){
    _switch = 1 - _switch;
    d3.selectAll('#test_3 p').style('background-color', function(d, i){
        var oddColor = _switch ? '#fff' : '#eee';
        var evenColor = _switch ? '#eee' : '#fff';
        console.log(d, i);
        return i % 2 ? evenColor : oddColor;
    });
});

</script>


    var _switch = 1;
    d3.select('#test_3').on('click', function(){
        _switch = 1 - _switch;
        d3.selectAll('#test_3 p').style('background-color', function(d, i){
            var oddColor = _switch ? '#fff' : '#eee';
            var evenColor = _switch ? '#eee' : '#fff';
            console.log(d, i);
            return i % 2 ? evenColor : oddColor;
        });
    });

此时打开console，可以查看到数据绑定的一些信息：

    undefined 0
    undefined 1
    undefined 2
    undefined 3
    undefined 4

1. 每一个DOM节点，由于未进行数据绑定，所以数据值都为`undefined`
2. 节点的索引值，`下标从0开始`(zero-beased)






### 3.3 例子：递增文本字号

点击以下阴影区域，设置每行文本的字体大小：

<div id="test_4" class="test">
<p>第1行文本</p>
<p>第2行文本</p>
<p>第3行文本</p>
<p>第4行文本</p>
<p>第5行文本</p>
<p>第6行文本</p>
</div>
<script>

d3.select('#test_4').on('click', function(){
    d3.selectAll('#test_4 p')
        .data([12, 14, 16, 18, 20, 22])
        .style('font-size', function(d){
            return d + 'px';
    });
});

</script>


    d3.select('#test_4').on('click', function(){
        d3.selectAll('#test_4 p')
            .data([12, 14, 16, 18, 20, 22])
            .style('font-size', function(d){
                return d + 'px';
        });
    });

使用`data方法`进行数据绑定，动态属性值的计算通常和绑定值相关。






## 四、进入&退出选择器

> 使用D3的`enter`, `exit`选择器，可以为刚输入的数据创建新节点，以及移除不再需要的节点。

紧跟selection后面的data方法，会将数组内的数据和selection中的节点一一对应起来。如果节点比提供的数据少，那么额外数据将组成输入选择区(enter selection)，可以在输入选择区中使用append方法添加节点。

如果节点比提供的数据多，那么额外的节点将组成退出选择区，可以在调用exit方法后调用remove方法移除无用节点。

一个数据驱动过程分为三个部分，update, enter, exit：

* update阶段更新已有节点的状态
* enter阶段添加新节点并初始化状态
* exit阶段对无用节点（无数据对应的节点）进行移除操作

enter选区和exit选区`总是在update阶段定义`。enter选区只定义了以下操作：append, insert, select以及call，在对enter选区做更新前需要使用这些操作先进行实例化操作。


比如一个常用的操作过程如下：

    var update_sel = svg.selectAll("circle").data(data)
    update_sel.attr(/* operate on old elements only */)
    update_sel.enter().append("circle").attr(/* operate on new elements only */)
    update_sel.attr(/* operate on old and new elements */)
    update_sel.exit().remove() /* complete the enter-update-exit pattern */


`关于Update Selection`：

> The result of the data method is the `update selection`; this represents the selected DOM elements that were successfully bound to the specified data elements. The update selection `also contains a reference to the enter and exit selections`, for adding and removing nodes in correspondence with data.

selection.data()返回update selection，该selection同时包含enter选区和exit选区，`只能在update selection对象上使用enter()和exit()`。

以下例子，演示这些选择器的使用，按序号点击：


<style type="text/css">
#test_5_btn_container {
    margin: 15px 0;
}
</style>
<div id="test_5" class="test">
<p>第1行已有文本</p>
<p>第2行已有文本</p>
<p>第3行已有文本</p>
</div>
<div id="test_5_btn_container">
<button>1. update</button>
<button>2. enter</button>
<button>3. update</button>
<button>4. exit</button>
<button>5. remove all (update & exit)</button>
</div>
<script>

(function(){

var btnContainer = d3.select('#test_5_btn_container');
var p = null;

// 1. update
btnContainer.select('button:nth-child(1)')
    .on('click', function(){
        p = d3.select('#test_5')
            .selectAll('p')
            .data([12, 14, 16, 18, 20, 22])
            .style('font-size', function(d){
                return d + 'px';
            })
        ;
    });

// 2. enter
btnContainer.select('button:nth-child(2)')
    .on('click', function(){
        if(!p) return;
        p.enter()
            .append('p')
            .text(function(d){
                return 'I\'m number ' + d + '!';
            })
        ;
    });

// 3. update
btnContainer.select('button:nth-child(3)')
    .on('click', function(){
        if(!p) return;
        p
            .style('font-size', function(d){
                return d + 'px';
            })
        ;
    });

// 4. exit
btnContainer.select('button:nth-child(4)')
    .on('click', function(){
        if(!p) return;
        p
            .exit()
            .remove();
        ;
    });

// 5. remove all: update & exit
btnContainer.select('button:nth-child(5)')
    .on('click', function(){
        if(!p) return;
        p.data([])      // 清空数据绑定，不能不传参数，需要传空数组
            .exit()
            .remove();
        ;
    });

})();

</script>

    (function(){

    var btnContainer = d3.select('#test_5_btn_container');
    var p = null;

    // 1. update
    btnContainer.select('button:nth-child(1)')
        .on('click', function(){
            p = d3.select('#test_5')
                .selectAll('p')
                .data([12, 14, 16, 18, 20, 22])
                .style('font-size', function(d){
                    return d + 'px';
                })
            ;
        });

    // 2. enter
    btnContainer.select('button:nth-child(2)')
        .on('click', function(){
            if(!p) return;
            p.enter()
                .append('p')
                .text(function(d){
                    return 'I\'m number ' + d + '!';
                })
            ;
        });

    // 3. update
    btnContainer.select('button:nth-child(3)')
        .on('click', function(){
            if(!p) return;
            p
                .style('font-size', function(d){
                    return d + 'px';
                })
            ;
        });

    // 4. exit
    btnContainer.select('button:nth-child(4)')
        .on('click', function(){
            if(!p) return;
            p
                .exit()
                .remove();
            ;
        });

    // 5. remove all: update & exit
    btnContainer.select('button:nth-child(5)')
        .on('click', function(){
            if(!p) return;
            p.data([])      // 清空数据绑定，不能不传参数，需要传空数组
                .exit()
                .remove();
            ;
        });

    })();





## 五、变换( transformation )

使用CSS3 Transformation




## 六、过渡( transitions )

提供了封装，支持补间( tweening )动画，允许使用各类渐变函数(elastic, cubic-in-out, linear等)。



### 6.1 例子：背景色、文字颜色过渡动画

<div id="test_6" class="test">
<p>点击我，你将会看到看到</p>
<p>1. 背景色变黑</p>
<p>2. 文字颜色变白</p>
</div>
<script>

d3.select('#test_6').on('click', function(){
    d3.select('#test_6').transition()
        .style('background-color', 'black')
        .style('color', 'white');
});

</script>



    d3.select('#test_6').on('click', function(){
        d3.select('#test_6').transition()
            .style('background-color', 'black')
            .style('color', 'white');
    });


### 6.2 例子：随机色球分布


<div id="test_7" class="test">
<p>点击查看随机分布的彩色球体，可多次点击</p>
<svg></svg>
</div>
<style type="text/css">
#test_7 svg {
    height: 30px;
    width: 100%;
    background-color: #eee;
}
</style>
<script>

(function(){

function random(min, max){
    return min + Math.random() * ( max - min );
}

function randomColor() {
    return [
        'hsl(' + 360 * Math.random()
        , 100 * Math.random() + '%'
        , 100 * Math.random() + '%)'
        ].join(',');
}

function randomData(min, max, size) {
    var data = [];
    for ( var i=0; i<size; i++ ) {
        data.push(random(min, max));
    }
    return data;
}


var initial = 1;

d3.select('#test_7').on('click', function(){
    var scale = 0.5;
    var svg = d3.select('#test_7 svg');
    var tip = d3.select('#test_7 p');
    var selection;
    var w = parseInt(d3.select('#test_7').style('width'));

    tip.style('display', 'none');

    function set(selection) {
        selection
            .attr('r', function(d) { return random(50, 100) * scale; })
            .attr('cx', function(d) { return random(100, w - 100); })
            .attr('cy', function(d) { return random(100, 300); })
            .style('fill', function() { return randomColor(); })
        ;
    }

    if(initial) {
        svg
            .transition()
            .duration(750)
            .style({
                height: '400px'
            })
        ;

        selection =
            svg
            .selectAll('circle')
            .data(randomData(30, 150, 20))
            .enter()
            .append('circle')
        ;

        initial = 0;
    }
    else {
        selection =
            svg
            .selectAll('circle')
            .transition()
            .duration(750)
            .delay(function(d, i) { return i * 100 * Math.random(); })
        ;
    }

    set(selection);
});

})();

</script>


    (function(){

    function random(min, max){
        return min + Math.random() * ( max - min );
    }

    function randomColor() {
        return [
            'hsl(' + 360 * Math.random()
            , 100 * Math.random() + '%'
            , 100 * Math.random() + '%)'
            ].join(',');
    }

    function randomData(min, max, size) {
        var data = [];
        for ( var i=0; i<size; i++ ) {
            data.push(random(min, max));
        }
        return data;
    }


    var initial = 1;

    d3.select('#test_7').on('click', function(){
        var scale = 0.5;
        var svg = d3.select('#test_7 svg');
        var selection;
        var w = parseInt(d3.select('#test_7').style('width'));

        function set(selection) {
            selection
                .attr('r', function(d) { return random(50, 100) * scale; })
                .attr('cx', function(d) { return random(100, w - 100); })
                .attr('cy', function(d) { return random(100, 300); })
                .style('fill', function() { return randomColor(); })
            ;
        }

        if(initial) {
            svg
                .transition()
                .duration(750)
                .style({
                    height: '400px'
                })
            ;

            selection =
                svg
                .selectAll('circle')
                .data(randomData(30, 150, 20))
                .enter()
                .append('circle')
            ;

            initial = 0;
        }
        else {
            selection =
                svg
                .selectAll('circle')
                .transition()
                .duration(750)
                .delay(function(d, i) { return i * 100 * Math.random(); })
            ;
        }

        set(selection);
    });

    })();



### 6.3 
