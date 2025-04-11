import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CompoundInterestCalculator from './CompoundInterestCalculator';
import * as calculations from '../../lib/finance/compoundInterest';
import * as aiService from '../../lib/ai/financeAi';

// Mock the compound interest calculation functions
vi.mock('../../lib/finance/compoundInterest', () => ({
  calculateCompoundInterest: vi.fn(),
  generateCompoundInterestTimeline: vi.fn(),
}));

// Mock the AI service functions
vi.mock('../../lib/ai/financeAi', () => ({
  generateInvestmentInsights: vi.fn(),
  analyzePerformanceAgainstBenchmarks: vi.fn(),
}));

describe('CompoundInterestCalculator', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    
    // Setup default mock returns for calculations
    const mockCalculateCompoundInterest = calculations.calculateCompoundInterest as vi.Mock;
    mockCalculateCompoundInterest.mockReturnValue(1500);
    
    const mockGenerateCompoundInterestTimeline = calculations.generateCompoundInterestTimeline as vi.Mock;
    mockGenerateCompoundInterestTimeline.mockReturnValue([
      { year: 1, balance: 1050, interest: 50, contributions: 1000 },
      { year: 2, balance: 1102.5, interest: 52.5, contributions: 1000 },
    ]);
    
    // Setup default mock returns for AI service
    const mockGenerateInsights = aiService.generateInvestmentInsights as vi.Mock;
    mockGenerateInsights.mockReturnValue([
      "Your investment has a moderate-risk profile.",
      "Your medium-term investment horizon allows for meaningful growth."
    ]);
    
    const mockAnalyzeBenchmarks = aiService.analyzePerformanceAgainstBenchmarks as vi.Mock;
    mockAnalyzeBenchmarks.mockReturnValue({
      stockMarket: "Your investment is projected to underperform the stock market.",
      bonds: "Your investment is projected to outperform bonds.",
      savingsAccounts: "Your investment is projected to outperform savings accounts.",
      inflation: "Your investment is projected to outpace inflation."
    });
  });

  it('renders the calculator correctly', () => {
    render(<CompoundInterestCalculator />);
    
    // Check if main elements are present
    expect(screen.getByTestId('compound-interest-calculator')).toBeInTheDocument();
    expect(screen.getByText('Compound Interest Calculator')).toBeInTheDocument();
    expect(screen.getByLabelText('Initial Investment ($)')).toBeInTheDocument();
    expect(screen.getByLabelText('Annual Interest Rate (%)')).toBeInTheDocument();
    expect(screen.getByLabelText('Time Period (years)')).toBeInTheDocument();
    expect(screen.getByLabelText('Regular Contribution ($)')).toBeInTheDocument();
    expect(screen.getByText('Show Advanced Options')).toBeInTheDocument();
    expect(screen.getByTestId('future-value')).toBeInTheDocument();
  });

  it('sets initial values correctly', () => {
    render(
      <CompoundInterestCalculator
        initialPrincipal={2000}
        initialRate={0.07}
        initialYears={15}
        initialContribution={200}
        showAdvancedOptions={true}
      />
    );
    
    expect(screen.getByTestId('principal-input')).toHaveValue(2000);
    expect(screen.getByTestId('rate-input')).toHaveValue(7);
    expect(screen.getByTestId('years-input')).toHaveValue(15);
    expect(screen.getByTestId('contribution-input')).toHaveValue(200);
    expect(screen.getByTestId('compounding-frequency-select')).toBeInTheDocument();
    expect(screen.getByTestId('contribution-frequency-select')).toBeInTheDocument();
  });

  it('toggles advanced options when clicked', async () => {
    const user = userEvent.setup();
    render(<CompoundInterestCalculator />);
    
    // Advanced options should be hidden by default
    expect(screen.queryByTestId('compounding-frequency-select')).not.toBeInTheDocument();
    
    // Click the toggle button
    await user.click(screen.getByText('Show Advanced Options'));
    
    // Advanced options should now be visible
    expect(screen.getByTestId('compounding-frequency-select')).toBeInTheDocument();
    expect(screen.getByTestId('contribution-frequency-select')).toBeInTheDocument();
    
    // Click the toggle button again
    await user.click(screen.getByText('Hide Advanced Options'));
    
    // Advanced options should be hidden again
    expect(screen.queryByTestId('compounding-frequency-select')).not.toBeInTheDocument();
  });

  it('calls calculation functions when inputs change', async () => {
    const user = userEvent.setup();
    render(<CompoundInterestCalculator />);
    
    // Change principal value
    const principalInput = screen.getByTestId('principal-input');
    await user.clear(principalInput);
    await user.type(principalInput, '2000');
    
    // Check if calculation functions were called with updated values
    await waitFor(() => {
      expect(calculations.calculateCompoundInterest).toHaveBeenCalledWith(
        2000, // new principal
        0.05, // default rate
        10,   // default years
        1,    // default compounding frequency
        0,    // default contribution
        12    // default contribution frequency
      );
    });
    
    // Change rate value
    const rateInput = screen.getByTestId('rate-input');
    await user.clear(rateInput);
    await user.type(rateInput, '7');
    
    // Check if calculation functions were called with updated values
    await waitFor(() => {
      expect(calculations.calculateCompoundInterest).toHaveBeenCalledWith(
        2000, // updated principal
        0.07, // new rate (7%)
        10,   // default years
        1,    // default compounding frequency
        0,    // default contribution
        12    // default contribution frequency
      );
    });
  });

  it('displays calculation results correctly', () => {
    render(<CompoundInterestCalculator />);
    
    // Check the displayed results using the mocked values
    expect(screen.getByTestId('future-value').textContent).toBe('$1,500.00');
    expect(screen.getByTestId('total-contributions').textContent).toBe('$1,000.00');
    expect(screen.getByTestId('total-interest').textContent).toBe('$500.00');
    
    // Check if the yearly data is displayed
    expect(screen.getByText('Year-by-Year Growth')).toBeInTheDocument();
    expect(screen.getByTestId('year-1')).toBeInTheDocument();
    expect(screen.getByTestId('year-2')).toBeInTheDocument();
  });

  it('displays error message when calculation throws an error', async () => {
    // Mock calculation function to throw an error
    const mockCalculateCompoundInterest = calculations.calculateCompoundInterest as vi.Mock;
    mockCalculateCompoundInterest.mockImplementation(() => {
      throw new Error('Invalid input values');
    });
    
    render(<CompoundInterestCalculator />);
    
    // Check if error message is displayed
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByRole('alert').textContent).toBe('Invalid input values');
  });

  it('toggles AI insights when clicked', async () => {
    const user = userEvent.setup();
    render(<CompoundInterestCalculator />);
    
    // AI insights should be hidden by default
    expect(screen.queryByTestId('ai-insights')).not.toBeInTheDocument();
    
    // Click the toggle button
    await user.click(screen.getByTestId('toggle-insights-btn'));
    
    // AI insights should now be visible
    expect(screen.getByTestId('ai-insights')).toBeInTheDocument();
    expect(screen.getByText('AI Investment Insights')).toBeInTheDocument();
    
    // Click the toggle button again
    await user.click(screen.getByText('Hide AI Insights'));
    
    // AI insights should be hidden again
    expect(screen.queryByTestId('ai-insights')).not.toBeInTheDocument();
  });

  it('displays AI insights and benchmarks correctly', async () => {
    const user = userEvent.setup();
    render(<CompoundInterestCalculator />);
    
    // Show AI insights
    await user.click(screen.getByTestId('toggle-insights-btn'));
    
    // Check if AI insights are displayed
    expect(screen.getByText('Your investment has a moderate-risk profile.')).toBeInTheDocument();
    expect(screen.getByText('Your medium-term investment horizon allows for meaningful growth.')).toBeInTheDocument();
    
    // Check if benchmarks are displayed
    expect(screen.getByText('Stock Market:')).toBeInTheDocument();
    expect(screen.getByText('Your investment is projected to underperform the stock market.')).toBeInTheDocument();
    expect(screen.getByText('Your investment is projected to outperform bonds.')).toBeInTheDocument();
    expect(screen.getByText('Your investment is projected to outperform savings accounts.')).toBeInTheDocument();
    expect(screen.getByText('Your investment is projected to outpace inflation.')).toBeInTheDocument();
  });

  it('calls AI service functions with correct parameters', async () => {
    render(<CompoundInterestCalculator />);
    
    // Verify that the AI service functions were called with the correct parameters
    expect(aiService.generateInvestmentInsights).toHaveBeenCalledWith(
      1000, // default principal
      0.05, // default rate
      10,   // default years
      1500  // mocked future value
    );
    
    expect(aiService.analyzePerformanceAgainstBenchmarks).toHaveBeenCalledWith(
      0.05, // default rate
      10    // default years
    );
  });

  it('updates AI insights when input values change', async () => {
    const user = userEvent.setup();
    render(<CompoundInterestCalculator />);
    
    // Change principal value
    const principalInput = screen.getByTestId('principal-input');
    await user.clear(principalInput);
    await user.type(principalInput, '2000');
    
    // Verify that AI services were called with updated values
    await waitFor(() => {
      expect(aiService.generateInvestmentInsights).toHaveBeenCalledWith(
        2000, // updated principal
        0.05, // default rate
        10,   // default years
        1500  // mocked future value
      );
    });
  });
}); 