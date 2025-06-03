import { Card, CardContent } from "@/components/ui/card"

export function SpotifySection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Nuestra Playlist</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Escucha los mejores éxitos del reggaeton viejo que sonarán en nuestras fiestas. Sigue nuestra playlist
            oficial en Spotify.
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
        </div>
      </div>
    </section>
  )
}
