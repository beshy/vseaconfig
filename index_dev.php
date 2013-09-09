<?php
define('ROOT', '');
define('DEBUG', 1);
define('DEVMODE', 1);
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



if (isset($_GET['p']))
{
	$p=$_GET['p'];
	echo '<script>';
	include $p.'.php';
	echo '</script>';
}
