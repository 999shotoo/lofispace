// import { HalftoneCmyk } from '@paper-design/shaders-react';


function Console() {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <div className="fixed inset-0 z-0">
        <img
          src={`https://www.lofi.cafe/gifs/4oHyOIBIt57ag.gif`}
          alt="Lofi girl studying at desk"
          className="w-full h-full object-cover brightness-60"
        />
        <div className="crt-overlay" />
        <div className="absolute inset-0 bg-accent/30 mix-blend-color" />
        <div className="absolute inset-0 bg-background/40" />
      </div>
      <div>
        
      </div>
    </div>
  )
}

export default Console
