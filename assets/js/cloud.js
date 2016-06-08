function pointIcon(o,e,t){return L.divIcon({className:"custom-map-marker "+t,html:'<svg class="iconic" style="fill:#'+o.properties.color+';"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/assets/img/iconic-sprite.svg#map-marker"></use></svg><span class="iconic-bg" style="background-color:#'+o.properties.color+';""></span>',iconSize:e,iconAnchor:e,popupAnchor:[-16,-32]})}function onEachFeature(o,e){e.bindPopup(popup).on("click",function(){e.setIcon(pointIcon(o,[40,40],"selected")),map.on("popupclose",function(){e.setIcon(pointIcon(o,[32,32]))})})}var popupHTML=function(){var o=null;return $.ajax({async:!1,dataType:"html",url:"/assets/html/partials/_postcard.html",success:function(e){o=e}}),o}();if($("#map").length){var map=L.map("map",{scrollWheelZoom:!1});L.tileLayer("http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",{maxZoom:19,attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(map);var popup=L.popup({minWidth:"300",maxWidth:"300",className:"pl-popup",offset:L.Point(0,0)}).setContent(popupHTML),deploymentGeoJSON=[{type:"Feature",geometry:{type:"Point",coordinates:[-97.763559,30.253552]},properties:{color:"A51A1A"}},{type:"Feature",geometry:{type:"Point",coordinates:[-97.674815,30.316855]},properties:{color:"A51A1A"}},{type:"Feature",geometry:{type:"Point",coordinates:[-97.69382,30.301458]},properties:{color:"2274B4"}},{type:"Feature",geometry:{type:"Point",coordinates:[-97.740388,30.266052]},properties:{color:"E69327"}},{type:"Feature",geometry:{type:"Point",coordinates:[-97.7471837,30.3016706]},properties:{color:"5BAA00"}}],markers=new L.geoJson(deploymentGeoJSON,{pointToLayer:function(o,e){return L.marker(e,{icon:pointIcon(o,[32,32])})},onEachFeature:onEachFeature}).addTo(map);map.zoomControl.setPosition("bottomright"),map.fitBounds(markers.getBounds(),[24,24]),map.on("popupopen",function(o){toggleInit($(o.popup._contentNode.firstChild).find("[data-toggle]"))})}
var tiersInit=function(e,t){var i="undefined"!=typeof e?e:$(".tiers"),s="undefined"!=typeof t?t:i.find(".tier.selected"),n=i.siblings(".tier.lite"),a=i.find(".payment"),d=$("#selected-tier");i.hasClass("show-payment")?($(document).trigger("tiers:deselect",{selected:null}),a.fadeOut(500),i.find(".tier").removeClass("selected"),i.removeClass("show-payment"),d.val(""),setTimeout(function(){n.slideDown(500).animate({opacity:1},500)},500)):($(document).trigger("tiers:select",{selected:$(s).attr("id")}),a.fadeIn(500),s.addClass("selected"),i.addClass("show-payment"),d.val($(s).attr("id")),setTimeout(function(){n.animate({opacity:0},500).slideUp(500)},500)),i.parent().animate({scrollTop:0},500)};$(document).ready(function(){$("[data-payment]").on("click",function(e){tiersInit($(this).closest(".tiers"),$(this).closest(".tier")),e.preventDefault()})});
var tourPin=function(t,o,e,n){var s=$(e).offset(),i=$(e).outerWidth(),a=$(e).outerHeight();$("#"+t).removeClass("active"),$("#"+t).hasClass("tour-modal")?$(".tour-pin").removeClass(function(t,o){return(o.match(/(^|\s)pin-\S+/g)||[]).join(" ")}).addClass("pin-enter"):!$("#"+t).hasClass("tour-modal")&&$("#"+o).hasClass("tour-modal")?$(".tour-pin").removeClass(function(t,o){return(o.match(/(^|\s)pin-\S+/g)||[]).join(" ")}).css("top","-100%"):$(".tour-pin").removeClass("pin-enter").toggleClass("pin-move"),"undefined"!=typeof e?("undefined"==typeof n?$(".tour-pin").css({top:"-100%",left:"50%"}):"top-left"===n?$(".tour-pin").css({top:s.top-10,left:s.left-10}):"top-right"===n?$(".tour-pin").css({top:s.top,left:s.left+i-10}):"bottom-left"===n?$(".tour-pin").css({top:s.top+a-10,left:s.left}):"bottom-right"===n?$(".tour-pin").css({top:s.top+a-10,left:s.left+i-10}):"center"===n?$(".tour-pin").css({top:s.top+a/2-10,left:s.left+i/2-10}):"top-center"===n?$(".tour-pin").css({top:s.top,left:s.left+i/2-10}):"bottom-center"===n&&$(".tour-pin").css({top:s.top+a-10,left:s.left+i/2-10}),$("#"+o).addClass("active").css({top:s.top+a+40}),$(window).width()>767&&$("#"+o).css(s.left+i/2>$(window).width()/2?{left:"65%"}:s.left+i/2<$(window).width()/2?{left:"35%"}:{left:"50%"}),s.top+a>$(window).height()/1.5&&$("html, body").animate({scrollTop:s.top-70},1e3)):($("html, body").animate({scrollTop:0},1e3),$("#"+o).addClass("active"))},tourStep=function(t,o){var e="undefined"!=typeof t?!1:!0,n=$("body").attr("data-step"),s="undefined"!=typeof t?t:"start";$("body").attr("data-step",s),$("#"+s).hasClass("tour-modal")?($(".tour-mask").fadeIn(1e3),tourPin(n,s)):($(".tour-mask").fadeOut(500),tourPin(n,s,'[data-message="'+s+'"]',"bottom-center")),0!=e||o||(history.pushState?history.pushState(null,null,"#"+s):window.location.hash=s)},tourStepLookup=function(t){return window.location.hash?window.location.hash.substr(1):"undefined"!=typeof t?t:void 0},tourInit=function(t){$("*").not("[data-cue], [data-payment], .tour-link").on("click",function(t){t.preventDefault()}).off("click"),$("[data-cue]").on("click",function(){tourStep($(this).attr("data-cue"))}),setTimeout(function(){tourStep(tourStepLookup(t),!0)},500),window.onpopstate=function(){tourStep(tourStepLookup())}};