import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [product, setProduct] = useState({ title: '', price: '' });

  useEffect(() => {
    if (isEdit) {
      fetch(`https://dummyjson.com/products/${id}`)
        .then(res => {
          if (!res.ok) throw new Error('Error al cargar producto');
          return res.json();
        })
        .then(data => setProduct(data))
        .catch(error => {
          alert('Error al cargar producto');
          console.error(error);
        });
    }
  }, [id]);

  const handleSubmit = async () => {
    const url = isEdit
      ? `https://dummyjson.com/products/${id}`
      : 'https://dummyjson.com/products/add';

    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

    
      const data = await res.json();
      alert(isEdit ? 'Producto actualizado' : 'Producto agregado');
      console.log(data);
      navigate('/');
    } catch (error) {
      alert('Error al guardar producto');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>{isEdit ? 'Editar' : 'Agregar'} producto</h2>
      <input
        type="text"
        value={product.title}
        onChange={e => setProduct({ ...product, title: e.target.value })}
        placeholder="Título"
      />
      <input
        type="number"
        value={product.price}
        onChange={e => setProduct({ ...product, price: Number(e.target.value) })}
        placeholder="Precio"
      />
      <button onClick={handleSubmit}>Guardar</button>
    </div>
  );
}

export default ProductForm;
