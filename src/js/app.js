window.USER_IS_TOUCHING = false;

window.addEventListener('touchstart', function onFirstTouch() {
  // we could use a class
  document.body.classList.add('user-is-touching');

  // or set some global variable
  window.USER_IS_TOUCHING = true;

  // we only need to know once that a human touched the screen, so we can stop listening now
  window.removeEventListener('touchstart', onFirstTouch, false);
}, false);


// //service worker registration
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', function() {

//     navigator.serviceWorker.register('sw.js').then(function(registration) {
//       // Registration was successful
//       console.log('ServiceWorker registration successful with scope: ', registration.scope);
//     }, function(err) {
//       // registration failed :(
//       console.log('ServiceWorker registration failed: ', err);
//     });

//   });
// }


// add details to debug result
// document.getElementById('details').innerHTML = window.navigator.userAgent;

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
      for(var registration in registrations) {
        registration.unregister();
      } 
    });
  });
}

var cw = document.documentElement.clientWidth;
var ch = document.documentElement.clientHeight;

if (cw < ch) {  
  var mapSrc = 'dist/graphics/map-768x1024-v42.svg';
  var vw = 768;
  var vh = 1024;
  var lpw = vw; //stands for limit pan
  var lph = vh;
} else {
  if (cw <= 1366) {
    var mapSrc = 'dist/graphics/map-1366x768-v42.svg';
    var vw = 1366;
    var vh = 768;
    var lpw = vw;
    var lph = vh;
  } else if (cw > 1366) {
    var mapSrc = 'dist/graphics/map-1920x1080-v42.svg';
    var vw = 1920;
    var vh = 1080;
    var lpw = cw;
    var lph = ch;
  }
}

var MapObject = function() {
  this._init_map_object();
  console.log(this);
};

MapObject.prototype._init_map_object = function() {
  this.svgObject = $("<object />", {
    type: "image/svg+xml",
    'Data': mapSrc,
    id: 'map',
    'aria-label': 'Xάρτης με διαδραστικά παιχνίδια και πληροφορίες για την εξοικονόμηση του νερού στην πόλη | Water in the city map',
    style: "position:absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);width:"+vw+"px;height:"+vh+"px"
  }).appendTo('#container');
};

var MapView = function(posts, info) {
  this.map = map;
  this.posts = posts;
  this.info = info;
  this.map_items = [];
  this._init_map_elements();
};

MapView.prototype._init_map_elements = function() {
  var _this = this;
  var parent = this;
  this.map = document.getElementById("map");
  //get the SVG document inside the Object tag
  this.svgDoc = this.map.contentDocument;
  //access the svg
  this.mapSvg = this.svgDoc.getElementById("svgmap");
  //get svg properties
  this.map_bcr = this.map.getBoundingClientRect();

  //svg points
  var points = this.svgDoc.querySelectorAll('.point');  
  var point;
  var post;
  var post_data = [];  
  var post_id;
  var content;
  var rect;
  var tip;
  var pop;
  var page;
  var point_item;

  //save the json data in an array
  for(var i = 0;i<parent.posts.length;i++) { 
    post = parent.posts[i];
    post_data.push(post); 
  }

  //create the map points
  for(var j = 0;j<points.length;j++) {
    point = points[j];
    for(var item in post_data) {
      if(post_data[item].slug === point.id) { 
        content = post_data[item];
        post_id = post_data[item].id;
      }
    }  

    rect = points[j].getBoundingClientRect();
    tip = new Modal('tooltip', point.id, content.acf.card_title);
    pop = new Modal('popup', point.id, content.acf.card_title, content.acf.card_summary);
    page = new Modal('page', point.id);
    point_item = new MapViewItem(point, rect, map, this.map_bcr, pop, tip, page, content, post_id);
    this.map_items.push(point_item); 
  } //endfor
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

  var title;
  var list_item;
  var item;
  for (i = 0; i<this.map_items.length; i++) {
    item = this.map_items[i];
    title = item.content.acf.card_title;
    //console.log(item.content.id, title, item.content.title);
    //trim long title at ; char
    if ( item.post_id == 23 ) {
      title = title.substring(0, title.indexOf(';')+1);
    }

    list_item = $('<li />', {
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

  //clicking on an item in the sidebar opens a card via post id
  $('.sidebar-nav li').on('mousedown', function() {
    for (var i = 0; i<_this.map_items.length; i++) {
      item = _this.map_items[i];
      if ( $(this).attr('id') == item.content.id ) {
        item.page_open();
      }
    }
  });

  var currently_open;
  //custom links in content that open cases/cards
  $('.custom-link').on('click', function(event) {
    for (var i = 0; i<_this.map_items.length; i++) {
      item = _this.map_items[i];
      if (item.page.open){
        currently_open = item;
      }
      if ( $(this).attr('data-target') == item.content.id ) {
        item.page_open();
      } 
    } //endfor
    if(currently_open !== undefined){
      currently_open.page_close();
    }
  });

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

/*------------------------------------*\
  #TAB NAVIGATION SYMBOLS
\*------------------------------------*/
/**
 * Switch symbol size via classname depending on viewport size
 */
function switchIconSize(){
  var icon = $('.symbol-container .icon');
  var icon_class = icon.attr('class');
  var re = / *\bsymbol\b/g;
  var reNot = / *\bsymbol-small\b/g;
  //look for the class prefix symbol-small in icon class-names
  var testRe = reNot.exec(icon_class);
  for(var is = 0; is<icon.length;is++){
    _is = icon[is];
    if (document.documentElement.clientHeight <= 768 && testRe === null) {
      _is.className = _is.className.replace(/ *\bsymbol\b/g, " symbol-small");
    } else if (document.documentElement.clientHeight > 768 && testRe !== null) {
      _is.className = _is.className.replace(/ *\bsymbol-small\b/g, " symbol");
    }
  }
}

switchIconSize();

$(window).resize(function() {
  var icon = $('.symbol-container .icon');
  var icon_class = icon.attr('class');
  var re = / *\bsymbol\b/g;
  var reNot = / *\bsymbol-small\b/g;
  var is;
  //look for the class prefix symbol-small in icon class-names
  var testRe = reNot.exec(icon_class);
  if (document.documentElement.clientHeight <= 768 && testRe === null) {
    for(is = 0; is<icon.length;is++) {
      _is = icon[is];
      _is.className = _is.className.replace(/ *\bsymbol\b/g, " symbol-small");
      console.log('run replace ' + ch + " <= 768");
    }
  }
  if (document.documentElement.clientHeight > 768) {
    for(is = 0; is<icon.length;is++) {
      _is = icon[is];
      _is.className = _is.className.replace(/ *\bsymbol-small\b/g, " symbol");
      console.log('run replace ' + ch + " > 768");
    }
  }

  console.log('window resized', document.documentElement.clientHeight);

});

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
    var link;

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
          link = tabNavigationLinks[i];
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
      }, {passive: true});
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

};

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
    var duration;
    var map_item;
     //close both the tooltip and the popup if open
    for(var p = 0; p < _this.map_items.length;p++) {
      map_item = _this.map_items[p]; 
      map_item.tip.open = false;
      $(map_item.tip.modal).removeClass('open');
      map_item.pop.open = false; 
      $(map_item.pop.modal).removeClass('popup-open');
    }

    //change cursor according to mouse event
    if (d3.event.sourceEvent !== null) {
         
      if(d3.event.sourceEvent.ctrlKey) {
        console.log('Pressed CTRL', d3.event.sourceEvent);
        return;
      }
      //detects zoom-in
      
      if (d3.event.sourceEvent.deltaY < 0) {
        svg.style("cursor", "zoom-in");
        //if mobile
        if (cw < 1024) {
          duration = 0;
        } else {
          duration = 0;
        }
      //detects zoom-out
      } else if (d3.event.sourceEvent.deltaY > 0){
        svg.style("cursor", "zoom-out");
        //if mobile
        if (cw < 1024) {
          duration = 0;
        } else {
          duration = 0;
        }
      } 
      //detects panning
      if (d3.event.sourceEvent.movementX != 0 ||  d3.event.sourceEvent.movementY != 0) {
        svg.style("cursor", "move");
        duration = 0;
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
  .on('mousewheel.zoom', function(event) {
    for(var p = 0; p < _this.map_items.length;p++) {
      map_item = _this.map_items[p]; 
      map_item.tip.open = false;
      $(map_item.tip.modal).removeClass('open');
      map_item.pop.open = false; 
      $(map_item.pop.modal).removeClass('popup-open');
    }

  });

  //return cursor to default between zoom events
  function zoomEnd(){
    svg.transition().delay(1500).style("cursor", "default");
  }
 
  var svgWidth = d3.select(mapSvg).attr("width");
  var svgHeight = d3.select(mapSvg).attr("height");

  var t = 0,
      l = 0,
      b = width,
      r = height;

  var zoom = d3.zoom()
  .scaleExtent([1, 15])
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

  $("#reset-zoom").on("mousedown", resetted);
  $(".close-popup").on("mousedown", resetted);

  $("#zoom-in").on("mousedown", zoomIn);

  $("#zoom-out").on("mousedown", zoomOut);

  svg.on('mousewheel.zoom', function(d) {
 
    for(var p = 0; p < _this.map_items.length;p++) {
      map_item = _this.map_items[p]; 
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
  
};


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
};

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
  $(this.page.modal).find('p:empty').remove();
  $(this.page.modal).find('em:empty').remove();
  // this.pop.modal.open = false;
  // $(this.pop.modal).removeClass('popup-open');
  $('.map-loader').css('display','block'); 
  //load content on page open to be able to refresh forms


  //handle card content
  var cards = this.page.modal.find('.cards');
  var cards_navigation = this.page.modal.find('.progress-bar');
  var card_content = this.content.acf.cards;
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
    //close the modal: click anywhere to close it, or hit any key
    $(".term-popup.open, .glossary-popup.open").removeClass('open');
    //reset drag n drop game
    reset_hotspot();
    reset_dnd();
  }

/*------------------------------------*\
  #FORMS GENERAL
\*------------------------------------*/
//form handler TODO put this stuff in its own function
// get all data in form and return object
function getFormData(form) {
  var form_id = form.attr('id');
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

var current_page = $(this.page.modal);
var likert_input = current_page.find('.likert input');
var submit = current_page.find('.submit');
console.log('a vhagesldg');
// $(likert_input).on('change', function(){
//     $('.loader.quiz').css('display','block');        
//     var form = $(this).closest("form");
//     var data = getFormData(form);
//     console.log(form.attr('id'));
//     var url = form.attr('action');
//     $.ajax({
//       type: "POST",
//       url: url,
//       data: data,
//       success: function(data){
//         $('.loader').css('display','none'); 
//         $(form).find('input').attr("disabled", true);  
//         $(form).addClass('submitted');
//         $(form).siblings(".thankyou_message").css('display','block');
//         return; 
//       }
//     });            
// });

$(submit).on('click', function() {
    var submit_id = $(this).attr("id");   
    var form_id = submit_id.substring(0, submit_id.indexOf('--'));
    var forms = $('form#' + form_id);
    var option = $('#' + form_id + " input:radio, #" + form_id + " input:checkbox");
    var radio = $('#' + form_id + " input:radio");
    var checkbox = $('#' + form_id + " input:checkbox");
    var reset_btn = $('#' + form_id + "--reset");
    var selectedOption = $('#' + form_id + " input:checked");
    var this_option;
    var this_form;
    var form;
    var data;
    var url;

   console.log(form_id, selectedOption);
    if (selectedOption.length >= 1) {
    //for all inputs
    for (var j=0;j<option.length;j++) {
      this_option = option[j];
      //console.log(this_option);
      if ( $(this_option).prop('checked') == true ) {
        $('#' + form_id + '--submit .loader').css('display','block');
        $('#' + form_id + '--form-error').html('');
        console.log($('#' + form_id + ' .checkbox-r')); 
        for(var i=0;i<forms.length;i++){
          this_form = forms[i];
          if ( $(this_form).attr("id") === form_id ) {     
            form = $(this_form);
            data = getFormData(form);
            url = form.attr('action');
            $.ajax({
              type: "POST",
              url: url,
              data: data,
              success: function(data){
                //clear the error message
                $('#' + form_id + '--form-error').html(''); 
                //enable the button for when it is used again
                $('.submit').removeClass('disabled');
                //hide the loader
                $('#' + form_id + '--submit .loader').css('display','none'); 
                //disable input to prevent resubmit
                $(form).find('input').attr("disabled", true);
                //hide the submit button
                $('#' + submit_id).addClass('none');  
                //mark the form as submitted
                $(form).addClass('submitted');
                //display a thank you message
                $('#' + form_id + "--thankyou_message").css('display','block');
                console.log(selectedOption);
                //display an input message?
                $('#' + form_id + " .checkbox-prompt").addClass('visible');
                //add class to checked input
                selectedOption.siblings('label').addClass('selected');
                //radio input: check correct answers to display appropriate msg
              },
              error: function(error){
                console.log(error);
              }
            });//end ajax  
          }//end if
        }//end for loop
      }
    }
    } else if (selectedOption.length == 0 && !forms.hasClass('short-text') ) {
        $('#' + form_id + '--form-error').html('Παρακαλούμε διάλεξε πρώτα μια απάντηση!');
        $('#' + form_id + '--submit').addClass('disabled');
        console.log('please choose an option to submit the form');
    }

    $('#'+form_id+ '.short-text textarea').bind('input propertychange', function() {
      $('#' + form_id + '--submit').removeClass('disabled');
      $('#' + form_id + '--form-error').html('');
      console.log('writing');
    });
    if(forms.hasClass('short-text')){
      if ( !$.trim( $('#'+form_id+ '.short-text textarea').val()) ) {
        $('#' + form_id + '--form-error').html('Δεν έγραψες κάτι!');
        $('#' + form_id + '--submit').addClass('disabled');
      } else {
        $('#' + form_id + '--submit .loader').css('display','block');
        data = getFormData(forms);
        url = forms.attr('action');
         $.ajax({
              type: "POST",
              url: url,
              data: data,
              success: function(data){
                //clear the error message
                $('#' + form_id + '--form-error').html(''); 
                //enable the button for when it is used again
                $('#' + form_id + '--submit').removeClass('disabled');
                //hide the loader
                $('#' + form_id + '--submit .loader').css('display','none'); 
                //disable input to prevent resubmit
                $(forms).find('textarea').attr("disabled", true);
                //hide the submit button
                $('#' + submit_id).addClass('none');  
                //mark the form as submitted
                $(forms).addClass('submitted');
                //display a thank you message
                $('#' + form_id + "--thankyou_message").css('display','block');
                console.log(selectedOption);
                //display an input message?
                $('#' + form_id + " .checkbox-prompt").addClass('visible');
                //add class to checked input
                selectedOption.siblings('label').addClass('selected');
                //radio input: check correct answers to display appropriate msg
              },
              error: function(error){
                console.log(error);
              }
            });//end ajax 
      }
    }
  
    var correct_answers = [];
    var selected_answers = [];
    var this_checkbox;
    var this_radio;
    //checkbox inputs
    for(var c=0;c<checkbox.length;c++){
      this_checkbox = checkbox[c];
      if ( $(this_checkbox).attr('data-type') == "correct"  ) {
        correct_answers.push(this_checkbox);
      } 
      if ( $(this_checkbox).is(':checked') ) {
        selected_answers.push(this_checkbox);
      } 
    }

    var is_same = (correct_answers.length == selected_answers.length) && correct_answers.every(function(element, index) {
        return element === selected_answers[index]; 
    });

    if(is_same){
      $('#' + form_id + "--thankyou_message").find('.check-answer').addClass('correct').html('Όλα σωστά! Μπράβο!');
    } else {
      $('#' + form_id + "--thankyou_message").find('.check-answer').addClass('wrong').html('Υπήρχαν κάποια λάθη!');
      setTimeout(function(){
        $(reset_btn).removeClass('visually-hidden'); 
      }, 500);
      
    }

    //multiple choice inputs
    for(var r=0;r<radio.length;r++){
      this_radio = radio[r];
      if ( selectedOption.attr('data-type') == "correct" ) {
        $('#' + form_id + "--thankyou_message").find('.check-answer').addClass('correct').html('Σωστά!');
      } else if ( selectedOption.attr('data-type') == 'wrong') {
        $('#' + form_id + "--thankyou_message").find('.check-answer').addClass('wrong').html('Λάθος!');
        $(reset_btn).removeClass('visually-hidden'); 
      }
    }
});//submit function

function resetForm(){
  var current_page = $(parent.page.modal);
  var reset = current_page.find('.reset');
  $(reset).on('click', function(){
    var reset_id = $(this).attr("id");
    var form_id = reset_id.substring(0, reset_id.indexOf('--'));
    var form = $('#'+form_id);
    var url = form.attr('action');
    $('#' + form_id + '--reset .loader').css('display','block');
    $.ajax({
      type: "POST",
      url: url,
      data: form.serialize(),
      success: function(event) {
        console.log('success');
        form.removeClass('submitted');
        form.find('input:text, input:password, input:file, select, textarea').val('');
        form.find('input:radio, input:checkbox').removeAttr('checked').removeAttr('selected').removeAttr('disabled');
        form.find('.checkbox-prompt').removeClass('visible');
        form.find('label').removeClass('selected');
        $('#'+reset_id).addClass('visually-hidden');
        $('#'+form_id+'--submit').removeClass('none');
        $('#'+form_id+'--thankyou_message').css('display','none');
        $('#'+form_id+'--thankyou_message .check-answer').removeClass('correct wrong');
        $('#' + form_id + '--reset .loader').css('display','none'); 
        console.log('#'+form_id+'--submit');
      }  
    });
});
}

resetForm();

//TODO Make this specific - narrow down
$('input').on('change', function(){
    console.log('input selected', this);
    var submit_id = $(this).attr("id");
    $('.form-error').html('');
    $('.submit').removeClass('disabled');
    // $(this).next('label').find('.checkbox-r').removeClass('visually-hidden');
    // console.log($(this).next('label'));
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
  });
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
  var sort_item = $(".list-item");
  for (var m = 0; m < sort_item.length; m++) {
    var rightOrder = $(sort_item[m]).find('.right-order');
    // TweenLite.set(
    // );
    TweenLite.to(sort_item[m], 0.5, {
      y: (rightOrder[0].textContent * rowSize) - rowSize 
    });
    console.log( (rightOrder[0].textContent * rowSize) - rowSize );
  }
  console.log(sort_item);
}

var sortable_quiz = $(this.page.modal).find('.quiz-sortable').attr('id',this.page.point+'-quiz-sortable');
var sortable_reset = $(this.page.modal).find('.resort');

sortable_reset.on('click', function(){
  var sortable_reset_id = $(this).attr('id');
  var sortable_id = sortable_reset_id.substring(0, sortable_reset_id.indexOf('--'));
  reOrder();
});

//END Sortable Quiz

/*------------------------------------*\
  # Hotspot Quiz - START
\*------------------------------------*/
//select elements with .quiz-hotspot class
var hotspot_quiz = $(this.page.modal).find('.quiz-hotspot');
var draggable_hotspot = [];
var hotspot_origin_container;
var hotspot_target_container;
//set array with snap points for drag end
var snapX = [],
    snapY = [];
var _hotspot_target;
var hotspot_coordinates;
//get image coordinates separately to assign as custom attributes (data_x) and (data_y)
var hotspot_coordinates_x;
var hotspot_coordinates_y;
//image coordinates are in percentages, convert them to pixels to 
//assign as custom attributes to the draggable element
var newX;
var newY;
var pixels_x;
var pixels_y;
var hotspot_targets;
var hotspot_available_targets;
var hotspot_overlapThreshold;
var hotspot_reset;
var hotspot_check;
var hotspot_clear;
var hotspot_prompt;
var _target;
var _parent;
var snapMade;
var current_hotspot_target;
var identifier;
var tl;
var positioned;
//if the page contains a hotspot quiz
//for each dnd quiz
for(var d = 0;d<hotspot_quiz.length;d++){

  quiz = hotspot_quiz[d];

  hotspot_origin_container = $(quiz).find('.hotspot-origin-container');
  hotspot_target_container = $(quiz).find('.hotspot-target-container');
  this.hotspot_origin = $(quiz).find('.hotspot-origin.hotspot-label');
  this.hotspot_origin_handle = this.hotspot_origin.find('.drag-handle');
  this.hotspot_target_handle = hotspot_target_container.find('.drag-handle-target');

  this.hotspot_target_handle.addClass('available');

    //add x,y coordinates as separate values to targets
  for(var hd=0;hd<this.hotspot_target_handle.length;hd++) {
    _hotspot_target = this.hotspot_target_handle[hd];
    hotspot_coordinates = $(_hotspot_target).attr('data-coordinates');
    //get image coordinates separately to assign as custom attributes (data_x) and (data_y)
    hotspot_coordinates_x = hotspot_coordinates.substring(0, hotspot_coordinates.indexOf(','));
    hotspot_coordinates_y = hotspot_coordinates.split(',')[1];
    //image coordinates are in percentages, convert them to pixels to 
    //assign as custom attributes to the draggable element
    newX = Math.round( parseFloat(hotspot_coordinates_x) - 3);
    newY = Math.round( parseFloat(hotspot_coordinates_y) - 4);
    pixels_x = $(hotspot_target_container).width()*(newX/100);
    pixels_y = $(hotspot_target_container).height()*(newY/100);

    $(_hotspot_target).attr( 'data_x', Math.round( parseFloat(pixels_x) ) );
    $(_hotspot_target).attr( 'data_y', Math.round( parseFloat(pixels_y) ) );
    $(_hotspot_target).attr('style', "left: " + Math.round( parseFloat(hotspot_coordinates_x) - 3) + "%;" + "top: " + Math.round(parseFloat(hotspot_coordinates_y) - 4) + "%;");

    //add drag snap points to arrays - for draggable elements
    snapX.push(pixels_x);
    snapY.push(pixels_y);
  }

  if ($(quiz).hasClass('mouseover')) {
    parent.term_popup('.hotspot', 'data-title');
  }

  //set some variables
  hotspot_overlapThreshold = "50%";
  hotspot_reset = $('#'+$(quiz).attr('id')+'--reset');
  hotspot_check = $('#'+$(quiz).attr('id')+'--check');
  hotspot_clear = $('#'+$(quiz).attr('id')+'--clear');
  hotspot_prompt = $('#'+$(quiz).attr('id')+'--check-answer-hotspot');

  draggable_hotspot[d] = Draggable.create('#'+$(hotspot_quiz[d]).attr('id')+' .drag-handle-'+(d+1), {
    type: "x,y",
    bounds: $('#'+$(quiz).attr('id')),
    allowNativeTouchScrolling:false,
    onPress:function(e) {
      //record the starting values so we can compare them later...
      hotspot_target_container = $(this.target).parent().parent().parent();
      hotspot_targets = hotspot_target_container.find('.drag-handle-target');
      hotspot_available_targets = hotspot_target_container.find('.available');

      for(var lp = 0;lp<hotspot_targets.length;lp++){
        _target = hotspot_targets[lp];
        _parent = $(_target).parent();
        //on drag start check the data-hit attribute - if it has a value it is because a draggable instance has been assigned to it and passed it its data-identifier attribute
        //if it has a value it means draggable was there
        //remove the data-hit attribute value and signify that it is available again
        if ( $(_target).attr('data-hit') === $(this.target).attr('data-identifier') ) {
          $(_target).attr('data-hit','').addClass('available').removeClass('showOver ripple');
        }
      }
      hotspot_reset.addClass('visually-hidden');
      hotspot_check.removeClass('visually-hidden');
      //clear the prompt message box
      hotspot_prompt.html('');
    },
    onDragStart:function(e) {
      $(hotspot_target_container).find('.clone').removeClass('visually-hidden');
    },
    onDrag:function(e) {
      for(var i=0; i<hotspot_targets.length;i++){
        _target = hotspot_targets[i];
        if (this.hitTest(_target, overlapThreshold)) {
          //if draggable in target range highlight it and animate it
          $(_target).addClass("showOver ripple");
         } else {
          if ($(_target).attr('data-hit') === '') {
            $(_target).removeClass("showOver ripple");
          }
          
         }
      }
    },
    onDragEnd:function(e) {
      snapMade = false;
      for(var i=0; i<hotspot_targets.length;i++){
        current_hotspot_target = hotspot_targets[i];
        identifier = $(current_hotspot_target).attr('data-identifier');
        if(this.hitTest(current_hotspot_target, overlapThreshold)){
          snapMade = true; 
          //connect source and target via an identifier
          //give the draggable item an attr of data-target with a value of the hit id
          //also give it a couple of styling classes
          $(this.target).attr('data-target', identifier).addClass("positioned ripple");
          //after a hit has been made reveal the check hotspot button
          hotspot_check.removeClass('visually-hidden');
          //if the item has been assigned correctly assign styling classes
          if ( $(this.target).attr('data-target') === $(this.target).attr('data-identifier') ) {
            $(this.target).removeClass("wrong highlight-wrong correct highlight-correct");
            $(this.target).addClass("correct");
          } else if ($(this.target).attr('data-target') !== $(this.target).attr('data-identifier') ) {
            $(this.target).removeClass("wrong highlight-wrong correct highlight-correct");
            $(this.target).addClass("wrong");
          }

          if ( $(current_hotspot_target).hasClass("available") ) { 
            //if there isn't one there already
            //give the target an attribute of data-hit to mark that there has been a match
            $(current_hotspot_target).attr('data-hit',$(this.target).attr('data-identifier'));
            //move item to position if position available and overlapThreshold condition is met
            tl = new TimelineLite();

            tl
            .to(this.target, 0.1, { 
              top: $(current_hotspot_target).attr('data_y'), 
              left: $(current_hotspot_target).attr('data_x')
            })
            .to(this.target, 0.1, {
              x: this.minX + parseInt($(current_hotspot_target).attr('data_x')),
              y: parseInt( $(current_hotspot_target).attr('data_y') ) + this.minY

            });
          } else {
            //if the position isn't available (does not have an available class) send it back to its starting position)
            $(this.target).removeClass("correct wrong highlight-correct highlight-wrong positioned");
            //show a message that an item has already been placed there and return item to starting position
            tl_return = new TimelineLite({
              onStart: function(){
                hotspot_prompt.addClass('wrong').html('Υπάρχει κάτι εκεί, δοκίμασε να το βάλεις σε άλλη θέση!');
              },
              onComplete: function(){
                setTimeout(function(){
                  hotspot_prompt.removeClass('wrong').html('');
                },1000);
                
              }
            });
            tl_return
            .to(this.target, 0.1, { 
              x: 0, 
              y: 0
            });
          }
          //if there is a current target (i.e. a match has been made, don't allow it to be a target as long as its populated with another draggable item)
          $(current_hotspot_target).removeClass('available'); 
        } 
      }//end for loop
      if(!snapMade){
        hotspot_check.addClass('visually-hidden');
        $(this.target).removeClass("showOver correct wrong highlight-correct highlight-wrong positioned ripple");
        positioned = $(quiz).find('.positioned');
        if (positioned.length === 0) {
          //only show the check hotspot button if at least an item has been dragged
          hotspot_check.addClass('visually-hidden');
        }
        hotspot_clear.addClass('visually-hidden');
        $(this.target).attr("data-target",'');
        TweenLite.to(this.target, 0.2, {
          css: {
             x: 0, 
            y: 0
          }
        });
      }
    }
  });//end draggable

  //check right answers
  hotspot_check.on('click', function(){
    console.log(this);
    var hotspot_check_id = $(this).attr('id');
    var hotspot_id = hotspot_check_id.substring(0, hotspot_check_id.indexOf('--'));
    var hotspot_labels = $('#'+hotspot_id+' .right-positions');
    var draggable_item = $('#'+hotspot_id+' .drag-handle');
    var correct = $('#'+hotspot_id+' .correct');
    var wrong = $('#'+hotspot_id+' .wrong');

    correct.addClass('highlight-correct');
    wrong.addClass('highlight-wrong');

    var positioned = $('#'+hotspot_id+' .positioned');
    var correct_positioned = $('#'+hotspot_id+' .positioned.correct');
    if (draggable_item.length === correct_positioned.length) {
      hotspot_clear.removeClass('visually-hidden');
      hotspot_check.addClass('visually-hidden');
      hotspot_prompt.addClass('correct').html('Όλα σωστά! Μπράβο!');
    } else if (draggable_item.length === positioned.length && positioned.length !== correct_positioned.length) {
        setTimeout(function(){
          hotspot_reset.removeClass('visually-hidden');
        }, 100);
    } 
  });
  //see the right positions
  hotspot_reset.on('click', function(){
    var hotspot_reset_id = $(this).attr('id');
    var hotspot_id = hotspot_reset_id.substring(0, hotspot_reset_id.indexOf('--'));
    var right_positions = $('#'+hotspot_id+' .right-positions');
    var draggable_item = $('#'+hotspot_id+' .drag-handle');
    var ht;

    var tl = new TimelineLite();
    tl
    .set(draggable_item,{
      opacity: 0,
      x: 0,
      y: 0
    });

    draggable_item.removeClass('positioned correct wrong highlight-wrong highlight-correct');

    var hotspot_texts = [];
    for(var t=0;t<right_positions.length;t++){
      ht = right_positions[t];
      $(ht).removeClass('no-opacity');
      hotspot_texts.push(ht);
    }

    tl.staggerFromTo(hotspot_texts, 1, {opacity:0}, {opacity:1}, 1);

    setTimeout(function(){
      hotspot_reset.addClass('visually-hidden');
      hotspot_check.addClass('visually-hidden');
      hotspot_clear.removeClass('visually-hidden');
    }, 100);
  });
  //play again / reset game
  hotspot_clear.on('click', function(){
    var hotspot_clear_id = $(this).attr('id');
    var hotspot_id = hotspot_clear_id.substring(0, hotspot_clear_id.indexOf('--'));
    var right_positions = $('#'+hotspot_id+' .right-positions');
    var draggable_item = $('#'+hotspot_id+' .drag-handle');
    hotspot_prompt.removeClass('correct').html('');
    right_positions.removeAttr('style').addClass('no-opacity');
    draggable_item.removeClass('positioned correct wrong highlight-wrong highlight-correct');
    $('#'+hotspot_id+' .drag-handle-target').addClass('available').removeClass('showOver ripple').attr('data-hit','');
    var tl = new TimelineLite();
    tl
    .set(draggable_item,{
      opacity: 0,
      x: 0,
      y: 0
    });
    setTimeout(function(){
      hotspot_clear.addClass('visually-hidden');
      hotspot_reset.addClass('visually-hidden');
      hotspot_check.addClass('visually-hidden');
    }, 100);

    //kill everything
    TweenMax.killAll();

    TweenLite.to(draggable_item, 0.5,{
      opacity: 1
    });
  });
}//end for hotspot loop

function reset_hotspot() {
  var all_hotspot = $(parent.page.modal).find('.quiz-hotspot');
  if (all_hotspot) {
      var _right_positions = all_hotspot.find('.right-positions');
      var _draggable_item = all_hotspot.find('.drag-handle');
      var _hotspot_prompt = $('.check-answer-hotspot');
      var _hotspot = all_hotspot.find('.drag-handle-target');
      var _hotspot_clear = $('.clear-hotspot');
      var _hotspot_reset = $('.reset-hotspot');
      var _hotspot_check = $('.check-hotspot');

      _hotspot_prompt.removeClass('correct').html('');
      _right_positions.removeAttr('style').addClass('no-opacity');
      _draggable_item.removeClass('positioned correct wrong highlight-wrong highlight-correct ripple');
      _hotspot.removeClass('showOver ripple').addClass('available').attr('data-hit','');
      var tl = new TimelineLite();
      tl
      .set(_draggable_item,{
        x: 0,
        y: 0
      });
      setTimeout(function(){
        _hotspot_clear.addClass('visually-hidden');
        _hotspot_reset.addClass('visually-hidden');
        _hotspot_check.addClass('visually-hidden');
      }, 100);

      //kill everything
      TweenMax.killAll();

      TweenLite.to(_draggable_item, 0.5,{
        opacity: 1
      });
  }
}
/*------------------------------------*\
  # Hotspot Quiz - END
\*------------------------------------*/
/*------------------------------------*\
  # Drag and Drop Quiz - START
  * draganddrop = dnd
\*------------------------------------*/
  //select elements with .quiz-dnd class
var dnd_quiz = $(this.page.modal).find('.quiz-dnd');
var draggables = [];
var quiz;
var dnd_origin_container;
var dnd_target_container;
var sound_element;
var sound_src;
var audio_el;
var audios;
var origin_items = [];
var target_items = [];
var dnd_targets;
var dnd_available_targets;
var dnd_overlapThreshold = "50%";
var dnd_prompt;
var dnd_reset;
var dnd_check;
var dnd_clear;
var dnd_target_handle_x;
var dnd_target_handle_y;
var dnd_parent_x;
var dnd_parent_y;
var distance_top;
var tl_return;
//if the page contains a hotspot quiz
//for each dnd quiz
for(var d = 0;d<dnd_quiz.length;d++){

  quiz = dnd_quiz[d];

  dnd_origin_container = $(quiz).find('.dnd-origin-container');
  dnd_target_container = $(quiz).find('.dnd-target-container');

  this.dnd_origin = $(quiz).find('.dnd-origin.dnd-label');
  this.dnd_target = $(quiz).find('.dnd-target.dnd-label');
  this.dnd_origin_handle = this.dnd_origin.find('.drag-handle');
  this.dnd_target_handle = this.dnd_target.find('.drag-handle-target');
  this.dnd_target_sound_el = this.dnd_target.find('.sound');

  this.dnd_target_handle.addClass('available');

  sound_element = $('<audio/>', {   
    "preload": "auto",
    "controls": true,
    'class': 'audio-element'
  }).appendTo( $(parent.dnd_target_sound_el) );

  //loop through the sound element and grab the src to append to audio
  for(var se=0;se<parent.dnd_target_sound_el.length;se++) {
    sound_src = parent.dnd_target_sound_el[se];
    audio_el = $(sound_src).find(sound_element);
    audio_el.attr('src',$(sound_src).attr('data-audio'));
  }

  //play only one audio file at a time
  document.addEventListener('play', function(e){
    audios = document.getElementsByTagName('audio');
    for(var i = 0, len = audios.length; i < len;i++){
        if(audios[i] != e.target){
          audios[i].pause();
        }
    }
  }, true);

  //shuffle the origin and target arrays 
  for(var o=0;o<this.dnd_origin.length;o++) {
    var o_item = this.dnd_origin[o];
    origin_items.push(o_item);
  }
  for(var j=0;j<this.dnd_target.length;j++) {
    var j_item = this.dnd_target[j];
    target_items.push(j_item);
  }
  
  shuffle(target_items);
  shuffle(origin_items);
  $(dnd_origin_container).html(origin_items);
  $(dnd_target_container).html(target_items);

  //set some variables


  dnd_overlapThreshold = "50%";
  dnd_prompt = $(quiz).find('.check-answer-dnd');
  dnd_reset = $('#'+$(quiz).attr('id')+'--reset');
  dnd_check = $('#'+$(quiz).attr('id')+'--check');
  dnd_clear = $('#'+$(quiz).attr('id')+'--clear');
  dnd_prompt = $('#'+$(quiz).attr('id')+'--check-answer-dnd');

  draggables[d] = Draggable.create('#'+$(dnd_quiz[d]).attr('id')+' .drag-handle-'+(d+1), {
    type: "x,y",
    bounds: $('#'+$(quiz).attr('id')),
    allowNativeTouchScrolling:false,
    onPress:function() {
      //record the starting values so we can compare them later...
      //for each target find its position in the bounds container and assign it to the 
      //origin, doing this here because hidden elements do not have offsets, needs to be
      // retriggered
      dnd_target_container = $(this.target).parent().parent().parent();
      dnd_targets = dnd_target_container.find('.drag-handle-target');
      dnd_available_targets = dnd_target_container.find('.available');

      for(var lp = 0;lp<dnd_targets.length;lp++){
        _target = dnd_targets[lp];
        _parent = $(_target).parent();
        //get the target handle position relative to its parent li element
        dnd_target_handle_x = $(_target).position().left;
        dnd_target_handle_y = $(_target).position().top;
        //get the parent li element position relative to its ul
        dnd_parent_x = $(_parent).position().left;
        dnd_parent_y = $(_parent).position().top;
        //subtract target handle position from li to find exact handle target position in bounds container
        data_x = dnd_parent_x - dnd_target_handle_x;
        data_y = dnd_parent_y - dnd_target_handle_y;
        //assign the position as attributes to grab later on dragEnd
        $(_target).attr('data_x', data_x);
        $(_target).attr('data_y', data_y);

        //on drag start check the data-hit attribute - if it has a value it is because a draggable instance has been assigned to it and passed it its data-identifier attribute
        //if it has a value it means draggable was there
        //remove the data-hit attribute value and signify that it is available again
        if ( $(_target).attr('data-hit') === $(this.target).attr('data-identifier') ) {
          $(_target).attr('data-hit','').addClass('available').removeClass('showOver ripple');
        }
      }
      dnd_reset.addClass('visually-hidden');
      dnd_check.removeClass('visually-hidden');
      //clear the prompt message box
      dnd_prompt.html('');
    },
    onDragStart: function() {
      $(dnd_target_container).find('.clone').removeClass('visually-hidden');
    },
    onDrag:function(e) {
      for(var i=0; i<dnd_targets.length;i++){
        _target = dnd_targets[i];
        if (this.hitTest(_target, dnd_overlapThreshold)) {
          //if draggable in target range highlight it and animate it
          $(_target).addClass("showOver ripple");
         } else {
          if ($(_target).attr('data-hit') === '') {
            $(_target).removeClass("showOver ripple");
          }
          
         }
      }
    },
    onDragEnd:function(e) {
      snapMade = false;
      for(var i=0; i<dnd_targets.length;i++){
        current_dnd_target = dnd_targets[i];
        identifier = $(current_dnd_target).attr('data-identifier');
        if(this.hitTest(current_dnd_target, dnd_overlapThreshold)){
          snapMade = true; 
          //connect source and target via an identifier
          //give the draggable item an attr of data-target with a value of the hit id
          //also give it a couple of styling classes
          $(this.target).attr('data-target', identifier).addClass("positioned ripple");
          //after a hit has been made reveal the check hotspot button
          dnd_check.removeClass('visually-hidden');
          //if the item has been assigned correctly assign styling classes
          if ( $(this.target).attr('data-target') === $(this.target).attr('data-identifier') ) {
            $(this.target).removeClass("wrong highlight-wrong correct highlight-correct");
            $(this.target).addClass("correct");
          } else if ($(this.target).attr('data-target') !== $(this.target).attr('data-identifier') ) {
            $(this.target).removeClass("wrong highlight-wrong correct highlight-correct");
            $(this.target).addClass("wrong");
          }

          if ( $(current_dnd_target).hasClass("available") ) { 
            //if there isn't one there already
            //give the target an attribute of data-hit to mark that there has been a match
            $(current_dnd_target).attr('data-hit',$(this.target).attr('data-identifier'));
            //move item to position if position available and overlapThreshold condition is met
            tl = new TimelineLite();
            
            distance_top = parseInt( $(current_dnd_target).attr('data_y')) + this.minY + 56;
            tl
            .set(this.target, { 
              left: parseInt( $(current_dnd_target).attr('data_x') ),
              top: parseInt( $(current_dnd_target).attr('data_y') )
            })
            .to(this.target, 0.5, {
              x:  -(parseInt( $(current_dnd_target).attr('data_x')) + this.maxX + 46),//
              y: distance_top // 36 + (- 6) data_y
            });
          } else {
            //if the position isn't available (does not have an available class) send it back to its starting position)
            $(this.target).removeClass("correct wrong highlight-correct highlight-wrong positioned");
            //show a message that an item has already been placed there and return item to starting position
            tl_return = new TimelineLite({
              onStart: function(){
                dnd_prompt.addClass('wrong').html('Υπάρχει κάτι εκεί, δοκίμασε να το βάλεις σε άλλη θέση!');
              },
              onComplete: function(){
                setTimeout(function(){
                  dnd_prompt.removeClass('wrong').html('');
                },1000);
                
              }
            });
            tl_return
            .to(this.target, 0.1, { 
              x: 0, 
              y: 0
            });
          }
          //if there is a current target (i.e. a match has been made, don't allow it to be a target as long as its populated with another draggable item)
          $(current_dnd_target).removeClass('available'); 
        } 
      }//end for loop
      if(!snapMade){
        dnd_check.addClass('visually-hidden');
        $(this.target).removeClass("showOver correct wrong highlight-correct highlight-wrong positioned ripple");
        positioned = $(quiz).find('.positioned');
        if (positioned.length === 0) {
          //only show the check hotspot button if at least an item has been dragged
          dnd_check.addClass('visually-hidden');
        }
        dnd_clear.addClass('visually-hidden');
        $(this.target).attr("data-target",'');
        TweenLite.to(this.target, 0.2, {
          css: {
             x: 0, 
            y: 0
          }
        });
      }
    }
  });

  //check right answers
  dnd_check.on('click', function(){
    var dnd_check_id = $(this).attr('id');
    var dnd_id = dnd_check_id.substring(0, dnd_check_id.indexOf('--'));
    var dnd_labels = $('#'+dnd_id+' .right-positions');
    var draggable_item = $('#'+dnd_id+' .drag-handle');
    var correct = $('#'+dnd_id+' .correct');
    var wrong = $('#'+dnd_id+' .wrong');

    correct.addClass('highlight-correct');
    wrong.addClass('highlight-wrong');

    var positioned = $('#'+dnd_id+' .positioned');
    var correct_positioned = $('#'+dnd_id+' .positioned.correct');
    if (draggable_item.length === correct_positioned.length) {
      dnd_clear.removeClass('visually-hidden');
      dnd_check.addClass('visually-hidden');
      dnd_prompt.addClass('correct').html('Όλα σωστά! Μπράβο!');
    } else if (draggable_item.length === positioned.length && positioned.length !== correct_positioned.length) {
        setTimeout(function(){
          dnd_reset.removeClass('visually-hidden');
        }, 100);
    } 
  });
  //see the right positions
  dnd_reset.on('click', function(){
    var dnd_reset_id = $(this).attr('id');
    var dnd_id = dnd_reset_id.substring(0, dnd_reset_id.indexOf('--'));
    var right_positions = $('#'+dnd_id+' .right-positions');
    var draggable_item = $('#'+dnd_id+' .drag-handle');

    var tl = new TimelineLite();
    tl
    .set(draggable_item,{
      opacity: 0,
      x: 0,
      y: 0
    });

    draggable_item.removeClass('positioned correct wrong highlight-wrong highlight-correct');

    var dnd_texts = [];
    for(var t=0;t<right_positions.length;t++){
      var ht = right_positions[t];
      $(ht).removeClass('no-opacity');
      dnd_texts.push(ht);
    }

    tl.staggerFromTo(dnd_texts, 1, {opacity:0}, {opacity:1}, 1);

    setTimeout(function(){
      dnd_reset.addClass('visually-hidden');
      dnd_check.addClass('visually-hidden');
      dnd_clear.removeClass('visually-hidden');
    }, 100);
  });
  //play again / reset game
  dnd_clear.on('click', function(){
    var dnd_clear_id = $(this).attr('id');
    var dnd_id = dnd_clear_id.substring(0, dnd_clear_id.indexOf('--'));
    var right_positions = $('#'+dnd_id+' .right-positions');
    var draggable_item = $('#'+dnd_id+' .drag-handle');
    dnd_prompt.removeClass('correct').html('');
    right_positions.removeAttr('style').addClass('no-opacity');
    draggable_item.removeClass('positioned correct wrong highlight-wrong highlight-correct');
    $('#'+dnd_id+' .drag-handle-target').addClass('available').removeClass('showOver ripple').attr('data-hit','');
    var tl = new TimelineLite();
    tl
    .set(draggable_item,{
      opacity: 0,
      x: 0,
      y: 0
    });
    setTimeout(function(){
      dnd_clear.addClass('visually-hidden');
      dnd_reset.addClass('visually-hidden');
      dnd_check.addClass('visually-hidden');
    }, 100);

    //kill everything
    TweenMax.killAll();

    TweenLite.to(draggable_item, 0.5,{
      opacity: 1
    });
  });
}

function reset_dnd() {
  var all_dnd = $(parent.page.modal).find('.quiz-dnd');
  if (all_dnd) {
      var _right_positions = all_dnd.find('.right-positions');
      var _draggable_item = all_dnd.find('.drag-handle');
      var _dnd_prompt = $('.check-answer-dnd');
      var _dnd = all_dnd.find('.drag-handle-target');
      var _dnd_clear = $('.clear-dnd');
      var _dnd_reset = $('.reset-dnd');
      var _dnd_check = $('.check-dnd');

      _dnd_prompt.removeClass('correct').html('');
      _right_positions.removeAttr('style').addClass('no-opacity');
      _draggable_item.removeClass('positioned correct wrong highlight-wrong highlight-correct ripple');
      _dnd.removeClass('showOver ripple').addClass('available').attr('data-hit','');
      var tl = new TimelineLite();
      tl
      .set(_draggable_item,{
        x: 0,
        y: 0
      });
      setTimeout(function(){
        _dnd_clear.addClass('visually-hidden');
        _dnd_reset.addClass('visually-hidden');
        _dnd_check.addClass('visually-hidden');
      }, 100);

      //kill everything
      TweenMax.killAll();

      TweenLite.to(_draggable_item, 0.5,{
        opacity: 1
      });
  }
}
/*------------------------------------*\
  # Drag and Drop Quiz - END
\*------------------------------------*/
/*------------------------------------*\
  # Glossary function
\*------------------------------------*/
  //parent.glossary();
parent.term_popup('.glossary-term', 'data-html');

//end open_page function
};

// MapViewItem.prototype.glossary = function () {
//   var parent = this;

//   var glossary_term = document.querySelectorAll('.glossary-term');

//   var create_glossary_popups = function (element) {
//     var parent = this;
//     this.popup_text = element.getAttribute('data-html');
//     this.popup = $('<div />', {
//       'class': 'glossary-popup',
//       'html': this.popup_text
//     }).insertAfter(element);
//     this.popup_close = $('<i />', {
//       'class': 'icon close-popup glossary-close'
//     }).appendTo(popup);

//     $('.glossary-close').on('click', function(e){
//       $(this).parent().removeClass('open');
//     });
//   };

//   var open_glossary_popup = function (element) {
//     if (element.target !== this) {
//       return;
//     }
//     //$(element.target).addClass('current');
//     //get the target's popup
//     var this_popup = $(element.target).next('.glossary-popup');
//     //get all open popups except for our target
//     var all_open_popups = $('.glossary-term').not(element.target).next('.glossary-popup.open');
//     //remove all open popups before opening a new one
//     for (var i=0;i<all_open_popups.length;i++) {
//      $(all_open_popups[i]).removeClass('open');
//     }

//     $(element.target).parent().width();
//     //position the popup relative to trigger
//     var trigger_position_left = $(element.target).position().left;
//     var parent_width = $(element.target).parent().width();

//     if ( parseInt(parent_width - trigger_position_left) <  this_popup.width()/1.5 ) {
//       this_popup.css('right', 0);
//     } else {
//       this_popup.css('left', trigger_position_left);
//     }
      
//     //toggle the open class on click
//     this_popup.addClass('open');
//   };
//   //for each glossary term in the content 
//   // 1. create a popup
//   // 2. add a click event
//   for (var i=0;i<glossary_term.length;i++) {
//     create_glossary_popups(glossary_term[i]); /*1*/
//     glossary_term[i].addEventListener('mouseover', open_glossary_popup, {passive: true}); /*2*/
//   }
// };

MapViewItem.prototype.term_popup = function (term_class, text_attribute) {
  var parent = this;
  var term = document.querySelectorAll(term_class);

  var create_term_popup = function (element) {
    if (element.getAttribute('data-title') === null) { return; }
    var parent = this;
    if (element.getAttribute('data-title')) {
        this.term_title = element.getAttribute('data-title');
        this.term_description = element.getAttribute('data-description') || element.getAttribute('data-html'); 
    }

    this.term_popup = $('<article />', {
      'class': 'term-popup',
      'html': '<h2>'+this.term_title+'</h2><p>'+this.term_description+'</p>'
    }).appendTo(element);

    this.close_popup = $('<i />', {
      'class': 'icon close-popup term-close'
    }).appendTo(term_popup);

    $('.term-close').on('click', function(e){
      $(this).parent().removeClass('open');
    });
  };

  var open_term_popup = function (element) {
    if (element.target !== this) {
      return;
    }
    //$(element.target).addClass('current');
    //get the target's popup
    var this_term_popup = $(element.target).find('.term-popup');
    var this_term_popup_open = $(element.target).find('.term-popup.open');
    //get all open popups except for our target
    var all_open_term_popups = $(term_class).not(element.target).find('.term-popup.open');
    //remove all open popups before opening a new one
    for (var i=0;i<all_open_term_popups.length;i++) {
     $(all_open_term_popups[i]).removeClass('open');
    }

    //position the popup relative to trigger
    var trigger_position = $(element.target).position();
    var parent_width = $('.page-content').width();
    var term_popup_width = 460;

    this_term_popup.css('top', '32px');
    if( term_popup_width > parseInt(parent_width - trigger_position.left) ) {
      this_term_popup.css('right', '0px');
    } else if ( parseInt(trigger_position.left) < term_popup_width/2 ) {
      this_term_popup.css('left', '0px');
    } else {
      this_term_popup.css('left', -term_popup_width/2);
    }
      
    //toggle the open class on click
    this_term_popup.addClass('open');
    
  };

  //for each glossary term in the content 
  // 1. create a popup
  // 2. add a click event
  for (var i=0;i<term.length;i++) {
    var _term = term[i];
    create_term_popup(_term); /*1*/
    _term.addEventListener('mouseover', open_term_popup, {passive: true}); /*2*/
    if (USER_IS_TOUCHING) {
      _term.addEventListener('touchstart', open_term_popup, {passive: true}); /*2*/
    }
  }
  
  if (!USER_IS_TOUCHING) {
    //close the modal: click anywhere to close it, or hit any key
    $(document).on('keyup click', function(){ //
      $(".term-popup.open, .glossary-popup.open").removeClass('open');
    });
  }


};

MapViewItem.prototype.page_close = function () {
  var parent = this;
  if(!this.page.open) { 
    console.log('page closed already cannot reclose');
    return; 
  }
  console.log('page_close fired', parent);

  var inner_page = $(this.page.modal).find('.page');
  function hideOverlay() {
    $(parent.page.modal).removeClass('overlay-open'); 
     console.log('page_close fired', parent);
  }

  function hidePage() {
    inner_page.removeClass('page-open');
    parent.page.open = false;
  }

  //TODO - need to find 
  var tl = new TimelineLite({
    onStart: function(){
      console.log('start close page');
    }
  });
 
  tl.add(hidePage);
  tl.addLabel("hide-overlay", 1);
  tl.add(hideOverlay, "hide-overlay");

  function resetForm(){
    var form = $('form');
    var url = form.attr('action');
    $.ajax({
      type: "POST",
      url: url,
      data: form.serialize(),
      success: function(event) {
        form.removeClass('submitted');
        form.find('input:text, input:password, input:file, select, textarea').val('');
        form.find('input:radio, input:checkbox, textarea').removeAttr('checked').removeAttr('selected').removeAttr('disabled');
        form.find('.checkbox-prompt').removeClass('visible');
        form.find('label').removeClass('selected');
        $('form .reset').addClass('visually-hidden');
        $('.submit').removeClass('none');
        $('.thankyou_message').css('display','none');
        $('.reset .loader').css('display','none'); 
      }  
    });
  }

  resetForm();
  $('.symbol-container').removeClass('visited');

  return tl;
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
    var duration;
    //change cursor according to mouse event
      if (d3.event.sourceEvent !== null) {
           
        if(d3.event.sourceEvent.ctrlKey) {
          console.log('Pressed CTRL', d3.event.sourceEvent);
          return;
        }
        if (d3.event.sourceEvent.deltaY < 0) {
          svg.style("cursor", "zoom-in");
          //if mobile
          if (cw < 1024) {
            duration = 0;
          } else {
            duration = 0;
          }
        } else if (d3.event.sourceEvent.deltaY > 0){
          svg.style("cursor", "zoom-out");
          //if mobile
          if (cw < 1024) {
            duration = 0;
          } else {
            duration = 0;
          }
        }
        if (d3.event.sourceEvent.movementX != 0 ||  d3.event.sourceEvent.movementY != 0) {
          svg.style("cursor", "move");
          duration = 0;
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

    var t = 0,
        l = 0,
        b = width,
        r = height;

  for(var p = 0; p < parent.map_items.length;p++) {
    var map_item = parent.map_items[p]; 
    map_item.tip.open = false;
    $(map_item.tip.modal).removeClass('open');
    map_item.pop.open = false; 
    $(map_item.pop.modal).removeClass('popup-open');
  }

  // Check if ctrl is pressed : the target here is to disable 
  // ctrl + / ctrl - because it breaks the zooming interface
  // I know I shouldn't but this app is a special case

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
      var pos_top = 
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

};

/* ========================================================================
======= EVENT LISTENERS ===================================================
======================================================================== */
MapViewItem.prototype._addListeners = function(){
  var parent = this; 
  
  //prevents closing the page when clicking on it - page only closes via close button or clicking outside it
  $('.page').on('mousedown', function(e) {
    e.stopPropagation();
  });

 //close page by clicking on the overlay
  $('.overlay').not( $(this).find('.page') ).on( "mousedown", function(){
    if(parent.page.open) {
      parent.page_close();
    }
  });
  //close page by clicking on close button
  $(this.page.modal).find('.close').on("mousedown", $.proxy(this.page_close, parent)); 
  //close popup by clicking on close button
  $(this.pop.modal).find('.close').on("mousedown", $.proxy(this.pop_close, parent));

};

/* ========================================================================
======= RENDERING FUNCTIONS ===============================================
======================================================================== */
MapViewItem.prototype._render = function(){
  var _this = this;   
};


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
  // this.render_modal();
};

Modal.prototype.init = function(){

  var parent = this;

  if(this.type == "popup") {
    this.modal = $('.map-popover.popup#' + this.point + '-popup');
  } else if(this.type == "tooltip"){
    this.open = true;
    this.modal = $('.map-popover.tooltip#' + this.point + '-tooltip');
  } else if(this.type == "page") {
    this.open = false;
    this.modal = $('.overlay#' + this.point + '-page');
  }
};

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
}; 


//create the map
$(function(){ 
  var map = new MapObject(); 
});
//-------------------------PROMISE-----------------------------//
window.onload = function() {

    var url = 'dist/proxy/data.json';

    if (!('fetch' in window)) {
      console.log('Fetch API not found, try including the polyfill');
      return;
    }

    fetch(url) // Call the fetch function passing the url of the API as a parameter
    .then(function(response){
      if (!response.ok) {
        throw Error(response.statusText); //if the objects ok property is false it triggers the catch block
      } else {
        console.log('Got a response');
      }
      return response.json();
    })
    .then(function(data) {
      $('#preloader h2').removeClass('visually-hidden');
      var tl = new TimelineLite({
        onStart: function(){
          $('#preloader h2').removeClass('visually-hidden');
          $('.logo, .floating-element--button, .map-controls').removeClass('visually-hidden');
        },
        onComplete: function(){
          $('#preloader').addClass('visually-hidden');
          $('.logo, .floating-element--button, .map-controls, .info-panel').removeClass('visually-hidden');
          console.log('complete');
        }
      });

      tl
      .to('#preloader .welcome', 1, {
        opacity: 1
      })
      .to(['#preloader .to-waterpolis'], 1, {
        opacity: 1
      }, "+=0.1")
      .to('#preloader', 0.5, {
        opacity: 0
      }, "+=1.5");
    
        //get all the posts excluding the intro post
        var posts = [];
        for(var i = 0;i<data.length;i++) {
          post = data[i];
          if(post.id !==321) {
             posts.push(post);
          }
        }  
        var info = [];
        for(var i = 0;i<data.length;i++) {
          post = data[i];
          if(post.id ===321) {
             info.push(post);
          }
        }

        var mapView = new MapView(posts, info);
        console.log(mapView);
    })
    .catch(function(error) {
        // run code if the server returns any errors
      console.log('Looks like there was a problem: \n', error);
      this.errorMsg = $('<div/>', {
        'class': 'error-message',
        'html': '<h2>Λυπούμαστε υπήρξε κάποιο σφάλμα!</h2> <p>Δοκιμάστε να επαναφορτώσετε την εφαρμογή ή προσπαθήστε ξανά αργότερα.</p>'
      }).appendTo('body');
    });
}; //end window on load
  
//-------------------------END PROMISES-----------------------------//


// I am disabling user controlled zoom-in and zoom-out
// because mousewheel zoom is a central feature of this app
$(window).bind('keydown', function(event) {
  if (event.ctrlKey == true) {
    $('.ctrlZoom').addClass('overlay-open');
  }
});

$(window).bind('keyup', function(event) {
    $('.ctrlZoom').removeClass('overlay-open');
});

$(window).bind('mousewheel', function(event) {
  if (event.ctrlKey == true) {
    event.preventDefault();
  }
});




  

