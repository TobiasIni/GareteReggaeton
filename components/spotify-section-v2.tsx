"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, SkipForward, SkipBack, Volume2, ListMusic } from "lucide-react"

const SpotifySectionV2 = () => {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="w-full md:w-1/2">
          <h3 className="text-2xl font-bold mb-4">La Playlist Oficial de Gare7e</h3>
          <p className="text-muted-foreground mb-6">
            Reviví los mejores clásicos del reggaeton viejo con nuestra playlist oficial. Desde Daddy Yankee hasta Don
            Omar, pasando por Wisin & Yandel y Tego Calderón.
          </p>
          <div className="flex flex-col space-y-4">
            <Button
              className="w-full md:w-auto"
              onClick={() => window.open("https://open.spotify.com/playlist/yourplaylistid", "_blank")}
            >
              <ListMusic className="mr-2 h-5 w-5" />
              Abrir en Spotify
            </Button>
            <iframe
              src="https://open.spotify.com/embed/playlist/3z0zQdiFbPdiZ1I7xRpqPx?si=7ae0380644124eba"
              width="100%"
              height="380"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              className="hidden md:block"
            ></iframe>
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <Card className="overflow-hidden">
            <div
              className="h-52 md:h-64 bg-cover bg-center"
              style={{ backgroundImage: "url('/placeholder.svg?height=400&width=600')" }}
            />
            <CardContent className="p-4">
              <div className="space-y-6">
                <div className="space-y-1">
                  <h4 className="font-semibold truncate">Lo Mejor del Reggaeton Viejo</h4>
                  <p className="text-sm text-muted-foreground">Gare7e Official Playlist</p>
                </div>

                <div className="space-y-2">
                  <div className="h-1 w-full bg-muted overflow-hidden rounded-full">
                    <div className="bg-primary h-full w-1/3" />
                  </div>

                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1:15</span>
                    <span>3:45</span>
                  </div>
                </div>

                <div className="flex justify-center items-center space-x-4">
                  <Button variant="ghost" size="icon">
                    <SkipBack className="h-5 w-5" />
                  </Button>

                  <Button size="icon" className="h-12 w-12 rounded-full" onClick={() => setIsPlaying(!isPlaying)}>
                    {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
                  </Button>

                  <Button variant="ghost" size="icon">
                    <SkipForward className="h-5 w-5" />
                  </Button>
                </div>

                <div className="flex items-center space-x-2">
                  <Volume2 className="h-4 w-4 text-muted-foreground" />
                  <div className="h-1 w-full bg-muted overflow-hidden rounded-full">
                    <div className="bg-primary h-full w-2/3" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <iframe
            src="https://open.spotify.com/embed/playlist/37i9dQZF1DXbSbnqxMTGx9"
            width="100%"
            height="152"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            className="md:hidden mt-4"
          ></iframe>
        </div>
      </div>
    </div>
  )
}

export default SpotifySectionV2
