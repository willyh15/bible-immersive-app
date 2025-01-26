import L from 'leaflet'; // Leaflet for maps
import * as pannellum from 'pannellum'; // Correct import for Pannellum
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

// Animate map and panorama containers
gsap.from('#map, #panorama', {
  opacity: 0,
  y: 20,
  duration: 1.5,
  ease: 'power3.out',
  stagger: 0.3,
});

// Lazy load map when it enters the viewport
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && entry.target.id === 'map') {
      map.invalidateSize();
    }
  });
});
observer.observe(document.getElementById('map'));