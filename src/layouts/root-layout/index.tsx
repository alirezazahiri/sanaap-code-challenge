import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { QueryProvider } from "@/providers";
import { ThemeProvider } from "@mui/material/styles";
import localFont from "next/font/local";
import theme from "@/theme";
import classes from "./styles.module.css";
import { Toaster } from "@/components/feedback";

const vazirmatn = localFont({
  src: [
    {
      path: "../../../public/fonts/vazirmatn/Vazirmatn-UI-FD-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../../public/fonts/vazirmatn/Vazirmatn-UI-FD-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../../public/fonts/vazirmatn/Vazirmatn-UI-FD-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../../public/fonts/vazirmatn/Vazirmatn-UI-FD-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/vazirmatn/Vazirmatn-UI-FD-Medium.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../../public/fonts/vazirmatn/Vazirmatn-UI-FD-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../../public/fonts/vazirmatn/Vazirmatn-UI-FD-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../../public/fonts/vazirmatn/Vazirmatn-UI-FD-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-vazirmatn",
});

export const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <head>
        <meta name="apple-mobile-web-app-title" content="Sanaap" />
      </head>
      <body className={classes.container}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <QueryProvider>
              <main className={classes.main}>{children}</main>
            </QueryProvider>
            <Toaster />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
};
