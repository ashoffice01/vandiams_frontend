
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { CartProvider } from "./context/CartContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <CartProvider>
         <Navbar />
        {children}
         <Footer />
        </CartProvider>
  );
}
