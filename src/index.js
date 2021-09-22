import Star from '@/js/components/Star';
import stars from '@/js/data/stars';

import '@/styles/main.scss';

const DEFAULT_CANVAS_COLOR = 'white';

// MAIN CANVAS ITEMS
const majorCanvasElement = document.getElementById('major-canvas');
const binderCanvasElement = document.getElementById('binder-canvas');

class StarsApp {
  constructor(majorCanvas, binderCanvas, starsData) {
    this.majorCanvas = majorCanvas;
    this.majorContext = majorCanvas.getContext('2d');
    this.starsData = starsData;

    this.binderCanvas = binderCanvas;
    this.binderContext = binderCanvas.getContext('2d');

    this.stars = [];

    this.onMajorCanvasClick = this.onMajorCanvasClick.bind(this);
    this.onMajorCanvasMouseMove = this.onMajorCanvasMouseMove.bind(this);
  }

  init() {
    this.fillCanvas(this.majorCanvas, this.majorContext, DEFAULT_CANVAS_COLOR);
    this.fillCanvas(
      this.binderCanvas,
      this.binderContext,
      DEFAULT_CANVAS_COLOR
    );
    this.initStars();
    this.addListeners();
  }

  initStars() {
    if (!this.starsData) {
      return;
    }

    this.starsData.forEach((star) => {
      this.createStar(star);
    });
  }

  createStar(star) {
    const starItem = new Star(this.majorCanvas, this.majorContext, star);
    this.stars.push(starItem);

    starItem.draw();
  }

  fillCanvas(canvas, ctx, color) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  checkStarHit(evt, starPath) {
    return this.majorContext.isPointInPath(starPath, evt.offsetX, evt.offsetY);
  }

  setBodyCursorPointer(flag) {
    if (flag) {
      document.body.classList.add('_pointer');
    } else {
      document.body.classList.remove('_pointer');
    }
  }

  onMajorCanvasClick(evt) {
    let isHit = false;

    // CHECK ALL STARS
    this.stars.forEach((star) => {
      if (this.checkStarHit(evt, star.starPath)) {
        this.fillCanvas(this.binderCanvas, this.binderContext, star.color);
        isHit = true;
      }
    });

    // HIT ON WHITE ZONE
    if (!isHit) {
      this.fillCanvas(
        this.binderCanvas,
        this.binderContext,
        DEFAULT_CANVAS_COLOR
      );
    }
  }

  onMajorCanvasMouseMove(evt) {
    let isEnter = false;

    this.stars.forEach((star) => {
      if (this.checkStarHit(evt, star.starPath)) {
        this.setBodyCursorPointer(true);
        isEnter = true;
      }
    });

    if (!isEnter) {
      this.setBodyCursorPointer(false);
    }
  }

  addListeners() {
    this.majorCanvas.addEventListener('click', this.onMajorCanvasClick);
    this.majorCanvas.addEventListener('mousemove', this.onMajorCanvasMouseMove);
  }
}

const starsApp = new StarsApp(majorCanvasElement, binderCanvasElement, stars);
starsApp.init();
