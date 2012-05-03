// Underscore.js 1.2.2
// (c) 2011 Jeremy Ashkenas, DocumentCloud Inc.
// Underscore is freely distributable under the MIT license.
// Portions of Underscore are inspired or borrowed from Prototype,
// Oliver Steele's Functional, and John Resig's Micro-Templating.
// For all details and documentation:
// http://documentcloud.github.com/underscore
(function(){function r(a,c,d){if(a===c)return a!==0||1/a==1/c;if(a==null||c==null)return a===c;if(a._chain)a=a._wrapped;if(c._chain)c=c._wrapped;if(b.isFunction(a.isEqual))return a.isEqual(c);if(b.isFunction(c.isEqual))return c.isEqual(a);var e=l.call(a);if(e!=l.call(c))return false;switch(e){case "[object String]":return String(a)==String(c);case "[object Number]":return a=+a,c=+c,a!=a?c!=c:a==0?1/a==1/c:a==c;case "[object Date]":case "[object Boolean]":return+a==+c;case "[object RegExp]":return a.source==
c.source&&a.global==c.global&&a.multiline==c.multiline&&a.ignoreCase==c.ignoreCase}if(typeof a!="object"||typeof c!="object")return false;for(var f=d.length;f--;)if(d[f]==a)return true;d.push(a);var f=0,g=true;if(e=="[object Array]"){if(f=a.length,g=f==c.length)for(;f--;)if(!(g=f in a==f in c&&r(a[f],c[f],d)))break}else{if("constructor"in a!="constructor"in c||a.constructor!=c.constructor)return false;for(var h in a)if(m.call(a,h)&&(f++,!(g=m.call(c,h)&&r(a[h],c[h],d))))break;if(g){for(h in c)if(m.call(c,
h)&&!f--)break;g=!f}}d.pop();return g}var s=this,F=s._,o={},k=Array.prototype,p=Object.prototype,i=k.slice,G=k.unshift,l=p.toString,m=p.hasOwnProperty,v=k.forEach,w=k.map,x=k.reduce,y=k.reduceRight,z=k.filter,A=k.every,B=k.some,q=k.indexOf,C=k.lastIndexOf,p=Array.isArray,H=Object.keys,t=Function.prototype.bind,b=function(a){return new n(a)};if(typeof exports!=="undefined"){if(typeof module!=="undefined"&&module.exports)exports=module.exports=b;exports._=b}else typeof define==="function"&&define.amd?
define("underscore",function(){return b}):s._=b;b.VERSION="1.2.2";var j=b.each=b.forEach=function(a,c,b){if(a!=null)if(v&&a.forEach===v)a.forEach(c,b);else if(a.length===+a.length)for(var e=0,f=a.length;e<f;e++){if(e in a&&c.call(b,a[e],e,a)===o)break}else for(e in a)if(m.call(a,e)&&c.call(b,a[e],e,a)===o)break};b.map=function(a,c,b){var e=[];if(a==null)return e;if(w&&a.map===w)return a.map(c,b);j(a,function(a,g,h){e[e.length]=c.call(b,a,g,h)});return e};b.reduce=b.foldl=b.inject=function(a,c,d,e){var f=
d!==void 0;a==null&&(a=[]);if(x&&a.reduce===x)return e&&(c=b.bind(c,e)),f?a.reduce(c,d):a.reduce(c);j(a,function(a,b,i){f?d=c.call(e,d,a,b,i):(d=a,f=true)});if(!f)throw new TypeError("Reduce of empty array with no initial value");return d};b.reduceRight=b.foldr=function(a,c,d,e){a==null&&(a=[]);if(y&&a.reduceRight===y)return e&&(c=b.bind(c,e)),d!==void 0?a.reduceRight(c,d):a.reduceRight(c);a=(b.isArray(a)?a.slice():b.toArray(a)).reverse();return b.reduce(a,c,d,e)};b.find=b.detect=function(a,c,b){var e;
D(a,function(a,g,h){if(c.call(b,a,g,h))return e=a,true});return e};b.filter=b.select=function(a,c,b){var e=[];if(a==null)return e;if(z&&a.filter===z)return a.filter(c,b);j(a,function(a,g,h){c.call(b,a,g,h)&&(e[e.length]=a)});return e};b.reject=function(a,c,b){var e=[];if(a==null)return e;j(a,function(a,g,h){c.call(b,a,g,h)||(e[e.length]=a)});return e};b.every=b.all=function(a,c,b){var e=true;if(a==null)return e;if(A&&a.every===A)return a.every(c,b);j(a,function(a,g,h){if(!(e=e&&c.call(b,a,g,h)))return o});
return e};var D=b.some=b.any=function(a,c,d){var c=c||b.identity,e=false;if(a==null)return e;if(B&&a.some===B)return a.some(c,d);j(a,function(a,b,h){if(e||(e=c.call(d,a,b,h)))return o});return!!e};b.include=b.contains=function(a,c){var b=false;if(a==null)return b;return q&&a.indexOf===q?a.indexOf(c)!=-1:b=D(a,function(a){return a===c})};b.invoke=function(a,c){var d=i.call(arguments,2);return b.map(a,function(a){return(c.call?c||a:a[c]).apply(a,d)})};b.pluck=function(a,c){return b.map(a,function(a){return a[c]})};
b.max=function(a,c,d){if(!c&&b.isArray(a))return Math.max.apply(Math,a);if(!c&&b.isEmpty(a))return-Infinity;var e={computed:-Infinity};j(a,function(a,b,h){b=c?c.call(d,a,b,h):a;b>=e.computed&&(e={value:a,computed:b})});return e.value};b.min=function(a,c,d){if(!c&&b.isArray(a))return Math.min.apply(Math,a);if(!c&&b.isEmpty(a))return Infinity;var e={computed:Infinity};j(a,function(a,b,h){b=c?c.call(d,a,b,h):a;b<e.computed&&(e={value:a,computed:b})});return e.value};b.shuffle=function(a){var c=[],b;
j(a,function(a,f){f==0?c[0]=a:(b=Math.floor(Math.random()*(f+1)),c[f]=c[b],c[b]=a)});return c};b.sortBy=function(a,c,d){return b.pluck(b.map(a,function(a,b,g){return{value:a,criteria:c.call(d,a,b,g)}}).sort(function(a,c){var b=a.criteria,d=c.criteria;return b<d?-1:b>d?1:0}),"value")};b.groupBy=function(a,c){var d={},e=b.isFunction(c)?c:function(a){return a[c]};j(a,function(a,c){var b=e(a,c);(d[b]||(d[b]=[])).push(a)});return d};b.sortedIndex=function(a,c,d){d||(d=b.identity);for(var e=0,f=a.length;e<
f;){var g=e+f>>1;d(a[g])<d(c)?e=g+1:f=g}return e};b.toArray=function(a){return!a?[]:a.toArray?a.toArray():b.isArray(a)?i.call(a):b.isArguments(a)?i.call(a):b.values(a)};b.size=function(a){return b.toArray(a).length};b.first=b.head=function(a,b,d){return b!=null&&!d?i.call(a,0,b):a[0]};b.initial=function(a,b,d){return i.call(a,0,a.length-(b==null||d?1:b))};b.last=function(a,b,d){return b!=null&&!d?i.call(a,Math.max(a.length-b,0)):a[a.length-1]};b.rest=b.tail=function(a,b,d){return i.call(a,b==null||
d?1:b)};b.compact=function(a){return b.filter(a,function(a){return!!a})};b.flatten=function(a,c){return b.reduce(a,function(a,e){if(b.isArray(e))return a.concat(c?e:b.flatten(e));a[a.length]=e;return a},[])};b.without=function(a){return b.difference(a,i.call(arguments,1))};b.uniq=b.unique=function(a,c,d){var d=d?b.map(a,d):a,e=[];b.reduce(d,function(d,g,h){if(0==h||(c===true?b.last(d)!=g:!b.include(d,g)))d[d.length]=g,e[e.length]=a[h];return d},[]);return e};b.union=function(){return b.uniq(b.flatten(arguments,
true))};b.intersection=b.intersect=function(a){var c=i.call(arguments,1);return b.filter(b.uniq(a),function(a){return b.every(c,function(c){return b.indexOf(c,a)>=0})})};b.difference=function(a,c){return b.filter(a,function(a){return!b.include(c,a)})};b.zip=function(){for(var a=i.call(arguments),c=b.max(b.pluck(a,"length")),d=Array(c),e=0;e<c;e++)d[e]=b.pluck(a,""+e);return d};b.indexOf=function(a,c,d){if(a==null)return-1;var e;if(d)return d=b.sortedIndex(a,c),a[d]===c?d:-1;if(q&&a.indexOf===q)return a.indexOf(c);
for(d=0,e=a.length;d<e;d++)if(a[d]===c)return d;return-1};b.lastIndexOf=function(a,b){if(a==null)return-1;if(C&&a.lastIndexOf===C)return a.lastIndexOf(b);for(var d=a.length;d--;)if(a[d]===b)return d;return-1};b.range=function(a,b,d){arguments.length<=1&&(b=a||0,a=0);for(var d=arguments[2]||1,e=Math.max(Math.ceil((b-a)/d),0),f=0,g=Array(e);f<e;)g[f++]=a,a+=d;return g};var E=function(){};b.bind=function(a,c){var d,e;if(a.bind===t&&t)return t.apply(a,i.call(arguments,1));if(!b.isFunction(a))throw new TypeError;
e=i.call(arguments,2);return d=function(){if(!(this instanceof d))return a.apply(c,e.concat(i.call(arguments)));E.prototype=a.prototype;var b=new E,g=a.apply(b,e.concat(i.call(arguments)));return Object(g)===g?g:b}};b.bindAll=function(a){var c=i.call(arguments,1);c.length==0&&(c=b.functions(a));j(c,function(c){a[c]=b.bind(a[c],a)});return a};b.memoize=function(a,c){var d={};c||(c=b.identity);return function(){var b=c.apply(this,arguments);return m.call(d,b)?d[b]:d[b]=a.apply(this,arguments)}};b.delay=
function(a,b){var d=i.call(arguments,2);return setTimeout(function(){return a.apply(a,d)},b)};b.defer=function(a){return b.delay.apply(b,[a,1].concat(i.call(arguments,1)))};b.throttle=function(a,c){var d,e,f,g,h,i=b.debounce(function(){h=g=false},c);return function(){d=this;e=arguments;var b;f||(f=setTimeout(function(){f=null;h&&a.apply(d,e);i()},c));g?h=true:a.apply(d,e);i();g=true}};b.debounce=function(a,b){var d;return function(){var e=this,f=arguments;clearTimeout(d);d=setTimeout(function(){d=
null;a.apply(e,f)},b)}};b.once=function(a){var b=false,d;return function(){if(b)return d;b=true;return d=a.apply(this,arguments)}};b.wrap=function(a,b){return function(){var d=[a].concat(i.call(arguments));return b.apply(this,d)}};b.compose=function(){var a=i.call(arguments);return function(){for(var b=i.call(arguments),d=a.length-1;d>=0;d--)b=[a[d].apply(this,b)];return b[0]}};b.after=function(a,b){return a<=0?b():function(){if(--a<1)return b.apply(this,arguments)}};b.keys=H||function(a){if(a!==
Object(a))throw new TypeError("Invalid object");var b=[],d;for(d in a)m.call(a,d)&&(b[b.length]=d);return b};b.values=function(a){return b.map(a,b.identity)};b.functions=b.methods=function(a){var c=[],d;for(d in a)b.isFunction(a[d])&&c.push(d);return c.sort()};b.extend=function(a){j(i.call(arguments,1),function(b){for(var d in b)b[d]!==void 0&&(a[d]=b[d])});return a};b.defaults=function(a){j(i.call(arguments,1),function(b){for(var d in b)a[d]==null&&(a[d]=b[d])});return a};b.clone=function(a){return!b.isObject(a)?
a:b.isArray(a)?a.slice():b.extend({},a)};b.tap=function(a,b){b(a);return a};b.isEqual=function(a,b){return r(a,b,[])};b.isEmpty=function(a){if(b.isArray(a)||b.isString(a))return a.length===0;for(var c in a)if(m.call(a,c))return false;return true};b.isElement=function(a){return!!(a&&a.nodeType==1)};b.isArray=p||function(a){return l.call(a)=="[object Array]"};b.isObject=function(a){return a===Object(a)};b.isArguments=l.call(arguments)=="[object Arguments]"?function(a){return l.call(a)=="[object Arguments]"}:
function(a){return!(!a||!m.call(a,"callee"))};b.isFunction=function(a){return l.call(a)=="[object Function]"};b.isString=function(a){return l.call(a)=="[object String]"};b.isNumber=function(a){return l.call(a)=="[object Number]"};b.isNaN=function(a){return a!==a};b.isBoolean=function(a){return a===true||a===false||l.call(a)=="[object Boolean]"};b.isDate=function(a){return l.call(a)=="[object Date]"};b.isRegExp=function(a){return l.call(a)=="[object RegExp]"};b.isNull=function(a){return a===null};
b.isUndefined=function(a){return a===void 0};b.noConflict=function(){s._=F;return this};b.identity=function(a){return a};b.times=function(a,b,d){for(var e=0;e<a;e++)b.call(d,e)};b.escape=function(a){return(""+a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;").replace(/\//g,"&#x2F;")};b.mixin=function(a){j(b.functions(a),function(c){I(c,b[c]=a[c])})};var J=0;b.uniqueId=function(a){var b=J++;return a?a+b:b};b.templateSettings={evaluate:/<%([\s\S]+?)%>/g,
interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};b.template=function(a,c){var d=b.templateSettings,d="var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('"+a.replace(/\\/g,"\\\\").replace(/'/g,"\\'").replace(d.escape,function(a,b){return"',_.escape("+b.replace(/\\'/g,"'")+"),'"}).replace(d.interpolate,function(a,b){return"',"+b.replace(/\\'/g,"'")+",'"}).replace(d.evaluate||null,function(a,b){return"');"+b.replace(/\\'/g,"'").replace(/[\r\n\t]/g," ")+";__p.push('"}).replace(/\r/g,
"\\r").replace(/\n/g,"\\n").replace(/\t/g,"\\t")+"');}return __p.join('');",e=new Function("obj","_",d);return c?e(c,b):function(a){return e(a,b)}};var n=function(a){this._wrapped=a};b.prototype=n.prototype;var u=function(a,c){return c?b(a).chain():a},I=function(a,c){n.prototype[a]=function(){var a=i.call(arguments);G.call(a,this._wrapped);return u(c.apply(b,a),this._chain)}};b.mixin(b);j("pop,push,reverse,shift,sort,splice,unshift".split(","),function(a){var b=k[a];n.prototype[a]=function(){b.apply(this._wrapped,
arguments);return u(this._wrapped,this._chain)}});j(["concat","join","slice"],function(a){var b=k[a];n.prototype[a]=function(){return u(b.apply(this._wrapped,arguments),this._chain)}});n.prototype.chain=function(){this._chain=true;return this};n.prototype.value=function(){return this._wrapped}}).call(this);
// Backbone.js 0.5.3
// (c) 2010 Jeremy Ashkenas, DocumentCloud Inc.
// Backbone may be freely distributed under the MIT license.
// For all details and documentation:
// http://documentcloud.github.com/backbone
(function(){var h=this,p=h.Backbone,e;e=typeof exports!=="undefined"?exports:h.Backbone={};e.VERSION="0.5.3";var f=h._;if(!f&&typeof require!=="undefined")f=require("underscore")._;var g=h.jQuery||h.Zepto;e.noConflict=function(){h.Backbone=p;return this};e.emulateHTTP=!1;e.emulateJSON=!1;e.Events={bind:function(a,b,c){var d=this._callbacks||(this._callbacks={});(d[a]||(d[a]=[])).push([b,c]);return this},unbind:function(a,b){var c;if(a){if(c=this._callbacks)if(b){c=c[a];if(!c)return this;for(var d=
0,e=c.length;d<e;d++)if(c[d]&&b===c[d][0]){c[d]=null;break}}else c[a]=[]}else this._callbacks={};return this},trigger:function(a){var b,c,d,e,f=2;if(!(c=this._callbacks))return this;for(;f--;)if(b=f?a:"all",b=c[b])for(var g=0,h=b.length;g<h;g++)(d=b[g])?(e=f?Array.prototype.slice.call(arguments,1):arguments,d[0].apply(d[1]||this,e)):(b.splice(g,1),g--,h--);return this}};e.Model=function(a,b){var c;a||(a={});if(c=this.defaults)f.isFunction(c)&&(c=c.call(this)),a=f.extend({},c,a);this.attributes={};
this._escapedAttributes={};this.cid=f.uniqueId("c");this.set(a,{silent:!0});this._changed=!1;this._previousAttributes=f.clone(this.attributes);if(b&&b.collection)this.collection=b.collection;this.initialize(a,b)};f.extend(e.Model.prototype,e.Events,{_previousAttributes:null,_changed:!1,idAttribute:"id",initialize:function(){},toJSON:function(){return f.clone(this.attributes)},get:function(a){return this.attributes[a]},escape:function(a){var b;if(b=this._escapedAttributes[a])return b;b=this.attributes[a];
return this._escapedAttributes[a]=(b==null?"":""+b).replace(/&(?!\w+;|#\d+;|#x[\da-f]+;)/gi,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;").replace(/\//g,"&#x2F;")},has:function(a){return this.attributes[a]!=null},set:function(a,b){b||(b={});if(!a)return this;if(a.attributes)a=a.attributes;var c=this.attributes,d=this._escapedAttributes;if(!b.silent&&this.validate&&!this._performValidation(a,b))return!1;if(this.idAttribute in a)this.id=a[this.idAttribute];
var e=this._changing;this._changing=!0;for(var g in a){var h=a[g];if(!f.isEqual(c[g],h))c[g]=h,delete d[g],this._changed=!0,b.silent||this.trigger("change:"+g,this,h,b)}!e&&!b.silent&&this._changed&&this.change(b);this._changing=!1;return this},unset:function(a,b){if(!(a in this.attributes))return this;b||(b={});var c={};c[a]=void 0;if(!b.silent&&this.validate&&!this._performValidation(c,b))return!1;delete this.attributes[a];delete this._escapedAttributes[a];a==this.idAttribute&&delete this.id;this._changed=
!0;b.silent||(this.trigger("change:"+a,this,void 0,b),this.change(b));return this},clear:function(a){a||(a={});var b,c=this.attributes,d={};for(b in c)d[b]=void 0;if(!a.silent&&this.validate&&!this._performValidation(d,a))return!1;this.attributes={};this._escapedAttributes={};this._changed=!0;if(!a.silent){for(b in c)this.trigger("change:"+b,this,void 0,a);this.change(a)}return this},fetch:function(a){a||(a={});var b=this,c=a.success;a.success=function(d,e,f){if(!b.set(b.parse(d,f),a))return!1;c&&
c(b,d)};a.error=i(a.error,b,a);return(this.sync||e.sync).call(this,"read",this,a)},save:function(a,b){b||(b={});if(a&&!this.set(a,b))return!1;var c=this,d=b.success;b.success=function(a,e,f){if(!c.set(c.parse(a,f),b))return!1;d&&d(c,a,f)};b.error=i(b.error,c,b);var f=this.isNew()?"create":"update";return(this.sync||e.sync).call(this,f,this,b)},destroy:function(a){a||(a={});if(this.isNew())return this.trigger("destroy",this,this.collection,a);var b=this,c=a.success;a.success=function(d){b.trigger("destroy",
b,b.collection,a);c&&c(b,d)};a.error=i(a.error,b,a);return(this.sync||e.sync).call(this,"delete",this,a)},url:function(){var a=k(this.collection)||this.urlRoot||l();if(this.isNew())return a;return a+(a.charAt(a.length-1)=="/"?"":"/")+encodeURIComponent(this.id)},parse:function(a){return a},clone:function(){return new this.constructor(this)},isNew:function(){return this.id==null},change:function(a){this.trigger("change",this,a);this._previousAttributes=f.clone(this.attributes);this._changed=!1},hasChanged:function(a){if(a)return this._previousAttributes[a]!=
this.attributes[a];return this._changed},changedAttributes:function(a){a||(a=this.attributes);var b=this._previousAttributes,c=!1,d;for(d in a)f.isEqual(b[d],a[d])||(c=c||{},c[d]=a[d]);return c},previous:function(a){if(!a||!this._previousAttributes)return null;return this._previousAttributes[a]},previousAttributes:function(){return f.clone(this._previousAttributes)},_performValidation:function(a,b){var c=this.validate(a);if(c)return b.error?b.error(this,c,b):this.trigger("error",this,c,b),!1;return!0}});
e.Collection=function(a,b){b||(b={});if(b.comparator)this.comparator=b.comparator;f.bindAll(this,"_onModelEvent","_removeReference");this._reset();a&&this.reset(a,{silent:!0});this.initialize.apply(this,arguments)};f.extend(e.Collection.prototype,e.Events,{model:e.Model,initialize:function(){},toJSON:function(){return this.map(function(a){return a.toJSON()})},add:function(a,b){if(f.isArray(a))for(var c=0,d=a.length;c<d;c++)this._add(a[c],b);else this._add(a,b);return this},remove:function(a,b){if(f.isArray(a))for(var c=
0,d=a.length;c<d;c++)this._remove(a[c],b);else this._remove(a,b);return this},get:function(a){if(a==null)return null;return this._byId[a.id!=null?a.id:a]},getByCid:function(a){return a&&this._byCid[a.cid||a]},at:function(a){return this.models[a]},sort:function(a){a||(a={});if(!this.comparator)throw Error("Cannot sort a set without a comparator");this.models=this.sortBy(this.comparator);a.silent||this.trigger("reset",this,a);return this},pluck:function(a){return f.map(this.models,function(b){return b.get(a)})},
reset:function(a,b){a||(a=[]);b||(b={});this.each(this._removeReference);this._reset();this.add(a,{silent:!0});b.silent||this.trigger("reset",this,b);return this},fetch:function(a){a||(a={});var b=this,c=a.success;a.success=function(d,f,e){b[a.add?"add":"reset"](b.parse(d,e),a);c&&c(b,d)};a.error=i(a.error,b,a);return(this.sync||e.sync).call(this,"read",this,a)},create:function(a,b){var c=this;b||(b={});a=this._prepareModel(a,b);if(!a)return!1;var d=b.success;b.success=function(a,e,f){c.add(a,b);
d&&d(a,e,f)};a.save(null,b);return a},parse:function(a){return a},chain:function(){return f(this.models).chain()},_reset:function(){this.length=0;this.models=[];this._byId={};this._byCid={}},_prepareModel:function(a,b){if(a instanceof e.Model){if(!a.collection)a.collection=this}else{var c=a;a=new this.model(c,{collection:this});a.validate&&!a._performValidation(c,b)&&(a=!1)}return a},_add:function(a,b){b||(b={});a=this._prepareModel(a,b);if(!a)return!1;var c=this.getByCid(a);if(c)throw Error(["Can't add the same model to a set twice",
c.id]);this._byId[a.id]=a;this._byCid[a.cid]=a;this.models.splice(b.at!=null?b.at:this.comparator?this.sortedIndex(a,this.comparator):this.length,0,a);a.bind("all",this._onModelEvent);this.length++;b.silent||a.trigger("add",a,this,b);return a},_remove:function(a,b){b||(b={});a=this.getByCid(a)||this.get(a);if(!a)return null;delete this._byId[a.id];delete this._byCid[a.cid];this.models.splice(this.indexOf(a),1);this.length--;b.silent||a.trigger("remove",a,this,b);this._removeReference(a);return a},
_removeReference:function(a){this==a.collection&&delete a.collection;a.unbind("all",this._onModelEvent)},_onModelEvent:function(a,b,c,d){(a=="add"||a=="remove")&&c!=this||(a=="destroy"&&this._remove(b,d),b&&a==="change:"+b.idAttribute&&(delete this._byId[b.previous(b.idAttribute)],this._byId[b.id]=b),this.trigger.apply(this,arguments))}});f.each(["forEach","each","map","reduce","reduceRight","find","detect","filter","select","reject","every","all","some","any","include","contains","invoke","max",
"min","sortBy","sortedIndex","toArray","size","first","rest","last","without","indexOf","lastIndexOf","isEmpty","groupBy"],function(a){e.Collection.prototype[a]=function(){return f[a].apply(f,[this.models].concat(f.toArray(arguments)))}});e.Router=function(a){a||(a={});if(a.routes)this.routes=a.routes;this._bindRoutes();this.initialize.apply(this,arguments)};var q=/:([\w\d]+)/g,r=/\*([\w\d]+)/g,s=/[-[\]{}()+?.,\\^$|#\s]/g;f.extend(e.Router.prototype,e.Events,{initialize:function(){},route:function(a,
b,c){e.history||(e.history=new e.History);f.isRegExp(a)||(a=this._routeToRegExp(a));e.history.route(a,f.bind(function(d){d=this._extractParameters(a,d);c.apply(this,d);this.trigger.apply(this,["route:"+b].concat(d))},this))},navigate:function(a,b){e.history.navigate(a,b)},_bindRoutes:function(){if(this.routes){var a=[],b;for(b in this.routes)a.unshift([b,this.routes[b]]);b=0;for(var c=a.length;b<c;b++)this.route(a[b][0],a[b][1],this[a[b][1]])}},_routeToRegExp:function(a){a=a.replace(s,"\\$&").replace(q,
"([^/]*)").replace(r,"(.*?)");return RegExp("^"+a+"$")},_extractParameters:function(a,b){return a.exec(b).slice(1)}});e.History=function(){this.handlers=[];f.bindAll(this,"checkUrl")};var j=/^#*/,t=/msie [\w.]+/,m=!1;f.extend(e.History.prototype,{interval:50,getFragment:function(a,b){if(a==null)if(this._hasPushState||b){a=window.location.pathname;var c=window.location.search;c&&(a+=c);a.indexOf(this.options.root)==0&&(a=a.substr(this.options.root.length))}else a=window.location.hash;return decodeURIComponent(a.replace(j,
""))},start:function(a){if(m)throw Error("Backbone.history has already been started");this.options=f.extend({},{root:"/"},this.options,a);this._wantsPushState=!!this.options.pushState;this._hasPushState=!(!this.options.pushState||!window.history||!window.history.pushState);a=this.getFragment();var b=document.documentMode;if(b=t.exec(navigator.userAgent.toLowerCase())&&(!b||b<=7))this.iframe=g('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow,this.navigate(a);
this._hasPushState?g(window).bind("popstate",this.checkUrl):"onhashchange"in window&&!b?g(window).bind("hashchange",this.checkUrl):setInterval(this.checkUrl,this.interval);this.fragment=a;m=!0;a=window.location;b=a.pathname==this.options.root;if(this._wantsPushState&&!this._hasPushState&&!b)return this.fragment=this.getFragment(null,!0),window.location.replace(this.options.root+"#"+this.fragment),!0;else if(this._wantsPushState&&this._hasPushState&&b&&a.hash)this.fragment=a.hash.replace(j,""),window.history.replaceState({},
document.title,a.protocol+"//"+a.host+this.options.root+this.fragment);if(!this.options.silent)return this.loadUrl()},route:function(a,b){this.handlers.unshift({route:a,callback:b})},checkUrl:function(){var a=this.getFragment();a==this.fragment&&this.iframe&&(a=this.getFragment(this.iframe.location.hash));if(a==this.fragment||a==decodeURIComponent(this.fragment))return!1;this.iframe&&this.navigate(a);this.loadUrl()||this.loadUrl(window.location.hash)},loadUrl:function(a){var b=this.fragment=this.getFragment(a);
return f.any(this.handlers,function(a){if(a.route.test(b))return a.callback(b),!0})},navigate:function(a,b){var c=(a||"").replace(j,"");if(!(this.fragment==c||this.fragment==decodeURIComponent(c))){if(this._hasPushState){var d=window.location;c.indexOf(this.options.root)!=0&&(c=this.options.root+c);this.fragment=c;window.history.pushState({},document.title,d.protocol+"//"+d.host+c)}else if(window.location.hash=this.fragment=c,this.iframe&&c!=this.getFragment(this.iframe.location.hash))this.iframe.document.open().close(),
this.iframe.location.hash=c;b&&this.loadUrl(a)}}});e.View=function(a){this.cid=f.uniqueId("view");this._configure(a||{});this._ensureElement();this.delegateEvents();this.initialize.apply(this,arguments)};var u=/^(\S+)\s*(.*)$/,n=["model","collection","el","id","attributes","className","tagName"];f.extend(e.View.prototype,e.Events,{tagName:"div",$:function(a){return g(a,this.el)},initialize:function(){},render:function(){return this},remove:function(){g(this.el).remove();return this},make:function(a,
b,c){a=document.createElement(a);b&&g(a).attr(b);c&&g(a).html(c);return a},delegateEvents:function(a){if(a||(a=this.events))for(var b in f.isFunction(a)&&(a=a.call(this)),g(this.el).unbind(".delegateEvents"+this.cid),a){var c=this[a[b]];if(!c)throw Error('Event "'+a[b]+'" does not exist');var d=b.match(u),e=d[1];d=d[2];c=f.bind(c,this);e+=".delegateEvents"+this.cid;d===""?g(this.el).bind(e,c):g(this.el).delegate(d,e,c)}},_configure:function(a){this.options&&(a=f.extend({},this.options,a));for(var b=
0,c=n.length;b<c;b++){var d=n[b];a[d]&&(this[d]=a[d])}this.options=a},_ensureElement:function(){if(this.el){if(f.isString(this.el))this.el=g(this.el).get(0)}else{var a=this.attributes||{};if(this.id)a.id=this.id;if(this.className)a["class"]=this.className;this.el=this.make(this.tagName,a)}}});e.Model.extend=e.Collection.extend=e.Router.extend=e.View.extend=function(a,b){var c=v(this,a,b);c.extend=this.extend;return c};var w={create:"POST",update:"PUT","delete":"DELETE",read:"GET"};e.sync=function(a,
b,c){var d=w[a];c=f.extend({type:d,dataType:"json"},c);if(!c.url)c.url=k(b)||l();if(!c.data&&b&&(a=="create"||a=="update"))c.contentType="application/json",c.data=JSON.stringify(b.toJSON());if(e.emulateJSON)c.contentType="application/x-www-form-urlencoded",c.data=c.data?{model:c.data}:{};if(e.emulateHTTP&&(d==="PUT"||d==="DELETE")){if(e.emulateJSON)c.data._method=d;c.type="POST";c.beforeSend=function(a){a.setRequestHeader("X-HTTP-Method-Override",d)}}if(c.type!=="GET"&&!e.emulateJSON)c.processData=
!1;return g.ajax(c)};var o=function(){},v=function(a,b,c){var d;d=b&&b.hasOwnProperty("constructor")?b.constructor:function(){return a.apply(this,arguments)};f.extend(d,a);o.prototype=a.prototype;d.prototype=new o;b&&f.extend(d.prototype,b);c&&f.extend(d,c);d.prototype.constructor=d;d.__super__=a.prototype;return d},k=function(a){if(!a||!a.url)return null;return f.isFunction(a.url)?a.url():a.url},l=function(){throw Error('A "url" property or function must be specified');},i=function(a,b,c){return function(d){a?
a(b,d,c):b.trigger("error",b,d,c)}}}).call(this);
(function(){function e(a){var b=-1,c=a.length,d=[];while(++b<c)d.push(a[b]);return d}function f(a){return Array.prototype.slice.call(a)}function i(){return this}function j(a,b,c){return function(){var d=c.apply(b,arguments);return arguments.length?a:d}}function k(a){return a!=null&&!isNaN(a)}function l(a){return a.length}function m(a){return a==null}function n(a){return a.replace(/(^\s+)|(\s+$)/g,"").replace(/\s+/g," ")}function q(){}function r(){function c(){var b=a,c=-1,d=b.length,e;while(++c<d)(e=b[c].on)&&e.apply(this,arguments)}var a=[],b={};return c.on=function(d,e){var f,g;if(arguments.length<2)return(f=b[d])&&f.on;if(f=b[d])f.on=null,a=a.slice(0,g=a.indexOf(f)).concat(a.slice(g+1)),delete b[d];return e&&a.push(b[d]={on:e}),c},c}function u(a,b){return b-(a?1+Math.floor(Math.log(a+Math.pow(10,1+Math.floor(Math.log(a)/Math.LN10)-b))/Math.LN10):1)}function v(a){return a+""}function w(a){var b=a.lastIndexOf("."),c=b>=0?a.substring(b):(b=a.length,""),d=[];while(b>0)d.push(a.substring(b-=3,b+3));return d.reverse().join(",")+c}function y(a,b){return{scale:Math.pow(10,(8-b)*3),symbol:a}}function D(a){return function(b){return b<=0?0:b>=1?1:a(b)}}function E(a){return function(b){return 1-a(1-b)}}function F(a){return function(b){return.5*(b<.5?a(2*b):2-a(2-2*b))}}function G(a){return a}function H(a){return function(b){return Math.pow(b,a)}}function I(a){return 1-Math.cos(a*Math.PI/2)}function J(a){return Math.pow(2,10*(a-1))}function K(a){return 1-Math.sqrt(1-a*a)}function L(a,b){var c;return arguments.length<2&&(b=.45),arguments.length<1?(a=1,c=b/4):c=b/(2*Math.PI)*Math.asin(1/a),function(d){return 1+a*Math.pow(2,10*-d)*Math.sin((d-c)*2*Math.PI/b)}}function M(a){return a||(a=1.70158),function(b){return b*b*((a+1)*b-a)}}function N(a){return a<1/2.75?7.5625*a*a:a<2/2.75?7.5625*(a-=1.5/2.75)*a+.75:a<2.5/2.75?7.5625*(a-=2.25/2.75)*a+.9375:7.5625*(a-=2.625/2.75)*a+.984375}function O(){d3.event.stopPropagation(),d3.event.preventDefault()}function Q(a){return a=="transform"?d3.interpolateTransform:d3.interpolate}function R(a,b){return b=b-(a=+a)?1/(b-a):0,function(c){return(c-a)*b}}function S(a,b){return b=b-(a=+a)?1/(b-a):0,function(c){return Math.max(0,Math.min(1,(c-a)*b))}}function T(a,b,c){return new U(a,b,c)}function U(a,b,c){this.r=a,this.g=b,this.b=c}function V(a){return a<16?"0"+Math.max(0,a).toString(16):Math.min(255,a).toString(16)}function W(a,b,c){var d=0,e=0,f=0,g,h,i;g=/([a-z]+)\((.*)\)/i.exec(a);if(g){h=g[2].split(",");switch(g[1]){case"hsl":return c(parseFloat(h[0]),parseFloat(h[1])/100,parseFloat(h[2])/100);case"rgb":return b(Y(h[0]),Y(h[1]),Y(h[2]))}}return(i=Z[a])?b(i.r,i.g,i.b):(a!=null&&a.charAt(0)==="#"&&(a.length===4?(d=a.charAt(1),d+=d,e=a.charAt(2),e+=e,f=a.charAt(3),f+=f):a.length===7&&(d=a.substring(1,3),e=a.substring(3,5),f=a.substring(5,7)),d=parseInt(d,16),e=parseInt(e,16),f=parseInt(f,16)),b(d,e,f))}function X(a,b,c){var d=Math.min(a/=255,b/=255,c/=255),e=Math.max(a,b,c),f=e-d,g,h,i=(e+d)/2;return f?(h=i<.5?f/(e+d):f/(2-e-d),a==e?g=(b-c)/f+(b<c?6:0):b==e?g=(c-a)/f+2:g=(a-b)/f+4,g*=60):h=g=0,_(g,h,i)}function Y(a){var b=parseFloat(a);return a.charAt(a.length-1)==="%"?Math.round(b*2.55):b}function _(a,b,c){return new ba(a,b,c)}function ba(a,b,c){this.h=a,this.s=b,this.l=c}function bb(a,b,c){function f(a){return a>360?a-=360:a<0&&(a+=360),a<60?d+(e-d)*a/60:a<180?e:a<240?d+(e-d)*(240-a)/60:d}function g(a){return Math.round(f(a)*255)}var d,e;return a%=360,a<0&&(a+=360),b=b<0?0:b>1?1:b,c=c<0?0:c>1?1:c,e=c<=.5?c*(1+b):c+b-c*b,d=2*c-e,T(g(a+120),g(a),g(a-120))}function bc(a){return h(a,bf),a}function bg(a){return function(){return bd(a,this)}}function bh(a){return function(){return be(a,this)}}function bj(a,b){function f(){if(b=this.classList)return b.add(a);var b=this.className,d=b.baseVal!=null,e=d?b.baseVal:b;c.lastIndex=0,c.test(e)||(e=n(e+" "+a),d?b.baseVal=e:this.className=e)}function g(){if(b=this.classList)return b.remove(a);var b=this.className,d=b.baseVal!=null,e=d?b.baseVal:b;e=n(e.replace(c," ")),d?b.baseVal=e:this.className=e}function h(){(b.apply(this,arguments)?f:g).call(this)}var c=new RegExp("(^|\\s+)"+d3.requote(a)+"(\\s+|$)","g");if(arguments.length<2){var d=this.node();if(e=d.classList)return e.contains(a);var e=d.className;return c.lastIndex=0,c.test(e.baseVal!=null?e.baseVal:e)}return this.each(typeof b=="function"?h:b?f:g)}function bk(a){return{__data__:a}}function bl(a){return arguments.length||(a=d3.ascending),function(b,c){return a(b&&b.__data__,c&&c.__data__)}}function bn(a){return h(a,bo),a}function bp(a,b,c){h(a,bt);var d={},e=d3.dispatch("start","end"),f=bw;return a.id=b,a.time=c,a.tween=function(b,c){return arguments.length<2?d[b]:(c==null?delete d[b]:d[b]=c,a)},a.ease=function(b){return arguments.length?(f=typeof b=="function"?b:d3.ease.apply(d3,arguments),a):f},a.each=function(b,c){return arguments.length<2?bx.call(a,b):(e.on(b,c),a)},d3.timer(function(g){return a.each(function(h,i,j){function p(a){if(o.active>b)return r();o.active=b;for(var f in d)(f=d[f].call(l,h,i))&&k.push(f);return e.start.call(l,h,i),q(a)||d3.timer(q,0,c),1}function q(a){if(o.active!==b)return r();var c=(a-m)/n,d=f(c),g=k.length;while(g>0)k[--g].call(l,d);if(c>=1)return r(),bv=b,e.end.call(l,h,i),bv=0,1}function r(){return--o.count||delete l.__transition__,1}var k=[],l=this,m=a[j][i].delay,n=a[j][i].duration,o=l.__transition__||(l.__transition__={active:0,count:0});++o.count,m<=g?p(g):d3.timer(p,m,c)}),1},0,c),a}function br(a,b,c){return c!=""&&bq}function bs(a,b){function d(a,d,e){var f=b.call(this,a,d);return f==null?e!=""&&bq:e!=f&&c(e,f)}function e(a,d,e){return e!=b&&c(e,b)}var c=Q(a);return typeof b=="function"?d:b==null?br:(b+="",e)}function bx(a){for(var b=0,c=this.length;b<c;b++)for(var d=this[b],e=0,f=d.length;e<f;e++){var g=d[e];g&&a.call(g=g.node,g.__data__,e,b)}return this}function bB(){var a,b=Date.now(),c=by;while(c)a=b-c.then,a>=c.delay&&(c.flush=c.callback(a)),c=c.next;var d=bC()-b;d>24?(isFinite(d)&&(clearTimeout(bA),bA=setTimeout(bB,d)),bz=0):(bz=1,bD(bB))}function bC(){var a=null,b=by,c=Infinity;while(b)b.flush?b=a?a.next=b.next:by=b.next:(c=Math.min(c,b.then+b.delay),b=(a=b).next);return c}function bE(a){var b=[a.a,a.b],c=[a.c,a.d],d=bG(b),e=bF(b,c),f=bG(bH(c,b,-e))||0;b[0]*c[1]<c[0]*b[1]&&(b[0]*=-1,b[1]*=-1,d*=-1,e*=-1),this.rotate=(d?Math.atan2(b[1],b[0]):Math.atan2(-c[0],c[1]))*bK,this.translate=[a.e,a.f],this.scale=[d,f],this.skew=f?Math.atan2(e,f)*bK:0}function bF(a,b){return a[0]*b[0]+a[1]*b[1]}function bG(a){var b=Math.sqrt(bF(a,a));return b&&(a[0]/=b,a[1]/=b),b}function bH(a,b,c){return a[0]+=c*b[0],a[1]+=c*b[1],a}function bL(){}function bM(a){var b=a[0],c=a[a.length-1];return b<c?[b,c]:[c,b]}function bN(a){return a.rangeExtent?a.rangeExtent():bM(a.range())}function bO(a,b){var c=0,d=a.length-1,e=a[c],f=a[d],g;f<e&&(g=c,c=d,d=g,g=e,e=f,f=g);if(g=f-e)b=b(g),a[c]=b.floor(e),a[d]=b.ceil(f);return a}function bP(){return Math}function bQ(a,b,c,d){function g(){var g=a.length==2?bW:bX,i=d?S:R;return e=g(a,b,i,c),f=g(b,a,i,d3.interpolate),h}function h(a){return e(a)}var e,f;return h.invert=function(a){return f(a)},h.domain=function(b){return arguments.length?(a=b.map(Number),g()):a},h.range=function(a){return arguments.length?(b=a,g()):b},h.rangeRound=function(a){return h.range(a).interpolate(d3.interpolateRound)},h.clamp=function(a){return arguments.length?(d=a,g()):d},h.interpolate=function(a){return arguments.length?(c=a,g()):c},h.ticks=function(b){return bU(a,b)},h.tickFormat=function(b){return bV(a,b)},h.nice=function(){return bO(a,bS),g()},h.copy=function(){return bQ(a,b,c,d)},g()}function bR(a,b){return d3.rebind(a,b,"range","rangeRound","interpolate","clamp")}function bS(a){return a=Math.pow(10,Math.round(Math.log(a)/Math.LN10)-1),{floor:function(b){return Math.floor(b/a)*a},ceil:function(b){return Math.ceil(b/a)*a}}}function bT(a,b){var c=bM(a),d=c[1]-c[0],e=Math.pow(10,Math.floor(Math.log(d/b)/Math.LN10)),f=b/d*e;return f<=.15?e*=10:f<=.35?e*=5:f<=.75&&(e*=2),c[0]=Math.ceil(c[0]/e)*e,c[1]=Math.floor(c[1]/e)*e+e*.5,c[2]=e,c}function bU(a,b){return d3.range.apply(d3,bT(a,b))}function bV(a,b){return d3.format(",."+Math.max(0,-Math.floor(Math.log(bT(a,b)[2])/Math.LN10+.01))+"f")}function bW(a,b,c,d){var e=c(a[0],a[1]),f=d(b[0],b[1]);return function(a){return f(e(a))}}function bX(a,b,c,d){var e=[],f=[],g=0,h=a.length;while(++g<h)e.push(c(a[g-1],a[g])),f.push(d(b[g-1],b[g]));return function(b){var c=d3.bisect(a,b,1,a.length-1)-1;return f[c](e[c](b))}}function bY(a,b){function d(c){return a(b(c))}var c=b.pow;return d.invert=function(b){return c(a.invert(b))},d.domain=function(e){return arguments.length?(b=e[0]<0?b_:b$,c=b.pow,a.domain(e.map(b)),d):a.domain().map(c)},d.nice=function(){return a.domain(bO(a.domain(),bP)),d},d.ticks=function(){var d=bM(a.domain()),e=[];if(d.every(isFinite)){var f=Math.floor(d[0]),g=Math.ceil(d[1]),h=c(d[0]),i=c(d[1]);if(b===b_){e.push(c(f));for(;f++<g;)for(var j=9;j>0;j--)e.push(c(f)*j)}else{for(;f<g;f++)for(var j=1;j<10;j++)e.push(c(f)*j);e.push(c(f))}for(f=0;e[f]<h;f++);for(g=e.length;e[g-1]>i;g--);e=e.slice(f,g)}return e},d.tickFormat=function(a,e){arguments.length<2&&(e=bZ);if(arguments.length<1)return e;var f=a/d.ticks().length,g=b===b_?(h=-1e-12,Math.floor):(h=1e-12,Math.ceil),h;return function(a){return a/c(g(b(a)+h))<f?e(a):""}},d.copy=function(){return bY(a.copy(),b)},bR(d,a)}function b$(a){return Math.log(a)/Math.LN10}function b_(a){return-Math.log(-a)/Math.LN10}function ca(a,b){function e(b){return a(c(b))}var c=cb(b),d=cb(1/b);return e.invert=function(b){return d(a.invert(b))},e.domain=function(b){return arguments.length?(a.domain(b.map(c)),e):a.domain().map(d)},e.ticks=function(a){return bU(e.domain(),a)},e.tickFormat=function(a){return bV(e.domain(),a)},e.nice=function(){return e.domain(bO(e.domain(),bS))},e.exponent=function(a){if(!arguments.length)return b;var f=e.domain();return c=cb(b=a),d=cb(1/b),e.domain(f)},e.copy=function(){return ca(a.copy(),b)},bR(e,a)}function cb(a){return function(b){return b<0?-Math.pow(-b,a):Math.pow(b,a)}}function cc(a,b){function f(b){return d[((c[b]||(c[b]=a.push(b)))-1)%d.length]}function g(b,c){return d3.range(a.length).map(function(a){return b+c*a})}var c,d,e;return f.domain=function(d){if(!arguments.length)return a;a=[],c={};var e=-1,g=d.length,h;while(++e<g)c[h=d[e]]||(c[h]=a.push(h));return f[b.t](b.x,b.p)},f.range=function(a){return arguments.length?(d=a,e=0,b={t:"range",x:a},f):d},f.rangePoints=function(c,h){arguments.length<2&&(h=0);var i=c[0],j=c[1],k=(j-i)/(a.length-1+h);return d=g(a.length<2?(i+j)/2:i+k*h/2,k),e=0,b={t:"rangePoints",x:c,p:h},f},f.rangeBands=function(c,h){arguments.length<2&&(h=0);var i=c[0],j=c[1],k=(j-i)/(a.length+h);return d=g(i+k*h,k),e=k*(1-h),b={t:"rangeBands",x:c,p:h},f},f.rangeRoundBands=function(c,h){arguments.length<2&&(h=0);var i=c[0],j=c[1],k=Math.floor((j-i)/(a.length+h));return d=g(i+Math.round((j-i-(a.length-h)*k)/2),k),e=Math.round(k*(1-h)),b={t:"rangeRoundBands",x:c,p:h},f},f.rangeBand=function(){return e},f.rangeExtent=function(){return b.x},f.copy=function(){return cc(a,b)},f.domain(a)}function ch(a,b){function d(){var d=0,f=a.length,g=b.length;c=[];while(++d<g)c[d-1]=d3.quantile(a,d/g);return e}function e(a){return isNaN(a=+a)?NaN:b[d3.bisect(c,a)]}var c;return e.domain=function(b){return arguments.length?(a=b.filter(function(a){return!isNaN(a)}).sort(d3.ascending),d()):a},e.range=function(a){return arguments.length?(b=a,d()):b},e.quantiles=function(){return c},e.copy=function(){return ch(a,b)},d()}function ci(a,b,c){function f(b){return c[Math.max(0,Math.min(e,Math.floor(d*(b-a))))]}function g(){return d=c.length/(b-a),e=c.length-1,f}var d,e;return f.domain=function(c){return arguments.length?(a=+c[0],b=+c[c.length-1],g()):[a,b]},f.range=function(a){return arguments.length?(c=a,g()):c},f.copy=function(){return ci(a,b,c)},g()}function cl(a){return a.innerRadius}function cm(a){return a.outerRadius}function cn(a){return a.startAngle}function co(a){return a.endAngle}function cp(a){function g(d){return d.length<1?null:"M"+e(a(cq(this,d,b,c)),f)}var b=cr,c=cs,d="linear",e=ct[d],f=.7;return g.x=function(a){return arguments.length?(b=a,g):b},g.y=function(a){return arguments.length?(c=a,g):c},g.interpolate=function(a){return arguments.length?(e=ct[d=a],g):d},g.tension=function(a){return arguments.length?(f=a,g):f},g}function cq(a,b,c,d){var e=[],f=-1,g=b.length,h=typeof c=="function",i=typeof d=="function",j;if(h&&i)while(++f<g)e.push([c.call(a,j=b[f],f),d.call(a,j,f)]);else if(h)while(++f<g)e.push([c.call(a,b[f],f),d]);else if(i)while(++f<g)e.push([c,d.call(a,b[f],f)]);else while(++f<g)e.push([c,d]);return e}function cr(a){return a[0]}function cs(a){return a[1]}function cu(a){var b=0,c=a.length,d=a[0],e=[d[0],",",d[1]];while(++b<c)e.push("L",(d=a[b])[0],",",d[1]);return e.join("")}function cv(a){var b=0,c=a.length,d=a[0],e=[d[0],",",d[1]];while(++b<c)e.push("V",(d=a[b])[1],"H",d[0]);return e.join("")}function cw(a){var b=0,c=a.length,d=a[0],e=[d[0],",",d[1]];while(++b<c)e.push("H",(d=a[b])[0],"V",d[1]);return e.join("")}function cx(a,b){return a.length<4?cu(a):a[1]+cA(a.slice(1,a.length-1),cB(a,b))}function cy(a,b){return a.length<3?cu(a):a[0]+cA((a.push(a[0]),a),cB([a[a.length-2]].concat(a,[a[1]]),b))}function cz(a,b,c){return a.length<3?cu(a):a[0]+cA(a,cB(a,b))}function cA(a,b){if(b.length<1||a.length!=b.length&&a.length!=b.length+2)return cu(a);var c=a.length!=b.length,d="",e=a[0],f=a[1],g=b[0],h=g,i=1;c&&(d+="Q"+(f[0]-g[0]*2/3)+","+(f[1]-g[1]*2/3)+","+f[0]+","+f[1],e=a[1],i=2);if(b.length>1){h=b[1],f=a[i],i++,d+="C"+(e[0]+g[0])+","+(e[1]+g[1])+","+(f[0]-h[0])+","+(f[1]-h[1])+","+f[0]+","+f[1];for(var j=2;j<b.length;j++,i++)f=a[i],h=b[j],d+="S"+(f[0]-h[0])+","+(f[1]-h[1])+","+f[0]+","+f[1]}if(c){var k=a[i];d+="Q"+(f[0]+h[0]*2/3)+","+(f[1]+h[1]*2/3)+","+k[0]+","+k[1]}return d}function cB(a,b){var c=[],d=(1-b)/2,e,f=a[0],g=a[1],h=1,i=a.length;while(++h<i)e=f,f=g,g=a[h],c.push([d*(g[0]-e[0]),d*(g[1]-e[1])]);return c}function cC(a){if(a.length<3)return cu(a);var b=1,c=a.length,d=a[0],e=d[0],f=d[1],g=[e,e,e,(d=a[1])[0]],h=[f,f,f,d[1]],i=[e,",",f];cK(i,g,h);while(++b<c)d=a[b],g.shift(),g.push(d[0]),h.shift(),h.push(d[1]),cK(i,g,h);b=-1;while(++b<2)g.shift(),g.push(d[0]),h.shift(),h.push(d[1]),cK(i,g,h);return i.join("")}function cD(a){if(a.length<4)return cu(a);var b=[],c=-1,d=a.length,e,f=[0],g=[0];while(++c<3)e=a[c],f.push(e[0]),g.push(e[1]);b.push(cG(cJ,f)+","+cG(cJ,g)),--c;while(++c<d)e=a[c],f.shift(),f.push(e[0]),g.shift(),g.push(e[1]),cK(b,f,g);return b.join("")}function cE(a){var b,c=-1,d=a.length,e=d+4,f,g=[],h=[];while(++c<4)f=a[c%d],g.push(f[0]),h.push(f[1]);b=[cG(cJ,g),",",cG(cJ,h)],--c;while(++c<e)f=a[c%d],g.shift(),g.push(f[0]),h.shift(),h.push(f[1]),cK(b,g,h);return b.join("")}function cF(a,b){var c=a.length-1,d=a[0][0],e=a[0][1],f=a[c][0]-d,g=a[c][1]-e,h=-1,i,j;while(++h<=c)i=a[h],j=h/c,i[0]=b*i[0]+(1-b)*(d+j*f),i[1]=b*i[1]+(1-b)*(e+j*g);return cC(a)}function cG(a,b){return a[0]*b[0]+a[1]*b[1]+a[2]*b[2]+a[3]*b[3]}function cK(a,b,c){a.push("C",cG(cH,b),",",cG(cH,c),",",cG(cI,b),",",cG(cI,c),",",cG(cJ,b),",",cG(cJ,c))}function cL(a,b){return(b[1]-a[1])/(b[0]-a[0])}function cM(a){var b=0,c=a.length-1,d=[],e=a[0],f=a[1],g=d[0]=cL(e,f);while(++b<c)d[b]=g+(g=cL(e=f,f=a[b+1]));return d[b]=g,d}function cN(a){var b=[],c,d,e,f,g=cM(a),h=-1,i=a.length-1;while(++h<i)c=cL(a[h],a[h+1]),Math.abs(c)<1e-6?g[h]=g[h+1]=0:(d=g[h]/c,e=g[h+1]/c,f=d*d+e*e,f>9&&(f=c*3/Math.sqrt(f),g[h]=f*d,g[h+1]=f*e));h=-1;while(++h<=i)f=(a[Math.min(i,h+1)][0]-a[Math.max(0,h-1)][0])/(6*(1+g[h]*g[h])),b.push([f||0,g[h]*f||0]);return b}function cO(a){return a.length<3?cu(a):a[0]+cA(a,cN(a))}function cP(a){var b,c=-1,d=a.length,e,f;while(++c<d)b=a[c],e=b[0],f=b[1]+cj,b[0]=e*Math.cos(f),b[1]=e*Math.sin(f);return a}function cQ(a){function j(f){if(f.length<1)return null;var j=cq(this,f,b,d),k=cq(this,f,b===c?cR(j):c,d===e?cS(j):e);return"M"+g(a(k),i)+"L"+h(a(j.reverse()),i)+"Z"}var b=cr,c=cr,d=0,e=cs,f,g,h,i=.7;return j.x=function(a){return arguments.length?(b=c=a,j):c},j.x0=function(a){return arguments.length?(b=a,j):b},j.x1=function(a){return arguments.length?(c=a,j):c},j.y=function(a){return arguments.length?(d=e=a,j):e},j.y0=function(a){return arguments.length?(d=a,j):d},j.y1=function(a){return arguments.length?(e=a,j):e},j.interpolate=function(a){return arguments.length?(g=ct[f=a],h=g.reverse||g,j):f},j.tension=function(a){return arguments.length?(i=a,j):i},j.interpolate("linear")}function cR(a){return function(b,c){return a[c][0]}}function cS(a){return function(b,c){return a[c][1]}}function cT(a){return a.source}function cU(a){return a.target}function cV(a){return a.radius}function cW(a){return a.startAngle}function cX(a){return a.endAngle}function cY(a){return[a.x,a.y]}function cZ(a){return function(){var b=a.apply(this,arguments),c=b[0],d=b[1]+cj;return[c*Math.cos(d),c*Math.sin(d)]}}function c_(a,b){var c=(a.ownerSVGElement||a).createSVGPoint();if(c$<0&&(window.scrollX||window.scrollY)){var d=d3.select(document.body).append("svg").style("position","absolute").style("top",0).style("left",0),e=d[0][0].getScreenCTM();c$=!e.f&&!e.e,d.remove()}return c$?(c.x=b.pageX,c.y=b.pageY):(c.x=b.clientX,c.y=b.clientY),c=c.matrixTransform(a.getScreenCTM().inverse()),[c.x,c.y]}function da(){return 64}function db(){return"circle"}function df(a,b){a.attr("transform",function(a){return"translate("+b(a)+",0)"})}function dg(a,b){a.attr("transform",function(a){return"translate(0,"+b(a)+")"})}function dh(a,b,c){e=[];if(c&&b.length>1){var d=bM(a.domain()),e,f=-1,g=b.length,h=(b[1]-b[0])/++c,i,j;while(++f<g)for(i=c;--i>0;)(j=+b[f]-i*h)>=d[0]&&e.push(j);for(--f,i=0;++i<c&&(j=+b[f]+i*h)<d[1];)e.push(j)}return e}function dt(a,b){a.select(".extent").attr("x",b[0][0]),a.selectAll(".n,.s,.w,.nw,.sw").attr("x",b[0][0]-2),a.selectAll(".e,.ne,.se").attr("x",b[1][0]-3),a.selectAll(".extent,.n,.s").attr("width",b[1][0]-b[0][0])}function du(a,b){a.select(".extent").attr("y",b[0][1]),a.selectAll(".n,.e,.w,.nw,.ne").attr("y",b[0][1]-3),a.selectAll(".s,.se,.sw").attr("y",b[1][1]-4),a.selectAll(".extent,.e,.w").attr("height",b[1][1]-b[0][1])}function dv(){d3.event.keyCode==32&&dk&&!dp&&(dr=null,ds[0]-=dn[1][0],ds[1]-=dn[1][1],dp=2,O())}function dw(){d3.event.keyCode==32&&dp==2&&(ds[0]+=dn[1][0],ds[1]+=dn[1][1],dp=0,O())}function dx(){if(ds){var a=d3.svg.mouse(dk),b=d3.select(dk);dp||(d3.event.altKey?(dr||(dr=[(dn[0][0]+dn[1][0])/2,(dn[0][1]+dn[1][1])/2]),ds[0]=dn[+(a[0]<dr[0])][0],ds[1]=dn[+(a[1]<dr[1])][1]):dr=null),dl&&(dy(a,dl,0),dt(b,dn)),dm&&(dy(a,dm,1),du(b,dn)),dj("brush")}}function dy(a,b,c){var d=bN(b),e=d[0],f=d[1],g=ds[c],h=dn[1][c]-dn[0][c],i,j;dp&&(e-=g,f-=h+g),i=Math.max(e,Math.min(f,a[c])),dp?j=(i+=g)+h:(dr&&(g=Math.max(e,Math.min(f,2*dr[c]-i))),g<i?(j=i,i=g):j=g),dn[0][c]=i,dn[1][c]=j}function dz(){ds&&(dx(),d3.select(dk).selectAll(".resize").style("pointer-events",di.empty()?"none":"all"),dj("brushend"),di=dj=dk=dl=dm=dn=dp=dq=dr=ds=null,O())}function dI(a){var b=dJ(),c=d3.event,d=d3.event={type:a};b&&(d.x=b[0]+dF[0],d.y=b[1]+dF[1],d.dx=b[0]-dG[0],d.dy=b[1]-dG[1],dH|=d.dx|d.dy,dG=b);try{dB[a].apply(dD,dE)}finally{d3.event=c}c.stopPropagation(),c.preventDefault()}function dJ(){var a=dD.parentNode,b=d3.event.changedTouches;return a&&(b?d3.svg.touches(a,b)[0]:d3.svg.mouse(a))}function dK(){if(!dD)return;var a=dD.parentNode;if(!a)return dL();dI("drag"),O()}function dL(){if(!dD)return;dI("dragend"),dH&&(O(),dH=d3.event.target===dC),dB=dC=dD=dE=dF=dG=null}function dM(){dH&&(O(),dH=0)}function dZ(a){return[a[0]-dS[0],a[1]-dS[1],dS[2]]}function d$(){dN||(dN=d3.select("body").append("div").style("visibility","hidden").style("top",0).style("height",0).style("width",0).style("overflow-y","scroll").append("div").style("height","2000px").node().parentNode);var a=d3.event,b;try{dN.scrollTop=1e3,dN.dispatchEvent(a),b=1e3-dN.scrollTop}catch(c){b=a.wheelDelta||-a.detail*5}return b*.005}function d_(){var a=d3.svg.touches(dW),b=-1,c=a.length,d;while(++b<c)dQ[(d=a[b]).identifier]=dZ(d);return a}function ea(){var a=d3.svg.touches(dW);switch(a.length){case 1:var b=a[0];ee(dS[2],b,dQ[b.identifier]);break;case 2:var c=a[0],d=a[1],e=[(c[0]+d[0])/2,(c[1]+d[1])/2],f=dQ[c.identifier],g=dQ[d.identifier],h=[(f[0]+g[0])/2,(f[1]+g[1])/2,f[2]];ee(Math.log(d3.event.scale)/Math.LN2+f[2],e,h)}}function eb(){dP=null,dO&&(dY=1,ee(dS[2],d3.svg.mouse(dW),dO))}function ec(){dO&&(dY&&(O(),dY=dV===d3.event.target),dS=dT=dU=dV=dW=dX=dO=null)}function ed(){dY&&(O(),dY=0)}function ee(a,b,c){function l(a,b,c){a.domain(a.range().map(function(f){return a.invert((f-c)*d/e+b)}))}a=eg(a,2);var d=Math.pow(2,dS[2]),e=Math.pow(2,a),f=Math.pow(2,(dS[2]=a)-c[2]),g=dS[0],h=dS[1],i=dS[0]=eg(b[0]-c[0]*f,0,e),j=dS[1]=eg(b[1]-c[1]*f,1,e),k=d3.event;d3.event={scale:e,translate:[i,j],transform:function(a,b){a&&l(a,g,i),b&&l(b,h,j)}};try{dU.apply(dW,dX)}finally{d3.event=k}k.preventDefault()}function eg(a,b,c){var d=dT[b],e=d[0],f=d[1];return arguments.length===3?Math.max(f*(f===Infinity?-Infinity:1/c-1),Math.min(e===-Infinity?Infinity:e,a/c))*c:Math.max(e,Math.min(f,a))}Date.now||(Date.now=function(){return+(new Date)});try{document.createElement("div").style.setProperty("opacity",0,"")}catch(a){var b=CSSStyleDeclaration.prototype,c=b.setProperty;b.setProperty=function(a,b,d){c.call(this,a,b+"",d)}}d3={version:"2.6.1"};var d=f;try{d(document.documentElement.childNodes)[0].nodeType}catch(g){d=e}var h=[].__proto__?function(a,b){a.__proto__=b}:function(a,b){for(var c in b)a[c]=b[c]};d3.functor=function(a){return typeof a=="function"?a:function(){return a}},d3.rebind=function(a,b){var c=1,d=arguments.length,e;while(++c<d)a[e=arguments[c]]=j(a,b,b[e]);return a},d3.ascending=function(a,b){return a<b?-1:a>b?1:a>=b?0:NaN},d3.descending=function(a,b){return b<a?-1:b>a?1:b>=a?0:NaN},d3.mean=function(a,b){var c=a.length,d,e=0,f=-1,g=0;if(arguments.length===1)while(++f<c)k(d=a[f])&&(e+=(d-e)/++g);else while(++f<c)k(d=b.call(a,a[f],f))&&(e+=(d-e)/++g);return g?e:undefined},d3.median=function(a,b){return arguments.length>1&&(a=a.map(b)),a=a.filter(k),a.length?d3.quantile(a.sort(d3.ascending),.5):undefined},d3.min=function(a,b){var c=-1,d=a.length,e,f;if(arguments.length===1){while(++c<d&&((e=a[c])==null||e!=e))e=undefined;while(++c<d)(f=a[c])!=null&&e>f&&(e=f)}else{while(++c<d&&((e=b.call(a,a[c],c))==null||e!=e))e=undefined;while(++c<d)(f=b.call(a,a[c],c))!=null&&e>f&&(e=f)}return e},d3.max=function(a,b){var c=-1,d=a.length,e,f;if(arguments.length===1){while(++c<d&&((e=a[c])==null||e!=e))e=undefined;while(++c<d)(f=a[c])!=null&&f>e&&(e=f)}else{while(++c<d&&((e=b.call(a,a[c],c))==null||e!=e))e=undefined;while(++c<d)(f=b.call(a,a[c],c))!=null&&f>e&&(e=f)}return e},d3.extent=function(a,b){var c=-1,d=a.length,e,f,g;if(arguments.length===1){while(++c<d&&((e=g=a[c])==null||e!=e))e=g=undefined;while(++c<d)(f=a[c])!=null&&(e>f&&(e=f),g<f&&(g=f))}else{while(++c<d&&((e=g=b.call(a,a[c],c))==null||e!=e))e=undefined;while(++c<d)(f=b.call(a,a[c],c))!=null&&(e>f&&(e=f),g<f&&(g=f))}return[e,g]},d3.random={normal:function(a,b){return arguments.length<2&&(b=1),arguments.length<1&&(a=0),function(){var c,d,e;do c=Math.random()*2-1,d=Math.random()*2-1,e=c*c+d*d;while(!e||e>1);return a+b*c*Math.sqrt(-2*Math.log(e)/e)}}},d3.sum=function(a,b){var c=0,d=a.length,e,f=-1;if(arguments.length===1)while(++f<d)isNaN(e=+a[f])||(c+=e);else while(++f<d)isNaN(e=+b.call(a,a[f],f))||(c+=e);return c},d3.quantile=function(a,b){var c=(a.length-1)*b+1,d=Math.floor(c),e=a[d-1],f=c-d;return f?e+f*(a[d]-e):e},d3.transpose=function(a){return d3.zip.apply(d3,a)},d3.zip=function(){if(!(e=arguments.length))return[];for(var a=-1,b=d3.min(arguments,l),c=new Array(b);++a<b;)for(var d=-1,e,f=c[a]=new Array(e);++d<e;)f[d]=arguments[d][a];return c},d3.bisectLeft=function(a,b,c,d){arguments.length<3&&(c=0),arguments.length<4&&(d=a.length);while(c<d){var e=c+d>>1;a[e]<b?c=e+1:d=e}return c},d3.bisect=d3.bisectRight=function(a,b,c,d){arguments.length<3&&(c=0),arguments.length<4&&(d=a.length);while(c<d){var e=c+d>>1;b<a[e]?d=e:c=e+1}return c},d3.first=function(a,b){var c=0,d=a.length,e=a[0],f;arguments.length===1&&(b=d3.ascending);while(++c<d)b.call(a,e,f=a[c])>0&&(e=f);return e},d3.last=function(a,b){var c=0,d=a.length,e=a[0],f;arguments.length===1&&(b=d3.ascending);while(++c<d)b.call(a,e,f=a[c])<=0&&(e=f);return e},d3.nest=function(){function f(c,g){if(g>=b.length)return e?e.call(a,c):d?c.sort(d):c;var h=-1,i=c.length,j=b[g++],k,l,m={};while(++h<i)(k=j(l=c[h]))in m?m[k].push(l):m[k]=[l];for(k in m)m[k]=f(m[k],g);return m}function g(a,d){if(d>=b.length)return a;var e=[],f=c[d++],h;for(h in a)e.push({key:h,values:g(a[h],d)});return f&&e.sort(function(a,b){return f(a.key,b.key)}),e}var a={},b=[],c=[],d,e;return a.map=function(a){return f(a,0)},a.entries=function(a){return g(f(a,0),0)},a.key=function(c){return b.push(c),a},a.sortKeys=function(d){return c[b.length-1]=d,a},a.sortValues=function(b){return d=b,a},a.rollup=function(b){return e=b,a},a},d3.keys=function(a){var b=[];for(var c in a)b.push(c);return b},d3.values=function(a){var b=[];for(var c in a)b.push(a[c]);return b},d3.entries=function(a){var b=[];for(var c in a)b.push({key:c,value:a[c]});return b},d3.permute=function(a,b){var c=[],d=-1,e=b.length;while(++d<e)c[d]=a[b[d]];return c},d3.merge=function(a){return Array.prototype.concat.apply([],a)},d3.split=function(a,b){var c=[],d=[],e,f=-1,g=a.length;arguments.length<2&&(b=m);while(++f<g)b.call(d,e=a[f],f)?d=[]:(d.length||c.push(d),d.push(e));return c},d3.range=function(a,b,c){arguments.length<3&&(c=1,arguments.length<2&&(b=a,a=0));if((b-a)/c==Infinity)throw new Error("infinite range");var d=[],e=-1,f;if(c<0)while((f=a+c*++e)>b)d.push(f);else while((f=a+c*++e)<b)d.push(f);return d},d3.requote=function(a){return a.replace(o,"\\$&")};var o=/[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;d3.round=function(a,b){return b?Math.round(a*Math.pow(10,b))*Math.pow(10,-b):Math.round(a)},d3.xhr=function(a,b,c){var d=new XMLHttpRequest;arguments.length<3?c=b:b&&d.overrideMimeType&&d.overrideMimeType(b),d.open("GET",a,!0),d.onreadystatechange=function(){d.readyState===4&&c(d.status<300?d:null)},d.send(null)},d3.text=function(a,b,c){function d(a){c(a&&a.responseText)}arguments.length<3&&(c=b,b=null),d3.xhr(a,b,d)},d3.json=function(a,b){d3.text(a,"application/json",function(a){b(a?JSON.parse(a):null)})},d3.html=function(a,b){d3.text(a,"text/html",function(a){if(a!=null){var c=document.createRange();c.selectNode(document.body),a=c.createContextualFragment(a)}b(a)})},d3.xml=function(a,b,c){function d(a){c(a&&a.responseXML)}arguments.length<3&&(c=b,b=null),d3.xhr(a,b,d)};var p={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};d3.ns={prefix:p,qualify:function(a){var b=a.indexOf(":");return b<0?a in p?{space:p[a],local:a}:a:{space:p[a.substring(0,b)],local:a.substring(b+1)}}},d3.dispatch=function(){var a=new q,b=-1,c=arguments.length;while(++b<c)a[arguments[b]]=r();return a},q.prototype.on=function(a,b){var c=a.indexOf("."),d="";return c>0&&(d=a.substring(c+1),a=a.substring(0,c)),arguments.length<2?this[a].on(d):(this[a].on(d,b),this)},d3.format=function(a){var b=s.exec(a),c=b[1]||" ",d=b[3]||"",e=b[5],f=+b[6],g=b[7],h=b[8],i=b[9],j=1,k="",l=!1;h&&(h=+h.substring(1)),e&&(c="0",g&&(f-=Math.floor((f-1)/4)));switch(i){case"n":g=!0,i="g";break;case"%":j=100,k="%",i="f";break;case"p":j=100,k="%",i="r";break;case"d":l=!0,h=0;break;case"s":j=-1,i="r"}return i=="r"&&!h&&(i="g"),i=t[i]||v,function(a){if(l&&a%1)return"";var b=a<0&&(a=-a)?"−":d;if(j<0){var m=d3.formatPrefix(a,h);a*=m.scale,k=m.symbol}else a*=j;a=i(a,h);if(e){var n=a.length+b.length;n<f&&(a=(new Array(f-n+1)).join(c)+a),g&&(a=w(a)),a=b+a}else{g&&(a=w(a)),a=b+a;var n=a.length;n<f&&(a=(new Array(f-n+1)).join(c)+a)}return a+k}};var s=/(?:([^{])?([<>=^]))?([+\- ])?(#)?(0)?([0-9]+)?(,)?(\.[0-9]+)?([a-zA-Z%])?/,t={g:function(a,b){return a.toPrecision(b)},e:function(a,b){return a.toExponential(b)},f:function(a,b){return a.toFixed(b)},r:function(a,b){return d3.round(a,b=u(a,b)).toFixed(Math.max(0,Math.min(20,b)))}},x=["y","z","a","f","p","n","μ","m","","k","M","G","T","P","E","Z","Y"].map(y);d3.formatPrefix=function(a,b){var c=0;return a&&(a<0&&(a*=-1),b&&(a=d3.round(a,u(a,b))),c=1+Math.floor(1e-12+Math.log(a)/Math.LN10),c=Math.max(-24,Math.min(24,Math.floor((c<=0?c+1:c-1)/3)*3))),x[8+c/3]};var z=H(2),A=H(3),B={linear:function(){return G},poly:H,quad:function(){return z},cubic:function(){return A},sin:function(){return I},exp:function(){return J},circle:function(){return K},elastic:L,back:M,bounce:function(){return N}},C={"in":function(a){return a},out:E,"in-out":F,"out-in":function(a){return F(E(a))}};d3.ease=function(a){var b=a.indexOf("-"),c=b>=0?a.substring(0,b):a,d=b>=0?a.substring(b+1):"in";return D(C[d](B[c].apply(null,Array.prototype.slice.call(arguments,1))))},d3.event=null,d3.interpolate=function(a,b){var c=d3.interpolators.length,d;while(--c>=0&&!(d=d3.interpolators[c](a,b)));return d},d3.interpolateNumber=function(a,b){return b-=a,function(c){return a+b*c}},d3.interpolateRound=function(a,b){return b-=a,function(c){return Math.round(a+b*c)}},d3.interpolateString=function(a,b){var c,d,e,f=0,g=0,h=[],i=[],j,k;P.lastIndex=0;for(d=0;c=P.exec(b);++d)c.index&&h.push(b.substring(f,g=c.index)),i.push({i:h.length,x:c[0]}),h.push(null),f=P.lastIndex;f<b.length&&h.push(b.substring(f));for(d=0,j=i.length;(c=P.exec(a))&&d<j;++d){k=i[d];if(k.x==c[0]){if(k.i)if(h[k.i+1]==null){h[k.i-1]+=k.x,h.splice(k.i,1);for(e=d+1;e<j;++e)i[e].i--}else{h[k.i-1]+=k.x+h[k.i+1],h.splice(k.i,2);for(e=d+1;e<j;++e)i[e].i-=2}else if(h[k.i+1]==null)h[k.i]=k.x;else{h[k.i]=k.x+h[k.i+1],h.splice(k.i+1,1);for(e=d+1;e<j;++e)i[e].i--}i.splice(d,1),j--,d--}else k.x=d3.interpolateNumber(parseFloat(c[0]),parseFloat(k.x))}while(d<j)k=i.pop(),h[k.i+1]==null?h[k.i]=k.x:(h[k.i]=k.x+h[k.i+1],h.splice(k.i+1,1)),j--;return h.length===1?h[0]==null?i[0].x:function(){return b}:function(a){for(d=0;d<j;++d)h[(k=i[d]).i]=k.x(a);return h.join("")}},d3.interpolateTransform=function(a,b){return d3.interpolateString(d3.transform(a)+"",d3.transform(b)+"")},d3.interpolateRgb=function(a,b){a=d3.rgb(a),b=d3.rgb(b);var c=a.r,d=a.g,e=a.b,f=b.r-c,g=b.g-d,h=b.b-e;return function(a){return"#"+V(Math.round(c+f*a))+V(Math.round(d+g*a))+V(Math.round(e+h*a))}},d3.interpolateHsl=function(a,b){a=d3.hsl(a),b=d3.hsl(b);var c=a.h,d=a.s,e=a.l,f=b.h-c,g=b.s-d,h=b.l-e;return function(a){return bb(c+f*a,d+g*a,e+h*a).toString()}},d3.interpolateArray=function(a,b){var c=[],d=[],e=a.length,f=b.length,g=Math.min(a.length,b.length),h;for(h=0;h<g;++h)c.push(d3.interpolate(a[h],b[h]));for(;h<e;++h)d[h]=a[h];for(;h<f;++h)d[h]=b[h];return function(a){for(h=0;h<g;++h)d[h]=c[h](a);return d}},d3.interpolateObject=function(a,b){var c={},d={},e;for(e in a)e in b?c[e]=Q(e)(a[e],b[e]):d[e]=a[e];for(e in b)e in a||(d[e]=b[e]);return function(a){for(e in c)d[e]=c[e](a);return d}};var P=/[-+]?(?:\d*\.?\d+)(?:[eE][-+]?\d+)?/g;d3.interpolators=[d3.interpolateObject,function(a,b){return b instanceof Array&&d3.interpolateArray(a,b)},function(a,b){return(typeof a=="string"||typeof b=="string")&&d3.interpolateString(a+"",b+"")},function(a,b){return(typeof b=="string"?b in Z||/^(#|rgb\(|hsl\()/.test(b):b instanceof U||b instanceof ba)&&d3.interpolateRgb(a,b)},function(a,b){return!isNaN(a=+a)&&!isNaN(b=+b)&&d3.interpolateNumber(a,b)}],d3.rgb=function(a,b,c){return arguments.length===1?a instanceof U?T(a.r,a.g,a.b):W(""+a,T,bb):T(~~a,~~b,~~c)},U.prototype.brighter=function(a){a=Math.pow(.7,arguments.length?a:1);var b=this.r,c=this.g,d=this.b,e=30;return!b&&!c&&!d?T(e,e,e):(b&&b<e&&(b=e),c&&c<e&&(c=e),d&&d<e&&(d=e),T(Math.min(255,Math.floor(b/a)),Math.min(255,Math.floor(c/a)),Math.min(255,Math.floor(d/a))))},U.prototype.darker=function(a){return a=Math.pow(.7,arguments.length?a:1),T(Math.floor(a*this.r),Math.floor(a*this.g),Math.floor(a*this.b))},U.prototype.hsl=function(){return X(this.r,this.g,this.b)},U.prototype.toString=function(){return"#"+V(this.r)+V(this.g)+V(this.b)};var Z={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey
:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",gold:"#ffd700",goldenrod:"#daa520",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavender:"#e6e6fa",lavenderblush:"#fff0f5",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"};for(var $ in Z)Z[$]=W(Z[$],T,bb);d3.hsl=function(a,b,c){return arguments.length===1?a instanceof ba?_(a.h,a.s,a.l):W(""+a,X,_):_(+a,+b,+c)},ba.prototype.brighter=function(a){return a=Math.pow(.7,arguments.length?a:1),_(this.h,this.s,this.l/a)},ba.prototype.darker=function(a){return a=Math.pow(.7,arguments.length?a:1),_(this.h,this.s,a*this.l)},ba.prototype.rgb=function(){return bb(this.h,this.s,this.l)},ba.prototype.toString=function(){return this.rgb().toString()};var bd=function(a,b){return b.querySelector(a)},be=function(a,b){return b.querySelectorAll(a)};typeof Sizzle=="function"&&(bd=function(a,b){return Sizzle(a,b)[0]},be=function(a,b){return Sizzle.uniqueSort(Sizzle(a,b))});var bf=[];d3.selection=function(){return bm},d3.selection.prototype=bf,bf.select=function(a){var b=[],c,d,e,f;typeof a!="function"&&(a=bg(a));for(var g=-1,h=this.length;++g<h;){b.push(c=[]),c.parentNode=(e=this[g]).parentNode;for(var i=-1,j=e.length;++i<j;)(f=e[i])?(c.push(d=a.call(f,f.__data__,i)),d&&"__data__"in f&&(d.__data__=f.__data__)):c.push(null)}return bc(b)},bf.selectAll=function(a){var b=[],c,e;typeof a!="function"&&(a=bh(a));for(var f=-1,g=this.length;++f<g;)for(var h=this[f],i=-1,j=h.length;++i<j;)if(e=h[i])b.push(c=d(a.call(e,e.__data__,i))),c.parentNode=e;return bc(b)},bf.attr=function(a,b){function d(){this.removeAttribute(a)}function e(){this.removeAttributeNS(a.space,a.local)}function f(){this.setAttribute(a,b)}function g(){this.setAttributeNS(a.space,a.local,b)}function h(){var c=b.apply(this,arguments);c==null?this.removeAttribute(a):this.setAttribute(a,c)}function i(){var c=b.apply(this,arguments);c==null?this.removeAttributeNS(a.space,a.local):this.setAttributeNS(a.space,a.local,c)}a=d3.ns.qualify(a);if(arguments.length<2){var c=this.node();return a.local?c.getAttributeNS(a.space,a.local):c.getAttribute(a)}return this.each(b==null?a.local?e:d:typeof b=="function"?a.local?i:h:a.local?g:f)},bf.classed=function(a,b){var c=a.split(bi),d=c.length,e=-1;if(arguments.length>1){while(++e<d)bj.call(this,c[e],b);return this}while(++e<d)if(!bj.call(this,c[e]))return!1;return!0};var bi=/\s+/g;bf.style=function(a,b,c){function d(){this.style.removeProperty(a)}function e(){this.style.setProperty(a,b,c)}function f(){var d=b.apply(this,arguments);d==null?this.style.removeProperty(a):this.style.setProperty(a,d,c)}return arguments.length<3&&(c=""),arguments.length<2?window.getComputedStyle(this.node(),null).getPropertyValue(a):this.each(b==null?d:typeof b=="function"?f:e)},bf.property=function(a,b){function c(){delete this[a]}function d(){this[a]=b}function e(){var c=b.apply(this,arguments);c==null?delete this[a]:this[a]=c}return arguments.length<2?this.node()[a]:this.each(b==null?c:typeof b=="function"?e:d)},bf.text=function(a){return arguments.length<1?this.node().textContent:this.each(typeof a=="function"?function(){this.textContent=a.apply(this,arguments)}:function(){this.textContent=a})},bf.html=function(a){return arguments.length<1?this.node().innerHTML:this.each(typeof a=="function"?function(){this.innerHTML=a.apply(this,arguments)}:function(){this.innerHTML=a})},bf.append=function(a){function b(){return this.appendChild(document.createElementNS(this.namespaceURI,a))}function c(){return this.appendChild(document.createElementNS(a.space,a.local))}return a=d3.ns.qualify(a),this.select(a.local?c:b)},bf.insert=function(a,b){function c(){return this.insertBefore(document.createElementNS(this.namespaceURI,a),bd(b,this))}function d(){return this.insertBefore(document.createElementNS(a.space,a.local),bd(b,this))}return a=d3.ns.qualify(a),this.select(a.local?d:c)},bf.remove=function(){return this.each(function(){var a=this.parentNode;a&&a.removeChild(this)})},bf.data=function(a,b){function f(a,f){var g,h=a.length,i=f.length,j=Math.min(h,i),k=Math.max(h,i),l=[],m=[],n=[],o,p;if(b){var q={},r=[],s,t=f.length;for(g=-1;++g<h;)s=b.call(o=a[g],o.__data__,g),s in q?n[t++]=o:q[s]=o,r.push(s);for(g=-1;++g<i;)o=q[s=b.call(f,p=f[g],g)],o?(o.__data__=p,l[g]=o,m[g]=n[g]=null):(m[g]=bk(p),l[g]=n[g]=null),delete q[s];for(g=-1;++g<h;)r[g]in q&&(n[g]=a[g])}else{for(g=-1;++g<j;)o=a[g],p=f[g],o?(o.__data__=p,l[g]=o,m[g]=n[g]=null):(m[g]=bk(p),l[g]=n[g]=null);for(;g<i;++g)m[g]=bk(f[g]),l[g]=n[g]=null;for(;g<k;++g)n[g]=a[g],m[g]=l[g]=null}m.update=l,m.parentNode=l.parentNode=n.parentNode=a.parentNode,c.push(m),d.push(l),e.push(n)}var c=[],d=[],e=[],g=-1,h=this.length,i;if(typeof a=="function")while(++g<h)f(i=this[g],a.call(i,i.parentNode.__data__,g));else while(++g<h)f(i=this[g],a);var j=bc(d);return j.enter=function(){return bn(c)},j.exit=function(){return bc(e)},j},bf.filter=function(a){var b=[],c,d,e;for(var f=0,g=this.length;f<g;f++){b.push(c=[]),c.parentNode=(d=this[f]).parentNode;for(var h=0,i=d.length;h<i;h++)(e=d[h])&&a.call(e,e.__data__,h)&&c.push(e)}return bc(b)},bf.map=function(a){return this.each(function(){this.__data__=a.apply(this,arguments)})},bf.sort=function(a){a=bl.apply(this,arguments);for(var b=0,c=this.length;b<c;b++)for(var d=this[b].sort(a),e=1,f=d.length,g=d[0];e<f;e++){var h=d[e];h&&(g&&g.parentNode.insertBefore(h,g.nextSibling),g=h)}return this},bf.on=function(a,b,c){arguments.length<3&&(c=!1);var d="__on"+a,e=a.indexOf(".");return e>0&&(a=a.substring(0,e)),arguments.length<2?(e=this.node()[d])&&e._:this.each(function(e,f){function h(a){var c=d3.event;d3.event=a;try{b.call(g,g.__data__,f)}finally{d3.event=c}}var g=this;g[d]&&g.removeEventListener(a,g[d],c),b&&g.addEventListener(a,g[d]=h,c),h._=b})},bf.each=function(a){for(var b=-1,c=this.length;++b<c;)for(var d=this[b],e=-1,f=d.length;++e<f;){var g=d[e];g&&a.call(g,g.__data__,e,b)}return this},bf.call=function(a){return a.apply(this,(arguments[0]=this,arguments)),this},bf.empty=function(){return!this.node()},bf.node=function(a){for(var b=0,c=this.length;b<c;b++)for(var d=this[b],e=0,f=d.length;e<f;e++){var g=d[e];if(g)return g}return null},bf.transition=function(){var a=[],b,c;for(var d=-1,e=this.length;++d<e;){a.push(b=[]);for(var f=this[d],g=-1,h=f.length;++g<h;)b.push((c=f[g])?{node:c,delay:0,duration:250}:null)}return bp(a,bv||++bu,Date.now())};var bm=bc([[document]]);bm[0].parentNode=document.documentElement,d3.select=function(a){return typeof a=="string"?bm.select(a):bc([[a]])},d3.selectAll=function(a){return typeof a=="string"?bm.selectAll(a):bc([d(a)])};var bo=[];bo.append=bf.append,bo.insert=bf.insert,bo.empty=bf.empty,bo.node=bf.node,bo.select=function(a){var b=[],c,d,e,f,g;for(var h=-1,i=this.length;++h<i;){e=(f=this[h]).update,b.push(c=[]),c.parentNode=f.parentNode;for(var j=-1,k=f.length;++j<k;)(g=f[j])?(c.push(e[j]=d=a.call(f.parentNode,g.__data__,j)),d.__data__=g.__data__):c.push(null)}return bc(b)};var bq={},bt=[],bu=0,bv=0,bw=d3.ease("cubic-in-out");bt.call=bf.call,d3.transition=function(){return bm.transition()},d3.transition.prototype=bt,bt.select=function(a){var b=[],c,d,e;typeof a!="function"&&(a=bg(a));for(var f=-1,g=this.length;++f<g;){b.push(c=[]);for(var h=this[f],i=-1,j=h.length;++i<j;)(e=h[i])&&(d=a.call(e.node,e.node.__data__,i))?("__data__"in e.node&&(d.__data__=e.node.__data__),c.push({node:d,delay:e.delay,duration:e.duration})):c.push(null)}return bp(b,this.id,this.time).ease(this.ease())},bt.selectAll=function(a){var b=[],c,d,e;typeof a!="function"&&(a=bh(a));for(var f=-1,g=this.length;++f<g;)for(var h=this[f],i=-1,j=h.length;++i<j;)if(e=h[i]){d=a.call(e.node,e.node.__data__,i),b.push(c=[]);for(var k=-1,l=d.length;++k<l;)c.push({node:d[k],delay:e.delay,duration:e.duration})}return bp(b,this.id,this.time).ease(this.ease())},bt.attr=function(a,b){return this.attrTween(a,bs(a,b))},bt.attrTween=function(a,b){function d(a,d){var e=b.call(this,a,d,this.getAttribute(c));return e===bq?(this.removeAttribute(c),null):e&&function(a){this.setAttribute(c,e(a))}}function e(a,d){var e=b.call(this,a,d,this.getAttributeNS(c.space,c.local));return e===bq?(this.removeAttributeNS(c.space,c.local),null):e&&function(a){this.setAttributeNS(c.space,c.local,e(a))}}var c=d3.ns.qualify(a);return this.tween("attr."+a,c.local?e:d)},bt.style=function(a,b,c){return arguments.length<3&&(c=""),this.styleTween(a,bs(a,b),c)},bt.styleTween=function(a,b,c){return arguments.length<3&&(c=""),this.tween("style."+a,function(d,e){var f=b.call(this,d,e,window.getComputedStyle(this,null).getPropertyValue(a));return f===bq?(this.style.removeProperty(a),null):f&&function(b){this.style.setProperty(a,f(b),c)}})},bt.text=function(a){return this.tween("text",function(b,c){this.textContent=typeof a=="function"?a.call(this,b,c):a})},bt.remove=function(){return this.each("end",function(){var a;!this.__transition__&&(a=this.parentNode)&&a.removeChild(this)})},bt.delay=function(a){var b=this;return b.each(typeof a=="function"?function(c,d,e){b[e][d].delay=+a.apply(this,arguments)}:(a=+a,function(c,d,e){b[e][d].delay=a}))},bt.duration=function(a){var b=this;return b.each(typeof a=="function"?function(c,d,e){b[e][d].duration=+a.apply(this,arguments)}:(a=+a,function(c,d,e){b[e][d].duration=a}))},bt.transition=function(){return this.select(i)};var by=null,bz,bA;d3.timer=function(a,b,c){var d=!1,e,f=by;if(arguments.length<3){if(arguments.length<2)b=0;else if(!isFinite(b))return;c=Date.now()}while(f){if(f.callback===a){f.then=c,f.delay=b,d=!0;break}e=f,f=f.next}d||(by={callback:a,then:c,delay:b,next:by}),bz||(bA=clearTimeout(bA),bz=1,bD(bB))},d3.timer.flush=function(){var a,b=Date.now(),c=by;while(c)a=b-c.then,c.delay||(c.flush=c.callback(a)),c=c.next;bC()};var bD=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){setTimeout(a,17)};d3.transform=function(a){bI.setAttribute("transform",a);var b=bI.transform.baseVal.consolidate();return new bE(b?b.matrix:bJ)},bE.prototype.toString=function(){return"translate("+this.translate+")rotate("+this.rotate+")skewX("+this.skew+")scale("+this.scale+")"};var bI=document.createElementNS(d3.ns.prefix.svg,"g"),bJ={a:1,b:0,c:0,d:1,e:0,f:0},bK=180/Math.PI;d3.scale={},d3.scale.linear=function(){return bQ([0,1],[0,1],d3.interpolate,!1)},d3.scale.log=function(){return bY(d3.scale.linear(),b$)};var bZ=d3.format(".0e");b$.pow=function(a){return Math.pow(10,a)},b_.pow=function(a){return-Math.pow(10,-a)},d3.scale.pow=function(){return ca(d3.scale.linear(),1)},d3.scale.sqrt=function(){return d3.scale.pow().exponent(.5)},d3.scale.ordinal=function(){return cc([],{t:"range",x:[]})},d3.scale.category10=function(){return d3.scale.ordinal().range(cd)},d3.scale.category20=function(){return d3.scale.ordinal().range(ce)},d3.scale.category20b=function(){return d3.scale.ordinal().range(cf)},d3.scale.category20c=function(){return d3.scale.ordinal().range(cg)};var cd=["#1f77b4","#ff7f0e","#2ca02c","#d62728","#9467bd","#8c564b","#e377c2","#7f7f7f","#bcbd22","#17becf"],ce=["#1f77b4","#aec7e8","#ff7f0e","#ffbb78","#2ca02c","#98df8a","#d62728","#ff9896","#9467bd","#c5b0d5","#8c564b","#c49c94","#e377c2","#f7b6d2","#7f7f7f","#c7c7c7","#bcbd22","#dbdb8d","#17becf","#9edae5"],cf=["#393b79","#5254a3","#6b6ecf","#9c9ede","#637939","#8ca252","#b5cf6b","#cedb9c","#8c6d31","#bd9e39","#e7ba52","#e7cb94","#843c39","#ad494a","#d6616b","#e7969c","#7b4173","#a55194","#ce6dbd","#de9ed6"],cg=["#3182bd","#6baed6","#9ecae1","#c6dbef","#e6550d","#fd8d3c","#fdae6b","#fdd0a2","#31a354","#74c476","#a1d99b","#c7e9c0","#756bb1","#9e9ac8","#bcbddc","#dadaeb","#636363","#969696","#bdbdbd","#d9d9d9"];d3.scale.quantile=function(){return ch([],[])},d3.scale.quantize=function(){return ci(0,1,[0,1])},d3.svg={},d3.svg.arc=function(){function e(){var e=a.apply(this,arguments),f=b.apply(this,arguments),g=c.apply(this,arguments)+cj,h=d.apply(this,arguments)+cj,i=(h<g&&(i=g,g=h,h=i),h-g),j=i<Math.PI?"0":"1",k=Math.cos(g),l=Math.sin(g),m=Math.cos(h),n=Math.sin(h);return i>=ck?e?"M0,"+f+"A"+f+","+f+" 0 1,1 0,"+ -f+"A"+f+","+f+" 0 1,1 0,"+f+"M0,"+e+"A"+e+","+e+" 0 1,0 0,"+ -e+"A"+e+","+e+" 0 1,0 0,"+e+"Z":"M0,"+f+"A"+f+","+f+" 0 1,1 0,"+ -f+"A"+f+","+f+" 0 1,1 0,"+f+"Z":e?"M"+f*k+","+f*l+"A"+f+","+f+" 0 "+j+",1 "+f*m+","+f*n+"L"+e*m+","+e*n+"A"+e+","+e+" 0 "+j+",0 "+e*k+","+e*l+"Z":"M"+f*k+","+f*l+"A"+f+","+f+" 0 "+j+",1 "+f*m+","+f*n+"L0,0"+"Z"}var a=cl,b=cm,c=cn,d=co;return e.innerRadius=function(b){return arguments.length?(a=d3.functor(b),e):a},e.outerRadius=function(a){return arguments.length?(b=d3.functor(a),e):b},e.startAngle=function(a){return arguments.length?(c=d3.functor(a),e):c},e.endAngle=function(a){return arguments.length?(d=d3.functor(a),e):d},e.centroid=function(){var e=(a.apply(this,arguments)+b.apply(this,arguments))/2,f=(c.apply(this,arguments)+d.apply(this,arguments))/2+cj;return[Math.cos(f)*e,Math.sin(f)*e]},e};var cj=-Math.PI/2,ck=2*Math.PI-1e-6;d3.svg.line=function(){return cp(Object)};var ct={linear:cu,"step-before":cv,"step-after":cw,basis:cC,"basis-open":cD,"basis-closed":cE,bundle:cF,cardinal:cz,"cardinal-open":cx,"cardinal-closed":cy,monotone:cO},cH=[0,2/3,1/3,0],cI=[0,1/3,2/3,0],cJ=[0,1/6,2/3,1/6];d3.svg.line.radial=function(){var a=cp(cP);return a.radius=a.x,delete a.x,a.angle=a.y,delete a.y,a},cv.reverse=cw,cw.reverse=cv,d3.svg.area=function(){return cQ(Object)},d3.svg.area.radial=function(){var a=cQ(cP);return a.radius=a.x,delete a.x,a.innerRadius=a.x0,delete a.x0,a.outerRadius=a.x1,delete a.x1,a.angle=a.y,delete a.y,a.startAngle=a.y0,delete a.y0,a.endAngle=a.y1,delete a.y1,a},d3.svg.chord=function(){function f(c,d){var e=g(this,a,c,d),f=g(this,b,c,d);return"M"+e.p0+i(e.r,e.p1)+(h(e,f)?j(e.r,e.p1,e.r,e.p0):j(e.r,e.p1,f.r,f.p0)+i(f.r,f.p1)+j(f.r,f.p1,e.r,e.p0))+"Z"}function g(a,b,f,g){var h=b.call(a,f,g),i=c.call(a,h,g),j=d.call(a,h,g)+cj,k=e.call(a,h,g)+cj;return{r:i,a0:j,a1:k,p0:[i*Math.cos(j),i*Math.sin(j)],p1:[i*Math.cos(k),i*Math.sin(k)]}}function h(a,b){return a.a0==b.a0&&a.a1==b.a1}function i(a,b){return"A"+a+","+a+" 0 0,1 "+b}function j(a,b,c,d){return"Q 0,0 "+d}var a=cT,b=cU,c=cV,d=cn,e=co;return f.radius=function(a){return arguments.length?(c=d3.functor(a),f):c},f.source=function(b){return arguments.length?(a=d3.functor(b),f):a},f.target=function(a){return arguments.length?(b=d3.functor(a),f):b},f.startAngle=function(a){return arguments.length?(d=d3.functor(a),f):d},f.endAngle=function(a){return arguments.length?(e=d3.functor(a),f):e},f},d3.svg.diagonal=function(){function d(d,e){var f=a.call(this,d,e),g=b.call(this,d,e),h=(f.y+g.y)/2,i=[f,{x:f.x,y:h},{x:g.x,y:h},g];return i=i.map(c),"M"+i[0]+"C"+i[1]+" "+i[2]+" "+i[3]}var a=cT,b=cU,c=cY;return d.source=function(b){return arguments.length?(a=d3.functor(b),d):a},d.target=function(a){return arguments.length?(b=d3.functor(a),d):b},d.projection=function(a){return arguments.length?(c=a,d):c},d},d3.svg.diagonal.radial=function(){var a=d3.svg.diagonal(),b=cY,c=a.projection;return a.projection=function(a){return arguments.length?c(cZ(b=a)):b},a},d3.svg.mouse=function(a){return c_(a,d3.event)};var c$=/WebKit/.test(navigator.userAgent)?-1:0;d3.svg.touches=function(a,b){return arguments.length<2&&(b=d3.event.touches),b?d(b).map(function(b){var c=c_(a,b);return c.identifier=b.identifier,c}):[]},d3.svg.symbol=function(){function c(c,d){return(dc[a.call(this,c,d)]||dc.circle)(b.call(this,c,d))}var a=db,b=da;return c.type=function(b){return arguments.length?(a=d3.functor(b),c):a},c.size=function(a){return arguments.length?(b=d3.functor(a),c):b},c};var dc={circle:function(a){var b=Math.sqrt(a/Math.PI);return"M0,"+b+"A"+b+","+b+" 0 1,1 0,"+ -b+"A"+b+","+b+" 0 1,1 0,"+b+"Z"},cross:function(a){var b=Math.sqrt(a/5)/2;return"M"+ -3*b+","+ -b+"H"+ -b+"V"+ -3*b+"H"+b+"V"+ -b+"H"+3*b+"V"+b+"H"+b+"V"+3*b+"H"+ -b+"V"+b+"H"+ -3*b+"Z"},diamond:function(a){var b=Math.sqrt(a/(2*de)),c=b*de;return"M0,"+ -b+"L"+c+",0"+" 0,"+b+" "+ -c+",0"+"Z"},square:function(a){var b=Math.sqrt(a)/2;return"M"+ -b+","+ -b+"L"+b+","+ -b+" "+b+","+b+" "+ -b+","+b+"Z"},"triangle-down":function(a){var b=Math.sqrt(a/dd),c=b*dd/2;return"M0,"+c+"L"+b+","+ -c+" "+ -b+","+ -c+"Z"},"triangle-up":function(a){var b=Math.sqrt(a/dd),c=b*dd/2;return"M0,"+ -c+"L"+b+","+c+" "+ -b+","+c+"Z"}};d3.svg.symbolTypes=d3.keys(dc);var dd=Math.sqrt(3),de=Math.tan(30*Math.PI/180);d3.svg.axis=function(){function j(j){j.each(function(k,l,m){var n=d3.select(this),o=j.delay?function(a){var b=bv;try{return bv=j.id,a.transition().delay(j[m][l].delay).duration(j[m][l].duration).ease(j.ease())}finally{bv=b}}:Object,p=a.ticks?a.ticks.apply(a,g):a.domain(),q=h==null?a.tickFormat?a.tickFormat.apply(a,g):String:h,r=dh(a,p,i),s=n.selectAll(".minor").data(r,String),t=s.enter().insert("line","g").attr("class","tick minor").style("opacity",1e-6),u=o(s.exit()).style("opacity",1e-6).remove(),v=o(s).style("opacity",1),w=n.selectAll("g").data(p,String),x=w.enter().insert("g","path").style("opacity",1e-6),y=o(w.exit()).style("opacity",1e-6).remove(),z=o(w).style("opacity",1),A,B=bN(a),C=n.selectAll(".domain").data([0]),D=C.enter().append("path").attr("class","domain"),E=o(C),F=a.copy(),G=this.__chart__||F;this.__chart__=F,x.append("line").attr("class","tick"),x.append("text"),z.select("text").text(q);switch(b){case"bottom":A=df,v.attr("x2",0).attr("y2",d),z.select("line").attr("x2",0).attr("y2",c),z.select("text").attr("x",0).attr("y",Math.max(c,0)+f).attr("dy",".71em").attr("text-anchor","middle"),E.attr("d","M"+B[0]+","+e+"V0H"+B[1]+"V"+e);break;case"top":A=df,v.attr("x2",0).attr("y2",-d),z.select("line").attr("x2",0).attr("y2",-c),z.select("text").attr("x",0).attr("y",-(Math.max(c,0)+f)).attr("dy","0em").attr("text-anchor","middle"),E.attr("d","M"+B[0]+","+ -e+"V0H"+B[1]+"V"+ -e);break;case"left":A=dg,v.attr("x2",-d).attr("y2",0),z.select("line").attr("x2",-c).attr("y2",0),z.select("text").attr("x",-(Math.max(c,0)+f)).attr("y",0).attr("dy",".32em").attr("text-anchor","end"),E.attr("d","M"+ -e+","+B[0]+"H0V"+B[1]+"H"+ -e);break;case"right":A=dg,v.attr("x2",d).attr("y2",0),z.select("line").attr("x2",c).attr("y2",0),z.select("text").attr("x",Math.max(c,0)+f).attr("y",0).attr("dy",".32em").attr("text-anchor","start"),E.attr("d","M"+e+","+B[0]+"H0V"+B[1]+"H"+e)}if(a.ticks)x.call(A,G),z.call(A,F),y.call(A,F),t.call(A,G),v.call(A,F),u.call(A,F);else{var H=F.rangeBand()/2,I=function(a){return F(a)+H};x.call(A,I),z.call(A,I)}})}var a=d3.scale.linear(),b="bottom",c=6,d=6,e=6,f=3,g=[10],h,i=0;return j.scale=function(b){return arguments.length?(a=b,j):a},j.orient=function(a){return arguments.length?(b=a,j):b},j.ticks=function(){return arguments.length?(g=arguments,j):g},j.tickFormat=function(a){return arguments.length?(h=a,j):h},j.tickSize=function(a,b,f){if(!arguments.length)return c;var g=arguments.length-1;return c=+a,d=g>1?+b:c,e=g>0?+arguments[g]:c,j},j.tickPadding=function(a){return arguments.length?(f=+a,j):f},j.tickSubdivide=function(a){return arguments.length?(i=+a,j):i},j},d3.svg.brush=function(){function e(a){var g=b&&c?["n","e","s","w","nw","ne","se","sw"]:b?["e","w"]:c?["n","s"]:[];a.each(function(){var a=d3.select(this).on("mousedown.brush",f),h=a.selectAll(".background").data([,]),i=a.selectAll(".extent").data([,]),j=a.selectAll(".resize").data(g,String),k;h.enter().append("rect").attr("class","background").style("visibility","hidden").style("pointer-events","all").style("cursor","crosshair"),i.enter().append("rect").attr("class","extent").style("cursor","move"),j.enter().append("rect").attr("class",function(a){return"resize "+a}).attr("width",6).attr("height",6).style("visibility","hidden").style("pointer-events",e.empty()?"none":"all").style("cursor",function(a){return dA[a]}),j.exit().remove(),b&&(k=bN(b),h.attr("x",k[0]).attr("width",k[1]-k[0]),dt(a,d)),c&&(k=bN(c),h.attr("y",k[0]).attr("height",k[1]-k[0]),du(a,d))})}function f(){var a=d3.select(d3.event.target);di=e,dk=this,dn=d,ds=d3.svg.mouse(dk),(dp=a.classed("extent"))?(ds[0]=d[0][0]-ds[0],ds[1]=d[0][1]-ds[1]):a.classed("resize")?(dq=d3.event.target.__data__,ds[0]=d[+/w$/.test(dq)][0],ds[1]=d[+/^n/.test(dq)][1]):d3.event.altKey&&(dr=ds.slice()),dl=!/^(n|s)$/.test(dq)&&b,dm=!/^(e|w)$/.test(dq)&&c,dj=g(this,arguments),dj("brushstart"),dx(),O()}function g(b,c){return function(d){var f=d3.event;try{d3.event={type:d,target:e},a[d].apply(b,c)}finally{d3.event=f}}}var a=d3.dispatch("brushstart","brush","brushend"),b,c,d=[[0,0],[0,0]];return e.x=function(a){return arguments.length?(b=a,e):b},e.y=function(a){return arguments.length?(c=a,e):c},e.extent=function(a){var f,g,h,i,j;return arguments.length?(b&&(f=a[0],g=a[1],c&&(f=f[0],g=g[0]),b.invert&&(f=b(f),g=b(g)),g<f&&(j=f,f=g,g=j),d[0][0]=f,d[1][0]=g),c&&(h=a[0],i=a[1],b&&(h=h[1],i=i[1]),c.invert&&(h=c(h),i=c(i)),i<h&&(j=h,h=i,i=j),d[0][1]=h,d[1][1]=i),e):(b&&(f=d[0][0],g=d[1][0],b.invert&&(f=b.invert(f),g=b.invert(g)),g<f&&(j=f,f=g,g=j)),c&&(h=d[0][1],i=d[1][1],c.invert&&(h=c.invert(h),i=c.invert(i)),i<h&&(j=h,h=i,i=j)),b&&c?[[f,h],[g,i]]:b?[f,g]:c&&[h,i])},e.clear=function(){return d[0][0]=d[0][1]=d[1][0]=d[1][1]=0,e},e.empty=function(){return b&&d[0][0]===d[1][0]||c&&d[0][1]===d[1][1]},d3.select(window).on("mousemove.brush",dx).on("mouseup.brush",dz).on("keydown.brush",dv).on("keyup.brush",dw),d3.rebind(e,a,"on")};var di,dj,dk,dl,dm,dn,dp,dq,dr,ds,dA={n:"ns-resize",e:"ew-resize",s:"ns-resize",w:"ew-resize",nw:"nwse-resize",ne:"nesw-resize",se:"nwse-resize",sw:"nesw-resize"};d3.behavior={},d3.behavior.drag=function(){function c(){this.on("mousedown.drag",e).on("touchstart.drag",e),d3.select(window).on("mousemove.drag",dK).on("touchmove.drag",dK).on("mouseup.drag",dL,!0).on("touchend.drag",dL,!0).on("click.drag",dM,!0)}function d(){dB=a,dC=d3.event.target,dD=this,dE=arguments,dG=dJ(),b?(dF=b.apply(dD,dE),dF=[dF.x-dG[0],dF.y-dG[1]]):dF=[0,0],dH=0}function e(){d.apply(this,arguments),dI("dragstart")}var a=d3.dispatch("drag","dragstart","dragend"),b=null;return c.origin=function(a){return arguments.length?(b=a,c):b},d3.rebind(c,a,"on")};var dB,dC,dD,dE,dF,dG,dH;d3.behavior.zoom=function(){function d(){this.on("mousedown.zoom",f).on("mousewheel.zoom",g).on("DOMMouseScroll.zoom",g).on("dblclick.zoom",h).on("touchstart.zoom",i),d3.select(window).on("mousemove.zoom",eb).on("mouseup.zoom",ec).on("touchmove.zoom",ea).on("touchend.zoom",d_).on("click.zoom",ed,!0)}function e(){dS=a,dT=c,dU=b.zoom,dV=d3.event.target,dW=this,dX=arguments}function f(){e.apply(this,arguments),dO=dZ(d3.svg.mouse(dW)),dY=0,d3.event.preventDefault(),window.focus()}function g(){e.apply(this,arguments),dP||(dP=dZ(d3.svg.mouse(dW))),ee(d$()+a[2],d3.svg.mouse(dW),dP)}function h(){e.apply(this,arguments);var b=d3.svg.mouse(dW);ee(d3.event.shiftKey?Math.ceil(a[2]-1):Math.floor(a[2]+1),b,dZ(b))}function i(){e.apply(this,arguments);var b=d_(),c,d=Date.now();b.length===1&&d-dR<300&&ee(1+Math.floor(a[2]),c=b[0],dQ[c.identifier]),dR=d}var a=[0,0,0],b=d3.dispatch("zoom"),c=ef;return d.extent=function(a){return arguments.length?(c=a==null?ef:a,d):c},d3.rebind(d,b,"on")};var dN,dO,dP,dQ={},dR=0,dS,dT,dU,dV,dW,dX,dY,ef=[[-Infinity,Infinity],[-Infinity,Infinity],[-Infinity,Infinity]]})();(function(){function b(a,b,c,d){var e,f,g=0,i=b.length,j=c.length;while(g<i){if(d>=j)return-1;e=b.charCodeAt(g++);if(e==37){f=h[b.charAt(g++)];if(!f||(d=f(a,c,d))<0)return-1}else if(e!=c.charCodeAt(d++))return-1}return d}function i(a,b,c){return b.substring(c,c+=3).toLowerCase()in j?c:-1}function k(a,b,c){l.lastIndex=0;var d=l.exec(b.substring(c,c+10));return d?c+=d[0].length:-1}function n(a,b,c){var d=o[b.substring(c,c+=3).toLowerCase()];return d==null?-1:(a.setMonth(d),c)}function p(a,b,c){q.lastIndex=0;var d=q.exec(b.substring(c,c+12));return d?(a.setMonth(r[d[0].toLowerCase()]),c+=d[0].length):-1}function t(a,c,d){return b(a,g.c.toString(),c,d)}function u(a,c,d){return b(a,g.x.toString(),c,d)}function v(a,c,d){return b(a,g.X.toString(),c,d)}function w(a,b,c){G.lastIndex=0;var d=G.exec(b.substring(c,c+4));return d?(a.setFullYear(d[0]),c+=d[0].length):-1}function x(a,b,c){G.lastIndex=0;var d=G.exec(b.substring(c,c+2));return d?(a.setFullYear(y()+ +d[0]),c+=d[0].length):-1}function y(){return~~((new Date).getFullYear()/1e3)*1e3}function z(a,b,c){G.lastIndex=0;var d=G.exec(b.substring(c,c+2));return d?(a.setMonth(d[0]-1),c+=d[0].length):-1}function A(a,b,c){G.lastIndex=0;var d=G.exec(b.substring(c,c+2));return d?(a.setDate(+d[0]),c+=d[0].length):-1}function B(a,b,c){G.lastIndex=0;var d=G.exec(b.substring(c,c+2));return d?(a.setHours(+d[0]),c+=d[0].length):-1}function C(a,b,c){return a.hour12=!0,B(a,b,c)}function D(a,b,c){G.lastIndex=0;var d=G.exec(b.substring(c,c+2));return d?(a.setMinutes(+d[0]),c+=d[0].length):-1}function E(a,b,c){G.lastIndex=0;var d=G.exec(b.substring(c,c+2));return d?(a.setSeconds(+d[0]),c+=d[0].length):-1}function F(a,b,c){G.lastIndex=0;var d=G.exec(b.substring(c,c+3));return d?(a.setMilliseconds(+d[0]),c+=d[0].length):-1}function H(a,b,c){var d=I[b.substring(c,c+=2).toLowerCase()];return d==null?-1:(a.hour12pm=d,c)}function J(b){return new a(b.getFullYear(),0,1)}function K(a,b){return~~((b-a)/864e5-(b.getTimezoneOffset()-a.getTimezoneOffset())/1440)}function L(a){return d(1+K(J(a),a))}function M(a){var b=J(a);return c(~~((K(b,a)+b.getDay())/7))}function N(a){var b=J(a);return c(~~((K(b,a)+(b.getDay()+6)%7)/7))}function O(a){var b=a.getTimezoneOffset(),d=b>0?"-":"+",e=~~(Math.abs(b)/60),f=Math.abs(b)%60;return d+c(e)+c(f)}function P(){this._=new Date(Date.UTC.apply(this,arguments))}function R(a){return a.toISOString()}function S(a,b,c){return function(d,e,f){var g=a(d),h=[];g<d&&b(g);if(f>1)while(g<e){var i=new Date(+g);c(i)%f||h.push(i),b(g)}else while(g<e)h.push(new Date(+g)),b(g);return h}}function T(a){a.setTime(a.getTime()+6e4)}function U(a){a.setTime(a.getTime()+36e5)}function V(a,b,c){function d(b){return a(b)}return d.invert=function(b){return X(a.invert(b))},d.domain=function(b){return arguments.length?(a.domain(b),d):a.domain().map(X)},d.ticks=function(a,c){var e=W(d.domain());if(typeof a!="function"){var f=e[1]-e[0],g=f/a,h=d3.bisect(Z,g,1,Z.length-1);Math.log(g/Z[h-1])<Math.log(Z[h]/g)&&--h,a=b[h],c=a[1],a=a[0]}return a(e[0],e[1],c)},d.tickFormat=function(){return c},d.copy=function(){return V(a.copy(),b,c)},d3.rebind(d,a,"range","rangeRound","interpolate","clamp")}function W(a){var b=a[0],c=a[a.length-1];return b<c?[b,c]:[c,b]}function X(a){return new Date(a)}function Y(a){return function(b){var c=a.length-1,d=a[c];while(!d[1](b))d=a[--c];return d[0](b)}}d3.time={};var a=Date;d3.time.format=function(c){function e(a){var b=[],e=-1,f=0,h,i;while(++e<d)c.charCodeAt(e)==37&&(b.push(c.substring(f,e),(i=g[h=c.charAt(++e)])?i(a):h),f=e+1);return b.push(c.substring(f,e)),b.join("")}var d=c.length;return e.parse=function(d){var e=new a(1900,0,1),f=b(e,c,d,0);if(f!=d.length)return null;if(e.hour12){var g=e.getHours()%12;e.setHours(e.hour12pm?g+12:g)}return delete e.hour12,delete e.hour12pm,e},e.toString=function(){return c},e};var c=d3.format("02d"),d=d3.format("03d"),e=d3.format("04d"),f=d3.format("2d"),g={a:function(a){return m[a.getDay()].substring(0,3)},A:function(a){return m[a.getDay()]},b:function(a){return s[a.getMonth()].substring(0,3)},B:function(a){return s[a.getMonth()]},c:d3.time.format("%a %b %e %H:%M:%S %Y"),d:function(a){return c(a.getDate())},e:function(a){return f(a.getDate())},H:function(a){return c(a.getHours())},I:function(a){return c(a.getHours()%12||12)},j:L,L:function(a){return d(a.getMilliseconds())},m:function(a){return c(a.getMonth()+1)},M:function(a){return c(a.getMinutes())},p:function(a){return a.getHours()>=12?"PM":"AM"},S:function(a){return c(a.getSeconds())},U:M,w:function(a){return a.getDay()},W:N,x:d3.time.format("%m/%d/%y"),X:d3.time.format("%H:%M:%S"),y:function(a){return c(a.getFullYear()%100)},Y:function(a){return e(a.getFullYear()%1e4)},Z:O,"%":function(a){return"%"}},h={a:i,A:k,b:n,B:p,c:t,d:A,e:A,H:B,I:C,L:F,m:z,M:D,p:H,S:E,x:u,X:v,y:x,Y:w},j={sun:3,mon:3,tue:3,wed:3,thu:3,fri:3,sat:3},l=/^(?:Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday)/ig,m=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],o={jan:0,feb:1,mar:2,apr:3,may:4,jun:5,jul:6,aug:7,sep:8,oct:9,nov:10,dec:11},q=/^(?:January|February|March|April|May|June|July|August|September|October|November|December)/ig,r={january:0,february:1,march:2,april:3,may:4,june:5,july:6,august:7,september:8,october:9,november:10,december:11},s=["January","February","March","April","May","June","July","August","September","October","November","December"],G=/\s*\d+/,I={am:0,pm:1};d3.time.format.utc=function(b){function d(b){try{a=P;var d=new a;return d._=b,c(d)}finally{a=Date}}var c=d3.time.format(b);return d.parse=function(b){try{a=P;var d=c.parse(b);return d&&d._}finally{a=Date}},d.toString=c.toString,d},P.prototype={getDate:function(){return this._.getUTCDate()},getDay:function(){return this._.getUTCDay()},getFullYear:function(){return this._.getUTCFullYear()},getHours:function(){return this._.getUTCHours()},getMilliseconds:function(){return this._.getUTCMilliseconds()},getMinutes:function(){return this._.getUTCMinutes()},getMonth:function(){return this._.getUTCMonth()},getSeconds:function(){return this._.getUTCSeconds()},getTimezoneOffset:function(){return 0},valueOf:function(){return this._.getTime()},setDate:function(a){this._.setUTCDate(a)},setDay:function(a){this._.setUTCDay(a)},setFullYear:function(a){this._.setUTCFullYear(a)},setHours:function(a){this._.setUTCHours(a)},setMilliseconds:function(a){this._.setUTCMilliseconds(a)},setMinutes:function(a){this._.setUTCMinutes(a)},setMonth:function(a){this._.setUTCMonth(a)},setSeconds:function(a){this._.setUTCSeconds(a)}};var Q=d3.time.format.utc("%Y-%m-%dT%H:%M:%S.%LZ");d3.time.format.iso=Date.prototype.toISOString?R:Q,R.parse=function(a){return new Date(a)},R.toString=Q.toString,d3.time.second=function(a){return new Date(~~(a/1e3)*1e3)},d3.time.second.utc=d3.time.second,d3.time.seconds=S(d3.time.second,function(a){a.setTime(a.getTime()+1e3)},function(a){return a.getSeconds()}),d3.time.seconds.utc=d3.time.seconds,d3.time.minute=function(a){return new Date(~~(a/6e4)*6e4)},d3.time.minute.utc=d3.time.minute,d3.time.minutes=S(d3.time.minute,T,function(a){return a.getMinutes()}),d3.time.minutes.utc=S(d3.time.minute,T,function(a){return a.getUTCMinutes()}),d3.time.hour=function(a){var b=a.getTimezoneOffset()/60;return new Date((~~(a/36e5-b)+b)*36e5)},d3.time.hour.utc=function(a){return new Date(~~(a/36e5)*36e5)},d3.time.hours=S(d3.time.hour,U,function(a){return a.getHours()}),d3.time.hours.utc=S(d3.time.hour.utc,U,function(a){return a.getUTCHours()}),d3.time.day=function(a){return new Date(a.getFullYear(),a.getMonth(),a.getDate())},d3.time.day.utc=function(a){return new Date(~~(a/864e5)*864e5)},d3.time.days=S(d3.time.day,function(a){a.setDate(a.getDate()+1)},function(a){return a.getDate()-1}),d3.time.days.utc=S(d3.time.day.utc,function(a){a.setUTCDate(a.getUTCDate()+1)},function(a){return a.getUTCDate()-1}),d3.time.week=function(a){return(a=d3.time.day(a)).setDate(a.getDate()-a.getDay()),a},d3.time.week.utc=function(a){return(a=d3.time.day.utc(a)).setUTCDate(a.getUTCDate()-a.getUTCDay()),a},d3.time.weeks=S(d3.time.week,function(a){a.setDate(a.getDate()+7)},function(a){return~~((a-new Date(a.getFullYear(),0,1))/6048e5)}),d3.time.weeks.utc=S(d3.time.week.utc,function(a){a.setUTCDate(a.getUTCDate()+7)},function(a){return~~((a-Date.UTC(a.getUTCFullYear(),0,1))/6048e5)}),d3.time.month=function(a){return new Date(a.getFullYear(),a.getMonth(),1)},d3.time.month.utc=function(a){return new Date(Date.UTC(a.getUTCFullYear(),a.getUTCMonth(),1))},d3.time.months=S(d3.time.month,function(a){a.setMonth(a.getMonth()+1)},function(a){return a.getMonth()}),d3.time.months.utc=S(d3.time.month.utc,function(a){a.setUTCMonth(a.getUTCMonth()+1)},function(a){return a.getUTCMonth()}),d3.time.year=function(a){return new Date(a.getFullYear(),0,1)},d3.time.year.utc=function(a){return new Date(Date.UTC(a.getUTCFullYear(),0,1))},d3.time.years=S(d3.time.year,function(a){a.setFullYear(a.getFullYear()+1)},function(a){return a.getFullYear()}),d3.time.years.utc=S(d3.time.year.utc,function(a){a.setUTCFullYear(a.getUTCFullYear()+1)},function(a){return a.getUTCFullYear()});var Z=[1e3,5e3,15e3,3e4,6e4,3e5,9e5,18e5,36e5,108e5,216e5,432e5,864e5,1728e5,6048e5,1728e6,7776e6,31536e6],$=[[d3.time.seconds,1],[d3.time.seconds,5],[d3.time.seconds,15],[d3.time.seconds,30],[d3.time.minutes,1],[d3.time.minutes,5],[d3.time.minutes,15],[d3.time.minutes,30],[d3.time.hours,1],[d3.time.hours,3],[d3.time.hours,6],[d3.time.hours,12],[d3.time.days,1],[d3.time.days,2],[d3.time.weeks,1],[d3.time.months,1],[d3.time.months,3],[d3.time.years,1]],_=[[d3.time.format("%Y"),function(a){return!0}],[d3.time.format("%B"),function(a){return a.getMonth()}],[d3.time.format("%b %d"),function(a){return a.getDate()!=1}],[d3.time.format("%a %d"),function(a){return a.getDay()&&a.getDate()!=1}],[d3.time.format("%I %p"),function(a){return a.getHours()}],[d3.time.format("%I:%M"),function(a){return a.getMinutes()}],[d3.time.format(":%S"),function(a){return a.getSeconds()||a.getMilliseconds()}]],ba=Y(_);d3.time.scale=function(){return V(d3.scale.linear(),$,ba)};var bb=[[d3.time.seconds.utc,1],[d3.time.seconds.utc,5],[d3.time.seconds.utc,15],[d3.time.seconds.utc,30],[d3.time.minutes.utc,1],[d3.time.minutes.utc,5],[d3.time.minutes.utc,15],[d3.time.minutes.utc,30],[d3.time.hours.utc,1],[d3.time.hours.utc,3],[d3.time.hours.utc,6],[d3.time.hours.utc,12],[d3.time.days.utc,1],[d3.time.days.utc,2],[d3.time.weeks.utc,1],[d3.time.months.utc,1],[d3.time.months.utc,3],[d3.time.years.utc,1]],bc=[[d3.time.format.utc("%Y"),function(a){return!0}],[d3.time.format.utc("%B"),function(a){return a.getUTCMonth()}],[d3.time.format.utc("%b %d"),function(a){return a.getUTCDate()!=1}],[d3.time.format.utc("%a %d"),function(a){return a.getUTCDay()&&a.getUTCDate()!=1}],[d3.time.format.utc("%I %p"),function(a){return a.getUTCHours()}],[d3.time.format.utc("%I:%M"),function(a){return a.getUTCMinutes()}],[d3.time.format.utc(":%S"),function(a){return a.getUTCSeconds()||a.getUTCMilliseconds()}]],bd=Y(bc);d3.time.scale.utc=function(){return V(d3.scale.linear(),bb,bd)}})();(function(){function a(a){return a.map(b).join(",")}function b(a){return/[",\n]/.test(a)?'"'+a.replace(/\"/g,'""')+'"':a}d3.csv=function(a,b){d3.text(a,"text/csv",function(a){b(a&&d3.csv.parse(a))})},d3.csv.parse=function(a){var b;return d3.csv.parseRows(a,function(a,c){if(c){var d={},e=-1,f=b.length;while(++e<f)d[b[e]]=a[e];return d}return b=a,null})},d3.csv.parseRows=function(a,b){function j(){if(f.lastIndex>=a.length)return d;if(i)return i=!1,c;var b=f.lastIndex;if(a.charCodeAt(b)===34){var e=b;while(e++<a.length)if(a.charCodeAt(e)===34){if(a.charCodeAt(e+1)!==34)break;e++}f.lastIndex=e+2;var g=a.charCodeAt(e+1);return g===13?(i=!0,a.charCodeAt(e+2)===10&&f.lastIndex++):g===10&&(i=!0),a.substring(b+1,e).replace(/""/g,'"')}var h=f.exec(a);return h?(i=h[0].charCodeAt(0)!==44,a.substring(b,h.index)):(f.lastIndex=a.length,a.substring(b))}var c={},d={},e=[],f=/\r\n|[,\r\n]/g,g=0,h,i;f.lastIndex=0;while((h=j())!==d){var k=[];while(h!==c&&h!==d)k.push(h),h=j();if(b&&!(k=b(k,g++)))continue;e.push(k)}return e},d3.csv.format=function(b){return b.map(a).join("\n")}})();/* ==========================================================
 * bootstrap-twipsy.js v1.4.0
 * http://twitter.github.com/bootstrap/javascript.html#twipsy
 * Adapted from the original jQuery.tipsy by Jason Frame
 * ==========================================================
 * Copyright 2011 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function( $ ) {

  "use strict"

 /* CSS TRANSITION SUPPORT (https://gist.github.com/373874)
  * ======================================================= */

  var transitionEnd

  $(document).ready(function () {

    $.support.transition = (function () {
      var thisBody = document.body || document.documentElement
        , thisStyle = thisBody.style
        , support = thisStyle.transition !== undefined || thisStyle.WebkitTransition !== undefined || thisStyle.MozTransition !== undefined || thisStyle.MsTransition !== undefined || thisStyle.OTransition !== undefined
      return support
    })()

    // set CSS transition event type
    if ( $.support.transition ) {
      transitionEnd = "TransitionEnd"
      if ( $.browser.webkit ) {
      	transitionEnd = "webkitTransitionEnd"
      } else if ( $.browser.mozilla ) {
      	transitionEnd = "transitionend"
      } else if ( $.browser.opera ) {
      	transitionEnd = "oTransitionEnd"
      }
    }

  })


 /* TWIPSY PUBLIC CLASS DEFINITION
  * ============================== */

  var Twipsy = function ( element, options ) {
    this.$element = $(element)
    this.options = options
    this.enabled = true
    this.fixTitle()
  }

  Twipsy.prototype = {

    show: function() {
      var pos
        , actualWidth
        , actualHeight
        , placement
        , $tip
        , tp
        , elementIsSvg

      if (this.hasContent() && this.enabled) {
        $tip = this.tip()
        this.setContent()

        if (this.options.animate) {
          $tip.addClass('fade')
        }

        $tip
          .remove()
          .css({ top: 0, left: 0, display: 'block' })
          .prependTo(document.body)

        pos = $.extend({}, this.$element.offset(), {
          width: this.$element[0].getBoundingClientRect().width
        , height: this.$element[0].getBoundingClientRect().height
        })

        actualWidth = $tip[0].offsetWidth
        actualHeight = $tip[0].offsetHeight

        placement = maybeCall(this.options.placement, this, [ $tip[0], this.$element[0] ])

        switch (placement) {
          case 'below':
            tp = {top: pos.top + pos.height + this.options.offset, left: pos.left + pos.width / 2 - actualWidth / 2}
            break
          case 'above':
            tp = {top: pos.top - actualHeight - this.options.offset, left: pos.left + pos.width / 2 - actualWidth / 2}
            break
          case 'left':
            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth - this.options.offset}
            break
          case 'right':
            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width + this.options.offset}
            break
        }

        $tip
          .css(tp)
          .addClass(placement)
          .addClass('in')
      }
    }

  , setContent: function () {
      var $tip = this.tip()
      $tip.find('.twipsy-inner')[this.options.html ? 'html' : 'text'](this.getTitle())
      $tip[0].className = 'twipsy'
    }

  , hide: function() {
      var that = this
        , $tip = this.tip()

      $tip.removeClass('in')

      function removeElement () {
        $tip.remove()
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip.bind(transitionEnd, removeElement) :
        removeElement()
    }

  , fixTitle: function() {
      var $e = this.$element
      if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') {
        $e.attr('data-original-title', $e.attr('title') || '').removeAttr('title')
      }
    }

  , hasContent: function () {
      return this.getTitle()
    }

  , getTitle: function() {
      var title
        , $e = this.$element
        , o = this.options

        this.fixTitle()

        if (typeof o.title == 'string') {
          title = $e.attr(o.title == 'title' ? 'data-original-title' : o.title)
        } else if (typeof o.title == 'function') {
          title = o.title.call($e[0])
        }

        title = ('' + title).replace(/(^\s*|\s*$)/, "")

        return title || o.fallback
    }

  , tip: function() {
      return this.$tip = this.$tip || $('<div class="twipsy" />').html(this.options.template)
    }

  , validate: function() {
      if (!this.$element[0].parentNode) {
        this.hide()
        this.$element = null
        this.options = null
      }
    }

  , enable: function() {
      this.enabled = true
    }

  , disable: function() {
      this.enabled = false
    }

  , toggleEnabled: function() {
      this.enabled = !this.enabled
    }

  , toggle: function () {
      this[this.tip().hasClass('in') ? 'hide' : 'show']()
    }

  }


 /* TWIPSY PRIVATE METHODS
  * ====================== */

   function maybeCall ( thing, ctx, args ) {
     return typeof thing == 'function' ? thing.apply(ctx, args) : thing
   }

 /* TWIPSY PLUGIN DEFINITION
  * ======================== */

  $.fn.twipsy = function (options) {
    $.fn.twipsy.initWith.call(this, options, Twipsy, 'twipsy')
    return this
  }

  $.fn.twipsy.initWith = function (options, Constructor, name) {
    var twipsy
      , binder
      , eventIn
      , eventOut

    if (options === true) {
      return this.data(name)
    } else if (typeof options == 'string') {
      twipsy = this.data(name)
      if (twipsy) {
        twipsy[options]()
      }
      return this
    }

    options = $.extend({}, $.fn[name].defaults, options)

    function get(ele) {
      var twipsy = $.data(ele, name)

      if (!twipsy) {
        twipsy = new Constructor(ele, $.fn.twipsy.elementOptions(ele, options))
        $.data(ele, name, twipsy)
      }

      return twipsy
    }

    function enter() {
      var twipsy = get(this)
      twipsy.hoverState = 'in'

      if (options.delayIn == 0) {
        twipsy.show()
      } else {
        twipsy.fixTitle()
        setTimeout(function() {
          if (twipsy.hoverState == 'in') {
            twipsy.show()
          }
        }, options.delayIn)
      }
    }

    function leave() {
      var twipsy = get(this)
      twipsy.hoverState = 'out'
      if (options.delayOut == 0) {
        twipsy.hide()
      } else {
        setTimeout(function() {
          if (twipsy.hoverState == 'out') {
            twipsy.hide()
          }
        }, options.delayOut)
      }
    }

    if (!options.live) {
      this.each(function() {
        get(this)
      })
    }

    if (options.trigger != 'manual') {
      binder   = options.live ? 'live' : 'bind'
      eventIn  = options.trigger == 'hover' ? 'mouseenter' : 'focus'
      eventOut = options.trigger == 'hover' ? 'mouseleave' : 'blur'
      this[binder](eventIn, enter)[binder](eventOut, leave)
    }

    return this
  }

  $.fn.twipsy.Twipsy = Twipsy

  $.fn.twipsy.defaults = {
    animate: true
  , delayIn: 0
  , delayOut: 0
  , fallback: ''
  , placement: 'above'
  , html: false
  , live: false
  , offset: 0
  , title: 'title'
  , trigger: 'hover'
  , template: '<div class="twipsy-arrow"></div><div class="twipsy-inner"></div>'
  }

  $.fn.twipsy.rejectAttrOptions = [ 'title' ]

  $.fn.twipsy.elementOptions = function(ele, options) {
    var data = $(ele).data()
      , rejects = $.fn.twipsy.rejectAttrOptions
      , i = rejects.length

    while (i--) {
      delete data[rejects[i]]
    }

    return $.extend({}, options, data)
  }

}( window.jQuery || window.ender );
/* ===========================================================
 * bootstrap-popover.js v1.4.0
 * http://twitter.github.com/bootstrap/javascript.html#popover
 * ===========================================================
 * Copyright 2011 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =========================================================== */


!function( $ ) {

 "use strict"

  var Popover = function ( element, options ) {
    this.$element = $(element)
    this.options = options
    this.enabled = true
    this.fixTitle()
  }

  /* NOTE: POPOVER EXTENDS BOOTSTRAP-TWIPSY.js
     ========================================= */

  Popover.prototype = $.extend({}, $.fn.twipsy.Twipsy.prototype, {

    setContent: function () {
      var $tip = this.tip()
      $tip.find('.title')[this.options.html ? 'html' : 'text'](this.getTitle())
      $tip.find('.content p')[this.options.html ? 'html' : 'text'](this.getContent())
      $tip[0].className = 'popover'
    }

  , hasContent: function () {
      return this.getTitle() || this.getContent()
    }

  , getContent: function () {
      var content
       , $e = this.$element
       , o = this.options

      if (typeof this.options.content == 'string') {
        content = $e.attr(this.options.content)
      } else if (typeof this.options.content == 'function') {
        content = this.options.content.call(this.$element[0])
      }

      return content
    }

  , tip: function() {
      if (!this.$tip) {
        this.$tip = $('<div class="popover" />')
          .html(this.options.template)
      }
      return this.$tip
    }

  })


 /* POPOVER PLUGIN DEFINITION
  * ======================= */

  $.fn.popover = function (options) {
    if (typeof options == 'object') options = $.extend({}, $.fn.popover.defaults, options)
    $.fn.twipsy.initWith.call(this, options, Popover, 'popover')
    return this
  }

  $.fn.popover.defaults = $.extend({} , $.fn.twipsy.defaults, {
    placement: 'right'
  , content: 'data-content'
  , template: '<div class="arrow"></div><div class="inner"><h3 class="title"></h3><div class="content"><p></p></div></div>'
  })

  $.fn.twipsy.rejectAttrOptions.push( 'content' )

}( window.jQuery || window.ender );var DaysGraph, RegionChooser, RegionTitle, WeekGraph, abbreviatedMonthName, cellPadding, cellSize, dayOfWeek, weekDayName, weekOfYear;

dayOfWeek = d3.time.format("%w");

weekDayName = d3.time.format("%A");

weekOfYear = d3.time.format("%U");

abbreviatedMonthName = d3.time.format("%b");

cellSize = 50;

cellPadding = 5;

$(document).ready(function() {
  return d3.text("/stolen-vehicles-pt2/stolenvehicles2.csv", function(text) {
    var graph, regionChooser, regionModel, regionTitle, stolenCarsModel, vehicles, weekGraph;
    vehicles = d3.csv.parseRows(text, function(d) {
      var vehicle;
      vehicle = {
        plate: d[0],
        color: d[1],
        make: d[2],
        model: d[3],
        year: parseInt(d[4]),
        type: d[5],
        dateString: d[6],
        region: d[7]
      };
      vehicle.date = d3.time.day.utc(new Date(vehicle.dateString));
      vehicle.weekOfYear = weekOfYear(vehicle.date);
      vehicle.dayOfWeek = dayOfWeek(vehicle.date);
      return vehicle;
    });
    stolenCarsModel = new Backbone.Model;
    graph = new DaysGraph({
      el: "#daysGraph",
      model: stolenCarsModel
    });
    weekGraph = new WeekGraph({
      el: "#weekGraph",
      model: stolenCarsModel
    });
    regionChooser = new RegionChooser({
      el: "#regionChooser",
      model: stolenCarsModel
    });
    regionModel = new Backbone.Model;
    regionChooser.bind("change:region", function(view, region) {
      return regionModel.set({
        region: region
      });
    });
    regionTitle = new RegionTitle({
      el: "#regionTitle",
      model: regionModel
    });
    regionModel.bind("change:region", function(model, region) {
      if (region === "All Regions") {
        return stolenCarsModel.set({
          selectedVehicles: vehicles
        });
      } else {
        return stolenCarsModel.set({
          selectedVehicles: _.filter(vehicles, function(v) {
            return v.region === region;
          })
        });
      }
    });
    stolenCarsModel.set({
      allVehicles: vehicles,
      minDate: (_.min(vehicles, function(v) {
        return v.date;
      })).date,
      maxDate: (_.max(vehicles, function(v) {
        return v.date;
      })).date
    });
    return regionModel.set({
      region: "All Regions"
    });
  });
});

WeekGraph = Backbone.View.extend({
  height: 150,
  width: 420,
  initialize: function() {
    var _this = this;
    return this.model.bind("change:selectedVehicles", function() {
      return _this.render();
    });
  },
  render: function() {
    var bars, color, height, maxPerWeek, weekDays, x,
      _this = this;
    weekDays = d3.nest().key(function(d) {
      return d.dayOfWeek;
    }).entries(this.model.get("selectedVehicles"));
    x = d3.scale.linear().domain([0, 6]).range([0, 6 * (cellPadding + cellSize)]);
    maxPerWeek = _.max(weekDays, function(d) {
      return d.values.length;
    }).values.length;
    color = d3.scale.linear().domain([0, maxPerWeek]).range(["white", "darkblue"]);
    height = d3.scale.linear().domain([0, maxPerWeek]).range([0, this.height]);
    bars = d3.select(this.el).attr("width", 420).attr("height", this.height).selectAll("rect.weekDay").data(weekDays);
    bars.transition().duration(1000).attr("x", function(d, i) {
      return x(i);
    }).attr("y", function(d, i) {
      return _this.height - height(d.values.length);
    }).attr("height", function(d, i) {
      return height(d.values.length);
    }).attr("fill", function(d) {
      return color(d.values.length);
    });
    bars.enter().append("svg:rect").attr("x", function(d, i) {
      return x(i);
    }).attr("y", function(d, i) {
      return _this.height - height(d.values.length);
    }).attr("height", function(d, i) {
      return height(d.values.length);
    }).attr("width", cellSize).attr("class", "weekDay").attr("fill", function(d) {
      return color(d.values.length);
    });
    bars.exit().remove();
    return this.$("rect.weekDay").twipsy({
      title: function() {
        return weekDayName(this.__data__.values[0].date) + "<br>" + this.__data__.values.length + " Reports";
      },
      html: true,
      placement: "above"
    });
  }
});

RegionTitle = Backbone.View.extend({
  initialize: function() {
    var _this = this;
    return this.model.bind("change:region", function() {
      return _this.render();
    });
  },
  render: function() {
    return $(this.el).text("" + (this.model.get('region')) + " Stolen Vehicles");
  }
});

RegionChooser = Backbone.View.extend({
  initialize: function() {
    var _this = this;
    return this.model.bind("change:allVehicles", function() {
      return _this.render();
    });
  },
  region: function() {
    return this.$("input:radio[name=region]:checked").val();
  },
  render: function() {
    var color, divs, form, maxPerRegion, regions,
      _this = this;
    regions = d3.nest().key(function(d) {
      return d.region;
    }).entries(this.model.get("allVehicles"));
    regions.unshift({
      key: "All Regions",
      values: []
    });
    maxPerRegion = _.max(regions, function(d) {
      return d.values.length;
    }).values.length;
    color = d3.scale.linear().domain([0, maxPerRegion]).range(["white", "darkblue"]);
    form = d3.select(this.el).append("form");
    divs = form.selectAll("input[name=region]").data(regions).enter().append("div").html(function(d) {
      return "<input name='region' type='radio'\n     id='" + d.key + "' value='" + d.key + "'/>\n<label for='" + d.key + "' style='cursor:pointer'>\n<div class='regionBox' \n     style='width: " + (d.values.length / 4) + "px;\n     background-color:" + (color(d.values.length)) + "'>\n</div>\n" + d.key + "\n</label>";
    });
    $(this.el).on("change", "input[name=region]", function() {
      return _this.trigger("change:region", _this, _this.region());
    });
    return this.$("input[value='All Regions']").attr("checked", "true");
  }
});

DaysGraph = Backbone.View.extend({
  height: 1510,
  width: 420,
  topPadding: 30,
  initialize: function() {
    var _this = this;
    return this.model.bind("change:selectedVehicles", function() {
      return _this.render();
    });
  },
  render: function() {
    var color, dayLabels, days, minWeek, monthBoundaries, monthLabels, months, svg, worstDay, x, y,
      _this = this;
    days = d3.nest().key(function(d) {
      return d.dateString;
    }).entries(this.model.get("selectedVehicles"));
    days = _(days).sortBy(function(v) {
      return v.key;
    });
    svg = d3.select(this.el).attr("width", this.width).attr("height", this.height).attr("preserveAspectRatio", "none").attr("transform", "translate(0," + this.topPadding + ")");
    worstDay = _(days).max(function(day) {
      return day.values.length;
    });
    color = d3.scale.linear().domain([0, worstDay.values.length]).range(["white", "darkblue"]);
    minWeek = weekOfYear(this.model.get("minDate"));
    x = d3.scale.linear().domain([0, 6]).range([0, 6 * (cellPadding + cellSize)]);
    y = function(w) {
      return _this.topPadding + (w - minWeek) * (cellSize + cellPadding);
    };
    days = svg.selectAll("rect.day").data(days, function(d) {
      return d.key;
    });
    days.transition().duration(1000).delay(function() {
      return Math.random() * 1000;
    }).attr("fill", function(d) {
      return color(d.values.length);
    });
    days.enter().append("svg:rect").attr("class", "day").attr("width", cellSize).attr("height", cellSize).attr("title", function(d) {
      return d.key + ": " + d.values.length;
    }).attr("y", function(d) {
      return y(d.values[0].weekOfYear);
    }).attr("x", function(d) {
      return x(d.values[0].dayOfWeek);
    }).attr("fill", "white").attr("stroke", "white").on("mouseover.highlight", function() {
      return d3.select(this).classed("highlight", true);
    }).on("mouseout.highlight", function(d) {
      return d3.select(this).classed("highlight", false);
    }).transition().duration(1000).delay(function() {
      return Math.random() * 1000;
    }).attr("fill", function(d) {
      return color(d.values.length);
    });
    days.exit().transition().duration(1000).delay(function() {
      return Math.random() * 1000;
    }).attr("fill", "white").remove();
    months = d3.time.months(this.model.get("minDate"), this.model.get("maxDate"));
    monthLabels = svg.selectAll("text.monthLabel").data(months);
    monthLabels.enter().append("svg:text").attr("class", "monthLabel").text(abbreviatedMonthName).attr("x", x(7)).attr("y", function(d) {
      return y(weekOfYear(d));
    }).attr("dy", (cellSize + cellPadding) * (3 / 2)).attr("dominant-baseline", "central").attr("fill", "white").transition().duration(3000).attr("fill", "black");
    monthLabels.exit().remove();
    monthBoundaries = svg.selectAll("path.monthBoundary").data(months);
    monthBoundaries.enter().append("path").attr("class", "monthBoundary").attr("stroke", "black").attr("stroke-width", "1").attr("fill", "none").attr("transform", "translate(" + (-cellPadding / 2) + "," + (-cellPadding / 2) + ")").attr("d", function(t0) {
      var d0, d1, t1, w0, w1;
      t1 = new Date(t0.getUTCFullYear(), t0.getUTCMonth() + 1, 0);
      d0 = +dayOfWeek(t0);
      w0 = +weekOfYear(t0);
      d1 = +dayOfWeek(t1);
      w1 = +weekOfYear(t1);
      return ("M " + (x(7)) + ", " + (y(w0))) + ("H " + (x(d0))) + ("V " + (y(w0 + 1))) + ("H " + (x(0)));
    });
    monthBoundaries.exit().remove();
    dayLabels = svg.selectAll("text.dayLabel").data(["S", "M", "T", "W", "T", "F", "S"]);
    dayLabels.enter().append("text").attr("class", "dayLabel").text(function(d) {
      return d;
    }).attr("fill", "black").attr("x", function(d, i) {
      return x(i) + 0.5 * cellSize;
    }).attr("text-anchor", "middle").attr("y", 15);
    dayLabels.exit().remove();
    return this.$("rect.day").popover({
      title: function() {
        return "" + this.__data__.key;
      },
      content: function() {
        var carBox, content, v, _i, _len, _ref;
        carBox = function(color) {
          return "<div class='carBox' style='background-color: " + color + ";'></div>";
        };
        content = "" + this.__data__.values.length + " \nStolen Vehicle Report" + (this.__data__.values.length > 1 ? "s" : "") + ".<br>";
        _ref = this.__data__.values;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          v = _ref[_i];
          content += carBox(v.color);
        }
        return content + "<br><em>colors shown are the vehicle colors</em>";
      },
      html: true,
      placement: "right"
    });
  }
});
