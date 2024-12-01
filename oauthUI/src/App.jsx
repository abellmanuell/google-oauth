import "./App.css";

function navigate(url) {
  window.location.href = url;
}

async function auth() {
  const response = await fetch("http://127.0.0.1:3000/request", {
    method: "POST",
  });

  const data = await response.json();
  console.log(data);
  navigate(data.url);
}

function App() {
  return (
    <>
      <button type="button" onClick={() => auth()}>
        Continue with Google
      </button>
    </>
  );
}

export default App;
