import { useState } from "react";
import "./QrCodeCard.css";
import {
  FaQrcode,
  FaInfoCircle,
  FaDownload,
  FaRegTimesCircle,
} from "react-icons/fa";
import { generateQRCode, isValidURL } from "../utils";

function QrCodeCard() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [qrImageUrl, setQrImageUrl] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!url) {
      setError("Please enter url");
      return;
    }

    if (!isValidURL(url)) {
      setError("Please enter a valid url");
    }

    try {
      const qrCodeUrl = await generateQRCode(url);
      setQrImageUrl(qrCodeUrl);
      console.log("QRCode: ", qrCodeUrl);
    } catch (err) {
      setError(err);
    }
  };

  const onUrlChange = (e) => {
    if (qrImageUrl) {
      setQrImageUrl("");
    }
    setUrl(e.target.value);
    setError("");
  };

  const handleClear = () => {
    setQrImageUrl("");
    setUrl("");
  };

  return (
    <div className="main-card">
      <div className="card-title-container">
        {qrImageUrl ? (
          <img src={qrImageUrl} className="qr-image" alt="qr-image" />
        ) : (
          <>
            <div className="subtitle">Your QR</div>
            <h1 className="title">Generator</h1>
          </>
        )}
      </div>

      <form className="url-input-form" onSubmit={handleFormSubmit}>
        <input
          type="url"
          className="url-input"
          placeholder="Enter a valid URL"
          name="url"
          id="url"
          value={url}
          onChange={onUrlChange}
        />
        {qrImageUrl ? (
          <div className="result-action-container">
            <button
              onClick={handleClear}
              className="btn clear-btn"
              type="button"
            >
              <FaRegTimesCircle />
              <span>Clear</span>
            </button>
            <a
              download={"qrCode.png"}
              href={qrImageUrl}
              className="btn download-btn"
            >
              <FaDownload />
              <span>Download</span>
            </a>
          </div>
        ) : (
          <button className="btn generate-btn" type="submit">
            <FaQrcode />
            <span>Generate</span>
          </button>
        )}
        {error && (
          <div className="error-container">
            <FaInfoCircle className="info-icon" />
            <span className="error-text">{error}</span>
          </div>
        )}
      </form>
    </div>
  );
}

export default QrCodeCard;
