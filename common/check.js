(function(){
	var url = window.location.href;
	var body = document.documentElement.outerHTML;
	var m = null;
	var src = null;

	var img, title;

	var data = {
		img: null,
		title: null,
		m_url: null
	};
	// &seek=OTT
	var ext = '&playmode=play';


	var getRevealUrl = function (u) {
		return ["<?php echo PLAY_URL;?>"+encodeURIComponent(u)+ext, "<?php echo MERGE_URL;?>"+encodeURIComponent(u)+ext];
	};

	var getOTTUrl = function (u) {
		return '<?php echo OTT_API;?>?'+stbid+'&playurl='+encodeURIComponent(u);
	};

	var returnPageData = function (force) {
		if ( force || (data && data.img && data.m_url) ) {
			var s = JSON.stringify(data);
			document.cookie = "pagedata="+escape(s)+';';
		}
	};


	// http://v.youku.com/v_show/id_XNTkyNjY1NjQ0.html?f=19532522&ev=1
	if ( null != (m=url.match(/^http\:\/\/v\.youku\.com\/v_show\/id_([^\&\/\.]*).*$/i)) ) {
		// youku
		var vid=m[1];
		src=getRevealUrl("http://v.youku.com/v_show/id_"+vid+".html");


		window.__check_getYoukuData = function (d) {
			if (d && d.data && d.data[0]) {
				data.img = d.data[0].logo;
				data.title = d.data[0].title;
			}
			returnPageData();
		};

		var e=document.createElement('script'); 
		e.setAttribute('src', 'http://v.youku.com/player/getPlaylist/VideoIDS/'+vid+'/Pf/4?__callback=__check_getYoukuData'); 
		document.head.appendChild(e);



	} else if ( null != (m=url.match(/tv.sohu.com/i)) && null != (m=body.match(/\s+vid\s*[\:\=]\s*\"\d+\"/i)) ) {
		// sohu
		src=getRevealUrl(url);
		if ( null != (img=body.match(/apple-touch-icon-precomposed.*?href=\"(.*?)\"/i)) && null != (title=body.match(/keywords.*?content=\"(.*?)\"/i)) ) {
			data.img = img[1];
			data.title = title[1];
		}
	} else if ( null != (m=url.match(/.*tudou.com.*/i)) && ( 
		null != (m=body.match(/(vcode)\s*[\:\=]\s*[\"\']([^\"\']+)[\"\']/i)) ||
		null != (m=body.match(/(iid|defaultIid)\s*[\:\=]\s*(\d+)/i))
		) ) {
		ext += '&'+m[1]+'='+m[2];
		src = getRevealUrl(url);
		if ( null != (img=body.match(/\,\s*pic\s*\:\s*[\"\'](.*?)[\"\']/i)) && null != (title=body.match(/\,\s*kw\s*\:\s*[\"\'](.*?)[\"\']/i)) ) {
			data.img = img[1];
			data.title = title[1];
		}

		var fixClickTime = 1000;
		var fixClick = function () {
			var _a = document.getElementsByTagName('a');
			for (var i = 0; i < _a.length; i++) {
				(function (o) {
					o.onclick = function () {
						window.location.href=o.getAttribute('href');
					};
				})(_a[i]);
			}
			
			setTimeout(arguments.callee, fixClickTime);
		};
		
		fixClick();
	} else if ( null != (m=url.match(/.*letv.com.*/i)) && (
		null != (m=url.match(/m\.letv\.com\/vplay\_(.*?)\.html.*/i)) ||
		null != (m=url.match(/www\.letv\.com\/ptv\/vplay\/(.*?)\.html.*/i))
		) ) {
		var leurl = 'http://www.letv.com/ptv/vplay/'+m[1]+'.html';
		src = getRevealUrl(leurl);
		if ( null != (title=body.match(/title\s*:\s*[\"\'](.*?)[\"\']/i)) ) {
			//data.img = img[1];
			data.title = title[1];
		}

		var fixClickTime = 500;
		var fixImg = function () {
			var _a = document.getElementsByTagName('video');
			if (_a.length) {
				data.img = _a[0].getAttribute('poster');
				returnPageData();
				return;
			};
			setTimeout(arguments.callee, fixClickTime);
		};
		
		fixImg();

	} else if ( null != (m=url.match(/.*sina.cn.*/i)) && null != (m=body.match(/location\.php\?.*?url\=([^\&\'\"]+)/i)) ) {
		var u = decodeURIComponent(m[1]);
		src = getRevealUrl(u);
		if ( null != (img=body.match(/poster=\"(.*?)\"/i)) && null != (title=body.match(/<h2>(.*?)<\/h2>/i)) ) {
			data.img = img[1];
			data.title = title[1];
		}
	} else if ( null != (m=url.match(/.*56.com.*/i)) && null != (m=body.match(/src\=\"http\:\/\/vxml.56.com\/html5\/(\d+)\//i)) ) {
		ext += '&iid='+m[1];
		src = getRevealUrl(url);
		if ( null != (img=body.match(/url\((.*?)\)/i)) && null != (title=body.match(/keywords.*?content=\"(.*?)\"/i)) ) {
			data.img = img[1];
			data.title = title[1];
		}
	} else if ( null != (m=url.match(/.*m\.iqiyi\.com\/play.html.*?vid\=([^\&])/i)) ) {
		
		if (window.tvInfoJs) {
			data.img = window.tvInfoJs.vpic;
			data.title = window.tvInfoJs.vn;
			src = getRevealUrl(window.tvInfoJs.vu);
			var fixClickTime = 1000;
			var fixClick = function () {
				var _a = document.getElementsByTagName('a');
				for (var i = 0; i < _a.length; i++) {
					if (_a[i].getAttribute('data-delegate') == 'play') {
						_a[i].setAttribute('data-delegate', 'go');
					}
				}
				
				setTimeout(arguments.callee, fixClickTime);
			};
			
			fixClick();
		} else {
			src = getRevealUrl(url);
			ext += '&iid='+m[1];
		}
	} else if ( null != (m=url.match(/.*m.(ku6.com.*)/i)) ) {
		src = getRevealUrl('http://v.'+m[1]);
		if ( null != (img=body.match(/vid,\s*\'(.*?)\'/i)) && null != (title=body.match(/<title>(.*?)<\/title>/i)) ) {
			data.img = img[1];
			data.title = title[1];
		}
	}


	if ( null != src && '' != src ) {
		var appendBtn = function () {
			var btnCode = '';
			var btnDiv = document.createElement("div");

			btnCode +=   '<span style="display:block; position:absolute; top:0; left:50%; margin-left:-60px; border:2px solid #666;  background:#fff; z-index:999999;opacity: 0.9;filter:alpha(opacity=9);">'
					+ '<a href="'+src[0]+'&quality=0" target="_blank" style="color:#000;display:block;line-height:200%;">HLS PLAY NORMAL</a>';
			data.m_url = src[0]+'&quality=0';

			if (window.stbid) {
				var mu = [getOTTUrl(src[1]+'&quality=0', window.stbid), getOTTUrl(src[1]+'&quality=1', window.stbid), getOTTUrl(src[1]+'&quality=2', window.stbid)];

				data.ottsd_url= mu[1];
				data.otthd_url= mu[2];
				//data.ottsp_url= mu[2];

				btnCode += '<a href="'+mu[1]+'" target="_blank" style="color:#000;display:block;line-height:200%;">OTT PLAY NORMAL</a>'
					+ '<a href="'+mu[2]+'&quality=1" target="_blank" style="color:#000;display:block;line-height:200%;">OTT PLAY HIGH</a>';

			} else {
				btnCode += '<a href="api://getStbid:'+url+'" target="_blank" style="color:#000;display:block;line-height:200%;">Scan OTT code</a>';
			}

			btnCode += '</span>';
			btnDiv.innerHTML = btnCode;
			document.body.appendChild(btnDiv);
			returnPageData();
		};

		if (!window.stbid) {
			setTimeout(appendBtn, 1000);
		} else {
			appendBtn();
		}
	} else {
		data = null;
		returnPageData(true);
	}


	returnPageData();
})();
