import Link from 'next/link'

const footerNavigation = {
  produkt: [
    { name: 'Features', href: '/features' },
    { name: 'Preise', href: '/pricing' },
    { name: 'Vergleich', href: '/vergleich' },
    { name: 'Changelog', href: '/docs/changelog' },
  ],
  ressourcen: [
    { name: 'Blog', href: '/blog' },
    { name: 'Dokumentation', href: '/docs' },
    { name: 'API', href: '/docs/api' },
    { name: 'Status', href: 'https://status.bookicorn.com' },
  ],
  unternehmen: [
    { name: 'Über uns', href: '/about' },
    { name: 'Kontakt', href: '/contact' },
    { name: 'Partner', href: '/partner' },
    { name: 'Karriere', href: '/karriere' },
  ],
  rechtliches: [
    { name: 'Datenschutz', href: '/datenschutz' },
    { name: 'Impressum', href: '/impressum' },
    { name: 'AGB', href: '/agb' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-gray-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Logo & Description */}
          <div className="space-y-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <span className="text-xl font-bold text-white">Bookicorn</span>
            </div>
            <p className="text-sm leading-6 text-gray-300">
              Die moderne Kursplattform für Yoga, Fitness und Wellness Studios.
              Verwalte Buchungen, Credits und Trainer - alles an einem Ort.
            </p>
            <div className="flex space-x-6">
              {/* Social Links - Placeholder */}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Produkt</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerNavigation.produkt.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-gray-300 hover:text-white transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Ressourcen</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerNavigation.ressourcen.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-gray-300 hover:text-white transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Unternehmen</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerNavigation.unternehmen.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-gray-300 hover:text-white transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Rechtliches</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerNavigation.rechtliches.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-gray-300 hover:text-white transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-gray-400">
            &copy; {new Date().getFullYear()} Bookicorn. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  )
}
