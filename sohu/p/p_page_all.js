;
__patterns.page.push({
	pattern: /<div[^<>]*?page[^>]*?>[\w\W]*?<\/div>[\w\W]*?<\/div>/ig,
	data_patterns:[
		{
			pattern: /(?:<a[^<>]*?href=\"(.+?)\"[^<>]*?>|<span[^>]*?>|<strong[^>]*?>)(.+?)(?:<\/a>|<\/span>|<\/strong>)/ig,
			keys: ['','url','title']
		}
	]
});
