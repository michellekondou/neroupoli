(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["page-footer.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "    <div class=\"left-col\">\r\n    ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "text")),"acf")),"fact_sheet")) {
output += "\r\n    <a href=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "text")),"acf")),"fact_sheet")),"url"), env.opts.autoescape);
output += "\" download=\"Water-Polis-Fyllo-Ergasias-";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "text")),"acf")),"fact_sheet")),"name"), env.opts.autoescape);
output += ".doc\" class=\"download-pdf\">\r\n      <i class=\"pdf-icon\">\r\n        <svg class=\"is-default\" viewBox=\"0 0 51 68\"><use xlink:href=\"#icon-download-pdf\"></use></svg>\r\n        <svg class=\"is-pressed\" viewBox=\"0 0 47 64\"><use xlink:href=\"#icon-download-pdf-pressed\"></use></svg>\r\n      </i>\r\n      <span>ΦΥΛΛΟ ΕΡΓΑΣΙΑΣ</span>\r\n    </a>\r\n    ";
;
}
output += "\r\n    </div>\r\n    <nav class=\"card-nav\">\r\n      <button class='previous'>\r\n        <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" width=\"41px\" height=\"52px\" viewBox=\"0 0 41 52\" enable-background=\"new 0 0 41 52\" xml:space=\"preserve\">\r\n          <g id=\"Layer_1\">\r\n          </g>\r\n          <g id=\"activity_context\">\r\n            <path d=\"M0,51.06c1.245,1.253,3.262,1.253,4.506,0l35.561-22.797c1.244-1.251,1.244-3.28,0-4.529L4.507,0.938\r\n              c-1.245-1.252-3.262-1.25-4.507,0V51.06z\"/>\r\n          </g>\r\n          </svg>\r\n      </button>\r\n      <button class='next'>\r\n        <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" width=\"41px\" height=\"52px\" viewBox=\"0 0 41 52\" enable-background=\"new 0 0 41 52\" xml:space=\"preserve\">\r\n          <g id=\"Layer_1\">\r\n          </g>\r\n          <g id=\"activity_context\">\r\n            <path d=\"M0,51.06c1.245,1.253,3.262,1.253,4.506,0l35.561-22.797c1.244-1.251,1.244-3.28,0-4.529L4.507,0.938\r\n              c-1.245-1.252-3.262-1.25-4.507,0V51.06z\"/>\r\n          </g>\r\n          </svg>\r\n      </button>\r\n    </nav>";
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
