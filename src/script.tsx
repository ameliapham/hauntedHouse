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

// --- Texture ---
const textureLoader = new THREE.TextureLoader()

// Platform ------------------------------
const platformAlphaTexture = textureLoader.load('public/texture/platform/alpha.webp')
const platformAColorTexture = textureLoader.load('public/texture/platform/coast_sand_rocks_02_1k/coast_sand_rocks_02_diff_1k.webp')
const platformARMTexture = textureLoader.load('public/texture/platform/coast_sand_rocks_02_1k/coast_sand_rocks_02_arm_1k.webp')
const platformNormalTexture = textureLoader.load('public/texture/platform/coast_sand_rocks_02_1k/coast_sand_rocks_02_nor_gl_1k.webp')
const platformDisplacementTexture = textureLoader.load('public/texture/platform/coast_sand_rocks_02_1k/coast_sand_rocks_02_disp_1k.webp')

platformAColorTexture.colorSpace = THREE.SRGBColorSpace

platformAColorTexture.repeat.set(8, 8) 
platformAColorTexture.wrapS= THREE.RepeatWrapping
platformAColorTexture.wrapT = THREE.RepeatWrapping

platformARMTexture.repeat.set(8, 8)
platformARMTexture.wrapS = THREE.RepeatWrapping
platformARMTexture.wrapT = THREE.RepeatWrapping

platformNormalTexture.repeat.set(8, 8)
platformNormalTexture.wrapS = THREE.RepeatWrapping
platformNormalTexture.wrapT = THREE.RepeatWrapping

platformDisplacementTexture.repeat.set(8, 8)
platformDisplacementTexture.wrapS = THREE.RepeatWrapping
platformDisplacementTexture.wrapT = THREE.RepeatWrapping

// First Floors ------------------------------
const firstFloorColorTexture = textureLoader.load('public/texture/wall/green_rough_planks_1k/green_rough_planks_diff_1k.jpg')
const firstFloorARMTexture = textureLoader.load('public/texture/wall/green_rough_planks_1k/green_rough_planks_arm_1k.jpg')
const firstFloorNormalTexture = textureLoader.load('public/texture/wall/green_rough_planks_1k/green_rough_planks_nor_gl_1k.jpg')

firstFloorColorTexture.colorSpace = THREE.SRGBColorSpace

firstFloorColorTexture.repeat.set(6, 5)
firstFloorColorTexture.wrapS = THREE.RepeatWrapping
firstFloorColorTexture.wrapT = THREE.RepeatWrapping

firstFloorARMTexture.repeat.set(6, 5)
firstFloorARMTexture.wrapS = THREE.RepeatWrapping
firstFloorARMTexture.wrapT = THREE.RepeatWrapping

firstFloorNormalTexture.repeat.set(6, 5)
firstFloorNormalTexture.wrapS = THREE.RepeatWrapping
firstFloorNormalTexture.wrapT = THREE.RepeatWrapping

// Second Floors ------------------------------
const secondFloorColorTexture = textureLoader.load('public/texture/wall/green_rough_planks_1k/green_rough_planks_diff_1k.jpg')
const secondFloorARMTexture = textureLoader.load('public/texture/wall/green_rough_planks_1k/green_rough_planks_arm_1k.jpg')
const secondFloorNormalTexture = textureLoader.load('public/texture/wall/green_rough_planks_1k/green_rough_planks_nor_gl_1k.jpg')

secondFloorColorTexture.colorSpace = THREE.SRGBColorSpace

secondFloorColorTexture.center.set(0.5, 0.5)
secondFloorColorTexture.rotation = Math.PI /2
secondFloorColorTexture.repeat.set(4, 3.5)
secondFloorColorTexture.wrapS = secondFloorColorTexture.wrapT = THREE.RepeatWrapping

secondFloorARMTexture.center.set(0.5, 0.5)
secondFloorARMTexture.rotation = Math.PI /2
secondFloorARMTexture.repeat.set(4, 3.5)
secondFloorARMTexture.wrapS = secondFloorARMTexture.wrapT = THREE.RepeatWrapping

secondFloorNormalTexture.center.set(0.5, 0.5)
secondFloorNormalTexture.rotation = Math.PI /2
secondFloorNormalTexture.repeat.set(4, 3.5)
secondFloorNormalTexture.wrapS = secondFloorNormalTexture.wrapT = THREE.RepeatWrapping

// Ground Floor
const groundFloorColorTexture = textureLoader.load('public/texture/wall/wood_planks_grey_1k/wood_planks_grey_diff_1k.jpg')
const groundFloorARMTexture = textureLoader.load('public/texture/wall/wood_planks_grey_1k/wood_planks_grey_arm_1k.jpg')
const groundFloorNormalTexture = textureLoader.load('public/texture/wall/wood_planks_grey_1k/wood_planks_grey_nor_gl_1k.jpg')

groundFloorColorTexture.colorSpace = THREE.SRGBColorSpace

groundFloorColorTexture.center.set(0.5, 0.5)
groundFloorColorTexture.rotation = Math.PI /2

groundFloorARMTexture.center.set(0.5, 0.5)
groundFloorColorTexture.rotation = Math.PI /2

groundFloorARMTexture.center.set(0.5, 0.5)
groundFloorColorTexture.rotation = Math.PI /2

groundFloorColorTexture.wrapS = groundFloorColorTexture.wrapT = THREE.RepeatWrapping
groundFloorARMTexture.wrapS = groundFloorARMTexture.wrapT = THREE.RepeatWrapping
groundFloorNormalTexture.wrapS = groundFloorNormalTexture.wrapT = THREE.RepeatWrapping

// --- Objects ---
// Platform ---------------------------
const platform = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20, 100, 100),
    new THREE.MeshStandardMaterial({
        alphaMap : platformAlphaTexture,
        transparent : true,
        map : platformAColorTexture,
        aoMap : platformARMTexture,
        roughnessMap : platformARMTexture,
        metalnessMap : platformARMTexture,
        normalMap : platformNormalTexture,
        displacementMap : platformDisplacementTexture,
        displacementScale : 0.3,
        displacementBias : - 0.2
    })
)
platform.rotation.x = - Math.PI/2
scene.add(platform)

// House -------------------------------
const house = new THREE.Group()
scene.add(house)

// Ground floor
const groundFloor = new THREE.Group()
house.add(groundFloor)

const groundFloorMaterial = new THREE.MeshStandardMaterial({
    map : groundFloorColorTexture,
    aoMap : groundFloorARMTexture,
    roughnessMap : groundFloorARMTexture,
    metalnessMap : groundFloorARMTexture,
    normalMap : groundFloorNormalTexture
})

const foundation = new THREE.Mesh(
    new THREE.BoxGeometry(2, 0.9, 2),
    groundFloorMaterial
)
foundation.position.y = 0.45
groundFloor.add(foundation)

// Steps
function createStep(width: number, height: number, depth : number, position : [number, number, number]){
    const color = groundFloorColorTexture
    const arm = groundFloorARMTexture
    const normal = groundFloorNormalTexture

    color.wrapS = color.wrapT = THREE.RepeatWrapping
    arm.wrapS = arm.wrapT = THREE.RepeatWrapping
    normal.wrapS = normal.wrapT = THREE.RepeatWrapping

    color.center.set(0.5, 0.5)
    arm.center.set(0.5, 0.5)
    normal.center.set(0.5, 0.5)

    color.rotation = Math.PI / 2
    arm.rotation = Math.PI / 2
    normal.rotation = Math.PI / 2

    color.repeat.set(width, depth)
    arm.repeat.set(width, depth)
    normal.repeat.set(width, depth)

    const material = new THREE.MeshStandardMaterial({
        map: color,
        aoMap: arm,
        roughnessMap: arm,
        metalnessMap: arm,
        normalMap: normal
    })

    const step = new THREE.Mesh(
        new THREE.BoxGeometry(width, height, depth),
        material
    )
    step.position.set(...position)
    return step
}

const entrySteps = new THREE.Group()
groundFloor.add(entrySteps)
entrySteps.position.y = 0.15

const firstStep = createStep(2, 0.3, 1, [0, 0, 1.5])
const secondStep = createStep(1.7, 0.3, 0.8, [0, 0.3, 1.4])
const thirdStep = createStep(1.4, 0.3, 0.6, [0, 0.6, 1.3])

entrySteps.add(firstStep, secondStep, thirdStep)

// First Floor
const firstFloor = new THREE.Mesh(
    new THREE.CylinderGeometry(1.5, 1.3, 4, 4, 1),
    new THREE.MeshStandardMaterial({
        map : firstFloorColorTexture,
        aoMap : firstFloorARMTexture,
        roughnessMap : firstFloorARMTexture,
        metalnessMap : firstFloorARMTexture,
        normalMap : firstFloorNormalTexture
    })
)
firstFloor.rotation.y = Math.PI/4
firstFloor.position.y = 2.9
house.add(firstFloor)

// Second Floor
const secondFloor = new THREE.Mesh(
    new THREE.CylinderGeometry(1.2, 1.2, 2.1, 3, 1),
    new THREE.MeshStandardMaterial({
        map : secondFloorColorTexture,
        aoMap : secondFloorARMTexture,
        roughnessMap : secondFloorARMTexture,
        metalnessMap : secondFloorARMTexture,
        normalMap : secondFloorNormalTexture
    })
)
secondFloor.position.y = 5.5
secondFloor.rotation.x = - Math.PI/2
house.add(secondFloor)

// Main Roofs
const mainRoofs = new THREE.Group()
const roofLeft = new THREE.Mesh(
    new THREE.BoxGeometry(2.5, 3, 0.1),
    new THREE.MeshStandardMaterial()
)
roofLeft.position.set(0, 0, -0.75)
roofLeft.rotation.x = Math.PI * 0.168

const roofRight = new THREE.Mesh(
    new THREE.BoxGeometry(2.5, 3, 0.1),
    new THREE.MeshStandardMaterial()
)
roofRight.position.set(0, 0, 0.75)
roofRight.rotation.x = - Math.PI * 0.168

mainRoofs.add(roofLeft, roofRight)
mainRoofs.rotation.y = Math.PI/2
mainRoofs.position.y = 5.5
house.add(mainRoofs)

// Door
const door = new THREE.Mesh(
    new THREE.BoxGeometry(1, 2, 0.15),
    new THREE.MeshStandardMaterial()
)
door.position.set(0, 1.9, 0.95)
house.add(door)

// Window house's frame
const windowHouse = new THREE.Group()
windowHouse.position.set(0, 5, 1.05)
scene.add(windowHouse)

const frame1 = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.05, 0.2),
    new THREE.MeshStandardMaterial()
)
windowHouse.add(frame1)

const frame2 = new THREE.Mesh(
    new THREE.BoxGeometry(0.6, 0.05, 0.2),
    new THREE.MeshStandardMaterial()
)
frame2.rotation.z = 1.8
frame2.position.set(-0.3, 0.3, 0)
windowHouse.add(frame2)

const frame3 = new THREE.Mesh(
    new THREE.BoxGeometry(0.6, 0.05, 0.2),
    new THREE.MeshStandardMaterial()
)
frame3.rotation.z = -1.8
frame3.position.set(0.3, 0.3, 0)
windowHouse.add(frame3)

const frame4 = new THREE.Mesh(
    new THREE.BoxGeometry(0.7, 0.05, 0.2),
    new THREE.MeshStandardMaterial()
)
frame4.rotation.z = -0.8
frame4.position.set(0.2, 0.78, 0)
windowHouse.add(frame4)

const frame5 = new THREE.Mesh(
    new THREE.BoxGeometry(0.7, 0.05, 0.2),
    new THREE.MeshStandardMaterial()
)
frame5.rotation.z = 0.8
frame5.position.set(-0.2, 0.78, 0)
windowHouse.add(frame5)

// Bushes ---------------------------------
const bushGeometry = new THREE.SphereGeometry(1, 32, 16, 0)
const bushMaterial = new THREE.MeshStandardMaterial({color: "green"})

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.position.set(1.8, 0.5, 0)

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.5, 0.5, 0.5)
bush2.position.set(1.5, 0.2, 1.2)

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(1.3, 1.3, 1.3)
bush3.position.set(-1.6, 0.6, -1.7)
scene.add(bush1, bush2, bush3)

// Graves -------------------------------------
const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial()

const graves = new THREE.Group()
scene.add(graves)

for(let i = 0; i < 30; i++){
    const angle = Math.random() * Math.PI * 2
    const radius = 4 + 4 * Math.random() // Khoảng cách an toàn xung quanh house
    const x = Math.sin(angle) * radius
    const z = Math.cos(angle) * radius

    const grave = new THREE.Mesh(graveGeometry, graveMaterial)
    grave.position.x = x 
    grave.position.y = Math.random() * 0.4 // Graves thò thụt
    grave.position.z = z
    grave.rotation.x = (Math.random() - 0.5) * 0.5 // Graves ngả nghiêng
    grave.rotation.y = (Math.random() - 0.5) * 0.5 // Graves ngả nghiêng
    grave.rotation.z = (Math.random() - 0.5) * 0.5 // Graves ngả nghiêng

    graves.add(grave)
}

// --- Lights ---
const ambientLight = new THREE.AmbientLight(0xffffff, 1)

const directionalLight = new THREE.DirectionalLight(0xfffffc, 1)
directionalLight.position.set(2, 10, 0)

scene.add(ambientLight, directionalLight)

// --- Camera Setup ---
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight);
camera.position.set(0, 5, 6)
const cameraHelper = new THREE.CameraHelper(camera)
scene.add(camera, cameraHelper)

// --- Controls ---
const controls = new OrbitControls(camera, canvas)
controls.target.set(0, 2, 0)
controls.enableDamping = true
controls.update()

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
