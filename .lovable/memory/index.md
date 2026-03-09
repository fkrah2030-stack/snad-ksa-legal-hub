# Memory: index.md
Updated: now

# Snad KSA Legal Platform

## Design System
- Primary: deep blue HSL(222, 47%, 20%)
- Secondary: golden HSL(45, 93%, 47%) - for accents/CTAs
- Font: Cairo + Tajawal (Arabic)
- Direction: RTL
- Theme color: #1e3a5f

## Architecture
- Layout wraps all pages (Header + Footer + MobileBottomNav)
- MobileBottomNav: fixed bottom nav on mobile, hidden on md+
- Components: Hero, GovernmentPartner, PlatformSaleBanner, FeaturedLawyers, LegalServices, Statistics, Testimonials
- PWA configured with vite-plugin-pwa

## Decisions
- Logo generated as snad-logo.png
- Hero background: hero-bg.jpg
- Mobile-first approach with touch-friendly 44px min targets
- framer-motion pinned to 11.18.2 (React 18 compat)
- PWA icons: pwa-192x192.png, pwa-512x512.png
