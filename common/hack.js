//zxc

(function(){

	var url = (window.__src_url) ? window.__src_url : window.location.href;
	
	var m=null;
	var fn = function(){return false};

	if ( null != (m=url.match(/.*?iqiyi.com.*/i)) || null != (m=url.match(/.*?pps.tv.*/i)) ) {
		
		fn = function () {

			var a = document.getElementById('popflowclose');
			if (a && a.click) {
				a.click();
				return false;
			}
			
			return true;
		};
		
	} else if ( null != (m=url.match(/.*?letv.com.*/i)) ) {
		
		fn = function () {
			if (window.$) {
				var a=$("a[data-action='webWatch']");
				if (a && a.length && a[0].click) {
					a[0].click();
					return false;
				}
			}
			
			return true;
		};
	} else if( null != (m=url.match(/.*?youku.com.*/i))){
		
		fn = function () {

			if(document.getElementById("fClose")){
				promotionApp.hidePromotion();
				promotionApp.log('4009766');
			}
			if(document.getElementById("addDesktop_iphone").style.display != "none"){
				closeclick_phone();
			}
			
			return true;
		};
		
	}
	
	//figure
	
	var process = function () {
		var r = fn();
		if ( r ) {
			setTimeout(process, 200);
		}
	};

	process();
})();
