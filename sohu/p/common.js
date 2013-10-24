

var __tpl_page=<?php echo json_encode(fetch($tpl));?>;
var __patterns = {
	menu: [],
	category: [],
	page: [],
	item: [],
	select: []
};


__processed_data=[];
var filter_video_data = function(d) {
	var m=null;
	__processed_data[__processed_data.length]=d;

	var api_url = (window.netip && window.netip!='')? 'http://'+window.netip+':8080/app/reveal/?u=' : '<?php echo PLAY_URL;?>';

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

				d.url=PLAY_URL+encodeURIComponent(d.url);
				if (d.iid)
					d.url=d.url+'&iid='+d.iid;
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
