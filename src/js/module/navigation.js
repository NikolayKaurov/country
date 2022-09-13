const scrollOpaque = 100;

class Navigation {
  wrapper;

  constructor(wrapper) {
    this.wrapper = wrapper;
  }

  init() {
    this.subtitles = Array.from(this.wrapper.querySelectorAll('.js-navigation__subtitle'));
    Array.from(this.wrapper.querySelectorAll('.js-navigation__submenu'))
      .forEach(
        (submenu) => {
          submenu.addEventListener('mousedown', stop);
          submenu.addEventListener('focusin', stop);
        },
      );

    const handleSubtitleOpenClose = new HandleSubtitleOpenClose(this);
    const scroll = new Scroll(this);

    document.addEventListener('mousedown', handleSubtitleOpenClose);
    document.addEventListener('focusin', handleSubtitleOpenClose);
    document.addEventListener('scroll', scroll);
  }
}

function HandleSubtitleOpenClose(navigation) {
  this.navigation = navigation;

  this.handleEvent = (event) => {
    const { wrapper, subtitles } = this.navigation;
    const { target } = event;

    if (target.classList.contains('js-navigation__subtitle')) {
      if (target.classList.contains('navigation__subtitle_open')) {
        if (event.type === 'mousedown') {
          target.classList.add('navigation__subtitle_just-now-close');
        }
        if (target.classList.contains('navigation__subtitle_just-now-open')) {
          target.classList.remove('navigation__subtitle_just-now-open');
          if (event.type === 'focusin') {
            return;
          }
        }
        target.classList.remove('navigation__subtitle_open');
        wrapper.classList.remove('navigation_background_opaque');
      } else {
        if (event.type === 'mousedown') {
          target.classList.add('navigation__subtitle_just-now-open');
        }
        if (target.classList.contains('navigation__subtitle_just-now-close')) {
          target.classList.remove('navigation__subtitle_just-now-close');
          if (event.type === 'focusin') {
            return;
          }
        }
        subtitles.forEach((subtitle) => subtitle.classList.remove('navigation__subtitle_open'));
        wrapper.classList.add('navigation_background_opaque');
        target.classList.add('navigation__subtitle_open');
      }
    } else {
      subtitles.forEach((subtitle) => subtitle.classList.remove('navigation__subtitle_open'));
      wrapper.classList.remove('navigation_background_opaque');
    }
  };
}

function Scroll(navigation) {
  this.navigation = navigation;

  this.handleEvent = () => {
    const { wrapper } = this.navigation;

    if (window.scrollY > scrollOpaque) {
      wrapper.classList.add('navigation_position_scrolled');
    } else {
      wrapper.classList.remove('navigation_position_scrolled');
    }
  };
}

function stop(event) {
  event.stopPropagation();
}

/*
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
