import L from 'leaflet'; // Leaflet for maps
import { gsap } from 'gsap'; // GSAP for animations

// Initialize styled map
const map = L.map('map', {
  zoomControl: false,
}).setView([31.7767, 35.2345], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoid2lsbHloMTUiLCJhIjoiY202ZWZxb3Q4MGhkODJqcHE2Mm5mY2ptayJ9.s0snQgTcuo47jdrQ5zmb0A', {
  id: 'mapbox/dark-v10', // Use "mapbox/light-v10" or other styles
  tileSize: 512,
  zoomOffset: -1,
  attribution: '&copy; <a href="https://www.mapbox.com/">Mapbox</a>',
}).addTo(map);

// Add custom markers
const marker = L.marker([31.7767, 35.2345], {
  icon: L.icon({
    iconUrl: './assets/custom-icon.png', // Add your custom icon
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  }),
}).addTo(map);

// Marker popup
marker.bindPopup(`
  <b>Garden Tomb</b><br>
  <button id="view360" class="btn">View 360° Panorama</button>
`);

// Panorama 360 functionality
marker.on('click', () => {
  const button = document.getElementById('view360');
  if (button) {
    button.addEventListener('click', () => {
      load360Panorama();
    });
  }
});

// Load Panorama Viewer
function load360Panorama() {
  pannellum.viewer('panorama', {
    type: 'equirectangular',
    panorama: './assets/360/garden_tomb.jpg',
    autoLoad: true,
    hotSpots: [
      {
        pitch: 0,
        yaw: 120,
        type: 'info',
        text: 'He is risen! - Matthew 28:6',
      },
    ],
  });
}

// Lazy load map
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      map.invalidateSize();
    }
  });
});
observer.observe(document.getElementById('map'));

// Animations
gsap.from('#map, #panorama', {
  opacity: 0,
  scale: 0.95,
  duration: 1.2,
  ease: 'power3.out',
});