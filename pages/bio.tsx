/* eslint-disable @next/next/no-before-interactive-script-outside-document */
/* eslint-disable @next/next/no-page-custom-font */
import Head from "next/head";
import Script from "next/script";
import type { GetStaticProps, NextPage } from "next";

import {
  ExtractedScript,
  extractStaticHtml,
} from "@/src/utils/extractStaticHtml";

type BioProps = {
  body: string;
  scripts: ExtractedScript[];
};

const normalizeSrc = (src: string) => {
  if (src.startsWith("http")) return src;
  return src.startsWith("/") ? src : `/${src}`;
};

export const getStaticProps: GetStaticProps<BioProps> = () => {
  return {
    props: extractStaticHtml("bio.html"),
  };
};

const BioPage: NextPage<BioProps> = ({ body, scripts }) => (
  <>
    <Head>
      <title>Bio Link</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:type" content="profile" />
      <meta property="og:title" content="" />
      <meta property="og:description" content="" />
      <meta property="og:image" content="" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="" />
      <meta name="twitter:description" content="" />
      <meta name="twitter:image" content="" />
      <link rel="icon" type="image/x-icon" href="/assets/icons/favicon.ico" />
      <link rel="icon" type="image/svg+xml" href="/assets/icons/favicon.svg" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Encode+Sans:wght@300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />
    </Head>
    <Script
      src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"
      strategy="beforeInteractive"
    />
    <Script
      src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js"
      strategy="beforeInteractive"
    />
    <Script
      src="https://www.gstatic.com/firebasejs/9.22.0/firebase-storage-compat.js"
      strategy="beforeInteractive"
    />
    <div
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
          key={`bio-inline-${index}`}
          id={`bio-inline-${index}`}
          strategy="afterInteractive"
        >
          {script.inline ?? ""}
        </Script>
      )
    )}
  </>
);

export default BioPage;
