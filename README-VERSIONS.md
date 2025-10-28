# Component Versions

This project has two versions of the website:

## 🎨 **ReactBits Version** (Current - with Animations)
- **Location**: `src/components/reactbits/`
- **Features**: 
  - Animated CardNav with expand/collapse functionality
  - BlurText animations in hero section
  - Modern, interactive user experience

## 📐 **Original Version** (Simple - no animations)
- **Location**: `src/components/original/`
- **Features**:
  - Simple header navigation
  - Static text without animations  
  - Clean, minimalist design

## 🔄 **How to Switch Versions**

To switch between versions, edit the file: `src/config/version.ts`

```typescript
// For ReactBits animated version:
export const COMPONENT_VERSION: 'original' | 'reactbits' = 'reactbits';

// For original simple version:
export const COMPONENT_VERSION: 'original' | 'reactbits' = 'original';
```

## 📁 **Folder Structure**

```
src/
├── components/
│   ├── original/          # Simple components (no animations)
│   │   ├── Header.tsx
│   │   └── HeroSection.tsx
│   ├── reactbits/         # Animated components
│   │   ├── CardNav.tsx
│   │   ├── CardNav.css
│   │   ├── BlurText.tsx
│   │   ├── SplitText.tsx
│   │   └── HeroSection.tsx
│   ├── index.ts           # Version selector
│   └── [other shared components]
├── config/
│   └── version.ts         # Version configuration
└── App.tsx                # Main app (uses version selector)
```

## 🚀 **Development**

1. **Current Version**: ReactBits (animated)
2. **To test Original**: Change `version.ts` to `'original'` and refresh
3. **To test ReactBits**: Change `version.ts` to `'reactbits'` and refresh

Both versions maintain the same design aesthetic and functionality, the difference is in the animations and interactivity.