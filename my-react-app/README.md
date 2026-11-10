# Usman Tent House — Website

Single-page, frontend-only website (React + Vite + TypeScript + Tailwind CSS v4 + Framer Motion + Lucide icons).
There is no backend, database or authentication. Enquiries are sent through WhatsApp.

## Run / build

```bash
npm install
npm run dev      # local development
npm run build    # production build → dist/index.html (single self-contained file)
```

Deploy the contents of `dist/` to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages, shared hosting).

## Where to edit things

| What | File |
| --- | --- |
| Phone, WhatsApp, address, hours, map links, Google Drive link, social links, verified stats | `src/data/business.ts` |
| Services (title, text, image) | `src/data/services.ts` |
| Gallery items and categories | `src/data/gallery.ts` |
| Photo registry (paths, alt text, credits) | `src/data/images.ts` |
| Testimonials (real ones only) | `src/data/testimonials.ts` |
| FAQ | `src/data/faq.ts` |
| Nav links, process steps, "why choose us", form options | `src/data/content.ts` |
| WhatsApp message formats | `src/lib/whatsapp.ts` |
| Form validation | `src/lib/validation.ts` |
| Colours, fonts | `src/index.css` (`@theme` block) |

### Project structure

```
src/
  components/
    layout/    Navbar, MobileMenu, Footer
    sections/  Hero, Highlights, About, Services, FeaturedWork, Gallery,
               DriveCollection, WhyChooseUs, Statistics, Process,
               Testimonials, FAQ, Contact, Location
    ui/        Button, Photo, Reveal, SectionHeading, ServiceCard, GalleryGrid,
               Lightbox, ContactForm, FloatingContact, CountUp, Logo, SocialIcons
  data/        business, images, services, gallery, testimonials, faq, content
  lib/         whatsapp, maps, validation, hooks
  types/       shared TypeScript interfaces
```

## Items the owner must confirm before launch

- **Established year / years of experience** — a directory lists 1984 / "36 years" but this is *unverified*. Set
  `establishedYear` (or `verifiedStats.yearsOfExperience`) in `business.ts` once confirmed; About and Statistics update automatically.
- **Events completed / customer satisfaction** — left empty (hidden) until verified.
- **Opening hours** — `9:00 AM – 9:00 PM` is a placeholder default.
- **Google Maps** — by default the map searches the written address. For an exact pin, open the shop in Google Maps →
  Share → *Embed a map* and paste the `src` URL into `mapEmbedUrl`; paste the "Share" link into `mapsPlaceUrl`.
- **Google Drive photo collection** — paste the public folder link into `driveGalleryUrl`
  (set sharing to *Anyone with the link → Viewer*, only if the business approves public access). While empty, the section
  shows a friendly fallback with a WhatsApp photo request.
- **Testimonials** — add only genuine customer feedback. While empty, a "coming soon" state is shown.
- **Social links, email** — optional; hidden when empty.

## Contact methods

- WhatsApp: `https://wa.me/919648351536` (prefilled messages from the nav, service cards, form and floating widget)
- Call: `tel:+919648351536`
- Contact form: validates client-side, then opens WhatsApp with a formatted message. The visitor must press *Send* in
  WhatsApp — the site never claims an enquiry was delivered.

## Photographs & licensing

All photographs are **royalty-free stock images from [Pexels](https://www.pexels.com/license/)** and are used as
*representative* imagery only. The site states this on the Featured Work and Gallery sections and does **not** present
them as actual Usman Tent House projects. Per-photo author and link are stored in `src/data/images.ts` and shown in the lightbox.

To replace a stock photo with a real one: add the file to `public/images/`, then in `images.ts` set `localSrc: "/images/your-file.jpg"`,
`isStock: false`, and update `width`, `height`, `alt`, `author`. Notices disappear automatically once no stock images remain.

Photographers credited: The Visionary Vows, BANU FILM ADS, Prince Nature, Cưới Hỏi Hồng Biên, Jonathan Borba, NUDE Nahum,
Daria Andrievskaya, Ken Mwaura, Tolga Aslantürk, Angel Ayala, Alexey Demidov, Andy Lee, Matheus Bertelli, Studio Dreamview,
Vidal Balielo Jr., Maor Attias, DΛVΞ GΛRCIΛ.

## SEO

- Title, description, Open Graph and Twitter tags are in `index.html` (update the `og:image` to a real photo of your work when available).
- LocalBusiness JSON-LD is generated at runtime from `business.ts` (`src/components/StructuredData.tsx`) and only contains verified fields.
- `public/robots.txt` is included. Add a `sitemap.xml` and canonical URL once the production domain is known.

## Accessibility & motion

Semantic landmarks, labelled form fields with inline errors, keyboard-operable gallery lightbox (← → Esc), accessible FAQ accordion,
visible focus rings, and `prefers-reduced-motion` support (Framer Motion `MotionConfig reducedMotion="user"` plus CSS fallbacks).
