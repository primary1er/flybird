(function(fb){
  function Pipe(options){
    this.ctx = options.ctx;
    this.timg = options.timg;
    this.bimg = options.bimg;
    this.width = this.timg.width;
    this.x = options.x + 400;
    this.topY = 0;
    this.bottomY = 0;
    this.spaceHeight = 200;
    this.speed = 3;
    this.initHeight();
  }

  Pipe.prototype.draw = function(){
    // 初识化管道纵坐标
    // 控制管道左移
    this.x -= this.speed
    if(this.x < -3 * this.width){
      // 控制一组管道重新回到最右侧
      this.x += 3 * this.width * 6;
    }
    // 绘制顶部管子
    this.ctx.drawImage(this.timg,this.x,this.topY);
    // 绘制底部管子
    this.ctx.drawImage(this.bimg,this.x,this.bottomY);
    // 绘制管道对应的路径
    this.drawPath();
  }
  // 初始化管道的坐标
  Pipe.prototype.initHeight = function(){
    // 随机生成顶部管道的y坐标
    this.topY = -Math.random() * 80 - 200;
    // 随机生成底部管道的y坐标
    this.bottomY = this.topY + this.timg.height + this.spaceHeight;
  }

  // 绘制管道边界路径，用于碰撞检测
  Pipe.prototype.drawPath = function(){
    // 绘制顶部管道的边界路径
    this.ctx.rect(this.x,this.topY,this.timg.width,this.timg.height);
    // 绘制底部管道的边界路径
    this.ctx.rect(this.x,this.bottomY,this.bimg.width,this.bimg.height);
  }

  fb.Pipe = Pipe;
})(FB);