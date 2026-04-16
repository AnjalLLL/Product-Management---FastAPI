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
    try {
      const res = await axios.get(`${API}/products`);
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Failed to load products. Make sure the backend API is running on http://127.0.0.1:8000");
    }
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
    try {
      await axios.post(`${API}/products`, {
        ...form,
        id: Number(form.id),
        price: Number(form.price),
        quantity: Number(form.quantity)
      });
      setForm({ id: "", name: "", description: "", price: "", quantity: "" });
      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product");
    }
  };

  // Delete product
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API}/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product");
    }
  };

  // Update product
  const updateProduct = async () => {
    try {
      await axios.put(`${API}/products/${form.id}`, {
        ...form,
        id: Number(form.id),
        price: Number(form.price),
        quantity: Number(form.quantity)
      });
      setForm({ id: "", name: "", description: "", price: "", quantity: "" });
      fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product");
    }
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