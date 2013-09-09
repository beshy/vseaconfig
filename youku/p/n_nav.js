__patterns.menu.push({
	pattern: /<div\s*class=\"module\"[^>]*?>\s*<ul.*?>[\w\W]*?<\/ul>/ig,
	data_patterns:[
		{
			pattern: /<a.*?href=\"(.+?)\".*?>(.+?)<\/a>/ig,
			keys: ['','url','title']
		}
	]
});
