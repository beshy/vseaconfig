<?php
$url = 'http://tv.sohu.com/s2012/xbb/';
//$url=dirname(__FILE__).DIRECTORY_SEPARATOR.'v.htm';
$tpl=dirname(__FILE__).DIRECTORY_SEPARATOR.'home.tpl';
?>
<?php include "tpl/data_init.php";?>

<?php
include "tpl/category.php";
include "tpl/li.php";
include 'p/common.js';
?>

var __loadingfile = false;

if (/^(http\:\/\/)?hot\.vrs\.sohu\.com\/vrs_videolist\.action.*$/i.test(__src_url)) {

<?php
	include 'p/i_item_json.js';
?>

} else if (/^(http\:\/\/)?so\.tv\.sohu\.com\/list.+$/i.test(__src_url)) {

<?php
	include 'p/i_item_all.js';
	
	include 'p/s_select_all.js';
	include 'p/p_page_all.js';
?>

} else if (/^(http\:\/\/)?so\.tv\.sohu\.com\/mts.+$/i.test(__src_url)) {
	var p = /value=[\"\']([^\"\']*?)[\"\'][^<>]*?search/i;
	var m=null;
	if ( (m=p.exec(__src_code))!=null ) {
		__patterns.search_text=m[1];
	}
<?php
	include 'p/c_caption_so.js';
	
	include 'p/s_select_so.js';
	include 'p/p_page_so.js';
?>

} else if (/^(http\:\/\/)?my\.tv\.sohu\.com\/playlistVideo.+$/i.test(__src_url)) {

	(function(){
		var d = JSON.parse(__src_code);
		
		if (!d || !d.data || !d.data.list || d.data.list.length<1)
			return;
		
		window.__parseCallback = function(){
			for(var i=0; i<d.data.list.length; i++) {
				if (!d.data.list[i].video)
					return;
				var dd = d.data.list[i].video;
				var pd = {
					img: dd['smallCover'],
					title: dd['title'],
					subtitle: dd['authorName'],
					iid: dd['id'],
					url: 'http://my.tv.sohu.com/u/vw/'+dd['id'],
					playLength: dd['videoLength'],
				};
				filter_video_data(pd);
				__parse.data.push(pd);
			}
			__parse.data_not_empty=true;
		};
		
	})();
	

} else if (/^(http\:\/\/)?tv\.sohu\.com\/s\d+\/.+$/i.test(__src_url)) {
	// get playlist_id
	var pp = /playlist_id\s*\=\s*\"(\d+)\"/i;
	var pm=null;
	if ((pm=__src_code.match(pp))!=null) {
		__loadingfile=true;

		document.write('<script src="http://hot.vrs.sohu.com/vrs_videolist.action?playlist_id='+pm[1]+'"><\/script><script>'
			+ 'if (__loadingfile) {if ( typeof(vrsvideolist) != "undefined" \&\& vrsvideolist !== null ){window.__parseCallback = function(){for(var i=0; i< vrsvideolist.videolist.length; i++) {var dd = vrsvideolist.videolist[i];var pd = {img: dd["videoImage"],title: dd["videoName"],subtitle: dd["videoName"],iid: dd["videoId"],url: dd["videoUrl"],playLength: dd["playLength"]};filter_video_data(pd);__parse.data.push(pd);}__parse.data_not_empty=true;};}}'
			+ '<\/script>'
			+ '<script src="<?php echo ROOT;?>parse.js"><\/script>');

	}

} else {

<?php
	// menu
	//include 'p/n_nav.js';

	// items
	include 'p/i_item.js';
	
	// category
	include 'p/c_caption.js';
	

?>

}

if (!__loadingfile) {
	<?php include "tpl/parse.php";?>
}