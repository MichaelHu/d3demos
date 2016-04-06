(function(){

var svg = document.getElementById('test_70_svg')
    , graph = {
        data: [
            {
                p: {
                    x: 60
                    , y: 200
                }
                , cp: {
                    x: 220
                    , y: 390
                }
            }
            , {
                p: {
                    x: 380
                    , y: 200
                }
                , cp: {
                    x: 198
                    , y: 70
                }
            }
            , {
                p: {
                    x: 700
                    , y: 200
                }
                , cp: {
                    x: 397
                    , y: 42
                }
            }

        ]

        , config: {

            showAuxiliaryLine: 1

            , showCoordinates: 0

            , smoothly: 1

            , rect: {
                width: 7
                , height: 7
                , style: {
                    p: {
                        fill: '#8c564b'
                        , cursor: 'move'
                        , 'fill-opacity': 1
                        , 'stroke-width': 1
                        , stroke: 'rgb(0,0,0)'
                        , 'stroke-opacity': 1
                    }

                    , cp: {
                        fill: '#fd8d3c'
                        , cursor: 'move'
                        , 'fill-opacity': 1
                        , 'stroke-width': 1
                        , stroke: 'rgb(0,0,0)'
                        , 'stroke-opacity': 1
                    }
                }
            }

            , curve: {
                style: {
                    fill: 'white'
                    , stroke: 'red'
                    , 'stroke-width':2
                }
            }

            , line: {
                style: {
                    'fill': 'white'
                    , 'stroke': '#98df8a'
                    , 'stroke-width': 1
                }
            }
            
            , text: {
                style: {
                    'fill': '#8c564b'
                    , 'font-size': '12px'
                    , 'fill-opacity': 1
                    , 'stroke-width': 0.5
                    , 'stroke': '#637939'
                    , 'stroke-opacity': 1
                    , '-webkit-user-select':'none'
                }
            }

        }
    }
    ;

function extend(dest, source){
    if(!source || !dest) return;
    for(var i in source){
        dest[i] = source[i]; 
    }
    return dest;
}

function clear() {
    svg.innerHTML = '';
}

function render(){

    var arr
        , points = graph.data
        , config = graph.config
        ;

    clear();
    drawCurve(points);

    if(!config.showAuxiliaryLine
        && !config.showCoordinates) 
        return;

    for(var i=0; i<points.length; i++){

        rect(points[i].p, i + 'p');

        if(config.showAuxiliaryLine) {
            if(config.smoothly) {
                if(i == 0) {
                    lineTo(points[i].p, points[i].cp);
                    rect(points[i].cp, i + 'cp');
                }
            }
            else {
                if(i < points.length - 1){
                    lineTo(points[i].p, points[i].cp);
                    rect(points[i].cp, i + 'cp');
                }
            }
        }

        if(config.showCoordinates){
            text(points[i].p);
            if(config.smoothly) {
                if(i == 0) {
                    text(points[i].cp);
                }
            }
            else {
                if(i < points.length - 1){
                    text(points[i].cp);
                }
            }
        }
    }

}

function rect(point, index) {

    var rect
        , config = graph.config.rect
        ;

    rect = [
        '<rect'
        , ' data-index="'
        , index
        , '" width="'
        , config.width 
        , '" height="'
        , config.height 
        , '" x="'
        , point.x - Math.floor(config.width / 2)
        , '" y="'
        , point.y - Math.floor(config.height / 2)
        , '" style="'
        , getStyle(/cp/.test(index) ? config.style.cp : config.style.p)
        , '" />'
    ];

    svg.innerHTML += rect.join('');

}

function text(point) {

    var text
        , rectConfig = graph.config.rect
        , config = graph.config.text
        ;

    text = [
        '<text'
        , ' x="'
        , point.x + rectConfig.width
        , '" y="'
        , point.y
        , '" style="'
        , getStyle(config.style)
        , '">[ '
        , point.x 
        , ', '
        , point.y
        , ' ]</text>'
    ];

    svg.innerHTML += text.join('');

}

function lineTo(from, to){

    var def
        ;

    def = [
        'M'
        , from.x
        , from.y
        , 'L'
        , to.x
        , to.y
    ];

    addPath(def, graph.config.line.style); 

}

function drawCurve(points) {

    if(points.length < 2) return;

    var def
        , smoothly = graph.config.smoothly
        , from = points[0]
        , to = points[1]
        ;

    def = [
        'M'
        , from.p.x
        , from.p.y
        , 'Q'
        , from.cp.x
        , from.cp.y
        , to.p.x
        , to.p.y
    ];

    for(var i=2; i<points.length; i++){

        from = points[i-1];
        to = points[i];

        if(smoothly) {
            def = def.concat([
                'T'
                , to.p.x
                , to.p.y
            ]);
        }
        else {
            def = def.concat([
                'Q'
                , from.cp.x
                , from.cp.y
                , to.p.x
                , to.p.y
            ]);
        }
    }

    addPath(def, graph.config.curve.style); 

}

function curveTo(from, to) {

    var def
        ;

    def = [
        'M'
        , from.p.x
        , from.p.y
        , 'C'
        , from.cp.x
        , from.cp.y
        , to.cp.x
        , to.cp.y
        , to.p.x
        , to.p.y
    ];

    addPath(def, graph.config.curve.style); 

}

function getStyle(style) {
    var arr = [];
    for(var i in style) {
        arr.push(i + ':' + style[i]);
    }
    return arr.join(';');
}

function addPath(def, style){
    var path
        ;

    path = [
        '<path'
        , ' d="'
        , def.join(' ')
        , '" style="'
        , getStyle(style)
        , '" />'
    ];

    svg.innerHTML += path.join('');
}



// Initial render
render();


(function(){

    var dragging = 0;
    var initialData = null
        , offsetData = null
        , index = null
        ;

    function update(){
        setPointConfig(index, {
            x: initialData.config.x + offsetData.x
            , y: initialData.config.y + offsetData.y
        });
        render();
    }

    function getPointConfig(index) {
        var result = index.match(/^(\d+)(p|cp)$/);
        var config = graph.data[result[1]][result[2]];
        return config;
    }

    function setPointConfig(index, config) {
        var result = index.match(/^(\d+)(p|cp)$/);
        graph.data[result[1]][result[2]] = config;
    }

    function removePointConfig(index) {
        var result = index.match(/^(\d+)(p|cp)$/);
        graph.data.splice(result[1], 1);
    }

    function addPointConfig(config) {
        graph.data.push(config);
    }

    svg.addEventListener('mousedown', function(e){

        var target = e.target;
        if('rect' == target.tagName.toLowerCase()){
            index = target.getAttribute('data-index'); 

            if(e.shiftKey){
                removePointConfig(index);
                render();
            }
            else {
                dragging = 1; 
                initialData = {
                    x: e.screenX
                    , y: e.screenY
                    , config: extend({}, getPointConfig(index))
                    , index: index
                };
            }
        }
        else if(e.altKey){
            var x = e.pageX -svg.offsetLeft
                , y = e.pageY - svg.offsetTop
                ;
            addPointConfig(
                {
                    p: {
                        x: x
                        , y: y 

                    }

                    , cp: {
                        x: x 
                        , y: y - 20 

                    }
                }
            );
            render();
        }

    }, false);

    svg.addEventListener('mouseup', function(e){
        dragging = 0; 
        initlalData = offsetData = null;
        index = null;
    }, false);

    svg.addEventListener('mousemove', function(e){
        var target = e.target;
        offsetData = {
            x: e.screenX - initialData.x
            , y: e.screenY - initialData.y
        }; 
        update();
    }, false);

    document.getElementById('test_70_checkbox_1').addEventListener('click', function(e){
        var target = e.target;
        if(target.checked) {
            graph.config.showAuxiliaryLine = 1;
        }
        else {
            graph.config.showAuxiliaryLine = 0;
        }
        render();
    });

    document.getElementById('test_70_checkbox_2').addEventListener('click', function(e){
        var target = e.target;
        if(target.checked) {
            graph.config.showCoordinates = 1;
        }
        else {
            graph.config.showCoordinates = 0;
        }
        render();
    });

    document.getElementById('test_70_checkbox_3').addEventListener('click', function(e){
        var target = e.target;
        if(target.checked) {
            graph.config.smoothly = 1;
        }
        else {
            graph.config.smoothly = 0;
        }
        render();
    });


})();




})();
