# Elemta Website

A modern, animated website for Elemta built with Next.js, TypeScript, and WebGL-powered animations.

## Features

- ⚡ **Next.js 16** with App Router
- 🎨 **Tailwind CSS** for styling
- 📘 **TypeScript** for type safety
- ✨ **WebGL Animations** using OGL library
- 🎭 **LightRays Animation** - Dynamic light ray effects with mouse interaction
- 🚀 **Modern UI** with gradient backgrounds and animations

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
app/
├── components/
│   ├── LightRays.tsx    # WebGL light rays animation component
│   └── LightRays.css    # Light rays styles
├── page.tsx             # Landing page
├── layout.tsx           # Root layout
└── globals.css          # Global styles
```

## Animation Components

The project is set up to support multiple WebGL animation components. The `LightRays` component includes:

- Mouse-following effects
- Customizable colors, speed, and spread
- Pulsating animations
- Noise and distortion effects
- Performance-optimized with IntersectionObserver

## Customization

Edit `app/page.tsx` to modify the landing page content and animation properties.

## Build for Production

```bash
npm run build
npm start
```

## Deploy

The easiest way to deploy is using [Vercel](https://vercel.com):

```bash
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.
