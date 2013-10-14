

var __tpl_page=<?php echo json_encode(fetch($tpl));?>;
var __patterns = {
	menu: [],
	category: [],
	page: [],
	item: [],
	select: []
};

var ott_apis = <?php echo OTT_API;?>;
var ott_api = '';
if (window.nettype && window.nettype == 'u') {
	ott_api=ott_apis[1];
} else {
	ott_api=ott_apis[0];
}

var getMergeUrl = function (u, stbid) {
	return ott_api+'&playurl='+encodeURIComponent(u+'&mode=getMergeUrl&seek=OTT');
};

__processed_data=[];
var filter_video_data = function(d) {
	var m=null;
	__processed_data[__processed_data.length]=d;

	if (d && d.url && /^http\:\/\/(?:my\.|store\.)?tv\.sohu\.com\/(?:.*?\/n.*?\.shtml|u[^\/]*?\/|s\d+\/|us\/|(?:view_|web\/)?content).*$/i.test(d.url)){

		if ( (m=d.url.match(/^http\:\/\/(?:my\.|store\.)?tv\.sohu\.com\/(?:.*?\/n.*?\.shtml|u\/vw\/(\d+)|us\/|(?:view_|web\/)?content).*$/i))!=null ) {
			// single video
			if (m[1] && m[1]!='') {
				d.iid = m[1]; 
			}

			if (d && d.pid) {
				var cvdJSON=encodeURIComponent(JSON.stringify(d));
				d.url = 'http://hot.vrs.sohu.com/vrs_videolist.action?playlist_id='+d.pid+'&cvdJSON='+cvdJSON;
				return;
			} else {
				d.url='<?php echo PLAY_URL;?>'+encodeURIComponent(d.url);
				if (d.iid)
					d.url=d.url+'&iid='+d.iid;

				d.options = '<a href="'+d.url+'&playmode=play&quality=1">HLSH</a> |'
						+ ' <a href="'+d.url+'&playmode=play&quality=2">HLSS</a> |';
	
				if (window.stbid) {
					var mu = [getMergeUrl(d.url+'&playmode=play&quality=0', window.stbid), getMergeUrl(d.url+'&playmode=play&quality=1', window.stbid), getMergeUrl(d.url+'&playmode=play&quality=2', window.stbid)];
					d.options += '<a href="'+mu[0]+'">OTTN</a> |'
							+ '<a href="'+mu[1]+'">OTTH</a> |'
							+ ' <a href="'+mu[2]+'">OTTS</a>';
				} else {
					d.options += '<a href="api://getStbid:'+__src_url+'">Scan</a>'
				}




			}
			
		} else {
			// play list
			m=null;
			if ((m=d.url.match(/^http\:\/\/my\.tv\.sohu\.com\/u.*$/i))!=null) {
				var cvdJSON=encodeURIComponent(JSON.stringify(d));
				d.url = 'http://my.tv.sohu.com/playlistVideo.jhtml?m=list&outType=3&size=10000&playlistId='+m[1]+'&cvdJSON='+cvdJSON;
			} else if (d.iid) {
				d.url = 'http://hot.vrs.sohu.com/vrs_videolist.action?playlist_id='+d.iid;
			}
		}


		if (d.playLength)
		{
			var min = parseInt(d.playLength/60);
			var sec = parseInt(d.playLength-min*60);
			d.time = min+':'+sec;
		}

	} else {
		d.title = null;
	}

};
