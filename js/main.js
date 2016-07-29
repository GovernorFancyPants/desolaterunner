---
---
/*! skinny-bones-jekyll - v1.0.0 - 2016-07-29 */!function($){"use strict";$.fn.fitVids=function(options){var settings={customSelector:null,ignore:null};if(!document.getElementById("fit-vids-style")){var head=document.head||document.getElementsByTagName("head")[0],css=".fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}",div=document.createElement("div");div.innerHTML='<p>x</p><style id="fit-vids-style">'+css+"</style>",head.appendChild(div.childNodes[1])}return options&&$.extend(settings,options),this.each(function(){var selectors=["iframe[src*='player.vimeo.com']","iframe[src*='youtube.com']","iframe[src*='youtube-nocookie.com']","iframe[src*='kickstarter.com'][src*='video.html']","object","embed"];settings.customSelector&&selectors.push(settings.customSelector);var ignoreList=".fitvidsignore";settings.ignore&&(ignoreList=ignoreList+", "+settings.ignore);var $allVideos=$(this).find(selectors.join(","));$allVideos=$allVideos.not("object object"),$allVideos=$allVideos.not(ignoreList),$allVideos.each(function(){var $this=$(this);if(!($this.parents(ignoreList).length>0||"embed"===this.tagName.toLowerCase()&&$this.parent("object").length||$this.parent(".fluid-width-video-wrapper").length)){$this.css("height")||$this.css("width")||!isNaN($this.attr("height"))&&!isNaN($this.attr("width"))||($this.attr("height",9),$this.attr("width",16));var height="object"===this.tagName.toLowerCase()||$this.attr("height")&&!isNaN(parseInt($this.attr("height"),10))?parseInt($this.attr("height"),10):$this.height(),width=isNaN(parseInt($this.attr("width"),10))?$this.width():parseInt($this.attr("width"),10),aspectRatio=height/width;if(!$this.attr("id")){var videoID="fitvid"+Math.floor(999999*Math.random());$this.attr("id",videoID)}$this.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top",100*aspectRatio+"%"),$this.removeAttr("height").removeAttr("width")}})})}}(window.jQuery||window.Zepto),function($){var $w=$(window);$.fn.visible=function(partial,hidden,direction){if(!(this.length<1)){var $t=this.length>1?this.eq(0):this,t=$t.get(0),vpWidth=$w.width(),vpHeight=$w.height(),direction=direction?direction:"both",clientSize=hidden===!0?t.offsetWidth*t.offsetHeight:!0;if("function"==typeof t.getBoundingClientRect){var rec=t.getBoundingClientRect(),tViz=rec.top>=0&&rec.top<vpHeight,bViz=rec.bottom>0&&rec.bottom<=vpHeight,lViz=rec.left>=0&&rec.left<vpWidth,rViz=rec.right>0&&rec.right<=vpWidth,vVisible=partial?tViz||bViz:tViz&&bViz,hVisible=partial?lViz||lViz:lViz&&rViz;if("both"===direction)return clientSize&&vVisible&&hVisible;if("vertical"===direction)return clientSize&&vVisible;if("horizontal"===direction)return clientSize&&hVisible}else{var viewTop=$w.scrollTop(),viewBottom=viewTop+vpHeight,viewLeft=$w.scrollLeft(),viewRight=viewLeft+vpWidth,offset=$t.offset(),_top=offset.top,_bottom=_top+$t.height(),_left=offset.left,_right=_left+$t.width(),compareTop=partial===!0?_bottom:_top,compareBottom=partial===!0?_top:_bottom,compareLeft=partial===!0?_right:_left,compareRight=partial===!0?_left:_right;if("both"===direction)return!!clientSize&&viewBottom>=compareBottom&&compareTop>=viewTop&&viewRight>=compareRight&&compareLeft>=viewLeft;if("vertical"===direction)return!!clientSize&&viewBottom>=compareBottom&&compareTop>=viewTop;if("horizontal"===direction)return!!clientSize&&viewRight>=compareRight&&compareLeft>=viewLeft}}}}(jQuery),function(root,factory){"function"==typeof define&&define.amd?define("smoothScroll",factory(root)):"object"==typeof exports?module.exports=factory(root):root.smoothScroll=factory(root)}(window||this,function(root){"use strict";var settings,smoothScroll={},supports=!!document.querySelector&&!!root.addEventListener,defaults={speed:500,easing:"easeInOutCubic",offset:0,updateURL:!0,callbackBefore:function(){},callbackAfter:function(){}},forEach=function(collection,callback,scope){if("[object Object]"===Object.prototype.toString.call(collection))for(var prop in collection)Object.prototype.hasOwnProperty.call(collection,prop)&&callback.call(scope,collection[prop],prop,collection);else for(var i=0,len=collection.length;len>i;i++)callback.call(scope,collection[i],i,collection)},extend=function(defaults,options){var extended={};return forEach(defaults,function(value,prop){extended[prop]=defaults[prop]}),forEach(options,function(value,prop){extended[prop]=options[prop]}),extended},getClosest=function(elem,selector){for(var firstChar=selector.charAt(0);elem&&elem!==document;elem=elem.parentNode)if("."===firstChar){if(elem.classList.contains(selector.substr(1)))return elem}else if("#"===firstChar){if(elem.id===selector.substr(1))return elem}else if("["===firstChar&&elem.hasAttribute(selector.substr(1,selector.length-2)))return elem;return!1},escapeCharacters=function(id){for(var codeUnit,string=String(id),length=string.length,index=-1,result="",firstCodeUnit=string.charCodeAt(0);++index<length;){if(codeUnit=string.charCodeAt(index),0===codeUnit)throw new InvalidCharacterError("Invalid character: the input contains U+0000.");result+=codeUnit>=1&&31>=codeUnit||127==codeUnit||0===index&&codeUnit>=48&&57>=codeUnit||1===index&&codeUnit>=48&&57>=codeUnit&&45===firstCodeUnit?"\\"+codeUnit.toString(16)+" ":codeUnit>=128||45===codeUnit||95===codeUnit||codeUnit>=48&&57>=codeUnit||codeUnit>=65&&90>=codeUnit||codeUnit>=97&&122>=codeUnit?string.charAt(index):"\\"+string.charAt(index)}return result},easingPattern=function(type,time){var pattern;return"easeInQuad"===type&&(pattern=time*time),"easeOutQuad"===type&&(pattern=time*(2-time)),"easeInOutQuad"===type&&(pattern=.5>time?2*time*time:-1+(4-2*time)*time),"easeInCubic"===type&&(pattern=time*time*time),"easeOutCubic"===type&&(pattern=--time*time*time+1),"easeInOutCubic"===type&&(pattern=.5>time?4*time*time*time:(time-1)*(2*time-2)*(2*time-2)+1),"easeInQuart"===type&&(pattern=time*time*time*time),"easeOutQuart"===type&&(pattern=1- --time*time*time*time),"easeInOutQuart"===type&&(pattern=.5>time?8*time*time*time*time:1-8*--time*time*time*time),"easeInQuint"===type&&(pattern=time*time*time*time*time),"easeOutQuint"===type&&(pattern=1+--time*time*time*time*time),"easeInOutQuint"===type&&(pattern=.5>time?16*time*time*time*time*time:1+16*--time*time*time*time*time),pattern||time},getEndLocation=function(anchor,headerHeight,offset){var location=0;if(anchor.offsetParent)do location+=anchor.offsetTop,anchor=anchor.offsetParent;while(anchor);return location=location-headerHeight-offset,location>=0?location:0},getDocumentHeight=function(){return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight)},getDataOptions=function(options){return options&&"object"==typeof JSON&&"function"==typeof JSON.parse?JSON.parse(options):{}},updateUrl=function(anchor,url){history.pushState&&(url||"true"===url)&&history.pushState({pos:anchor.id},"",window.location.pathname+anchor)};smoothScroll.animateScroll=function(toggle,anchor,options){var settings=extend(settings||defaults,options||{}),overrides=getDataOptions(toggle?toggle.getAttribute("data-options"):null);settings=extend(settings,overrides),anchor="#"+escapeCharacters(anchor.substr(1));var animationInterval,percentage,position,fixedHeader=document.querySelector("[data-scroll-header]"),headerHeight=null===fixedHeader?0:fixedHeader.offsetHeight+fixedHeader.offsetTop,startLocation=root.pageYOffset,endLocation=getEndLocation(document.querySelector(anchor),headerHeight,parseInt(settings.offset,10)),distance=endLocation-startLocation,documentHeight=getDocumentHeight(),timeLapsed=0;updateUrl(anchor,settings.updateURL);var stopAnimateScroll=function(position,endLocation,animationInterval){var currentLocation=root.pageYOffset;(position==endLocation||currentLocation==endLocation||root.innerHeight+currentLocation>=documentHeight)&&(clearInterval(animationInterval),settings.callbackAfter(toggle,anchor))},loopAnimateScroll=function(){timeLapsed+=16,percentage=timeLapsed/parseInt(settings.speed,10),percentage=percentage>1?1:percentage,position=startLocation+distance*easingPattern(settings.easing,percentage),root.scrollTo(0,Math.floor(position)),stopAnimateScroll(position,endLocation,animationInterval)},startAnimateScroll=function(){settings.callbackBefore(toggle,anchor),animationInterval=setInterval(loopAnimateScroll,16)};0===root.pageYOffset&&root.scrollTo(0,0),startAnimateScroll()};var eventHandler=function(event){var toggle=getClosest(event.target,"[data-scroll]");toggle&&"a"===toggle.tagName.toLowerCase()&&(event.preventDefault(),smoothScroll.animateScroll(toggle,toggle.hash,settings,event))};return smoothScroll.destroy=function(){settings&&(document.removeEventListener("click",eventHandler,!1),settings=null)},smoothScroll.init=function(options){supports&&(smoothScroll.destroy(),settings=extend(defaults,options||{}),document.addEventListener("click",eventHandler,!1))},smoothScroll}),$(document).ready(function(){smoothScroll.init({speed:500,easing:"easeInOutCubic",updateURL:!1,offset:0})}),$(document).ready(function(){$("#js-menu-trigger,#js-menu-screen").on("click touchstart",function(e){$("#js-menu, #js-menu-screen").toggleClass("is-visible"),$("#js-menu-trigger").toggleClass("slide close"),e.preventDefault()})}),$(document).ready(function(){$("#main").fitVids()}),$("#markdown-toc").prepend("<li><h6>{{ site.data.messages.locales[site.locale].overview }}</h6></li>");