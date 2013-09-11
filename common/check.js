(function(){
	var url = window.location.href;
	var body = document.documentElement.outerHTML;
	var m = null;
	var src = null;

	var data = {
		img: null,
		title: null,
		m_url: null
	};
	// &seek=OTT
	var ext = '&playmode=play';


	var getRevealUrl = function (u) {
		return "<?php echo PLAY_URL;?>"+encodeURIComponent(u)+ext;
	};

	var getMergeUrl = function (u, stbid) {
		return '<?php echo OTT_API;?>?'+stbid+'&playurl='+encodeURIComponent(u+'&mode=getMergeUrl&seek=OTT');
	};

	var returnPageData = function (force) {
		if ( force || (data.img && data.m_url) ) {
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
	}


	if ( null != src ) {
		var appendBtn = function () {
			var btnCode = '';
			var btnDiv = document.createElement("div");

			btnCode +=   '<span style="display:block; position:absolute; top:0; left:50%; margin-left:-60px; border:2px solid #666;  background:#fff; z-index:999999;opacity: 0.9;filter:alpha(opacity=9);">'
					+ '<a href="'+src+'&quality=0" target="_blank" style="color:#000;display:block;line-height:200%;">HLS PLAY NORMAL</a>';
			data.m_url = src+'&quality=0';

			if (window.stbid) {
				var mu = [getMergeUrl(src+'&quality=0', window.stbid), getMergeUrl(src+'&quality=1', window.stbid), getMergeUrl(src+'&quality=2', window.stbid)];

				data.ottsd_url= mu[0];
				data.otthd_url= mu[1];
				data.ottsp_url= mu[2];

				btnCode += '<a href="'+mu[0]+'" target="_blank" style="color:#000;display:block;line-height:200%;">OTT PLAY NORMAL</a>'
					+ '<a href="'+mu[1]+'&quality=1" target="_blank" style="color:#000;display:block;line-height:200%;">OTT PLAY HIGH</a>'
					+ '<a href="'+mu[2]+'&quality=2" target="_blank" style="color:#000;display:block;line-height:200%;">OTT PLAY SUPER</a>';

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
