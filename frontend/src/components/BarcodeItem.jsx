import JsBarcode from "jsbarcode";
import { useEffect, useState } from "react";

const BarcodeItem = ({ barcodeNumber, bgColor, colorText }) => {
  const [imageUrl, setImageUrl] = useState();
  useEffect(() => {
    const canvas = document.createElement("canvas");
    JsBarcode(canvas, barcodeNumber, {
      height: 50,
      width: 2,
      displayValue: false,
      background: bgColor,
      lineColor: colorText,
    });
    setImageUrl(canvas.toDataURL("image/png"));
  }, []);
  return <div>{imageUrl && <img src={imageUrl} />}</div>;
};

export default BarcodeItem;
