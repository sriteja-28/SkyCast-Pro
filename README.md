# 🌦️ SkyCast Pro

SkyCast Pro is a premium, responsive weather dashboard built with a sleek glassmorphic UI. It provides real-time weather data, city autocomplete suggestions, and atmospheric details with high-performance animations.



## ✨ Features

- **Dynamic Glassmorphism:** Ultra-modern UI with backdrop blur effects and animated background blobs.
- **Real-time Autocomplete:** Smart search with debounced API calls for city suggestions.
- **Fully Responsive:** Optimized for mobile, tablet, and desktop displays.
- **Local Persistence:** Remembers your last searched city using `localStorage`.
- **Weather Insights:** High-resolution icons, wind speed, and humidity tracking.

## 🛠️ Tech Stack

- **HTML5** & **Vanilla JavaScript**
- **Tailwind CSS** (via CDN for rapid styling)
- **OpenWeatherMap API** (Current Weather & Geocoding)
- **Google Fonts** (Plus Jakarta Sans)

## 📂 Project Structure

```text
weather-app/
├─ public/           # Static assets like favicon.ico
├─ src/
│  ├─ css/           # Custom stylesheets
│  ├─ js/
│  │  └─ app.js      # Core logic & API handling
│  └─ index.html     # Main entry point (UI)
├─ .env              # Template for environment variables
├─ README.md         # Documentation
└─ vercel.json       # Deployment configuration

🚀 Setup & Installation
Clone the repository:

git clone [https://github.com/your-username/weather-app.git](https://github.com/your-username/weather-app.git)
cd weather-app
Configure API Key:

Sign up at OpenWeatherMap to get your free API key.

Open src/js/app.js.

Update the CONFIG object with your key:

JavaScript

const CONFIG = {
  API_KEY: 'YOUR_ACTUAL_KEY_HERE',
  ...
};
Run Locally: Simply open src/index.html in any browser or use the VS Code "Live Server" extension.

🌐 Deployment (Vercel)
To deploy this project as a high-performance web app:

Push your code to a GitHub repository.

Login to Vercel and click "Add New" -> "Project".

Import your repository.

Project Settings:

Framework Preset: Other (Vanilla JS)

Root Directory: If your index.html is inside src, set the root directory to src in the Vercel dashboard.

Click Deploy.


