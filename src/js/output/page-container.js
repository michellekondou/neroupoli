(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["page-container.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<div class='page slide'>\r\n  <button class='close'></button>\r\n  <header class=\"page-header\"></header>\r\n  <section class=\"page-content\"></section>\r\n  <footer class=\"page-footer\"></footer>\r\n</div>\r\n\r\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
