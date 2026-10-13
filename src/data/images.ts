import type { ImageAsset } from '@/types';
import manifest from './image-manifest.json';

/**
 * Every photograph on the site. Files are self-hosted WebP variants in
 * public/images/, produced by `npm run images` (scripts/build-images.mjs)
 * from the originals listed in image-manifest.json.
 *
 * <SmartImage> shows a branded placeholder if a file is ever missing.
 */
type ImageName = keyof typeof manifest;

function local(name: ImageName, alt: string): ImageAsset {
  const { width, height, widths } = manifest[name];
  const base = `${import.meta.env.BASE_URL}images/${name}`;
  const largest = widths[widths.length - 1] ?? width;
  return {
    src: `${base}-${largest}.webp`,
    srcSet: widths.map((w) => `${base}-${w}.webp ${w}w`).join(', '),
    alt,
    width,
    height,
  };
}

export const images = {
  hero: local('hero', 'Modern house with rooftop solar panels at sunset'),
  installer: local('installer', 'Solar technician in a hard hat installing rooftop solar panels'),
  residential: local('service-residential', 'Family home with solar panels on the roof'),
  commercial: local('service-commercial', 'Commercial office building with rooftop solar panels'),
  industrial: local('service-industrial', 'Rows of industrial solar panels under a blue sky'),
  maintenance: local('service-maintenance', 'Technician inspecting ground-mounted solar panels'),
  projectResidential: local('project-residential', 'Wooden family home with a solar roof at sunset'),
  projectCommercial: local('project-commercial', 'Aerial view of a commercial rooftop solar installation in California'),
  projectIndustrial: local('project-industrial', 'Aerial view of a large industrial solar farm in Texas'),
  cta: local('cta', ''),
} satisfies Record<string, ImageAsset>;
