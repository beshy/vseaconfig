<?php
$url='http://www.youku.com/';
//$url=dirname(__FILE__).DIRECTORY_SEPARATOR.'t.htm';
$tpl='home.tpl';
?>
<?php include "tpl/data_init.php";?>

var __tpl_page=<?php echo json_encode(fetch(dirname(__FILE__).DIRECTORY_SEPARATOR.$tpl));?>;

<?php
include "tpl/category.php";
include "tpl/li.php";

// common
include 'common.js';

?>


// all list
if (/^(http\:\/\/)?(www\.|)youku\.com\/v($|\/$|_showlist.*|_olist.*)/i.test(__src_url)) {
	<?php 
		//include 'p/n_nav_v.js';
		include 'p/i_item_v.js';
		include 'p/p_page.js';
		include 'p/s_select.js';
	?>
} else {

	// search
	if (/^(http\:\/\/)?www\.?soku\.com\/search_video\/.*$/i.test(__src_url)) {
		
		var p = /sotxt[^<>]*?value=[\"\']([^\"\']*?)[\"\']/i;
		var m=null;
		if ( (m=p.exec(__src_code))!=null ) {
			__patterns.search_text=m[1];
		}

		<?php 
			include 'p/i_item.js';
			include 'p/p_page.js';
		?>


	} else if (/^(http\:\/\/)?www\.youku\.com\/show_page\/id_.*$/i.test(__src_url)) {


		// show page
		<?php
		include 'p/i_show_page.js';
		include 'p/p_show_page.js';
		?>

		;window.__parseCallback=function(){
			if ( !__parse.ca_not_empty && !__parse.data_not_empty )
			{
				var src = window.__src_code;
				var p1 = /<li\s*class=\"link\"\s*>\s*<a[^<>]*?href="(.*?)"[^<>]*?>/i;
				var p2 = /videoUrl\:[\'\"](http:\/\/v.youku.com\/v_show\/id_.*?)[\'\"]/i;
				var m=null;
				if ( (m=p1.exec(src))!=null || (m=p2.exec(src))!=null )
				{
					//setTimeout(function(){
						//window.history.back();
					//},10000);
					document.write('<html><head><title>back</title></head><body>loading...<br /><a href="javascript:window.javatojs.back();" >back</a></body></html>');
					window.location.href='<?php echo PLAY_URL;?>'+encodeURIComponent(m[1])+'&playmode=play';
				}
			}
		};


	} else if (/^(http\:\/\/)?www\.youku\.com\/show_episode\/id_.*$/i.test(__src_url)) {

		// show episode
		<?php
			include 'p/i_show_page.js';
		?>

	} else if (/^(http\:\/\/)?(www|tv|movie|comic|music|zy|news)\.?youku\.com\/?$/i.test(__src_url)){

		
		<?php
			include 'p/i_item.js';

			// category
			include 'p/c_caption.js';
		?>

	} else {

		<?php
			include 'p/i_item_v.js';

			include 'p/p_page.js';
		?>
	}


}


<?php include "tpl/parse.php";?>
