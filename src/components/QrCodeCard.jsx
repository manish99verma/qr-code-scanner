import { useState } from "react";
import "./QrCodeCard.css";
import {
  FaQrcode,
  FaInfoCircle,
  FaDownload,
  FaRegTimesCircle,
  FaPaste,
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

  const handlePaste = async () => {
    setQrImageUrl("");

    try {
      const pastedUrl = await navigator.clipboard.readText();
      setUrl(pastedUrl);
    } catch (err) {
      setError(err.message || "Unable to read clipboard!");
    }
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
        <div className="url-input-container">
          <input
            type="url"
            className="url-input"
            placeholder="Enter a valid URL"
            name="url"
            id="url"
            value={url}
            onChange={onUrlChange}
          />
          <button
            onClick={handlePaste}
            title="Paste Url"
            className="paste-btn"
            type="button"
          >
            <FaPaste />
          </button>
        </div>

        {qrImageUrl ? (
          <div className="result-action-container">
            <button
              title="Clear url"
              onClick={handleClear}
              className="btn clear-btn"
              type="button"
            >
              <FaRegTimesCircle />
              <span>Clear</span>
            </button>
            <a
              title="Download QR Code"
              download={"qrCode.png"}
              href={qrImageUrl}
              className="btn download-btn"
            >
              <FaDownload />
              <span>Download</span>
            </a>
          </div>
        ) : (
          <button
            aria-label="Generate QR Code"
            title="Generate QR Code"
            className="btn generate-btn"
            type="submit"
          >
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
