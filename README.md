# 🥗 FactFork – Nutritional Product Comparison & Insights App

<img width="2880" height="1620" alt="FactFork Screenshot" src="https://github.com/user-attachments/assets/placeholder.png" />

> A smart nutritional comparison tool powered by the **Open Food Facts API**, featuring **dynamic data visualisation**, product metadata comparison, and intuitive React UI components.

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React-61DAFB?logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/API-Open%20Food%20Facts-44CC11?logo=leaflet&logoColor=white" />
  <img src="https://img.shields.io/badge/Charts-Chart.js-FF6384?logo=chartdotjs&logoColor=white" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Library-Axios-5A29E4?logo=axios&logoColor=white" />
  <img src="https://img.shields.io/badge/Storage-Local%20Storage-000000" />
  <img src="https://img.shields.io/badge/License-MIT-green" />
</p>

---

# 📘 Table of Contents

1. Project Header  
2. About The Project  
3. Getting Started  
4. Project Features  
5. Usage Examples  
6. Development Process  
7. Final Outcome  
8. Conclusion  
9. Project Structure  
10. Contributing  
11. License  
12. Author  

---

# Project Header

### Project Title Block
- **Name:** FactFork – Product Comparison App  
- **Type:** Nutritional comparison & data visualisation web app  
- **Purpose:** Help users compare food products using API data & charts  
- **Author:** Anika de Beer  

---

# About The Project

FactFork is a **React-based web app** that compares the nutritional values of two products using real-time data from the **Open Food Facts API**.  
Users search, select products, and immediately get interactive visual comparisons.

---

# 🔍 Open Food Facts API

**Base URL**
```
https://world.openfoodfacts.org
```

### Search Endpoint
```
GET /cgi/search.pl?search_terms={query}&search_simple=1&action=process&json=1
```

### Barcode Lookup
```
GET /api/v0/product/{barcode}.json
```

---

# Getting Started

### Installation

```bash
git clone https://github.com/OpenWindow231312/deBeerAnika_231312_DV200S1F1.git
cd deBeerAnika_231312_DV200S1F1
npm install
npm start
```

### Build

```bash
npm run build
```

---

# Project Features

- Product search (API powered)  
- Compare two products side-by-side  
- Dynamic charts (Bar, Pie, Radar)  
- Local Storage persistence  
- Clean UI components  

---

# Usage Examples

### Compare "Corn Flakes" vs "Oats"
- Search → Select → View nutritional breakdown  
- Charts display calories, sugars, protein, carbs  

### Compare via barcodes
```
https://world.openfoodfacts.org/api/v0/product/6001065031245.json
```

### Compare "Coke Zero" vs "Coca-Cola"
Radar chart shows:
- Zero sugar vs high sugar  
- Zero calories vs 139 kcal  

---

# Development Process

- Axios for API calls  
- Chart.js for visualisation  
- React state management  
- Skeleton loaders for smoother UX  
- Component-based architecture  

---

# Final Outcome

FactFork provides easy-to-understand nutritional insights through live data and meaningful visualisation.

---

# Conclusion

This project demonstrates how API integration + React + visualisation can empower healthier decision‑making.

---

# Project Structure

```
/src
  /components
    BarChartCompare.js
    PieChart.js
    RadarChartCompare.js
    WidgetHeaderCompare.js
    Searchbar.js
    SkeletonLoader.js
  /pages
    Compare.js
    Timeline.js
  /styles
    Compare.css
    Timeline.css
  /assets
    Vegcolours.svg
  App.js
  index.js
  package.json
  README.md
```

---

# Contributing

Contributions are welcome!  
Fork → Improve → Pull request.

---

# License

MIT License – see LICENSE file.

---

# Author
**Anika de Beer**  
Student Number **231312**  
Open Window Institute
