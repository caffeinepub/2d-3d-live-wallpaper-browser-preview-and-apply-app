# Specification

## Summary
**Goal:** Build a wallpaper browsing app that supports 2D, 3D, and Live wallpapers with preview, download/export actions, and per-user persistent favorites via Internet Identity.

**Planned changes:**
- Create core screens and navigation: Browse (with 2D/3D/Live tabs/filters), Wallpaper Detail/Preview, and Favorites.
- Ship a built-in wallpaper catalog covering 2D image assets, Live animated assets, and 3D React Three Fiber scenes (each with id, title, type, thumbnail path, and preview configuration).
- Implement at least two interactive, animated 3D preview scenes using React Three Fiber.
- Implement Live wallpaper preview as looping animated content with play/pause controls when applicable.
- Add an Apply action on detail: full-screen preview plus download for 2D/Live; for 3D full-screen and snapshot export/download.
- Add Internet Identity sign-in and persist favorites per authenticated user; allow favorite/unfavorite from Browse and Detail.
- Backend (single Motoko actor): methods to list catalog metadata and manage per-principal favorites (getFavorites/addFavorite/removeFavorite).
- Frontend data layer with React Query: load catalog and favorites, handle optimistic favorite mutations with rollback on error.
- Apply a coherent, consistent visual theme across screens (not blue+purple).
- Add static asset handling for thumbnails and wallpaper media as frontend public assets referenced directly by catalog metadata.

**User-visible outcome:** Users can browse 2D/3D/Live wallpapers, open a detail preview (including interactive 3D and looping Live previews), download/apply via full-screen and download/snapshot options, and sign in with Internet Identity to favorite wallpapers that persist across reloads and appear in a Favorites screen.
