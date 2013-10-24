(function(){
	console.log('init check')
	var url = window.location.href;
	var body = document.documentElement.outerHTML;
	var m = null, m2 = null;
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
		return [PLAY_URL+encodeURIComponent(u)+ext, "<?php echo MERGE_URL;?>"+encodeURIComponent(u)+ext+'&mode=getMergeUrl&seek=OTT'];
	};

	var returnPageData = function (force) {
		if ( force || (data && data.img && data.m_url) ) {
			if ( !(data && data.m_url) ) {
				document.cookie = "pagedata=null;";
				return;
			}
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



	} else if ( null != (m=url.match(/tv.sohu.com/i)) && null != (m=body.match(/\s+vid\s*[\:\=]\s*\"(\d+)\"/i)) && null != (m2=body.match(/og\:url.*?content\=\"(.+?)\"/i)) ) {
		// sohu
		ext += '&iid='+m[1];
		src=getRevealUrl(m2[1]);
		if ( null != (img=body.match(/apple-touch-icon-precomposed.*?href=\"(.*?)\"/i)) && null != (title=body.match(/keywords.*?content=\"(.*?)\"/i)) ) {
			data.img = img[1];
			data.title = title[1];
		}
	} else if ( null != (m=url.match(/.*tudou.com.*/i)) && window.itemData ) {
		var _d = window.itemData;
		if (_d.vcode && _d.vcode!='') {
			ext += '&vcode='+_d.vcode;
		} else {
			ext += '&iid='+_d.iid;
		}
		src = getRevealUrl(url);
		data.img = _d.pic;
		data.title = _d.kw;

		var lastVid = false;
		var checkChange = function () {
			if (window.itemData) {
				var v = window.itemData;
				if (!lastVid) {
					lastVid = v.iid;
					return;
				}
				if (v.iid != lastVid) {
					console.log('tudou get new location');
					clearInterval(checkChangeI);
					if (v.acode && v.acode != '')
						window.location.href='http://www.tudou.com/albumplay/'+v.acode+'/'+v.icode+'.html';
					else
						window.location.href='http://www.tudou.com/programs/view/'+v.icode+'/';
				}
			}
		};
		var checkChangeI=setInterval(checkChange, 50);
		
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
		var totalTime = 0;
		var fixImg = function () {
			
			totalTime += fixClickTime;
			if (totalTime>6000) {
				return returnPageData(true);
			}
			var _a = document.getElementsByTagName('video');
			if (_a.length) {
				data.img = _a[0].getAttribute('poster');
				returnPageData(true);
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
	} else if ( null != (m=url.match(/.*m\.iqiyi\.com\/play.html.*?tvid\=([^\&]+).*?vid\=([^\&]+)/i)) ) {
		
		ext += '&iid='+m[1]+'_'+m[2];
		if (window.tvInfoJs) {
			data.img = window.tvInfoJs.vpic;
			data.title = window.tvInfoJs.vn;
			src = getRevealUrl(window.tvInfoJs.vu);
		} else {
			src = getRevealUrl(url);
		}

		var lastVid = false;
		var checkChange = function () {
			if (window.tvInfoJs) {
				var v = window.tvInfoJs;
				if (!lastVid) {
					lastVid = v.vid;
					return;
				}
				if (v.vid != lastVid) {
					console.log('iqiyi get new location')
					clearInterval(checkChangeI);
					window.location.href='http://m.iqiyi.com/play.html?tvid='+v.tvid+'&vid='+v.vid;
				}
			}
		};
		var checkChangeI=setInterval(checkChange, 50);


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

	} else if ( null != (m=url.match(/.*m.(ku6.com.*)/i)) ) {
		src = getRevealUrl('http://v.'+m[1]);
		if ( null != (img=body.match(/vid,\s*\'(.*?)\'/i)) && null != (title=body.match(/<title>(.*?)<\/title>/i)) ) {
			data.img = img[1];
			data.title = title[1];
		}
	} else if ( null != (m=url.match(/.*v\.ifeng\.com.*/i)) && null != (m=url.match(/.*?[\/\#]([\w\d]+\-[\w\d]+\-[\w\d]+\-[\w\d]+\-[\w\d]+).*/i)) ) {
		ext += '&iid='+m[1];
		src = getRevealUrl(url);
		if ( null != (img=body.match(/image\"\s*content\=\"(.*?)\"/i)) && null != (title=body.match(/title\"\s*content\=\"(.*?)\"/i)) ) {
			data.img = img[1];
			data.title = title[1];
		}
	}


	if ( null != src && '' != src ) {
		var appendBtn = function () {
			data.m_url = src[0]+'&quality=0';

			var mu = [src[1]+'&quality=0', src[1]+'&quality=1', src[1]+'&quality=2'];
			data.ottsd_url= mu[1];
			data.otthd_url= mu[2];
			returnPageData();
		};

		appendBtn();
	} else {
		data = null;
		returnPageData(true);
	}


	returnPageData();
})();
