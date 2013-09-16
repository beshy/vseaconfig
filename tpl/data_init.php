<?php


function net_curl( $url, $o=array(), $e=3600, $retryCount=3 )
{ // BEGIN curl
	// check cache
	if (!is_array($o))
		$o = array();

	$options = array(
				CURLOPT_RETURNTRANSFER => true,     // return web page        
				CURLOPT_HEADER         => false,    // don't return headers        
				CURLOPT_FOLLOWLOCATION => true,     // follow redirects        
				CURLOPT_ENCODING       => "",       // handle all encodings        
				CURLOPT_USERAGENT      => 'gnome-vfs/2.24.2 Firefox/3.5.2', // who am i        
				CURLOPT_AUTOREFERER    => true,     // set referer on redirect        
				CURLOPT_CONNECTTIMEOUT => 60,      // timeout on connect        
				CURLOPT_TIMEOUT        => 60,      // timeout on response        
				CURLOPT_MAXREDIRS      => 10,       // stop after 10 redirects    
			) + $o;


	$retry=0;
	$c='';
	while( empty($c) && $retry < $retryCount ){	

		$ch = curl_init( $url );

		curl_setopt_array( $ch, $options );

		$c = curl_exec( $ch );    

		$errno = curl_errno( $ch );    
		//$errmsg = curl_error( $ch );    
		$header = curl_getinfo( $ch );  

		curl_close( $ch );

		//error: bad url, timeout, redirect loop ...  
		if ( $errno != 0 )
			return FALSE;

		$retry++;  
	}  

	//error: no page, no permissions, no service ...
	if ( $header['http_code'] != 200 && $header['http_code'] != 302)
		return FALSE;
	return $c;
} // END curl

if (defined('DEBUG') && DEBUG)
{
	if (empty($f))
		$c = net_curl($url);
	else
		$c = file_get_contents($f);
		
	$c = mb_convert_encoding($c, 'UTF-8','ascii,GB2312,gbk,UTF-8');
	//if (empty($f))
	//	$c = str_replace('<head>', '<head><base href="'.$url.'" target="_blank">', $c);

	$j = json_encode($c);
	if (empty($j))
	{
		echo 'get url content error or charset error.';
		exit;
	}
	$u = $url;
}
else
{
	$j='{src_code}';
	$u='{src_url}';
}
?>

window.__src_code = <?php echo $j;?>;
window.__src_url = '<?php echo $u;?>';

