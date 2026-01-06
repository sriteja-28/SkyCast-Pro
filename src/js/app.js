/**
 * SkyCast Engine 
 *
 */


// CONFIGURATION

const CONFIG = {
    API_KEY: '00b441c7e45ea30ad8758d5409fd0eea',
    BASE_URL: "https://api.openweathermap.org/data/2.5",
    GEO_URL: "https://api.openweathermap.org/geo/1.0/direct"
};

// DOM ELEMENTS
const dom = {
    input: document.getElementById("cityInput"),
    button: document.getElementById("searchBtn"),
    suggestions: document.getElementById("suggestions"),
    weatherBox: document.getElementById("weather"),
    loader: document.getElementById("loader"),
    city: document.getElementById("cityName"),
    date: document.getElementById("dateTime"),
    temp: document.getElementById("tempDisplay"),
    desc: document.getElementById("weatherDesc"),
    wind: document.getElementById("windVal"),
    humid: document.getElementById("humidityVal"),
    icon: document.getElementById("weatherIcon")
};


let debounceTimer;

const init = () => {
    dom.button.addEventListener("click", () => performSearch(dom.input.value));

    // Enter key support
    dom.input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") performSearch(dom.input.value);
    });

    // Autocomplete Dropdown Logic
    dom.input.addEventListener("input", (e) => {
        clearTimeout(debounceTimer);
        const query = e.target.value.trim();

        if (query.length < 3) {
            dom.suggestions.classList.add("hidden");
            return;
        }

        debounceTimer = setTimeout(() => fetchSuggestions(query), 400);
    });

    // Global click listener to close dropdown
    document.addEventListener("click", (e) => {
        if (!dom.suggestions.contains(e.target) && e.target !== dom.input) {
            dom.suggestions.classList.add("hidden");
        }
    });

    // Default view
    const lastCity = localStorage.getItem("lastWeatherCity") || "Hyderabad";
    performSearch(lastCity);

    // Function to update the copyright year dynamically
    const updateCopyrightYear = () => {
        const yearElement = document.getElementById("year");
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    };

    // Call this inside your init() or at the bottom of the script
    updateCopyrightYear();

};

/**
 * FETCHING LOGIC
 */

async function fetchSuggestions(query) {
    try {
        const res = await fetch(`${CONFIG.GEO_URL}?q=${query}&limit=5&appid=${CONFIG.API_KEY}`);
        const data = await res.json();
        renderSuggestions(data);
    } catch (err) {
        console.warn("Geocoding failed:", err);
    }
}

function renderSuggestions(cities) {
    dom.suggestions.innerHTML = "";
    if (!cities.length) {
        dom.suggestions.classList.add("hidden");
        return;
    }

    cities.forEach(city => {
        const div = document.createElement("div");
        div.className = "suggestion-item p-4 cursor-pointer border-b border-white/5 last:border-0 hover:bg-white/10 transition-colors";
        div.innerHTML = `
      <div class="text-sm font-bold">${city.name}</div>
      <div class="text-xs text-blue-200/60">${city.state ? city.state + ', ' : ''}${city.country}</div>
    `;
        div.onclick = () => {
            dom.input.value = city.name;
            dom.suggestions.classList.add("hidden");
            performSearch(city.name);
        };
        dom.suggestions.appendChild(div);
    });
    dom.suggestions.classList.remove("hidden");
}

async function performSearch(city) {
    if (!city) return;

    // UI State: Loading
    dom.loader.classList.remove("hidden");
    dom.weatherBox.classList.add("hidden");
    dom.suggestions.classList.add("hidden");

    try {
        const res = await fetch(`${CONFIG.BASE_URL}/weather?q=${city}&units=metric&appid=${CONFIG.API_KEY}`);
        if (!res.ok) throw new Error("City not found");

        const data = await res.json();
        updateUI(data);
        localStorage.setItem("lastWeatherCity", city);
    } catch (err) {
        alert(`Error: ${err.message}`);
    } finally {
        dom.loader.classList.add("hidden");
    }
}

function updateUI(data) {
    const { name, main, weather, wind } = data;

    dom.city.textContent = name;
    dom.date.textContent = new Date().toLocaleDateString('en-US', {
        weekday: 'long', month: 'short', day: 'numeric'
    });
    dom.temp.textContent = `${Math.round(main.temp)}°`;
    dom.desc.textContent = weather[0].description;
    dom.wind.textContent = `${wind.speed} m/s`;
    dom.humid.textContent = `${main.humidity}%`;

    //source
    const iconCode = weather[0].icon;
    dom.icon.src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

    console.log("iconCode:", weather[0].icon);
    console.log("icon URL:", `https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`);
    dom.icon.src = `https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`;


    //box is visible only after content is ready
    dom.icon.onload = () => {
        dom.weatherBox.classList.remove("hidden");
    };

    // Fallback if image fails or takes too long
    setTimeout(() => dom.weatherBox.classList.remove("hidden"), 500);
}

init();