__patterns.category.push({
	keys: ['content'],
	pattern: /\"?(?:mod-tit|itembox|blockl.)(?:\s+[^\"]+?|\s*)\"?[^<>]*?>[\w\W]+?(?=\"?(?:mod-tit|itembox|blockl.)(?:\s+[^\"]+?|\s*)\"?|$)/ig,
	ex_patterns: [

		{
			keys:['','category'],
			pattern: /<h\d+[^<>]*?>([\w\W]+?)<\/h\d+>/i
		}
	],
	data_patterns: __patterns.item
});