/** Home app (Vite default in dev: http://localhost:5173). Set `VITE_HOME_PAGE_ORIGIN` if different. */
export function getHomePageOrigin(): string {
  return import.meta.env.VITE_HOME_PAGE_ORIGIN ?? 'http://localhost:5173';
}
