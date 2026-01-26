# Implementation Plan: Route Restructuring (Protected vs Unprotected)

This plan outlines the steps to restructure both Mobile (Expo) and Web (Next.js) applications to separate protected and unprotected routes.

## Goals

1.  **Mobile**:
    - **Unprotected Scope**: Onboarding (New), Login, Sign Up.
    - **Protected Scope**: Dashboard, Todos.
    - **Navigation**: Use File-based routing with Route Groups `(public)` vs `(protected)`.

2.  **Web**:
    - **Unprotected Scope**: Home, Login, Sign Up.
    - **Protected Scope**: Dashboard, Todos.
    - **Navigation**: Use Route Groups `(public)` vs `(protected)` and Middleware for protection.

---

## Part 1: Mobile App (`apps/native`)

### Step 1.1: Create Route Groups

- [ ] Create `apps/native/app/(public)` directory.
- [ ] Create `apps/native/app/(protected)` directory.

### Step 1.2: Move and Create Public Screens

- [ ] Create `apps/native/app/(public)/_layout.tsx` (Stack navigator).
- [ ] Create `apps/native/app/(public)/index.tsx` (New **Onboarding** screen).
- [ ] Create `apps/native/app/(public)/login.tsx` (Move/Adapt from existing components).
- [ ] Create `apps/native/app/(public)/sign-up.tsx` (Move/Adapt from existing components).

### Step 1.3: Move Protected Screens

- [ ] Move existing `(drawer)` content into `apps/native/app/(protected)`.
  - _Note_: The `(drawer)` group itself fits well as the root of the protected area. We can rename `(drawer)` to `(protected)` or nested inside it.
  - **Decision**: Move `(drawer)` _inside_ `(protected)` or just rename `(drawer)` -> `(protected)` and ensure it has a drawer layout?
  - **Refined Approach**:
    - `apps/native/app/(protected)/_layout.tsx` -> Use Drawer.
    - Move `index.tsx` (Dashboard) and `todos.tsx` here.

### Step 1.4: Implement Auth Guard in Root Layout

- [ ] Edit `apps/native/app/_layout.tsx`.
- [ ] Add `useEffect` or `useSegments` from `expo-router` to check `authClient.useSession()`.
- [ ] If user is **not** logged in -> Redirect to `(public)/index` (Onboarding).
- [ ] If user **is** logged in -> Redirect to `(protected)/` (Dashboard).
- [ ] Handle loading state (splash screen).

---

## Part 2: Web App (`apps/web`)

### Step 2.1: Create Route Groups

- [ ] Create `apps/web/src/app/(public)` directory.
- [ ] Create `apps/web/src/app/(protected)` directory.

### Step 2.2: Move Unprotected Pages

- [ ] Move `apps/web/src/app/page.tsx` (Home) to `apps/web/src/app/(public)/page.tsx`.
- [ ] Move `apps/web/src/app/login/page.tsx` to `apps/web/src/app/(public)/login/page.tsx`.
- [ ] Ensure Sign Up page exists (if separate) or is handled within Login.

### Step 2.3: Move Protected Pages

- [ ] Move `apps/web/src/app/dashboard` to `apps/web/src/app/(protected)/dashboard`.
- [ ] Move `apps/web/src/app/todos` to `apps/web/src/app/(protected)/todos`.

### Step 2.4: Implement Middleware

- [ ] Create `apps/web/src/middleware.ts`.
- [ ] Use `better-auth` middleware or manual session check to protect routes starting with `/dashboard` and `/todos`.
- [ ] Redirect unauthenticated users to `/login`.

---

## Part 3: Cleanup and Verification

### Step 3.1: Verify Navigation

- [ ] Check Mobile: Onboarding -> Login -> Dashboard.
- [ ] Check Web: Home -> Login -> Dashboard.

### Step 3.2: Verify API Connections

- [ ] Ensure relocating pages didn't break relative imports (esp. for components and utils).
