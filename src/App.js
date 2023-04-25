import './App.css';
import { Company } from './components/Company';
import { GenreMovies } from './components/GenreMovies';
import { Movies } from './components/Movies';
import { Products } from './components/Products';
import { ProductsSorted } from './components/ProductsSorted';
import { Quote } from './components/Quote';
import { User } from './components/User';
import { Weather } from './components/Weather';

function App() {
  return (
    <div className="App">
      <h1>ReactJS Practise Set Seven</h1>
      <Weather />
      <User />
      <Movies />
      <Company />
      <Quote />
      <GenreMovies />
      <Products />
      <ProductsSorted />
    </div>
  );
}

export default App;
