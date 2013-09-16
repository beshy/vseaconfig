
__patterns.select.push({
	pattern: /menu[^<>]*?>\s*<h\d[^<>]*?>\s*(.*?)\s*<\/h\d>[\w\W]*?<\/div>/ig,
	keys: ['', 'label'],
	data_patterns: [
		{
			pattern: /(?:class=\"on\"[^<>]*?>\s*<a|href=\"(.*?)\")[^<>]*?>\s*(.*?)\s*<\/a>/ig,
			keys: ['','url','title']
		}
	]
});

__patterns.select.push({
	pattern: /(?:dl)[^<>]*?>\s*<dt[^<>]*?>\s*(.*?)\s*<\/dt>[\w\W]*?<\/dl>/ig,
	keys: ['', 'label'],
	data_patterns: [
		{
			pattern: /(?:href=\".*?\"[^<>]*?class=\"on\"|href=\"(.*?)\")[^<>]*?>\s*(.*?)\s*<\/a>/ig,
			keys: ['','url','title']
		}
	]
});



