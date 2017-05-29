
const VRJSON = require('raw!app/data/vr_scene.json');
const THREE = require('three');

export default class MainScene {

    constructor(renderer) {
        this.renderer = renderer;

        this.parseBlender();
    }

    //TODO:: this should go in mainScene file.
    parseBlender() {

        const loader = new THREE.ObjectLoader();
        const json = JSON.parse(VRJSON);
        const sceneJSON = loader.parse(json);

        this.renderer.scene = sceneJSON;

        for (var i = 0, l = sceneJSON.children.length; i < l; i++) {
            var v = sceneJSON.children[i];
            // console.log(v.name);

            if (v.name == 'Sky') {
                v.material = new THREE.MeshNormalMaterial({side: THREE.BackSide});
            }

            if (v instanceof THREE.PerspectiveCamera) {
                this.renderer.camera = v;
            }
        }

        for (var i = 0, l = this.renderer.scene.children.length; i < l; i++) {
            var v = this.renderer.scene.children[i];

            if (v.name == 'Cube') {
                this.cube = v;
                this.cube.material= new THREE.MeshNormalMaterial();
            }
        }
    }
}
