import { describe, it, expect } from 'vitest';
import { 
  generateInvestmentInsights, 
  generateInvestmentRecommendations,
  analyzePerformanceAgainstBenchmarks
} from './financeAi';

describe('Finance AI Service', () => {
  describe('generateInvestmentInsights', () => {
    it('should generate insights based on parameters', () => {
      const insights = generateInvestmentInsights(1000, 0.05, 10, 1628.89);
      
      // Should return an array of strings
      expect(Array.isArray(insights)).toBe(true);
      expect(insights.length).toBeGreaterThan(0);
      expect(typeof insights[0]).toBe('string');
      
      // Should include risk assessment
      expect(insights.some(insight => insight.includes('moderate-risk profile'))).toBe(true);
      
      // Should include time horizon insight
      expect(insights.some(insight => insight.includes('medium-term investment horizon'))).toBe(true);
      
      // Should include growth insight
      expect(insights.some(insight => insight.includes('grow'))).toBe(true);
    });
    
    it('should provide different insights for low-risk investments', () => {
      const insights = generateInvestmentInsights(1000, 0.02, 3, 1061.21);
      expect(insights.some(insight => insight.includes('low-risk profile'))).toBe(true);
    });
    
    it('should provide different insights for high-risk investments', () => {
      const insights = generateInvestmentInsights(1000, 0.10, 20, 6727.50);
      expect(insights.some(insight => insight.includes('high-risk profile'))).toBe(true);
    });
  });
  
  describe('generateInvestmentRecommendations', () => {
    it('should generate recommendations based on parameters', () => {
      const recommendations = generateInvestmentRecommendations(5000, 0.05, 10);
      
      // Should return an array of strings
      expect(Array.isArray(recommendations)).toBe(true);
      expect(recommendations.length).toBeGreaterThan(0);
      expect(typeof recommendations[0]).toBe('string');
    });
    
    it('should provide different recommendations based on principal amount', () => {
      const smallPrincipalRecs = generateInvestmentRecommendations(500, 0.05, 10);
      const largePrincipalRecs = generateInvestmentRecommendations(15000, 0.05, 10);
      
      expect(smallPrincipalRecs[0]).not.toEqual(largePrincipalRecs[0]);
      expect(smallPrincipalRecs.some(rec => rec.includes('larger initial investment'))).toBe(true);
      expect(largePrincipalRecs.some(rec => rec.includes('substantial initial investment'))).toBe(true);
    });
    
    it('should include age-specific recommendations when age is provided', () => {
      const youngInvestorRecs = generateInvestmentRecommendations(5000, 0.05, 10, 25);
      const olderInvestorRecs = generateInvestmentRecommendations(5000, 0.05, 10, 55);
      
      expect(youngInvestorRecs.some(rec => rec.includes('your age'))).toBe(true);
      expect(olderInvestorRecs.some(rec => rec.includes('preserving capital'))).toBe(true);
    });
  });
  
  describe('analyzePerformanceAgainstBenchmarks', () => {
    it('should provide benchmark comparisons', () => {
      const benchmarks = analyzePerformanceAgainstBenchmarks(0.05, 10);
      
      // Should return an object with all benchmark comparisons
      expect(benchmarks).toHaveProperty('stockMarket');
      expect(benchmarks).toHaveProperty('bonds');
      expect(benchmarks).toHaveProperty('savingsAccounts');
      expect(benchmarks).toHaveProperty('inflation');
      
      // All values should be strings
      expect(typeof benchmarks.stockMarket).toBe('string');
      expect(typeof benchmarks.bonds).toBe('string');
      expect(typeof benchmarks.savingsAccounts).toBe('string');
      expect(typeof benchmarks.inflation).toBe('string');
    });
    
    it('should correctly identify underperformance vs stock market', () => {
      const benchmarks = analyzePerformanceAgainstBenchmarks(0.05, 10);
      expect(benchmarks.stockMarket).toContain('underperform');
    });
    
    it('should correctly identify outperformance vs savings accounts', () => {
      const benchmarks = analyzePerformanceAgainstBenchmarks(0.05, 10);
      expect(benchmarks.savingsAccounts).toContain('outperform');
    });
    
    it('should correctly assess inflation impact', () => {
      const benchmarks = analyzePerformanceAgainstBenchmarks(0.05, 10);
      expect(benchmarks.inflation).toContain('outpace inflation');
      
      const lowReturnBenchmarks = analyzePerformanceAgainstBenchmarks(0.01, 10);
      expect(lowReturnBenchmarks.inflation).toContain('not keep pace with inflation');
    });
  });
}); 