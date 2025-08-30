import { FC } from "react";
import { getImageProps } from "next/image";
import smallImg from "@/assets/images/image-workspace-small.jpg";
import largeImg from "@/assets/images/image-workspace-large.jpg";

interface ArtDirectionImageProps {
  className: string;
}

const ArtDirectionImage: FC<ArtDirectionImageProps> = ({ className }) => {
  const common = {
    alt: "working room  with white table and computer",
    sizes: "auto",
  };

  const {
    props: { srcSet: desktop },
  } = getImageProps({
    ...common,
    src: largeImg,
  });

  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({
    ...common,
    src: smallImg,
  });

  return (
    <picture className={className}>
      <source media="(min-width: 640px)" srcSet={desktop} />
      <source media="(max-width: 639.9px)" srcSet={mobile} />
      <img {...rest} style={{ width: "100%", height: "auto" }} />
    </picture>
  );
};

export { ArtDirectionImage };