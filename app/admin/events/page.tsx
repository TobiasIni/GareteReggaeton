import Link from "next/link"
import { getEvents } from "@/lib/actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, Edit, Trash } from "lucide-react"
import { formatDateTime } from "@/lib/utils"

export default async function AdminEventsPage() {
  const events = await getEvents()

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Gestión de Eventos</h1>
          <p className="text-muted-foreground">Administra los eventos de Gare7e.</p>
        </div>
        <Button asChild>
          <Link href="/admin/events/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Nuevo Evento
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Eventos</CardTitle>
        </CardHeader>
        <CardContent>
          {events.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Título</th>
                    <th className="text-left py-3 px-4">Fecha</th>
                    <th className="text-left py-3 px-4">Ubicación</th>
                    <th className="text-left py-3 px-4">Precio</th>
                    <th className="text-right py-3 px-4">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event) => (
                    <tr key={event.id} className="border-b">
                      <td className="py-3 px-4">{event.title}</td>
                      <td className="py-3 px-4">{formatDateTime(event.date)}</td>
                      <td className="py-3 px-4">{event.location || "-"}</td>
                      <td className="py-3 px-4">{event.price ? `${event.price.toFixed(2)} €` : "-"}</td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/admin/events/${event.id}`}>
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Editar</span>
                            </Link>
                          </Button>
                          <form action={`/admin/events/${event.id}/delete`}>
                            <Button variant="destructive" size="sm" type="submit">
                              <Trash className="h-4 w-4" />
                              <span className="sr-only">Eliminar</span>
                            </Button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No hay eventos disponibles. Crea tu primer evento.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
