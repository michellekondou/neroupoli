

var onPan;
onPan = function(newPan){
  var stopHorizontal = false
    , stopVertical = false
    , gutterWidth = 100
    , gutterHeight = 100
      // Computed variables
    , sizes = this.getSizes()
    , leftLimit = -((sizes.viewBox.x + sizes.viewBox.width) * sizes.realZoom) + gutterWidth
    , rightLimit = sizes.width - gutterWidth - (sizes.viewBox.x * sizes.realZoom)
    , topLimit = -((sizes.viewBox.y + sizes.viewBox.height) * sizes.realZoom) + gutterHeight
    , bottomLimit = sizes.height - gutterHeight - (sizes.viewBox.y * sizes.realZoom)

  customPan = {}
  customPan.x = Math.max(leftLimit, Math.min(rightLimit, newPan.x))
  customPan.y = Math.max(topLimit, Math.min(bottomLimit, newPan.y))

  return customPan
}
 

  var beforePan;
        beforePan = function(oldPan, newPan){
          var stopHorizontal = false
            , stopVertical = false
            , gutterWidth = 100
            , gutterHeight = 100
              // Computed variables
            , sizes = this.getSizes()
            , leftLimit = -((sizes.viewBox.x + sizes.viewBox.width) * sizes.realZoom) + gutterWidth
            , rightLimit = sizes.width - gutterWidth - (sizes.viewBox.x * sizes.realZoom)
            , topLimit = -((sizes.viewBox.y + sizes.viewBox.height) * sizes.realZoom) + gutterHeight
            , bottomLimit = sizes.height - gutterHeight - (sizes.viewBox.y * sizes.realZoom)

          customPan = {}
          customPan.x = Math.max(leftLimit, Math.min(rightLimit, newPan.x))
          customPan.y = Math.max(topLimit, Math.min(bottomLimit, newPan.y))

          return customPan
        }
  // or
  //var svgElement = document.querySelector('#map');


// $( "#GL" ).click(function() {
//   alert( "You clicked on Greenland" );
// });

  //   console.log( 'diff: ', tower_rect.left - map_rect.left);
  //   console.log( $('#container').width() );
  //   console.log( panZoomMap.getSizes().width );
  //   console.log(  panZoomMap.getSizes().width - $('#container').width() );
  //   // Set zoom level to 2 at point
  //   // panZoomMap.resetZoom().fit();
  //   // panZoomMap.zoomAtPoint(4, {
  //   //   x:tower_rect.left, 
  //   //   y:tower_rect.top
  //   // });

  //       console.log(-( ( tower_rect.left )*realZoom )+(   panZoomMap.getSizes().width - $('#container').width()  ));
  //   console.log( $('#container').width() );
  //   console.log( panZoomMap.getSizes().width );
  //   console.log(  panZoomMap.getSizes().width - $('#container').width() );
  //   // Set zoom level to 2 at point
  //   // panZoomMap.resetZoom().fit();
  //   // panZoomMap.zoomAtPoint(4, {
  //   //   x:tower_rect.left, 
  //   //   y:tower_rect.top
  //   // });

  // var widthDiff = ( $('#container').width() ) - (panZoomMap.getSizes().width);


 
  // console.log(tower.getBoundingClientRect());
  // console.log(map_el.getBoundingClientRect());
  // console.log(
  // 'container-width:', $('#container').width(),
  // 'map-width: ', map_el.getBoundingClientRect().width,
  // 'tower left: ', tower.getBoundingClientRect().left,
  // 'map left: ', map_el.getBoundingClientRect().left


  //   );



var towerX = tower.getBoundingClientRect().left - map_el.getBoundingClientRect().left;
var towerY = tower.getBoundingClientRect().top - map_el.getBoundingClientRect().top;

var tankX = tank.getBoundingClientRect().left - map_el.getBoundingClientRect().left;
var tankY = tank.getBoundingClientRect().top - map_el.getBoundingClientRect().top;

console.log(tankX);

 