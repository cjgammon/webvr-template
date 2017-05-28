
import WebGLRenderer from 'app/renderer/WebGLRenderer';
require('webvr-polyfill');

const THREE = require('three');
THREE.VRControls = require('imports?THREE=three!exports?THREE.VRControls!external/VRControls');


export default class AppMobile {

    constructor() {
        console.log('cardboard');

        this.splashScreen = document.getElementById('splash-screen');

        this.enterCover = document.getElementById('enter-cover');
        this.exitCover = document.getElementById('exit-cover');

        this.renderer = new WebGLRenderer();
        this.scene = new MainScene(this.renderer);
        this.splashScreen.classList.add('hide');

        this.vrDisplay = null;

        navigator.getVRDisplays().then((displays) => this.gotVRDisplays(displays));

        this.enterCover.addEventListener('click', () => this.enterVR());
        this.exitCover.addEventListener('click', () => this.exitVR())

        window.addEventListener('resize', () => this.resize());
        window.addEventListener('vrdisplaypresentchange', () => this.resize());
        window.addEventListener("orientationchange", () => this.orientationChange());
        document.addEventListener('touchmove', this.preventScroll);

        this.resize();
  }

  render() {
      this.controls.update();
      this.renderer.render();
      this.vrDisplay.requestAnimationFrame(() => this.render());
  }

  resize() {
      this.controls = new THREE.VRControls(this.renderer.camera);
      this.controls.standing = true;

      this.renderer.resize();
  }

  gotVRDisplays(displays) {
      if (displays.length > 0) {
          this.vrDisplay = displays[0];
          this.render();
      }
  }

  enterVR() {
      this.vrDisplay.requestPresent([{source: this.renderer.renderer.domElement}]);
      this.enterCover.classList.remove('show');
  }

  exitVR() {
      this.vrDisplay.exitPresent();
      this.exitCover.classList.remove('show');
  }

  orientationChange() {
      window.scroll(0, 0);

      if (window.orientation !== 0) {
          //show cover
          if (!this.vrDisplay.isPresenting) {
              this.enterCover.classList.add('show');
          } else {
              this.exitCover.classList.remove('show');
          }
      } else {
          //hide cover
          if (!this.vrDisplay.isPresenting) {
              this.enterCover.classList.remove('show');
          } else {
              this.exitCover.classList.add('show');
          }
      }
  }

  preventScroll(e) {
      e.preventDefault();
  }
}
