// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Add Bootstrap CSS */}
        <link 
          rel="stylesheet" 
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" 
          integrity="sha384-GLhlTQ8BlS4lzO9sLHXU91A9FfLeYB1jVFlOoWbOgyxV8d2Q8Dq1gyRGH0g0prS" 
          crossorigin="anonymous"
        />
        {/* Add Linearicons CSS */}
        <link 
          rel="stylesheet" 
          href="https://cdn.linearicons.com/free/1.0.0/icon-font.min.css" 
        />
      </Head>
      <body>
        <Main /> {/* This will render the main content of your pages */}
        <NextScript /> {/* This includes Next.js' scripts */}
      </body>
    </Html>
  );
}
