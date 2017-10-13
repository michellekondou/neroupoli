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
        registration.unregister()
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

  var post_data = [];
  //save the json data in an array
  for(var i = 0;i<parent.posts.length;i++) { 
    var post = parent.posts[i];
    post_data.push(post); 
  }

  //create the map points
  for(var j = 0;j<points.length;j++) {
    var point = points[j];
    for(var item in post_data) {
      if(post_data[item].title.rendered === point.id) { 
        var content = post_data[item];
        var post_id = post_data[item].id;
      }
    }  

    var rect = points[j].getBoundingClientRect();
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
        console.log('MOOOOOVE', d3.event.sourceEvent);
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

  // this.pop.modal.open = false;
  // $(this.pop.modal).removeClass('popup-open');
  $('.map-loader').css('display','block'); 
  //load content on page open to be able to refresh forms
  // var post = $.parseJSON($.ajax({
  //   //url: 'http://water-polis.gr/admin/index.php/wp-json/wp/v2/posts/'+this.post_id,
  //   url:' dist/proxy/data.json',
  //   dataType: "json", 
  //   async: false,
  //   success: function(data){
  //     $('.map-loader').css('display','none'); 
  //   }
  // }).responseText);

  // nunjucks.configure('src/js/templates', { 
  //   autoescape: false
  // });
  // //console.log('this.content',this.content);
  // this.page.modal.find('.page-content').html(

  //   nunjucks.render('page.html', { 
  //     title: this.content,
  //     text: this.content,
  //     quiz:  parent.posts,
  //     open: this.open
  //   }) 
  // );


  // this.page.modal.find('.page-header').html(
  //   nunjucks.render('page-header.html', { 
  //     title: this.content,
  //     text: this.content,
  //     quiz:  parent.posts,
  //     open: this.open
  //   }) 
  // );

  // this.page.modal.find('.page-footer').html(
  //   nunjucks.render('page-footer.html', { 
  //     title: this.content,
  //     text: this.content,
  //     quiz:  parent.posts,
  //     open: this.open
  //   }) 
  // );

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
  }

console.log(this);

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


$(likert_input).on('change', function(){
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

$(submit).on('click', function() {
    var submit_id = $(this).attr("id");   
    var form_id = submit_id.substring(0, submit_id.indexOf('--'));
    var forms = $('form#' + form_id);
    var option = $('#' + form_id + " input:radio, #" + form_id + " input:checkbox");
    var radio = $('#' + form_id + " input:radio");
    var checkbox = $('#' + form_id + " input:checkbox");
    var reset_btn = $('#' + form_id + "--reset");
    var selectedOption = $('#' + form_id + " input:checked");

   console.log(selectedOption);
    if (selectedOption.length >= 1) {
      //for all inputs
      for (var j=0;j<option.length;j++) {
        var this_option = option[j];
        //console.log(this_option);
        if ( $(this_option).prop('checked') == true ) {
          console.log($(this_option));
          $('#' + form_id + '--submit .loader').css('display','block');
          $('#' + form_id + '--form-error').html(''); 
          for(var i=0;i<forms.length;i++){
            var this_form = forms[i];
            if ( $(this_form).attr("id") === form_id ) {     
              var form = $(this_form);
              var data = getFormData(form);
              var url = form.attr('action');
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
    } else if ( selectedOption.length == 0 ) {
        $('#' + form_id + '--form-error').html('Παρακαλούμε διάλεξε πρώτα μια απάντηση!');
        $('#' + form_id + '--submit').addClass('disabled');
        console.log('please choose an option to submit the form');
    }//end outer for loop   

    var correct_answers = [];
    var selected_answers = [];
    //checkbox inputs
    for(var c=0;c<checkbox.length;c++){
      var this_checkbox = checkbox[c];
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
      var this_radio = radio[r];
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

$('input').on('change', function(){
    console.log('input selected');
    var submit_id = $(this).attr("id");
    $('.form-error').html('');
    $('.submit').removeClass('disabled');
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
  # Hotspot Quiz
\*------------------------------------*/

//get hotspot data - i.e. points with coordinates
var hotspot_data;
for(var card in card_content) {
  if (card_content[card].acf_fc_layout === 'hotspot') {
    hotspot_data = card_content[card].hotspots;
  }
}

//set some vars
var hotspot_quiz = $(this.page.modal).find('.quiz-hotspot').attr('id',this.page.point+'-quiz-hotspot');
this.hotspot_image = hotspot_quiz.find('.hotspot-image img');
var hotspot_container = hotspot_quiz.find('.hotspot-image');


// var hotspot_starting_container = $('.quiz-hotspot ul');
// var hotspot_starting_pos = null; //draggable item position
// var hotspot_target_container = $(this.hotspot_image);
// var hotspot_target = $(this.hotspot);
// var drag_right_offset = $('.hotspot-image img').width() + 50;

// var initial_x = 0;
// var initial_y = 0;

//set array with snap points for drag end
var snapX = [],
    snapY = [];
//put the hotspot on the image
for(var hotspot in hotspot_data) { 
  var hotspot_title = hotspot_data[hotspot].hotspot_title;
  var hotspot_description = hotspot_data[hotspot].hotspot_description;
  var hotspot_coordinates = hotspot_data[hotspot].hotspot_coordinates;
  var hotspot_coordinates_x = hotspot_coordinates.substring(0, hotspot_coordinates.indexOf(','));
  var hotspot_coordinates_y = hotspot_coordinates.split(',')[1];
  //console.log(hotspot_coordinates_x);

  var newX = Math.round( parseFloat(hotspot_coordinates_x) - 3);
  var newY = Math.round( parseFloat(hotspot_coordinates_y) - 4);
  var pixels_x = $(this.hotspot_image).width()*(newX/100);
  var pixels_y = $(this.hotspot_image).height()*(newY/100);

  this.hotspot = $("<div />", {
    "class": "hotspot",
    "style": "left: " + Math.round( parseFloat(hotspot_coordinates_x) - 3) + "%;" + "top: " + Math.round(parseFloat(hotspot_coordinates_y) - 4) + "%;",
    "data-title": hotspot_title,
    "data-description": hotspot_description,
    'data_x': pixels_x,
    'data_y': pixels_y,

  }).appendTo($(hotspot_container));

  var hotspot_label_container = $("<div />", {
    "class": "hotspot-labels visually-hidden",
  }).appendTo($(this.hotspot));

  var hotspot_label_circle = $("<span />", {
    "class": "circle",
  }).appendTo($(hotspot_label_container));

  var hotspot_label_text = $("<span />", {
    "class": "text",
    "html": hotspot_title
  }).appendTo($(hotspot_label_container));

  // this.hotspot_tooltip = $("<div />", {
  //     "class": "map-popover tooltip top"
  // }).text(hotspot_title).appendTo($(hotspot_container));

  snapX.push(pixels_x);
  snapY.push(pixels_y);

}

if (hotspot_quiz.hasClass('mouseover')) {
  parent.term_popup('.hotspot', 'title');
}

var targets = hotspot_quiz.find('.hotspot');
var overlapThreshold = "90%"; 

var draggable;
var draggable_item = hotspot_quiz.find('.hotspot-labels');
var draggable_item_clone = draggable_item.clone().addClass('clone').removeClass('draggable-item');

var _targets = hotspot_quiz.find('.hotspot');

draggable = Draggable.create('.draggable-item', {
        type: "x,y",
        bounds: "#"+this.page.point+'-quiz-hotspot',
        allowNativeTouchScrolling:false,
       // throwProps: true,
        onPress:function() {
          //record the starting values so we can compare them later...
          startY = this.y;
        },
        onDragStart:function(e) {
          this_target = this;
          // console.log('this_target', this_target);
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
             }
          }
        },
        onDragEnd:function(e) {
          console.log(this.pointerEvent);
          var snapMade = false;
          for(var i=0; i<targets.length;i++){
            
            if(this.hitTest(targets[i], overlapThreshold)){
              //connect source and target via an identifier
              var identifier = $(targets[i]).attr('title');
              console.log('identifier', identifier);
              $(this.target).attr('data-target', identifier);
              var p = $(targets[i]).position();
              $(this.target).addClass("positioned");
              // if ($(targets[i]).attr('title') === $(this.target).attr('data-target')) {
              //    $(targets[i]).addClass("match");
              //    console.log("Math");
              // }
             
              // console.log(
              //   this,
              //   this_target.minX,
              //   this_target.minX - parseInt($(targets[i]).attr('data_x')),
              //   drag_right_offset, 
              //   $(targets[i]).attr('data_x'), 
              //   -(drag_right_offset - $(targets[i]).attr('data_x')),
              //   this.minY,
              //   $(targets[i]).attr('data_y'),
              //    parseInt( $(targets[i]).attr('data_y') ) + this.minY - 5
              // );
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
            $(this.target).attr("data-target",'');
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

var hotspot_reset = $(this.page.modal).find('.reset-hotspot');
hotspot_reset.attr('id',this.page.point+'-quiz-hotspot--reset');

hotspot_reset.on('click', function(){
  var hotspot_reset_id = $(this).attr('id');
  var hotspot_id = hotspot_reset_id.substring(0, hotspot_reset_id.indexOf('--'));
  var hotspot_labels = $('#'+hotspot_id+' .hotspot .hotspot-labels');
  var draggable_item = $('#'+hotspot_id+' .draggable-item');
  var tl = new TimelineLite();
  tl
  .to('.draggable-item', 0.1,{
    x: 0,
    y: 0
  });
  
  hotspot_labels.addClass('visible').removeClass('visually-hidden');

  setTimeout(function(){
    hotspot_reset.addClass('visually-hidden');
    hotspot_clear.removeClass('visually-hidden');
  }, 100);

});

var hotspot_clear = $(this.page.modal).find('.clear-hotspot');
hotspot_clear.attr('id',this.page.point+'-quiz-hotspot--clear');

hotspot_clear.on('click', function(){
  var hotspot_clear_id = $(this).attr('id');
  var hotspot_id = hotspot_clear_id.substring(0, hotspot_clear_id.indexOf('--'));
  var hotspot_labels = $('#'+hotspot_id+' .hotspot .hotspot-labels');

  hotspot_labels.addClass('visually-hidden');

  setTimeout(function(){
    hotspot_clear.addClass('visually-hidden');
    hotspot_reset.removeClass('visually-hidden');
  }, 100);

});



/*------------------------------------*\
  # Glossary function
\*------------------------------------*/
  parent.glossary();

//end open_page function
};

MapViewItem.prototype.glossary = function () {
  var parent = this;

  var glossary_term = document.querySelectorAll('.glossary-term');

  var create_glossary_popups = function (element) {
    var parent = this;
    this.popup_text = element.getAttribute('data-html');
    this.popup = $('<div />', {
      'class': 'glossary-popup',
      'html': this.popup_text
    }).insertAfter(element);
    this.popup_close = $('<i />', {
      'class': 'icon close-popup glossary-close'
    }).appendTo(popup);

    $('.glossary-close').on('click', function(e){
      $(this).parent().removeClass('open');
    });
  };

  var open_glossary_popup = function (element) {
    if (element.target !== this) {
      return;
    }
    //$(element.target).addClass('current');
    //get the target's popup
    var this_popup = $(element.target).next('.glossary-popup');
    //get all open popups except for our target
    var all_open_popups = $('.glossary-term').not(element.target).next('.glossary-popup.open');
    //remove all open popups before opening a new one
    for (var i=0;i<all_open_popups.length;i++) {
     $(all_open_popups[i]).removeClass('open');
    }

    $(element.target).parent().width();
    //position the popup relative to trigger
    var trigger_position_left = $(element.target).position().left;
    var parent_width = $(element.target).parent().width();

    if ( parseInt(parent_width - trigger_position_left) <  this_popup.width()/1.5 ) {
      this_popup.css('right', 0);
    } else {
      this_popup.css('left', trigger_position_left);
    }
      
    //toggle the open class on click
    this_popup.addClass('open');
  };
  //for each glossary term in the content 
  // 1. create a popup
  // 2. add a click event
  for (var i=0;i<glossary_term.length;i++) {
    create_glossary_popups(glossary_term[i]); /*1*/
    glossary_term[i].addEventListener('mouseover', open_glossary_popup, {passive: true}); /*2*/
  }
};

MapViewItem.prototype.term_popup = function (term_class, text_attribute) {
  var parent = this;
  var term = document.querySelectorAll(term_class);
  var create_term_popup = function (element) {
    console.log('SHOW POPUP AFTER THIS',element);
    var parent = this;
    this.term_title = element.getAttribute('data-title'); 
    this.term_description = element.getAttribute('data-description'); 
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

    $(element.target).parent().width();
    //position the popup relative to trigger

    var trigger_position = $(element.target).position();
    console.log('Trigger position',trigger_position);
    var parent_offset = $(element.target).parent().position();
    var parent_width = $('.page-content').width();
    console.log(parent_width, this_term_popup_open.width());
    var term_popup_width = 460;

    this_term_popup.css('top', '32px');
    if( term_popup_width > parseInt(parent_width - trigger_position.left) ) {
      this_term_popup.css('right', '32px');
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
    create_term_popup(term[i]); /*1*/
    term[i].addEventListener('mouseover', open_term_popup, {passive: true}); /*2*/
  }
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
  };

  var tl = new TimelineLite();
 
  tl.addLabel("hide-overlay", 0.8);
  tl.add(closeOverlay, "hide-overlay");


  function resetForm(){
    var form = $('form');
    var url = form.attr('action');
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
        $('.reset').addClass('visually-hidden');
        $('.submit').removeClass('none');
        $('.thankyou_message').css('display','none');
        $('.reset .loader').css('display','none'); 
      }  
    });
  }

  resetForm();
  //remove all game clones
  $('.clone').remove();
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
      } 
      console.log('Got a response');
      return response.json();
    })
    .then(function(data) {
      
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
        //opacity: 0
      }, "+=1.5");
    
        //get all the posts excluding the intro post
        console.log(data);
        var posts = [];
        for(var i = 0;i<data.length;i++) {
          var post = data[i];
          if(post.id !==321) {
             posts.push(post);
          }
        }  
        var info = [];
        for(var i = 0;i<data.length;i++) {
          var post = data[i];
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
    });
}; //end window on load
  
//-------------------------END PROMISES-----------------------------//


// I am disabling user controlled zoom-in and zoom-out
// because mousewheel zoom is a central feature of this app
$(window).bind('keydown', function(event) {
  if (event.ctrlKey == true) {
    console.log("pressed");
    $('.ctrlZoom').addClass('overlay-open');
  }
});

$(window).bind('keyup', function(event) {
    console.log("NOT pressed");
    $('.ctrlZoom').removeClass('overlay-open');
});

$(window).bind('mousewheel', function(event) {
  if (event.ctrlKey == true) {
    event.preventDefault();
  }
});

var didScroll = false;

window.onscroll = doThisStuffOnScroll;

function doThisStuffOnScroll() {
    didScroll = true;
}

setInterval(function() {
    if(didScroll) {
        didScroll = false;
        console.log('You scrolled');
    }
}, 100);




  

