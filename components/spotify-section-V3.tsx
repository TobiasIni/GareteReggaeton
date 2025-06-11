"use client";

import { useState, useEffect } from "react";
import Image from "next/image"; // Import Image for the DJ photo
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, SkipForward, SkipBack, Volume2, ListMusic } from "lucide-react";

const SpotifySectionV3 = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(75); // Mock volume state
  const [progress, setProgress] = useState(33); // Mock progress state

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const visualizerHeights = [
    "h-[20%]", "h-[40%]", "h-[60%]", "h-[30%]", "h-[70%]", "h-[50%]", "h-[80%]", "h-[25%]", "h-[55%]", "h-[65%]",
    "h-[35%]", "h-[75%]", "h-[45%]", "h-[90%]", "h-[20%]", "h-[60%]", "h-[40%]", "h-[70%]", "h-[30%]", "h-[85%]",
  ];

  return (
    <section className={`py-12 md:py-20 px-4 transition-all duration-1000 ${hasMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center mb-12 bg-clip-text text-red-500">
          Nuestra Playlist Oficial
        </h2>

        {/* Contenedor principal para las dos columnas */}
        <div className="flex flex-col lg:flex-row gap-12 items-stretch mb-12"> {/* Agregamos un margen inferior aquí */}
          {/* Columna izquierda: Reproductor de Spotify */}
          <div className="w-full lg:w-1/2 space-y-8 transition-all duration-1000 delay-200">
            <div className="max-w-3xl mx-auto">
              <Card className="glass-card-light">
                <CardContent className="p-0">
                  <iframe
                    src="https://open.spotify.com/embed/playlist/37i9dQZF1DX8SfyqmSFDwe"
                    width="100%"
                    height="380"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    className="spotify-embed"
                  ></iframe>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Columna derecha: Tarjeta del DJ */}
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-center transition-all duration-1000 delay-300">
            <Card className="p-6 shadow-xl rounded-xl border border-gray-700/30 backdrop-blur-md bg-white/10 text-white text-center w-full max-w-sm lg:max-w-none">
              <div className="relative group w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden shadow-lg border-2 border-red-500 transform transition-transform duration-300 hover:scale-105">
                <Image
                  src="/dj.jpg" // Reemplaza con la imagen de tu DJ
                  alt="Foto del DJ"
                  fill
                  className="object-cover transition-all duration-300 group-hover:brightness-110 group-hover:saturate-150"
                />
              </div>
              <h3 className="text-3xl font-bold mb-2 text-red-400">DJ Gare7e</h3>
              <p className="text-white-300 leading-relaxed">
                Conocé a nuestro DJ oficial de Gare7e
              </p>
            </Card>
          </div>
        </div>

        {/* Tarjeta del perfil de Spotify (nueva ubicación, ancho completo) */}
        <div className="w-full flex justify-center transition-all duration-1000 delay-400">
          <Card className="p-6 shadow-xl rounded-xl border border-gray-700/30 backdrop-blur-md bg-white/10 text-white text-center w-full max-w-2xl"> {/* max-w-2xl para un ancho controlable pero amplio */}
            <ListMusic className="w-16 h-16 mx-auto mb-4 text-red-400" />
            <h3 className="text-3xl font-bold mb-2 text-red-400">Nuestro Perfil en Spotify</h3>
            <p className="text-white-300 leading-relaxed mb-4">
              Seguinos en Spotify para no perderte nuestras últimas novedades y playlists exclusivas.
            </p>
            <Button
              asChild
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
            >
              <a href="https://open.spotify.com/user/YOUR_SPOTIFY_PROFILE_ID" target="_blank" rel="noopener noreferrer">
                Visitar Perfil
              </a>
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SpotifySectionV3;