import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import shopImage from '../assets/images/shop.jpeg';
import { client } from '../lib/client';
import { getAbout } from '../lib/queries';
import { PortableText } from '@portabletext/react';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

export default function Info() {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    client.fetch(getAbout).then(setAboutData);
  }, []);

  if (!aboutData) return null;

  const aboutImage = aboutData.image ? urlFor(aboutData.image).width(1000).url() : shopImage;

  return (
    <Layout>
      <div className="w-full max-w-6xl px-4 md:px-0 mx-auto mt-2 md:mt-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Mobile Image */}
        <div className="md:hidden w-full flex justify-center mb-6">
          <img
            src={aboutImage}
            alt="Gallery Shop"
            className="object-cover rounded"
            style={{ width: '100%', maxWidth: '520px' }}
          />
        </div>

        {/* Text + Addresses + Button */}
        <div className="flex flex-col space-y-6">
          {/* Sanity Content */}
          <div className="text-md space-y-4">
            <PortableText value={aboutData.content} />
          </div>

          {/* SHOP ONLINE button — Mobile only, above addresses */}
          <div className="flex justify-center md:hidden mt-4">
            <a
              href={aboutData.shopLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black text-white font-bold rounded-full w-32 h-32 flex items-center justify-center text-center"
            >
              SHOP<br />ONLINE
            </a>
          </div>

          {/* Addresses + Email + Shop button */}
          <div className="w-full flex flex-col md:flex-row md:justify-between md:items-start text-gray-500 text-md gap-8">
            <div className="flex flex-col w-full gap-4">
              {/* Addresses */}
              <div className="grid grid-cols-2 gap-8 w-full">
                {aboutData.addresses?.map((addr, i) => (
                  <div key={i}>
                    <p className="font-gracesmews text-lg text-black">{addr.city}</p>
                    {addr.lines.map((line, j) => <p key={j}>{line}</p>)}
                  </div>
                ))}
              </div>

              {/* Email */}
              <a
                href={`mailto:${aboutData.email}`}
                className="text-gray-500 font-semibold text-md hover:underline"
              >
                {aboutData.email}
              </a>
            </div>

            {/* SHOP ONLINE Button - Unified */}
            <div className="hidden md:flex mt-4 md:mt-0 md:ml-8 shrink-0">
            <a
                href={aboutData.shopLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black text-white font-bold rounded-full w-32 h-32 flex items-center justify-center text-center"
              >
                SHOP<br />ONLINE
              </a>
            </div>
          </div>
        </div>

        {/* Desktop Image */}
        <div className="hidden md:block w-full">
          <img
            src={aboutImage}
            alt="Gallery Shop"
            className="w-full h-auto object-cover"
            style={{ maxHeight: '476px' }}
          />
        </div>
      </div>
    </Layout>
  );
}
