(function(fb){
  function Land(options){
    this.ctx = options.ctx;
    this.img = options.img;
    this.speed = 3;
    this.width = options.width;
    this.x = options.x;
    this.y = options.y;
  }
  Land.prototype.draw = function(){
    // 控制陆地的移动速度
    this.x -= this.speed;
    if(this.x < -this.width){
      // 当前图片移出画布后重新回到最右侧
      this.x += 4 * this.width;
    }
    // 绘制单张图片
    this.ctx.drawImage(this.img,this.x,this.y);
  }

  fb.Land = Land;
})(FB)