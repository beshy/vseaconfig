<?php

$p=array(

// ---------------------------------------------------------
// common
// ---------------------------------------------------------

	array(
		'url' => '^(http\:\/\/)(m\.tv\.sohu\.com\/.*|v\.youku\.com\/v_show\/id_.*|www\.tudou\.com\/.+|m\.iqiyi\.com\/.+|m\.56\.com\/.+|m\.letv\.com\/vplay.+|m\.ku6\.com\/show\/.+|v\.ifeng\.com\/.+)$',
		'tpl' => 'common/check',
		'type' => '1',
	),

	array(
		'url' => '^(http\:\/\/)[^\/]+\/app\/(vqq|yinyuetai)\/.*$',
		'tpl' => 'common/blank',
		'type' => '1',
	),


// ---------------------------------------------------------
// youku
// ---------------------------------------------------------

	//array(
	//	'url' => '^(http\:\/\/)?v\.youku\.com\/v_show\/id_.*$',
	//	'tpl' => 'common/play',
	//	'type' => 0,
	//),

	//array(
	//	'url' => '^(http\:\/\/)?((?!(m|wap|3g|mobile)\.)([a-zA-z0-9_-]+\.|)youku\.com|(www\.)?soku\.com\/search[_\/]video).*$',
	//	'tpl' => 'youku/home'
	//),

	array(
		'url' => '^(http\:\/\/)?(www\.)?soku\.com\/search[_\/]video.*$',
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



