__patterns.item.push({
	keys: '|img|url|title|subtitle|view'.split('|'),
	pattern: /\"focusvideo\">[\w\W]*?focus_player_picture\">\s*<img src=\"(.*?)\".*?>[\w\W]*?<a href=\"(.*?)\".*?>(.*?)<\/a>[\w\W]*?<a.*?>(.*?)<\/a>[\w\W]*?num\">(.*?)<\/span>/ig,
	callback: item_callback,
});
