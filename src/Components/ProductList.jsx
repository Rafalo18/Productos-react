import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => {
        if (!res.ok) throw new Error('Error al obtener productos');
        return res.json();
      })
      .then(data => {
        setProducts(data.products);
        console.log(data.products); // solo para verificar
      })
      .catch(error => {
        alert('Error al cargar productos');
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h2>Productos</h2>
      <Link to="/add">Agregar nuevo</Link>
      <ul>
        {products.map(p => (
          <li key={p.id}>
            {p.title} - ${p.price}
            <Link to={`/edit/${p.id}`}> Editar</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
