// import { HalftoneCmyk } from '@paper-design/shaders-react';

import Player from "../components/Player"

function Home() {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Full-screen background */}
      <div className="fixed inset-0 z-0">
        <img
          src={`https://w.wallhaven.cc/full/j3/wallhaven-j3em3y.png`}
          alt="Lofi girl studying at desk"
          className="w-full h-full object-cover brightness-25"
        />
           <div className="crt-overlay" />
        {/* <HalftoneCmyk
          className="w-full h-full object-cover brightness-50"
          // width={1280}
          // height={720}
          image="https://raw.githubusercontent.com/999shotoo/lofi-lounge/refs/heads/main/src/assets/lofi-girl.jpg?token=GHSAT0AAAAAADVHHVKFSE622NXKIV3YE4UY2NRTETQ"
          colorBack="#fffaf0"
          colorC="#59afc5"
          colorM="#d8697c"
          colorY="#fad85c"
          colorK="#2d2824"
          size={0.2}
          gridNoise={0.45}
          type="sharp"
          softness={0.4}
          contrast={1.25}
          floodC={0.15}
          floodM={0}
          floodY={0}
          floodK={0}
          gainC={0.3}
          gainM={0}
          gainY={0.2}
          gainK={0}
          grainMixer={0.15}
          grainOverlay={0.1}
          grainSize={0.5}
          fit="cover"
        /> */}
        <div className="absolute inset-0 bg-accent/30 mix-blend-color" />
        <div className="absolute inset-0 bg-background/40" />
      </div>
    </div>
  )
}

export default Home
