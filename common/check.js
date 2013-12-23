
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
		param: '',
		adnum: 0,
		adtimes: [],
		m_url: null
	};
	// &seek=OTT
	var ext = '';


	var getRevealUrl = function (u) {
		return [PLAY_URL+encodeURIComponent(u)+ext, MERGE_URL+encodeURIComponent(u)+ext+'&mode=getMergeUrl&seek=OTT'];
	};


	var getParam = function(u) {
		return '?u='+encodeURIComponent(u)+ext;
	};

	window.__getAdNum = function (d) {
		if (d && d.srcs) {
			data.adnum = d.srcs.length;
			data.adtimes = d.durations;
		}
		parseDone();
	};

	var getAdNum = function (adp) {
		if ('' == data.param) {
			return ;
		}
		adp = adp || '';
		parseComplete++;
		data.param += '&adp='+adp
		var url = MERGE_API+data.param+'&mode=getOrigSrcs&ptype=ad&rtype=json&callback=__getAdNum';
		insertScript(url);
	};


	var returnPageDataDone = false;
	var returnPageData = function (force) {
		if (returnPageDataDone || parseComplete>0)
			return;
		if ( force || (data && data.img && data.m_url) ) {
			returnPageDataDone = true;
			if ( !(data && data.m_url) ) {
				console.log('get page data null');
				return;
			}
			data.title = escape(data.title);
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


	var parseComplete = 0;
	var parseDone = function () {
		parseComplete--;
		if (parseComplete<1) {
			returnPageData();
		}
	};

	window.__getAdLocation = function (d) {
		data.ad_url = d.location;
		parseDone();
	};

	var getAdLocation = function (u) {
		parseComplete++;
		var urls = getRevealUrl(encodeURI(u));
		u = urls[1]+'&rtype=json&callback=__getAdLocation';
		insertScript(u);
	};

	// http://v.youku.com/v_show/id_XNTkyNjY1NjQ0.html?f=19532522&ev=1
	if ( null != (m=url.match(/^http\:\/\/v\.youku\.com\/v_show\/id_([^\&\#\/\.]*).*$/i)) ) {
		// youku
		var vid=m[1];

		var youkuUrl = "http://v.youku.com/v_show/id_"+vid+".html"
		src=getRevealUrl(youkuUrl);
		data.param = getParam(youkuUrl);

		var __youku_complete = 0;
		window.__check_getYoukuData = function (d) {
			if (d && d.payInfo && d.payInfo.oriprice) {
				console.log('vip, pass');
				return;
			}
			if (d && d.data && d.data[0]) {
				data.img = d.data[0].logo;
				data.title = d.data[0].title;
			}
			parseDone();
		};


		parseComplete++;
		insertScript('http://v.youku.com/player/getPlaylist/VideoIDS/'+vid+'/Pf/4?__callback=__check_getYoukuData');

		if (window.videoId) {
			var showId = window.showId ? window.showId : '0';
			var videoId = window.videoId ? window.videoId : '0';
			var videoOwnerID = window.videoOwnerID ? window.videoOwnerID : '';
			getAdNum(showId+'_'+videoId+'_'+videoOwnerID);
		}


		setTimeout(parseDone, 5000);

	} else if ( null != (m=url.match(/tv.sohu.com/i)) && null != (m=body.match(/\s+vid\s*[\:\=]\s*\"(\d+)\"/i)) && null != (m2=body.match(/og\:url.*?content\=\"(.+?)\"/i)) ) {
		// sohu
		ext += '&iid='+m[1];
		src=getRevealUrl(m2[1]);
		data.param = getParam(m2[1]);

		if ( null != (img=body.match(/apple-touch-icon-precomposed.*?href=\"(.*?)\"/i)) && null != (title=body.match(/keywords.*?content=\"(.*?)\"/i)) ) {
			data.img = img[1];
			data.title = title[1];
		}

		// window.__sohuAd = function (d) {
		// 	console.log('call __sohuAd', d);
		// 	if (d && d.data && d.oad != '') {
		// 		d.data.oad = d.data.oad.replace(/\'/g,'"');
		// 		var dd = JSONparse(d.data.oad);
		// 		console.log('get ad data', dd);
		// 		if (dd && dd[0] && dd[0][0]) {
		// 			var ad_url = getRevealUrl(dd[0][0]);
		// 			getAdLocation(ad_url[1]);
		// 		}
		// 	}
		// 	parseDone();
		// };

		// if (window.VideoData && window.VideoData.vid && window.VideoData.tvid && window.VideoData.sid) {
		// 	getAdLocation('http://v.aty.sohu.com/v?type=vrs&al='+VideoData.sid+'&vid='+VideoData.vid+'&tvid='+VideoData.tvid+'&c=tv&fee=0&isIf=0&du='+VideoData.duration+'&out=0&uid=&qd=&autoPlay=1&pageUrl='+url);
		// }

		if (window.VideoData && window.VideoData.vid && window.VideoData.tvid && window.VideoData.sid) {			
			getAdNum(VideoData.sid+'_'+VideoData.vid+'_'+VideoData.tvid+'_'+VideoData.duration);
		}
		
		setTimeout(parseDone, 5000);
	} else if ( null != (m=url.match(/.*tudou.com.*/i)) && window.itemData ) {
		var _d = window.itemData;
		if (_d.vcode && _d.vcode!='') {
			ext += '&vcode='+_d.vcode;
		} else {
			//ext += '&iid='+_d.iid;
		}
		src = getRevealUrl(url);
		data.param = getParam(url);

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

		// check ad
		// if (window.itemData && window.itemData.iid && window.itemData.oid && window.aid) {
		// 	getAdLocation('http://valf.atm.youku.com/vf?vl=256&ct=a&cs=2148&td=0'+'&s='+aid+'&v='+itemData.iid+'&u='+itemData.oid);
		// }

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
			parseComplete++;
			setTimeout(function () {

				checkTudouAd();
				parseDone();
			}, 500);
		}
		
		setTimeout(parseDone, 5000);

	} else if ( null != (m=url.match(/.*letv.com.*/i)) && (
		null != (m=url.match(/m\.letv\.com\/vplay\_(.*?)\.html.*/i)) ||
		null != (m=url.match(/www\.letv\.com\/ptv\/vplay\/(.*?)\.html.*/i))
		) ) {
		var leurl = 'http://www.letv.com/ptv/vplay/'+m[1]+'.html';
		src = getRevealUrl(leurl);
		data.param = getParam(leurl);
		console.log('check letv');
		//if ( null != (img=body.match(/apple-touch-icon-precomposed.*?href=\"(.+?)\"/i)) && null != (title=body.match(/title\s*:\s*[\"\'](.+?)[\"\']/i)) ) {
		if ( null != (img=body.match(/apple-touch-icon-precomposed.*?href=\"(.+?)\"/i)) && window.info ) {
			data.img = img[1];
			//data.title = title[1];
			data.title = window.info.title;
		}

	} else if ( null != (m=url.match(/.*sina.cn.*/i)) && null != (m=body.match(/location\.php\?.*?url\=([^\&\#\'\"]+)/i)) ) {
		var u = decodeURIComponent(m[1]);
		src = getRevealUrl(u);
		data.param = getParam(u);
		if ( null != (img=body.match(/poster=\"(.*?)\"/i)) && null != (title=body.match(/<h2>(.*?)<\/h2>/i)) ) {
			data.img = img[1];
			data.title = title[1];
		}
	} else if ( null != (m=url.match(/.*56.com.*/i)) && null != (m=body.match(/src\=\"http\:\/\/vxml.56.com\/html5\/(\d+)\//i)) ) {
		ext += '&iid='+m[1];
		src = getRevealUrl(url);
		data.param = getParam(url);
		if ( null != (img=body.match(/url\((.*?)\)/i)) && null != (title=body.match(/keywords.*?content=\"(.*?)\"/i)) ) {
			data.img = img[1];
			data.title = title[1];
		}
	//} else if ( null != (m=url.match(/.*\.iqiyi\.com\/play.html.*?tvid\=([^\&\#]+).*?vid\=([^\&\#]+)/i)) ) {
	} else if ( null != (m=url.match(/.*\.iqiyi\.com/i)) ) {
		//ext += '&iid='+m[1]+'_'+m[2];
		src = getRevealUrl(url);
		data.param = getParam(url);

		var lastVid = '';
		if (window.Q.PageInfo) {
			data.img = Q.PageInfo.playInfo.vpic;
			data.title = Q.PageInfo.playInfo.vn;
			lastVid = Q.PageInfo.playInfo.vid;
		}

		var checkChange = function () {
			if (window.tvInfoJs) {
				var info = window.tvInfoJs;
				if (!returnPageDataDone) {
					data.img = info.vpic;
					data.title = info.vn;
					returnPageData();
				}

				if (!lastVid) {
					lastVid = info.vid;
					return;
				}
				
				if (info.vid != lastVid) {
					console.log('iqiyi get new location')
					clearInterval(checkChangeI);
					//window.location.href='http://m.iqiyi.com/play.html?tvid='+v.tvid+'&vid='+v.vid;
					window.location.href = info.au;
				}
			}
		};
		var checkChangeI=setInterval(checkChange, 50);


	} else if ( null != (m=url.match(/.*m.(ku6.com.*)/i)) ) {
		src = getRevealUrl('http://v.'+m[1]);
		data.param = getParam('http://v.'+m[1]);
		if ( null != (img=body.match(/vid,\s*\'(.*?)\'/i)) && null != (title=body.match(/<title>(.*?)<\/title>/i)) ) {
			data.img = img[1];
			data.title = title[1];
		}
	} else if ( null != (m=url.match(/.*v\.ifeng\.com.*/i)) && (null != (m=url.match(/([\w\d]+\-[\w\d]+\-[\w\d]+\-[\w\d]+\-[\w\d]+)/i)) || null != (m=body.match(/([\w\d]+\-[\w\d]+\-[\w\d]+\-[\w\d]+\-[\w\d]+)/i)) ) ) {
		ext += '&iid='+m[1];
		src = getRevealUrl(url);
		data.param = getParam(url);
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
		data.param = getParam('http://v.'+m[1]);
		
		data.img = 'http://s'+rnd(1, 4)+'.pplive.cn/v/cap/'+webcfg.channel_id+'/h160.jpg';
		data.title = m_info.title;
	} else if ( null != (m=url.match(/.*[mv].(pps.tv\/play.*)/i)) && window.page_var ) {
		ext += '&iid=' + page_var.url_key;
		src = getRevealUrl('http://v.'+m[1]);
		data.param = getParam('http://v.'+m[1]);
		
		data.img = page_var.video_img;
		data.title = page_var.file_title;
	} else if ( null != (m=url.match(/.*?app\/yinyuetai\/movie.*/i)) && window.__PAGE_DATA ) {
		ext += '&iid=' + __PAGE_DATA.iid;
		src = getRevealUrl(__PAGE_DATA.url);
		data.param = getParam(__PAGE_DATA.url);
		data.title = __PAGE_DATA.title;
		data.img = __PAGE_DATA.img;
	}


	// check hidePlay button
	if  (window.hidePlayButton && window.SHOW_TAB=='no') {
		window.hidePlayButton();
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
