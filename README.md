# Aula - Modern Search Browser

A beautiful, glassmorphic search browser built with Next.js and Tailwind CSS.

## Features

- 🔍 Modern Google-like search interface
- 🎨 Beautiful glassmorphism design with soft color palette
- 🌐 Multiple search types: Web, Video, Audio, Image
- 📱 Responsive design
- 🎯 Sidebar navigation
- 📢 Advertisement placeholder system
- 🔄 Multi-API rotation support

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── api/search/route.ts    # API endpoint with multi-API rotation
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Main search page
├── components/
│   ├── SearchBar.tsx           # Search input component
│   ├── Sidebar.tsx             # Sidebar navigation
│   └── SearchResults.tsx       # Search results display
└── package.json
```

## Configuration

### API Keys

The application uses three API keys that rotate automatically:
- ba3b0732a47bf26269b3e9160ea7618022b61352
- 2c9a5a6cbf34b0fbaeeec8756fa596fc57c5e529
- e5be0c24eb41e337bc213b243a366ee18612683b

To add more API keys or modify the rotation, edit `app/api/search/route.ts`.

### Advertisement System

The ad placeholder is located in `components/SearchResults.tsx`. You can customize it to show real advertisements.

## Deployment

This application can be deployed to any Next.js hosting platform:
- Vercel (recommended)
- Netlify
- AWS
- Any Node.js hosting service

## Technologies

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Axios

## License

MIT

