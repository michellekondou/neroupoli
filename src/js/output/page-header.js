(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["page-header.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += " \r\n<h2 class=\"outer-point-title\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "title")),"acf")),"card_title"), env.opts.autoescape);
output += "</h2>\r\n<div class=\"progress-bar\">\r\n<!--   <div class=\"progress-bar-line\"></div> -->\r\n  ";
frame = frame.push();
var t_3 = runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "text")),"acf")),"cards");
if(t_3) {var t_2 = t_3.length;
for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("card", t_4);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += " \r\n  <div class=\"symbol-container symbol";
if(runtime.memberLookup((t_4),"acf_fc_layout") === "intro") {
output += "-intro";
;
}
else {
if(runtime.memberLookup((t_4),"acf_fc_layout") === "text") {
if(runtime.memberLookup((t_4),"type") == "ΝΕΡΟΔΙΑΒΑΣΜΑΤΑ") {
output += "-study";
;
}
else {
if(runtime.memberLookup((t_4),"type") == "ΔΡΑΣΤΗΡΙΟΤΗΤΑ ΣΕ ΟΜΑΔΕΣ") {
output += "-group-activity";
;
}
else {
if(runtime.memberLookup((t_4),"type") == "ΑΤΟΜΙΚΗ ΔΡΑΣΤΗΡΙΟΤΗΤΑ") {
output += "-single-activity";
;
}
else {
if(runtime.memberLookup((t_4),"type") == "ΕΡΩΤΗΣΗ") {
output += "-question";
;
}
else {
if(runtime.memberLookup((t_4),"type") == "ΑΠΟ ΕΔΩ ΚΑΙ ΠΕΡΑ") {
output += "-going-forward";
;
}
;
}
;
}
;
}
;
}
;
}
else {
if(runtime.memberLookup((t_4),"acf_fc_layout") === "likert") {
output += "-feedback";
;
}
else {
output += "-play-learn";
;
}
;
}
;
}
output += "\">\r\n    <i class=\"symbol-icon\"></i>\r\n  </div>\r\n  ";
;
}
}
frame = frame.pop();
output += "\r\n</div>\r\n \r\n";
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
