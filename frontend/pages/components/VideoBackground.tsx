// components/VideoBackground.tsx

export default function VideoBackground() {
    return (
      <>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="fixed top-0 left-0 w-full h-full object-cover z-[-1]"
        >
          <source src="/assets/video_kardian_azul_otimizado.mp4" type="video/mp4" />
          Seu navegador não suporta vídeo em HTML5.
        </video>
        <img
          src="/assets/tela_video_gradiente.png"
          alt="overlay"
          className="fixed top-0 left-0 w-full h-full object-cover z-1 pointer-events-none"
        />
      </>
    );
  }