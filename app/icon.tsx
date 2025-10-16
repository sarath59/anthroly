import { ImageResponse } from 'next/og'
 
// Image metadata
export const size = {
  width: 32,
  height: 32,
}
 
export const contentType = 'image/png'
 
// Image generation
export default async function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#000',
        }}
      >
        {/* Favicon placeholder - will use logo.png from public folder */}
        <div style={{ 
          fontSize: 24, 
          color: '#fff',
          fontWeight: 'bold'
        }}>
          A
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}

