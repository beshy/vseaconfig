__patterns.item.push({
	pattern: /thumb\"[\w\W]*?(?=thumb\"|$)/ig,
	keys: [''],
	ex_patterns: [
		{
			keys:['','img'],
			pattern: /<img.*?src=\"(.+?)\".*?>/i
		},

		{
			keys: ['','url','title'],
			pattern: /title\"[^<>]*?>\s*<a.*?href=\"(.+?)\"[^>]*?>\s*([\w\W]+?)\s*<\/a>/i
		},

		{
			keys: ['','time'],
			pattern: /(?:time|status)[^<>]*?>\s*([^<>]+?)\s*</i
		},

		{
			keys: ['','subtitle'],
			pattern: /entry[^<>]*?>\s*<span>\s*([^<>]+?)\s*<\//i
		},

		{
			keys: ['', 'view'],
			pattern: /num[^<>]*?>([^<>]+?)</i
		}
	],
	callback: item_callback
});



__patterns.item.push({
	pattern: /<ul\s*class=\"[pv]\s*.*?\"[^>]*?>[\w\W]*?<\/ul>/ig,
	keys: ['content'],
	ex_patterns: [
		{
			keys:['','img'],
			pattern: /<img.*?src=\"(.+?)\".*?>/i
		},

		{
			keys: ['','url','title'],
			pattern: /\"[pv]_title\">\s*<a.*?href=\"(.+?)\"[^>]*?>([\w\W]+?)<\/a>/i
		},

		{
			keys: ['','time'],
			pattern: /\"(?:status\">|[pv]_time.*?\"num\">)(.+?)</i
		},

		{
			keys: ['','subtitle'],
			pattern: /\"[pv]_(?:user|actor|subtitle|type)\"[^<>]*?>(?:\s*<span[^>]*?>[\w\W]*?<\/span>\s*|)(?:\s*<label[^>]*?>[\w\W]*?<\/label>\s*|)(?:\s*<a[^>]*?>|)\s*([^<>]+?)</i
		},

		{
			keys: ['','subtitle'],
			pattern: /subtitle[^<>]*?>([^<>]+?)<\//i
		},

		{
			keys: ['', 'view'],
			pattern: /\"[pv]_(?:stat|showstat|rating)\"[\w\W]*?\"num\".*?>(.+?)</i
		}
	],
	callback: item_callback
});
