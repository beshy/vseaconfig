__patterns.menu.push({
	pattern: /<dl\s*class=\"itema\"[^<>]*?>[\w\W]*?<\/dl>/ig,
	data_patterns:[
		{
			pattern: /<a[^<>]*?href=\"(http\:\/\/tv\.sohu\.com\/[^\"]*?)\"[^<>]*?>(.+?)<\/a>/ig,
			keys: ['','url','title']
		}
	]
});
