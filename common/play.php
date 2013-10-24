
var __URL__='{src_url}';
var api_url = (window.netip && window.netip!='')? 'http://'+window.netip+':8080/app/reveal/?u=' : '<?php echo PLAY_URL;?>';

document.write('<html><head><title>back</title></head><body>loading...<br /><a href="javascript:window.javatojs.back();" >back</a></body></html>');
window.location.href=PLAY_URL+encodeURIComponent(__URL__)+'&playmode=play';
