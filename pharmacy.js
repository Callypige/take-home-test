export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }
}

// Helper function to ensure benefit is always between 0 and 50
const clampBenefit = (drug) => {
  drug.benefit = Math.min(50, Math.max(0, drug.benefit));
};

// Update functions for each drug type
const updateNormal = (drug) => {
  drug.benefit -= 1;
  drug.expiresIn -= 1;
  if (drug.expiresIn < 0) drug.benefit -= 1;
  clampBenefit(drug);
};

const updateHerbalTea = (drug) => {
  drug.benefit += 1;
  drug.expiresIn -= 1;
  if (drug.expiresIn < 0) drug.benefit += 1;
  clampBenefit(drug);
};

const updateMagicPill = () => {
  // Never expires, never degrades
};

const updateFervex = (drug) => {
  drug.expiresIn -= 1;
  if (drug.expiresIn < 0) {
    drug.benefit = 0;
  } else if (drug.expiresIn < 5) {
    drug.benefit += 3;
  } else if (drug.expiresIn < 10) {
    drug.benefit += 2;
  } else {
    drug.benefit += 1;
  }
  clampBenefit(drug);
};

// Mapping of drug names to their respective update functions
const DRUG_STRATEGIES = {
  "Herbal Tea": updateHerbalTea,
  "Magic Pill": updateMagicPill,
  "Fervex": updateFervex,
};

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }

  updateBenefitValue() {
    for (const drug of this.drugs) {
      const strategy = DRUG_STRATEGIES[drug.name] ?? updateNormal;
      strategy(drug);
    }
    return this.drugs;
  }
}
