
__patterns.select.push({
	pattern: /sortbox[^<>]*?>[\w\W]*?<\/div>/ig,
	sub_patterns: [{
		pattern: /<dl[^<>]*?>\s*<dt[^<>]*?>\s+(.*?)\s+<[\w\W]*?<\/dl>/ig,
		keys: ['', 'label'],
		data_patterns: [
			{
				pattern: /<a[^<>]*?(?:class=\"on\"|href=\"(.*?)\")[^<>]*?>\s*(.*?)\s*<\/a>/ig,
				keys: ['','url','title']
			}
		]
	}]
});