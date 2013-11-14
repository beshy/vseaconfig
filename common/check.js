
;(function(){
	if (window.sendOTTData)
		return;
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
	var m = null, m2 = null;
	var src = null;

	var img, title;

	var data = {
		img: null,
		title: null,
		cache: url,
		m_url: null
	};
	// &seek=OTT
	var ext = '&playmode=play';


	var getRevealUrl = function (u) {
		return [PLAY_URL+encodeURIComponent(u)+ext, MERGE_URL+encodeURIComponent(u)+ext+'&mode=getMergeUrl&seek=OTT'];
	};

	var getOTTUrl = function (u) {
		return OTT_API+'?'+stbid+'&playurl='+encodeURIComponent(u);
	};

	var returnPageDataDone = false;
	var returnPageData = function (force) {
		if (returnPageDataDone)
			return;
		if ( force || (data && data.img && data.m_url) ) {
			returnPageDataDone = true;
			if ( !(data && data.m_url) ) {
				console.log('get page data null');
				return;
			}
			var s = JSON.stringify(data);
			console.log('get page data: '+s);
			if (window.sendOTTData) {
				console.log('call sendOTTData.send');
				window.sendOTTData.send(s);
			} else {
				console.log('no sendOTTData method.');
			}
		}
	};

	var simpleAjax = function (url, sf, ef, df) {
		var xhr;
		if (window.XMLHttpRequest){
			xhr=new XMLHttpRequest();
		} else {
			xhr=new ActiveXObject("Microsoft.XMLHTTP");
		}
		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4){
				if(xhr.status === 200){
					if (sf) {
						sf(xhr.responseText);
					}
				} else {
					if (ef) {
						ef(xhr.status);
					}
				}

				if (df) {
					df(xhr.status);
				}
			}
		}

		xhr.open("GET",url,true);
		xhr.send();
	};

	var insertScript = function (url) {
		var e=document.createElement('script'); 
		e.setAttribute('src', url); 
		document.head.appendChild(e);
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


	// http://v.youku.com/v_show/id_XNTkyNjY1NjQ0.html?f=19532522&ev=1
	if ( null != (m=url.match(/^http\:\/\/v\.youku\.com\/v_show\/id_([^\&\#\/\.]*).*$/i)) ) {
		// youku
		var vid=m[1];
		src=getRevealUrl("http://v.youku.com/v_show/id_"+vid+".html");

		var __youku_complete = 0;
		window.__check_getYoukuData = function (d) {
			if (d && d.data && d.data[0]) {
				data.img = d.data[0].logo;
				data.title = d.data[0].title;
			}
			__youku_done();
		};

		window.__youkuAd = function (d) {
			if (d && d.VAL && d.VAL[0]) {
				var ad_url = getRevealUrl(d.VAL[0].RS);
				data.ad_url = ad_url[1]+'&site=vod';
			}
			__youku_done();
		};
		var __youku_done = function () {
			__youku_complete--;
			if (__youku_complete<1) {
				returnPageData();
			}
		};

		__youku_complete++;
		insertScript('http://v.youku.com/player/getPlaylist/VideoIDS/'+vid+'/Pf/4?__callback=__check_getYoukuData');

		if (window.adsParams) {
			__youku_complete++;
			insertScript('http://valf.atm.youku.com/vf?vl=256'+window.adsParams+'&callback=__youkuAd');
		} else if (window.videoId) {
			__youku_complete++;
			insertScript('http://valf.atm.youku.com/vf?vl=256&ct=a&cs=2148&td=0'+'&s='+window.showId+'&v='+window.videoId+'&u='+window.videoOwnerID+'&callback=__youkuAd');
		}

		setTimeout(__youku_done, 2000);

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
		if ( null != (img=body.match(/apple-touch-icon-precomposed.*?href=\"(.*?)\"/i)) && null != (title=body.match(/title\s*:\s*[\"\'](.*?)[\"\']/i)) ) {
			data.img = img[1];
			data.title = title[1];
		}

	} else if ( null != (m=url.match(/.*sina.cn.*/i)) && null != (m=body.match(/location\.php\?.*?url\=([^\&\#\'\"]+)/i)) ) {
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
	} else if ( null != (m=url.match(/.*m\.iqiyi\.com\/play.html.*?tvid\=([^\&\#]+).*?vid\=([^\&\#]+)/i)) ) {
		
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
				if (!returnPageDataDone) {
					data.img = window.tvInfoJs.vpic;
					data.title = window.tvInfoJs.vn;
					returnPageData();
				}
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
		src = getRevealUrl('http://v.'+m[1]);
		
		data.img = 'http://s'+rnd(1, 4)+'.pplive.cn/v/cap/'+webcfg.channel_id+'/h160.jpg';
		data.title = m_info.title;
	} else if ( null != (m=url.match(/.*[mv].(pps.tv\/play.*)/i)) && window.page_var ) {
		ext += '&iid=' + page_var.url_key;
		src = getRevealUrl('http://v.'+m[1]);
		
		data.img = page_var.video_img;
		data.title = page_var.file_title;
	}


	if ( null != src && '' != src ) {
		var appendBtn = function () {
			var btnCode = '';
			var btnDiv = document.createElement("div");

			btnCode +=   '<span style="display:block; position:absolute; top:0; left:50%; margin-left:-60px; border:2px solid #666;  background:#fff; z-index:999999;opacity: 0.9;filter:alpha(opacity=9);">'
					+ '<a href="'+src[0]+'&quality=0" target="_blank" style="color:#000;display:block;line-height:200%; border-bottom:1px dashed #666;">HLS PLAY NORMAL</a>';
			data.m_url = src[0]+'&quality=0';

			if (window.stbid) {
				var mu = [getOTTUrl(src[1]+'&quality=0', window.stbid), getOTTUrl(src[1]+'&quality=1', window.stbid), getOTTUrl(src[1]+'&quality=2', window.stbid)];

				data.ottsd_url= mu[1];
				data.otthd_url= mu[2];

				btnCode += '<a href="'+mu[1]+'" target="_blank" style="color:#000;display:block;line-height:200%;border-bottom:1px dashed #666;">OTT PLAY NORMAL</a>'
					+ '<a href="'+mu[2]+'" target="_blank" style="color:#000;display:block;line-height:200%;">OTT PLAY HIGH</a>';

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
