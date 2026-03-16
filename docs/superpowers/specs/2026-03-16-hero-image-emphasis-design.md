# Hero Image Emphasis Design

## Goal

Make the rotating hero portrait feel larger and more prominent, while concealing the bottom-right sparkle watermark so the images read more naturally.

## Design

The hero portrait should feel bigger in two ways: the media area itself should claim more space in the desktop layout, and the image should crop tighter inside that frame. The existing synchronized text/image rotation stays unchanged.

The image emphasis should come from CSS rather than new data structures. `hero-split.module.css` will increase the portrait frame width and minimum height on desktop, preserve full-width behavior on mobile, and tighten composition with `object-position` and a subtle scale so the subject reads larger immediately.

To hide the sparkle watermark without looking like a patch, the hero media will add a soft bottom-right concealment layer. That layer should be a small radial veil with blur-like softness rather than a hard badge or shape, so it blends into the scene and keeps attention on the subject.

## Files

- Modify `components/hero-split.module.css` to enlarge the media frame, tighten the crop, and add the concealment layer.
- Modify `components/hero-split.tsx` only if the concealment layer is easier to express as a dedicated overlay element.
- Modify style tests that currently pin the smaller hero image dimensions.

## Testing

Update the existing hero image scale style test to assert the larger desktop footprint and mobile height. Add a focused style or component assertion for the concealment treatment so the watermark-hiding layer remains intentional.
