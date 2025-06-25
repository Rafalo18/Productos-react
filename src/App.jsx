import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import ProductList from './Components/ProductList';
import ProductForm from './Components/ProductForm';
import { useState } from 'react';



function App() {
  const [user, setUser] = useState(null);

  if (!user) return <Login setUser={setUser} />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/add" element={<ProductForm />} />
        <Route path="/edit/:id" element={<ProductForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


