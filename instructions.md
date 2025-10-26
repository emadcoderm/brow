# Aula Browser - Setup Instructions

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Open in Browser
Navigate to: http://localhost:3000

## 📦 Deployment Options

### Option 1: Vercel (Recommended)
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Click Deploy (automatic!)

### Option 2: Netlify
1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Import from Git
4. Build command: `npm run build`
5. Publish directory: `.next`

### Option 3: Manual Server
```bash
npm run build
npm start
```

## 🎨 Features Implemented

✅ **Google-like UI** - Clean and familiar interface
✅ **Glassmorphism Design** - Beautiful frosted glass effects
✅ **Soft Color Palette** - Purple/indigo gradient background
✅ **Sidebar Navigation** - Easy search type selection
✅ **Multiple Search Types** - Web, Video, Audio, Image
✅ **Advertisement Placeholder** - Ready for your ads
✅ **Multi-API Rotation** - Uses your 3 API keys automatically
✅ **Responsive Design** - Works on all devices

## 🔧 Customization

### Change Colors
Edit `tailwind.config.js` to customize color scheme

### Modify API Endpoint
Edit `app/api/search/route.ts` to change API base URL

### Add More API Keys
Edit `app/api/search/route.ts` and add keys to the `API_KEYS` array

### Customize Advertisements
Edit `components/SearchResults.tsx` to modify ad placeholder

## 📝 Files Created

- `app/page.tsx` - Main search page
- `app/api/search/route.ts` - API endpoint with rotation
- `components/SearchBar.tsx` - Search input
- `components/Sidebar.tsx` - Navigation sidebar
- `components/SearchResults.tsx` - Results display
- `app/globals.css` - Styles and glassmorphism effects

## 🎯 API Integration

The search API automatically rotates between your 3 keys:
- ba3b0732a47bf26269b3e9160ea7618022b61352
- 2c9a5a6cbf34b0fbaeeec8756fa596fc57c5e529
- e5be0c24eb41e337bc213b243a366ee18612683b

Each search uses a different key in rotation.

## 💡 Tips

- The app is production-ready
- All styling uses Tailwind CSS
- Fully responsive design
- TypeScript for type safety
- SEO optimized

Enjoy your new Aula browser! 🌟

