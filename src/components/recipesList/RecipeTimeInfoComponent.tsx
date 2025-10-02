import { CookTimeIco, PrepTimeIco } from "@/utils/svgimports";

interface RecipeTimeInfoProps {
  timeInfo: {
    readyInMinutes: number;
    preparationMinutes: number | null;
    cookingMinutes: number | null;
  };
}

const grammarFix = (num: number | null) => {
  if (num === null) return "0 min";
  return num === 1 ? `${num} min` : `${num} mins`;
};

export const RecipeTimeInfoComponent = ({ timeInfo }: RecipeTimeInfoProps) => {
  const timeFormatedDataTotal = grammarFix(timeInfo.readyInMinutes);
  const timeFormatedDataPrep = grammarFix(timeInfo.preparationMinutes);
  const timeFormatedDataCook = grammarFix(timeInfo.cookingMinutes);

  if (!timeInfo.preparationMinutes || !timeInfo.cookingMinutes)
    return (
      <li data-total-time>
        <CookTimeIco aria-hidden="true" />
        Total cooking time:{" "}
        <time itemProp="totalTime" dateTime={`PT${timeInfo.readyInMinutes}M`}>
          {timeFormatedDataTotal}
        </time>{" "}
      </li>
    );

  return (
    <>
      <li>
        <PrepTimeIco aria-hidden="true" />
        Prep:{" "}
        <time itemProp="prepTime" dateTime={`PT${timeInfo.preparationMinutes}M`}>
          {" "}
          {timeFormatedDataPrep}
        </time>
      </li>
      <li>
        <CookTimeIco aria-hidden="true" />
        Cook:{" "}
        <time itemProp="cookTime" dateTime={`PT${timeInfo.cookingMinutes}M`}>
          {timeFormatedDataCook}
        </time>
      </li>
    </>
  );
};
