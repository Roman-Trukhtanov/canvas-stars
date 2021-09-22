export default class Star {
  constructor(
    canvas,
    ctx,
    { cx, cy, spikes, outerRadius, innerRadius, color }
  ) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.cx = cx;
    this.cy = cy;
    this.spikes = spikes;
    this.outerRadius = outerRadius;
    this.innerRadius = innerRadius;
    this.color = color;

    this.starPath = new Path2D();
  }

  _drawStar() {
    const step = Math.PI / this.spikes;
    let rotate = (Math.PI / 2) * 3;
    let x = this.cx;
    let y = this.cy;

    for (let i = 0; i < this.spikes; i++) {
      // OUTER
      x = this.cx + Math.cos(rotate) * this.outerRadius;
      y = this.cy + Math.sin(rotate) * this.outerRadius;
      this.starPath.lineTo(x, y);
      rotate += step;

      // INNER
      x = this.cx + Math.cos(rotate) * this.innerRadius;
      y = this.cy + Math.sin(rotate) * this.innerRadius;
      this.starPath.lineTo(x, y);
      rotate += step;
    }

    // FILL STAR PATH
    this.ctx.fillStyle = `${this.color}`;
    this.ctx.fill(this.starPath);
  }

  draw() {
    this._drawStar();
  }
}
