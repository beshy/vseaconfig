<?php

$p=array(



// ---------------------------------------------------------
// youku
// ---------------------------------------------------------

	array(
		'url' => '^(http\:\/\/)?v\.youku\.com\/v_show\/id_.*$',
		'tpl' => 'common/play',
		'type' => '0',
	),

	array(
		'url' => '^(http\:\/\/)?((?!(m|wap|3g|mobile)\.)([a-zA-z0-9_-]+\.|)youku\.com|(www\.)?soku\.com\/search[_\/]video).*$',
		'tpl' => 'youku/home',
		'type' => '0',
	),


// ---------------------------------------------------------
// http://tv.sohu.com/
// ---------------------------------------------------------
	array(
		'url' => '^(http\:\/\/)?(?:tv|my\.tv|store\.tv)\.sohu\.com\/(?:.*?\/n.*?\.shtml|u\/[vp]w\/|view).*?$',
		'tpl' => 'common/play',
		'type' => '0',
	),

	array(
		'url' => '^(http\:\/\/)?(?:tv|hot\.vrs|so\.tv|my\.tv)\.sohu\.com.*$',
		'tpl' => 'sohu/home',
		'type' => '0',
	),


);



