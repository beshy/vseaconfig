;
;(function(){

	// Android defined sendOTTData Object
	if (window.sendOTTData) {
		return;
	}


	// iOS only
	window.OTT_JSON_DATA = '';
	window.sendOTTData = {
		isios: true,
		send: function (s) {
			window.OTT_JSON_DATA = s;
			var f = document.createElement('iframe');
			f.style.display = 'none';
			document.documentElement.appendChild(f);
			f.src = "cmd://SEND_OTT_DATA";
		}
	};

})();



window._vseatab = (function(){

	var tab = {
		add: function (p) {
			//var p = ['HLS','OTT-TV'];
			var pstr = '';
			for(var i=0; i<p.length; i++) {
				pstr += '<div><a id="vseatab'+i+'" href="">'+p[i]+'</a></div>';
			}
			var str = '<div id="vseatabbg" class="vseatabbg" onClick="_vseatab.close();"></div><div id="vseatab" class="vseatab">'+pstr+'<div><a href="javascript:void();" onClick="_vseatab.close();">关闭</a></div></div>';
				str = str+'<style type="text/css">';
				str = str+'.vseatabbg{display:none; width:100%; height:100%; background:#000; position:fixed; left:0; top:0px; z-index:999;filter:Alpha(Opacity=30);opacity:0.3; }';
				str = str+'.vseatab{width:100%; height:230px; display:none;position:fixed; left:0; bottom:0px; z-index:9999;}';
				str = str+'.vseatab div{ width:60%; margin:0 auto; text-align:center; margin-top:10px; line-height:40px;}';
				str = str+'.vseatab div a{background: none repeat scroll 0 0 #EEEEEE;background: none repeat scroll 0 0 #EEEEEE; border: 1px solid #DDDDDD; border-radius: 3px;box-shadow: 0 1px 0 rgba(255, 255, 255, 0.5) inset; color: #AAAAAA;display: block;font-weight: 700;margin:0 4px;overflow: hidden;text-overflow: ellipsis;text-shadow: 0 1px 0 #FFFFFF;white-space: nowrap;text-align:center;}';
				str = str+'.vseatab div a:hover{background: none repeat scroll 0 0 #C21408;border: 1px solid #9E1007;color:#FFF;}';
				str = str+'</style>';

			var btnDiv = document.createElement("div");
			btnDiv.innerHTML = str;
			document.body.appendChild(btnDiv);
		},

		update: function (urls) {
			for(var i=0; i<urls.length; i++) {
				var a = document.getElementById('vseatab'+i);
				if (a) {
					a.setAttribute('href', urls[i]);
				}
			}
		},

		show: function(){
			var a = document.getElementById('vseatab');
			if (a) {
				a.style.display="block";
			}

			a = document.getElementById('vseatabbg');
			if (a) {
				a.style.display="block";
			}
		},

		close: function () {
			var a = document.getElementById('vseatab');
			if (a) {
				a.style.display="none";
			}

			a = document.getElementById('vseatabbg');
			if (a) {
				a.style.display="none";
			}
		}
	};




	return tab;
})();




window._checkPageData = (function(){




	var checkPageData = function(){
		var _ = this;
		_.url = (window.__src_url) ? window.__src_url : window.location.href;
		_.body = (window.__src_code) ? window.__src_code : document.documentElement.outerHTML;
		_.data = {
			u: false,
			ext: ''
		};
	};


	checkPageData.prototype = {
		url: null,
		body: null,
		data: null,

		parseCompleted: 0,
		returnDone: false,


		parseMethods: [

			// youku
			function () {
				var m = null, _ = this;
				if ( null === (m=_.url.match(/^http\:\/\/v\.youku\.com\/v_show\/id_([^\&\/\.]*).*$/i)) ) {
					return false;
				}
				var vid=m[1];
				_.data.u = "http://v.youku.com/v_show/id_"+vid+".html";

				return true;
			},

			// ---------------



			// default
			function () {

			}
		],


		returnData: function(fn, ctx) {
			var _ = this;

			if (_.returnDone) {
				return;
			}


			if ( _.parseCompleted>0 ) {
				setTimeout(function(){
					_.returnData(fn, ctx);
				}, 300);
			}

			_.returnDone = true;
			fn.call(ctx, _.data);
		},

		getData: function (fn, ctx) {
			var _ = this;

			for (var i = 0; i < _.parseMethods.length; i++) {
				var parseFn = _.parseMethods[i];
				if ( parseFn.call(_) === true ) {
					break;
				}
			};

			_.returnData(fn, ctx);
		}
	};


	return checkPageData;

})();


(function(){
	var o = new _checkPageData();

	var filterData = function (data) {
		if ( !data.u ) {
			return;
		}
		//data.hls_url = "<?php echo HLS_URL;?>" + encodeURIComponent(data.u) + data.ext;
		data.hls_url = <?php echo HLS_URL;?>;
		//data.ott_url = data.u;
		data.ott_url = <?php echo OTT_URL;?>;

	};

	var sendData = function (data) {
		if ( !data.u ) {
			data = null;
		}
		var s = JSON.stringify(data);
		console.log('get page data: '+s);
		if (window.sendOTTData) {
			if (window.sendOTTData.send) {
				console.log('call sendOTTData.send');
				window.sendOTTData.send(s);
			} else {
				var ss = JSON.stringify(window.sendOTTData);
				console.log('sendOTTData missing method send.'+ss);
			}
		} else {
			console.log('no sendOTTData object.');
		}
	};





	var showtab = function (data) {
		if ( !data.hls_url || false === window.showtab ) {
			return;
		}
		var appendBtn = function () {
			var tab = window._vseatab
			tab.add(['HLS','OTT-TV']);
			tab.update([data.hls_url, data.ott_url]);
			tab.show();
		};

		// if (!window.stbid) {
		// 	setTimeout(appendBtn, 1000);
		// } else {
			appendBtn();
		//}
	};


	o.getData(function(data){
		//
		window._VSEA_DATA_=data;

		filterData(data);
		sendData(data);
		showtab(data);

	});


})();




