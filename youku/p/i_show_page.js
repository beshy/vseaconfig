
;
var c_show_page=function(d){
	d.img='blank';
	d.url=PLAY_URL+encodeURIComponent(d.url)+'&playmode=play';
};

__patterns.item.push({
	//pattern: /<div\s*class=\"coll_\d+\"[^>]*?>[\w\W]*?<\/div>/ig,
	//keys: ['content'],
	//data_patterns: [
	//	{
	//		keys:['','url','subtitle','title'],
	//		pattern: /<a[^<>]*?href=\"(http.*?)\"[^<>]*?title=\"(.*?)\"[^<>]*?>(.*?)<\/a>/ig,
	//		callback: c_show_page
	//	}
	//]
	pattern: /<ul>\s*<li>\s*<a.*?href=\"(http.*?)\".*?title=\"(.*?)\".*?>(.*?)<\/a>\s*<\/li>\s*<\/ul>/ig,
	keys: ['','url','title','subtitle'],
	callback: c_show_page
},{
	pattern: /<ul\s*class=\"item\"\s*>\s*<li.*?>\s*<label>(.*?)<\/label>\s*<a.*?href=\"(.*?)\".*?>(.*?)<\/a>/ig,
	keys: ['','subtitle','url','title'],
	callback: c_show_page
});
