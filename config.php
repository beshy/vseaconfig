<?php

$C=array();

//$C['PLAY_URL'] = 'http://10.2.2.183:8080/app/reveal/?mode=getRtspUrl&quality=1&mux=ts&u=';
//$C['PLAY_URL'] = "http://10.2.2.183:8080/polymer/play/play.php?quality=1&u=";
$C['PLAY_URL'] = "http://10.2.2.183:8080/portal/ottplay/play.php?q=1&u=";


foreach($C as $k => $v) {
	if (!defined($k))
		define($k, $v);
}

