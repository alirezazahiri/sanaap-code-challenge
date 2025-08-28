import { PATHS } from "@/routes/paths";
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "سناپ",
    short_name: "سناپ",
    description: "سناپ - کد چلنج",
    start_url: PATHS.AUTH.SIGNUP.PHONE_VERIFICATION,
    display: "standalone",
    background_color: "#33929d",
    theme_color: "#017785",
    icons: [
      {
        src: "/assets/favicon/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/assets/favicon/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
