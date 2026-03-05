import { Drug, Pharmacy } from "./pharmacy";

const run = (name, expiresIn, benefit) =>
  new Pharmacy([new Drug(name, expiresIn, benefit)]).updateBenefitValue()[0];

describe("Pharmacy", () => {
  it.each([
    // Normal
    ["Doliprane", 2, 3, 1, 2],
    ["Doliprane", 0, 10, -1, 8],
    ["Doliprane", 5, 0, 4, 0],
    // Herbal Tea
    ["Herbal Tea", 5, 10, 4, 11],
    ["Herbal Tea", 0, 10, -1, 12],
    ["Herbal Tea", 5, 50, 4, 50],
    // Magic Pill
    ["Magic Pill", 15, 40, 15, 40],
    // Fervex
    ["Fervex", 12, 35, 11, 36],
    ["Fervex", 10, 35, 9, 37],
    ["Fervex", 5, 35, 4, 38],
    ["Fervex", 0, 35, -1, 0],
    // Dafalgan
    ["Dafalgan", 5, 10, 4, 8],
    ["Dafalgan", 0, 10, -1, 6],
    ["Dafalgan", 5, 0, 4, 0],
  ])(
    "%s (expiresIn: %i, benefit: %i) → (expiresIn: %i, benefit: %i)",
    (name, expiresIn, benefit, expectedExpiresIn, expectedBenefit) => {
      const result = run(name, expiresIn, benefit);
      expect(result.expiresIn).toBe(expectedExpiresIn);
      expect(result.benefit).toBe(expectedBenefit);
    },
  );
});
