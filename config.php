<?php

$C=array();

$C['HLS_URL'] = '"http://221.6.85.155:8080/app/reveal/?u="+encodeURIComponent(data.u)+data.ext';

// private network
$C['OTT_URL'] = 'window.stbid ? "http://221.6.85.155:8090/need/play/"+(window.stbid ? window.stbid.replace("stbid=",""): "undefined")+"/"+encodeURIComponent("http://10.65.255.9:8090/polymer/play/play.php?u="+encodeURIComponent(data.u)+data.ext+"&mode=getMergeUrl&seek=OTT&r=http://10.65.255.9:8090/ott_main.html") : "api://getStbid:"+o.url';


// public network
//$C['OTT_URL'] = 'window.stbid ? "http://221.6.85.155:8090/need/play/"+(window.stbid ? window.stbid.replace("stbid=",""): "undefined")+"/"+encodeURIComponent("http://221.6.85.155:8080/polymer/play/play.php?u="+encodeURIComponent(data.u)+data.ext+"&mode=getMergeUrl&seek=OTT&r=http://221.6.85.155:8080/ott_main.html") : "api://getStbid:"+o.url';


foreach($C as $k => $v) {
	if (!defined($k))
		define($k, $v);
}

