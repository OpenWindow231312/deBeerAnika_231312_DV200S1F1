# 🥗 FactFork – Nutritional Product Comparison & Insights App

<img width="883" height="517" alt="Ovddderview" src="https://github.com/user-attachments/assets/72ad8c0e-b5cb-4261-8a33-bd8017a8ff77" />

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

<img width="883" height="517" alt="compare 4" src="https://github.com/user-attachments/assets/64f8bd43-7c0b-46ac-b355-656e4f000a06" />


### Compare via barcodes
```
https://world.openfoodfacts.org/api/v0/product/6001065031245.json
```

### Product Overview example, "Coca-Cola"
See the nutrional values in depth, of one specific product. 
<img width="883" height="517" alt="compare 2" src="https://github.com/user-attachments/assets/84cd92b2-6f5d-42c3-812e-b5a82841b200" />

### Nutritional Trends overview
See the difference in sugar, carbohydrates, fat ect, of the most popular foods, like ice cream and soda. 
<img width="883" height="517" alt="compare 1" src="https://github.com/user-attachments/assets/6cbae3f6-3b09-43fc-b4f3-2bd8af8dd817" />


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

<img width="1599" height="428" alt="Desktop - 2" src="https://github.com/user-attachments/assets/0183174e-a324-43af-9f95-448b3da5e100" />
