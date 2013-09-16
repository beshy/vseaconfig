
__patterns.item.push({
	pattern: /<li\s*(?:plid=\"?(\d+)\"?\s*|[^<>]*?)>\s*[\w\W]+?<\/li>/ig,
	keys: ['','pid'],
	ex_patterns: [
		{
			keys:['','img'],
			pattern: /pic[^<>]*?>\s*<a[^<>]*?>\s*<img[^<>]*?src=\"\s*(.+?)\"[^<>]*?>/i
		},

		{
			keys: ['','subtitle'],
			pattern: /<p[^>]*?>(?:[^<>]*?<a[^<>]*?>|)\s*(.*?)</i
		},

		{
			keys: ['','time'],
			pattern: /maskTx\"[^<>]*?>(.*?)</i
		},

		{
			keys: ['','view'],
			pattern: /super[^<>]*?>\s*(.*?)\s*</i
		},

		// {
		// 	keys: ['','iid'],
		// 	pattern: /\s+rel=\"?(\d+)\"?/i
		// },

		{
			keys: ['','url','title'],
			//pattern: /<a[^<>]+?href=\"([^\"]+?)\"[^>]*?>\s*(?!<img)([^<].*?)\s*<\/a>/i
			pattern: /strong[^<>]*?>\s*<a[^<>]+?href=\"([^\"]+?)\"[^>]*?>\s*([^<].*?)\s*<\/a>/i
		}

	],
	callback: filter_video_data
});