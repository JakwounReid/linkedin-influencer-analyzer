import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import Script from 'next/script'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const p = new URLSearchParams(window.location.search);
      ["utm_source","utm_medium","utm_campaign","utm_content","utm_term"].forEach(k => {
        const v = p.get(k);
        if (v) sessionStorage.setItem(k, v);
      });
    }
  }, []);

  return (
    <>
      {process.env.NODE_ENV === "production" && (
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window,document,"clarity","script","w8221x2mnd");
          `}
        </Script>
      )}
      <Component {...pageProps} />
    </>
  );
}