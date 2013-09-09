
var __URL__='{src_url}';
document.write('<html><head><title>back</title></head><body>loading...<br /><a href="javascript:window.javatojs.back();" >back</a></body></html>');
window.location.href='<?php echo PLAY_URL;?>'+encodeURIComponent(__URL__)+'&playmode=play';
