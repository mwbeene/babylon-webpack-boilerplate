import { Engine } from '@babylonjs/core/Engines/engine';
import { Scene } from '@babylonjs/core/scene';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import { TorusKnotBuilder } from '@babylonjs/core/Meshes/Builders/torusKnotBuilder';
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial';
import { Texture } from '@babylonjs/core/Materials/Textures/texture'
import { Color3 } from '@babylonjs/core/Maths/math.color';

import UVChecker from './textures/uv-checker.png';

const canvas = document.getElementById("renderCanvas");

const engine = new Engine(canvas);

var scene = new Scene(engine);
scene.clearColor = Color3.FromHexString('#343638');

var camera = new ArcRotateCamera('camera1', -3.14/2, 3.14/2, 10, new Vector3.Zero(), scene);
camera.attachControl(canvas, true);

var light = new HemisphericLight("light1", new Vector3(0, 5, -10), scene);

var texture = new Texture(UVChecker, scene);
texture.uScale = 20.0;
texture.vScale = 2.0;

var material = new StandardMaterial('material1', scene);
material.diffuseTexture = texture;

console.log( material );

var torusKnot = TorusKnotBuilder.CreateTorusKnot('torus', {tube: 0.75, radialSegments: 128}, scene);
torusKnot.material = material;

engine.runRenderLoop( () => {
  scene.render();
});

window.addEventListener('resize', function() {
  engine.resize();
});
