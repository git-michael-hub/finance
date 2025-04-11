/**
 * Finance AI Service
 * 
 * This module provides AI-generated insights and recommendations for financial calculations.
 * In a real application, this would interact with a machine learning model or API.
 */

/**
 * Generates investment insights based on compound interest parameters
 */
export const generateInvestmentInsights = (
  principal: number,
  rate: number,
  years: number,
  futureValue: number
): string[] => {
  const insights: string[] = [];
  
  // Risk assessment based on interest rate
  if (rate < 0.03) {
    insights.push("Your investment has a low-risk profile, which is good for capital preservation but may not outpace inflation.");
  } else if (rate < 0.07) {
    insights.push("Your investment has a moderate-risk profile, balancing growth potential with reasonable security.");
  } else {
    insights.push("Your investment has a high-risk profile. Consider diversifying to protect against market volatility.");
  }
  
  // Time horizon insights
  if (years < 5) {
    insights.push("Short investment horizons limit compounding benefits. Consider extending your time frame if possible.");
  } else if (years < 15) {
    insights.push("Your medium-term investment horizon allows for meaningful compound growth while maintaining flexibility.");
  } else {
    insights.push("Your long-term investment horizon maximizes compound interest benefits. Stay consistent with contributions.");
  }
  
  // Growth potential insights
  const growthMultiple = futureValue / principal;
  if (growthMultiple < 1.5) {
    insights.push(`Your money will grow ${(growthMultiple * 100 - 100).toFixed(1)}% over ${years} years. Consider increasing contributions or finding higher returns.`);
  } else if (growthMultiple < 3) {
    insights.push(`Your money will grow ${(growthMultiple * 100 - 100).toFixed(1)}% over ${years} years, a solid return on investment.`);
  } else {
    insights.push(`Your money will grow ${(growthMultiple * 100 - 100).toFixed(1)}% over ${years} years, an excellent return demonstrating the power of compound interest.`);
  }
  
  // Random additional insight (simulating AI variability)
  const randomInsights = [
    "Consider inflation when planning long-term investments. Historical inflation averages around 2-3% annually.",
    "Dollar-cost averaging (regular contributions) can help reduce risk and enhance returns over time.",
    "Tax-advantaged accounts like 401(k)s and IRAs can significantly boost your effective return rate.",
    "Rebalancing your portfolio annually can help maintain your target risk level and potentially improve returns.",
    "Emergency funds should typically cover 3-6 months of expenses before investing aggressively.",
    "Diversification across asset classes can help protect your portfolio during market downturns."
  ];
  
  insights.push(randomInsights[Math.floor(Math.random() * randomInsights.length)]);
  
  return insights;
};

/**
 * Generates personalized investment recommendations
 */
export const generateInvestmentRecommendations = (
  principal: number,
  rate: number,
  years: number,
  age?: number
): string[] => {
  const recommendations: string[] = [];
  
  // Basic recommendation based on initial investment
  if (principal < 1000) {
    recommendations.push("Consider building a larger initial investment to maximize compound growth potential.");
  } else if (principal < 10000) {
    recommendations.push("Your initial investment provides a good foundation. Regular contributions will accelerate growth.");
  } else {
    recommendations.push("Your substantial initial investment gives you a strong head start. Focus on maintaining an appropriate asset allocation.");
  }
  
  // Interest rate recommendations
  if (rate < 0.04) {
    recommendations.push("Explore other investment vehicles that might offer higher returns while matching your risk tolerance.");
  } else if (rate > 0.10) {
    recommendations.push("High expected returns often come with higher risk. Ensure you're comfortable with potential volatility.");
  }
  
  // Age-based recommendations
  if (age !== undefined) {
    if (age < 30) {
      recommendations.push("At your age, you can afford to take more risk for potential higher returns due to your long time horizon.");
    } else if (age < 50) {
      recommendations.push("Balance growth with increasing stability as you approach retirement age.");
    } else {
      recommendations.push("Focus on preserving capital while maintaining growth to combat inflation during retirement.");
    }
  }
  
  // Time-based recommendation
  if (years < 10) {
    recommendations.push("For short to medium time horizons, consider maintaining more liquidity and focusing on lower-volatility investments.");
  } else {
    recommendations.push("Your long investment horizon allows you to potentially benefit from higher-growth asset classes like equities.");
  }
  
  return recommendations;
};

/**
 * Analyzes investment performance compared to benchmarks
 */
export const analyzePerformanceAgainstBenchmarks = (
  rate: number,
  years: number
): { 
  stockMarket: string, 
  bonds: string,
  savingsAccounts: string,
  inflation: string
} => {
  // Average historical returns (simplified for demonstration)
  const stockMarketReturn = 0.10; // 10% annual return
  const bondReturn = 0.04; // 4% annual return
  const savingsReturn = 0.01; // 1% annual return
  const inflationRate = 0.025; // 2.5% annual inflation
  
  // Calculate compound growth for each benchmark over the given time period
  const stockGrowth = Math.pow(1 + stockMarketReturn, years);
  const bondGrowth = Math.pow(1 + bondReturn, years);
  const savingsGrowth = Math.pow(1 + savingsReturn, years);
  const inflationImpact = Math.pow(1 + inflationRate, years);
  
  // Calculate growth with given interest rate
  const investmentGrowth = Math.pow(1 + rate, years);
  
  // Compare performance
  return {
    stockMarket: comparePerformance(investmentGrowth, stockGrowth, "stock market average"),
    bonds: comparePerformance(investmentGrowth, bondGrowth, "bond market average"),
    savingsAccounts: comparePerformance(investmentGrowth, savingsGrowth, "typical savings accounts"),
    inflation: investmentGrowth > inflationImpact 
      ? `Your investment is projected to outpace inflation, maintaining purchasing power.` 
      : `Your investment may not keep pace with inflation, potentially reducing purchasing power over time.`
  };
};

// Helper function to generate performance comparisons
const comparePerformance = (investmentGrowth: number, benchmarkGrowth: number, benchmarkName: string): string => {
  const percentageDifference = ((investmentGrowth - benchmarkGrowth) / benchmarkGrowth * 100).toFixed(1);
  
  if (investmentGrowth > benchmarkGrowth) {
    return `Your investment is projected to outperform the ${benchmarkName} by approximately ${percentageDifference}%.`;
  } else if (investmentGrowth < benchmarkGrowth) {
    return `Your investment is projected to underperform the ${benchmarkName} by approximately ${Math.abs(parseFloat(percentageDifference))}%.`;
  } else {
    return `Your investment is projected to perform similarly to the ${benchmarkName}.`;
  }
}; 