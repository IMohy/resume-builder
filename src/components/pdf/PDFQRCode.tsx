import React from "react";
import { View, Image, Text } from "@react-pdf/renderer";

interface PDFQRCodeProps {
  value: string;
  size?: number;
  color?: string;
  backgroundColor?: string;
  title?: string;
}

const PDFQRCode: React.FC<PDFQRCodeProps> = ({ value, size = 100, backgroundColor = "#ffffff", title }) => {
  const encodedValue = encodeURIComponent(value);
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedValue}`;

  return (
    <View style={{ width: size, height: size + (title ? 20 : 0), alignItems: "center" }}>
      <View
        style={{
          width: size,
          height: size,
          backgroundColor,
          padding: 5,
          border: "1pt solid #e5e5e5",
          borderRadius: 5,
        }}
      >
        <Image
          src={qrCodeUrl}
          style={{
            width: size - 10,
            height: size - 10,
          }}
        />
      </View>

      {title && (
        <Text
          style={{
            fontSize: 8,
            marginTop: 5,
            textAlign: "center",
            color: "#666666",
          }}
        >
          {title}
        </Text>
      )}
    </View>
  );
};

export default PDFQRCode;
