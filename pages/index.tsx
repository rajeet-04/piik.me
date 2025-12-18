/* eslint-disable @next/next/no-css-tags */
import Head from "next/head";
import Script from "next/script";
import type { GetStaticProps, NextPage } from "next";

import {
  ExtractedScript,
  extractStaticHtml,
} from "@/src/utils/extractStaticHtml";

type LandingProps = {
  body: string;
  scripts: ExtractedScript[];
};

const normalizeSrc = (src: string) => {
  if (src.startsWith("http")) return src;
  return src.startsWith("/") ? src : `/${src}`;
};

export const getStaticProps: GetStaticProps<LandingProps> = () => {
  return {
    props: extractStaticHtml("landing.html"),
  };
};

const LandingPage: NextPage<LandingProps> = ({ body, scripts }) => (
  <>
    <Head>
      <title>piik.me - Hyper-Analytics, Zero Latency for All Your Links</title>
      <meta
        name="description"
        content="A secured, gold mine for business owners—all for free. Transform your links into intelligent assets with real-time analytics, QR codes, and bio pages."
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" type="image/png" href="/assets/images/favicon.png" />
      <link rel="stylesheet" href="/css/landing.css" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />
    </Head>
    <div
      data-theme="dark"
      dangerouslySetInnerHTML={{ __html: body }}
      suppressHydrationWarning
    />
    {scripts.map((script, index) =>
      script.src ? (
        <Script
          key={script.src}
          src={normalizeSrc(script.src)}
          strategy="afterInteractive"
        />
      ) : (
        <Script
          key={`landing-inline-${index}`}
          id={`landing-inline-${index}`}
          strategy="afterInteractive"
        >
          {script.inline ?? ""}
        </Script>
      )
    )}
  </>
);

export default LandingPage;
