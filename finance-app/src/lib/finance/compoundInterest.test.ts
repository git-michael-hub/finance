import { describe, it, expect } from 'vitest';
import { 
  calculateCompoundInterest, 
  generateCompoundInterestTimeline,
  calculateRequiredRate
} from './compoundInterest';

describe('Compound Interest Calculations', () => {
  describe('calculateCompoundInterest', () => {
    it('calculates simple annual compound interest correctly', () => {
      // $1000 invested at 5% annually for 5 years
      const result = calculateCompoundInterest(1000, 0.05, 5);
      expect(result).toEqual(1276.28);
    });

    it('calculates monthly compound interest correctly', () => {
      // $1000 invested at 5% annually, compounded monthly for 5 years
      const result = calculateCompoundInterest(1000, 0.05, 5, 12);
      expect(result).toEqual(1283.36);
    });

    it('calculates compound interest with monthly contributions correctly', () => {
      // $1000 invested at 5% annually with $100 monthly contributions for 5 years
      const result = calculateCompoundInterest(1000, 0.05, 5, 12, 100, 12);
      expect(result).toBeCloseTo(8112.3, 0);
    });

    it('throws error for negative inputs', () => {
      expect(() => calculateCompoundInterest(-1000, 0.05, 5)).toThrow();
      expect(() => calculateCompoundInterest(1000, -0.05, 5)).toThrow();
      expect(() => calculateCompoundInterest(1000, 0.05, -5)).toThrow();
    });

    it('throws error for invalid compounding frequency', () => {
      expect(() => calculateCompoundInterest(1000, 0.05, 5, 0)).toThrow();
      expect(() => calculateCompoundInterest(1000, 0.05, 5, 12, 100, 0)).toThrow();
    });
  });

  describe('generateCompoundInterestTimeline', () => {
    it('generates correct timeline for simple compound interest', () => {
      // $1000 invested at 5% annually for 3 years
      const timeline = generateCompoundInterestTimeline(1000, 0.05, 3);
      
      expect(timeline.length).toBe(3);
      expect(timeline[0].year).toBe(1);
      expect(timeline[0].balance).toEqual(1050.00);
      expect(timeline[0].interest).toEqual(50.00);
      
      expect(timeline[2].year).toBe(3);
      expect(timeline[2].balance).toEqual(1157.63);
    });

    it('generates correct timeline with contributions', () => {
      // $1000 invested at 5% annually with $100 monthly contributions for 2 years
      const timeline = generateCompoundInterestTimeline(1000, 0.05, 2, 12, 100, 12);
      
      expect(timeline.length).toBe(2);
      expect(timeline[0].year).toBe(1);
      expect(timeline[0].contributions).toBeCloseTo(2200, 0); // Initial $1000 + 12 months of $100
      expect(timeline[1].year).toBe(2);
      expect(timeline[1].balance).toBeCloseTo(3623.53, 0);
    });

    it('throws error for invalid inputs', () => {
      expect(() => generateCompoundInterestTimeline(-1000, 0.05, 5)).toThrow();
    });
  });

  describe('calculateRequiredRate', () => {
    it('calculates the required interest rate correctly', () => {
      // To grow $1000 to $1500 in 5 years
      const rate = calculateRequiredRate(1000, 1500, 5);
      expect(rate).toBeCloseTo(0.0845, 3); // Approximately 8.45%
    });

    it('calculates the required rate with monthly compounding', () => {
      // To grow $1000 to $1500 in 5 years with monthly compounding
      const rate = calculateRequiredRate(1000, 1500, 5, 12);
      expect(rate).toBeCloseTo(0.0817, 3); // Approximately 8.17%
    });

    it('throws error for invalid inputs', () => {
      expect(() => calculateRequiredRate(-1000, 1500, 5)).toThrow();
      expect(() => calculateRequiredRate(1000, 500, 5)).toThrow(); // Target less than principal
      expect(() => calculateRequiredRate(1000, 1500, 0)).toThrow();
    });
  });
}); 