const THREE = require('three');

export default GradientShader = {
    uniforms: {
      topColor: {
        value: new THREE.Color(0x001133)
      },
      bottomColor: {
        value: new THREE.Color(0xef4400)
      },
      offset: {
        value: 0
      },
      exponent: {
        value: 0.7
      }
    },
    vertexShader: [
        "varying vec3 vWorldPosition;",
        "void main() {",
            "vec4 worldPosition = modelMatrix * vec4( position, 1.0 );",
            "vWorldPosition = worldPosition.xyz;",
            "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
        "}"
    ].join("\n"),
    fragmentShader: [
        "uniform vec3 topColor;",
        "uniform vec3 bottomColor;",
        "uniform float offset;",
        "uniform float exponent;",
        "varying vec3 vWorldPosition;",
        "void main() {",
            "float h = normalize( vWorldPosition + offset ).y;",
            "gl_FragColor = vec4( mix( bottomColor, topColor, max( pow( max( h , 0.0), exponent ), 0.0 ) ), 1.0 );",
        "} "
    ].join("\n")
};
