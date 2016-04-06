(function(){

var svg = document.getElementById('test_50_svg')
    , config = {
        startPoint: {
            x: 60
            , y: 30
        }
        , endPoint: {
            x: 380
            , y: 175
        }
        , controlPoint1: {
            x: 60
            , y: 175
        }
        , controlPoint2: {
            x: 380
            , y: 30
        }
        , rect: {
            width: 7
            , height: 7
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

function render(data){
    var arr;

    extend(config, data);
   
    arr = [
        '<path d="'
        , '    M' + config.startPoint.x + ' ' + config.startPoint.y
        , '    C' + [ config.controlPoint1.x, config.controlPoint1.y
                    , config.controlPoint2.x, config.controlPoint2.y
                    , config.endPoint.x, config.endPoint.y ].join(' ')
        , '    "'

        , '    style="'
        , '        fill:white;'
        , '        stroke:red;'
        , '        stroke-width:2'
        , '        "'
        , '     />'

        , '<path d="'
        , '    M' + config.startPoint.x + ' ' + config.startPoint.y 
            + ' L' + config.controlPoint1.x + ' ' + config.controlPoint1.y
        , '    M' + config.endPoint.x + ' ' + config.endPoint.y 
            + ' L' + config.controlPoint2.x + ' ' + config.controlPoint2.y
        , '    "'

        , '    style="'
        , '        fill:white;'
        , '        stroke:#98df8a;'
        , '        stroke-width:1'
        , '        "'
        , '     />'

        , '<rect data-role="start-point"'
            + ' width="' + config.rect.width + '" height="' + config.rect.height + '"'
            + ' x="' + ( config.startPoint.x - Math.floor( config.rect.width / 2 ) )+ '"' 
            + ' y="' + ( config.startPoint.y - Math.floor( config.rect.height / 2 ) )+ '"' 
        , '    style="'
        , '        fill: #8c564b;'
        , '        cursor:move;'
        , '        fill-opacity: 1;'
        , '        stroke-width: 1;'
        , '        stroke: rgb(0,0,0);'
        , '        stroke-opacity: 1;'
        , '    " />'

        , '<text'
            + ' x="' + ( config.startPoint.x + config.rect.width ) + '"' 
            + ' y="' + ( config.startPoint.y + config.rect.height )+ '"' 
        , '    style="'
        , '        fill: #8c564b;'
        , '        font-size: 12px;'
        , '        fill-opacity: 1;'
        , '        stroke-width: 0.5;'
        , '        stroke: #637939;'
        , '        stroke-opacity: 1;'
        , '        -webkit-user-select:none;'
        , '    ">'
        , '[ ' 
            + config.startPoint.x
            + ', '
            + config.startPoint.y
            + ' ]'
        , '</text>'

        , '<rect data-role="end-point"'
            + ' width="' + config.rect.width + '" height="' + config.rect.height + '"'
            + ' x="' + ( config.endPoint.x - Math.floor( config.rect.width / 2 ) )+ '"' 
            + ' y="' + ( config.endPoint.y - Math.floor( config.rect.height / 2 ) )+ '"' 
        , '    style="'
        , '        fill: #8c564b;'
        , '        cursor:move;'
        , '        fill-opacity: 1;'
        , '        stroke-width: 1;'
        , '        stroke: rgb(0,0,0);'
        , '        stroke-opacity: 1;'
        , '    " />'

        , '<text'
            + ' x="' + ( config.endPoint.x + config.rect.width ) + '"' 
            + ' y="' + ( config.endPoint.y + config.rect.height )+ '"' 
        , '    style="'
        , '        fill: #8c564b;'
        , '        font-size: 12px;'
        , '        fill-opacity: 1;'
        , '        stroke-width: 0.5;'
        , '        stroke: #637939;'
        , '        stroke-opacity: 1;'
        , '        -webkit-user-select:none;'
        , '    ">'
        , '[ ' 
            + config.endPoint.x
            + ', '
            + config.endPoint.y
            + ' ]'
        , '</text>'

        , '<rect data-role="start-control"'
            + ' width="' + config.rect.width + '" height="' + config.rect.height + '"'
            + ' x="' + ( config.controlPoint1.x - Math.floor( config.rect.width / 2 ) )+ '"' 
            + ' y="' + ( config.controlPoint1.y - Math.floor( config.rect.height / 2 ) )+ '"' 
        , '    style="'
        , '        fill: #8c564b;'
        , '        cursor:move;'
        , '        fill-opacity: 1;'
        , '        stroke-width: 1;'
        , '        stroke: rgb(0,0,0);'
        , '        stroke-opacity: 1;'
        , '    " />'

        , '<text'
            + ' x="' + ( config.controlPoint1.x + config.rect.width ) + '"' 
            + ' y="' + ( config.controlPoint1.y + config.rect.height )+ '"' 
        , '    style="'
        , '        fill: #8c564b;'
        , '        font-size: 12px;'
        , '        fill-opacity: 1;'
        , '        stroke-width: 0.5;'
        , '        stroke: #637939;'
        , '        stroke-opacity: 1;'
        , '        -webkit-user-select:none;'
        , '    ">'
        , '[ ' 
            + config.controlPoint1.x
            + ', '
            + config.controlPoint1.y
            + ' ]'
        , '</text>'

        , '<rect data-role="end-control"' 
            + ' width="' + config.rect.width + '" height="' + config.rect.height + '"'
            + ' x="' + ( config.controlPoint2.x - Math.floor( config.rect.width / 2 ) )+ '"' 
            + ' y="' + ( config.controlPoint2.y - Math.floor( config.rect.height / 2 ) )+ '"' 
        , '    style="'
        , '        fill: #8c564b;'
        , '        cursor:move;'
        , '        fill-opacity: 1;'
        , '        stroke-width: 1;'
        , '        stroke: rgb(0,0,0);'
        , '        stroke-opacity: 1;'
        , '    " />'

        , '<text'
            + ' x="' + ( config.controlPoint2.x + config.rect.width ) + '"' 
            + ' y="' + ( config.controlPoint2.y + config.rect.height )+ '"' 
        , '    style="'
        , '        fill: #8c564b;'
        , '        font-size: 12px;'
        , '        fill-opacity: 1;'
        , '        stroke-width: 0.5;'
        , '        stroke: #637939;'
        , '        stroke-opacity: 1;'
        , '        -webkit-user-select:none;'
        , '    ">'
        , '[ ' 
            + config.controlPoint2.x
            + ', '
            + config.controlPoint2.y
            + ' ]'
        , '</text>'


    ]; 

    svg.innerHTML = arr.join('');
}

render();

var dragging = 0;
var initialData = null
    , offsetData = null
    , role = null
    ;

function update(){
    switch(role){
        case 'start-control':
            render({
                controlPoint1: {
                    x: initialData.config.controlPoint1.x + offsetData.x
                    , y: initialData.config.controlPoint1.y + offsetData.y
                }
            });
            break;
        case 'end-control':
            render({
                controlPoint2: {
                    x: initialData.config.controlPoint2.x + offsetData.x
                    , y: initialData.config.controlPoint2.y + offsetData.y
                }
            });
            break;
        case 'start-point':
            render({
                startPoint: {
                    x: initialData.config.startPoint.x + offsetData.x
                    , y: initialData.config.startPoint.y + offsetData.y
                }
            });
            break;
        case 'end-point':
            render({
                endPoint: {
                    x: initialData.config.endPoint.x + offsetData.x
                    , y: initialData.config.endPoint.y + offsetData.y
                }
            });
            break;
    }
}

svg.addEventListener('mousedown', function(e){
    var target = e.target;
    if('rect' == target.tagName.toLowerCase()){
        dragging = 1; 
        role = target.getAttribute('data-role'); 
        initialData = {
            x: e.screenX
            , y: e.screenY
            , config: extend({}, config)
        };
    }
}, false);

svg.addEventListener('mouseup', function(e){
    dragging = 0; 
    initlalData = offsetData = null;
    role = null;
}, false);

svg.addEventListener('mousemove', function(e){
    var target = e.target;
    offsetData = {
        x: e.screenX - initialData.x
        , y: e.screenY - initialData.y
    }; 
    update();
}, false);


})();
