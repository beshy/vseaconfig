if (!__patterns.select)
	__patterns.select=[];

__patterns.select.push({
	pattern: /\"(?:tree)\"[^>]*?>[\w\W]*?<\/ul>/ig,
	data_patterns:[
		{
			pattern: /(?:<a.*?href=\"(.+?)\".*?>|<span[^<>]*?>)(.+?)(?:<\/a>|<\/span>)/ig,
			keys: ['','url','title']
		}
	]
},{
	pattern: /\"(?:item)\"[^>]*?>[\w\W]*?<label>(.*?)<\/label>[\w\W]*?<\/ul>/ig,
	keys: ['','label'],
	data_patterns:[
		{
			pattern: /(?:<a.*?href=\"(.+?)\".*?>|<span[^<>]*?>)(.+?)(?:<\/a>|<\/span>)/ig,
			keys: ['','url','title']
		}
	]
});