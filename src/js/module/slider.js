const gap = 44; // duplicated in css

class Slider {
  wrapper;

  back;

  forward;

  offsetArray = [];

  currentSlide = 0;

  numberSlides = 0;

  constructor(wrapper) {
    this.wrapper = wrapper;
  }

  init() {
    this.tape = this.wrapper.querySelector('.js-slider__tape');
    this.back = this.wrapper.querySelector('.js-slider__button_action_back');
    this.forward = this.wrapper.querySelector('.js-slider__button_action_forward');

    const handleBack = new HandleBack(this);
    const handleForward = new HandleForward(this);

    this.back.addEventListener('click', handleBack);
    this.forward.addEventListener('click', handleForward);

    this.numberSlides = this.tape.children.length;
    this.tape.style.setProperty('--total', this.numberSlides);
  }

  getOffsetArray() {
    const { tape, offsetArray, numberSlides } = this;

    offsetArray.splice(0, offsetArray.length);

    let totalWidth = 0;

    Array.from(tape.children).forEach((slide) => {
      offsetArray.push(slide.offsetLeft);
      totalWidth += slide.offsetWidth + gap;
    });

    totalWidth -= gap;

    offsetArray[numberSlides - 1] = totalWidth - tape.offsetWidth;
  }

  backSlide() {
    const {
      tape,
      currentSlide,
      numberSlides,
      offsetArray,
    } = this;

    if (currentSlide > 0) {
      this.currentSlide = currentSlide - 1;
    } else {
      this.currentSlide = numberSlides - 1;
    }

    this.getOffsetArray();

    tape.style.transform = `translateX(-${offsetArray[this.currentSlide]}px)`;
  }

  forwardSlide() {
    const {
      tape,
      currentSlide,
      numberSlides,
      offsetArray,
    } = this;

    console.log(this.currentSlide);

    if (currentSlide < numberSlides - 1) {
      this.currentSlide = currentSlide + 1;
    } else {
      this.currentSlide = 0;
    }

    this.getOffsetArray();

    tape.style.transform = `translateX(-${offsetArray[this.currentSlide]}px)`;

    console.log(this.currentSlide);
    console.log(this.numberSlides);
  }
}

function HandleBack(slider) {
  this.slider = slider;

  this.handleEvent = () => {
    this.slider.backSlide();
  };
}

function HandleForward(slider) {
  this.slider = slider;

  this.handleEvent = () => {
    this.slider.forwardSlide();
  };
}

Array.from(document.querySelectorAll('.js-slider'))
  .forEach(
    (wrapper) => {
      const slider = new Slider(wrapper);
      slider.init();
    },
  );
