import { FC } from "react";
import { getImageProps } from "next/image";
import { ArtDirectionImageProps } from "./ArtDirectionImageBanner";

const ArtDirectionImageSquare: FC<ArtDirectionImageProps> = ({
  className,
  altContent,
  srcDescJpg,
  srcDescWebP,
  srcMobileJpg,
  srcMobileWebP,
  srcTabletJpg,
  srcTabletWebP,
}) => {
  const common = {
    alt: altContent,
    sizes: "(min-width: 1200px) 600px, (min-width: 640px) 400px, 100vw",
  };

  const {
    props: { srcSet: desktopWebP },
  } = getImageProps({
    ...common,
    width: 1200,
    height: 1200,
    quality: 85,
    src: srcDescWebP, // WebP
  });

  // Desktop fallback
  const {
    props: { srcSet: desktop },
  } = getImageProps({
    ...common,
    width: 1200,
    height: 1200,
    quality: 85,
    src: srcDescJpg, // fallback
  });

  const {
    props: { srcSet: tabletWebP },
  } = getImageProps({
    ...common,
    width: 800,
    height: 800,
    quality: 80,
    src: srcTabletWebP,
  });

  const {
    props: { srcSet: tablet },
  } = getImageProps({
    ...common,
    width: 800,
    height: 800,
    quality: 80,
    src: srcTabletJpg, // fallback
  });

  // Mobile WebP
  const {
    props: { srcSet: mobileWebP },
  } = getImageProps({
    ...common,
    width: 600,
    height: 600,
    quality: 75,
    src: srcMobileWebP, // WebP
  });

  // Mobile fallback
  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({
    ...common,
    width: 600,
    height: 600,
    quality: 75,
    src: srcMobileJpg, // ← fallback
  });

  const { src, ...base } = rest;

  return (
    <picture className={className}>
      <source media="(min-width: 1200px)" srcSet={desktopWebP} type="image/webp" />
      <source
        media="(min-width: 640px) and (max-width: 1199px)"
        srcSet={tabletWebP}
        type="image/webp"
      />
      <source media="(max-width: 639.9px)" srcSet={mobileWebP} type="image/webp" />

      <source media="(min-width: 1200px)" srcSet={desktop} type="image/jpeg" />
      <source media="(min-width: 640px) and (max-width: 1199px)" srcSet={tablet} type="image/jpeg" />
      <source media="(max-width: 639.9px)" srcSet={mobile} type="image/jpeg" />
      <img
        {...base}
        src={desktop}
        style={{ width: "100%", height: "auto", objectFit: "cover" }}
      />
    </picture>
  );
};

export { ArtDirectionImageSquare };
