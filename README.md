# React Internship Assignment – Artwork Table

## Overview
This project is a React + TypeScript application built using Vite.  
It displays artwork data from the Art Institute of Chicago API using PrimeReact DataTable with:

- Server-side pagination
- Persistent row selection
- Custom row selection overlay panel

API Used:
https://api.artic.edu/api/v1/artworks?page=1

---

## Tech Stack

- React 18
- TypeScript
- Vite
- PrimeReact
- PrimeIcons
- PrimeFlex

---

## Features Implemented

### 1. Server-Side Pagination
- Data is fetched from API per page.
- Pagination controls trigger new API calls.
- No prefetching of other pages.

### 2. Row Selection
- Individual row selection
- Select/Deselect all rows on current page
- Persistent selection when navigating between pages

### 3. Custom Row Selection
- Overlay panel allows selecting `n` rows.
- Only selects rows from the current page.
- Does NOT prefetch or store rows from other pages.
- Handles invalid input safely.

### 4. Persistent Selection Strategy
- Only row IDs are stored.
- No mass data storage.
- Previously visited pages are fetched again from API.
- Selection state is restored using stored IDs.

---

## How to Run Locally

1. Clone the repository:
2. git clone <your-repository-url>


2. Install dependencies:

npm install


3. Start development server:

npm run dev


4. Open in browser:

http://localhost:5173


---

## Live Deployment

Deployed using Netlify.

Live URL:
<your-netlify-link>

---

## Notes

- Built using Vite + TypeScript as required.
- No AI-generated bulk-fetch logic used.
- No prefetching of multiple pages.
- Fully compliant with assignment instructions.
