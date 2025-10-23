import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Link } from "react-router-dom";
import "../styles/Selleranalytics.css";
;

export default function SellerAnalytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const backend = "http://localhost:5000";

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await fetch(`${backend}/orders/seller/analytics`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setAnalytics(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="analytics-container">
        <h2>Loading analytics...</h2>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="analytics-container">
        <h2>Unable to load analytics</h2>
      </div>
    );
  }

  return (
    <div className="analytics-container">
      <h2> Sales Analytics</h2>

      <Link to="/seller" className="dashboard-link">
              Back to Dashboard
           </Link>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Revenue</h3>
          <p className="stat-value">{analytics.totalRevenue.toFixed(2)} Kr</p>
        </div>
        <div className="stat-card">
          <h3>Total Orders</h3>
          <p className="stat-value">{analytics.totalOrders}</p>
        </div>
        <div className="stat-card">
          <h3>Products Sold</h3>
          <p className="stat-value">{analytics.productsSold}</p>
        </div>
        <div className="stat-card">
          <h3>Avg Order Value</h3>
          <p className="stat-value">
            {analytics.averageOrderValue.toFixed(2)} Kr
          </p>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="chart-section">
        <h3>Revenue Over Time</h3>
        {analytics.revenueChart.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analytics.revenueChart}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#8884d8"
                strokeWidth={2}
                name="Revenue (Kr)"
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="no-data">No revenue data yet</p>
        )}
      </div>

      {/* Top Products */}
      <div className="chart-section">
        <h3>Top Selling Products</h3>
        {analytics.topProducts.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics.topProducts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="quantity" fill="#82ca9d" name="Quantity Sold" />
              <Bar dataKey="revenue" fill="#8884d8" name="Revenue (Kr)" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="no-data">No sales data yet</p>
        )}
      </div>
      <div className="table-section">
        <h3>Product Performance</h3>
        {analytics.topProducts.length > 0 ? (
          <table className="analytics-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Quantity Sold</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {analytics.topProducts.map((product, idx) => (
                <tr key={idx}>
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                  <td>{product.revenue.toFixed(2)} Kr</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-data">No products sold yet</p>
        )}
      </div>
    </div>
  );
}