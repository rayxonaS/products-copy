import ProductList from "./components/ProductList";
import YourCart from "./components/YourCart";
import { useFetch } from "./hooks/useFetch";

function App() {
  const {
    data: desserts,
    isPending,
    error,
  } = useFetch("http://localhost:3000/desserts");
  return (
    <div className="container grid-container">
      <ProductList desserts={desserts} isPending={isPending} />
      <YourCart />
    </div>
  );
}

export default App;
