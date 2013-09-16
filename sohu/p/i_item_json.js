__patterns.item.push({
	pattern: /\{[\w\W]*?\}[\,\]]/ig,
	//
	keys: [''],
	ex_patterns: [
		{
			keys:['','img'],
			pattern: /videoImage\"\:\"(.*?)\"[\,\}]/i
		},

		{
			keys: ['','playLength'],
			pattern: /playLength\"\:(\d+)[\,\}]/i
		},

		{
			keys: ['','iid'],
			pattern: /videoId\"\:(\d+)[\,\}]/i
		},

		{
			keys: ['','url'],
			pattern: /videoUrl\"\:\"(.*?)\"[\,\}]/i
		},

		{
			keys: ['','title'],
			pattern: /videoName\"\:\"(.*?)\"[\,\}]/i
		},

		{
			keys: ['','subtitle'],
			pattern: /videoSubName\"\:\"(.*?)\"[\,\}]/i
		}

	],
	callback: filter_video_data
});
