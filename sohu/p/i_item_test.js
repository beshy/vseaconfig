__patterns.item.push({
	pattern: /<li\s*plid=\"(\d+)\"[^<>]*?>[\w\W]+?<\/li>/ig,
	//
	keys: ['content','pid'],
	ex_patterns: [
		{
			keys:['','img'],
			pattern: /<img.*?(?:src)=\"(\s*http.+?)\".*?>/i
		},

		{
			keys: ['','subtitle'],
			pattern: /<span[^>]*?>(.*?)</i
		},

		{
			keys: ['','url','title'],
			pattern: /<p>\s*<a[^<>]+?href=\"(.*?)\"[^>]*?>(.*?)<\/a>/i
		}

	],
	callback: filter_video_data
});



__patterns.item.push({
	pattern: /<a[^<>]*?href=\"(http\:\/\/(?:v\.|)tv.sohu.com\/\d+\/n\d+\.shtml[^\"]*?)\"[^<>]*?>\s*([^<].*?)<\/a>/ig,
	keys: ['content','url','title'],
	callback: filter_video_data
});
