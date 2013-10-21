;

var __patterns = {
	menu: [],
	category: [],
	item: [],
	page:[],
	select: []
};

var item_callback=function(d){
	var p=/(?:v_show|show_page|show_episode)\/id_(.+?)\./i;
	var up=/v_show\/id_(.+?)\./i;

	var api_url = (window.netip && window.netip!='')? 'http://'+window.netip+':8080/app/reveal/?u=' : '<?php echo PLAY_URL;?>';

	var m=null;
	if (d && d.url && (m=d.url.match(p))!=null ){
		m = null;
		if ( (m=d.url.match(up))!=null )
		{
			d.url=api_url+encodeURIComponent(d.url);

		}
	} else {
		d.img = '';
	}
};

