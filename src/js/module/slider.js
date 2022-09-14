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
    const { offsetArray } = this;

    offsetArray.splice(0, offsetArray.length);

    Array.from(this.tape.children).forEach((slide) => {
      offsetArray.push(slide.offsetLeft);
    });

    console.log(offsetArray);
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

    if (currentSlide < numberSlides - 1) {
      this.currentSlide = currentSlide + 1;
    } else {
      this.currentSlide = 0;
    }

    this.getOffsetArray();

    tape.style.transform = `translateX(-${offsetArray[this.currentSlide]}px)`;
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
