# İ'câzü'l-Kur'ân v9 — The Inimitability of the Qur'an

A multi-source platform exploring the inimitability (i'jāz) of the Quran through diverse scholarly perspectives.

## Metrics

- **11 Speakers** — Elmasry, Gary Miller, Hamza Yusuf, Hijab, Yaqeen, NAK, Elshinawy, Tzortzis, Yasir Qadhi, Jeffrey Lang, Turkish Sources
- **58 Topics** — Scientific, Prophecies, Numerical, Behavioral, Linguistic, Historical, Apologetics, Structural, Rhetorical, Personal
- **104+ Perspectives** — Cross-referenced speaker transcripts per topic
- **30+ Academic Sources** — Bucaille, Moore, Baqillani, Déroche, B²FH, Bietak, etc.
- **10 SVG Diagrams** — Pharaoh timeline, Baqarah middle, Mountain roots, Embryo stages, etc.
- **Bilingual** — Full EN/TR support
- **Audio** — EveryAyah Quran recitation (Alafasy, Husary, Sudais)

## Architecture (v8 Refactor)

```
src/
├── App.jsx                    — Main router + theme provider
├── main.jsx                   — React entry point
├── components/
│   ├── AudioPlayer.jsx        — EveryAyah audio player
│   ├── Common.jsx             — GrainOverlay, Orn, Badge, VerifyBadge, ThemeToggle
│   ├── ImageGallery.jsx       — Topic image/diagram gallery
│   ├── PerspectivesTabs.jsx   — Multi-speaker tab system
│   ├── SourceCard.jsx         — Academic source cards
│   ├── SpeakerCard.jsx        — Speaker overview cards
│   ├── SpeakerPage.jsx        — Full speaker profile page
│   ├── SvgDiagram.jsx         — 10 inline SVG diagrams
│   ├── TopicPage.jsx          — Topic detail page
│   └── VerseCard.jsx          — Ayah display with audio
└── data/
    ├── categories.js          — 10 topic categories
    ├── images.js              — EP_IMAGES mapping
    ├── reciters.js            — EveryAyah reciter configs
    ├── sources.js             — Academic source profiles
    ├── speakers.js            — 11 speaker profiles
    ├── theme.js               — Light/dark theme system
    ├── topics.js              — 58 topics with metadata
    └── transcripts.js         — 104+ transcript entries
```

## Development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # Production build → dist/
npm run preview  # Preview production build
```

## Deployment — GitHub Pages

Automatic via GitHub Actions on push to `main`:

1. Go to repo **Settings → Pages → Source → GitHub Actions**
2. Push to `main` — the workflow builds and deploys automatically
3. Site: `https://alicetinkaya76.github.io/ijazulquran/`

Manual:
```bash
npm run build
# Upload dist/ or use gh-pages branch
```

## Version History

| Version | Date       | Changes |
|---------|------------|---------|
| v4      | 2025-12   | Initial 27 Elmasry episodes + SVG diagrams |
| v5      | 2026-01   | Multi-source: 10 speakers, PerspectivesTabs |
| v6      | 2026-02   | 55 topics, Jeffrey Lang, expanded transcripts |
| v7      | 2026-03   | 58 topics, Turkish sources, 110+ perspectives |
| v8      | 2026-03   | Vite refactor — modular components + data separation |
| v9      | 2026-03   | Build fixes, GitHub Pages deploy (Actions CI/CD) |

## License

Educational use. Transcript content © respective speakers/institutions.
