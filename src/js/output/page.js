(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["page.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "\r\n  <main \r\n    id=\"cards\">\r\n\r\n  ";
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
output += " \r\n    ";
if(runtime.memberLookup((t_4),"acf_fc_layout") === "intro") {
output += "\r\n    <div class=\"card\">\r\n      <div class=\"intro\">\r\n        ";
if(runtime.memberLookup((t_4),"block_1")) {
output += "\r\n        <div class=\"col\">\r\n          <article class=\"block_1\">\r\n            <h3>ΜΕ ΔΥΟ ΛΟΓΙΑ</h3>\r\n            ";
output += runtime.suppressValue(runtime.memberLookup((t_4),"block_1"), env.opts.autoescape);
output += "\r\n          </article>\r\n          ";
if(runtime.memberLookup((t_4),"level")) {
output += "\r\n          <article class=\"symbols\">\r\n            ";
if(runtime.memberLookup((t_4),"duration")) {
output += "\r\n            <p class=\"symbol\"><i class=\"duration-icon\"></i><span>";
output += runtime.suppressValue(runtime.memberLookup((t_4),"duration"), env.opts.autoescape);
output += "</span></p>\r\n            ";
;
}
output += "\r\n            ";
if(runtime.memberLookup((t_4),"level")) {
output += "\r\n            <p class=\"symbol\"><i class=\"level-icon\"></i><span>";
output += runtime.suppressValue(runtime.memberLookup((t_4),"level"), env.opts.autoescape);
output += "</span></p>\r\n            ";
;
}
output += "\r\n            ";
if(runtime.memberLookup((t_4),"classroom") === true) {
output += "\r\n            <p class=\"symbol\"><i class=\"classroom-icon\"></i><span>ΕΝΤΟΣ ΤΑΞΗΣ</span></p>\r\n            ";
;
}
else {
if(runtime.memberLookup((t_4),"classroom") === false) {
output += "\r\n            <p class=\"symbol\"><i class=\"outdoor-icon\"></i><span>ΕΚΤΟΣ ΤΑΞΗΣ</span></p>\r\n            ";
;
}
;
}
output += "\r\n          </article>\r\n          ";
;
}
output += "\r\n        </div>\r\n        ";
;
}
output += "\r\n        <div class=\"col\">\r\n          ";
if(runtime.memberLookup((t_4),"block_2")) {
output += "\r\n          <article class=\"block_2\">\r\n            <h3>ΣΤΟΧΟΙ</h3>\r\n            ";
output += runtime.suppressValue(runtime.memberLookup((t_4),"block_2"), env.opts.autoescape);
output += "\r\n          </article>\r\n          ";
;
}
output += "\r\n          ";
if(runtime.memberLookup((t_4),"block_3")) {
output += "\r\n          <article class=\"block_3\">\r\n            <h3>ΘΑ ΧΡΕΙΑΣΤΕΙΣ</h3>\r\n            ";
output += runtime.suppressValue(runtime.memberLookup((t_4),"block_3"), env.opts.autoescape);
output += "\r\n          </article>\r\n        ";
;
}
output += "\r\n        </div> \r\n      </div>\r\n    </div>\r\n    ";
;
}
else {
if(runtime.memberLookup((t_4),"acf_fc_layout") === "text") {
output += "\r\n    <div class=\"card text\">\r\n      ";
if(runtime.memberLookup((t_4),"type") == "ΝΕΡΟΔΙΑΒΑΣΜΑΤΑ") {
output += "\r\n      <h2>ΝΕΡΟΔΙΑΒΑΣΜΑΤΑ</h2>\r\n      ";
;
}
else {
if(runtime.memberLookup((t_4),"type") == "ΔΡΑΣΤΗΡΙΟΤΗΤΑ ΣΕ ΟΜΑΔΕΣ") {
output += "\r\n      <h2>ΔΡΑΣΤΗΡΙΟΤΗΤΑ ΣΕ ΟΜΑΔΕΣ</h2>\r\n      ";
;
}
else {
if(runtime.memberLookup((t_4),"type") == "ΑΤΟΜΙΚΗ ΔΡΑΣΤΗΡΙΟΤΗΤΑ") {
output += "\r\n      <h2>ΑΤΟΜΙΚΗ ΔΡΑΣΤΗΡΙΟΤΗΤΑ</h2>\r\n      ";
;
}
else {
if(runtime.memberLookup((t_4),"type") == "ΕΡΩΤΗΣΗ") {
output += "\r\n      <h2>ΕΡΩΤΗΣΗ</h2>\r\n      ";
;
}
else {
if(runtime.memberLookup((t_4),"type") == "ΑΠΟ ΕΔΩ ΚΑΙ ΠΕΡΑ") {
output += "\r\n      <h2>ΑΠΟ ΕΔΩ ΚΑΙ ΠΕΡΑ</h2>\r\n      ";
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
output += "\r\n      ";
output += runtime.suppressValue(runtime.memberLookup((t_4),"text"), env.opts.autoescape);
output += "\r\n    </div>\r\n    ";
;
}
else {
output += "\r\n    ";
var t_5;
t_5 = (env.getFilter("default").call(context, runtime.contextOrFrameLookup(context, frame, "quiz_counter"),0)) + 1;
frame.set("quiz_counter", t_5, true);
if(frame.topLevel) {
context.setVariable("quiz_counter", t_5);
}
if(frame.topLevel) {
context.addExport("quiz_counter", t_5);
}
output += "\r\n    <div class=\"card quiz quiz-";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "quiz_counter"), env.opts.autoescape);
output += "\">\r\n      ";
if(runtime.memberLookup((t_4),"acf_fc_layout") === "likert") {
output += "<h2>ΠΕΣ ΜΑΣ ΤΗ ΓΝΩΜΗ ΣΟΥ</h2>";
;
}
else {
output += "<h2>ΠΑΙΖΩ ΚΑΙ ΜΑΘΑΙΝΩ</h2>";
;
}
output += "\r\n      ";
if(runtime.memberLookup((t_4),"acf_fc_layout") === "hotspot") {
output += "\r\n      <section class=\"text\">\r\n        ";
output += runtime.suppressValue(runtime.memberLookup((t_4),"hotspot_description"), env.opts.autoescape);
output += "\r\n        <div class=\"quiz-hotspot\">\r\n          <figure class=\"hotspot-image\" style=\"width:";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_4),"hotspot_file")),"width"), env.opts.autoescape);
output += "px;height:";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_4),"hotspot_file")),"height"), env.opts.autoescape);
output += "px;\">\r\n            <img src=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_4),"hotspot_file")),"url"), env.opts.autoescape);
output += "\" width=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_4),"hotspot_file")),"width"), env.opts.autoescape);
output += "\" height=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_4),"hotspot_file")),"height"), env.opts.autoescape);
output += "\">\r\n          </figure>\r\n          <ul class=\"\">\r\n            ";
frame = frame.push();
var t_8 = runtime.memberLookup((t_4),"hotspots");
if(t_8) {var t_7 = t_8.length;
for(var t_6=0; t_6 < t_8.length; t_6++) {
var t_9 = t_8[t_6];
frame.set("hotspot", t_9);
frame.set("loop.index", t_6 + 1);
frame.set("loop.index0", t_6);
frame.set("loop.revindex", t_7 - t_6);
frame.set("loop.revindex0", t_7 - t_6 - 1);
frame.set("loop.first", t_6 === 0);
frame.set("loop.last", t_6 === t_7 - 1);
frame.set("loop.length", t_7);
output += "\r\n            <li>\r\n              <div class=\"draggable-item\"><span class=\"circle\"></span><span class=\"text\">";
output += runtime.suppressValue(runtime.memberLookup((t_9),"hotspot_title"), env.opts.autoescape);
output += "</span></div>\r\n            </li>\r\n            ";
;
}
}
frame = frame.pop();
output += "\r\n          </ul>\r\n        </div>\r\n      </section>\r\n      ";
;
}
else {
if(runtime.memberLookup((t_4),"acf_fc_layout") === "sortable") {
output += "\r\n      <section class=\"text quiz-sortable\">\r\n      ";
if(runtime.memberLookup((t_4),"sortable_text")) {
output += " \r\n      ";
output += runtime.suppressValue(runtime.memberLookup((t_4),"sortable_text"), env.opts.autoescape);
output += "\r\n      ";
;
}
output += "\r\n      <div class=\"sortable-container\">\r\n      ";
frame = frame.push();
var t_12 = runtime.memberLookup((t_4),"sortable_options");
if(t_12) {var t_11 = t_12.length;
for(var t_10=0; t_10 < t_12.length; t_10++) {
var t_13 = t_12[t_10];
frame.set("option", t_13);
frame.set("loop.index", t_10 + 1);
frame.set("loop.index0", t_10);
frame.set("loop.revindex", t_11 - t_10);
frame.set("loop.revindex0", t_11 - t_10 - 1);
frame.set("loop.first", t_10 === 0);
frame.set("loop.last", t_10 === t_11 - 1);
frame.set("loop.length", t_11);
output += "\r\n      ";
var t_14;
t_14 = (env.getFilter("default").call(context, runtime.contextOrFrameLookup(context, frame, "options_counter"),0)) + 1;
frame.set("options_counter", t_14, true);
if(frame.topLevel) {
context.setVariable("options_counter", t_14);
}
if(frame.topLevel) {
context.addExport("options_counter", t_14);
}
output += "\r\n      <div class=\"list-item list-item-";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "options_counter"), env.opts.autoescape);
output += "\">\r\n        <div class=\"item-content\">\r\n          <span class=\"right-order\">";
output += runtime.suppressValue(runtime.memberLookup((t_13),"right_order"), env.opts.autoescape);
output += "</span>\r\n          <span class=\"user-input-order order\"></span> \r\n          <span class=\"label\">";
output += runtime.suppressValue(runtime.memberLookup((t_13),"quiz_input_value"), env.opts.autoescape);
output += "</span>\r\n        </div>\r\n      </div>\r\n      ";
;
}
}
frame = frame.pop();
output += "\r\n      </div>\r\n      </section>\r\n      ";
;
}
else {
if(runtime.memberLookup((t_4),"acf_fc_layout") === "multiple_choice_multiple") {
output += "\r\n      ";
output += runtime.suppressValue(runtime.memberLookup((t_4),"quiz_description"), env.opts.autoescape);
output += "\r\n        ";
frame = frame.push();
var t_17 = runtime.memberLookup((t_4),"quiz");
if(t_17) {var t_16 = t_17.length;
for(var t_15=0; t_15 < t_17.length; t_15++) {
var t_18 = t_17[t_15];
frame.set("option", t_18);
frame.set("loop.index", t_15 + 1);
frame.set("loop.index0", t_15);
frame.set("loop.revindex", t_16 - t_15);
frame.set("loop.revindex0", t_16 - t_15 - 1);
frame.set("loop.first", t_15 === 0);
frame.set("loop.last", t_15 === t_16 - 1);
frame.set("loop.length", t_16);
output += "\r\n        ";
var t_19;
t_19 = (env.getFilter("default").call(context, runtime.contextOrFrameLookup(context, frame, "options_counter"),0)) + 1;
frame.set("options_counter", t_19, true);
if(frame.topLevel) {
context.setVariable("options_counter", t_19);
}
if(frame.topLevel) {
context.addExport("options_counter", t_19);
}
output += "\r\n          <form id=\"gform-";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "text")),"title")),"rendered"), env.opts.autoescape);
output += "-";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "quiz_counter"), env.opts.autoescape);
output += "-";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "options_counter"), env.opts.autoescape);
output += "\" class=\"multiple-choice\" action=\"";
output += runtime.suppressValue(runtime.memberLookup((t_18),"quiz_form_url"), env.opts.autoescape);
output += "\" method=\"POST\">\r\n            <fieldset>\r\n              <legend \r\n                  for=\"";
output += runtime.suppressValue(runtime.memberLookup((t_18),"quiz_field_name"), env.opts.autoescape);
output += "\" \r\n                  name=\"";
output += runtime.suppressValue(runtime.memberLookup((t_18),"quiz_field_name"), env.opts.autoescape);
output += "\">\r\n                  ";
output += runtime.suppressValue(runtime.memberLookup((t_18),"quiz_title"), env.opts.autoescape);
output += runtime.suppressValue(runtime.memberLookup((t_18),"quiz_extended_text"), env.opts.autoescape);
output += "\r\n              </legend>\r\n                ";
frame = frame.push();
var t_22 = runtime.memberLookup((t_18),"quiz_options");
if(t_22) {var t_21 = t_22.length;
for(var t_20=0; t_20 < t_22.length; t_20++) {
var t_23 = t_22[t_20];
frame.set("sub_option", t_23);
frame.set("loop.index", t_20 + 1);
frame.set("loop.index0", t_20);
frame.set("loop.revindex", t_21 - t_20);
frame.set("loop.revindex0", t_21 - t_20 - 1);
frame.set("loop.first", t_20 === 0);
frame.set("loop.last", t_20 === t_21 - 1);
frame.set("loop.length", t_21);
output += "\r\n                ";
var t_24;
t_24 = (env.getFilter("default").call(context, runtime.contextOrFrameLookup(context, frame, "sub_options_counter"),0)) + 1;
frame.set("sub_options_counter", t_24, true);
if(frame.topLevel) {
context.setVariable("sub_options_counter", t_24);
}
if(frame.topLevel) {
context.addExport("sub_options_counter", t_24);
}
output += "\r\n                <p class=\"radio\">\r\n                  <input \r\n                    id=\"";
output += runtime.suppressValue(runtime.memberLookup((t_18),"quiz_field_name"), env.opts.autoescape);
output += "-";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "text")),"title")),"rendered"), env.opts.autoescape);
output += "-";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "sub_options_counter"), env.opts.autoescape);
output += "\" \r\n                    name=\"";
output += runtime.suppressValue(runtime.memberLookup((t_18),"quiz_field_name"), env.opts.autoescape);
output += "\" \r\n                    type=\"radio\" \r\n                    value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_23),"quiz_input_value"), env.opts.autoescape);
output += "\"\r\n                    data-type=\"";
if(runtime.memberLookup((t_23),"quiz_input_type") === "Σωστό") {
output += "correct";
;
}
else {
output += "wrong";
;
}
output += "\" \r\n                  />\r\n                  <label for=\"";
output += runtime.suppressValue(runtime.memberLookup((t_18),"quiz_field_name"), env.opts.autoescape);
output += "-";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "text")),"title")),"rendered"), env.opts.autoescape);
output += "-";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "sub_options_counter"), env.opts.autoescape);
output += "\">\r\n                    <span></span>\r\n                    ";
output += runtime.suppressValue(runtime.memberLookup((t_23),"quiz_input_value"), env.opts.autoescape);
output += "\r\n                  </label>\r\n                </p>\r\n                ";
;
}
}
frame = frame.pop();
output += "\r\n            </fieldset>\r\n            </form>\r\n             <button id=\"gform-";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "text")),"title")),"rendered"), env.opts.autoescape);
output += "-";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "quiz_counter"), env.opts.autoescape);
output += "-";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "options_counter"), env.opts.autoescape);
output += "\" class=\"button submit submit-button\">Δες τη σωστή απάντηση!<svg class=\"loader quiz\" width='120px' height='120px' xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"xMidYMid\" class=\"uil-default\"><rect x=\"0\" y=\"0\" width=\"100\" height=\"100\" fill=\"none\" class=\"bk\"></rect><rect  x='48' y='40' width='4' height='20' rx='2' ry='2' fill='#ffffff' transform='rotate(0 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0s' repeatCount='indefinite'/></rect><rect  x='48' y='40' width='4' height='20' rx='2' ry='2' fill='#ffffff' transform='rotate(30 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.08333333333333333s' repeatCount='indefinite'/></rect><rect  x='48' y='40' width='4' height='20' rx='2' ry='2' fill='#ffffff' transform='rotate(60 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.16666666666666666s' repeatCount='indefinite'/></rect><rect  x='48' y='40' width='4' height='20' rx='2' ry='2' fill='#ffffff' transform='rotate(90 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.25s' repeatCount='indefinite'/></rect><rect  x='48' y='40' width='4' height='20' rx='2' ry='2' fill='#ffffff' transform='rotate(120 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.3333333333333333s' repeatCount='indefinite'/></rect><rect  x='48' y='40' width='4' height='20' rx='2' ry='2' fill='#ffffff' transform='rotate(150 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.4166666666666667s' repeatCount='indefinite'/></rect><rect  x='48' y='40' width='4' height='20' rx='2' ry='2' fill='#ffffff' transform='rotate(180 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.5s' repeatCount='indefinite'/></rect><rect  x='48' y='40' width='4' height='20' rx='2' ry='2' fill='#ffffff' transform='rotate(210 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.5833333333333334s' repeatCount='indefinite'/></rect><rect  x='48' y='40' width='4' height='20' rx='2' ry='2' fill='#ffffff' transform='rotate(240 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.6666666666666666s' repeatCount='indefinite'/></rect><rect  x='48' y='40' width='4' height='20' rx='2' ry='2' fill='#ffffff' transform='rotate(270 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.75s' repeatCount='indefinite'/></rect><rect  x='48' y='40' width='4' height='20' rx='2' ry='2' fill='#ffffff' transform='rotate(300 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.8333333333333334s' repeatCount='indefinite'/></rect><rect  x='48' y='40' width='4' height='20' rx='2' ry='2' fill='#ffffff' transform='rotate(330 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.9166666666666666s' repeatCount='indefinite'/></rect></svg></button>\r\n            <small id=\"gform-";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "text")),"title")),"rendered"), env.opts.autoescape);
output += "-";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "quiz_counter"), env.opts.autoescape);
output += "-";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "options_counter"), env.opts.autoescape);
output += "\" class=\"form-error\"></small>\r\n            <article id=\"gform-";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "text")),"title")),"rendered"), env.opts.autoescape);
output += "-";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "quiz_counter"), env.opts.autoescape);
output += "-";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "options_counter"), env.opts.autoescape);
output += "\" class=\"thankyou_message\" style=\"display: none;\">\r\n              <p><span class=\"check-answer\"></span><br> ";
output += runtime.suppressValue(runtime.memberLookup((t_18),"quiz_thank_you_message"), env.opts.autoescape);
output += "</p>\r\n              <small>Ευχαριστούμε για την απάντηση σου!</small>\r\n              <small id=\"gform-";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "text")),"title")),"rendered"), env.opts.autoescape);
output += "-";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "quiz_counter"), env.opts.autoescape);
output += "-";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "options_counter"), env.opts.autoescape);
output += "\" class=\"form-error\"></small>\r\n            </article>\r\n        ";
;
}
}
frame = frame.pop();
output += "\r\n      ";
;
}
else {
if(runtime.memberLookup((t_4),"acf_fc_layout") === "multiple_choice" || runtime.memberLookup((t_4),"acf_fc_layout") === "checkbox" || runtime.memberLookup((t_4),"acf_fc_layout") === "likert") {
output += "\r\n      <form id=\"gform-";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "text")),"title")),"rendered"), env.opts.autoescape);
output += "-";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "quiz_counter"), env.opts.autoescape);
output += "\" class=\"";
if(runtime.memberLookup((t_4),"acf_fc_layout") === "multiple_choice") {
output += "multiple-choice";
;
}
else {
if(runtime.memberLookup((t_4),"acf_fc_layout") === "checkbox") {
output += "checkbox-quiz";
;
}
else {
if(runtime.memberLookup((t_4),"acf_fc_layout") === "likert") {
output += "likert";
;
}
;
}
;
}
output += "\" action=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"quiz_form_url"), env.opts.autoescape);
output += "\" method=\"POST\">\r\n        <fieldset>\r\n          <legend for=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"quiz_field_name"), env.opts.autoescape);
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "options_counter"), env.opts.autoescape);
output += "\" \r\n                name=\"";
if(runtime.memberLookup((t_4),"acf_fc_layout") === "multiple_choice" || runtime.memberLookup((t_4),"acf_fc_layout") === "likert") {
output += runtime.suppressValue(runtime.memberLookup((t_4),"quiz_field_name"), env.opts.autoescape);
;
}
else {
if(runtime.memberLookup((t_4),"acf_fc_layout") === "checkbox") {
output += runtime.suppressValue(runtime.memberLookup((t_4),"quiz_field_name"), env.opts.autoescape);
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "options_counter"), env.opts.autoescape);
;
}
;
}
output += "\">";
output += runtime.suppressValue(runtime.memberLookup((t_4),"quiz_title"), env.opts.autoescape);
output += runtime.suppressValue(runtime.memberLookup((t_4),"quiz_extended_text"), env.opts.autoescape);
output += "</legend>\r\n            ";
if(runtime.memberLookup((t_4),"acf_fc_layout") === "multiple_choice" || runtime.memberLookup((t_4),"acf_fc_layout") === "checkbox") {
output += "\r\n            ";
frame = frame.push();
var t_27 = runtime.memberLookup((t_4),"quiz_options");
if(t_27) {var t_26 = t_27.length;
for(var t_25=0; t_25 < t_27.length; t_25++) {
var t_28 = t_27[t_25];
frame.set("option", t_28);
frame.set("loop.index", t_25 + 1);
frame.set("loop.index0", t_25);
frame.set("loop.revindex", t_26 - t_25);
frame.set("loop.revindex0", t_26 - t_25 - 1);
frame.set("loop.first", t_25 === 0);
frame.set("loop.last", t_25 === t_26 - 1);
frame.set("loop.length", t_26);
output += "\r\n            ";
var t_29;
t_29 = (env.getFilter("default").call(context, runtime.contextOrFrameLookup(context, frame, "options_counter"),0)) + 1;
frame.set("options_counter", t_29, true);
if(frame.topLevel) {
context.setVariable("options_counter", t_29);
}
if(frame.topLevel) {
context.addExport("options_counter", t_29);
}
output += "\r\n            <p class=\"";
if(runtime.memberLookup((t_4),"acf_fc_layout") === "multiple_choice") {
output += "radio";
;
}
else {
if(runtime.memberLookup((t_4),"acf_fc_layout") === "checkbox") {
output += "checkbox";
;
}
else {
if(runtime.memberLookup((t_4),"acf_fc_layout") === "likert") {
output += "likert";
;
}
;
}
;
}
output += "\">\r\n              <input \r\n                id=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"quiz_field_name"), env.opts.autoescape);
output += "-";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "text")),"title")),"rendered"), env.opts.autoescape);
output += "-";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "options_counter"), env.opts.autoescape);
output += "\" \r\n                name=\"";
if(runtime.memberLookup((t_4),"acf_fc_layout") === "multiple_choice") {
output += runtime.suppressValue(runtime.memberLookup((t_4),"quiz_field_name"), env.opts.autoescape);
;
}
else {
if(runtime.memberLookup((t_4),"acf_fc_layout") === "checkbox") {
output += runtime.suppressValue(runtime.memberLookup((t_28),"quiz_input_value"), env.opts.autoescape);
;
}
;
}
output += "\" \r\n                type=\"";
if(runtime.memberLookup((t_4),"acf_fc_layout") === "multiple_choice") {
output += "radio";
;
}
else {
if(runtime.memberLookup((t_4),"acf_fc_layout") === "likert") {
output += "radio";
;
}
else {
if(runtime.memberLookup((t_4),"acf_fc_layout") === "checkbox") {
output += "checkbox";
;
}
;
}
;
}
output += "\" \r\n                value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_28),"quiz_input_value"), env.opts.autoescape);
output += "\"\r\n                data-type=\"";
if(runtime.memberLookup((t_28),"quiz_input_type") === "Σωστό") {
output += "correct";
;
}
else {
output += "wrong";
;
}
output += "\" \r\n              />\r\n              <label for=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"quiz_field_name"), env.opts.autoescape);
output += "-";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "text")),"title")),"rendered"), env.opts.autoescape);
output += "-";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "options_counter"), env.opts.autoescape);
output += "\">\r\n                <span></span>\r\n                ";
output += runtime.suppressValue(runtime.memberLookup((t_28),"quiz_input_value"), env.opts.autoescape);
output += "\r\n              </label>\r\n              ";
if(runtime.memberLookup((t_4),"acf_fc_layout") === "checkbox") {
output += "\r\n                ";
if(runtime.memberLookup((t_28),"quiz_prompt")) {
output += "\r\n                <span class=\"checkbox-prompt\">";
output += runtime.suppressValue(runtime.memberLookup((t_28),"quiz_prompt"), env.opts.autoescape);
output += "</span>\r\n                ";
;
}
output += "\r\n              ";
;
}
output += "\r\n            </p>\r\n            ";
;
}
}
frame = frame.pop();
output += "\r\n            ";
;
}
output += "\r\n            ";
if(runtime.memberLookup((t_4),"acf_fc_layout") === "likert") {
output += "\r\n            ";
var t_30;
t_30 = (env.getFilter("default").call(context, runtime.contextOrFrameLookup(context, frame, "options_counter"),0)) + 1;
frame.set("options_counter", t_30, true);
if(frame.topLevel) {
context.setVariable("options_counter", t_30);
}
if(frame.topLevel) {
context.addExport("options_counter", t_30);
}
output += "\r\n            <div class=\"likert-container\">\r\n            <p class=\"likert\">\r\n               <input \r\n                id=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"quiz_field_name"), env.opts.autoescape);
output += "-";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "text")),"title")),"rendered"), env.opts.autoescape);
output += "-";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "options_counter"), env.opts.autoescape);
output += "\"\r\n                type=\"radio\"\r\n                name=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"quiz_field_name"), env.opts.autoescape);
output += "\"\r\n                value=\"καθόλου\"\r\n                >\r\n                <label for=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"quiz_field_name"), env.opts.autoescape);
output += "-";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "text")),"title")),"rendered"), env.opts.autoescape);
output += "-";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "options_counter"), env.opts.autoescape);
output += "\">\r\n                <span></span>\r\n                <mark>καθόλου</mark>\r\n             </p>\r\n             <p class=\"likert\">\r\n               <input \r\n                id=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"quiz_field_name"), env.opts.autoescape);
output += "-";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "text")),"title")),"rendered"), env.opts.autoescape);
output += "-";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "options_counter"), env.opts.autoescape);
output += "\"\r\n                type=\"radio\"\r\n                name=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"quiz_field_name"), env.opts.autoescape);
output += "\"\r\n                value=\"λίγο\"\r\n                />\r\n                <label for=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"quiz_field_name"), env.opts.autoescape);
output += "-";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "text")),"title")),"rendered"), env.opts.autoescape);
output += "-";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "options_counter"), env.opts.autoescape);
output += "\">\r\n                <span></span>\r\n                <mark>λίγο</mark>\r\n              </label>\r\n             </p>\r\n             <p class=\"likert\">\r\n               <input \r\n                id=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"quiz_field_name"), env.opts.autoescape);
output += "-";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "text")),"title")),"rendered"), env.opts.autoescape);
output += "-";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "options_counter"), env.opts.autoescape);
output += "\"\r\n                type=\"radio\"\r\n                name=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"quiz_field_name"), env.opts.autoescape);
output += "\"\r\n                value=\"μέτρια\"\r\n                />\r\n                <label for=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"quiz_field_name"), env.opts.autoescape);
output += "-";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "text")),"title")),"rendered"), env.opts.autoescape);
output += "-";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "options_counter"), env.opts.autoescape);
output += "\">\r\n                <span></span>\r\n                <mark>μέτρια</mark>\r\n              </label>\r\n             </p>\r\n             <p class=\"likert\">\r\n               <input \r\n                id=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"quiz_field_name"), env.opts.autoescape);
output += "-";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "text")),"title")),"rendered"), env.opts.autoescape);
output += "-";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "options_counter"), env.opts.autoescape);
output += "\"\r\n                type=\"radio\"\r\n                name=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"quiz_field_name"), env.opts.autoescape);
output += "\"\r\n                value=\"αρκετά\"\r\n                />\r\n                <label for=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"quiz_field_name"), env.opts.autoescape);
output += "-";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "text")),"title")),"rendered"), env.opts.autoescape);
output += "-";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "options_counter"), env.opts.autoescape);
output += "\">\r\n                <span></span>\r\n                <mark>αρκετά</mark>\r\n              </label>\r\n             </p>\r\n             <p class=\"likert\">\r\n               <input \r\n                id=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"quiz_field_name"), env.opts.autoescape);
output += "-";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "text")),"title")),"rendered"), env.opts.autoescape);
output += "-";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "options_counter"), env.opts.autoescape);
output += "\"\r\n                type=\"radio\"\r\n                name=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"quiz_field_name"), env.opts.autoescape);
output += "\"\r\n                value=\"πάρα πολύ\"\r\n                />\r\n                <label for=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"quiz_field_name"), env.opts.autoescape);
output += "-";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "text")),"title")),"rendered"), env.opts.autoescape);
output += "-";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "options_counter"), env.opts.autoescape);
output += "\">\r\n                <span></span>\r\n                <mark>πάρα πολύ</mark>\r\n              </label>\r\n             </p>\r\n             </label>\r\n            ";
;
}
output += "\r\n          </fieldset>\r\n        </form>\r\n\r\n        ";
;
}
;
}
;
}
;
}
output += "\r\n        ";
if(runtime.memberLookup((t_4),"acf_fc_layout") === "multiple_choice") {
output += "\r\n        <button id=\"gform-";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "text")),"title")),"rendered"), env.opts.autoescape);
output += "-";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "quiz_counter"), env.opts.autoescape);
output += "\" class=\"button submit submit-button\">Δες τη σωστή απάντηση!<svg class=\"loader quiz\" width='120px' height='120px' xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"xMidYMid\" class=\"uil-default\"><rect x=\"0\" y=\"0\" width=\"100\" height=\"100\" fill=\"none\" class=\"bk\"></rect><rect  x='48' y='40' width='4' height='20' rx='2' ry='2' fill='#ffffff' transform='rotate(0 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0s' repeatCount='indefinite'/></rect><rect  x='48' y='40' width='4' height='20' rx='2' ry='2' fill='#ffffff' transform='rotate(30 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.08333333333333333s' repeatCount='indefinite'/></rect><rect  x='48' y='40' width='4' height='20' rx='2' ry='2' fill='#ffffff' transform='rotate(60 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.16666666666666666s' repeatCount='indefinite'/></rect><rect  x='48' y='40' width='4' height='20' rx='2' ry='2' fill='#ffffff' transform='rotate(90 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.25s' repeatCount='indefinite'/></rect><rect  x='48' y='40' width='4' height='20' rx='2' ry='2' fill='#ffffff' transform='rotate(120 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.3333333333333333s' repeatCount='indefinite'/></rect><rect  x='48' y='40' width='4' height='20' rx='2' ry='2' fill='#ffffff' transform='rotate(150 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.4166666666666667s' repeatCount='indefinite'/></rect><rect  x='48' y='40' width='4' height='20' rx='2' ry='2' fill='#ffffff' transform='rotate(180 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.5s' repeatCount='indefinite'/></rect><rect  x='48' y='40' width='4' height='20' rx='2' ry='2' fill='#ffffff' transform='rotate(210 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.5833333333333334s' repeatCount='indefinite'/></rect><rect  x='48' y='40' width='4' height='20' rx='2' ry='2' fill='#ffffff' transform='rotate(240 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.6666666666666666s' repeatCount='indefinite'/></rect><rect  x='48' y='40' width='4' height='20' rx='2' ry='2' fill='#ffffff' transform='rotate(270 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.75s' repeatCount='indefinite'/></rect><rect  x='48' y='40' width='4' height='20' rx='2' ry='2' fill='#ffffff' transform='rotate(300 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.8333333333333334s' repeatCount='indefinite'/></rect><rect  x='48' y='40' width='4' height='20' rx='2' ry='2' fill='#ffffff' transform='rotate(330 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.9166666666666666s' repeatCount='indefinite'/></rect></svg></button>\r\n        ";
;
}
output += "\r\n        ";
if(runtime.memberLookup((t_4),"acf_fc_layout") === "checkbox") {
output += "\r\n        <button id=\"gform-";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "text")),"title")),"rendered"), env.opts.autoescape);
output += "-";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "quiz_counter"), env.opts.autoescape);
output += "\" class=\"button submit submit-button\">Δες τις σωστές απαντήσεις!<svg class=\"loader quiz\" width='120px' height='120px' xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"xMidYMid\" class=\"uil-default\"><rect x=\"0\" y=\"0\" width=\"100\" height=\"100\" fill=\"none\" class=\"bk\"></rect><rect  x='48' y='40' width='4' height='20' rx='2' ry='2' fill='#ffffff' transform='rotate(0 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0s' repeatCount='indefinite'/></rect><rect  x='48' y='40' width='4' height='20' rx='2' ry='2' fill='#ffffff' transform='rotate(30 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.08333333333333333s' repeatCount='indefinite'/></rect><rect  x='48' y='40' width='4' height='20' rx='2' ry='2' fill='#ffffff' transform='rotate(60 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.16666666666666666s' repeatCount='indefinite'/></rect><rect  x='48' y='40' width='4' height='20' rx='2' ry='2' fill='#ffffff' transform='rotate(90 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.25s' repeatCount='indefinite'/></rect><rect  x='48' y='40' width='4' height='20' rx='2' ry='2' fill='#ffffff' transform='rotate(120 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.3333333333333333s' repeatCount='indefinite'/></rect><rect  x='48' y='40' width='4' height='20' rx='2' ry='2' fill='#ffffff' transform='rotate(150 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.4166666666666667s' repeatCount='indefinite'/></rect><rect  x='48' y='40' width='4' height='20' rx='2' ry='2' fill='#ffffff' transform='rotate(180 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.5s' repeatCount='indefinite'/></rect><rect  x='48' y='40' width='4' height='20' rx='2' ry='2' fill='#ffffff' transform='rotate(210 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.5833333333333334s' repeatCount='indefinite'/></rect><rect  x='48' y='40' width='4' height='20' rx='2' ry='2' fill='#ffffff' transform='rotate(240 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.6666666666666666s' repeatCount='indefinite'/></rect><rect  x='48' y='40' width='4' height='20' rx='2' ry='2' fill='#ffffff' transform='rotate(270 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.75s' repeatCount='indefinite'/></rect><rect  x='48' y='40' width='4' height='20' rx='2' ry='2' fill='#ffffff' transform='rotate(300 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.8333333333333334s' repeatCount='indefinite'/></rect><rect  x='48' y='40' width='4' height='20' rx='2' ry='2' fill='#ffffff' transform='rotate(330 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.9166666666666666s' repeatCount='indefinite'/></rect></svg></button>\r\n        ";
;
}
output += "\r\n        ";
if(runtime.memberLookup((t_4),"acf_fc_layout") === "sortable") {
output += "\r\n        <button id=\"gform-";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "text")),"title")),"rendered"), env.opts.autoescape);
output += "-";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "quiz_counter"), env.opts.autoescape);
output += "\" class=\"button submit-button\" id=\"resort\">Δες τη σωστή σειρά!<svg class=\"loader quiz\" width='120px' height='120px' xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"xMidYMid\" class=\"uil-default\"><rect x=\"0\" y=\"0\" width=\"100\" height=\"100\" fill=\"none\" class=\"bk\"></rect><rect  x='48' y='40' width='4' height='20' rx='2' ry='2' fill='#ffffff' transform='rotate(0 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0s' repeatCount='indefinite'/></rect><rect  x='48' y='40' width='4' height='20' rx='2' ry='2' fill='#ffffff' transform='rotate(30 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.08333333333333333s' repeatCount='indefinite'/></rect><rect  x='48' y='40' width='4' height='20' rx='2' ry='2' fill='#ffffff' transform='rotate(60 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.16666666666666666s' repeatCount='indefinite'/></rect><rect  x='48' y='40' width='4' height='20' rx='2' ry='2' fill='#ffffff' transform='rotate(90 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.25s' repeatCount='indefinite'/></rect><rect  x='48' y='40' width='4' height='20' rx='2' ry='2' fill='#ffffff' transform='rotate(120 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.3333333333333333s' repeatCount='indefinite'/></rect><rect  x='48' y='40' width='4' height='20' rx='2' ry='2' fill='#ffffff' transform='rotate(150 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.4166666666666667s' repeatCount='indefinite'/></rect><rect  x='48' y='40' width='4' height='20' rx='2' ry='2' fill='#ffffff' transform='rotate(180 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.5s' repeatCount='indefinite'/></rect><rect  x='48' y='40' width='4' height='20' rx='2' ry='2' fill='#ffffff' transform='rotate(210 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.5833333333333334s' repeatCount='indefinite'/></rect><rect  x='48' y='40' width='4' height='20' rx='2' ry='2' fill='#ffffff' transform='rotate(240 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.6666666666666666s' repeatCount='indefinite'/></rect><rect  x='48' y='40' width='4' height='20' rx='2' ry='2' fill='#ffffff' transform='rotate(270 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.75s' repeatCount='indefinite'/></rect><rect  x='48' y='40' width='4' height='20' rx='2' ry='2' fill='#ffffff' transform='rotate(300 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.8333333333333334s' repeatCount='indefinite'/></rect><rect  x='48' y='40' width='4' height='20' rx='2' ry='2' fill='#ffffff' transform='rotate(330 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.9166666666666666s' repeatCount='indefinite'/></rect></svg></button>\r\n        ";
;
}
output += "\r\n        ";
if(runtime.memberLookup((t_4),"acf_fc_layout") === "likert") {
output += "\r\n        <div class=\"loader-container\">\r\n        <svg class=\"loader quiz\" width='120px' height='120px' xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"xMidYMid\" class=\"uil-default\"><rect x=\"0\" y=\"0\" width=\"100\" height=\"100\" fill=\"none\" class=\"bk\"></rect><rect  x='48' y='40' width='4' height='20' rx='2' ry='2' fill='#00B9F2' transform='rotate(0 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0s' repeatCount='indefinite'/></rect><rect  x='48' y='40' width='4' height='20' rx='2' ry='2' fill='#00B9F2' transform='rotate(30 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.08333333333333333s' repeatCount='indefinite'/></rect><rect  x='48' y='40' width='4' height='20' rx='2' ry='2' fill='#00B9F2' transform='rotate(60 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.16666666666666666s' repeatCount='indefinite'/></rect><rect  x='48' y='40' width='4' height='20' rx='2' ry='2' fill='#00B9F2' transform='rotate(90 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.25s' repeatCount='indefinite'/></rect><rect  x='48' y='40' width='4' height='20' rx='2' ry='2' fill='#00B9F2' transform='rotate(120 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.3333333333333333s' repeatCount='indefinite'/></rect><rect  x='48' y='40' width='4' height='20' rx='2' ry='2' fill='#00B9F2' transform='rotate(150 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.4166666666666667s' repeatCount='indefinite'/></rect><rect  x='48' y='40' width='4' height='20' rx='2' ry='2' fill='#00B9F2' transform='rotate(180 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.5s' repeatCount='indefinite'/></rect><rect  x='48' y='40' width='4' height='20' rx='2' ry='2' fill='#00B9F2' transform='rotate(210 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.5833333333333334s' repeatCount='indefinite'/></rect><rect  x='48' y='40' width='4' height='20' rx='2' ry='2' fill='#00B9F2' transform='rotate(240 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.6666666666666666s' repeatCount='indefinite'/></rect><rect  x='48' y='40' width='4' height='20' rx='2' ry='2' fill='#00B9F2' transform='rotate(270 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.75s' repeatCount='indefinite'/></rect><rect  x='48' y='40' width='4' height='20' rx='2' ry='2' fill='#00B9F2' transform='rotate(300 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.8333333333333334s' repeatCount='indefinite'/></rect><rect  x='48' y='40' width='4' height='20' rx='2' ry='2' fill='#00B9F2' transform='rotate(330 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.9166666666666666s' repeatCount='indefinite'/></rect></svg>\r\n        </div>\r\n        ";
;
}
output += "\r\n        ";
if(runtime.memberLookup((t_4),"acf_fc_layout") === "checkbox" || runtime.memberLookup((t_4),"acf_fc_layout") === "multiple_choice") {
output += "\r\n        <small id=\"gform-";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "text")),"title")),"rendered"), env.opts.autoescape);
output += "-";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "quiz_counter"), env.opts.autoescape);
output += "\" class=\"form-error\"></small>\r\n        <article id=\"gform-";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "text")),"title")),"rendered"), env.opts.autoescape);
output += "-";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "quiz_counter"), env.opts.autoescape);
output += "\" class=\"thankyou_message\" style=\"display: none;\">\r\n          <p><span class=\"check-answer\"></span><br> ";
output += runtime.suppressValue(runtime.memberLookup((t_4),"quiz_thank_you_msg"), env.opts.autoescape);
output += "</p>\r\n          <small>Ευχαριστούμε για την απάντηση σου!</small>\r\n          <small id=\"gform-";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "text")),"title")),"rendered"), env.opts.autoescape);
output += "-";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "quiz_counter"), env.opts.autoescape);
output += "\" class=\"form-error\"></small>\r\n        </article>\r\n        ";
;
}
else {
if(runtime.memberLookup((t_4),"acf_fc_layout") === "likert") {
output += "\r\n        <article id=\"gform-";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "text")),"title")),"rendered"), env.opts.autoescape);
output += "-";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "quiz_counter"), env.opts.autoescape);
output += "\" class=\"thankyou_message\" style=\"display: none;\">\r\n          <small>Ευχαριστούμε για την απάντηση σου!</small>\r\n         </article>\r\n        ";
;
}
;
}
output += " \r\n    </div>\r\n    \r\n    ";
;
}
;
}
output += "\r\n  ";
;
}
}
frame = frame.pop();
output += "\r\n\r\n  </div>\r\n  </main>\r\n\r\n\r\n ";
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
