import { Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden bg-white">
                <img
                  src="/placeholder.svg?height=40&width=40&text=NSS+Logo"
                  alt="NSS Logo"
                  className="w-full h-full object-contain p-1"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold">NSS</span>
                <span className="text-sm text-gray-400">SB College</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              National Service Scheme - Serving the community with dedication and commitment. "Not Me But You"
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/activities" className="text-gray-400 hover:text-white transition-colors">
                  Activities
                </Link>
              </li>
              <li>
                <Link href="/achievements" className="text-gray-400 hover:text-white transition-colors">
                  Achievements
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-400 hover:text-white transition-colors">
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-400">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">SB College, Changanassery</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+91 481 242 1234</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Mail className="w-4 h-4" />
                <span className="text-sm">nss@sbcollege.edu</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Link
                href="https://instagram.com/nss_sbcollege"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 bg-pink-600 rounded-full hover:bg-pink-700 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href="https://youtube.com/@nss_sbcollege"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 bg-red-600 rounded-full hover:bg-red-700 transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </Link>
            </div>
            <p className="text-gray-400 text-sm mt-4">Stay connected with our latest activities and updates</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} NSS SB College. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <p className="text-gray-400 text-sm">
              Developed with ❤️ by <span className="text-white font-semibold">Anandu A</span>
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://instagram.com/nss_sbcollege"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-400 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </Link>
              <Link
                href="https://youtube.com/@nss_sbcollege"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-400 transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
