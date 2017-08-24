(function(fb){

  function Bird(options){
    // 小鸟的坐标
    this.x = options.x || 100;
    this.y = options.y || 100;
    this.ctx = options.ctx;
    this.img = options.img;
    this.width = 52;
    this.height = 45;
    this.index = 0;
    this.acc = 0.0005;
    this.v = 0;
    this.maxSpeed = 0.5;
    this.maxAngle = Math.PI/4;
    this.cy = this.y;

  }

  Bird.prototype.draw = function(deltaTime){
    // 保存坐标系的原始状态
    this.ctx.save();
    // 计算两帧之间的位移量
    // 计算当前速度
    this.v += this.acc * deltaTime;
    // 绘制两幅图时间间隔之间，垂直方向的位移：
    var h = this.v * deltaTime + this.acc * deltaTime * deltaTime / 2;
    // 计算此时小鸟的canvas坐标
    this.cy += h;
    // 把坐标原点移动到小鸟的中心
    this.ctx.translate(this.x,this.cy);

    // 控制小鸟的头部旋转
    // 当前角度 = 当前速度 / 最大速度 * 最大角度
    var currentAngle = this.v / this.maxSpeed * this.maxAngle;
    if(currentAngle > this.maxAngle){
      // 限制最大旋转角度
      currentAngle = this.maxAngle;
    }
    this.ctx.rotate(currentAngle);

    // 绘制小鸟（此时使用的是平移之后的坐标系）
    this.ctx.drawImage(this.img,this.index * this.width,0,this.width,this.height,-this.width/2,-this.height/2,this.width,this.height);

    // 恢复坐标系的原始状态
    this.ctx.restore();
  }

  fb.Bird = Bird;

})(FB)