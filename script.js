// Three.js Sahnesi
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Zemin
const groundGeometry = new THREE.PlaneGeometry(50, 50);
const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x228B22, side: THREE.DoubleSide });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// 3D Kapı
const doorGeometry = new THREE.BoxGeometry(5, 10, 1);
const doorMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513 });
const door = new THREE.Mesh(doorGeometry, doorMaterial);
door.position.set(0, 5, -15);
scene.add(door);

// 3D Karakter
const characterGeometry = new THREE.SphereGeometry(1, 16, 16);
const characterMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const character = new THREE.Mesh(characterGeometry, characterMaterial);
character.position.set(0, 1, 5);
scene.add(character);

// Kamera Pozisyonu
camera.position.set(0, 10, 20);
camera.lookAt(0, 0, 0);

// Klavye Kontrolleri
const keys = {};
document.addEventListener("keydown", (event) => { keys[event.key] = true; });
document.addEventListener("keyup", (event) => { keys[event.key] = false; });

function animate() {
    requestAnimationFrame(animate);

    if (keys["w"]) character.position.z -= 0.1;
    if (keys["s"]) character.position.z += 0.1;
    if (keys["a"]) character.position.x -= 0.1;
    if (keys["d"]) character.position.x += 0.1;

    // Kapıya Ulaşınca Animasyon
    if (character.position.z < -14) {
        door.position.y -= 0.05;
        if (door.position.y < -5) {
            console.log("Kapı açıldı! İçeri giriyoruz...");
        }
    }

    renderer.render(scene, camera);
}

animate();
