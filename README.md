# 🥗 FactFork – Product Comparison & Nutritional Insights App

<img width="2880" height="1620" alt="FactFork Screenshot" src="https://github.com/user-attachments/assets/placeholder.png" />

> A smart nutritional comparison tool powered by the Open Food Facts API and dynamic data visualisation.

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

## 2.1 Project Header

### Project title block

- **Name:** FactFork – Product Comparison App  
- **Type of digital solution:** Nutritional comparison & data visualisation web app  
- **Primary purpose:** Help users compare food products by nutritional value using charts and dynamic insights  
- **Author:** Anika de Beer  

### Table of contents

1. [2.1 Project Header](#21-project-header)  
2. [2.2 About The Project](#22-about-the-project)  
3. [2.3 Getting Started](#23-getting-started)  
4. [2.4 Project Features](#24-project-features)  
5. [2.5 Development Process](#25-development-process)  
6. [2.6 Final Outcome](#26-final-outcome)  
7. [2.7 Conclusion](#27-conclusion)  
8. [2.8 Footer](#28-footer)

---

## 2.2 About The Project

### Short project description

**FactFork** is an interactive product comparison tool that retrieves nutritional data from the **Open Food Facts API** and turns it into visual insights. Users can search for products, select two options, and instantly compare calories, fats, sugars, proteins, and more using **Bar Charts, Pie Charts, and Radar Charts**.

By integrating live API data with rich visualisation, FactFork helps users make more informed food choices.

---

## 🔍 Open Food Facts API (Data Source)

FactFork relies on the **Open Food Facts Public API**, a global open database of food products.

### 📌 Base URL
```
https://world.openfoodfacts.org
```

### 📌 Search Endpoint
```
GET /cgi/search.pl?search_terms={query}&search_simple=1&action=process&json=1
```

### Example Response
```json
{
  "products": [
    {
      "product_name": "Oreo Original",
      "image_url": "https://...",
      "nutriments": {
        "energy-kcal_100g": 480,
        "fat_100g": 20,
        "sugars_100g": 38,
        "proteins_100g": 4.3,
        "carbohydrates_100g": 69
      },
      "quantity": "154g",
      "categories": "Snacks, Biscuits"
    }
  ]
}
```

### 📌 Barcode Lookup Endpoint
```
GET /api/v0/product/{barcode}.json
```

---

## 2.3 Getting Started

### Prerequisites

- Node.js  
- npm  

### Installation

```bash
git clone https://github.com/OpenWindow231312/deBeerAnika_231312_DV200S1F1.git
cd deBeerAnika_231312_DV200S1F1
npm install
npm start
```

---

## 2.4 Project Features

- Product search powered by Open Food Facts  
- Compare two products side-by-side  
- Dynamic charts (Bar, Pie, Radar)  
- Local Storage persistence  
- Visual nutritional insights  

---

## 2.5 Development Process

- API integration using Axios  
- Chart.js visualisation  
- State management via React  
- Lazy loading for charts  
- Clean component-based structure  

---

## 2.6 Final Outcome

FactFork delivers an intuitive, visual nutritional comparison experience using real-world API data and dynamic charts.

---

## 2.7 Conclusion

FactFork showcases how external APIs and data visualisation can turn raw nutritional information into meaningful insights.

---

## 2.8 Footer

### License

This project is licensed under the MIT License.

### Author

**Anika de Beer**  
Student Number: **231312**  
Open Window Institute  

### Acknowledgements

- Open Food Facts API  
- Chart.js  
- Peers and mentors  
