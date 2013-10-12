;

var __patterns = {
	menu: [],
	category: [],
	item: [],
	page:[],
	select: []
};

var getMergeUrl = function (u, stbid) {
	return '<?php echo OTT_API;?>?'+stbid+'&playurl='+encodeURIComponent(u+'&mode=getMergeUrl&seek=OTT');
};

var item_callback=function(d){
	var p=/(?:v_show|show_page|show_episode)\/id_(.+?)\./i;
	var up=/v_show\/id_(.+?)\./i;

	var m=null;
	if (d && d.url && (m=d.url.match(p))!=null ){
		m = null;
		if ( (m=d.url.match(up))!=null )
		{
			d.url='<?php echo PLAY_URL;?>'+encodeURIComponent(d.url);

			d.options = '';
			if (window.stbid) {
				var mu = [getMergeUrl(d.url+'&playmode=play&quality=0', window.stbid), getMergeUrl(d.url+'&playmode=play&quality=1', window.stbid), getMergeUrl(d.url+'&playmode=play&quality=2', window.stbid)];
				d.options += '<a href="'+mu[1]+'">OTTN</a> |'
						+ '<a href="'+mu[2]+'">OTTH</a>';
			} else {
				d.options += '<a href="api://getStbid:'+__src_url+'">Scan</a>'
			}
		}
	} else {
		d.img = '';
	}
};

