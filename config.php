<?php

$C=array();

$C['ROOT_DN'] = 'api-dev.vsea.tv';


$C['ROOT'] = 'http://'.$C['ROOT_DN'].'/vseaconfig/';
$C['PLAY_URL'] = 'http://'.$C['ROOT_DN'].'/app/reveal/?u=';

$C['API_URL'] = 'http://'.$C['ROOT_DN'].'/';
$C['API_REVEAL'] = $C['API_URL'].'app/reveal/?u=';

$C['OTT_API'] = '["",""]';

$C['MERGE_URL'] = 'http://172.25.3.116:8080/app/reveal/?u=';
$C['MERGE_API'] = 'http://172.25.3.116:8080/app/reveal/';

foreach($C as $k => $v) {
	if (!defined($k))
		define($k, $v);
}

