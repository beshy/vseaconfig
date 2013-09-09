if (!__patterns.page)
	__patterns.page=[];

__patterns.page.push({
	pattern: /<ul[^<>]*?pages[^>]*?>[\w\W]*?<\/ul>/ig,
	data_patterns:[
		{
			pattern: /<li[^>]*?>\s*(?:<a.*?href=\"(.+?)\".*?>|<span[^>]*?>|)(.+?)(?:<\/a>|<\/span>|)\s*<\/li>/ig,
			keys: ['','url','title']
		}
	]
});
