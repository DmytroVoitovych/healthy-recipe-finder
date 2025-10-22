import { Recipe } from "@/lib/api/fetchRecipesTypes";
import Image from "next/image";
import styles from "./recipeCard.module.css";
import { getFirstSentence } from "@/utils/componentHelpers/getFirstSentence";
import { RecipeTimeInfoComponent } from "./RecipeTimeInfoComponent";
import { ServingsIco } from "@/utils/svgimports";
import { StoreButton } from "../shared/StoreButton";
import { ImageWrapper } from "../shared/ImageWrapper";

interface RecipeCardProps {
  recipe: Recipe;
  children: React.ReactNode;
  className?: string;
  index?: number;
}

const imageSizeProps = {
  card: {
    sizes: "(min-width: 1200px) 600px, (min-width: 640px) 400px, 100vw",
    fill: true,
  },
  page: {
    width: 343,
    height: 343,
    sizes: "(min-width: 1200px) 580px, (min-width: 640px) 600px, 100vw",
    priority: true,
  },
};

export const RecipeCard = ({
  recipe,
  children,
  className,
  index,
}: RecipeCardProps) => {
  const {
    summary,
    title,
    id,
    imageType,
    servings,
    readyInMinutes,
    preparationMinutes,
    cookingMinutes,
  } = recipe;
  const shortSummary = getFirstSentence(summary);
  const cookTimeInfoData = { readyInMinutes, preparationMinutes, cookingMinutes };
  const imgProps = className ? imageSizeProps.page : imageSizeProps.card;


  const imageEl = (
    <Image
      alt={title + "healthy recipe"}
      src={`https://img.spoonacular.com/recipes/${id}-636x393.${imageType}`}
      {...imgProps}
      quality="100"
      itemProp="image"
      {...(index === 0?{priority:true}:{})}
       {...(index ?{loading:'lazy'}:{})}
    />
  );

  return (
    <article
      className={styles.recipeCard}
      itemScope
      itemType="https://schema.org/Recipe"
    >
      <StoreButton id={id.toString()} recipe={recipe} />
      <section className={className || styles.recipeCardSection}>
        {className ? imageEl : <ImageWrapper>{imageEl}</ImageWrapper>}
        <div>
          <h2 className="text-preset-5" itemProp="name">
            {title}
          </h2>
          <p
            className="text-preset-9"
            dangerouslySetInnerHTML={{ __html: shortSummary }}
            itemProp="description"
          />
        </div>
        <ul className="text-preset-9">
          <li itemProp="recipeYield">
            {" "}
            <ServingsIco aria-hidden="true" /> Servings: {servings}
          </li>
          <RecipeTimeInfoComponent timeInfo={cookTimeInfoData} />
        </ul>
        {children}
      </section>
    </article>
  );
};
