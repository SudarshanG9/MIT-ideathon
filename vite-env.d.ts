// Inside src/vite-env.d.ts
declare module '*.png';
declare module '*.jpg';

// Add this to specifically target Leaflet's assets
declare module 'leaflet/dist/images/*.png' {
  const value: string;
  export default value;
}