import React, { useState } from "react";

function Analyze() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const response = await fetch("/api/analyze-face", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ file: base64Image }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Face++ Skin Analyzer</h1>
      <input
        type="file"
        accept="image/jpeg"
        onChange={handleFileUpload}
        disabled={loading}
      />
      {loading && <p>Processing...</p>}
      {result && (
        <div>
          <h2>Results:</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default Analyze;
