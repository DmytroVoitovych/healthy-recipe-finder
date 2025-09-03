export const PhilosophySection = () => {
  return (
    <section className="aboutSectionTop sectionExplanation hasDivider">
      <h1 className="text-preset-2">Our food philosophy</h1>
      <ul>
        <li>
          <h2 className="text-preset-4">Whole ingredients first.</h2>
          <p className="text-preset-6">
            Fresh produce, grains, legumes, herbs, and quality fats form the backbone
            of every recipe.
          </p>
        </li>
        <li>
          <h2 className="text-preset-4">Flavor without compromise.</h2>
          <p className="text-preset-6">
            Spices, citrus, and natural sweetness replace excess salt, sugar, and
            additives.
          </p>
        </li>
        <li>
          <h2 className="text-preset-4">Respect for time.</h2>
          <p className="text-preset-6">
            Weeknight meals should slot into real schedules; weekend cooking can be
            leisurely but never wasteful.
          </p>
        </li>
        <li>
          <h2 className="text-preset-4">Sustainable choices.</h2>
          <p className="text-preset-6">
            Short ingredient lists cut down on food waste and carbon footprint, while
            plant-forward dishes keep things planet-friendly.{" "}
          </p>
        </li>
      </ul>
    </section>
  );
};
