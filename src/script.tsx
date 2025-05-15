import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Timer } from 'three/examples/jsm/misc/Timer.js';
import GUI from "lil-gui"

console.log("Hello, Three.js with TypeScript!");

// --- Canvas Setup ---
const canvas = document.querySelector("canvas.webgl") as HTMLCanvasElement;

// --- Scene Setup ---
const scene = new THREE.Scene();

// --- Setup Axes Helper ---
const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)

// --- Objects ---
// Ground
const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial()
)
ground.rotation.x = - Math.PI/2
scene.add(ground)

// House container
const house = new THREE.Group()
scene.add(house)

// First Floor
const firstFloor = new THREE.Mesh(
    new THREE.CylinderGeometry(1.5, 1.3, 4, 4, 1),
    new THREE.MeshStandardMaterial()
)
firstFloor.rotation.y = Math.PI/4
firstFloor.position.y = 1.25
house.add(firstFloor)

// Second Floor
const secondFloor = new THREE.Mesh(
    new THREE.CylinderGeometry(1.2, 1.2, 2.1, 3, 1),
    new THREE.MeshStandardMaterial()
)
secondFloor.position.y = 3.8
secondFloor.rotation.x = - Math.PI/2
house.add(secondFloor)

// Roofs
const roofs = new THREE.Group()
const roofLeft = new THREE.Mesh(
    new THREE.BoxGeometry(2.5, 3, 0.1),
    new THREE.MeshStandardMaterial()
)
roofLeft.position.set(0, 3.8, -0.75)
roofLeft.rotation.x = Math.PI * 0.168

const roofRight = new THREE.Mesh(
    new THREE.BoxGeometry(2.5, 3, 0.1),
    new THREE.MeshStandardMaterial()
)
roofRight.position.set(0, 3.8, 0.75)
roofRight.rotation.x = - Math.PI * 0.168

roofs.add(roofLeft, roofRight)
roofs.rotation.y = Math.PI/2
house.add(roofs)

// --- Lights ---
const ambientLight = new THREE.AmbientLight(0xffffff, 1)

const directionalLight = new THREE.DirectionalLight(0xfffffc, 1)
directionalLight.position.set(2, 10, 0)

scene.add(ambientLight, directionalLight)

// --- Camera Setup ---
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight);
camera.position.set(4, 10, 0)
camera.lookAt(house.position)
scene.add(camera)

// --- Controls ---
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// --- Renderer Setup ---
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// --- Debug UI ---
const gui = new GUI
gui.close()

// --- Resize ---
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
})

// --- Render Loop ---
const timer = new Timer()

function animate(){
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()

    // Update control
    controls.update()

    // Update render
    renderer.render(scene, camera);

    // Call animate again on the next frame
    window.requestAnimationFrame(animate)
}
animate()
