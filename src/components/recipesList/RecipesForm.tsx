import { BaseMenuOptionSelect } from "../shared/BaseMenuOptionSelect";
import styles from "./recipesForm.module.css";

const MAX_PREP_TIME = {
  placeholder: "Max Prep Time",
  optionList: ["0 minutes", "5 minutes", "10 minutes"],
  legend: "Select preparation time",
  popoverId: "prep-time-menu",
  radioName: "prep-time",
};

export const RecipesForm = () => {
  return (
    <form className={styles.recipesListForm}>
      <BaseMenuOptionSelect
        {...MAX_PREP_TIME}
        containerClass={styles.prepTimeRadioMenuContainer}
      />
    </form>
  );
};
