var cw = document.documentElement.clientWidth;
var ch = document.documentElement.clientHeight;

if (cw < ch) {
  var mapSrc = 'src/graphics/map-1.3-v1.svg';
  var vw = 1229;
  var vh = 1229;
  var lpw = vw; //stands for limit pan
  var lph = vh;
} else {
  if (cw <= 1366) {
    var mapSrc = 'src/graphics/map-1.4-1366-v1.svg';
    var vw = 1366;
    var vh = 768;
    var lpw = vw;
    var lph = vh;
  } else if (cw > 1366) {
    var mapSrc = 'src/graphics/map-1.3-v1.svg';
    var vw = 1980;
    var vh = 1080;
    var lpw = cw;
    var lph = ch;
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
    url: 'https://www.michellekondou.me/wprestapi/index.php/wp-json/wp/v2/posts/?per_page=20',
    //url: 'dist/proxy/data.json',
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
    var tip = new Modal('tooltip', point.id, content.acf.card_title);
    var pop = new Modal('popup', point.id, content.acf.card_title, content.acf.card_summary);
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
      //detects zoom-in
      if (d3.event.sourceEvent.deltaY < 0) {
        svg.style("cursor", "zoom-in");
        //if mobile
        if (cw < 1024) {
          var duration = 0;
        } else {
          var duration = 0;
        }
      //detects zoom-out
      } else if (d3.event.sourceEvent.deltaY > 0){
        svg.style("cursor", "zoom-out");
        //if mobile
        if (cw < 1024) {
          var duration = 0;
        } else {
          var duration = 0;
        }
      } 
      //detects panning
      if (d3.event.sourceEvent.movementX != 0 ||  d3.event.sourceEvent.movementY != 0) {
        svg.style("cursor", "move");
        var duration = 0;
        $('.popup').removeClass('open');
        $('.tooltip').removeClass('open');
        console.log('dragging');
      }
    }

    //handle zoom
    view.transition()
        .duration(duration)
        .attr("transform", "translate(" + d3.event.transform.x + "," + d3.event.transform.y + ")" + " scale(" + d3.event.transform.k + ")");
    console.log('zoomin');
  }


  svg.select('#view')
  .on('mousewheel.zoom', function(d) {
    for(var p = 0; p < _this.map_items.length;p++) {
      var map_item = _this.map_items[p]; 
      map_item.tip.open = false;
      $(map_item.tip.modal).removeClass('open');
      map_item.pop.open = false; 
      $(map_item.pop.modal).removeClass('open');
    }
  });

  //return cursor to default between zoom events
  function zoomEnd(){
    svg.transition().delay(1500).style("cursor", "default");
    //svg.style("cursor", "default");
    console.log('zoomend');
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

  var zoomLevel = svg.call(zoom); 
  //console.log(zoomLevel._groups[0][0].__zoom.k); 
  return zoomLevel._groups[0][0].__zoom.k;
  
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
  console.log(this);
  this.page.open = true;
  $(this.page.modal).addClass('open');
  this.pop.modal.open = false;
  $(this.pop.modal).removeClass('open');
  $('.map-loader').css('display','block'); 
  //load content on page open to be able to refresh forms
  var post = $.parseJSON($.ajax({
    url: 'https://www.michellekondou.me/wprestapi/index.php/wp-json/wp/v2/posts/'+this.post_id,
    dataType: "json", 
    async: false,
    success: function(data){
      $('.map-loader').css('display','none');
      console.log('https://www.michellekondou.me/wprestapi/index.php/wp-json/wp/v2/posts/'+this.post_id); 
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


  this.page.modal.find('.page-header').html(
    nunjucks.render('page-header.html', { 
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
    prev:   '.previous',
    fit: true 
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

if (container) {
  TweenLite.to(container, 0.5, {  
    autoAlpha: 1,
    height: total*60+20
  });
}


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
  
  var item = $(".list-item");
  console.log(item, item.length);

  for (var i = 0; i < item.length; i++) {
    var rightOrder = $(item[i]).find('.right-order');
    console.log(rightOrder[0].textContent);
    TweenLite.to(item[i], 0.5, {
      y: rightOrder[0].textContent * rowSize
    });
    console.log(item[i]);
  }

}

$('#resort').on('click', function(){
    reOrder();
});


};

MapViewItem.prototype.page_close = function () {
  if(!this.page.open) { return; }
  this.page.open = false;
  $(this.page.modal).removeClass('open');
  console.log(this, 'clicked close');
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
 
var parent = this;

this.point_x = this.rect.left;
this.point_y = this.rect.top;
this.point_width = this.rect.width;
this.point_height = this.rect.height; 

// this.pin = $("<div />", {
//   "class": "pin"
// }).appendTo($(item.point)); 

//the item pin will be in the map

//( (item.point_width * zoom_level) / 2.4 ) + 

/* Select the svg using d3 */
var $map    = document.getElementById("map"),
    //get the SVG document inside the Object tag
    svgDoc  = $map.contentDocument,
    //access the svg
    mapSvg  = svgDoc.getElementById("svgmap"),
    viewEl =  svgDoc.getElementById("view"), 
    svg = d3.select(mapSvg),
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
    //change cursor according to mouse event
    if (d3.event.sourceEvent !== null) {
      if (d3.event.sourceEvent.deltaY < 0) {
        svg.style("cursor", "zoom-in");
        //if mobile
        if (cw < 1024) {
          var duration = 0;
        } else {
          var duration = 0;
        }
      } else if (d3.event.sourceEvent.deltaY > 0){
        svg.style("cursor", "zoom-out");
        //if mobile
        if (cw < 1024) {
          var duration = 0;
        } else {
          var duration = 0;
        }
      }
      if (d3.event.sourceEvent.movementX != 0 ||  d3.event.sourceEvent.movementY != 0) {
        svg.style("cursor", "move");
        var duration = 0;
        $('.popup').removeClass('open');
        $('.tooltip').removeClass('open');
        console.log('drag');
      }
    }

    //handle zoom
    view.transition()
        .duration(duration)
        .attr("transform", "translate(" + d3.event.transform.x + "," + d3.event.transform.y + ")" + " scale(" + d3.event.transform.k + ")");
    

    console.log('calling zoom');

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

for(var p = 0; p < parent.map_items.length;p++) {
  var map_item = parent.map_items[p]; 
  map_item.tip.open = false;
  $(map_item.tip.modal).removeClass('open');
  map_item.pop.open = false; 
  $(map_item.pop.modal).removeClass('open');
  console.log('is this working', parent.map_items);
}


var zoom = d3.zoom()
    .scaleExtent([1, 10])
    .translateExtent([ [t, l], [b, r] ])
    .on("zoom", zoomed)
    .on("zoom.end", zoomEnd);
 

svg.call(zoom); 

$(parent.point).css('cursor', 'pointer');

svg.select('#'+parent.point.id)
.on('mousewheel.zoom', function(d) {
  parent.tip.open = false;
  $(parent.tip.modal).removeClass('open');
  parent.pop.open = false;
  $(parent.pop.modal).removeClass('open');
})
.on('mouseover', function() {
  //console.log(item.tip.modal[0].children[1], item.tip.modal[0].clientHeight, 32);
  var //zoom_level = MapView.prototype._render_map.call(parent),
      //tooltip height + pin height + margin between pin and tooltip
      modalWidth = Math.floor( parent.tip.modal[0].clientWidth),
      modalHeight = Math.floor( parent.tip.modal[0].clientHeight),
      modalTitle = parent.tip.modal[0].children[1]; 

  //only show the tooltip if popup not open 
  if(parent.pop.open === false) {
    parent.tip.open = true;
    parent.tip.style({
      //position the tooltip on top and middle of point
      "left": ( $(this).offset().left + parent.map_bcr.left ) - (parent.point_width) + "px",
      "top": ( $(this).offset().top + parent.map_bcr.top ) - (modalHeight) + "px"
    }); 
    $(parent.tip.modal).addClass('open');
  }
})
.on('mouseout', function(d) {
  //close the tooltip if open
  parent.tip.open = false;
  $(parent.tip.modal).removeClass('open');
});

svg.select('#'+parent.point.id).on('mousedown', function(d) {
  var zoomLevel = svg.call(zoom)._groups[0][0].__zoom.k; 
  console.log(zoomLevel);
  if (zoomLevel < 10 ) {
  d3.event.stopPropagation(); 
  //center and zoom point
  var t = d3.zoomIdentity.translate(width / 3, height / 3).scale(10).translate(-parent.point_x, -parent.point_y);
  
  svg.transition().duration(150).call(zoom.transform, t);
  } else if (zoomLevel === 10 ) {
    //if panning
     // if (d3.event.sourceEvent.movementX != 0 ||  d3.event.sourceEvent.movementY != 0) {
     //  console.log('panning');
     // }
    //show the popup
    parent.pop.open = true;
    $(parent.pop.modal).addClass('open');
    console.log('reached max level zoom');
  }
  //close the tooltip if it's open
  parent.tip.open = false;
  $(parent.tip.modal).removeClass('open');
  //show the popup
  parent.pop.open = true;
  $(parent.pop.modal).addClass('open');
 
}, {passive: true});

svg.select('#'+parent.point.id).on('dblclick', $.proxy(this.page_open, parent));

$('#'+parent.point.id +'-popup'+' .open_page').on('mousedown', $.proxy(this.page_open, parent));


}



/* ========================================================================
======= EVENT LISTENERS ===================================================
======================================================================== */
MapViewItem.prototype._addListeners = function(){
    var _this = this; 
 
    $(this.page.modal).find('.close').on("mousedown", $.proxy(this.page_close, _this)); 
    $(this.page.modal).find('.next').on("mousedown", function(){
      console.log('clicked next');
    }); 
    $(this.pop.modal).find('.close').on("mousedown", $.proxy(this.pop_close, _this));

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
var Modal = function(type, point, title, summary){
  this.open = false;
  this.type = type;
  this.point = point;
  this.title = title;
  this.summary = summary;
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
    this.modal.html("<h3 class='map-popover-title'>"+this.title+"</h3>");
  } else if(this.type == "popup"){
    this.modal.html("<div class='arrow'></div>  <button class='close'></button><h3 class='map-popover-title'>"+this.title+"</h3><p class='map-popover-content'>" + nunjucks.renderString('{{ username }}', { username: this.summary }) + "<button class='open_page'>Συνέχισε!</button></p>");
  }  
}

window.onload = function() {
  var modal = new Modal();
  var mapView = new MapView();
}





