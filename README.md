# 🍿 usePopcorn

A React-based movie search and rating application that allows users to search for movies, view details, and maintain a personal watchlist with ratings. You can see the project in here, [empowered by AWS Amplify](https://main.d1mumhxacwm9eg.amplifyapp.com)

## 🌟 Features

- Search movies using OMDB API
- View detailed movie information
- Add movies to your watchlist
- Rate movies with a custom star rating system
- Persistent storage of watched movies
- Responsive design
- Keyboard shortcuts for enhanced navigation

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OMDB API key

### Installation

1. Clone the repository
2. Install dependencies:
_bashhere_
npm install
_bashhere_

3. Create a `.env` file in the root directory and add your OMDB API key: `REACT_APP_KEY=your_omdb_api_key_here`

### Running the Application

To start the development server:
_bashhere_
npm start
_bashhere_

The application will be available at `http://localhost:3000`

## 🛠️ Built With

- React 18.3.1
- Custom Hooks
- CSS Modules
- OMDB API

## 📦 Project Structure
```
src/
├── components/ # React components
├── hooks/ # Custom React hooks
├── App.js # Main application component
└── index.js # Application entry point
```

## 🎯 Key Components

### Main Features
- Dynamic movie search with debouncing
- Custom star rating system
- Local storage integration
- Keyboard shortcuts (ESC to close, ENTER to focus search)
- Movie statistics dashboard

### Custom Hooks

The application uses several custom hooks for better code organization and reusability:

- `useMovies`: Handles movie fetching and search logic
- `useLocalStorageState`: Manages persistent storage
- `useKeyboard`: Handles keyboard events
- `useTitle`: Manages dynamic document titles

## ⌨️ Keyboard Shortcuts

- `ESC` - Close movie details
- `ENTER` - Focus search input
- `ENTER` (when in search) - Search for movies

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- OMDB API for providing movie data
- React team for the amazing framework
- Create React App for the initial project setup

