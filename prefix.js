;
window.PLAY_URL = (window.netip && window.netip!='')? 'http://'+window.netip+'/app/reveal/?u=' : '<?php echo PLAY_URL;?>';
window.MERGE_URL = (window.netip && window.netip!='')? 'http://'+window.netip+'/app/reveal/?u=' : '<?php echo MERGE_URL;?>';
window.MERGE_API = (window.netip && window.netip!='')? 'http://'+window.netip+'/app/reveal/' : '<?php echo MERGE_API;?>';
window.OTT_APIS = <?php echo OTT_API;?>;
window.OTT_API = (window.nettype && window.nettype == 'u') ? OTT_APIS[1] : OTT_APIS[0];
window.OTT_API = (window.netottip && window.netottip!='')? 'http://'+window.netottip+'/ott/play/ott' : OTT_API;
window.SHOW_TAB = 'yes';
