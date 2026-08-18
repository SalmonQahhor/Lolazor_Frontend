# Lolazor — Frontend

Next.js 14 (App Router) + TypeScript + Tailwind CSS frontend for the Lolazor
podcast platform, built against a Django REST Framework backend.

## Stack

- **Next.js 14** (App Router, client components + `useEffect`/`useState` data
  fetching against the DRF API)
- **TypeScript** — strict interfaces in `types/api.ts` mirror every DRF
  serializer field exactly
- **Tailwind CSS** — theme tokens (colors, radii, shadows) defined in
  `tailwind.config.ts` from the Lolazor brand spec
- **Axios** — single client in `lib/api.ts` with normalized `ApiError` handling
- **lucide-react** — icon set

## Getting started

```bash
npm install
cp .env.local.example .env.local   # adjust NEXT_PUBLIC_API_URL if needed
npm run dev
```

The app expects the Django backend at `http://127.0.0.1:8000/api/v1/` by
default (see `.env.local.example`). Override `NEXT_PUBLIC_API_URL` to point
elsewhere.

## Project structure

```
app/
  layout.tsx                 Root layout (fonts, Navbar, Footer)
  page.tsx                   Home — hero, super episodes rail, latest grid, quotes
  episodes/page.tsx          Archive — search, topic/year filters, pagination
  episodes/[id]/page.tsx     Episode detail — player, timestamps, quotes, resources
  people/page.tsx            People directory — host/guest filter + search
  people/[id]/page.tsx       Person profile — bio, socials, episode appearances
  quotes/page.tsx            Quotes database — search + pagination
components/                  EpisodeCard, QuoteCard, PersonCard, Navbar, Footer,
                              Pagination, TopicPills, ResourceBadge, StateBanners
lib/
  api.ts                     Axios client + typed request helpers per endpoint
  utils.ts                   Date/duration formatting, YouTube helpers, etc.
types/
  api.ts                     TypeScript interfaces matching every DRF serializer
```

## Notes on API assumptions

The brief's endpoint spec is followed exactly, with two small, clearly
commented additions in `types/api.ts` where the UI needed something the spec
didn't explicitly list:

- `EpisodesQueryParams.release_date__year` — powers the archive page's year
  dropdown, assuming the backend exposes a django-filter year lookup on
  `release_date`. If it doesn't, the filter silently has no effect.
- `QuotesQueryParams.page` — DRF's `PageNumberPagination` is usually applied
  globally, so `page` is assumed to work for `/quotes/` even though it isn't
  called out under that endpoint's specific filter params.

If either assumption doesn't hold against your actual backend, both are
isolated to a single param each and easy to remove.

Interactive timestamps on the episode detail page are built from each
episode's `quotes[].timestamp` (there's no separate timestamps endpoint in
the spec) — clicking one seeks the embedded YouTube player to that point.
