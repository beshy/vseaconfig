<?php
$url='http://www.tudou.com/';
//$url=dirname(__FILE__).DIRECTORY_SEPARATOR.'huoyin.htm';
$tpl=dirname(__FILE__).DIRECTORY_SEPARATOR.'home.tpl';
?>
<?php include "tpl/data_init.php";?>
<script>
<?php
include 'p/common.js';

// menu
include 'p/n_nav.js';

// items
include 'p/i_item_list.js';
include 'p/i_today.js';
include 'p/i_item.js';

// category
include 'p/c_caption.js';
include 'p/p_page.js';
?>
</script>
<?php include "tpl/parsedata.php";?>
