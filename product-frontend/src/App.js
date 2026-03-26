import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://127.0.0.1:8000";

function App() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    quantity: ""
  });

  // Fetch products
  const fetchProducts = async () => {
    const res = await axios.get(`${API}/products`);
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add product
  const addProduct = async () => {
    await axios.post(`${API}/products`, {
      ...form,
      id: Number(form.id),
      price: Number(form.price),
      quantity: Number(form.quantity)
    });
    fetchProducts();
  };

  // Delete product
  const deleteProduct = async (id) => {
    await axios.delete(`${API}/products/${id}`);
    fetchProducts();
  };

  // Update product
  const updateProduct = async () => {
    await axios.put(`${API}/products/${form.id}`, {
      ...form,
      id: Number(form.id),
      price: Number(form.price),
      quantity: Number(form.quantity)
    });
    fetchProducts();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Product Manager</h1>

      <h2>Add / Update Product</h2>
      <input name="id" placeholder="ID" onChange={handleChange} />
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="description" placeholder="Description" onChange={handleChange} />
      <input name="price" placeholder="Price" onChange={handleChange} />
      <input name="quantity" placeholder="Quantity" onChange={handleChange} />

      <br /><br />
      <button onClick={addProduct}>Add</button>
      <button onClick={updateProduct}>Update</button>

      <h2>Product List</h2>
      {products.map((p) => (
        <div key={p.id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
          <p><b>ID:</b> {p.id}</p>
          <p><b>Name:</b> {p.name}</p>
          <p><b>Description:</b> {p.description}</p>
          <p><b>Price:</b> {p.price}</p>
          <p><b>Quantity:</b> {p.quantity}</p>
          <button onClick={() => deleteProduct(p.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;