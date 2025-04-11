# Finance AI App

A modern finance application with AI-powered insights built with React and TypeScript.

## Features

- **Compound Interest Calculator**: Project how your investment will grow over time with compound interest
- **AI Investment Insights**: Get smart insights about your investments
- **Performance Benchmarks**: Compare your projected returns against market benchmarks
- **Responsive Design**: Works on desktop and mobile devices

## Components

The application includes the following finance library components:

- `CompoundInterestCalculator`: A React component that helps users visualize compound interest growth
- Core calculation library for accurate financial calculations
- AI service that provides investment insights and recommendations

## Technologies Used

- React 18
- TypeScript
- Vite
- Vitest for testing
- CSS for styling
- React Testing Library for component testing

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm 8.x or later

### Installation

1. Clone the repository
2. Install dependencies:

```bash
cd finance-app
npm install
```

3. Start the development server:

```bash
npm run dev
```

The application will be available at http://localhost:5173

## Running Tests

Run the tests with:

```bash
npm test
```

## Building for Production

Build the application for production:

```bash
npm run build
```

## Project Structure

```
finance-app/
├── src/
│   ├── components/
│   │   └── finance/           # Finance UI components 
│   │       ├── CompoundInterestCalculator.tsx
│   │       ├── CompoundInterestCalculator.css
│   │       └── CompoundInterestCalculator.test.tsx
│   ├── lib/
│   │   ├── finance/           # Core finance calculation libraries
│   │   │   ├── compoundInterest.ts
│   │   │   └── compoundInterest.test.ts
│   │   └── ai/                # AI service for financial insights
│   │       ├── financeAi.ts
│   │       └── financeAi.test.ts
│   ├── App.tsx                # Main application component
│   ├── App.css                # Application styles
│   ├── main.tsx               # Application entry point
│   └── index.css              # Global styles
├── public/                    # Static assets
└── ...                        # Configuration files
```

## Future Enhancements

- Additional financial calculators (mortgage, loan, retirement)
- Interactive charts for better data visualization
- User accounts for saving calculations
- More advanced AI recommendations

## License

MIT
