var cw = document.documentElement.clientWidth;
var ch = document.documentElement.clientHeight;

if (cw < ch) {
  var mapSrc = 'src/graphics/map5.svg';
  var vw = 1980;
  var vh = 1980;
  var lpw = cw;
  var lph = ch;
} else {
  var mapSrc = 'src/graphics/map7.svg';
  var vw = 1920;
  var vh = 1080;
  var lpw = vw;
  var lph = vh;
}


var MapObject = function() {
  this._init_map_object();
}

MapObject.prototype._init_map_object = function() {
  this.svgObject = $("<object />", {
    type: "image/svg+xml",
    'Data': mapSrc,
    id: 'map',
    // style: "width:"+(document.documentElement.clientWidth)+"px;height:"+(document.documentElement.clientHeight)+"px"
    style: "position:absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);width:"+vw+"px;height:"+vh+"px"
  }).appendTo('#container');
}

var MapView = function(map, panZoom) {
  this.map = map;
  this.map_items = [];
  this.panZoom = this.panZoom(); 
  this._init_map_elements();
}

MapView.prototype._init_map_elements = function() {
  var _this = this;
  this.map = document.getElementById("map");
  //get the SVG document inside the Object tag
  this.svgDoc = this.map.contentDocument;
  //access the svg
  this.mapSvg = this.svgDoc.getElementById("svgmap");
  //get svg properties
  this.map_bcr = this.map.getBoundingClientRect();
 
  //svg points
  var points = this.svgDoc.querySelectorAll('.point');
  //get the json data
  var posts = $.parseJSON($.ajax({
    url: 'http://www.michellekondou.me/wprestapi/index.php/wp-json/wp/v2/posts/?per_page=20',
    dataType: "json", 
    async: false
  }).responseText);
  //save the json data in an array
  var post_data = [];
  for(var i = 0;i<posts.length;i++) { 
    var post = posts[i];
    post_data.push(post); 
  }
  //create the map points
  for(var i = 0;i<points.length;i++) {
    var point = points[i];
    for(var post in post_data) {
      if(post_data[post].title.rendered === point.id) { 
        var content = post_data[post];
      }
    } 
    var rect = points[i].getBoundingClientRect();
    var tip = new Modal('tooltip', point.id);
    var pop = new Modal('popup', point.id);
    var page = new Modal('page', point.id);
    var point_item = new MapViewItem(point, rect, map, this.map_bcr, pop, tip, page, this.panZoom, content);
    this.map_items.push(point_item); 
  }

  //controls
  $('#zoom-in').on('click touchstart', function(event) {
      event.preventDefault();
      _this.panZoom.zoomIn();
  });
  $('#zoom-out').on('click touchstart', function(event) {
      event.preventDefault();
      _this.panZoom.zoomOut();
  });
  $('#reset').on('click touchstart', function(event) {
      event.preventDefault();
      _this.panZoom.resetZoom();
      _this.panZoom.fit();
      _this.panZoom.resize();
      _this.panZoom.center();
  });

  this._render_map_item();
 
}

MapView.prototype._render_map_item = function() {
  var _this = this; 
  /* Select the svg using d3 */
  $map = document.getElementById("map");
    //get the SVG document inside the Object tag
  var svgDoc = $map.contentDocument;
    //access the svg
  var mapSvg = svgDoc.getElementById("svgmap");

  var svg = d3.select(mapSvg);

  svg.selectAll('g, path, rect').on('mousewheel.zoom', function(d) {
    for(var p = 0; p < _this.map_items.length;p++) {
      var map_item = _this.map_items[p]; 
      //close both the tooltip and the popup if open
      map_item.tip.open = false;
      $(map_item.tip).removeClass('open');
      map_item.pop.open = false; 
      $(map_item.pop).removeClass('open');
    }
  });
  
}

MapView.prototype.panZoom = function() {

  var _this = this;
  this.map = document.getElementById("map");

  //custom events handler
  var eventsHandler;

  eventsHandler = {
    haltEventListeners: ['touchstart', 'touchend', 'touchmove', 'touchleave', 'touchcancel']
    , init: function(options) {
      var instance = options.instance
        , initialScale = 1
        , pannedX = 0
        , pannedY = 0

      // Init Hammer
      // Listen only for pointer and touch events
      this.hammer = Hammer(options.svgElement, {
        inputClass: Hammer.SUPPORT_POINTER_EVENTS ? Hammer.PointerEventInput : Hammer.TouchInput
      })

      // Enable pinch
      this.hammer.get('pinch').set({enable: true})

      // Handle double tap
      this.hammer.on('doubletap', function(ev){
        instance.zoomIn()
      })

      // Handle pan
      this.hammer.on('panstart panmove', function(ev){
        // On pan start reset panned variables
        if (ev.type === 'panstart') {
          pannedX = 0
          pannedY = 0
        }

        // Pan only the difference
        instance.panBy({x: ev.deltaX - pannedX, y: ev.deltaY - pannedY})
        pannedX = ev.deltaX
        pannedY = ev.deltaY
      })

      // Handle pinch
      this.hammer.on('pinchstart pinchmove', function(ev){
        // On pinch start remember initial zoom
        if (ev.type === 'pinchstart') {
          initialScale = instance.getZoom()
          instance.zoom(initialScale * ev.scale)
        }

        instance.zoom(initialScale * ev.scale)

      })

      // Prevent moving the page on some devices when panning over SVG
      options.svgElement.addEventListener('touchmove', function(e){ e.preventDefault(); });
    }

    , destroy: function(){
      this.hammer.destroy()
    }
  }

  //bafore pan
  var beforePan;
  beforePan = function(oldPan, newPan){
    var stopHorizontal = false
      , stopVertical = false
      , sizes = this.getSizes()
      , gutterWidth = lpw 
      , gutterHeight = lph 
        // Computed variables
      , leftLimit = -((sizes.viewBox.x + sizes.viewBox.width) * sizes.realZoom) + gutterWidth
      , rightLimit = sizes.width - gutterWidth - (sizes.viewBox.x * sizes.realZoom)
      , topLimit = -((sizes.viewBox.y + sizes.viewBox.height) * sizes.realZoom) + gutterHeight
      , bottomLimit = sizes.height - gutterHeight - (sizes.viewBox.y * sizes.realZoom)
   
      this.customPan = {}
      this.customPan.x = Math.max(leftLimit, Math.min(rightLimit, newPan.x))
      this.customPan.y = Math.max(topLimit, Math.min(bottomLimit, newPan.y))
      for(var p = 0; p < _this.map_items.length;p++) {
        var map_item = _this.map_items[p]; 
        //close both the tooltip and the popup if open
        map_item.tip.open = false;
        map_item.tip.style("opacity: 0");
        map_item.pop.open = false; 
        map_item.pop.style("opacity: 0"); 
    }

    return this.customPan;
  }
  var panZoomMap = svgPanZoom(this.map, {
    viewportSelector: '.panzoom'
    , panEnabled: true
    , zoomAbsolute: true
    , controlIconsEnabled: false
    , zoomEnabled: true
    , dblClickZoomEnabled: true
    , mouseWheelZoomEnabled: true
    , preventMouseEventsDefault: true
    , zoomScaleSensitivity: 0.2
    , minZoom: 1
    , maxZoom: 6
    , fit: true
    , contain: true
    , center: true
    , refreshRate: 'auto'
    , beforeZoom: function(){}
    , onZoom: function(){
     
    }
    , beforePan: beforePan
    // , beforePan: function(){}
    , onPan: function(){
        var panning = true; 
    }
    , customEventsHandler: eventsHandler

   //, eventsListenerElement: mapSvg
  });

  return panZoomMap;
}

function MapViewItem(point, rect, map, map_bcr, pop, tip, page, panZoom, content){
  MapView.call(this);
  this.point = point;
  this.rect = rect;
  this.map = map;
  this.map_bcr = map_bcr;
  this.pop = pop;
  this.tip = tip;
  this.page = page;
  this.panZoom = panZoom;
  this.content = content;
  this._init_map_elements();
  this._init_points();
  this.page_open();  
  this.page_close();
  this.pop_close();
  this._render();

  this._addListeners();
}

// // Create a MapViewItem.prototype object that inherits from MapView.prototype.
MapViewItem.prototype = Object.create(MapView.prototype);
// Set the "constructor" property to refer to MapViewItem
MapViewItem.prototype.constructor = MapViewItem;

MapViewItem.prototype._init_map_elements = function(){
  return;
}

/* ========================================================================
======= PUBLIC FUNCTIONS ==================================================
======================================================================== */
MapViewItem.prototype.page_open = function () {
  if(this.page.open) { return; }
  this.page.open = true;
  $(this.page.modal).addClass('open');
};

MapViewItem.prototype.page_close = function () {
  if(!this.page.open) { return; }
  this.page.open = false;
  $(this.page.modal).removeClass('open');
};

MapViewItem.prototype.pop_open = function () {
  if(this.pop.open) { return; }
  this.pop.open = true;
  $(this.pop.modal).addClass('open');
};

MapViewItem.prototype.pop_close = function () {
  if(!this.pop.open) { return; }
  this.pop.open = false;
  $(this.pop.modal).removeClass('open');
};

/* ========================================================================
======= INITIALIZATION FUNCTIONS ==========================================
======================================================================== */

MapViewItem.prototype._init_points = function(points){
 
var item = this;

this.point_x = this.rect.left;
this.point_y = this.rect.top; 

function customPanBy(amount){ // {x: 1, y: 2}
  var animationTime = 300 // ms
    , animationStepTime = 15 // one frame per 30 ms
    , animationSteps = animationTime / animationStepTime
    , animationStep = 0
    , intervalID = null
    , stepX = amount.x / animationSteps
    , stepY = amount.y / animationSteps

  intervalID = setInterval(function(){
    if (animationStep++ < animationSteps) {
      item.panZoom.panBy({x: stepX, y: stepY})
    } else {
      // Cancel interval
      clearInterval(intervalID)
    }
  }, animationStepTime)
}

$(item.point).css('cursor', 'pointer')
$(item.point).click(function(event){ 
  event.stopPropagation();
  
    item.panZoom.resetZoom();
    item.panZoom.resetPan();        
    item.panZoom.zoom(6); 
    var realZoom = item.panZoom.getSizes().realZoom;
        // console.log(this.getSizes().viewBox.width);
    item.panZoom.pan({     
      x: -(item.point_x*realZoom)+item.panZoom.getSizes().width/2.4,
      y: -(item.point_y*realZoom)+item.panZoom.getSizes().height/2.2    
    });
 
    item.panZoom.resize();

});

/* Select the svg using d3 */
$map = document.getElementById("map");
  //get the SVG document inside the Object tag
var svgDoc = $map.contentDocument;
  //access the svg
var mapSvg = svgDoc.getElementById("svgmap"); 
 
var svg = d3.select(mapSvg);

svg.select('#'+item.point.id)
.on('mouseover', function() {
 
  //only show the tooltip if popup not open 
  if(item.pop.open === false) {
    item.tip.open = true;
    item.tip.style({
      "left": ( $(this).offset().left + item.map_bcr.left )  + "px",
      "top": ( $(this).offset().top + item.map_bcr.top ) -50 + "px"
    }); 
    $(item.tip.modal).addClass('open');
  }
})
.on('mouseout', function(d) {
  //close the tooltip if open
  item.tip.open = false;
  $(item.tip.modal).removeClass('open');
});

svg.select('#'+item.point.id).on('click touchstart', function(d) {
  //close the tooltip if it's open

  item.tip.open = false;
  $(item.tip.modal).removeClass('open');
  //show the popup
  item.pop.open = true;
  item.pop.style({
    "left": "8%",
    "top": "50%",
    "transform": "translate(0, -50%)"
  }); 
  $(item.pop.modal).addClass('open');
});

svg.select('#'+item.point.id).on('dblclick', $.proxy(this.page_open, item));
$('#'+item.point.id +'-popup'+' .open_page').on('click touchstart', $.proxy(this.page_open, item));

}



/* ========================================================================
======= EVENT LISTENERS ===================================================
======================================================================== */
MapViewItem.prototype._addListeners = function(){
    var _this = this;

    $(this.page.modal).find('.close').on("click", $.proxy(this.page_close, _this));

    $(this.pop.modal).find('.close').on("click", $.proxy(this.pop_close, _this));


}

/* ========================================================================
======= RENDERING FUNCTIONS ===============================================
======================================================================== */
MapViewItem.prototype._render = function(){
    var _this = this;  
    nunjucks.configure('src/js/templates', { autoescape: true });
 
    _this.page.modal.html( 
      nunjucks.render('page.html', { 
        title: _this.content.acf.title_page,
        body:  _this.content.acf.color,
        open: _this.open
      }) 
    );
 
 }
/**
 * Create a Modal prototype
 */
var Modal = function(type, point){
  this.open = false;
  this.type = type;
  this.point = point;
  this.init();
  this.render_modal();
}

Modal.prototype.init = function(){
  nunjucks.configure('src/js/templates', { autoescape: true });

  if(this.type == "popup") {
    this.modal = $("<div />", {
      "class": "map-popover popup left",
      "id": this.point + "-popup" 
    }).appendTo('body');
  } else if(this.type == "tooltip"){
     this.open = true;
    this.modal = $("<div />", {
      "class": "map-popover tooltip top",
      "id": this.point + "-tooltip"
    }).appendTo('body');
  } else if(this.type == "page") {
    this.open = true;
    this.modal = $("<div />", {
      "class": "overlay",
      "id": this.point + "-page"
    }).appendTo('body');
  } 
}

Modal.prototype.style = function(styles){
 
  if(this.open === false) {
    return this.modal.attr("style", "opacity:0");
  } else {
    if(isObject(styles)){
      //if returned value is object then map the object properties
      return this.modal.attr("style", _map(styles));
    }else{
      //else return string
      return this.modal.attr("style", styles);
    }
  }
} 

Modal.prototype.render_modal = function(){
  nunjucks.configure('src/js/templates', { autoescape: true });
 
  if(this.type == "tooltip") {
    this.modal.html("<div class='arrow'></div><h3 class='map-popover-title'>"+this.point+"</h3>");
  } else if(this.type == "popup"){
    this.modal.html("<div class='arrow'></div>  <button class='close'>X</button><h3 class='map-popover-title'><strong>"+this.point+"</strong></h3><h3 class='map-popover-title'>" + nunjucks.renderString('Μικρό κείμενο και εικόνα για {{ username }}', { username: this.point }) + ". <br><br><button class='open_page'>Ανοίξτε το φύλο εργασίας</button></h3>");
  }  
}

window.onload = function() {
  var modal = new Modal();
  var mapView = new MapView();
}





