/**
 * Calculates the future value of an investment with compound interest.
 * 
 * @param principal The initial investment amount
 * @param rate The annual interest rate (as a decimal, e.g., 0.05 for 5%)
 * @param timeYears The time period in years
 * @param compoundingPerYear Number of times interest is compounded per year (default: 1)
 * @param additionalContributions Additional regular contributions (default: 0)
 * @param contributionFrequency Frequency of additional contributions per year (default: same as compounding)
 * @returns The future value of the investment
 */
export const calculateCompoundInterest = (
  principal: number,
  rate: number,
  timeYears: number,
  compoundingPerYear: number = 1,
  additionalContributions: number = 0,
  contributionFrequency: number = compoundingPerYear
): number => {
  // Validate inputs
  if (principal < 0 || rate < 0 || timeYears < 0 || compoundingPerYear <= 0 || contributionFrequency <= 0) {
    throw new Error('Invalid input: All numeric values must be non-negative and compounding frequency must be positive');
  }

  // Calculate future value of principal
  const r = rate / compoundingPerYear;
  const n = compoundingPerYear * timeYears;
  const baseAmount = principal * Math.pow(1 + r, n);

  // If no additional contributions, return base amount
  if (additionalContributions <= 0) {
    return parseFloat(baseAmount.toFixed(2));
  }

  // Calculate future value with additional contributions
  const contributionAmount = additionalContributions * (contributionFrequency / compoundingPerYear);
  const periodsPerContribution = compoundingPerYear / contributionFrequency;

  // Calculate how the contributions grow with interest
  let futureValueOfContributions = 0;
  for (let i = 0; i < n; i++) {
    // Apply contributions at the start of each contribution period
    if (i % periodsPerContribution === 0) {
      futureValueOfContributions += contributionAmount;
    }
    // Apply interest for this compounding period
    futureValueOfContributions *= (1 + r);
  }

  const totalFutureValue = baseAmount + futureValueOfContributions;
  return parseFloat(totalFutureValue.toFixed(2));
};

/**
 * Generates a year-by-year growth projection for an investment with compound interest.
 * 
 * @param principal The initial investment amount
 * @param rate The annual interest rate (as a decimal, e.g., 0.05 for 5%)
 * @param timeYears The time period in years
 * @param compoundingPerYear Number of times interest is compounded per year (default: 1)
 * @param additionalContributions Additional regular contributions (default: 0)
 * @param contributionFrequency Frequency of additional contributions per year (default: same as compounding)
 * @returns An array of yearly balance values
 */
export const generateCompoundInterestTimeline = (
  principal: number,
  rate: number,
  timeYears: number,
  compoundingPerYear: number = 1,
  additionalContributions: number = 0, 
  contributionFrequency: number = compoundingPerYear
): { year: number; balance: number; interest: number; contributions: number }[] => {
  // Validate inputs
  if (principal < 0 || rate < 0 || timeYears < 0 || compoundingPerYear <= 0 || contributionFrequency <= 0) {
    throw new Error('Invalid input: All numeric values must be non-negative and compounding frequency must be positive');
  }

  const timeline = [];
  const r = rate / compoundingPerYear;
  const periodsPerYear = compoundingPerYear;
  const contributionAmount = additionalContributions * (contributionFrequency / compoundingPerYear);
  const periodsPerContribution = compoundingPerYear / contributionFrequency;
  
  let balance = principal;
  let totalContributions = principal;
  let previousYearBalance = principal;

  for (let year = 1; year <= timeYears; year++) {
    // Calculate compound interest for each period within this year
    for (let period = 1; period <= periodsPerYear; period++) {
      // Apply interest for this period
      const interestEarned = balance * r;
      balance += interestEarned;
      
      // Apply contribution if applicable for this period
      const periodIndex = (year - 1) * periodsPerYear + period;
      if (periodIndex % periodsPerContribution === 0) {
        balance += contributionAmount;
        totalContributions += contributionAmount;
      }
    }
    
    // Calculate interest earned this year
    const yearlyInterest = balance - previousYearBalance - 
      (additionalContributions * Math.min(contributionFrequency, periodsPerYear));
    
    // Add year data to timeline
    timeline.push({
      year,
      balance: parseFloat(balance.toFixed(2)),
      interest: parseFloat(yearlyInterest.toFixed(2)),
      contributions: parseFloat((totalContributions).toFixed(2))
    });
    
    previousYearBalance = balance;
  }
  
  return timeline;
};

/**
 * Calculate the rate of return required to reach a target amount
 * 
 * @param principal The initial investment amount
 * @param targetAmount The desired future value
 * @param timeYears The time period in years
 * @param compoundingPerYear Number of times interest is compounded per year (default: 1)
 * @returns The required annual interest rate as a decimal
 */
export const calculateRequiredRate = (
  principal: number,
  targetAmount: number,
  timeYears: number,
  compoundingPerYear: number = 1
): number => {
  // Validate inputs
  if (principal <= 0 || targetAmount <= principal || timeYears <= 0 || compoundingPerYear <= 0) {
    throw new Error('Invalid input: Principal and time must be positive, target amount must be greater than principal');
  }

  // Calculate required rate
  const n = compoundingPerYear * timeYears;
  const rate = compoundingPerYear * (Math.pow(targetAmount / principal, 1 / n) - 1);
  
  return parseFloat(rate.toFixed(4));
}; 