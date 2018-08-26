<?php
  $crossUrl='https://search.cdn.huya.com/?callback=ss&m=Search&do=getSearchContent&q=%E4%B8%80%E8%B5%B7%E7%9C%8B&uid=0&v=4&typ=-5&livestate=0&rows=16&_=1535198331629';   //向其他域下发出请求
  $res = file_get_contents($crossUrl);
  echo $res;
?>
