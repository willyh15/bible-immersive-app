import L from 'leaflet'; // Leaflet for maps
import { gsap } from 'gsap'; // GSAP for animations

// Initialize styled map
const map = L.map('map', {
  zoomControl: false,
}).setView([31.7767, 35.2345], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoid2lsbHloMTUiLCJhIjoiY202ZWc5bnc1MTRoNTJrcTRnOXMwejkxMiJ9.YbWPtp75MIUIfzCeMYDlEQ', {
  id: 'mapbox/dark-v10', // Dark-themed style
  tileSize: 512,
  zoomOffset: -1,
  attribution: '&copy; <a href="https://www.mapbox.com/">Mapbox</a>',
}).addTo(map);

// Add custom marker
const marker = L.marker([31.7767, 35.2345], {
  icon: L.icon({
    iconUrl: './assets/custom-icon.png', // Add your custom icon here
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  }),
}).addTo(map);

// Bind popup to marker
marker.bindPopup(`
  <b>Garden Tomb</b><br>
  <button id="view360" class="btn">View 360° Panorama</button>
`);

// Handle 360° Panorama button click
marker.on('popupopen', () => {
  const button = document.getElementById('view360');
  if (button) {
    button.addEventListener('click', load360Panorama);
  }
});

// Load Panorama Viewer
function load360Panorama() {
  pannellum.viewer('panorama', {
    type: 'equirectangular',
    panorama: './assets/360/garden_tomb.jpg', // Panorama image path
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

// Lazy load the map
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      map.invalidateSize();
    }
  });
});
observer.observe(document.getElementById('map'));

// Animations for map and panorama containers
gsap.from('#map, #panorama', {
  opacity: 0,
  scale: 0.95,
  duration: 1.2,
  ease: 'power3.out',
});