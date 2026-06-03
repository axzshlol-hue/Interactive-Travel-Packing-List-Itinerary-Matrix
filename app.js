// Base packing templates database
const categoryItems = {
    beach: ["Swimming suit", "Sunscreen (SPF 50)", "Sunglasses", "Beach towel", "Flip flops", "Light t-shirts", "Shorts"],
    cold: ["Heavy winter coat", "Thermal layers", "Beanie / Woolen cap", "Gloves", "Scarf", "Thick wool socks", "Lip balm"],
    adventure: ["Hiking boots", "Waterproof jacket", "Refillable water bottle", "Bug spray", "Backpack", "Flashlight / Headlamp", "First aid kit"],
    business: ["Formal suits / Blouses", "Ironed dress shirts", "Dress shoes", "Laptop & charger", "Notebook & pen", "Business cards"]
};

const universalItems = ["Passport / ID", "Toothbrush & toothpaste", "Phone charger", "Deodorant", "Wallet / Cash & cards"];

let totalItemsCount = 0;
let checkedItemsCount = 0;

// Element Selectors
const categorySelect = document.getElementById('trip-category');
const daysInput = document.getElementById('trip-days');
const generateBtn = document.getElementById('generate-btn');
const packingList = document.getElementById('packing-list');
const progressFill = document.getElementById('progress-fill');
const progressPercent = document.getElementById('progress-percent');
const itineraryContainer = document.getElementById('itinerary-days-container');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

// Tab Switching System Logic
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        button.classList.add('active');
        document.getElementById(`tab-${button.dataset.tab}`).classList.add('active');
    });
});

// Update Checklist Progress Bar Calculations
function updateProgress() {
    const checkboxes = packingList.querySelectorAll('input[type="checkbox"]');
    totalItemsCount = checkboxes.length;
    
    let checkedCount = 0;
    checkboxes.forEach(cb => {
        if (cb.checked) {
            checkedCount++;
            cb.parentElement.classList.add('checked');
        } else {
            cb.parentElement.classList.remove('checked');
        }
    });

    const percentage = totalItemsCount > 0 ? Math.round((checkedCount / totalItemsCount) * 100) : 0;
    progressFill.style.width = `${percentage}%`;
    progressPercent.textContent = `${percentage}%`;
}

// Generate Lists Core Engine Execution
function buildTravelMatrix() {
    const selectedCategory = categorySelect.value;
    const daysCount = parseInt(daysInput.value) || 3;

    // --- 1. PACKING GENERATOR LOGIC ---
    packingList.innerHTML = '';
    
    // Combine standard essentials with category specific variables
    const specificList = categoryItems[selectedCategory] || [];
    const absoluteMasterList = [...universalItems, ...specificList];

    absoluteMasterList.forEach(item => {
        const li = document.createElement('li');
        li.className = 'packing-item';
        
        // Dynamic clothing item math based on duration input
        let itemDisplay = item;
        if (item.includes("t-shirts") || item.includes("socks") || item.includes("shirts")) {
            itemDisplay = `${item} (x${daysCount})`;
        }

        li.innerHTML = `
            <input type="checkbox">
            <span>${itemDisplay}</span>
        `;
        
        // Listen to active state shifts
        li.querySelector('input').addEventListener('change', updateProgress);
        packingList.appendChild(li);
    });

    // --- 2. ITINERARY CARD GENERATOR LOGIC ---
    itineraryContainer.innerHTML = '';
    
    for (let d = 1; d <= daysCount; d++) {
        const dayCard = document.createElement('div');
        dayCard.className = 'day-card';
        dayCard.innerHTML = `
            <h4>DAY ${d} // ACTIVITIES</h4>
            <textarea rows="3" placeholder="Enter plans, flight schedules, or reservations for Day ${d}..."></textarea>
        `;
        itineraryContainer.appendChild(dayCard);
    }

    updateProgress();
}

// Events Initial Bindings
generateBtn.addEventListener('click', buildTravelMatrix);
window.addEventListener('DOMContentLoaded', buildTravelMatrix);