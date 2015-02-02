<?php

$p=array(

// ---------------------------------------------------------
// common
// ---------------------------------------------------------

	array(
		'url' => '^([^\/]*?\:\/\/)(m\.tv\.sohu\.com\/.*|v\.youku\.com\/v_show\/id_.*|www\.tudou\.com.*|m\.iqiyi\.com\/play\.html.+|www\.iqiyi\.com\/v_.+|m\.iqiyi\.com\/._.+|m\.56\.com\/.+|m\.letv\.com\/vplay.+|m\.ku6\.com\/show\/.+|v\.ifeng\.com\/.+|m\.pptv\.com\/show\/.+|m\.pps\.tv\/play.+|mv\.yinyuetai\.com.*|[^\.]+\.yinyuetai\.com\/(video|playlist)\/.+|[^\.]+\.yinyuetai\.com\/wap\/(video|playlist)\/.+|[^\/]+\/app\/yinyuetai\/movie.+|[^\/]+\/app\/soku.+)$',
		'tpl' => 'common/check',
		'type' => '1',
	),

	array(
		'url' => '^([^\/]*?\:\/\/)(m\.iqiyi\.com\/*|m\.pps\.tv\/*|m.letv.com\/*)$',
		'tpl' => 'common/hack',
		'type' => '1',
	),


);



