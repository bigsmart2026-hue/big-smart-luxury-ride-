# Big Smart luxury ride (BSL) — Car Sales Frontend

A premium car sales frontend built with **React**, **Tailwind CSS**, **Framer Motion**, and **Vite**.

## Features

- **7 routes** — Home, Inventory, Vehicle Detail, Compare, Financing, Trade-In, Contact
- **Real‑time filtering** — make, fuel type, transmission, year, price, mileage
- **Sorting** — price, year, mileage (asc/desc)
- **Vehicle comparison** — up to 3 vehicles side‑by‑side
- **Payment calculator** — client‑side monthly payment formula
- **Trade‑in valuation** — static depreciation formula
- **Contact form** — client‑side validation + success simulation
- **Animations** — hero car slide‑in, scroll‑triggered car, staggered cards, mobile filter panel, micro‑interactions
- **Responsive** — mobile‑first Tailwind, all breakpoints
- **Code splitting** — lazy‑loaded routes with React Router

## Tech Stack

| Tool | Purpose |
|------|---------|
| [Vite](https://vitejs.dev) | Build tool & dev server |
| [React 18](https://react.dev) | UI framework |
| [React Router 6](https://reactrouter.com) | Client‑side routing |
| [Tailwind CSS 3](https://tailwindcss.com) | Utility‑first CSS |
| [Framer Motion 11](https://framer.com/motion) | Animations |
| `public/vehicles.json` | Local data (15 cars, placeholder images) |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── main.jsx              # App entry
├── App.jsx               # Lazy routes
├── index.css             # Tailwind + custom utilities
├── components/
│   ├── Navbar.jsx        # Sticky nav
│   ├── Footer.jsx        # 4‑column footer
│   ├── Hero.jsx          # Hero with car slide‑in animation
│   ├── ScrollCar.jsx     # Scroll‑triggered car animation
│   ├── VehicleCard.jsx   # Card with staggered fade‑in
│   ├── FilterPanel.jsx   # Desktop sidebar + mobile slide‑in
│   ├── ImageGallery.jsx  # Swipeable gallery
│   ├── ContactModal.jsx  # Test drive request modal
│   └── Layout.jsx        # Nav + ScrollCar + Footer wrapper
├── pages/
│   ├── Home.jsx
│   ├── Inventory.jsx
│   ├── VehicleDetail.jsx
│   ├── Compare.jsx
│   ├── Financing.jsx
│   ├── TradeIn.jsx
│   └── Contact.jsx
└── data/
    └── vehicles.json     # Local data (same as public/)
```

## Scroll‑Triggered Car Animation

Implemented in `src/components/ScrollCar.jsx`:

1. **IntersectionObserver** activates the animation once the section is visible.
2. **Framer Motion `useScroll`** tracks scroll progress within the section.
3. **`useTransform`** maps progress (0→1) to `x`, `rotate`, and `scale` values, moving the SVG car across the screen.
