<?php

$p=array(

// ---------------------------------------------------------
// common
// ---------------------------------------------------------

	array(
		'url' => '^(http\:\/\/)(m\.tv\.sohu\.com\/.*|v\.youku\.com\/v_show\/id_.*)$',
		'tpl' => 'common/check',
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

);



