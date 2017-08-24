(function(fb){
  function Game(ctx){
    this.ctx = ctx;
    this.timer = 0;
    this.isRunning = true;
    this.currentTime = 0;
    this.lastTime = new Date();
    this.deltaTime = 0;
    this.imgs = ['birds','land','sky','pipe1','pipe2'];
  }

  Game.prototype.start = function(){
    var that = this;
    FB.loadImages(that.imgs,function(imgList){
      // 存储所有的图片实例对象
      var imgObjs = [];

      // 实例化天空
      var skyImg = imgList['sky'];
      for (var i = 0; i < 2; i++) {
        var sky = new fb.Sky({
          ctx : that.ctx,
          img : skyImg,
          x : i * that.ctx.canvas.width,
          y : 0
        });
        imgObjs.push(sky);
      }

      // 绘制管道
      var topImg = imgList['pipe2'];
      var bottomImg = imgList['pipe1'];
      for (var i = 0; i < 6; i++) {
        var p = new fb.Pipe({
          ctx : that.ctx,
          timg : topImg,
          bimg : bottomImg,
          x : i * topImg.width * 3
        });
        imgObjs.push(p);
      }

      // 实例化陆地
      var landImg = imgList['land'];
      for (var i = 0; i < 4; i++) {
        var land = new fb.Land({
          ctx : that.ctx,
          img : landImg,
          x : i * landImg.width,
          y : that.ctx.canvas.height-landImg.height,
          width : landImg.width
        });
        imgObjs.push(land);
      }

      // 获取加载成功小鸟图片对象
      var birdImg = imgList['birds'];
      // 实例化小鸟
      var bird = new fb.Bird({
        ctx : that.ctx,
        img : birdImg
      });
      imgObjs.push(bird);

      // 控制小鸟向上移动
      that.ctx.canvas.onclick = function(){
        bird.v = -0.3;
      }

      // 启动游戏
      function action(){
        // 清空画布(此时使用的是原始坐标系)
        that.ctx.clearRect(0,0,that.ctx.canvas.width,that.ctx.canvas.height);
        // 计算绘制两幅图之间的时间间隔
        // 当前时间
        that.currentTime = new Date();
        // 绘制两幅图之间的时间间隔
        that.deltaTime = that.currentTime - that.lastTime;
        // 把当前时间作为下次的最新时间
        that.lastTime = that.currentTime;

        // 开启新路径
        that.ctx.beginPath();
       
        // 绘制所有的图片
        for (var i = 0; i < imgObjs.length; i++) {
          imgObjs[i].draw(that.deltaTime);
        }

        // 控制小鸟精灵图的索引变化
        if(bird.index == 2){
          // 已经是最后一张，然后从新回到第一张
          bird.index = 0;
        }else{
          bird.index++;
        }
        
        // 判断小鸟撞到陆地
        if(bird.cy > that.ctx.canvas.height - landImg.height - bird.height/2){
          // 已经接触到陆地
          that.isRunning = false;
        }
        // 判断小鸟是否撞到管道
        if(that.ctx.isPointInPath(bird.x,bird.cy)){
          // 已经接触到管道
          that.isRunning = false;
        }

        // 控制游戏的结束
        if(that.isRunning){
          requestAnimationFrame(action);
        }
      }
      action();
    });
  }
  
  fb.Game = Game;
})(FB);