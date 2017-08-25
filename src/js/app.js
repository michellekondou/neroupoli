var cw = document.documentElement.clientWidth;
var ch = document.documentElement.clientHeight;

if (cw < ch) {
  var mapSrc = 'src/graphics/map-768x1024-v42.svg';
  var vw = 768;
  var vh = 1024;
  var lpw = vw; //stands for limit pan
  var lph = vh;
} else {
  if (cw <= 1366) {
    var mapSrc = 'src/graphics/map-1366x768-v42.svg';
    var vw = 1366;
    var vh = 768;
    var lpw = vw;
    var lph = vh;
  } else if (cw > 1366) {
    var mapSrc = 'src/graphics/map-1920x1080-v42.svg';
    var vw = 1920;
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
    //url: 'http://water-polis.gr/admin/index.php/wp-json/wp/v2/posts/?per_page=20',
    url: 'dist/proxy/data.json',
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

  /**
   * Create the sidebar + info nav
   */

  this.sidebar_nav =  $("<div />", {
      "class": "sidebar-nav" 
    }).appendTo('body');

  this.sidebar_nav_heading =  $("<h2 />", {
    "class": "sidebar-nav-heading",
    "html": "ΔΡΑΣΤΗΡΙΟΤΗΤΕΣ" 
  }).prependTo(this.sidebar_nav);

  this.sidebar_nav_list = $("<ul />", {
    "class": "sidebar-nav-list"
  }).insertAfter(this.sidebar_nav_heading);
 // console.log(this.map_items, this.map_items.length);
  for (var i = 0; i<this.map_items.length; i++) {
    var item = this.map_items[i];
    var title = item.content.acf.card_title;
    //console.log(item.content.id, title, item.content.title);
    //trim long title at ; char
    if ( item.post_id == 23 ) {
      title = title.substring(0, title.indexOf(';')+1);
    }

    var list_item = $('<li />', {
        "html": title,
        "id": item.content.id
    }).appendTo(this.sidebar_nav_list);
  }

  $("#nav-icon").on('mousedown', function(){
    $(this).toggleClass('open');
    $('.sidebar-nav').toggleClass('sidebar-nav--visible');
  });

  $('.sidebar-nav').on('mousedown', function(e) {
    e.stopPropagation();
  });

  $('.sidebar-nav li').on('mousedown', function() {
    for (var i = 0; i<_this.map_items.length; i++) {
      var item = _this.map_items[i];
      if ( $(this).attr('id') == item.content.id ) {
        item.page_open();
      }

    }
  });
 
  //info nav
  this.info_panel =  $("<div />", {
    "class": "info-panel" 
  }).appendTo('body');

  this.info_content =  $("<div />", {
    "class": "info-content" 
  }).prependTo(this.info_panel);

  $("#info-icon").on('mousedown', function(){
    $(this).toggleClass('open');
    //$('.info-panel').toggleClass('info-panel--visible');
    if ( $('.info-panel').hasClass('info-panel--closed') ) {
      $('.info-panel').addClass('info-panel--visible');
      $('.info-panel').removeClass('info-panel--closed');
    } else if ( $('.info-panel').hasClass('info-panel--visible') ) {
      $('.info-panel').addClass('info-panel--closed');  
      $('.info-panel').removeClass('info-panel--visible');  
    } else {
      $('.info-panel').addClass('info-panel--visible');
    }

  });

  //get the info post content
  for(var post in post_data) {
    if(post_data[post].title.rendered == 'info') { 
      var info_content = post_data[post];
      var info_post_id = post_data[post].id;
    }
  }

 // console.log(this, info_content, info_post_id);

  nunjucks.configure('src/js/templates', { autoescape: false });

  this.info_panel.html(
      nunjucks.render('info-shell.html', { 
    }) 
  );

  this.info_panel.find('.info-header').html(
    nunjucks.render('info-header.html', { 
      // title: this.content,
      text: info_content
      // quiz:  post,
      // open: this.open
    }) 
  );

  this.info_panel.find('.info-content').html(
    nunjucks.render('info-content.html', { 
      // title: this.content,
      text: info_content
      // quiz:  post,
      // open: this.open
    }) 
  );

(function() {

  'use strict';

  /**
   * tabs
   *
   * @description The Tabs component.
   * @param {Object} options The options hash
   */
  var tabs = function(options) {

    var el = document.querySelector(options.el);
    var tabNavigationLinks = el.querySelectorAll(options.tabNavigationLinks);
    var tabContentContainers = el.querySelectorAll(options.tabContentContainers);
    var activeIndex = 0;
    var initCalled = false;

    /**
     * init
     *
     * @description Initializes the component by removing the no-js class from
     *   the component, and attaching event listeners to each of the nav items.
     *   Returns nothing.
     */
    var init = function() {
      if (!initCalled) {
        initCalled = true;
        el.classList.remove('no-js');

        for (var i = 0; i < tabNavigationLinks.length; i++) {
          var link = tabNavigationLinks[i];
          handleClick(link, i);
        }
      }
    };

    /**
     * handleClick
     *
     * @description Handles click event listeners on each of the links in the
     *   tab navigation. Returns nothing.
     * @param {HTMLElement} link The link to listen for events on
     * @param {Number} index The index of that link
     */
    var handleClick = function(link, index) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        goToTab(index);
      });
    };

    /**
     * goToTab
     *
     * @description Goes to a specific tab based on index. Returns nothing.
     * @param {Number} index The index of the tab to go to
     */
    var goToTab = function(index) {
      if (index !== activeIndex && index >= 0 && index <= tabNavigationLinks.length) {
        tabNavigationLinks[activeIndex].classList.remove('is-active');
        tabNavigationLinks[index].classList.add('is-active');
        tabContentContainers[activeIndex].classList.remove('is-active');
        tabContentContainers[index].classList.add('is-active');
        activeIndex = index;
      }
    };

    /**
     * Returns init and goToTab
     */
    return {
      init: init,
      goToTab: goToTab
    };

  };

  /**
   * Attach to global namespace
   */
  window.tabs = tabs;

})();

var myTabs = tabs({
  el: '#tabs',
  tabNavigationLinks: '.c-tabs-nav__link',
  tabContentContainers: '.c-tab'
});

myTabs.init();

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
      $(map_item.pop.modal).removeClass('popup-open');
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
        $('.popup').removeClass('popup-open');
        $('.tooltip').removeClass('open');
      }
    }

    //handle zoom
    view.transition()
        .duration(duration)
        .attr("transform", "translate(" + d3.event.transform.x + "," + d3.event.transform.y + ")" + " scale(" + d3.event.transform.k + ")");
  }


  svg.select('#view')
  .on('mousewheel.zoom', function(d) {
    for(var p = 0; p < _this.map_items.length;p++) {
      var map_item = _this.map_items[p]; 
      map_item.tip.open = false;
      $(map_item.tip.modal).removeClass('open');
      map_item.pop.open = false; 
      $(map_item.pop.modal).removeClass('popup-open');
    }
  });

  //return cursor to default between zoom events
  function zoomEnd(){
    svg.transition().delay(1500).style("cursor", "default");
    //svg.style("cursor", "default");

  }
 
  var svgWidth = d3.select(mapSvg).attr("width");
  var svgHeight = d3.select(mapSvg).attr("height");
  // if (cw < ch) {
  //   if (cw < 480) {
  //     var t = -width/3.5, //top
  //         l = -height/12, //left
  //         b = width+width/3.5, //bottom
  //         r = height+height/12; //right
  //   } else {
  //     var t = -width/5.5, //top
  //         l = -height/12, //left
  //         b = width+width/5.5, //bottom
  //         r = height+height/12; //rights
  //   }
  // } else {
    var t = 0,
        l = 0,
        b = width,
        r = height;
  // }

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
      $(map_item.pop.modal).removeClass('popup-open');
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
  //console.log(this, this.page.modal, this.page.modal[0].children[0]);
  this.page.open = true;
  $(this.page.modal).addClass('overlay-open');
  $(this.page.modal).find('.page').addClass('page-open');
  var parent = this;
  //remove transform style generated after closing the page
  $(parent.page.modal).css("transform","");
  // TweenLite.set(parent.page.modal, {
  //   x: 0
  // });

  this.pop.modal.open = false;
  $(this.pop.modal).removeClass('popup-open');
  $('.map-loader').css('display','block'); 
  //load content on page open to be able to refresh forms
  var post = $.parseJSON($.ajax({
    //url: 'http://water-polis.gr/admin/index.php/wp-json/wp/v2/posts/'+this.post_id,
    url:' dist/proxy/data.json',
    dataType: "json", 
    async: false,
    success: function(data){
      $('.map-loader').css('display','none'); 
    }
  }).responseText);

  nunjucks.configure('src/js/templates', { autoescape: false });
  //console.log('this.content',this.content);
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

  this.page.modal.find('.page-footer').html(
    nunjucks.render('page-footer.html', { 
      title: this.content,
      text: this.content,
      quiz:  post,
      open: this.open
    }) 
  );

  //handle card content
  var cards = this.page.modal.find('#cards');
  var cards_navigation = this.page.modal.find('.progress-bar');
  console.log(this, this.page.modal[0].id, cards_navigation);
  $(cards)
  .cycle({ 
    fx:     'fade', 
    speed:  'fast', 
    timeout: 0, 
    next:   '.next', 
    prev:   '.previous',
    pager: cards_navigation,
    nowrap: 1,
    end: function() {
      console.log('end of slideshow');
    },
    pagerAnchorBuilder: function(idx, slide) { 
      var thisPager = '#' + parent.page.modal[0].id + ' .progress-bar div:eq(' + idx + ')';
      return thisPager; 
    },
    before: function(){
      $(this).parent().find('.current').removeClass('current');
    },
    after: onAfter,
    fit: true 
  });

  function onAfter(curr, next, opts) {
    $(this).addClass('current');
    $('#' + parent.page.modal[0].id + ' .progress-bar div:eq(0), .activeSlide').addClass('visited');
    var index = opts.currSlide;
    $('#' + parent.page.modal[0].id + ' .previous')[index == 0 ? 'addClass' : 'removeClass']('last');
    $('#' + parent.page.modal[0].id + ' .next')[index == opts.slideCount - 1 ? 'addClass' : 'removeClass']('last');
  }



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
  return data;
}
 
$(".checkbox-prompt").removeClass('visible');

$(function() {
  $('.likert input').on('change', function(){
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
    var submit_id = $(this).attr("id");  
    var forms = $('form');  
    var option = $('#' + submit_id + " input:radio" + ',#' + submit_id + " input:checkbox");
    var selectedOption = $('#' + submit_id + " input:checked");
    if (!selectedOption) {
      console.log('nothing selected');
    }
     //console.log(selectedOption);
    for (var j=0;j<option.length;j++) {
      var this_option = option[j];
      //console.log(this_option);
      if ( $(this_option).is(':checked') ) {
        $('#' + submit_id + '.form-error').html('')
    
        $('#' + submit_id + ' .loader.quiz').css('display','inline-block');
        for(var i=0;i<forms.length;i++){
          var this_form = forms[i];
          if ( $(this_form).attr("id") === submit_id ) {     
            var form = $(this_form);
            var data = getFormData(form);
            var url = form.attr('action');
            $.ajax({
              type: "POST",
              url: url,
              data: data,
              success: function(data){
                $('.form-error').html('');
                $('.submit').removeClass('disabled');
                $('#' + submit_id + ' .loader').css('display','none'); 
                $(form).find('input').attr("disabled", true);
                $('#' + submit_id + '.submit').addClass('none');  
                $(form).addClass('submitted');
                $('#' + submit_id + ".thankyou_message").css('display','block');
                console.log(selectedOption);
                $('#' + submit_id + " .checkbox-prompt").addClass('visible');
                selectedOption.siblings('label').addClass('selected');
                if ( selectedOption.attr('data-type') == "correct" ) {
                  $('.check-answer').html('Σωστά!')
                  if ( $(this_option).is(':radio') ) {
                    $('.check-answer').html('Σωστά!')
                  } else if ($(this_option).is(':checkbox') ) {
                    $('.check-answer').html('Όλα σωστά! Μπράβο!')
                  }
                } else if ( selectedOption.attr('data-type') == 'wrong') {
                  if ( $(this_option).is(':radio') ) {
                    $('.check-answer').html('Λάθος!')
                  } else if ($(this_option).is(':checkbox') ) {
                    $('.check-answer').html('Υπήρχαν κάποιες λάθος απαντήσεις!')
                  }
                }
              }
            });//end ajax  
          }//end if
        }//end for loop
      } else if ( !($(this_option).is(':checked')) ) {
        //if ( $(this_option).is(':radio') ) {
          $('#' + submit_id + '.form-error').html('Παρακαλούμε διάλεξε πρώτα μια απάντηση!');
          $('#' + submit_id + '.submit').addClass('disabled');
          console.log('please choose an option to submit the form');
        // }
      }
    }//end outer for loop      
  });//submit function

  $('input').on('change', function(){
    console.log('input selected');
    var submit_id = $(this).attr("id");
    $('.form-error').html('');
    $('.submit').removeClass('disabled');
  });

  $('form').on('submit', function(){
     console.log('form submitted');
  });

});

/*------------------------------------*\
  #Sortable Quiz
\*------------------------------------*/
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
    }
  }

  return sortable;
}


function reOrder() { 
  
  var item = $(".list-item");

  for (var i = 0; i < item.length; i++) {
    var rightOrder = $(item[i]).find('.right-order');
    TweenLite.to(item[i], 0.5, {
      y: rightOrder[0].textContent * rowSize
    });

  }

}

$('#resort').on('click', function(){
    reOrder();
});

//END Sortable Quiz

/*------------------------------------*\
  # Hotspot Quiz
\*------------------------------------*/

this.hotspot_image = $(this.page.modal).find('.hotspot-image img');
var hotspot_container = $(this.page.modal).find('.hotspot-image');

var card_content = this.content.acf.cards;
var hotspot_data;

for(var card in card_content) {
  if (card_content[card].acf_fc_layout === 'hotspot') {
    //console.log('for loop',card_content[card].hotspots);
    hotspot_data = card_content[card].hotspots;
  }
}

//console.log('hotspot_data', hotspot_data, this.content.acf.cards);

var hotspot_starting_container = $('.quiz-hotspot ul');
var hotspot_starting_pos = null; //draggable item position
var hotspot_target_container = $(this.hotspot_image);
var hotspot_target = $(this.hotspot);
var drag_right_offset = $('.hotspot-image img').width() + 50;

var initial_x = 0;
var initial_y = 0;

var snapX = [],
    snapY = [];
//put the hotspot on the image
for(var hotspot in hotspot_data) { 
  var hotspot_title = hotspot_data[hotspot].hotspot_title;
  var hotspot_coordinates = hotspot_data[hotspot].hotspot_coordinates;
  var hotspot_coordinates_x = hotspot_coordinates.substring(0, hotspot_coordinates.indexOf(','));
  var hotspot_coordinates_y = hotspot_coordinates.split(',')[1];
  //console.log(hotspot_coordinates_x);

  var newX = Math.round( parseFloat(hotspot_coordinates_x) - 3);
  var newY = Math.round( parseFloat(hotspot_coordinates_y) - 4);
  var pixels_x = $(this.hotspot_image).width()*(newX/100);
  var pixels_y = $(this.hotspot_image).height()*(newY/100);

  this.hotspot = $("<span />", {
    "class": "hotspot",
    "style": "left: " + Math.round( parseFloat(hotspot_coordinates_x) - 3) + "%;" + "top: " + Math.round(parseFloat(hotspot_coordinates_y) - 4) + "%;",
    "title": hotspot_title,
    'data_x': pixels_x,
    'data_y': pixels_y,

  }).appendTo($(hotspot_container));

  // this.hotspot_tooltip = $("<div />", {
  //     "class": "map-popover tooltip top"
  // }).text(hotspot_title).appendTo($(hotspot_container));

  snapX.push(pixels_x);
  snapY.push(pixels_y);

}


//console.log( $('.quiz-hotspot ul').position() );
var targets = $('.hotspot');
var overlapThreshold = "90%"; 

var draggable;
var draggable_list_item = $('.quiz-hotspot li .text');

for (var i = 0;i<draggable_list_item.length;i++) {
  var item = draggable_list_item[i];
  $(item).width();
  console.log($(item), $(item).width());
}

$(this.page.modal).find('.quiz-hotspot').addClass(this.page.point+'-quiz-hotspot');
// var minX = ;
// var minY = ;
draggable = Draggable.create('.draggable-item', {
        type: "x,y",
        //bounds: { target: ".quiz-hotspot", minX: "+=1", maxX: "+=1", maxY: "+=1", minY: "+=1" },
        bounds: "."+this.page.point+'-quiz-hotspot',
        allowNativeTouchScrolling:false,
       // throwProps: true,
        onPress:function() {
          //record the starting values so we can compare them later...
          startY = this.y;
        },
        onDragStart:function(e) {
          this_target = this;
          console.log('this_target', this_target);
          $(this.target).removeClass("positioned");
          $(this.target).addClass("being_dragged");
         
        },
        onDrag:function(e) {
          $(this.target).addClass("being_dragged");
          for(var i=0; i<targets.length;i++){
            //console.log(targets[i]);
            if (this.hitTest(targets[i], overlapThreshold)) {
               $(targets[i]).addClass("showOver");
               $(this.target).addClass("hit");
                
             } else {
               $(targets[i]).removeClass("showOver");
               // $(this.target).removeClass("hit");
               //$(this.target).removeClass("being_dragged");
             }
          }
        },
        onDragEnd:function(e) {
          console.log(this.pointerEvent);
          var snapMade = false;
          console.log('GGGGGG',this_target.minX);
          for(var i=0; i<targets.length;i++){
            
            if(this.hitTest(targets[i], overlapThreshold)){
              //connect source and target via an identifier
              var identifier = $(targets[i]).attr('title');
              console.log('identifier', identifier);
              $(this.target).addClass(identifier);
              var p = $(targets[i]).position();
              $(this.target).addClass("positioned");
              $(targets[i]).addClass("match");
              console.log(
                this,
                this_target.minX,
                this_target.minX - parseInt($(targets[i]).attr('data_x')),
                drag_right_offset, 
                $(targets[i]).attr('data_x'), 
                -(drag_right_offset - $(targets[i]).attr('data_x')),
                this.minY,
                $(targets[i]).attr('data_y'),
                 parseInt( $(targets[i]).attr('data_y') ) + this.minY - 5
              );
              var tl = new TimelineLite();
              tl
              .to(this.target, 0.1, { 
                top: $(targets[i]).attr('data_x'), 
                left: $(targets[i]).attr('data_y'),
                backgroundColor: 'rgba(255, 255, 255, 0.7)'
              })
              .to(this.target, 0.1, {
                x: this.minX + parseInt($(targets[i]).attr('data_x')) - 4,
                y: parseInt( $(targets[i]).attr('data_y') ) + this.minY - 5

              });
              snapMade = true;
            } else {
              $(targets[i]).removeClass("match");
            }
          }
          if(!snapMade){
            $(this.target).removeClass("being_dragged");
            $(this.target).removeClass("hit");
              TweenLite.to(this.target, 0.2, {
                css: {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  x: 0, 
                  y: 0
                }
              });
          }
        }
    });

 
//end open_page function
};

MapViewItem.prototype.page_close = function () {
  var parent = this;
  var inner_page = $(this.page.modal).find('.page');

  if(!this.page.open) { 
    console.log('page closed already cannot reclose');
    return; 
  }
  console.log('page_close fired', parent.page.modal);

  parent.page.open = false;
  inner_page.removeClass('page-open');

  var closeOverlay = function() {
    $(parent.page.modal).removeClass('overlay-open');
  } 

  var tl = new TimelineLite();
 
  tl.addLabel("hide-overlay", 0.8);
  tl.add(closeOverlay, "hide-overlay");

  //return tl;
};

MapViewItem.prototype.pop_open = function () {
  if(this.pop.open) { return; }
  this.pop.open = true;
  $(this.pop.modal).addClass('popup-open');
};

MapViewItem.prototype.pop_close = function () {
  if(!this.pop.open) { return; }
  this.pop.open = false;
  $(this.pop.modal).removeClass('popup-open');
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
        $('.popup').removeClass('popup-open');
        $('.tooltip').removeClass('open');
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
  // if (cw < ch) {
  //   if (cw < 480) {
  //     var t = -width/3.5, //top
  //         l = -height/12, //left
  //         b = width+width/3.5, //bottom
  //         r = height+height/12; //right
  //   } else {
  //     var t = -width/5.5, //top
  //         l = -height/12, //left
  //         b = width+width/5.5, //bottom
  //         r = height+height/12; //rights
  //   }
  // } else {
    var t = 0,
        l = 0,
        b = width,
        r = height;
  // }

for(var p = 0; p < parent.map_items.length;p++) {
  var map_item = parent.map_items[p]; 
  map_item.tip.open = false;
  $(map_item.tip.modal).removeClass('open');
  map_item.pop.open = false; 
  $(map_item.pop.modal).removeClass('popup-open');
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
  $(parent.pop.modal).removeClass('popup-open');
})
.on('mouseover', function() {
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
    $(parent.pop.modal).addClass('popup-open');
  }
  //close the tooltip if it's open
  parent.tip.open = false;
  $(parent.tip.modal).removeClass('open');
  //show the popup
  parent.pop.open = true;
  $(parent.pop.modal).addClass('popup-open');
 
}, {passive: true});

svg.select('#'+parent.point.id).on('dblclick', $.proxy(this.page_open, parent));

$('#'+parent.point.id +'-popup'+' .open_page').on('mousedown', $.proxy(this.page_open, parent));

}



/* ========================================================================
======= EVENT LISTENERS ===================================================
======================================================================== */
MapViewItem.prototype._addListeners = function(){
  var _this = this; 
  
  //prevents closing the page when clicking on it - page only closes via close button or clicking outside it
  $('.page').on('mousedown', function(e) {
    e.stopPropagation();
  });
  //close page by clicking on the overlay
  $('.overlay').not( $(this).find('.page') ).on( "mousedown", $.proxy(this.page_close, _this) );
  //close page by clicking on close button
  $(this.page.modal).find('.close').on("mousedown", $.proxy(this.page_close, _this)); 
  //close popup by clicking on close button
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

   // console.log(_this.page.modal);

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
      "class": "map-popover popup right",
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
  var mapView = new MapView();
}





