(function() {
  function asyncLoad() {
    var urls = [
      '//productreviews.shopifycdn.com/assets/v4/spr.js?shop=xn-cck2ba4clb3006j264b.myshopify.com'
    ];
    for (var i = 0; i < urls.length; i++) {
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.async = true;
      s.src = urls[i];
      var x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);
    }
  }
  asyncLoad();
})();
