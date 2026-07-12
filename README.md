# MediCycle UI — Monorepo

> Professional, production-grade frontend applications for a multi-role medicine delivery platform. Built with React 19, Vite, and modern web technologies.

---

## 📋 Overview

**MediCycle UI** is a comprehensive frontend monorepo providing three independent React applications for a medicine delivery ecosystem. It serves patients (buyers), pharmacies (sellers), and platform administrators with rich, responsive interfaces powered by Vite, React Router, and a robust shared component library.

### Core Highlights

- **Three dedicated applications** — Buyer marketplace, Seller dashboard, Admin panel
- **Shared component library** — Reusable, accessible UI components with consistent design
- **Real-time communication** — Socket.io integration for live chat and notifications
- **Modern tech stack** — React 19, Vite, TypeScript, Tailwind CSS
- **Dark mode support** — Built-in theme switching with persistent user preference
- **Production-ready** — Optimized builds, error boundaries, and comprehensive error handling
- **Developer-friendly** — Monorepo architecture with npm workspaces for easy scaling

---

## ✨ Applications

### 🛒 **Buyer Application**
The customer-facing marketplace experience featuring:
- **Landing & onboarding** — Welcoming entry point with feature highlights
- **Authentication** — Login, registration, 2FA setup, password reset flows
- **OTP verification** — Secure account recovery and identity verification
- **Marketplace** — Browse, filter, and search medicines with detailed product views
- **Real-time messaging** — Chat with sellers and support via Socket.io
- **Responsive design** — Optimized for desktop, tablet, and mobile
- **Advanced animations** — Smooth transitions powered by Framer Motion & GSAP

**Tech**: React Router v7, Socket.io, React Hook Form, React Helmet Async, Emoji Picker

### 🏪 **Seller Dashboard**
Inventory and order management for pharmacies:
- **Dashboard overview** — Sales metrics, revenue trends, inventory status
- **Sales analytics** — Visual performance data with interactive charts (Recharts)
- **Inventory management** — Add, edit, and track medicine stock
- **Real-time notifications** — Live order and message alerts
- **Dark mode support** — Reduced eye strain for extended work sessions
- **Responsive layout** — Works seamlessly on tablets and desktops

**Tech**: Recharts, Framer Motion, TanStack React Query, Axios

### 🛠️ **Admin Dashboard**
Platform governance and oversight:
- **Admin login** — Secure authentication for admins only
- **Dashboard** — System-wide metrics and key performance indicators
- **User management** — Approve/reject sellers, manage buyer accounts
- **Medicine catalog** — Approve and manage medicine listings
- **Reports & audit logs** — Track system activity and generate reports
- **Dark mode** — High contrast themes for accessibility
- **Zustand state management** — Client-side state for admin workflows

**Tech**: Zustand, Recharts, TanStack React Query, Admin-specific routes

---

## 📦 Shared Packages

### **@medicycle/ui** — Component Library
Reusable React components following accessibility best practices:
- `Button` — Primary, secondary, and variant styles
- `Card` — Container and layout component
- `Input` — Form input with validation support
- `Table` — Data display with sorting/pagination
- `Alert` — System and status messages
- `Toast` — Transient notifications
- `Badge` — Status indicators and tags
- `Skeleton` — Loading state placeholders
- `Navbar` — Navigation header with responsive menu
- `ThemeToggle` — Dark/light mode switcher
- `LineChart` — Reusable chart component
- `LoadingScreen` — Full-page loading states
- `EmptyState` — No-data UI states
- `GlobalErrorBoundary` — Application-wide error handling

### **@medicycle/theme** — Design System
Centralized styling and design tokens:
- Tailwind CSS configuration with extended color palette
- Dark mode support with CSS variables
- Responsive breakpoints and spacing scales
- Typography and font stack definitions
- Consistent color naming (primary, secondary, destructive, muted, etc.)

### **@medicycle/types** — TypeScript Definitions
Shared type definitions for type safety across apps:
- User & authentication types
- Medicine and listing schemas
- Order and transaction types
- Message and notification types
- API response/request contracts

### **@medicycle/hooks** — Custom React Hooks
Reusable React logic patterns:
- Authentication hooks (useAuth, useLogin, useRegister)
- Form handling hooks (useForm, useFormValidation)
- Data fetching hooks (useQuery, useMutation)
- Theme hooks (useTheme, useThemeToggle)
- Local storage and persistence hooks

### **@medicycle/utils** — Utility Functions
Common utility functions used across apps:
- String formatting and validation
- Date/time helpers (powered by date-fns)
- API response parsing
- Error handling utilities
- Number formatting (prices, quantities)

---

## 🛠️ Technology Stack

| Category | Technologies |
|---|---|
| **Framework & Runtime** | React 19.2, Vite, Node.js (npm) |
| **Language** | TypeScript 5.4+ |
| **Styling** | Tailwind CSS 3.4, PostCSS, Autoprefixer |
| **Routing** | React Router v7 |
| **State Management** | Zustand (admin), React Hook Form (forms) |
| **Data Fetching** | Axios, TanStack React Query v5 |
| **Real-time** | Socket.io Client |
| **Animation** | Framer Motion v12, GSAP v3 |
| **Forms** | React Hook Form, Hookform Resolvers |
| **Charts** | Recharts |
| **Icons** | Lucide React |
| **UI Utilities** | clsx, tailwind-merge |
| **Date Handling** | date-fns |
| **SEO/Meta** | React Helmet Async |
| **Intersection** | React Intersection Observer |
| **Emoji** | Emoji Picker React |
| **Package Manager** | npm workspaces |
| **Type Checking** | TypeScript compiler |

---

## 📁 Project Structure

```
buyer-seller-ui/
└── medicycle/                          # Root workspace
    ├── apps/
    │   ├── buyer/                      # Customer marketplace app
    │   │   ├── src/
    │   │   │   ├── pages/              # Page components
    │   │   │   │   ├── Landing.tsx
    │   │   │   │   ├── auth/           # Auth flows (login, register, 2FA, etc.)
    │   │   │   │   ├── marketplace/    # Product browsing & details
    │   │   │   │   └── messages/       # Chat interface
    │   │   │   ├── components/         # Reusable components
    │   │   │   ├── layouts/            # Layout wrappers
    │   │   │   ├── hooks/              # Custom React hooks
    │   │   │   ├── services/           # API client & utilities
    │   │   │   ├── App.tsx
    │   │   │   └── main.tsx
    │   │   ├── package.json
    │   │   ├── vite.config.ts
    │   │   └── tsconfig.json
    │   │
    │   ├── seller/                     # Pharmacy dashboard
    │   │   ├── src/
    │   │   │   ├── pages/              # Dashboard, inventory, etc.
    │   │   │   ├── components/         # Dashboard-specific components
    │   │   │   ├── layouts/            # Seller layout wrapper
    │   │   │   └── ...
    │   │   └── package.json
    │   │
    │   └── admin/                      # Admin control panel
    │       ├── src/
    │       │   ├── pages/              # Login, Dashboard, Users, Medicines, Reports, Audit
    │       │   ├── components/         # Admin-specific components
    │       │   ├── layouts/            # Admin shell layout
    │       │   └── ...
    │       └── package.json
    │
    ├── packages/                       # Shared libraries
    │   ├── ui/                         # Component library
    │   │   ├── src/
    │   │   │   ├── Button/
    │   │   │   ├── Card/
    │   │   │   ├── Input/
    │   │   │   ├── Table/
    │   │   │   ├── Alert/
    │   │   │   ├── Toast/
    │   │   │   ├── Charts/
    │   │   │   ├── Badge/
    │   │   │   ├── Navigation/
    │   │   │   ├── Feedback/
    │   │   │   └── index.ts            # Public exports
    │   │   └── package.json
    │   │
    │   ├── theme/                      # Design system & Tailwind config
    │   │   ├── index.ts
    │   │   └── tailwind.config.js
    │   │
    │   ├── types/                      # TypeScript type definitions
    │   │   ├── src/
    │   │   │   ├── user.ts
    │   │   │   ├── medicine.ts
    │   │   │   ├── order.ts
    │   │   │   └── index.ts
    │   │   └── package.json
    │   │
    │   ├── hooks/                      # Custom React hooks
    │   │   ├── src/
    │   │   │   ├── useAuth.ts
    │   │   │   ├── useForm.ts
    │   │   │   ├── useTheme.ts
    │   │   │   └── index.ts
    │   │   └── package.json
    │   │
    │   └── utils/                      # Utility functions
    │       ├── src/
    │       │   ├── formatters.ts
    │       │   ├── validators.ts
    │       │   ├── api.ts
    │       │   └── index.ts
    │       └── package.json
    │
    ├── public/                         # Static assets
    ├── index.html                      # Main HTML entry point
    ├── package.json                    # Workspace configuration
    ├── tailwind.config.js              # Global Tailwind config
    ├── postcss.config.js               # PostCSS config
    ├── vite.config.ts                  # Vite configuration
    ├── tsconfig.json                   # TypeScript config
    ├── tsconfig.app.json               # App-specific TS config
    ├── tsconfig.node.json              # Node TS config
    └── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: 18+ (LTS recommended)
- **npm**: 9+ (comes with Node.js)
- **Git**: For cloning and version control

### Installation

```bash
# Clone the repository
git clone https://github.com/RavendraPatel09/buyer-seller-ui.git
cd buyer-seller-ui/medicycle

# Install dependencies (npm workspaces will install all packages)
npm install
```

### Development

#### Run All Applications (Concurrently)

```bash
npm run dev:buyer &
npm run dev:seller &
npm run dev:admin
```

#### Run Individual Applications

```bash
# Buyer App
npm run dev:buyer
# Runs on http://localhost:5173 (default Vite port)

# Seller Dashboard
npm run dev:seller
# Runs on http://localhost:5174

# Admin Dashboard
npm run dev:admin
# Runs on http://localhost:5175
```

### Building for Production

#### Build Single App

```bash
npm run build:buyer    # Buyer app
npm run build:seller   # Seller dashboard
npm run build:admin    # Admin panel
```

#### Build All Apps

```bash
npm run build:all
```

Each build outputs optimized bundles to the respective app's `dist/` directory.

### Preview Production Build

```bash
npm run preview -w apps/buyer
```

---

## 🎨 Features & Highlights

### **Responsive Design**
- Mobile-first approach with Tailwind CSS breakpoints
- Touch-friendly interface for mobile and tablet users
- Desktop-optimized dashboards for sellers and admins

### **Dark Mode**
- Built-in theme toggle component
- Smooth transitions between light/dark themes
- Persistent user preference via local storage
- High contrast for accessibility compliance

### **Real-time Communication**
- Socket.io-powered chat for buyer-seller messaging
- Live notifications and alerts
- Bi-directional data streaming

### **Form Handling**
- React Hook Form for optimal performance
- Built-in validation with custom resolvers
- Type-safe form state management
- Support for complex forms with nested fields

### **Data Visualization**
- Interactive charts and graphs (Recharts)
- Sales performance dashboards
- Analytics and reporting interfaces
- Export-ready chart components

### **Accessibility**
- WCAG 2.1 compliance for components
- Keyboard navigation support
- Screen reader friendly
- Semantic HTML structure
- ARIA labels and roles

### **Error Handling**
- Global error boundary for catching React errors
- Toast notifications for user feedback
- Empty states for no-data scenarios
- Loading skeletons for better perceived performance

### **TypeScript Support**
- Full TypeScript throughout
- Strict type checking enabled
- Shared type definitions across packages
- IntelliSense for better developer experience

---

## 🔄 Monorepo Workflow

### Adding Dependencies

#### To a Specific App

```bash
npm install axios -w @medicycle/buyer
```

#### To a Specific Package

```bash
npm install zustand -w @medicycle/types
```

#### To Root (Dev Dependencies Only)

```bash
npm install -D typescript
```

### Publishing Packages

Shared packages (`ui`, `theme`, `types`, `hooks`, `utils`) can be published to npm:

```bash
npm publish -w packages/ui
```

### Development Workflow

1. Make changes to shared package (e.g., `packages/ui`)
2. Changes are immediately available to all apps
3. Run app to verify changes
4. Commit and push

---

## 📊 File Size & Performance

Typical production bundle sizes (minified + gzipped):

| App | Size |
|---|---|
| Buyer | ~150-180 KB |
| Seller | ~120-150 KB |
| Admin | ~120-150 KB |
| UI Package | ~40-60 KB |

**Optimization strategies**:
- Code splitting with React Router
- Lazy loading of components
- Tree shaking unused code
- Image optimization (lazy loading, responsive images)

---

## 🧪 Development Best Practices

### Component Structure

```typescript
// apps/buyer/src/components/MedicineCard.tsx
import { FC } from 'react';
import { Medicine } from '@medicycle/types';

interface MedicineCardProps {
  medicine: Medicine;
  onSelect?: (medicine: Medicine) => void;
}

export const MedicineCard: FC<MedicineCardProps> = ({ 
  medicine, 
  onSelect 
}) => {
  return (
    <div className="border rounded-lg p-4">
      <h3>{medicine.name}</h3>
      <p className="text-sm text-gray-500">{medicine.dosage}</p>
      <button onClick={() => onSelect?.(medicine)}>
        View Details
      </button>
    </div>
  );
};
```

### Using Shared Packages

```typescript
// In any app
import { Button, Card } from '@medicycle/ui';
import { useAuth } from '@medicycle/hooks';
import { Medicine } from '@medicycle/types';
import { formatPrice } from '@medicycle/utils';

export const ProductCard = ({ medicine }: { medicine: Medicine }) => {
  const { user } = useAuth();
  
  return (
    <Card>
      <h2>{medicine.name}</h2>
      <p>{formatPrice(medicine.price)}</p>
      {user && <Button>Add to Cart</Button>}
    </Card>
  );
};
```

---

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** changes: `git commit -m 'Add amazing feature'`
4. **Push** to branch: `git push origin feature/amazing-feature`
5. **Submit** a Pull Request

### Code Standards

- **TypeScript**: Strict mode enabled, no `any` types
- **Formatting**: Prettier (run before commit)
- **Component naming**: PascalCase for components, camelCase for utilities
- **Imports**: Use absolute paths from packages (via workspaces)
- **Testing**: Write tests for components (Jest/Vitest recommended)

---

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9

# Or use different port
npm run dev -- --port 3000
```

### Module Not Found

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors

```bash
# Rebuild TypeScript
npm run build -w @medicycle/types
```

---

## 📚 Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vite.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [React Router v7](https://reactrouter.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Framer Motion](https://www.framer.com/motion/)
- [Socket.io Docs](https://socket.io/docs/)

---

## 📄 License

This project is licensed under the **ISC License** — see the LICENSE file for details.

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/RavendraPatel09/buyer-seller-ui/issues)
- **Discussions**: [GitHub Discussions](https://github.com/RavendraPatel09/buyer-seller-ui/discussions)
- **Email**: Contact via GitHub profile

---

## 🙏 Acknowledgments

Built with ❤️ using modern web technologies:
- React team for the amazing library
- Vite for lightning-fast development
- Tailwind Labs for CSS utilities
- Open-source community for incredible tools

**Let's build amazing healthcare solutions together!** 🏥✨
