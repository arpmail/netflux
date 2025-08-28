# 🎬 Netflux
*“Your gateway to movies, fast and simple.”*

Netflux is a **React + Vite** powered movie discovery website that allows users to browse, search, and explore trending movies.  
It integrates with [The Movie Database (TMDB)](https://www.themoviedb.org/) API to fetch movie data, while leveraging [Appwrite](https://cloud.appwrite.io/) for backend services and data manipulation.

---

## ✨ Features
- 🔎 **Search Movies** – Find movies by title using TMDB API.
- 🔥 **Trending Movies** – View the most popular movies updated daily.
- 🎥 **Movie Details** – Explore additional movie information.
- ☁️ **Appwrite Integration** – Backend services for authentication, data storage, and API manipulation.
- ⚡ **Fast Development** – Built with React + Vite for speed and simplicity.

---

## 🛠️ Tech Stack
- **Frontend:** React + Vite, JavaScript (ES6+), CSS/Tailwind (if used)
- **API:** [The Movie Database (TMDB)](https://www.themoviedb.org/)
- **Backend / Cloud:** [Appwrite](https://cloud.appwrite.io/)
- **Package Manager:** npm

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (>= 20 recommended)
- npm 
- TMDB API Key → Get it from [here](https://www.themoviedb.org/settings/api)
- Appwrite Cloud project → [Sign up here](https://cloud.appwrite.io/)

### Installation

1. Clone the repo & install:
   ```bash
   git clone https://github.com/your-username/netflux.git
   cd netflux
   npm install
   
2. Create a .env.local file in the root with:
   ```bash
   VITE_TMDB_API_KEY=your_tmdb_api_key
   VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   VITE_APPWRITE_PROJECT=your_appwrite_project_id
   
3. Run the application:
   ```bash
   npm run dev
   

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!

Netflux is developed by ✅ [arpmail] ✅.