import { db } from './firebase-config.js';
import { collection, getDocs } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js';

let allRooms = [];

// Function to fetch rooms from Firebase
async function fetchRooms() {
    console.log('heyy')
    try {
        const querySnapshot = await getDocs(collection(db, "stays"));
        allRooms = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        filterAndDisplayRooms();
    } catch (error) {
        console.error("Error fetching rooms:", error);
        document.getElementById('loading').textContent = 'Error loading rooms. Please try again later.';
    }
}

// Function to create room card HTML
function createRoomCard(room) {
    return `
        <div class="room-card">
            <h2 class="room-title">${room.name}</h2>
            <div class="room-type">${room.stayType}</div>
            <div class="room-gender">${room.gender}</div>
            <span class="room-status status-${room.status}">${room.status}</span>
            <div class="room-price">${room.rent}/month</div>
            <div class="room-features">
                <strong>Features:</strong> ${room.features}
            </div>
            <div class="room-features">
                <strong>Security:</strong> ${room.security}
            </div>
            <div class="room-features">
                <strong>Food:</strong> ${room.food}
            </div>
            <div class="room-location">📍 ${room.location}</div>
            ${room.contactnumber ? `
                <a href="tel:${room.contactnumber}" class="call-button">📞 Call Now</a>
            ` : '<p class="no-contact">No contact available</p>'}
        </div>
    `;
}

// Function to filter and display rooms
function filterAndDisplayRooms() {
    const stayTypeFilter = document.getElementById('stayTypeFilter').value;
    const genderFilter = document.getElementById('genderFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;
    const maxRentFilter = document.getElementById('maxRent').value;
    
    let filteredRooms = allRooms;

    if (stayTypeFilter) {
        filteredRooms = filteredRooms.filter(room => room.stayType === stayTypeFilter);
    }
    
    if (genderFilter) {
        filteredRooms = filteredRooms.filter(room => room.gender === genderFilter);
    }
    
    if (statusFilter) {
        filteredRooms = filteredRooms.filter(room => room.status === statusFilter);
    }
    
    if (maxRentFilter) {
        filteredRooms = filteredRooms.filter(room => room.rent <= parseFloat(maxRentFilter));
    }

    const roomsContainer = document.getElementById('roomsContainer');
    const noResults = document.getElementById('noResults');
    
    if (filteredRooms.length === 0) {
        roomsContainer.innerHTML = '';
        noResults.style.display = 'block';
    } else {
        noResults.style.display = 'none';
        roomsContainer.innerHTML = filteredRooms.map(room => createRoomCard(room)).join('');
    }
}

// Add event listeners to filters
document.getElementById('stayTypeFilter').addEventListener('change', filterAndDisplayRooms);
document.getElementById('genderFilter').addEventListener('change', filterAndDisplayRooms);
document.getElementById('statusFilter').addEventListener('change', filterAndDisplayRooms);
document.getElementById('maxRent').addEventListener('input', filterAndDisplayRooms);

// Initial load
document.getElementById('loading').style.display = 'block';
fetchRooms().then(() => {
    document.getElementById('loading').style.display = 'none';
});
