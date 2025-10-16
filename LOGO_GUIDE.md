# Logo Setup Guide

## 📁 Where to Place Your Logo Files

Place your logo files in the `/public` directory:

```
/public/
  ├── logo.svg          # Black version (for header/light backgrounds)
  ├── logo-white.svg    # White version (for footer/dark backgrounds)
  └── logo.png          # Alternative: if you have PNG format
```

## 🎨 Two Ways to Use Your Logo

### Method 1: Using Image Files (Recommended)

**Step 1:** Save your elephant image in `/public/`
- For SVG: Save as `logo.svg` and `logo-white.svg`
- For PNG: Save as `logo.png` and `logo-white.png`

**Step 2:** Update Header to use image-based logo:

In `components/Header.tsx`, change:
```tsx
import { Logo } from './Logo';
```
to:
```tsx
import { LogoWithImage } from './LogoWithImage';
```

Then replace:
```tsx
<Logo />
```
with:
```tsx
<LogoWithImage variant="black" />
```

**Step 3:** Update Footer to use image-based logo:

In `components/Footer.tsx`, import at the top:
```tsx
import { LogoWithImage } from './LogoWithImage';
```

Then replace the entire SVG section (lines 17-32) with:
```tsx
<LogoWithImage variant="white" />
```

### Method 2: Keep Inline SVG (Current Setup)

The current setup uses inline SVG code directly in the components. This is already working!

To customize, just edit:
- `components/Logo.tsx` - Header logo
- `components/Footer.tsx` - Footer logo (lines 17-32)

## 🖼️ Image Format Recommendations

### SVG (Best for logos)
✅ Scales perfectly at any size
✅ Smaller file size
✅ Easy to change colors
✅ Best for production

### PNG (Alternative)
✅ Easy to work with
✅ Good for photos/complex images
⚠️ Need different sizes for retina displays
⚠️ Larger file size

## 📝 Quick Steps to Replace with Your Image

1. **Save your elephant image** to `/public/logo.svg`

2. **If using PNG**, update `LogoWithImage.tsx`:
   ```tsx
   const logoSrc = variant === 'white' ? '/logo-white.png' : '/logo.png';
   ```

3. **Update Header** (`components/Header.tsx`):
   ```tsx
   import { LogoWithImage } from './LogoWithImage';
   
   // In the JSX:
   <LogoWithImage variant="black" />
   ```

4. **Update Footer** (`components/Footer.tsx`):
   ```tsx
   import { LogoWithImage } from './LogoWithImage';
   
   // Replace the SVG section with:
   <LogoWithImage variant="white" />
   ```

5. **Done!** Your image will now be used as the logo.

## 🎯 Benefits of Using Next.js Image Component

The `LogoWithImage` component uses Next.js `<Image>` which provides:
- ✅ Automatic image optimization
- ✅ Lazy loading
- ✅ Prevents layout shift
- ✅ Responsive images
- ✅ Better performance

## 🔧 Troubleshooting

### Image not showing?
1. Make sure the file is in `/public/` directory
2. Check the file name matches exactly (case-sensitive)
3. Restart the dev server: `npm run dev`

### Wrong colors?
- For dark backgrounds: Use `logo-white.svg`
- For light backgrounds: Use `logo.svg`

### Want to use a different image format?
Update the `logoSrc` path in `LogoWithImage.tsx`:
```tsx
const logoSrc = variant === 'white' 
  ? '/your-white-logo.jpg' 
  : '/your-logo.jpg';
```

## 📐 Recommended Logo Dimensions

- **Header Logo**: 48x48px (current size)
- **Retina Display**: 96x96px (2x)
- **Favicon**: 32x32px or 16x16px

For SVG, any size works perfectly!

---

**Current Status**: Your logo is using inline SVG. To switch to image files, follow "Method 1" above.

