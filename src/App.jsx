
import './App.css';
import Header from './components/header/header';
import Ingredients from './components/ingredients/ingredients';
import Constructor from './components/constructor/constructor';


function App() {
  return (
    <div className="App">
        <Header />
        <div className="constructor-wrap">
          <Ingredients />
          <Constructor />
        </div>
    </div>
  );
}

export default App;
