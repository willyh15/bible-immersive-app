import L from 'leaflet'; // Leaflet for maps
import pannellum from 'pannellum'; // Pannellum for 360° viewer
import { gsap } from 'gsap'; // GSAP for animations

// Initialize Leaflet map
const map = L.map('map').setView([31.7767, 35.2345], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors',
}).addTo(map);

const marker = L.marker([31.7767, 35.2345]).addTo(map).bindPopup(`
  <b>Garden Tomb</b><br>
  <button id="view360" class="bg-blue-500 text-white py-1 px-2 rounded">
    View 360° Panorama
  </button>
`);

marker.on('click', () => {
  const btn = document.getElementById('view360');
  if (btn) {
    btn.addEventListener('click', () => {
      load360Panorama();
    });
  }
});

// Load 360° Panorama
function load360Panorama() {
  pannellum.viewer('panorama', {
    type: 'equirectangular',
    panorama: './assets/360/garden_tomb.jpg',
    autoLoad: true,
    hotSpots: [
      {
        pitch: -2.1,
        yaw: 120.2,
        type: 'info',
        text: 'He is risen! - Matthew 28:6',
      },
    ],
  });
}

// Animate map container
gsap.from('#map', {
  opacity: 0,
  scale: 0.9,
  duration: 1.5,
  ease: 'power3.out',
});

// Animate markers
gsap.from('.leaflet-marker-icon', {
  y: -50,
  opacity: 0,
  duration: 1,
  stagger: 0.3,
});
