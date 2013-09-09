
<div class="search">
	<form method="get" action="" onsubmit="return false;" >
		<input type="text" id="search_input" name="s" value="" class="search_input" />
		<input type="submit" value="" class="search_button" onclick="if (this.form.s.value.length>0) window.location.href='http://www.soku.com/search_video/q_'+encodeURIComponent(this.form.s.value)" />
	</form>
</div>

<div id="nav"><div class="nav">
	<a href="http://www.youku.com/">首页</a>
	<a href="http://tv.youku.com/" >电视剧</a>
	<a href="http://movie.youku.com/" >电影</a>
	<a href="http://zy.youku.com/" >综艺</a>
	<a href="http://music.youku.com/" >音乐</a>
	<a href="http://comic.youku.com/" >动漫</a>
	<a href="http://www.youku.com/v/" >全部</a>
</div>
<div id="selecter"></div>
<div id="cv"></div>
<div id="pager0"></div>
<div id="container" class="container"></div>
<div id="pager1"></div>

<div class="footer">
<p class="copyright">Copyright©2012 优酷 youku.com 版权所有<p>
</div>

<script>
if (__patterns['search_text']) document.getElementById('search_input').value = __patterns['search_text'];
</script>