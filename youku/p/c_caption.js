

__patterns.category.push({
	keys: [''],
	pattern: /<div[^<>]*?yk-head[^<>]*?>[\w\W]*?(?=<div[^<>]*?yk-head[^<>]*?>|$)/ig,
	ex_patterns: [
		{
			keys:['','category'],
			pattern: /yk-title[^<>]*?>\s*<span>\s*([\w\W]*?)\s*<\/span>\s*<\/div/i
		}
	],
	data_patterns: __patterns.item
});


__patterns.category.push({
	keys: ['','category'],
	pattern: /<div[^<>]*?class=\"caption\"[^<>]*?>(?:\s*<h3[^>]*?>\s*|\s*)([\w\W]*?)(?:\s*<\/h3>\s*|\s*)<\/div>[\w\W]*?(?=<div[^<>]*?class=\"caption\"[^<>]*?>|$)/ig,
	data_patterns: __patterns.item
});



