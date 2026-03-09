# Snad KSA Legal Platform

## Design System
- Primary: dark navy HSL(222, 47%, 20%)
- Secondary: golden HSL(45, 93%, 47%) - for accents/CTAs
- Background: white (light theme)
- Font: Cairo + Tajawal (Arabic)
- Direction: RTL
- Sections alternate: white bg for content, dark primary bg for hero/stats/footer

## Architecture
- Layout wraps all pages (Header + Footer)
- Components: Hero, GovernmentPartner, PlatformSaleBanner, FeaturedLawyers, LegalServices, Statistics, Testimonials
- Auth: Supabase auth integrated in Header (profile dropdown when logged in)

## Key Design Choices
- Lawyer cards: blue header with avatar, white body with progress bars, stats grid, pricing
- Services: white cards with outline "طلب استشارة" buttons
- Statistics: dark primary background
- Testimonials: light muted background
- All colors via semantic tokens, NO direct color classes
