import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/products.css";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const navigate = useNavigate();
  const backend = "http://localhost:5000";
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/products");
      const data = await res.json();
      const arr = Array.isArray(data) ? data : [];
      setProducts(arr);
      setFilteredProducts(arr);
    } catch (err) {
      console.error(err);
    }
  };

  const addToCart = async (productId) => {
    try {
      const res = await fetch("http://localhost:5000/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });

      const data = await res.json();
      if (!res.ok) return alert(data.message || "Failed to add to cart");
      alert("Added to cart!");
    } catch (err) {
      alert("Something went wrong.");
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleFilter = () => {
    const filtered = products.filter((p) => {
      const price = parseFloat(p.price);
      const min = minPrice ? parseFloat(minPrice) : 0;
      const max = maxPrice ? parseFloat(maxPrice) : Infinity;
      return price >= min && price <= max;
    });
    setFilteredProducts(filtered);
  };

  const resetFilter = () => {
    setMinPrice("");
    setMaxPrice("");
    setFilteredProducts(products);
  };

  return (
    <div className="products-container">
      <header className="products-header">
        <h1>Bazario Marketplace</h1>
        <div className="header-actions">
          <button className="cart-btn" onClick={() => navigate("/cart")}>
            🛒 View Cart
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </header>

      {/* Filter Section */}
      <div className="filter-bar">
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="filter-input"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="filter-input"
        />
        <button className="apply-filter" onClick={handleFilter}>
          Apply
        </button>
        <button className="reset-filter" onClick={resetFilter}>
          Reset
        </button>
      </div>

      <div className="products-grid">
        {filteredProducts.map((p) => (
          <div className="product-card" key={p._id}>
            <img
              src={
                p.imageUrl
                  ? `${backend}${
                      p.imageUrl.startsWith("/") ? p.imageUrl : "/" + p.imageUrl
                    }`
                  : ""
              }
              alt={p.title}
            />
            <div className="product-info">
              <h3>{p.title}</h3>
              <p className="desc">{p.description}</p>
              <p className="price">{p.price} krones</p>
              <button className="add-btn" onClick={() => addToCart(p._id)}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
