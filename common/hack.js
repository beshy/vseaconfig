// test local

// test remote
/*operate css class*/
function hasClass(obj, cls) {
	if(obj.className) {
		return obj.className.match(new RegExp('(\\b|^)' + cls + '(\\b|$)'));  
	}else {
		return false;
	}
}

function addClass(obj, cls) {  
	if (!hasClass(obj, cls)) {
		obj.className = (obj.className.trim()+" "+cls).trim();	
	}  
}

function removeClass(obj, cls) {  
	if (hasClass(obj, cls)) { 
		var reg = new RegExp('(\\b|^)' + cls + '(\\b|$)'); 
		obj.className = obj.className.replace(reg, ' ');  
	}  
}
(function(){

	var url = (window.__src_url) ? window.__src_url : window.location.href;
	
	var m=null;
	var fn = function(){return false};

	if ( null != (m=url.match(/.*?iqiyi.com.*/i)) || null != (m=url.match(/.*?pps.tv.*/i)) ) {
		
		
		fn = function () {
			var showPage = function() {
				for (var i = 0; i < hiddenList.length; i++) {
					var elem = document.getElementsByClassName(hiddenList[i])[0];
					if(elem){
						removeClass(elem, 'dn');
					}
				}
			};
			
			var popflow = document.getElementById('popflowContent');
			
			if(typeof(popflow) == "object"){
				//addClass(popflow, 'dn');
				//showPage();
			}
			
			/*if (a && a.click) {
				alert("iqiyi a click");
				a.click();
				return false;
			}*/
			
			return true;
		};
		
	} else if ( null != (m=url.match(/.*?letv.com.*/i)) ) {
		
		fn = function () {
			if (window.$) {

				// remove app only elemts
				$("dl[k-name]").remove();
				
				// remove popup
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
