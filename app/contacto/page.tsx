import { ContactForm } from "@/components/contact-form"
import { Mail, MapPin, Phone } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-white">Contacto</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-white  ">
          Seccion de preguntas frecuentes
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-6 text-white">Información de Contacto</h2>

          <div className="space-y-6">
            <div className="flex items-start">
              <MapPin size={24} className="text-primary mr-4 mt-1" />
              <div>
                <h3 className="font-semibold mb-1 text-white">Dirección</h3>
                <p className="text-muted-foreground text-white">
                  Calle Principal 123
                  <br />
                  Capital Federal, Argentina
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <Mail size={24} className="text-primary mr-4 mt-1" />
              <div>
                <h3 className="font-semibold mb-1 text-white">Email</h3>
                <p className="text-muted-foreground text-white">
                  info@gare7e.com
                  <br />
                  eventos@gare7e.com
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <Phone size={24} className="text-primary mr-4 mt-1" />
              <div>
                <h3 className="font-semibold mb-1 text-white">Teléfono</h3>
                <p className="text-muted-foreground text-white">
                  +34 912 345 678
                  <br />
                  +34 666 777 888
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-6">Horarios</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Lunes - Viernes:</span>
                <span>10:00 - 18:00</span>
              </div>
              <div className="flex justify-between">
                <span>Sábado:</span>
                <span>12:00 - 16:00</span>
              </div>
              <div className="flex justify-between">
                <span>Domingo:</span>
                <span>Cerrado</span>
              </div>
            </div>
          </div>
        </div>

        <ContactForm />
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Ubicación de nuestra proxima fiesta</h2>
        <div className="aspect-[16/9] w-full rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12140.766594903964!2d-3.7037974!3d40.4167754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd422997800a3c81%3A0xc436dec1618c2269!2sMadrid%2C%20Espa%C3%B1a!5e0!3m2!1ses!2ses!4v1654789542873!5m2!1ses!2ses"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  )
  
}
