# Assets Directory

This project currently uses external images from Unsplash via direct URLs through the `ImageWithFallback` component.

## Current Image Sources

### Hero Section Images

- **Ancient Architecture**: https://images.unsplash.com/photo-1568366515672-33dfb61dc38c (Pyramids/ancient structures)
- **Cultural Heritage**: https://images.unsplash.com/photo-1627837586900-56adbee910a1 (Traditional masks/artifacts)
- **Traditional Textiles**: https://images.unsplash.com/photo-1652355008626-22da23215341 (African textiles/patterns)
- **Ancient Sculptures**: https://images.unsplash.com/photo-1696224742102-26309ea4d181 (Historical artifacts/sculptures)

### Featured Stories Images

The same Unsplash images are reused for article thumbnails in the FeaturedStories component.

## Benefits of Current Approach

- ✅ No local storage needed
- ✅ Automatic image optimization by Unsplash
- ✅ Responsive image serving
- ✅ High-quality professional images
- ✅ Proper attribution to Unsplash

## Alternative: Local Assets

If you prefer to use local assets instead of external URLs:

1. Create subdirectories:

   - `/assets/images/hero/`
   - `/assets/images/stories/`
   - `/assets/images/regions/`

2. Download and optimize images
3. Update import statements in components
4. Replace ImageWithFallback src URLs with local imports

## Image Attribution

All images are sourced from Unsplash.com and are used under their license terms.
