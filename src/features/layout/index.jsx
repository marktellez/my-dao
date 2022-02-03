import Head from "next/head";
import Container from "@/ui/container";
import Header from "./header";
import Footer from "./footer";

export default function Layout({ children }) {
  const fonts = [
    "/fonts/Inter-Light.woff2",
    "/fonts/Inter-Medium.woff2",
    "/fonts/sequel.woff",
  ];
  return (
    <>
      <Head>
        {fonts.map((href) => (
          <link key={href} rel="preload" href={href} as="font" crossOrigin="" />
        ))}
      </Head>
      <Header />
      <div className="mt-40">
        <Container>
          <div className="flex items-center justify-center">
            <div>{children}</div>
          </div>
        </Container>
      </div>

      <hr className="border border-b border-pink-500 w-3/4 mx-auto my-24 " />

      <Footer />
    </>
  );
}
