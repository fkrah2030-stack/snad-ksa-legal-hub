# Memory: index.md
Updated: now

# Snad KSA Legal Platform

## Design System
- Primary: deep blue HSL(222, 47%, 20%)
- Secondary: golden HSL(45, 93%, 47%) - for accents/CTAs
- Font: Cairo + Tajawal (Arabic)
- Direction: RTL
- Background: white (light mode)

## Architecture
- Layout wraps public pages (Header + Footer)
- Admin: /admin/* with Sidebar layout, protected by admin role check
- Auth: Supabase Auth with user_roles table (app_role enum: admin, moderator, lawyer, user)
- Auto profile creation on signup via trigger

## Database Tables
- profiles, user_roles, lawyers, services, consultations
- has_role() security definer function for RLS

## Key Decisions
- Logo: snad-logo.png
- Outline buttons on dark bg: use variant="ghost" + border class (not outline which adds bg-background)
- Admin added manually via database (no self-registration for admin)
- Services managed from admin dashboard, displayed dynamically on site
