

__patterns.menu.push({
	pattern: /\"(?:tree)\"[^>]*?>[\w\W]*?<\/ul>/ig,
	data_patterns:[
		{
			pattern: /(?:<a.*?href=\"(.+?)\".*?>|<span[^<>]*?>)(.+?)(?:<\/a>|<\/span>)/ig,
			keys: ['','url','title']
		}
	]
});

