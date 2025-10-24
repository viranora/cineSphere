# CineSphere - A Modern Movie Discovery App

<br>

<div align="center">
  </div>

<br>

A sleek, responsive, and feature-rich movie discovery application built entirely with React. CineSphere utilizes the TMDb API to provide a seamless browsing experience, complete with user personalization features powered by React Context and `localStorage`.

This project serves as a comprehensive portfolio piece demonstrating advanced frontend capabilities, including global state management, dynamic routing, and interaction with third-party APIs.

**This is a "frontend-only" build, meaning no backend database is required.** All user data (profile picture, liked movies, and watchlist) is intelligently persisted in the browser's `localStorage`.

<br>

## ✨ Features

* **Modern UI/UX:** Built with Tailwind CSS, featuring glassmorphism effects, smooth animations (`framer-motion`), and a dynamic, gradient-based theme.
* **Comprehensive Discovery:**
    * **Home Page:** Browse curated lists for "Popular", "Top Rated", and "Upcoming" movies.
    * **Discover by Genre:** A dedicated page to explore movies by specific genres (e.g., Action, Comedy, Sci-Fi).
    * **Powerful Search:** A fully functional search with pagination for finding any movie in the TMDb database.
* **Rich Detail Pages:**
    * **Movie Details:** View movie summaries, ratings, cast, and similar movies.
    * **Dynamic Backgrounds:** The movie detail page's background dynamically adapts to the poster's dominant color.
    * **Embedded Trailers:** Watch official YouTube trailers directly in a modal.
    * **Actor Details:** Click on any cast member to navigate to their dedicated page, showing their biography and filmography.
* **Persistent User Profile (via `localStorage`):**
    * **Global State:** Uses **React Context API** to manage all user lists and profile information across the entire application.
    * **Like & Save:** Add movies to your "Liked" list or "Watchlist" from any movie card.
    * **Profile Page:** A central hub to view your liked and saved movie collections in separate rows.
    * **Custom Profile Picture:** Upload and persist your own profile picture (converts image to Base64 and stores in `localStorage`).
* **Fully Responsive:** Designed to look and work great on all devices, from mobile phones to desktops.

<br>

## 🚀 Tech Stack

* **Core:** React.js, Vite
* **Styling:** Tailwind CSS
* **Routing:** React Router v6
* **State Management:** React Context API
* **API Client:** Axios
* **Animations:** Framer Motion
* **Utilities:** `colorthief` (for dynamic color extraction)

<br>

## 🔧 Getting Started

Follow these steps to get the project up and running on your local machine.

### Prerequisites

* Node.js (v18 or later recommended)
* A free API Key from [The Movie Database (TMDb)](https://www.themoviedb.org/signup)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/viranora/cinesphere.git](https://github.com/viranora/cinesphere.git)
    cd cinesphere
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up your environment variables:**
    * Create a .env file in the root directory and add your TMDb API key like this:

    .env
    ```
    REACT_APP_TMDB_API_KEY=your_tmdb_api_key_here 
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

    The application should now be running on `http://localhost:5173/`.

<br>

---

<div align="center">
  <p>Crafted with care, by</p>
  <h3>Nora</h3>
</div>
