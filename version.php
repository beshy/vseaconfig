<?php
clearstatcache();
$__DIR__ = dirname(__FILE__).DIRECTORY_SEPARATOR;
$v = array(
	'pattern' => filemtime($__DIR__.'config.json'),
);
echo json_encode($v);
