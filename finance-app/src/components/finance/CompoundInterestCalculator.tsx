import { useState, useEffect } from 'react';
import { calculateCompoundInterest, generateCompoundInterestTimeline } from '../../lib/finance/compoundInterest';
import { generateInvestmentInsights, analyzePerformanceAgainstBenchmarks } from '../../lib/ai/financeAi';
import './CompoundInterestCalculator.css';

interface CompoundInterestCalculatorProps {
  initialPrincipal?: number;
  initialRate?: number;
  initialYears?: number;
  initialCompoundingFrequency?: number;
  initialContribution?: number;
  initialContributionFrequency?: number;
  showAdvancedOptions?: boolean;
  className?: string;
}

/**
 * CompoundInterestCalculator - A React component that projects how an investment grows over time with reinvested interest
 */
const CompoundInterestCalculator: React.FC<CompoundInterestCalculatorProps> = ({
  initialPrincipal = 1000,
  initialRate = 0.05,
  initialYears = 10,
  initialCompoundingFrequency = 1,
  initialContribution = 0,
  initialContributionFrequency = 12,
  showAdvancedOptions = false,
  className = '',
}) => {
  // State for form inputs
  const [principal, setPrincipal] = useState<number>(initialPrincipal);
  const [rate, setRate] = useState<number>(initialRate);
  const [years, setYears] = useState<number>(initialYears);
  const [compoundingFrequency, setCompoundingFrequency] = useState<number>(initialCompoundingFrequency);
  const [contribution, setContribution] = useState<number>(initialContribution);
  const [contributionFrequency, setContributionFrequency] = useState<number>(initialContributionFrequency);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(showAdvancedOptions);
  
  // State for results
  const [futureValue, setFutureValue] = useState<number>(0);
  const [timeline, setTimeline] = useState<Array<{
    year: number;
    balance: number;
    interest: number;
    contributions: number;
  }>>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Add state for AI insights
  const [insights, setInsights] = useState<string[]>([]);
  const [benchmarks, setBenchmarks] = useState<{
    stockMarket: string;
    bonds: string;
    savingsAccounts: string;
    inflation: string;
  } | null>(null);
  const [showInsights, setShowInsights] = useState<boolean>(false);

  // Calculate results whenever inputs change
  useEffect(() => {
    try {
      // Calculate future value
      const calculatedFutureValue = calculateCompoundInterest(
        principal,
        rate,
        years,
        compoundingFrequency,
        contribution,
        contributionFrequency
      );
      setFutureValue(calculatedFutureValue);
      
      // Generate timeline
      const calculatedTimeline = generateCompoundInterestTimeline(
        principal,
        rate,
        years,
        compoundingFrequency,
        contribution,
        contributionFrequency
      );
      setTimeline(calculatedTimeline);
      
      // Clear any errors
      setIsError(false);
      setErrorMessage('');
    } catch (error) {
      setIsError(true);
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred during calculation');
    }
  }, [principal, rate, years, compoundingFrequency, contribution, contributionFrequency]);

  // New useEffect for AI insights
  useEffect(() => {
    if (!isError && futureValue > 0) {
      // Generate AI insights
      const aiInsights = generateInvestmentInsights(principal, rate, years, futureValue);
      setInsights(aiInsights);

      // Generate benchmarks comparison
      const benchmarkComparisons = analyzePerformanceAgainstBenchmarks(rate, years);
      setBenchmarks(benchmarkComparisons);
    }
  }, [principal, rate, years, futureValue, isError]);

  // Format currency values
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  // Handle form input changes
  const handlePrincipalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setPrincipal(isNaN(value) ? 0 : value);
  };

  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) / 100;
    setRate(isNaN(value) ? 0 : value);
  };

  const handleYearsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setYears(isNaN(value) ? 0 : value);
  };

  const handleContributionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setContribution(isNaN(value) ? 0 : value);
  };

  const handleCompoundingFrequencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCompoundingFrequency(parseInt(e.target.value));
  };

  const handleContributionFrequencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setContributionFrequency(parseInt(e.target.value));
  };

  const toggleAdvancedOptions = () => {
    setShowAdvanced(!showAdvanced);
  };

  const toggleInsights = () => {
    setShowInsights(!showInsights);
  };

  return (
    <div className={`compound-interest-calculator ${className}`} data-testid="compound-interest-calculator">
      <h2>Compound Interest Calculator</h2>
      <p>Project how your investment will grow over time with compound interest.</p>
      
      {isError && (
        <div className="error-message" role="alert">
          {errorMessage}
        </div>
      )}
      
      <div className="calculator-form">
        <div className="form-group">
          <label htmlFor="principal">Initial Investment ($)</label>
          <input
            id="principal"
            type="number"
            min="0"
            step="100"
            value={principal}
            onChange={handlePrincipalChange}
            data-testid="principal-input"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="rate">Annual Interest Rate (%)</label>
          <input
            id="rate"
            type="number"
            min="0"
            step="0.1"
            value={(rate * 100).toFixed(2)}
            onChange={handleRateChange}
            data-testid="rate-input"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="years">Time Period (years)</label>
          <input
            id="years"
            type="number"
            min="1"
            step="1"
            value={years}
            onChange={handleYearsChange}
            data-testid="years-input"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="contribution">Regular Contribution ($)</label>
          <input
            id="contribution"
            type="number"
            min="0"
            step="10"
            value={contribution}
            onChange={handleContributionChange}
            data-testid="contribution-input"
          />
        </div>
        
        <button 
          type="button" 
          className="toggle-advanced-btn"
          onClick={toggleAdvancedOptions}
          data-testid="toggle-advanced-btn"
        >
          {showAdvanced ? 'Hide Advanced Options' : 'Show Advanced Options'}
        </button>
        
        {showAdvanced && (
          <div className="advanced-options">
            <div className="form-group">
              <label htmlFor="compounding-frequency">Compounding Frequency</label>
              <select
                id="compounding-frequency"
                value={compoundingFrequency}
                onChange={handleCompoundingFrequencyChange}
                data-testid="compounding-frequency-select"
              >
                <option value="1">Annually</option>
                <option value="2">Semi-Annually</option>
                <option value="4">Quarterly</option>
                <option value="12">Monthly</option>
                <option value="26">Bi-Weekly</option>
                <option value="52">Weekly</option>
                <option value="365">Daily</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="contribution-frequency">Contribution Frequency</label>
              <select
                id="contribution-frequency"
                value={contributionFrequency}
                onChange={handleContributionFrequencyChange}
                data-testid="contribution-frequency-select"
              >
                <option value="1">Annually</option>
                <option value="2">Semi-Annually</option>
                <option value="4">Quarterly</option>
                <option value="12">Monthly</option>
                <option value="26">Bi-Weekly</option>
                <option value="52">Weekly</option>
              </select>
            </div>
          </div>
        )}
      </div>
      
      <div className="calculator-results">
        <h3>Results</h3>
        <div className="result-overview">
          <div className="result-item">
            <span className="result-label">Future Value:</span>
            <span className="result-value" data-testid="future-value">
              {formatCurrency(futureValue)}
            </span>
          </div>
          <div className="result-item">
            <span className="result-label">Total Contributions:</span>
            <span className="result-value" data-testid="total-contributions">
              {timeline.length > 0 ? formatCurrency(timeline[timeline.length - 1].contributions) : formatCurrency(0)}
            </span>
          </div>
          <div className="result-item">
            <span className="result-label">Total Interest Earned:</span>
            <span className="result-value" data-testid="total-interest">
              {formatCurrency(futureValue - (timeline.length > 0 ? timeline[timeline.length - 1].contributions : 0))}
            </span>
          </div>
        </div>
        
        {!isError && futureValue > 0 && (
          <button 
            type="button" 
            className="toggle-insights-btn"
            onClick={toggleInsights}
            data-testid="toggle-insights-btn"
          >
            {showInsights ? 'Hide AI Insights' : 'Show AI Insights'}
          </button>
        )}
        
        {showInsights && !isError && futureValue > 0 && (
          <div className="ai-insights" data-testid="ai-insights">
            <h4>AI Investment Insights</h4>
            <ul className="insights-list">
              {insights.map((insight, index) => (
                <li key={index} className="insight-item">{insight}</li>
              ))}
            </ul>
            
            {benchmarks && (
              <div className="benchmark-comparisons">
                <h5>Performance Benchmarks</h5>
                <div className="benchmark-item">
                  <span className="benchmark-label">Stock Market:</span>
                  <span className="benchmark-value">{benchmarks.stockMarket}</span>
                </div>
                <div className="benchmark-item">
                  <span className="benchmark-label">Bonds:</span>
                  <span className="benchmark-value">{benchmarks.bonds}</span>
                </div>
                <div className="benchmark-item">
                  <span className="benchmark-label">Savings Accounts:</span>
                  <span className="benchmark-value">{benchmarks.savingsAccounts}</span>
                </div>
                <div className="benchmark-item">
                  <span className="benchmark-label">Inflation:</span>
                  <span className="benchmark-value">{benchmarks.inflation}</span>
                </div>
              </div>
            )}
          </div>
        )}
        
        {timeline.length > 0 && (
          <div className="timeline-table-container">
            <h4>Year-by-Year Growth</h4>
            <table className="timeline-table">
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Balance</th>
                  <th>Interest Earned</th>
                  <th>Total Contributions</th>
                </tr>
              </thead>
              <tbody>
                {timeline.map((entry) => (
                  <tr key={entry.year} data-testid={`year-${entry.year}`}>
                    <td>{entry.year}</td>
                    <td>{formatCurrency(entry.balance)}</td>
                    <td>{formatCurrency(entry.interest)}</td>
                    <td>{formatCurrency(entry.contributions)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompoundInterestCalculator; 