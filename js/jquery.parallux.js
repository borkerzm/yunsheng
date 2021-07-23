/*!
* Responsive jQuery Parallax plugin
* Original author: @tomsarduy
* Licensed under the MIT license
*/;(function($,window,document,undefined){'use strict';var pluginName="parallux",$window=$(window),interval,bgset=false,animate3d=false,is_mobile=false,defaults={fullHeight:true,onMobile:'fixed',onImageLoad:'fadeIn'};window.mobilecheck=function(){var check=false;(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check=true})(navigator.userAgent||navigator.vendor||window.opera);return check;};function animationFramePolyfill(){var lastTime=0;var vendors=['ms','moz','webkit','o'];for(var x=0;x<vendors.length&&!window.requestAnimationFrame;++x){window.requestAnimationFrame=window[vendors[x]+'RequestAnimationFrame'];window.cancelAnimationFrame=window[vendors[x]+'CancelAnimationFrame']||window[vendors[x]+'CancelRequestAnimationFrame'];}
if(!window.requestAnimationFrame){window.requestAnimationFrame=function(callback){var currTime=new Date().getTime();var timeToCall=Math.max(0,16-(currTime-lastTime));var id=window.setTimeout(function(){callback(currTime+timeToCall);},timeToCall);lastTime=currTime+timeToCall;return id;};}
if(!window.cancelAnimationFrame){window.cancelAnimationFrame=function(id){clearTimeout(id);};}}
animationFramePolyfill();function support3d(){if(typeof Modernizr==='object'&&Modernizr.csstransforms3d){return true;}
if(!window.getComputedStyle){return false;}
var el=document.createElement('p'),has3d,transforms={'webkitTransform':'-webkit-transform','OTransform':'-o-transform','msTransform':'-ms-transform','MozTransform':'-moz-transform','transform':'transform'};document.body.insertBefore(el,null);for(var t in transforms){if(el.style[t]!==undefined){el.style[t]="translate3d(1px,1px,1px)";has3d=window.getComputedStyle(el).getPropertyValue(transforms[t]);}}
document.body.removeChild(el);return(has3d!==undefined&&has3d.length>0&&has3d!=="none");}
animate3d=support3d();function detectIE(){var ua=window.navigator.userAgent;var msie=ua.indexOf('MSIE ');if(msie>0){return parseInt(ua.substring(msie+5,ua.indexOf('.',msie)),10);}
var trident=ua.indexOf('Trident/');if(trident>0){var rv=ua.indexOf('rv:');return parseInt(ua.substring(rv+3,ua.indexOf('.',rv)),10);}
var edge=ua.indexOf('Edge/');if(edge>0){return parseInt(ua.substring(edge+5,ua.indexOf('.',edge)),10);}
return false;}
function Plugin(element,options){this.element=element;bgset=false;this.options=$.extend({},defaults,options);this._defaults=defaults;this._name=pluginName;this.init(element);}
Plugin.prototype={init:function(element){if(this.options.fullHeight===false){$(element).addClass('not-full');}
is_mobile=window.mobilecheck();this.updateHeight();var self=this,$cover=$(element).find("img.cover, video.cover");self.simulateCover();$cover.one("load",function(){self.simulateCover();$(this).fadeIn();});if($cover.complete){$cover.load();}
$window.bind('orientationchange, resize',function(){if(!is_mobile){self.updateHeight();self.simulateCover();$(this).trigger('scroll');}});var is_safari=/^((?!chrome|android).)*safari/i.test(navigator.userAgent);var is_ipad=navigator.userAgent.match(/iPad/i)!=null;if(!is_mobile&&!is_safari){$(element).addClass('bg-fixed');}
if(is_mobile||is_ipad){$(element).css('overflow','hidden');if(this.options.onMobile==='fixed'){$window.scroll(function(){self.updateIndex();});$window.scroll();}
else if(this.options.onMobile==='parallax'&&animate3d){var mobileRender=self.render.bind(self);interval=setInterval(function(){window.requestAnimationFrame(mobileRender);},10);}
else{$(element).find('.parallux-bg').css('position','absolute');}}
else{if(animate3d){$window.scroll(function(){self.render();});if(detectIE()){if(detectIE()>=11){$('body').on("mousewheel",function(){event.preventDefault();var wheelDelta=event.wheelDelta;var currentScrollPosition=window.pageYOffset;window.scrollTo(0,currentScrollPosition-wheelDelta/4);});$window.scroll();}
else{$(window).off('scroll');this.disableParallax();}}
else{$window.scroll();}}
else{this.disableParallax();}}},disableParallax:function(){$(this.element).removeClass('bg-fixed').addClass('no-parallax');},mobileHandler:function(){},updateIndex:function(){var $front=$(this.element);var $offsetTop=$front.offset().top;var $winST=$window.scrollTop();if(($winST+$window.height()>=$offsetTop)&&$winST<=$offsetTop+$front.height()){$front.css('z-index',5);}
else{$front.css('z-index',1);}},simulateCover:function(){var $winH=$window.height(),$winW=$window.width(),$img=$(this.element).find('img.cover, video.cover');$img.css({'width':'auto','height':'100%',});if($img.width()<$winW){$img.css({'width':'100%','max-height':'initial','height':'auto'});}
$img.css({'width':'100%','height':'auto',});if($img.height()<$winH){$img.css({'height':$winH+'px','max-width':'initial','width':'auto'});}
var diffX=-($img.width()-$winW)/2;var diffY=-($img.height()-$winH)/2;$img.css('transform','translate('+diffX+'px,'+diffY+'px)');},updateHeight:function(){var $el=$(this.element),$inner=$el.find('.parallux-inner'),$rand=1+Math.floor(Math.random()*3);if(this.options.fullHeight){var extra=0;if(is_mobile||Modernizr.mq('only screen and (max-width: 1024px)')){extra=70;}
$el.height($window.height()+extra);$el.find('.parallux-bg').height($window.height()+extra);}
else{$el.find('.parallux-bg').height($el.height());}
if(!bgset){if($inner.hasClass('dark')){$inner.addClass('dark-'+$rand);}
if($inner.hasClass('light')){$inner.addClass('light-'+$rand);}
bgset=true;}},render:function(){var $front=$(this.element);var $back=$front.find('.parallux-bg');var $backinner=$back.find('.parallux-inner');var $offsetTop=$front.offset().top;var $scrollY=window.scrollY||window.pageYOffset||0;var $winST=$window.scrollTop();if(($winST+$window.height()>=$offsetTop)&&$winST<=$offsetTop+$front.height()){var $diffElem=(($scrollY-$offsetTop)/1.3).toFixed(0)+'px';$back.css('transform','translate3d(0,'+($offsetTop-$scrollY)+'px,0)');$backinner.css('transform','translate3d(0,'+($diffElem)+',0)');}
else{$back.css('transform','translate3d(0,100%,0)');}}};$.fn[pluginName]=function(options){return this.each(function(){if(!$.data(this,"plugin_"+pluginName)){$.data(this,"plugin_"+pluginName,new Plugin(this,options));}});};})(jQuery,window,document);