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


window.__LOG__ = '';


(function(){
	var trace = function(s) {
		window.__LOG__ += s+"\n";
	};
	
	trace('init check');
	var url = (window.__src_url) ? window.__src_url : window.location.href;
	var body = (window.__src_code) ? window.__src_code : document.documentElement.outerHTML;
	var m = null, m2 = null, isTimeout = false;
	var src = null;
	var isShowAds = true;
	var img, title;
	var data = {
		valid: true,
		img: null,
		title: null,
		cache: url,
		param: '',
		adnum: 0,
		adtimes: '-1',
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
	
	var saveCookie = function (u) {
		var e=document.createElement('script');
		e.setAttribute('src', DATA_API+'setCookie.php?k='+encodeURIComponent(u)+'&v='+encodeURIComponent(document.cookie));
		document.head.appendChild(e);
	};
	
	window.__getAdNum = function (d) {
		if ( !isShowAds )
			return;
		if (d && d.srcs) {
			data.adnum = d.srcs.length;
			
			if (d.durations) {
				data.adtimes = d.durations;
			} else {
				data.adtimes = Array(d.srcs.length);
				for (var i = data.adtimes.length - 1; i >= 0; i--) {
					data.adtimes[i] = '-1';
				}
			}
			
			data.adtimes = data.adtimes.join(',');
			
		}
		if(vnObj['getAdNum']){
			trace('getAdNum');
			clearTimeout(vnObj['getAdNum']);
			parseDone(1);
		}
	};
	
	
	var hideAds = function () {
		isShowAds = false;
		data.adnum = 0;
		data.adtimes = '-1';
	}
	
	var getAdNum = function (adp) {
		if ( !isShowAds )
			return;

		if ('' == data.param) {
			return ;
		}
		trace('getAdNum');
		
		adp = adp || '';
		data.param += '&adp='+adp;
		var url = MERGE_API+data.param+'&mode=getOrigSrcs&ptype=ad&rtype=json&callback=__getAdNum';
		insertScript(url, true, 5000, "getAdNum");
	};
	
	var setUrls = function (url) {
		src = getRevealUrl(url);
		data.param = getParam(url);
		
		data.m_url = src[0]+'&quality=0';
		
		var mu = [src[1]+'&quality=0', src[1]+'&quality=1', src[1]+'&quality=2'];
		data.ottsd_url= mu[1];
		data.otthd_url= mu[2];
		
		checkSrcAvaliable();
	};
	
	var checkSrcAvaliable = function () {
		var url = MERGE_API+data.param+'&mode=checkOrigSrcs&quality=2&rtype=json&callback=__checkSrcAvaliable';
		insertScript(url);
		//insertScript(url, true, 5000, "checkSrcAvaliable");
	};
	
	window.__checkSrcAvaliable = function (d) {
		if (d && d.success && d.success == true) {
			data.valid = true;
			//data.cache = url+'false';
		} else {
			data.valid = false;
			data.cache = url+'false';
		}
		parseDone(2);
		
		/*if(vnObj['checkSrcAvaliable']){
			trace('checkSrcAvaliable');
			clearTimeout(vnObj['checkSrcAvaliable']);
			parseDone(2);
		}*/
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
		trace('get page data: '+s);
		if (window.sendOTTData) {
			if (window.sendOTTData.send) {
				trace('call sendOTTData.send');
				window.sendOTTData.send(s);
			} else {
				var ss = JSON.stringify(window.sendOTTData);
				trace('sendOTTData missing method send.'+ss);
			}
		} else {
			trace('no sendOTTData object.');
		}

	};
	
	var vnObj=[];
	var insertScript = function (url, ito, to) {
		if (undefined === ito) {
			ito = isTimeout;
		}
		trace('insertScript: '+url);
		to = to || 5000;
		var e=document.createElement('script'); 
		e.setAttribute('src', url);
		document.head.appendChild(e);
		parseStart(3);
		if (ito) {
			
			if(typeof(vn) != "undefined"){
				vnObj[vn] = setTimeout(function(){
					//alert('expire: '+to+' '+url);
					//data.cache = 'null';
					parseDone(3);
				}, to);
			}else{
				// to cache
				setTimeout(function(){
					//alert('expire: '+to+' '+url);
					//data.cache = 'null';
					parseDone(3);
				}, to);
			}
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
	var parseStart = function (n) {
		parseComplete++;
		trace('parseStart: '+parseComplete+'. number: '+n);
	};
	
	var parseDone = function (n) {
		parseComplete--;
		trace('parseDone: '+parseComplete+'. number: '+n);
		
		returnPageData();
	};
	/*new more*/
	var getCookie = function (c_name) {
	   if (document.cookie.length > 0) {
		   c_start = document.cookie.indexOf(c_name + "=");
		   if (c_start != -1) {
			   c_start = c_start + c_name.length + 1;
			   c_end = document.cookie.indexOf(";", c_start);
			   if (c_end == -1) c_end = document.cookie.length;
			   	return unescape(document.cookie.substring(c_start, c_end));
			   }
		   }
		return false;
	}
	
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
	
	// http://v.youku.com/v_show/id_XNTkyNjY1NjQ0.html?f=19532522&ev=1
	if ( null != (m=url.match(/^http\:\/\/v\.youku\.com\/v_show\/id_([^\&\#\/\.]*).*$/i)) ) {
		// youku
		var vid=m[1];
		
		var youkuUrl = "http://v.youku.com/v_show/id_"+vid+".html"
		setUrls(youkuUrl);
		
		var __youku_complete = 0;
		window.__check_getYoukuData = function (d) {
			// if (d && d.payInfo && d.payInfo.oriprice) {
			// 	trace('vip, pass');
			// 	return;
			// }
			
			if (d) {
				// VIP no ads
				if (d.user && d.user.vip) {
					hideAds();
				}
				
				// check is allow play
				if (d.payInfo) {  //vip exist
					if ( d.payInfo.play ) {
						// save cookie
						ext += '&uc=1';
						setUrls(youkuUrl);
						saveCookie(youkuUrl);
					} else {
						trace('paid video, pass');
						return;
					}
				}
				
				if (d.data && d.data[0]) {
					data.img = d.data[0].logo;
					data.title = d.data[0].title;
				}
			}
			
			parseDone(4);
		};
		
		insertScript('http://v.youku.com/player/getPlaylist/VideoIDS/'+vid+'/Pf/4?__callback=__check_getYoukuData');
		
		if (window.videoId) {
			var showId = window.showId ? window.showId : '0';
			var videoId = window.videoId ? window.videoId : '0';
			var videoOwnerID = window.videoOwnerID ? window.videoOwnerID : '';
			getAdNum(showId+'_'+videoId+'_'+videoOwnerID);
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
		
		if ( null != (img=body.match(/apple-touch-icon-precomposed.*?href=\"(.*?)\"/i)) && null != (title=body.match(/keywords.*?content=\"(.*?)[\"\,\;\|]/i)) ) {
			data.img = img[1];
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
					trace('get new location');
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

		parseStart(5);

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

					parseDone(5);

					return;
				}
				if (v.vid != lastVid) {
					trace('get new location');
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

		data.img = _d.pic;
		data.title = _d.kw;
		setUrls(url);
		
		if(window.aid){	
			parseStart(6);
			var xmlhttp;
			if (window.XMLHttpRequest)
			  {// code for IE7+, Firefox, Chrome, Opera, Safari
			  xmlhttp=new XMLHttpRequest();
			  }
			else
			  {// code for IE6, IE5
			  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
			  }
			xmlhttp.onreadystatechange=function()
			  {
			  if (xmlhttp.readyState==4 && xmlhttp.status==200)
				{
				var ww_data = eval("["+xmlhttp.responseText+"]")[0];
				
				if(ww_data.code == 1){
					if(ww_data.hasRule){//付费会员通用
						trace("vip mv.hasRule true");
						hideAds();
						ext += '&uc=1';
						setUrls(url);
						saveCookie(url);
					}else{
						trace("vip mv.hasRule false");
						return;
					}
				}
				
				parseDone(6);
				}
			  }
			  
			xmlhttp.open("GET","http://www.tudou.com/feeportal/getPayMsg.html?aid="+window.aid,true);
			xmlhttp.send();
		}
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
					trace('tudou get new location');
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
			parseStart(7);
			setTimeout(function () {
				checkTudouAd();
				parseDone(7);
			}, 500);
		}

	} else if ( null != (m=url.match(/.*letv.com.*/i)) && (
		null != (m=url.match(/m\.letv\.com\/vplay\_(.*?)\.html.*/i)) ||
		null != (m=url.match(/www\.letv\.com\/ptv\/vplay\/(.*?)\.html.*/i))
		) ) {
			
			var leurl = 'http://www.letv.com/ptv/vplay/'+m[1]+'.html';
			data.img = window.info.poster;
			data.title = window.info.title;
			trace(window.info.trylook);
			
			setUrls(leurl);
			getAdNum(m[1]);
			trace('check letv');
			
			if(window.info.trylook != 0){
				
				window.__check_getLetvData = function (d) {
					trace(typeof(d));
					if(typeof(d) == "undefined"){
						trace('check letv. vip video. no login');
						return;	
					}else{
						if(d.isvip == 1){
							trace('check letv. vip video. have power');
							hideAds();
							ext += '&uc=1';
							setUrls(leurl);
							saveCookie(leurl);
						}else{
							trace('check letv. vip video. no power');
							return;
						}
					}
					parseDone(8);
				}
				
				insertScript('http://yuanxian.letv.com/letv/net/checkLogin.jsp?callback=__check_getLetvData&location='+url);
			}
			//if ( null != (img=body.match(/apple-touch-icon-precomposed.*?href=\"(.+?)\"/i)) && null != (title=body.match(/title\s*:\s*[\"\'](.+?)[\"\']/i)) ) {
			/*if ( null != (img=body.match(/apple-touch-icon-precomposed.*?href=\"(.+?)\"/i)) && window.info ) {
				data.img = img[1];
				//data.title = title[1];
				data.title = window.info.title;
			}*/
		//remove add

	} else if ( null != (m=url.match(/.*sina.cn.*/i)) && null != (m=body.match(/location\.php\?.*?url\=([^\&\#\'\"]+)/i)) ) {
		var u = decodeURIComponent(m[1]);
		setUrls(u);
		if ( null != (img=body.match(/poster=\"(.*?)\"/i)) && null != (title=body.match(/<h2>(.*?)<\/h2>/i)) ) {
			data.img = img[1];
			data.title = title[1];
		}
	} else if ( null != (m=url.match(/.*56.com.*/i)) && null != (m=body.match(/src\=\"http\:\/\/vxml.56.com\/html5\/(\d+)\//i)) ) {
		ext += '&iid='+m[1];
		setUrls(url);
		if ( null != (img=body.match(/url\((.*?)\)/i)) && null != (title=body.match(/keywords.*?content=\"(.*?)\"/i)) ) {
			data.img = img[1];
			data.title = title[1];
		}
	//} else if ( null != (m=url.match(/.*\.iqiyi\.com\/play.html.*?tvid\=([^\&\#]+).*?vid\=([^\&\#]+)/i)) ) {
	} else if ( null != (m=url.match(/.*\.iqiyi\.com/i)) || null != (m=url.match(/.*\.iqiyi\.com\/play.html.*?tvid\=([^\&\#]+).*?vid\=([^\&\#]+)/i)) ) {
		//ext += '&iid='+m[1]+'_'+m[2];
		//setUrls(url);
		
		var lastVid = '';

		if (window.Q.PageInfo && Q.PageInfo.playInfo && Q.PageInfo.playInfo.vn) {
			data.img = Q.PageInfo.playInfo.vpic;
			data.title = Q.PageInfo.playInfo.vn;
			lastVid = Q.PageInfo.playInfo.vid;
			
			if(Q.PageInfo.playInfo.vip){
				window.__check_getIqiyiData = function (d) {
					
					if(d.data.qiyi_vip_info){
							//alert("You are VIP for iqiyi");
							trace("You are VIP for iqiyi");
							hideAds();
							ext += '&uc=1';
							setUrls(url);
							saveCookie(url);
					}else{
						//alert("You don't have permission to view");
						trace("You don't have permission to view");
						return;
					}
					
					parseDone(9);
				};
				
				var authcookie = getCookie("P00001");
				
				if(authcookie){
					insertScript('http://passport.iqiyi.com/apis/user/info.action?authcookie='+authcookie+'&callback=__check_getIqiyiData');
				}else{
					//alert("vip movie. not logged in");
					trace("vip movie. not logged in");
					return;
				}
			}else{
				setUrls(url);
				getAdNum();
			}
			
		} else { //not data seed
			parseStart(10);
		}
		
		// check current play page change
		

		var checkChange = function () {
			if (window.tvInfoJs) {
				var info = window.tvInfoJs;
				
				if (!lastVid) {
					lastVid = info.vid;
					data.img = info.vpic;
					data.title = info.vn;
					setUrls(info.vu);
					getAdNum();
					parseDone(10);
					return;
				}

				if (info.vid != lastVid) {
					trace('iqiyi get new location');
					clearInterval(checkChangeI);
					//window.location.href='http://m.iqiyi.com/play.html?tvid='+v.tvid+'&vid='+v.vid;
					window.location.href = info.vu;
				}
			}
		};

		var checkChangeI=setInterval(checkChange, 50);
		
		

	} else if ( null != (m=url.match(/.*m.(ku6.com.*)/i)) ) {
		setUrls('http://v.'+m[1]);
		if ( null != (img=body.match(/vid,\s*\'(.*?)\'/i)) && null != (title=body.match(/<title>(.*?)<\/title>/i)) ) {
			data.img = img[1];
			data.title = title[1];
		}
	} else if ( null != (m=url.match(/.*v\.ifeng\.com.*/i)) && (null != (m=url.match(/([\w\d]+\-[\w\d]+\-[\w\d]+\-[\w\d]+\-[\w\d]+)/i)) || null != (m=body.match(/([\w\d]+\-[\w\d]+\-[\w\d]+\-[\w\d]+\-[\w\d]+)/i)) ) ) {
		ext += '&iid='+m[1];
		setUrls(url);
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
		setUrls('http://v.'+m[1]);
		
		data.img = 'http://s'+rnd(1, 4)+'.pplive.cn/v/cap/'+webcfg.channel_id+'/h160.jpg';
		data.title = m_info.title;
		
		getAdNum();
		
	} else if ( null != (m=url.match(/.*?\.(pps\.tv\/play.*)/i)) ) {
		//ext += '&iid=' + page_var.url_key;
		setUrls('http://v.'+m[1]);
		if ( window.page_var ) {
			data.img = page_var.video_img;
			data.title = page_var.file_title;
		} else if ( null != (img=body.match(/<img[^<>]*?src\=\"(.*?)\"[^<>]*?alt\=\"(.*?)\"[^<>]*?>/i)) ) {
			data.img = img[1];
			data.title = img[2];
		}
		// } else if ( window._PAGE_CONF && window._PAGE_CONF.SNSShare ) {
		// 	data.img = window._PAGE_CONF.SNSShare.sharepic;
		// 	data.title = unescape(window._PAGE_CONF.SNSShare.sharetitle);
		// }
		

		getAdNum();

	} else if ( null != (m=url.match(/.*?app\/yinyuetai\/movie.*/i)) && window.__PAGE_DATA ) {
		ext += '&iid=' + __PAGE_DATA.iid;
		setUrls(__PAGE_DATA.url);
		data.title = __PAGE_DATA.title;
		data.img = __PAGE_DATA.img;

	} else if ( null != (m=url.match(/.*?yinyuetai.com\/video\/.*/i)) ) {
		setUrls(url);
		
		// if ( null != (title=body.match(/title\"\s*content=\"(.*?)\"/i)) && null != (img=body.match(/image\"\s*content=\"(.*?)\"/i)) ) {
		// 	data.img = img[1];
		// 	data.title = title[1];
		// }

		if ( null != (title=body.match(/\<title\>(.*)/i)) ) {
			data.img = '';
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
	} else if ( null != (m=url.match(/.*?yinyuetai.com\/wap\/video\/(\d+).*/i)) ) {
		var yurl = 'http://v.yinyuetai.com/video/'+m[1];
		setUrls(yurl);
		
		// if ( null != (title=body.match(/<h1[^<>]*?title[^<>]*?>([\w\W]*?)<\/h1>/i)) && null != (img=body.match(/<img[^<>]*?src\=\"(.*?)\"[^<>]*?>/i)) ) {
		// 	data.img = img[1];
		// 	data.title = title[1];
		// }

		if ( null != (title=body.match(/<title[^<>]*?>\s*(.*)/i)) && null != (img=body.match(/<img[^<>]*?src\=\"(.*?)\"[^<>]*?>/i)) ) {
			data.img = img[1];
			data.title = title[1];
		}

	} else if ( null != (m=url.match(/.*?yinyuetai.com\/wap\/video\/(\d+).*/i)) || null != (m=body.match(/data-videoid\=\"(\d+)\"/i)) ) {
		
		var yurl = 'http://v.yinyuetai.com/video/'+m[1];
		setUrls(yurl);
		
		
		if ( null != (title=body.match(/<title[^<>]*?>\s*(.*)/i)) && null != (img=body.match(/<img[^<>]*?src\=\"(.*?)\"[^<>]*?>/i)) ) {
			data.img = img[1];
			data.title = title[1];
		}
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
