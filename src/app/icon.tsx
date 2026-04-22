import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 7,
          background: 'linear-gradient(135deg, #1a1a2e 0%, #0a0a14 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 2 L18.2 12.8 L29 16 L18.2 19.2 L16 30 L13.8 19.2 L3 16 L13.8 12.8 Z"
            fill="#f0c060"
          />
        </svg>
      </div>
    ),
    { ...size }
  )
}
