class Navigation {
  wrapper;

  constructor(wrapper) {
    this.wrapper = wrapper;
  }

  init() {
    this.subtitles = Array.from(this.wrapper.querySelectorAll('.js-navigation__subtitle'));

    const handleSubtitleOpenClose = new HandleSubtitleOpenClose(this);

    this.wrapper.addEventListener('mousedown', handleSubtitleOpenClose);
    this.wrapper.addEventListener('focusin', handleSubtitleOpenClose);
  }
}

function HandleSubtitleOpenClose(navigation) {
  this.navigation = navigation;

  this.handleEvent = (event) => {
    const { wrapper, subtitles } = this.navigation;
    const { target } = event;

    if (target.classList.contains('js-navigation__subtitle')) {
      if (target.classList.contains('navigation__subtitle_open')) {
        if (target.classList.contains('navigation__subtitle_just-now-open')) {
          target.classList.remove('navigation__subtitle_just-now-open');
          if (event.type === 'focusin') {
            return;
          }
        }
        target.classList.remove('navigation__subtitle_open');
        wrapper.classList.remove('navigation_background_opaque');
      } else {
        subtitles.forEach((subtitle) => subtitle.classList.remove('navigation__subtitle_open'));
        wrapper.classList.add('navigation_background_opaque');
        if (event.type === 'mousedown') {
          target.classList.add('navigation__subtitle_just-now-open');
        }
        target.classList.add('navigation__subtitle_open');
      }
    }
  };
}

/*
function stop(event) {
  event.stopPropagation();
}

function prevent(event) {
  event.preventDefault();
}
*/

Array.from(document.querySelectorAll('.js-navigation'))
  .forEach(
    (wrapper) => {
      const navigation = new Navigation(wrapper);
      navigation.init();
    },
  );
