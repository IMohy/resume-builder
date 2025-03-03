import React from 'react';
import ReactQRCode from 'react-qr-code';

interface QRCodeProps {
  value: string;
  size?: number;
  color?: string;
  backgroundColor?: string;
  title?: string;
}

const QRCode: React.FC<QRCodeProps> = ({ 
  value, 
  size = 100, 
  color = '#000000', 
  backgroundColor = '#ffffff',
  title
}) => {
  return (
    <div className="flex flex-col items-center">
      <div 
        style={{ 
          width: size, 
          height: size, 
          backgroundColor, 
          padding: 5,
          border: '1px solid #e5e5e5',
          borderRadius: 5,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <ReactQRCode
          value={value}
          size={size - 10}
          fgColor={color}
          bgColor={backgroundColor}
          level="H" // High error correction capability
        />
      </div>
      
      {title && (
        <div className="text-xs mt-1 text-gray-500">
          {title}
        </div>
      )}
    </div>
  );
};

export default QRCode; 