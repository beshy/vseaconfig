<?php
include 'c_common.php';

foreach($p as &$v)
{
	$v['tpl'] = file_get_contents('http://127.0.0.1/vseaconfig/i.php?p='.$v['tpl']);
}


file_put_contents('config_sts-demo.json',json_encode($p));