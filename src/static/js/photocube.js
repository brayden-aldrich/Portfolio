import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );


let canvas = document.getElementById("photocube")
const renderer = new THREE.WebGLRenderer({canvas: canvas, alpha: true});
renderer.setSize( window.innerWidth, window.innerHeight );


let light = new THREE.PointLight(0xffffff);
light.position.set(0, 1.25, 3)
scene.add(light)

let ambient = new THREE.AmbientLight(0xffffff);
ambient.position.set(0, 1, 1)
scene.add(ambient)
const geometry = new THREE.BoxGeometry( 2.5, 3, 2.5 );

const loader = new THREE.TextureLoader()
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

const cubeMaterials = [
    new THREE.MeshStandardMaterial({ map: loader.load('/static/img/gleaners.jpeg'), side: THREE.DoubleSide }), //right side
    new THREE.MeshStandardMaterial({ map: loader.load('/static/img/teeball.jpg'), side: THREE.DoubleSide}), //left side
    new THREE.MeshStandardMaterial({ map: loader.load('/static/img/openmic.jpeg'), side: THREE.DoubleSide}), //top side
    new THREE.MeshStandardMaterial({ map: loader.load('/static/img/skydive.png'), side: THREE.DoubleSide}), //bottom side
    new THREE.MeshStandardMaterial({ map: loader.load('/static/img/headshot.jpg'), side: THREE.DoubleSide}), //front side
    new THREE.MeshStandardMaterial({ map: loader.load('/static/img/yellerstone.jpg'), side: THREE.DoubleSide}), //back side
];

const cube = new THREE.Mesh( geometry, cubeMaterials );

cube.position.x = 5.0;

scene.add( cube );


const controls = new OrbitControls( camera, renderer.domElement );
controls.minDistance = 3;
controls.maxDistance = 10;

controls.target.set( 5, 0, 0 );

controls.update();



function animate() {

	renderer.render( scene, camera );
    
}
renderer.setAnimationLoop( animate );

