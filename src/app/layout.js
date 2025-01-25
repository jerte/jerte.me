// TODO pick font and apply
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// site root variables
const site_title = 'jerte dot me';
const site_msg = 'Welcome to my blank website!';

export const metadata = {
  title: site_title,
  description: "personal website of @jerte on github dot com",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
		<div className="artboard">
		  <div className="card h-dvh flex p-10 text-center">
		    <div className="card-body">
              
		  	<div className="card-title justify-center">
		    	  <h1 className="text-xl">{`${site_title}`}</h1>
		      </div>
	  	  	<h2 className="text-2xl">
	      	  {`${site_msg}`}
	  	  	</h2>

		      {children}
		    
		    </div>
		  </div>
        </div>
	  </body>
    </html>
  );
}
