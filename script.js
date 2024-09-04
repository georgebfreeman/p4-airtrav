// script.js

// Get the travel and hotel section elements
const travelSection = document.querySelector('#travel-section');
const hotelSection = document.querySelector('#hotel-section');

// Get the travel and hotel section headers
const travelHeader = document.querySelector('#travel-header');
const hotelHeader = document.querySelector('#hotel-header');

// Add click event listeners to the headers
travelHeader.addEventListener('click', () => {
  travelSection.classList.toggle('hidden');
});

hotelHeader.addEventListener('click', () => {
  hotelSection.classList.toggle('hidden');
});


// Define the plan ahead items
const planAheadItems = [
    { title: 'Check visa requirements', action: 'Check visa' },
    { title: 'Check visa requirements', action: 'Check visa' },
    { title: 'Check visa requirements', action: 'Get Insurance' },
    { title: 'Check visa requirements', action: 'Buy tickets' },
  ];
  
  // Get the plan ahead section element
  const planAheadSection = document.querySelector('#plan-ahead-section');
  
  // Create and append the plan ahead items
  planAheadItems.forEach((item) => {
    const itemElement = document.createElement('div');
    itemElement.classList.add('card', 'bg-base-100', 'shadow-xl');
  
    itemElement.innerHTML = `
      <div class="card-body flex flex-row justify-between items-center">
        <div class="flex items-center">
          <span class="bg-orange-100 text-orange-500 p-2 rounded-full mr-2">📄</span>
          <p>${item.title}</p>
        </div>
        <button class="btn btn-outline">${item.action}</button>
      </div>
    `;
  
    planAheadSection.appendChild(itemElement);
  });