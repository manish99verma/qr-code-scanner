import QRCode from "qrcode";

export const isValidURL = (url) => {
  if (!url) return false;

  try {
    new URL(url); // will throw if invalid
    return true;
  } catch (_) {
    return false;
  }
};

export const generateQRCode = async (url) => {
  return new Promise((resolve, reject) => {
    QRCode.toDataURL(url, { width: 720 }, function (err, url) {
      if (err) {
        reject(err);
      } else {
        resolve(url);
      }
    });

    // Failure
    setTimeout(() => {
      reject("Something went wrong, please check your URL.");
    }, 5000);
  });
};
