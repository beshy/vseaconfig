
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
			pattern: /pmt2[^>]*?>\s*(.*?)<\/span/i
		},

		{
			keys: ['','time'],
			pattern: /i>(.*?)<\/i/i
		},

		{
			keys: ['','view'],
			pattern: /acount[^<>]*?>\s*(.*?)\s*</i
		},

		{
			keys: ['','iid'],
			pattern: /\s+rel=\"?(\d+)\"?/i
		},

		{
			keys: ['','url','title'],
			pattern: /tit[^<>]*?>\s*<a[^<>]+?href=\"([^\"]+?)\"[^>]*?>\s*([^<].*?)\s*<\/a>/i
		}

	],
	callback: filter_video_data
});