import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

// Define __dirname for ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
import { VitePWA } from 'vite-plugin-pwa'


export default defineConfig({
  plugins: [
      react(),
      VitePWA({
          registerType: 'autoUpdate',
          manifest: {
              id: "/",
              name: "Time Picker",
              short_name: "TimePicker",
              start_url: "/",
              display: "standalone",
              background_color: "#ffffff",
              theme_color: "#ffffff",
              icons: [
                  {
                      "src": "/assets/img/icons/android/android-launchericon-512-512.png",
                      "sizes": "512x512",
                      type: "image/png"
                  },
                  {
                      "src": "/assets/img/icons/android/android-launchericon-192-192.png",
                      "sizes": "192x192",
                      type: "image/png"
                  },
                  {
                      "src": "/assets/img/icons/android/android-launchericon-144-144.png",
                      "sizes": "144x144",
                      type: "image/png"
                  },
                  {
                      "src": "/assets/img/icons/android/android-launchericon-96-96.png",
                      "sizes": "96x96",
                      type: "image/png"
                  },
                  {
                      "src": "/assets/img/icons/android/android-launchericon-72-72.png",
                      "sizes": "72x72",
                      type: "image/png"
                  },
                  {
                      "src": "/assets/img/icons/android/android-launchericon-48-48.png",
                      "sizes": "48x48",
                      type: "image/png"
                  },
                  {
                      "src": "/assets/img/icons/ios/16.png",
                      "sizes": "16x16",
                      type: "image/png"
                  },
                  {
                      "src": "/assets/img/icons/ios/20.png",
                      "sizes": "20x20",
                      type: "image/png"
                  },
                  {
                      "src": "/assets/img/icons/ios/29.png",
                      "sizes": "29x29",
                      type: "image/png"
                  },
                  {
                      "src": "/assets/img/icons/ios/32.png",
                      "sizes": "32x32",
                      type: "image/png"
                  },
                  {
                      "src": "/assets/img/icons/ios/40.png",
                      "sizes": "40x40",
                      type: "image/png"
                  },
                  {
                      "src": "/assets/img/icons/ios/50.png",
                      "sizes": "50x50",
                      type: "image/png"
                  },
                  {
                      "src": "/assets/img/icons/ios/57.png",
                      "sizes": "57x57",
                      type: "image/png"
                  },
                  {
                      "src": "/assets/img/icons/ios/58.png",
                      "sizes": "58x58",
                      type: "image/png"
                  },
                  {
                      "src": "/assets/img/icons/ios/60.png",
                      "sizes": "60x60",
                      type: "image/png"
                  },
                  {
                      "src": "/assets/img/icons/ios/64.png",
                      "sizes": "64x64",
                      type: "image/png"
                  },
                  {
                      "src": "/assets/img/icons/ios/72.png",
                      "sizes": "72x72",
                      type: "image/png"
                  },
                  {
                      "src": "/assets/img/icons/ios/76.png",
                      "sizes": "76x76",
                      type: "image/png"
                  },
                  {
                      "src": "/assets/img/icons/ios/80.png",
                      "sizes": "80x80",
                      type: "image/png"
                  },
                  {
                      "src": "/assets/img/icons/ios/87.png",
                      "sizes": "87x87",
                      type: "image/png"
                  },
                  {
                      "src": "/assets/img/icons/ios/100.png",
                      "sizes": "100x100",
                      type: "image/png"
                  },
                  {
                      "src": "/assets/img/icons/ios/114.png",
                      "sizes": "114x114",
                      type: "image/png"
                  },
                  {
                      "src": "/assets/img/icons/ios/120.png",
                      "sizes": "120x120",
                      type: "image/png"
                  },
                  {
                      "src": "/assets/img/icons/ios/128.png",
                      "sizes": "128x128",
                      type: "image/png"
                  },
                  {
                      "src": "/assets/img/icons/ios/144.png",
                      "sizes": "144x144",
                      type: "image/png"
                  },
                  {
                      "src": "/assets/img/icons/ios/152.png",
                      "sizes": "152x152",
                      type: "image/png"
                  },
                  {
                      "src": "/assets/img/icons/ios/167.png",
                      "sizes": "167x167",
                      type: "image/png"
                  },
                  {
                      "src": "/assets/img/icons/ios/180.png",
                      "sizes": "180x180",
                      type: "image/png"
                  },
                  {
                      "src": "/assets/img/icons/ios/192.png",
                      "sizes": "192x192",
                      type: "image/png"
                  },
                  {
                      "src": "/assets/img/icons/ios/256.png",
                      "sizes": "256x256",
                      type: "image/png"
                  },
                  {
                      "src": "/assets/img/icons/ios/512.png",
                      "sizes": "512x512",
                      type: "image/png"
                  },
                  {
                      "src": "/assets/img/icons/ios/1024.png",
                      "sizes": "1024x1024",
                      type: "image/png"
                  }
              ]
          }
      })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
