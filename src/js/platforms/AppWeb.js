
import WebGLRenderer from 'app/renderer/WebGLRenderer';
import MainScene from 'app/renderer/scenes/MainScene';

require('webvr-polyfill');

const THREE = require('three');
THREE.VRControls = require('imports?THREE=three!exports?THREE.VRControls!external/VRControls');
THREE.FirstPersonControls = require('imports?THREE=three!exports?THREE.FirstPersonControls!external/FirstPersonControls');


export default class AppWeb {

    constructor() {
      console.log('web');

      this.splashScreen = document.getElementById('splash-screen');

      this.enterButton = document.getElementById('enter-button');
      this.exitButton = document.getElementById('exit-button');

      this.renderer = new WebGLRenderer();
      this.scene = new MainScene(this.renderer);
      this.splashScreen.classList.add('hide');

      navigator.getVRDisplays().then((displays) => this.gotVRDisplays(displays));

      this.enterButton.addEventListener('click', () => this.enterVR());
      this.exitButton.addEventListener('click', () => this.exitVR())

      window.addEventListener('resize', () => this.resize());
      window.addEventListener('vrdisplaypresentchange', () => this.vrDisplayPresentChange());

      this.clock = new THREE.Clock( true );

    }

    render() {
        if (this.controls) {
            this.controls.update(this.clock.getDelta());
        }

        this.renderer.render();
        this.vrDisplay.requestAnimationFrame(() => this.render());
    }

    resize() {
        this.renderer.resize();
    }

    gotVRDisplays(displays) {

        if (displays.length > 0) {
            this.vrDisplay = displays[0];

            this.controls = new THREE.FirstPersonControls(this.renderer.camera);
            this.controls.lookSpeed = 0.05;
            this.controls.movementSpeed = 0;

            this.render();

            if (!this.vrDisplay.isPolyfilled && !this.vrDisplay.isPresenting) {
                this.showVRButton();
            }

        }
    }

    enterVR() {
        this.controls = new THREE.VRControls(this.renderer.camera);
        this.controls.standing = true;

        this.renderer.effect.requestPresent();
        this.enterButton.classList.remove('show');
    }

    exitVR() {
        this.controls = new THREE.FirstPersonControls(this.renderer.camera);
        this.controls.lookSpeed = 0.05;
        this.controls.movementSpeed = 0;

        this.renderer.effect.exitPresent();
        this.exitButton.classList.remove('show');
    }

    vrDisplayPresentChange() {
        if (this.vrDisplay.isPresenting) {
            this.exitButton.classList.add('show');
        } else {
            this.enterButton.classList.add('show');
        }

        this.resize();
    }

    showVRButton() {
        this.enterButton.classList.add('show');
    }

}
