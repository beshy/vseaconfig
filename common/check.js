
;(function(){
	if (window.sendOTTData) {
		return;
	}

	window.OTT_JSON_DATA = '';
	window.sendOTTData = {};
	window.sendOTTData.send = function (s) {
		window.OTT_JSON_DATA = s;
		var f = document.createElement('iframe');
		f.style.display = 'none';
		document.documentElement.appendChild(f);
		f.src = "cmd://SEND_OTT_DATA";
	};

})();

(function(){
	console.log('init check')
	var url = (window.__src_url) ? window.__src_url : window.location.href;
	var body = (window.__src_code) ? window.__src_code : document.documentElement.outerHTML;
	var m = null, m2 = null, isTimeout = false;
	var src = null;
	var title;

	var data = {
		valid: true,
		title: document.getElementsByTagName('title') ? document.getElementsByTagName('title')[0].innerHTML : 'vod' ,
		cache: url,
		param: ''
	};
	// &seek=OTT
	var ext = '';

	var getParam = function(u) {
		return '?u='+encodeURIComponent(u)+ext;
	};

	var getAdNum = function (adp) {
		if ('' == data.param) {
			return ;
		}
		adp = adp || '';
		data.param += '&adp='+adp
	};

	var setUrls = function (url) {
		data.param = getParam(url);
		checkSrcAvaliable();
	};

	var checkSrcAvaliable = function () {
		var url = MERGE_API+data.param+'&mode=checkOrigSrcs&quality=2&rtype=json&callback=__checkSrcAvaliable';
		insertScript(url, true);
	};

	window.__checkSrcAvaliable = function (d) {
		if (d && d.success && d.success == true) {
			data.valid = true;
			//data.cache = url+'false';
		} else {
			data.valid = false;
			data.cache = url+'false';
		}
		parseDone();
	};

	var returnPageDataDone = false;
	var returnPageData = function () {
		if (returnPageDataDone) {
			return;
		}

		if ( parseComplete>0 ) {
			return setTimeout(returnPageData, 300);
		}

		returnPageDataDone = true;
		if ( data && data.title && data.param ) { // data.m_url
			data.title = escape(data.title);
		} else {
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

	var insertScript = function (url, ito, to) {
		if (undefined === ito) {
			ito = isTimeout;
		}
		console.log('insertScript: '+url);
		to = to || 5000;
		var e=document.createElement('script'); 
		e.setAttribute('src', url);
		document.head.appendChild(e);
		parseStart();
		if (ito) {
			// to cache
			
			setTimeout(function(){
				//alert('expire: '+to+' '+url);
				//data.cache = 'null';
				parseDone();
			}, to);
		}
	};

	var JSONparse = function (s) {
		var d;
		try {
			d=JSON.parse(s);
		} catch(e) {

		}
		return d;
	};

	function rnd(start, end){
	    return Math.floor(Math.random() * (end - start) + start);
	}




	var parseComplete = 0;
	var parseStart = function () {
		parseComplete++;
		console.log('parseStart');
	};
	var parseDone = function () {
		parseComplete--;
		console.log('parseDone');
		returnPageData();
	};


	// http://v.youku.com/v_show/id_XNTkyNjY1NjQ0.html?f=19532522&ev=1
	if ( null != (m=url.match(/^http\:\/\/v\.youku\.com\/v_show\/id_([^\&\#\/\.]*).*$/i)) ) {
		// youku
		var vid=m[1];

		var youkuUrl = "http://v.youku.com/v_show/id_"+vid+".html"
		setUrls(youkuUrl);

		if (window.videoId) {
			var showId = window.showId ? window.showId : '0';
			var videoId = window.videoId ? window.videoId : '0';
			var videoOwnerID = window.videoOwnerID ? window.videoOwnerID : '';
			getAdNum(showId+'_'+videoId+'_'+videoOwnerID);
		}

		if (window.videoTitle) {
			data.title = window.videoTitle;
		}

		setInterval(function(){
			if (jQuery) {
				jQuery('#wintipsAppLimit').hide();
				jQuery('.yk-mask').hide();
			}
		}, 100);


	} else if ( null != (m=url.match(/tv.sohu.com/i)) && null != (m=body.match(/\s+vid\s*[\:\=]\s*\"(\d+)\"/i)) && null != (m2=body.match(/og\:url.*?content\=\"(.+?)\"/i)) ) {
		// sohu
		//ext += '&iid='+m[1];
		setUrls(m2[1]);

		if ( null != (title=body.match(/keywords.*?content=\"(.*?)\"/i)) ) {
			data.title = title[1];
		}

		if (window.VideoData && window.VideoData.vid && window.VideoData.tvid && window.VideoData.sid) {			
			getAdNum(VideoData.sid+'_'+VideoData.vid+'_'+VideoData.tvid+'_'+VideoData.duration);
		}

		var lastVid = false;
		var checkChange = function () {
			if (window.VideoData) {
				var v = window.VideoData;
				if (!lastVid) {
					lastVid = v.vid;
					return;
				}
				if (v.vid != lastVid) {
					console.log('get new location');
					clearInterval(checkChangeI);
					window.location.href = "http://m.tv.sohu.com/v"+v.vid+".shtml";
				}
			}
		};
		var checkChangeI=setInterval(checkChange, 50);
		
	} else if ( null != (m=url.match(/tv.sohu.com\/hots/i)) && null != (m=body.match(/v_content[^<>]*?>\s*(.*?)\s*</i)) ) {
		//&& null != (m=body.match(/v_content[^<>]*?>\s*(.*?)\s*</i)) && window.VideoData

		// sohu
		// data.title = m[1];
		// var v = window.VideoData;
		// var sohu_url = "http://m.tv.sohu.com/v"+v.vid+".shtml";
		// data.cache = sohu_url;

		// ext += '&iid='+v.vid;
		// setUrls(sohu_url);

		parseStart();

		var lastVid = false;
		var checkChange = function () {
			if (window.VideoData) {
				var v = window.VideoData;
				if (!lastVid) {
					lastVid = v.vid;

					var sohu_url = "http://m.tv.sohu.com/v"+v.vid+".shtml";
					data.title = m[1];
					data.cache = sohu_url;
					ext += '&iid='+v.vid;
					setUrls(sohu_url);

					parseDone();

					return;
				}
				if (v.vid != lastVid) {
					console.log('get new location');
					clearInterval(checkChangeI);
					window.location.href = "http://m.tv.sohu.com/v"+v.vid+".shtml";
				}
			}
		};
		var checkChangeI=setInterval(checkChange, 50);

		var _istouched = false;
		var playo = document.getElementsByClassName('player_init');
		for (var i = playo.length - 1; i >= 0; i--) {
			var po = playo[i];
			po.onclick = null;
			po.ontouchstart=function(){
				_istouched = true;
			};
			
			po.ontouchend=function () {
				if (_istouched) {
					window.location.href="http://m.tv.sohu.com/v"+this.getAttribute('video-vid')+".shtml";
				}
				
			};
		}

		window.ontouchmove = function () {
			_istouched = false;
		};

	} else if ( null != (m=url.match(/.*tudou.com.*/i)) && window.itemData ) {
		var _d = window.itemData;
		if (_d.vcode && _d.vcode!='') {
			ext += '&vcode='+_d.vcode;
		} else {
			//ext += '&iid='+_d.iid;
		}
		setUrls(url);

		data.title = _d.kw;

		var lastVid = false;
		var checkChange = function () {

			if (window.itemData) {
				var v = window.itemData;
				if (!lastVid) {
					lastVid = v.iid;
					return;
				}

				if ( window.location.href.indexOf(v.icode) == -1 ) {
					data.cache = false;
				}

				if (v.iid != lastVid ) {
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

		var checkTudouAd = function () {
			if (window.itemData && window.itemData.iid) {
				var showId = window.aid ? window.aid : '0';
				var videoId = window.itemData.iid;
				var videoOwnerID = window.itemData.oid ? window.itemData.oid : '';
				getAdNum(showId+'_'+videoId+'_'+videoOwnerID);
				return true;
			} else {
				return false;
			}

		};

		if ( !checkTudouAd() ) {
			parseStart();
			setTimeout(function () {
				checkTudouAd();
				parseDone();
			}, 500);
		}
		

	} else if ( null != (m=url.match(/.*letv.com.*/i)) && (
		null != (m=url.match(/m\.letv\.com\/vplay\_(.*?)\.html.*/i)) ||
		null != (m=url.match(/www\.letv\.com\/ptv\/vplay\/(.*?)\.html.*/i))
		) ) {
		var leurl = 'http://www.letv.com/ptv/vplay/'+m[1]+'.html';
		setUrls(leurl);
		

		getAdNum(m[1]);

		console.log('check letv');

		if ( window.info ) {
			data.title = window.info.title;
		}

		

	} else if ( null != (m=url.match(/.*sina.cn.*/i)) && null != (m=body.match(/location\.php\?.*?url\=([^\&\#\'\"]+)/i)) ) {
		var u = decodeURIComponent(m[1]);
		setUrls(u);
		if ( null != (title=body.match(/<h2>(.*?)<\/h2>/i)) ) {
			data.title = title[1];
		}
	} else if ( null != (m=url.match(/.*56.com.*/i)) && null != (m=body.match(/src\=\"http\:\/\/vxml.56.com\/html5\/(\d+)\//i)) ) {
		ext += '&iid='+m[1];
		setUrls(url);
		if ( null != (title=body.match(/keywords.*?content=\"(.*?)\"/i)) ) {
			data.title = title[1];
		}
	//} else if ( null != (m=url.match(/.*\.iqiyi\.com\/play.html.*?tvid\=([^\&\#]+).*?vid\=([^\&\#]+)/i)) ) {
	} else if ( null != (m=url.match(/.*\.iqiyi\.com/i)) || null != (m=url.match(/.*\.iqiyi\.com\/play.html.*?tvid\=([^\&\#]+).*?vid\=([^\&\#]+)/i)) ) {
		//ext += '&iid='+m[1]+'_'+m[2];
		setUrls(url);

		var lastVid = '';

		if (window.Q.PageInfo && Q.PageInfo.playInfo && Q.PageInfo.playInfo.vn) {
			data.title = Q.PageInfo.playInfo.vn;
			lastVid = Q.PageInfo.playInfo.vid;
			getAdNum();
		} else {
			parseStart();
		}

		var checkChange = function () {
			if (window.tvInfoJs) {
				var info = window.tvInfoJs;
				
				if (!lastVid) {
					lastVid = info.vid;
					data.title = info.vn;
					setUrls(info.vu);
					getAdNum();
					parseDone();
					return;
				}

				if (info.vid != lastVid) {
					console.log('iqiyi get new location')
					clearInterval(checkChangeI);
					//window.location.href='http://m.iqiyi.com/play.html?tvid='+v.tvid+'&vid='+v.vid;
					window.location.href = info.vu;
				}
			}
		};

		var checkChangeI=setInterval(checkChange, 50);


	} else if ( null != (m=url.match(/.*m.(ku6.com.*)/i)) ) {
		setUrls('http://v.'+m[1]);
		if ( null != (title=body.match(/<title>(.*?)<\/title>/i)) ) {
			data.title = title[1];
		}
	} else if ( null != (m=url.match(/.*v\.ifeng\.com.*/i)) && (null != (m=url.match(/([\w\d]+\-[\w\d]+\-[\w\d]+\-[\w\d]+\-[\w\d]+)/i)) || null != (m=body.match(/([\w\d]+\-[\w\d]+\-[\w\d]+\-[\w\d]+\-[\w\d]+)/i)) ) ) {
		ext += '&iid='+m[1];
		setUrls(url);
		if ( null != (title=body.match(/title\"\s*content\=\"(.*?)\"/i)) ) {
			data.title = title[1];
		}

		(function(){
			var checkUrl = function () {
				if (window.location.href != url) {
					window.location.href = window.location.href.replace(/\#/i, '?#');
				} else {
					setTimeout(checkUrl, 500);
				}
			};
			setTimeout(checkUrl, 500);
		})();
	} else if ( null != (m=url.match(/.*[mv].(pptv.com.*)/i)) && window.m_info && window.webcfg ) {
		ext += '&iid=' + webcfg.channel_id;
		setUrls('http://v.'+m[1]);
		data.title = m_info.title;

		getAdNum();

	} else if ( null != (m=url.match(/.*?\.(pps\.tv\/play.*)/i)) ) {
		//ext += '&iid=' + page_var.url_key;
		setUrls('http://v.'+m[1]);
		if ( window.page_var ) {
			data.title = page_var.file_title;
		} else if ( null != (img=body.match(/<img[^<>]*?src\=\"(.*?)\"[^<>]*?alt\=\"(.*?)\"[^<>]*?>/i)) ) {
			data.title = img[2];
		}

		getAdNum();

	} else if ( null != (m=url.match(/.*?app\/yinyuetai\/movie.*/i)) && window.__PAGE_DATA ) {
		ext += '&iid=' + __PAGE_DATA.iid;
		setUrls(__PAGE_DATA.url);
		data.title = __PAGE_DATA.title;

	} else if ( null != (m=url.match(/.*?yinyuetai.com\/video\/.*/i)) ) {
		setUrls(url);

		if ( null != (title=body.match(/\<title\>(.*)/i)) ) {
			data.title = title[1];
		}

	} else if ( null != (m=url.match(/.*?mv\.yinyuetai\.com.*/i)) ) {
		var setPlayVideoHere = function () {
			window.playVideoHere = function (t, id) {
				window.location.href='http://v.yinyuetai.com/video/'+id;
			}

			setTimeout(setPlayVideoHere, 300);
		}

		setPlayVideoHere();
		
	} else if ( null != (m=url.match(/.*?yinyuetai.com\/playlist\/.*/i)) ) {
		var lastTitle = false;
		var redirected = false;
		var checkPlay = function () {
			if (redirected)
				return;
			if (window.$) {
				$(function(){
					var o = $('.J_video_info > a');
					if (o.length>0) {
						if (lastTitle) {
							if (lastTitle != o[0].innerHTML && window.location.href != o[0].href) {
								window.location.href = o[0].href;
								redirected = true;
							}
						} else if (o[0].innerHTML) {
							lastTitle = o[0].innerHTML;
						}
					}
				});
			}
			setTimeout(checkPlay, 100);
		};

		checkPlay();
	} else if ( null != (m=url.match(/.*?yinyuetai.com\/wap\/video\/(\d+).*/i)) || null != (m=body.match(/data-videoid\=\"(\d+)\"/i)) ) {
		var yurl = 'http://v.yinyuetai.com/video/'+m[1];
		setUrls(yurl);
	} else if ( null != (m=url.match(/.*?(v.qq.com\/(cover|page).*)/i)) ) {
		var _u = 'http://'+m[1];
		setUrls(_u);
		
	}

	// check hidePlay button
	if  (window.hidePlayButton && window.SHOW_TAB=='no') {
		window.hidePlayButton();
	}

	returnPageData();

})();



(function(){
	var src = window.location.href;
	var checkLocation = function () {
		if (src != window.location.href) {
			clearInterval(checkLocationI);
			window.location.reload();
		}
	};
	var checkLocationI=setInterval(checkLocation, 50);
})();
