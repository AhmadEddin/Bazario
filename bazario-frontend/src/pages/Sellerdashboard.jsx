import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/SellerDashboard.css";

export default function SellerDashboard() {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    imageFile: null,
  });
  const [message, setMessage] = useState("");
  const [products, setProducts] = useState([]);

  const token = localStorage.getItem("token");
  const backend = "http://localhost:5000";
  
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${backend}/products`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", product.title);
    formData.append("price", product.price);
    formData.append("description", product.description);
    if (product.imageFile) formData.append("image", product.imageFile);

    try {
      const res = await fetch(`${backend}/products`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed");
      setMessage("Product added successfully!");
      setProduct({ title: "", price: "", description: "", imageFile: null });
      fetchProducts();
    } catch (err) {
      console.error(err);
      setMessage(err.message);
    }
  };

  return (
    <div className="seller-dashboard">
      <div className="dashboard-header">
        <h2>Seller Dashboard</h2>
        <Link to="/seller/analytics" className="analytics-link">
          View Analytics
        </Link>
      </div>

      <form className="product-form" onSubmit={handleAddProduct}>
        <h3>Add New Product</h3>
        <input
          type="text"
          placeholder="Product Name"
          value={product.title}
          onChange={(e) => setProduct({ ...product, title: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={product.description}
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
          required
        ></textarea>
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setProduct({ ...product, imageFile: e.target.files[0] })
          }
        />
        <button type="submit">Add Product</button>
      </form>

      {message && <p className="message">{message}</p>}

      <h3>Your Products</h3>
      <div className="products-list">
        {products.map((p) => (
          <div key={p._id} className="product-card">
            <img
              src={p.imageUrl ? backend + p.imageUrl : `https://picsum.photos/seed/${p._id}/400/400`}
              alt={p.name}
            />
            <h4>{p.name}</h4>
            <p>{p.price} krones</p>
            <p>{p.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}