
if (undefined == window.__api_url)
	__api_url = '<?php echo API_URL;?>';
if (undefined == window.__api_reveal)
	__api_reveal = '<?php echo API_REVEAL;?>';


var __parsee=document.createElement('script');
__parsee.setAttribute('src', '<?php echo ROOT;?>parse.js');
document.head.appendChild(__parsee);
