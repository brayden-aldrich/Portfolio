import * as THREE from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 60,  1, 1, 5000 );

let canvas = document.getElementById("holo-render")
const renderer = new THREE.WebGLRenderer({canvas: canvas, alpha: true, antialias: true });

const zmax = 4; 
let isMobile;
let vFOV 
let height 
let width 

// main setup function for renderer and other variables
function setupRenderer(){
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setPixelRatio(Math.max(window.devicePixelRatio, 2));
    isMobile = window.innerWidth < 1000;

    const fov = isMobile ? 40 : 70
    camera.position.z = 7;

    camera.aspect = window.innerWidth / window.innerHeight / 2;
    camera.fov = fov;
    const vFOV = (camera.fov * Math.PI) / 180;
    height = 2 * Math.tan(vFOV / 2) * Math.abs(camera.position.z);
    width = height * .5;
    camera.updateProjectionMatrix();

   
}


function createHolographicMaterial(spacing, grating) {
    const uniforms = THREE.UniformsUtils.merge([
        THREE.UniformsLib.lights, 
        {
            uTol: { value: 0.1 },
            uKa: { value: 0.8 },
            uKd: { value: 0.9 },
            uKs: { value: 1.3 },
            uShininess: { value: 10.0 },
            uSpacing: { value: spacing },
            uGratingFreq: { value: 1. },
            uSpherePosition: { value: new THREE.Vector3()}
        }
    ]);

    // material for shaders
    const material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertexShader(),
        fragmentShader: fragmentShader(),
        lights: true
    });

    return material;
}

// vertex shader for holographic effect
function vertexShader() {
    return `
        varying vec2 vST;
        varying vec3 vN;
        varying vec3 vL;
        varying vec3 vE;
        varying vec3 vMC;
        varying vec3 vWorldPosition;

        const vec3 LIGHTPOSITION = vec3(0.0, 10.0, -10.0);

        void main() {
            vST = uv;
            vMC = position;
            vec4 ECposition = modelViewMatrix * vec4(position, 1.0);
            vN = normalMatrix * normal;
            
            vL = LIGHTPOSITION - ECposition.xyz;
            vE = vec3(0.0, 0.0, 0.0) - ECposition.xyz;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `;
}

// shader for the holographic effect
function fragmentShader() {
    return `
        varying vec2 vST;
        varying vec3 vN;
        varying vec3 vL;
        varying vec3 vE;
        varying vec3 vMC;
        varying vec3 vWorldPosition;
        uniform float uTol;
        uniform float uKa;
        uniform float uKd;
        uniform float uKs;
        uniform float uShininess;
        uniform float uSpacing;
        uniform float uGratingFreq;
        uniform vec3 uSpherePosition;
        const vec3 OBJECTCOLOR = vec3(.0, .0, .0);
        const vec3 SPECULARCOLOR = vec3(1.0, 1.0, 1.0);

        vec3 Rainbow(float t) {
            t = clamp(t, 0.0, 1.0);
            vec3 rgb = vec3(0.0, 0.0, 0.0);
            
            // b -> c
            if(t >= 0.0) {
                rgb.g = 4.0 * (t - (0.0/4.0));
                rgb.b = 1.0;
            }
            
            // c -> g
            if(t >= (1.0/4.0)) {
                rgb.g = 1.0;
                rgb.b = 1.0 - 4.0 * (t - (1.0/4.0));
            }
            
            // g -> y
            if(t >= (2.0/4.0)) {
                rgb.r = 4.0 * (t - (2.0/4.0));
                rgb.g = 1.0;
            }
            
            // y -> r
            if(t >= (3.0/4.0)) {
                rgb.r = 1.0;
                rgb.g = 1.0 - 4.0 * (t - (3.0/4.0));
            }
            
            return rgb;
        }

        void main() {
            vec3 myColor = OBJECTCOLOR;
            vec2 st = vST;
            vec3 Normal = normalize(vN);
            vec3 Light = normalize(vL);
            vec3 Eye = normalize(vE);
            
            vec3 Tangent = normalize(dFdx(vMC));
            
            float cosI = dot(Light, Tangent);
            float cosR = dot(Eye, -Tangent);
            float diffraction = abs(cosI - cosR);
            
            float wavelength = uGratingFreq * diffraction / uSpacing;
            
            vec3 diffractionColor = Rainbow(wavelength);
            
            vec3 ambient = (uKa * myColor) / 2.;
            float d_light = max(dot(Normal, Light), uTol);
            vec3 diffuse = uKd * d_light * myColor;
            
            float s = 0.0;
            if(d_light > 0.0) {
                vec3 ref = normalize(reflect(-Light, Normal));
                float cosphi = dot(Eye, ref);
                if(cosphi > 0.0)
                    s = pow(max(cosphi, 0.0), uShininess);
            }
            vec3 specular = uKs * s * SPECULARCOLOR;
            
            // Fresnel calculation for holographic effect intensity
            float fresnelFactor = pow(1.0 - max(0.0, dot(Eye, Normal)), 1.5);
            float dv = smoothstep(0.0, 1.0, diffraction);
            
            vec3 finalColor = mix(
                ambient + diffuse,
                diffractionColor,
                fresnelFactor * diffraction
            ) + specular;
            if(vMC.y + uSpherePosition.y <= .0){
                gl_FragColor = vec4(1. - finalColor, .5);
            } else {
                gl_FragColor = vec4(finalColor, .5); 
            }
            
        }
    `;
}



let SphereArray = []
// need to calculate with perspective in mind to get accurate borders for collision
function getBoundariesAtZ(z) {
    const vFOV = (camera.fov * Math.PI) / 180;
    
    const visibleHeightAtZ = 2 * Math.tan(vFOV / 2) * Math.abs(camera.position.z - z);
    
    const visibleWidthAtZ = visibleHeightAtZ * camera.aspect;
    
    return {
        width: visibleWidthAtZ / 2,  
        height: visibleHeightAtZ / 2  
    };
}

// main sphere class, contains all functions and variables necessary to move sphere on screen
class SphereObject {
    
    constructor(sphere, boundary, x, y, z, sx, sy, sz){
        this.sphere = sphere
        this.boundary = boundary

        this.x = x
        this.y = y
        this.z = z
        this.sx = sx
        this.sy = sy
        this.sz = sz

       
    }

    increment(deltaTime){
        const speed = deltaTime * 60;
        getBoundariesAtZ(this)
        this.x += this.sx * speed 
        const boundaries = getBoundariesAtZ(this.z);
    
        this.x += this.sx * speed;
        if (this.x >= boundaries.width) {
            let n = new THREE.Vector3(1., 0., 0.);
            this.reflect(n);
            this.x = boundaries.width; 
        } else if (this.x <= -boundaries.width) {
            let n = new THREE.Vector3(-1., 0., 0.);
            this.reflect(n);
            this.x = -boundaries.width; 
        }
        
        this.y += this.sy * speed;
        if (this.y >= boundaries.height) {
            let n = new THREE.Vector3(0., 1., 0.);
            this.reflect(n);
            this.y = boundaries.height; 
        } else if (this.y <= -boundaries.height) {
            let n = new THREE.Vector3(0., -1., 0.);
            this.reflect(n);
            this.y = -boundaries.height; 
        }
        
        this.z += this.sz * speed;
        if (this.z >= zmax) {
            let n = new THREE.Vector3(0., 0., 1.);
            this.reflect(n);
            this.z = zmax; 
        } else if (this.z <= -zmax) {
            let n = new THREE.Vector3(0., 0., -1.);
            this.reflect(n);
            this.z = -zmax; 
        }


    }

    reflect(normal){
        let velocity = new THREE.Vector3(this.sx, this.sy, this.sz);
        let dot = velocity.dot(normal);
        let reflected = velocity.sub(normal.multiplyScalar(2 * dot));
        this.sx = reflected.x;
        this.sy = reflected.y;
        this.sz = reflected.z;

    }

    setPosition(){
        this.sphere.position.x = this.x
        this.sphere.position.y = this.y
        this.sphere.position.z = this.z
        this.boundary.center.set(this.x, this.y, this.z);
        this.sphere.material.uniforms.uSpherePosition.value.set(
            this.sphere.position.x,
            this.sphere.position.y,
            this.sphere.position.z,
        )


    }    

  
}

// Creates a sphere with random properties 
const createSphere = () => {
    let s = [0., 0., 0.]
    let max = (isMobile) ? 0.001 : 0.005
    let low = (isMobile) ? 0.0001 : 0.001
    console.log(max)
    for (let i = 0; i < s.length; i++) {

        s[i] = (Math.random() * low) * (Math.random() > max ? 1 : -1); 
    }

    let x = (Math.random() * (width + 0.0000) + 0.0000)
    x *= Math.round(Math.random()) ? 1 : -1

    let y = (Math.random() * (height + 0.0000) + 0.0000)
    y *= Math.round(Math.random()) ? 1 : -1
    
    let z = (Math.random() * (4.0000 + 0.0000) + 0.0000)
    z *= Math.round(Math.random()) ? 1 : -1
    const radius = isMobile ? 0.085 : 0.5;
    const segments = isMobile ? 32 : 128;    
    let spacing = (Math.random() * 10 + 1) + 1
    let grating = (Math.random() * 10 + 1) + 1


    const geometry = new THREE.SphereGeometry( radius, segments, segments )
    
    const materialReg = new createHolographicMaterial(spacing, grating)
 
    materialReg.flatShading = false; 
    const sphere = new THREE.Mesh( geometry, materialReg )
    sphere.scale.set(1, 1, 1);
    const boundingSphere = new THREE.Sphere(sphere.position, radius)

    return new SphereObject(sphere, boundingSphere, x, y, z, s[0], s[1], s[2])
}

// Creates all spheres 
const SceneManager = {
    currentScene: 'home',
    init(isMobile){
        for(let i = 0; i < 10; i++){
            SphereArray.push(createSphere(isMobile))
            scene.add( SphereArray[i].sphere )
            
        }        
    },
   
}

// initialize the threejs animation
function initApp(){
    setupRenderer()
    SphereArray.forEach(s => scene.remove(s.sphere));
    SphereArray = [];
    SceneManager.init();
}

let lastTime = 0
function animate(time)
{

    const deltaTime = (time - lastTime) / 100;
    lastTime = time
    renderer.render( scene, camera );
    for(let i = 0; i < SphereArray.length; i++){
        
        SphereArray[i].increment(deltaTime)
        SphereArray[i].setPosition()
        // check for collision
        for(let j = i + 1; j < SphereArray.length; j++){
            const s1 = SphereArray[i];
            const s2 = SphereArray[j];
            
            const pos1 = new THREE.Vector3(s1.x, s1.y, s1.z);
            const pos2 = new THREE.Vector3(s2.x, s2.y, s2.z);
            const distanceVec = pos1.clone().sub(pos2); 
            const distance = distanceVec.length();
            
            const minDistance = s1.boundary.radius + s2.boundary.radius;
            // if collision
            if (distance < minDistance) {
                // how much overlap is there
                const penetrationDepth = minDistance - distance;
                
                const normal = distanceVec.normalize();
                
                const vel1 = new THREE.Vector3(s1.sx, s1.sy, s1.sz);
                const vel2 = new THREE.Vector3(s2.sx, s2.sy, s2.sz);
                
                const relativeVelocity = vel1.clone().sub(vel2);
                const normalVelocity = relativeVelocity.dot(normal);
                
                if (normalVelocity < 0) {
                    const restitution = 1.0; 
                    const impulseScalar = -(1 + restitution) * normalVelocity / 2;
                    
                    const impulse = normal.clone().multiplyScalar(impulseScalar);
                    
                    s1.sx += impulse.x;
                    s1.sy += impulse.y;
                    s1.sz += impulse.z;
                    
                    s2.sx -= impulse.x;
                    s2.sy -= impulse.y;
                    s2.sz -= impulse.z;
                    
                    const correction = normal.clone().multiplyScalar(penetrationDepth / 2);
                    
                    s1.x += correction.x;
                    s1.y += correction.y;
                    s1.z += correction.z;
                    
                    s2.x -= correction.x;
                    s2.y -= correction.y;
                    s2.z -= correction.z;
                    const maxSpeed = 0.05;
                    // clamp to avoid floating point weirdness
                    s1.sx = THREE.MathUtils.clamp(s1.sx, -maxSpeed, maxSpeed);
                    s1.sy = THREE.MathUtils.clamp(s1.sy, -maxSpeed, maxSpeed);
                    s1.sz = THREE.MathUtils.clamp(s1.sz, -maxSpeed, maxSpeed);
                    s2.sx = THREE.MathUtils.clamp(s2.sx, -maxSpeed, maxSpeed);
                    s2.sy = THREE.MathUtils.clamp(s2.sy, -maxSpeed, maxSpeed);
                    s2.sz = THREE.MathUtils.clamp(s2.sz, -maxSpeed, maxSpeed);
                    s1.setPosition();
                    s2.setPosition();
                }
            }
              
        }
       
    }
    
}

renderer.setAnimationLoop( animate );
initApp()
setupRenderer();

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
   
    resizeTimeout = setTimeout(() => {
        setupRenderer();
    }, 200);
});