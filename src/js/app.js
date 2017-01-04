var cw = document.documentElement.clientWidth;
var ch = document.documentElement.clientHeight;

if (cw < ch) {
  var mapSrc = 'src/graphics/map-1229.svg';
  var vw = 1229;
  var vh = 1229;
  var lpw = vw; //stands for limit pan
  var lph = vh;
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
        var post_id = post_data[post].id;
      }
    } 
    var rect = points[i].getBoundingClientRect();
    var tip = new Modal('tooltip', point.id);
    var pop = new Modal('popup', point.id);
    var page = new Modal('page', point.id);
    var point_item = new MapViewItem(point, rect, map, this.map_bcr, pop, tip, page, content, post_id);
    this.map_items.push(point_item); 
  }
  //setup all map events, zoom, pan etc
  this._render_map();
 
}

MapView.prototype._render_map = function() {
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

  //return cursor to default between zoom events
  function zoomEnd(){
    svg.transition().delay(1500).style("cursor", "default");
  }
 
  var svgWidth = d3.select(mapSvg).attr("width");
  var svgHeight = d3.select(mapSvg).attr("height");
  if (cw < ch) {
    if (cw < 480) {
      var t = -width/3.5, //top
          l = -height/12, //left
          b = width+width/3.5, //bottom
          r = height+height/12; //right
    } else {
      var t = -width/5.5, //top
          l = -height/12, //left
          b = width+width/5.5, //bottom
          r = height+height/12; //rights
    }
  } else {
    var t = 0,
        l = 0,
        b = width,
        r = height;
  }

  var zoom = d3.zoom()
      .scaleExtent([1, 10])
      .translateExtent([ [t, l], [b, r] ])
      .on("zoom", zoomed)
      .on("zoom.end", zoomEnd);
 

  svg.call(zoom); 

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
  $("#reset").on("mousedown", resetted);

  $("#zoom-in").on("mousedown", zoomIn);

  $("#zoom-out").on("mousedown", zoomOut);

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

function MapViewItem(point, rect, map, map_bcr, pop, tip, page, content, post_id){
  MapView.call(this);
  this.point = point;
  this.rect = rect;
  this.map = map;
  this.map_bcr = map_bcr;
  this.pop = pop;
  this.tip = tip;
  this.page = page;
  this.content = content;
  this.post_id = post_id;
  this._init_map_elements();
  this._init_points();
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
  $('.map-loader').css('display','block'); 
  //load content on page open to be able to refresh forms
  var post = $.parseJSON($.ajax({
    url: 'http://www.michellekondou.me/wprestapi/index.php/wp-json/wp/v2/posts/'+this.post_id,
    dataType: "json", 
    async: false,
    success: function(data){
      $('.map-loader').css('display','none'); 
    }
  }).responseText);

  nunjucks.configure('src/js/templates', { autoescape: false });
  
  this.page.modal.find('.page-content').html(

    nunjucks.render('page.html', { 
      title: this.content,
      text: this.content,
      quiz:  post,
      open: this.open
    }) 
  );

  //handle card content
  var cards = this.page.modal.find('#cards');
 
  $(cards).cycle({ 
    fx:     'fade', 
    speed:  'fast', 
    timeout: 0, 
    next:   '.next', 
    prev:   '.previous' 
  });

//form handler TODO put this stuff in its own function
// get all data in form and return object
function getFormData(form) {
  var form_id = form.attr('id')
  var elements = document.getElementById(form_id).elements; // all form elements
  var fields = Object.keys(elements).map(function(k) {
    if(elements[k].name !== undefined) {
      return elements[k].name;
    // special case for Edge's html collection
    }else if(elements[k].length > 0){
      return elements[k].item(0).name;
    }
  }).filter(function(item, pos, self) {
    return self.indexOf(item) == pos && item;
  });
  var data = {};
  fields.forEach(function(k){
    data[k] = elements[k].value;
    if(elements[k].type === "checkbox"){
      data[k] = elements[k].checked;
    // special case for Edge's html collection
    }else if(elements[k].length){
      for(var i = 0; i < elements[k].length; i++){
        if(elements[k].item(i).checked){
          data[k] = elements[k].item(i).value;
        }
      }
    }
  });
  console.log(data);
  return data;
}
 

$(function() {
  $('.multiple-choice input, .likert input').on('change', function(){
    $('.loader.quiz').css('display','block');        
    var form = $(this).closest("form");
    var data = getFormData(form);
    console.log(form.attr('id'));
    var url = form.attr('action');
    $.ajax({
      type: "POST",
      url: url,
      data: data,
      success: function(data){
        $('.loader').css('display','none'); 
        $(form).find('input').attr("disabled", true);  
        $(form).addClass('submitted');
        $(form).siblings(".thankyou_message").css('display','block');
        return; 
      }
    });            
  });

  $('.submit').on('click', function() {
    $('.loader.quiz').css('display','block');        
    var form = $('.checkbox-quiz');
    var data = getFormData(form);
    console.log(form.attr('id'));
    var url = form.attr('action');
    $.ajax({
      type: "POST",
      url: url,
      data: data,
      success: function(data){
        $('.loader').css('display','none'); 
        $(form).find('input').attr("disabled", true);
        $('.submit').addClass('none');  
        $(form).addClass('submitted');
        $(form).siblings(".thankyou_message").css('display','block');
        //return; 
      }
    });            
  });

});

//sortable quiz

var rowSize = 60; // item height
var container = document.querySelector(".sortable-container");
var listItems = Array.from(document.querySelectorAll(".list-item")); // Array of elements
var sortables = listItems.map(Sortable); // Array of sortables
var total = sortables.length;

TweenLite.to(container, 0.5, {  
  autoAlpha: 1,
  height: total*60+20
});

//helper functions
// Changes an elements's position in array
function arrayMove(array, from, to) {
  array.splice(to, 0, array.splice(from, 1)[0]);
}

// Clamps a value to a min/max
function clamp(value, a, b) {
  return value < a ? a : (value > b ? b : value);
}

function changeIndex(item, to) {

  // Change position in array
  arrayMove(sortables, item.index, to);

  // Change element's position in DOM. Not always necessary. Just showing how.
  if (to === total - 1) {
    container.appendChild(item.element);
  } else {
    var i = item.index > to ? to : to + 1;
    container.insertBefore(item.element, container.children[i]);
  }

  // Set index for each sortable
  //sortables.forEach((sortable, index) => sortable.setIndex(index));
  sortables.forEach(function(sortable, index){
    sortable.setIndex(index);
  })
}


function Sortable(element, index) {

  var content = element.querySelector(".item-content");
  var order = element.querySelector(".order");
  var rightOrder = element.querySelector(".right-order");

  var animation = TweenLite.to(content, 0.3, {
    boxShadow: "rgba(0,0,0,0.2) 0px 16px 32px 0px",
    force3D: true,
    scale: 1,
    paused: true
  });

  var dragger = new Draggable(element, {
    onDragStart: downAction,
    onRelease: upAction,
    onDrag: dragAction,
    cursor: "inherit",
    type: "y"
  });

  // Public properties and methods
  var sortable = {
    dragger: dragger,
    element: element,
    index: index,
    setIndex: setIndex
  };

  TweenLite.set(element, {
    y: index * rowSize
  });

  function setIndex(index) {

    sortable.index = index;
    order.textContent = index + 1;

    // Don't layout if you're dragging
    if (!dragger.isDragging) {
      layout();
    }
  }

  function downAction() {
    animation.play();
    this.update();
  }

  function dragAction() {

    // Calculate the current index based on element's position
    var index = clamp(Math.round(this.y / rowSize), 0, total - 1);

    if (index !== sortable.index) {
      changeIndex(sortable, index);
    }
    console.log(sortable.index);
  }

  function upAction() {
    animation.reverse();
    layout();
    correctOrder();
  }

  function layout() {
    TweenLite.to(element, 0.3, {
      y: sortable.index * rowSize
    });
  }
 
  function correctOrder() {
    if(order.textContent === rightOrder.textContent) {
      console.log('right position');
    }
  }

  return sortable;
}


function reOrder() { 
  
  var rightOrder = $(element).find(".right-order");

  TweenLite.set(element, {
    y: rightOrder.textContent * rowSize
  });

}

$('#resort').on('click', function(){
    reOrder('.list-item');
});


};

MapViewItem.prototype.page_close = function () {
  if(!this.page.open) { return; }
  this.page.open = false;
  $(this.page.modal).removeClass('open');
  console.log(this);
};

MapViewItem.prototype.pop_open = function () {
  if(this.pop.open) { return; }
  this.pop.open = true;
  $(this.pop.modal).addClass('open');
    console.log('close1');
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

console.log(item);


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

svg.select('#'+item.point.id).on('click', function(d) {
   d3.event.stopPropagation(); 
  //center and zoom point
  var t = d3.zoomIdentity.translate(width / 2.4, height / 2.2).scale(10).translate(-item.point_x, -item.point_y);
  svg.transition().duration(150).call(zoom.transform, t);
  //close the tooltip if it's open
  item.tip.open = false;
  $(item.tip.modal).removeClass('open');
  //show the popup
  item.pop.open = true;
  $(item.pop.modal).addClass('open');
 
});

svg.select('#'+item.point.id).on('dblclick', $.proxy(this.page_open, item));

$('#'+item.point.id +'-popup'+' .open_page').on('click', $.proxy(this.page_open, item));




}



/* ========================================================================
======= EVENT LISTENERS ===================================================
======================================================================== */
MapViewItem.prototype._addListeners = function(){
    var _this = this;

    $(this.page.modal).find('.close').on("click", $.proxy(this.page_close, this)); 
    $(this.page.modal).find('.next').on("click", function(){
      console.log('clicked next');
    }); 
    $(this.pop.modal).find('.close').on("click", $.proxy(this.pop_close, _this));

}

/* ========================================================================
======= RENDERING FUNCTIONS ===============================================
======================================================================== */
MapViewItem.prototype._render = function(){
    var _this = this;  

    //load static parts of the page, tools, next
    nunjucks.configure('src/js/templates', { autoescape: false });
    
    _this.page.modal.html(
      nunjucks.render('page-container.html', { 
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
    this.open = false;
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





