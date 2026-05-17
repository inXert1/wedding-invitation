# Implementation Plan: Unified Floating Menu (FAB)

This plan outlines the approach to resolve the mobile view overlap between the sound indicator and navigation FAB by consolidating them into a single, elegant expanding floating menu.

## Proposed Changes

### 1. `src/sections/home/components/unified-fab.tsx` [NEW]
Create a new `UnifiedFAB` component that acts as the single floating control on the page.
- **Base State**: A primary button (56x56px) displaying the current scroll progress ring and a "Menu" or "Actions" icon.
- **Expanded State**: Tapping the main button reveals a vertical or radial menu containing:
  - **Next Section Action** (48x48px): The heart icon to advance to the next section.
  - **Music Toggle Action** (48x48px): The music icon to play/pause background audio.
- **Safe Area Support**: Uses `pb-[env(safe-area-inset-bottom)]` and `pr-[env(safe-area-inset-right)]` to ensure it never overlaps system home bars on iOS or Android.

### 2. `src/sections/home/components/music-player.tsx` [MODIFY]
- Refactor the component to act purely as a state/audio manager (or an invisible audio wrapper) that exposes its controls (isPlaying, togglePlayPause, autoplayBlocked), OR integrate its UI directly into the new `UnifiedFAB` to keep the audio modal logic intact while hiding the original floating button.
- *Decision*: We will extract the floating button UI from `music-player.tsx` and move the audio state and modal logic into the new `UnifiedFAB` (or wrap `UnifiedFAB` inside `MusicPlayer` to share the audio state).

### 3. `src/sections/home/view/home-view.tsx` [MODIFY]
- Remove the individual `<MusicPlayer />` and `<NavigationFAB />` floating components.
- Introduce the new `<UnifiedFAB activeSection={...} onScrollToSection={...} />`.

### 4. `src/sections/home/components/navigation-fab.tsx` [DELETE]
- This file will be gracefully deprecated as its logic is absorbed into `UnifiedFAB.tsx`.
