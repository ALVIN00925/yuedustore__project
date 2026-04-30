import { useEffect, useState } from "react";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]); // Gunakan p kecil (best practice)
  const [cart, setCart] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
  });

  const fetchProducts = () => {
  axios.get("http://localhost:5000/products")
    .then(res => {
      console.log("GET:", res.data); // DEBUG
      setProducts(Array.isArray(res.data) ? res.data : []);
    })
    .catch(err => console.log("ERROR GET:", err));
};

  useEffect(() => {
    fetchProducts();
  }, []);

 const addProduct = () => {
  console.log("KIRIM:", form); // DEBUG

  axios.post("http://localhost:5000/products", form)
    .then((res) => {
      console.log("SUKSES:", res.data); // DEBUG

      // langsung ambil ulang data
      fetchProducts();

      // reset form
      setForm({ name: "", price: "", stock: "" });
    })
    .catch((err) => {
      console.log("ERROR POST:", err.response?.data || err.message);
    });
};

  // CART
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  // Pastikan nama variabel konsisten (total - huruf kecil)
  const total = cart.reduce((sum, item) => sum + Number(item.price), 0);

  return (
    <div style={{ padding: "20px" }}>
      {/* PRODUCT LIST */}
      <h2>Products</h2>
      {products.map((p) => (
        <div key={p.id} style={{ border: "1px solid #333", marginBottom: "10px", padding: "10px" }}>
          <h3>Product: {p.name}</h3>
          <p>Rp. {p.price}</p>
          <p>Stock: {p.stock}</p>
          <button
            onClick={() => addToCart(p)}
            style={{ background: "rgb(73, 214, 8)", color: "white", padding: "5px", cursor: "pointer" }}
          >
            Add to Cart
          </button>
        </div>
      ))}

      <hr />

      {/* ADD PRODUCT FORM */}
      <h2>Add New Product</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "200px" }}>
        <input 
          placeholder="Name" 
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })} 
        />
        <input 
          placeholder="Price" 
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })} 
        />
        <input 
          placeholder="Stock" 
          type="number"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })} 
        />
        <button onClick={addProduct}>Add Product</button>
      </div>

      <hr />

      {/* CART */}
      <h2>Cart</h2>
      {cart.length === 0 ? <p>Cart is empty</p> : cart.map((item, index) => (
        <div key={index} style={{ marginBottom: "5px" }}>
          <span>{item.name} - Rp {item.price} </span>
          <button onClick={() => removeFromCart(index)}>Remove</button>
        </div>
      ))}
      {/* Pakai 'total' huruf kecil sesuai deklarasi di atas */}
      <h3>Total: Rp {total}</h3>
    </div>
  );
}

export default Products;