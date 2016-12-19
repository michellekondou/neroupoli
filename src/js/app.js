var cw = document.documentElement.clientWidth;
var ch = document.documentElement.clientHeight;

if (cw < ch) {
  var mapSrc = 'src/graphics/map5.svg';
  var vw = 1980;
  var vh = 1980;
  var lpw = cw;
  var lph = ch;
} else {
  if (cw < 1281) {
    var mapSrc = 'src/graphics/map-1280.svg';
    var vw = 1280;
    var vh = 768;
    var lpw = vw;
    var lph = vh;
  } else if (cw > 1280) {
    var mapSrc = 'src/graphics/map7.svg';
    var vw = 1920;
    var vh = 1080;
    var lpw = vw;
    var lph = vh;
  }
}


var MapObject = function() {
  this._init_map_object();
}

MapObject.prototype._init_map_object = function() {
  this.svgObject = $("<object />", {
    type: "image/svg+xml",
    'Data': mapSrc,
    id: 'map',
    style: "position:absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);width:"+vw+"px;height:"+vh+"px"
  }).appendTo('#container');
}

var MapView = function(map) {
  this.map = map;
  this.map_items = [];
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
    var point_item = new MapViewItem(point, rect, map, this.map_bcr, pop, tip, page, content);
    this.map_items.push(point_item); 
  }
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

  var viewEl =  svgDoc.getElementById("view");
 
  var svg = d3.select(mapSvg),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    centered;

  var view = d3.select(viewEl)
    .attr("class", "view")
    .attr("x", 0.5)
    .attr("y", 0.5)
    .attr("width", width - 1)
    .attr("height", height - 1)
    .style("pointer-events", "all");
 
 function zoomed() {
     //close both the tooltip and the popup if open
    for(var p = 0; p < _this.map_items.length;p++) {
      var map_item = _this.map_items[p]; 
      map_item.tip.open = false;
      $(map_item.tip.modal).removeClass('open');
      map_item.pop.open = false; 
      $(map_item.pop.modal).removeClass('open');
    }

    //change cursor according to mouse event
    if (d3.event.sourceEvent !== null) {
      if (d3.event.sourceEvent.deltaY < 0) {
        svg.style("cursor", "zoom-in");
        //if mobile
        if (cw < 1024) {
          var duration = 0;
        } else {
          var duration = 250;
        }
      } else if (d3.event.sourceEvent.deltaY > 0){
        svg.style("cursor", "zoom-out");
        //if mobile
        if (cw < 1024) {
          var duration = 0;
        } else {
          var duration = 250;
        }
      }
      if (d3.event.sourceEvent.movementX != 0 ||  d3.event.sourceEvent.movementY != 0) {
        svg.style("cursor", "move");
        var duration = 0;
      }
    }

    //handle zoom
    view.transition()
        .duration(duration)
        .attr("transform", "translate(" + d3.event.transform.x + "," + d3.event.transform.y + ")" + " scale(" + d3.event.transform.k + ")");

  }

  //controls
  function resetted() {
    svg.transition()
    .duration(500)
    .call(zoom.transform, d3.zoomIdentity);
  }

  function zoomIn() {
    svg.transition()
    .duration(250)
    .call(zoom.scaleBy, 2); 
  }

  function zoomOut() {
    svg.transition()
    .duration(250)
    .call(zoom.scaleBy, 0.5); 
  }

  //return cursor to default between zoom events
  function zoomEnd(){
    svg.transition().delay(1500).style("cursor", "default");
  }

  var zoom = d3.zoom()
      .scaleExtent([1, 10])
      .translateExtent([[0, 0], [width, height]])
      .on("zoom", zoomed)
      .on("zoom.end", zoomEnd);
 

  svg.call(zoom); 
  
  $("#reset").on("mousedown touchstart", resetted);

  $("#zoom-in").on("mousedown touchstart", zoomIn);

  $("#zoom-out").on("mousedown touchstart", zoomOut);

  svg.on('mousewheel.zoom', function(d) {
 
    for(var p = 0; p < _this.map_items.length;p++) {
      var map_item = _this.map_items[p]; 
      //close both the tooltip and the popup if open
      map_item.tip.open = false;
      $(map_item.tip.modal).removeClass('open');
      map_item.pop.open = false; 
      $(map_item.pop.modal).removeClass('open');

    }

  });
  
}

function MapViewItem(point, rect, map, map_bcr, pop, tip, page, content){
  MapView.call(this);
  this.point = point;
  this.rect = rect;
  this.map = map;
  this.map_bcr = map_bcr;
  this.pop = pop;
  this.tip = tip;
  this.page = page;
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
 

/* Select the svg using d3 */
$map = document.getElementById("map");
  //get the SVG document inside the Object tag
var svgDoc = $map.contentDocument;
  //access the svg
var mapSvg = svgDoc.getElementById("svgmap"); 
  var viewEl =  svgDoc.getElementById("view"); 
var svg = d3.select(mapSvg),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    centered;

  var view = d3.select(viewEl)
    .attr("class", "view")
    .attr("x", 0.5)
    .attr("y", 0.5)
    .attr("width", width - 1)
    .attr("height", height - 1);
 
 function zoomed() {
    view.transition()
        .duration(50)
        .attr("transform", "translate(" + d3.event.transform.x + "," + d3.event.transform.y + ")" + " scale(" + d3.event.transform.k + ")");
  }

  var zoom = d3.zoom()
      .scaleExtent([1, 10])
      .translateExtent([[0, 0], [width, height]])
      .on("zoom", zoomed);

$(item.point).css('cursor', 'pointer');

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
  //center and zoom point
  var t = d3.zoomIdentity.translate(width / 2.4, height / 2.2).scale(10).translate(-item.point_x, -item.point_y);
  svg.transition().duration(150).call(zoom.transform, t);
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
  console.log(item.pop);
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





