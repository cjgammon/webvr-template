
require('webvr-polyfill');

const VRJSON = require('raw!app/data/vr_scene.json');

const THREE = require('three');
THREE.VREffect = require('imports?THREE=three!exports?THREE.VREffect!external/VREffect');

export default class WebGLRenderer {

    constructor() {

        let renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById('scene'),
            antialias: false
        });
        renderer.setPixelRatio(Math.floor(window.devicePixelRatio));
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor( 0xff0000);

        let scene = new THREE.Scene();

        let effect = new THREE.VREffect(renderer);
        effect.setSize(window.innerWidth, window.innerHeight);

        this.scene = scene;
        this.renderer = renderer;
        this.effect = effect;
    }

    resize() {
        console.log('Resizing to %s x %s.', window.innerWidth, window.innerHeight);

        this.effect.setSize(window.innerWidth, window.innerHeight);
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
    }

    render() {
        this.effect.render(this.scene, this.camera);
    }

}
