import './App.css'
import CompoundInterestCalculator from './components/finance/CompoundInterestCalculator'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Finance AI App</h1>
        <p>Smart financial calculators powered by AI</p>
      </header>
      <main className="app-main">
        <CompoundInterestCalculator />
      </main>
      <footer className="app-footer">
        <p>© 2023 Finance AI App - All rights reserved</p>
      </footer>
    </div>
  )
}

export default App
