import Products from "./pages/Products";

function App() {
  return (
    <div style = {{background: "#000000f8", color: "white", minHeight: "100vh", padding:"20"}}>
      <h1 style= {{color: "rgb(131, 64, 255)"}}>YuEdu Store</h1>
      <Products />
    </div>
  );
}

export default App;