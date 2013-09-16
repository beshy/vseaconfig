

<div class="search">
	<form method="get" action="" onsubmit="return false;" >
		<input type="text" id="search_input" name="s" value="" class="search_input" />
		<input type="submit" value="" class="search_button" onclick="if (this.form.s.value.length>0) window.location.href='http://so.tv.sohu.com/mts?box=1&wd='+encodeURIComponent(this.form.s.value)" />
	</form>
</div>


<div id="nav"><div class="nav"><a href="http://tv.sohu.com/">首页</a><a href="http://so.tv.sohu.com/list_p11_p2_p3_p4-1_p5_p6_p70_p80_p9_2d2_p101_p11.html">全部</a></div></div>
<div id="selecter"></div>
<div id="cv"></div>
<div id="pager0"></div>
<div id="container" class="container"></div>
<div id="pager1"></div>

<div class="footer">
<p class="copyright">Copyright©2012 搜狐视频 tv.sohu.com 版权所有<p>
</div>

<script>
if (__patterns['search_text']) document.getElementById('search_input').value = __patterns['search_text'];
</script>