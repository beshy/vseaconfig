<?php
define('ROOT', '');
define('DEBUG', 1);
include 'config.php';
header("Content-Type: text/html; charset=UTF-8");

function fetch( $__FILE__, $__TYPE__='file' )
// BEGIN fetch
{
	$key = '__fetch';
	$GLOBALS[$key]='';
	switch ($__TYPE__)
	{
		case 'file':
			if ($__FILE__=realpath($__FILE__))
			{
				ob_start('fetchback');
				include $__FILE__;
				ob_end_flush();
				return $GLOBALS[$key];
			}
			break;
		
		case 'string':
			ob_start('fetchback');
			eval(" ?>$__FILE__<?php ");
			ob_end_flush();
			return $GLOBALS[$key];
			break;
		
		default:
			break;
	}
			
	return false;
}
// END fetch

function fetchback( $buffer )
// BEGIN fetchback
{
	$GLOBALS['__fetch'].=$buffer;
	return '';
}
// END fetchback


$echos = isset($_GET['s'])? 0 : 1 ;

if (isset($_GET['p']))
{
	$p=$_GET['p'];
	if ($echos)
		echo '<script>stbid=123;';

	echo "\nwindow.PLAY_URL = (window.netip && window.netip!='')? 'http://'+window.netip+':8080/app/reveal/?u=' : '".PLAY_URL."';\n";
	include $p.'.php';
	if ($echos)
		echo '</script>';
}
