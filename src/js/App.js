
import AppWeb from 'platforms/AppWeb';
import AppMobile from 'platforms/AppMobile';

class App {

  constructor() {

    if (window.location.hash) {
      this.goto(window.location.hash.replace('#', ''));
    }

    this.init();
  }

  init() {

      if (Modernizr.touch) {
          new AppMobile();
      } else {
          new AppWeb();
      }
  }

  animInComplete() {

  }

}

new App();
