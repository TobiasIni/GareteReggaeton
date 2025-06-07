import { Card, CardContent } from "@/components/ui/card"

export function SpotifySection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-white">Nuestra Playlist</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
          </p>
        </div>

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

          {/* Botón con logo de Spotify */}
          <div className="flex justify-center mt-6">
            <a
              href="https://open.spotify.com/user/12vb80Km0Ew53ABfJOepVz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2 rounded-md bg-black text-white font-semibold transition hover:bg-red-600"
            >
              <img
                src="/logoSpotify.jpg"
                alt="Spotify logo"
                className="w-5 h-5"
              />
              Conocenos
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
