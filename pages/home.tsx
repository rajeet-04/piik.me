/* eslint-disable @next/next/no-css-tags */
import Head from "next/head";
import Script from "next/script";
import type { GetStaticProps, NextPage } from "next";

import {
  ExtractedScript,
  extractStaticHtml,
} from "@/src/utils/extractStaticHtml";

type HomeProps = {
  body: string;
  scripts: ExtractedScript[];
};

const normalizeSrc = (src: string) => {
  if (src.startsWith("http")) return src;
  return src.startsWith("/") ? src : `/${src}`;
};

export const getStaticProps: GetStaticProps<HomeProps> = () => {
  return {
    props: extractStaticHtml("index.html"),
  };
};

const HomePage: NextPage<HomeProps> = ({ body, scripts }) => (
  <>
    <Head>
      <title>piik.me - Link Management &amp; Analytics</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" type="image/png" href="/assets/images/favicon.png" />
      <link rel="stylesheet" href="/css/styles.css" />
      <link rel="stylesheet" href="/css/bio-preview.css" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />
    </Head>
    <div
      data-theme="dark"
      /* Static HTML sourced from repository assets (scripts stripped in extractStaticHtml) */
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
          key={`home-inline-${index}`}
          id={`home-inline-${index}`}
          strategy="afterInteractive"
        >
          {script.inline ?? ""}
        </Script>
      )
    )}
  </>
);

export default HomePage;
