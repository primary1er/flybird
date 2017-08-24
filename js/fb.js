(function(window){
  var FB = {};

  FB.loadImages = function(arr,callback){
    // 记录加载成功的图片个数
    var total = 0;
    // 存储所有加载成功图片对象
    var imgList = {};
    arr.forEach(function(item){
      console.log(item);
      var img = new Image();
      img.src = 'img/'+item+'.png';
      img.onload = function(){
        // 当有一个图片加载成功时，调用该函数
        total++;
        imgList[item] = img;
        if(total == arr.length){
          // 计数器total如何与图片列表数量相同时，表示加载完成
          // 加载完成后，调用回调函数，并且把所有加载成功的图片对象作为实参传递给回调函数
          callback(imgList);
        }
      }
    });
  }

  window.FB = FB;
})(window)