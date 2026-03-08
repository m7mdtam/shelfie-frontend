# 📚 Shelfie

A community-driven book management and discovery platform. Track your reading, share your shelf, explore books from others, and engage through ratings and comments.

---

## ✨ Features

- **Personal Shelf** — Add books to your shelf with status tracking: `Want to Read`, `Reading`, or `Finished`
- **Explore** — Browse the community's book collection, filter by genre, status, or downloadable flag
- **Book Details** — Rich detail pages with cover, author, ratings, comments, and download links
- **Ratings & Comments** — Rate books and leave comments; see what the community thinks
- **User Profiles** — Customizable profiles with avatar, bio, and personal info
- **Public Profiles** — View other users' shelves and book collections
- **Authentication** — Sign up, sign in, email verification, forgot/reset password flows
- **Dark / Light Mode** — Full theme support across all pages
- **Mobile Responsive** — Optimized for all screen sizes with a hamburger menu on mobile

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build Tool | Vite |
| Routing | TanStack Router (file-based) |
| Data Fetching | TanStack Query v5 |
| HTTP Client | Axios (with JWT interceptors) |
| Styling | Tailwind CSS v4 (CSS-first config) |
| UI Primitives | Radix UI |
| Icons | Lucide React |
| Animation | Motion / GSAP |
| Forms | React Hook Form + Zod |
| Toasts | Sonner |
| Theme | next-themes |
| Auth | JWT (stored in cookies) |
| Linting | ESLint + Prettier + Husky |

---
## 📁 Project Structure

```
src/
├── components/
│   ├── common/          # Shared layout components (Navbar, etc.)
│   ├── pages/           # Page-specific components (book cards, forms, etc.)
│   ├── auth/            # Auth form components
│   └── ui/              # Base UI primitives (shadcn-style)
├── contexts/            # React contexts (Auth)
├── hooks/               # Custom hooks
├── lib/                 # Utilities (axios instance, JWT, cn helper)
├── pages/
│   ├── auth/            # Sign in, sign up, verify email, reset password
│   └── app/             # Shelf, explore, book detail, profile
├── routes/              # TanStack Router file-based routes
├── styles/              # CSS design system (colors, theme, shadows)
└── main.tsx
```
