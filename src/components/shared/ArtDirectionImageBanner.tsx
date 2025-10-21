import { FC} from "react";
import { getImageProps } from "next/image";

export interface ArtDirectionImageProps {
  className: string;
  altContent: string;
  srcDescJpg: string;
  srcDescWebP: string;
  srcTabletJpg: string;
  srcTabletWebP: string;
  srcMobileJpg: string;
  srcMobileWebP: string;
}


const ArtDirectionImageBanner: FC<ArtDirectionImageProps> = ({
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
    sizes: "(min-width: 1200px) 1920px, (min-width: 640px) 1024px, 100vw",
  };

  const {
    props: { srcSet: desktopWebP },
  } = getImageProps({
    ...common,
    width: 1920,
    height: 800,
    quality: 85,
    src: srcDescWebP, // WebP
    priority: true,
  });

  // Desktop fallback
  const {
    props: { srcSet: desktop },
  } = getImageProps({
    ...common,
    width: 1920,
    height: 800,
    quality: 85,
    src: srcDescJpg, // fallback
  });

  const {
    props: { srcSet: tabletWebP },
  } = getImageProps({
    ...common,
    width: 1024,
    height: 400,
    quality: 80,
    src: srcTabletWebP,
  });

  const {
    props: { srcSet: tablet },
  } = getImageProps({
    ...common,
    width: 1024,
    height: 400,
    quality: 80,
    src: srcTabletJpg, // fallback
  });

  // Mobile WebP
  const {
    props: { srcSet: mobileWebP },
  } = getImageProps({
    ...common,
    width: 750,
    height: 400,
    quality: 75,
    src: srcMobileWebP, // WebP
  });

  // Mobile fallback
  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({
    ...common,
    width: 750,
    height: 400,
    quality: 75,
    src: srcMobileJpg, // ← fallback
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      <source
        media="(min-width: 640px) and (max-width: 1199px)"
        srcSet={tablet}
        type="image/jpeg"
      />
      <source media="(max-width: 639.9px)" srcSet={mobile} type="image/jpeg" />

      <img
        {...base}
        alt={altContent}
        src={desktop}
        style={{ width: "100%", height: "auto", objectFit: "cover" }}
        fetchPriority="high"
        loading="eager"
      />
    </picture>
  );
};

export { ArtDirectionImageBanner };
