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
        }}
      >
        {/* This will use your logo.png as favicon */}
        <img 
          src="/logo.png" 
          alt="Anthroly" 
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  )
}

