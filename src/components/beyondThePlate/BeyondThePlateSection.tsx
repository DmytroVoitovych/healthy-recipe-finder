import srcDescJpg from "@/app/assets/images/aboutBeyond/about-beyond-desctop.jpg";
import srcDescWebP from "@/app/assets/images/aboutBeyond/about-beyond-desctop.webp";
import srcTabletJpg from "@/app/assets/images/aboutBeyond/about-beyond-tablet.jpg";
import srcTabletWebP from "@/app/assets/images/aboutBeyond/about-beyond-tablet.webp";
import srcMobileJpg from "@/app/assets/images/aboutBeyond/about-beyond-mobile.jpg";
import srcMobileWebP from "@/app/assets/images/aboutBeyond/about-beyond-mobile.webp";
import { ArtDirectionImageBannerLazy } from "../shared/ArtDirectionImageBannerLazy";
import styles from "./beyondThePlate.module.css";

const imageSource = {
  srcDescJpg: srcDescJpg.src,
  srcDescWebP: srcDescWebP.src,
  srcTabletJpg: srcTabletJpg.src,
  srcTabletWebP: srcTabletWebP.src,
  srcMobileJpg: srcMobileJpg.src,
  srcMobileWebP: srcMobileWebP.src,
};

const altContent = "Happy family cooking together in modern kitchen - father with tomatoes, daughter with herbs, mother with bell pepper preparing healthy meal.";

export const BeyondThePlateSection = () => {
  return (
    <section className={`aboutSectionTop ${styles.sectionBeyond}`}>
      <div>
        <h1 className="text-preset-2">Beyond the plate</h1>
        <p className="text-preset-6">We believe food is a catalyst for community and well-being. By sharing approachable recipes, we hope to:</p>
        <ul className="text-preset-6">
         <li><span>Encourage family dinners and social cooking.</span></li>
         <li><span>Reduce reliance on single-use packaging and delivery waste.</span></li>
         <li><span>Spark curiosity about seasonal produce and local agriculture.</span></li>   
        </ul>
      </div>
      <ArtDirectionImageBannerLazy altContent={altContent} {...imageSource} className={styles.imgBeyond}/>
    </section>
  );
};
