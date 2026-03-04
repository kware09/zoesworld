import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #FFD6E0 0%, #C3B1E1 50%, #A7D8F0 100%)',
          borderRadius: '36px',
          gap: '0px',
        }}
      >
        <div style={{ fontSize: 110, lineHeight: 1 }}>🦄</div>
      </div>
    ),
    { ...size }
  );
}
