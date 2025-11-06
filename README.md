# 🌍 Timezone Converter

A beautiful and responsive timezone conversion web application built with React and Material-UI. Convert times between any timezones around the world with ease.  

**Live Demo:** [https://time-converter-app2025-1.vercel.app/](https://time-converter-app2025-1.vercel.app/)

![React](https://img.shields.io/badge/React-blue)  
![Material-UI](https://img.shields.io/badge/Material--UI-007FFF)  
![Moment.js](https://img.shields.io/badge/Moment.js-green)  

---

## ✨ Features

- **Real-time Conversion** - Instantly convert times between any timezones  
- **Smart Swap** - Quickly swap source and target timezones with one click  
- **Dark/Light Mode** - Toggle between beautiful themes  
- **Fully Responsive** - Works perfectly on desktop, tablet, and mobile  
- **DST Awareness** - Automatically handles Daylight Saving Time  
- **Business Hours** - Visual indicator for outside business hours (9 AM - 5 PM)  
- **Modern UI** - Glass morphism design with smooth animations  

---

## 🚀 Quick Start

### Prerequisites
- Node.js (version 14 or higher)  
- npm or yarn  

### Installation
1. Clone the repository  
```console
git clone https://github.com/sadeghdehyadgari/timezone-converter.git

cd timezone-converter
```

2. Install dependencies  

```console
npm install
```

3. Start the development server  

```console
npm run dev
```

4. Open your browser and navigate to [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal)  

---

## 🛠️ Built With
- **React** - UI library  
- **Material-UI** - Component library  
- **Moment.js & Moment Timezone** - Time handling  
- **Vite** - Build tool  
- **date-fns** - Date utilities  

---

## 📁 Project Structure

```
src/
├── components/
│ ├── DateTimePicker.jsx # Date and time input
│ ├── TimeZoneSelect.jsx # Timezone dropdown
│ ├── ResultDisplay.jsx # Conversion results
│ ├── SwapButton.jsx # Timezone swap button
│ ├── ThemeToggle.jsx # Dark/light mode toggle
│ └── Footer.jsx # App footer
├── utils/
│ └── timeConverter.js # Time conversion logic
└── App.jsx # Main application
```


---

## 🎯 How to Use
1. **Set Source Time:** Use the datetime picker to select your starting time  
2. **Choose Timezones:** Select source and target timezones from the dropdowns  
3. **View Results:** See the converted time instantly with additional information  
4. **Swap Timezones:** Click the swap button (↔️) to quickly reverse the conversion  

---

## 🌐 Supported Timezones
All IANA timezone identifiers are supported, including:  

- **Americas:** America/New_York, America/Los_Angeles, America/Chicago  
- **Europe:** Europe/London, Europe/Paris, Europe/Berlin  
- **Asia:** Asia/Tehran, Asia/Tokyo, Asia/Dubai  
- **Pacific:** Pacific/Auckland, Australia/Sydney  
- And many more...  

---

## 🔧 Customization
The app features a customizable theme system with:  
- Gradient backgrounds that change with theme  
- Custom color palettes for light and dark modes  
- Responsive design that adapts to all screen sizes  
- Smooth transitions and animations  

---

## 📞 Contact
- **GitHub:** [sadeghdehyadgari](https://github.com/sadeghdehyadgari)  
- **Email:** sadeghdehyadgari@gmail.com  

---

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.  

**Try it now:** [https://time-converter-app2025-1.vercel.app/](https://time-converter-app2025-1.vercel.app/)
