# CoreDeskAiCMS - Development Specification

## 🛠 Tech Stack & Architecture

### Frontend Framework
- **Next.js 14.2.x** - App Router, Server Components, Streaming
- **React 18.3.x** - Concurrent features, Suspense boundaries
- **TypeScript** - Type safety (disabled for MVP speed)

### Styling & Design System
- **Tailwind CSS 3.4.x** - Utility-first styling
- **Custom CSS Variables** - Dynamic theming support
- **Responsive Design** - Mobile-first approach

### Animation & Effects Libraries
- **GSAP 3.12.x** - High-performance animations, ScrollTrigger
- **Framer Motion 11.x** - React-specific animations, gestures
- **Three.js 0.164.x** - 3D graphics and WebGL
- **React Three Fiber 8.16.x** - React renderer for Three.js
- **React Three Drei 9.105.x** - Useful helpers for R3F

### Data Visualization
- **Recharts 2.12.x** - React charts library
- **D3.js** (via Recharts) - Data manipulation and scales

### Game Engine (Demo)
- **Phaser 3.80.x** - 2D game engine for interactive demos

### Icons & UI Components
- **Lucide React 0.378.x** - Modern icon library
- **Custom Components** - Built with Tailwind + Framer Motion

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── globals.css              # Global styles, Tailwind imports
│   ├── layout.js                # Root layout with providers
│   ├── page.js                  # Homepage
│   ├── demo/                    # Demo dashboard pages
│   │   ├── page.js             # Main demo page
│   │   └── layout.js           # Demo-specific layout
│   ├── pitch/                   # Pitch deck page
│   ├── why-us/                  # Why Us page
│   ├── roadmap/                 # Roadmap page
│   └── signup/                  # Sign-up page
├── components/                   # Reusable UI components
│   ├── ui/                      # Base UI components
│   │   ├── Button.js
│   │   ├── Card.js
│   │   ├── Input.js
│   │   └── Modal.js
│   ├── layout/                  # Layout components
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   └── Navigation.js
│   ├── sections/                # Page sections
│   │   ├── Hero.js
│   │   ├── Features.js
│   │   ├── Pricing.js
│   │   └── Testimonials.js
│   ├── effects/                 # Animation components
│   │   ├── ParallaxScroll.js
│   │   ├── MatrixEffect.js
│   │   ├── ThreeDBackground.js
│   │   └── TypingEffect.js
│   └── demo/                    # Demo-specific components
│       ├── Dashboard.js
│       ├── DataTable.js
│       ├── ApiConnector.js
│       └── ExportTools.js
├── lib/                         # Utilities and helpers
│   ├── utils.js                # General utilities
│   ├── animations.js           # GSAP animation helpers
│   ├── api-simulator.js        # Mock API responses
│   ├── data-processor.js       # Data transformation
│   └── export-utils.js         # Excel/CSV export logic
├── data/                        # Mock data and configurations
│   ├── mock-apis.json          # Sample API responses
│   ├── demo-data.json          # Dashboard demo data
│   └── testimonials.json       # Customer testimonials
└── styles/                      # Additional styles
    ├── components.css          # Component-specific styles
    └── animations.css          # Custom animation keyframes
```

## 🎨 Design System Specifications

### Color Palette
```css
:root {
  /* Primary Colors */
  --color-primary-50: #eff6ff;
  --color-primary-500: #3b82f6;
  --color-primary-900: #1e3a8a;
  
  /* Neutral Colors */
  --color-neutral-50: #f8fafc;
  --color-neutral-900: #0f172a;
  
  /* Accent Colors */
  --color-accent-cyan: #06b6d4;
  --color-accent-purple: #8b5cf6;
  --color-accent-green: #10b981;
  
  /* Status Colors */
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
}
```

### Typography Scale
```css
/* Font Sizes */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
--text-5xl: 3rem;      /* 48px */
--text-6xl: 3.75rem;   /* 60px */
```

### Spacing System
```css
/* Spacing Scale (Tailwind default) */
--space-1: 0.25rem;    /* 4px */
--space-2: 0.5rem;     /* 8px */
--space-4: 1rem;       /* 16px */
--space-8: 2rem;       /* 32px */
--space-16: 4rem;      /* 64px */
--space-32: 8rem;      /* 128px */
```

## 🎭 Animation & Effects Strategy

### GSAP Animations
```javascript
// Scroll-triggered animations
ScrollTrigger.create({
  trigger: ".hero-section",
  start: "top center",
  end: "bottom center",
  animation: gsap.timeline()
    .from(".hero-title", { y: 100, opacity: 0, duration: 1 })
    .from(".hero-subtitle", { y: 50, opacity: 0, duration: 0.8 }, "-=0.5")
});

// Parallax effects
gsap.to(".parallax-bg", {
  yPercent: -50,
  ease: "none",
  scrollTrigger: {
    trigger: ".parallax-container",
    start: "top bottom",
    end: "bottom top",
    scrub: true
  }
});
```

### Framer Motion Variants
```javascript
const fadeInUp = {
  initial: { y: 60, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};
```

### Three.js Scene Setup
```javascript
// Basic scene configuration
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

// Particle system for background effects
const particleGeometry = new THREE.BufferGeometry();
const particleCount = 1000;
const positions = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 10;
}

particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
```

## 🎮 Demo Engine Architecture

### Phaser 3 Configuration
```javascript
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'demo-container',
  backgroundColor: '#0f172a',
  scene: {
    preload: preload,
    create: create,
    update: update
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  }
};
```

### API Simulation Engine
```javascript
class APISimulator {
  constructor() {
    this.endpoints = new Map();
    this.responseDelay = 500; // Simulate network latency
  }

  registerEndpoint(url, responseGenerator) {
    this.endpoints.set(url, responseGenerator);
  }

  async fetchData(url, options = {}) {
    await new Promise(resolve => setTimeout(resolve, this.responseDelay));
    
    const generator = this.endpoints.get(url);
    if (!generator) {
      throw new Error(`Endpoint ${url} not found`);
    }
    
    return generator(options);
  }
}
```

## 📊 Data Management Strategy

### Local Storage Schema
```javascript
const dataSchema = {
  apiConnections: [
    {
      id: 'uuid',
      name: 'Connection Name',
      url: 'https://api.example.com/data',
      token: 'bearer_token',
      headers: {},
      lastSync: 'timestamp',
      status: 'active|inactive|error'
    }
  ],
  dashboardConfig: {
    layout: 'grid|list',
    columns: ['id', 'name', 'status'],
    filters: {},
    sorting: { field: 'created_at', order: 'desc' }
  },
  userData: {
    preferences: {
      theme: 'light|dark',
      animations: true,
      autoRefresh: 30000
    }
  }
};
```

### Export Functionality
```javascript
class ExportManager {
  static exportToCSV(data, filename) {
    const csv = this.convertToCSV(data);
    this.downloadFile(csv, `${filename}.csv`, 'text/csv');
  }

  static exportToExcel(data, filename) {
    // Using SheetJS or similar library
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
    XLSX.writeFile(workbook, `${filename}.xlsx`);
  }
}
```

## 🔧 Development Workflow

### Package Versions (Locked)
```json
{
  "dependencies": {
    "next": "14.2.3",
    "react": "18.3.1",
    "react-dom": "18.3.1",
    "tailwindcss": "3.4.3",
    "gsap": "3.12.5",
    "framer-motion": "11.1.7",
    "three": "0.164.1",
    "@react-three/fiber": "8.16.2",
    "@react-three/drei": "9.105.4",
    "phaser": "3.80.1",
    "recharts": "2.12.7",
    "lucide-react": "0.378.0"
  }
}
```

### Build Configuration
```javascript
// next.config.mjs
const nextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react', 'recharts']
  },
  images: {
    domains: ['raw.githubusercontent.com']
  },
  webpack: (config) => {
    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      'bufferutil': 'commonjs bufferutil'
    });
    return config;
  }
};
```

### Performance Optimization
- **Code Splitting**: Dynamic imports for heavy components
- **Image Optimization**: Next.js Image component with WebP
- **Bundle Analysis**: @next/bundle-analyzer for size monitoring
- **Lazy Loading**: Intersection Observer for animations
- **Memoization**: React.memo for expensive components

## 🚀 Deployment Strategy

### Development Environment
```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint check
npm run analyze      # Bundle analysis
```

### Production Checklist
- [ ] All animations tested on mobile
- [ ] Accessibility audit completed
- [ ] Performance metrics within targets
- [ ] Cross-browser compatibility verified
- [ ] SEO meta tags implemented
- [ ] Error boundaries in place
- [ ] Loading states for all async operations
