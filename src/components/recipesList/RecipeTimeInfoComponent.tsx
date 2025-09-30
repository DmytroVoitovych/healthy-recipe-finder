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
        <CookTimeIco />
        Total coocking time:{" "}
        <time dateTime={`PT${timeInfo.readyInMinutes}M`}>
          {timeFormatedDataTotal}
        </time>{" "}
      </li>
    );

  return (
    <>
      <li>
        <PrepTimeIco />
        Prep: <time dateTime={`PT${timeInfo.preparationMinutes}M`}></time>
        {timeFormatedDataPrep}
      </li>
      <li>
        <CookTimeIco />
        Cook:{" "}
        <time dateTime={`PT${timeInfo.cookingMinutes}M`}>
          {timeFormatedDataCook}
        </time>
      </li>
    </>
  );
};
