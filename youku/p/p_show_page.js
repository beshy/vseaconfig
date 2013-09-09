__patterns.page.push({
	pattern: /<ul.*?SeriesTab.*?>[\w\W]*?<\/ul>/ig,
	data_patterns:[
		{
			pattern: /<li[^<>]*?data=\"(.*?)\"[^<>]*?>\s*<a[^<>]*?>(.*?)<\/a>/ig,
			keys: ['','da','title'],
			callback: function(d){
				var posi = __src_url.indexOf('?');
				var t = (posi>-1)? '&' : '?';
				d.url=__src_url.replace('show_page','show_episode')+t+"divid="+d.da;
			}
		}
	]
});
