(function(fb){
  function Sky(options){
    this.ctx = options.ctx;
    this.x = options.x;
    this.y = options.y;
    this.speed = 3;
    this.img = options.img;
  }

  Sky.prototype.draw = function(){
    // 控制背景向移动
    this.x -= this.speed;
    if(this.x < -this.ctx.canvas.width){
      // 如果该背景图已经移出了画布，那么重新向右移动两个画布的宽度，其实就是重新回到右侧
      this.x += 2 * this.ctx.canvas.width;
      // this.x = this.ctx.canvas.width;
    }
    this.ctx.drawImage(this.img,this.x,this.y);
  }

  fb.Sky = Sky;
})(FB)