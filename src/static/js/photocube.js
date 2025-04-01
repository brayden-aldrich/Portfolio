// import * as THREE from 'three';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// let canvas = document.getElementById("photocube")
// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera( 75, canvas.width / canvas.height, 0.1, 1000 );

// camera.position.z = 5;
// const renderer = new THREE.WebGLRenderer({canvas: canvas, alpha: true});
// renderer.setSize( window.innerWidth, window.innerHeight );
// const raycaster = new THREE.Raycaster();
// const mouse = new THREE.Vector2();

// let light = new THREE.PointLight(0xffffff);
// light.position.set(0, 1.25, 3)
// scene.add(light)

// let ambient = new THREE.AmbientLight(0xffffff);
// ambient.position.set(0, 1, 1)
// scene.add(ambient)
// const geometry = new THREE.BoxGeometry( 2.5, 3, 2.5 );

// const loader = new THREE.TextureLoader()

// const cubeMaterials = [
//     new THREE.MeshBasicMaterial({ map: loader.load('/static/img/gleaners.jpeg'), side: THREE.DoubleSide }), //right side
//     new THREE.MeshBasicMaterial({ map: loader.load('/static/img/teeball.jpg'), side: THREE.DoubleSide}), //left side
//     new THREE.MeshBasicMaterial({ map: loader.load('/static/img/openmic.jpeg'), side: THREE.DoubleSide}), //top side
//     new THREE.MeshBasicMaterial({ map: loader.load('/static/img/skydive.png'), side: THREE.DoubleSide}), //bottom side
//     new THREE.MeshBasicMaterial({ map: loader.load('/static/img/headshot.jpg'), side: THREE.DoubleSide}), //front side
//     new THREE.MeshBasicMaterial({ map: loader.load('/static/img/yellerstone.jpg'), side: THREE.DoubleSide}), //back side
// ];

// const cube = new THREE.Mesh( geometry, cubeMaterials );

// cube.position.x = 3.0;

// scene.add( cube );


// const controls = new OrbitControls( camera, renderer.domElement );

// controls.target.set( 3, 0, 0 ); // rotates at the position of cube
// controls.enableZoom = false;
// controls.enablePan = false;
// controls.update();



// function animate() {

// 	renderer.render( scene, camera );
    
// }
// renderer.setAnimationLoop( animate );

// const isEqualXYZ = (a, b) => {
//     return(
//         a.x === b.x &&
//         a.y === b.y &&
//         a.z === b.z
//     )
// }

// /**
//  *  headshot.jpg front normal: {x: 0, y: 0, z: -1}
//  *  teeball.js left normal: {x: 1, y: 0, z: 0}
//  *  yellerstone back normal: {x: 0, y: 0, z: 1}
//  *  gleaners right normal: {x: -1, y: 0, z: 0}
//  *  openmic top normal: {x: 0, y: -1, z: 0}
//  *  skydive bottom normal: {x: 0, y: 1, z: 0}
//  */
// let imgObj = [
//     {
//         name: "Me.",
//         normal: {x: 0, y: 0, z: -1}
//     }, 
//     {
//         name: "I wasn't a fan of teeball.",
//         normal: {x: 1, y: 0, z: 0}
//     }, 
//     {
//         name: "Me hiking in Yellowstone.",
//         normal: {x: 0, y: 0, z: 1}
//     }, 
//     {
//         name: "Every year at Yazaki we volunteered at Gleaners to help set up their food drive.",
//         normal: {x: -1, y: 0, z: 0}
//     }, 
//     {
//         name: "Entertaining the masses as the MC at an open mic. They weren't very entertained.",
//         normal: {x: 0, y: -1, z: 0}
//     }, 
//     {
//         name: "Me skydiving. My goal is to get a license in the future.",
//         normal: {x: 0, y: 1, z: 0}
//     }
// ]


// let description = document.getElementById("right-about-p")
// window.addEventListener('mousemove', (event) => {
//     mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
//     mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    
//     raycaster.setFromCamera(mouse, camera);
//     const intersects = raycaster.intersectObjects(scene.children, true);
//     for (let i = 0; i < intersects.length; i++) {        
//         for (let j = 0; j < imgObj.length; j++) {
//             if (isEqualXYZ(intersects[i].face.normal, imgObj[j].normal)) {
//                 description.innerHTML = imgObj[j].name
//             }
//         }
//     }
    
// })