(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["info-header.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<h2 class=\"outer-point-title\">ΤΟ ΝΕΡΟ ΣΤΗΝ ΠΟΛΗ</h2>\r\n";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "text")),"acf")),"intro_text"), env.opts.autoescape);
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
