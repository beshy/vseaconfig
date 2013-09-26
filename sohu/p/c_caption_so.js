__patterns.category.push({
	keys: [''],
	pattern: /\"?(?:listBox)(?:\s+[^\"]+?|\s*)\"?[^<>]*?>[\w\W]+?(?=\"?(?:listBox)(?:\s+[^\"]+?|\s*)\"?)/ig,
	ex_patterns: [
		{
			keys:['','url','category'],
			//\/to\?u=
			pattern: /show-pic\"[^<>]*?>\s*<a[^<>]*?href=\"([^\"\&]*)[^\"]*?\"[^<>]*?title=\"([^\"]+?)\"[^<>]*?>/i
		}
	],
	data_patterns: [{
		pattern: /show-pic[^<>]*?>\s*<a[^<>]*?href=\"([^\"\&]*)[^\"]*?\"[^<>]*?title=\"([^\"]+?)\"[^<>]*?>\s*<img[^<>]*?src=\"(.*?)\"[^<>]*?>[\w\W]*?<\/div/ig,
		keys: ['','url','title','img'],
		ex_patterns: [
			{
				keys: ['','view'],
				pattern: /super[^<>]*?>\s*(.*?)\s*</i
			},
			{
				keys: ['','subtitle'],
				pattern: /<i[^<>]*?>(.*?)<\/i/i
			}
		],
		callback: function(d){
			if (d && d.url)
				d.url = decodeURIComponent(d.url);
		}
	}, {
		pattern: /serie-list[^<>]*?>[\w\W]*?<\/div/ig,
		sub_patterns: [{
			pattern: /<a[^<>]*?href=\"([^\"\&]+)[^\"]*?\"[^<>]*?>(.*?)<\/a>/ig,
			keys: ['','url','title'],
			callback: function(d){
				if (d && d.url)
					d.url = decodeURIComponent(d.url);
				d.img = 'blank';
				filter_video_data(d);
			}
		}]
	}],
	callback: function(d){
		if (d && d.category && d.url) {
			//d.category = '<a href="'+decodeURIComponent(d.url)+'">'+d.category+'<\/a>';
			d.category = '<a href="'+d.url+'">'+d.category+'<\/a>';
		}
	}
});



__patterns.category.push({
	keys: [],
	pattern: /\skeyWord\s[^<>]*?>[\w\W]+$/g,
	data_patterns: [{
		pattern: /<li\s*(?:plid=\"?(\d+)\"?\s*|[^<>]*?)>\s*[\w\W]+?<\/li>/ig,
		keys: ['','pid'],
		ex_patterns: [
			{
				keys: ['','url','title'],
				pattern: /tit[^<>]*?>\s*<a[^<>]*?href=\"([^\"\&]+)[^\"]*?\"[^>]*?>\s*(.*?)\s*<\/a>/i
			},

			{
				keys:['','img'],
				pattern: /pic[^<>]*?>\s*<a[^<>]*?>\s*<img[^<>]*?src=\"\s*(.+?)\"[^<>]*?>/i
			},

			{
				keys: ['','subtitle'],
				pattern: /pmt2[^>]*?>\s*([^<>]*?)<\/span/i
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
			}
		],
		callback: function(d){
				console.log(d.url, d.title);
				if (d && d.url)
					d.url = decodeURIComponent(d.url);
				filter_video_data(d);
			}
	}]
});

	