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
      <div className="w-full max-w-6xl px-4 md:px-0 mx-auto mt-2 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-12 ">
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
          <div className="text-sm space-y-2 md:space-y-4">
            <PortableText value={aboutData.content} />
          </div>

          {/* SHOP ONLINE button — Mobile only, above addresses */}
          <div className="flex justify-center md:hidden mt-4">
            <a
              href={aboutData.shopLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl font-gracesmews font-bold animate-flash-fade"
            >
              SHOP ONLINE
            </a>
          </div>

          {/* Addresses + Email + Shop button */}
          <div className="w-full flex flex-col md:flex-row md:items-start md:gap-8 text-gray-500 text-md">
            {/* Addresses + Email */}
            <div className="flex-1 flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-8 w-full">
                {aboutData.addresses?.map((addr, i) => (
                  <div key={i}>
                    <p className="font-gracesmews text-lg text-black">{addr.city}</p>
                    {addr.lines.map((line, j) => <p className="text-sm" key={j}>{line}</p>)}
                  </div>
                ))}
              </div>
              <a
                href={`mailto:${aboutData.email}`}
                className="text-gray-500 font-semibold text-md hover:underline"
              >
                {aboutData.email}
              </a>
              <a
                href="tel:+440203 740 6555"
                className="text-gray-500 font-semibold text-md hover:underline gap-0"
              >
                + 44 0203 740 6555
              </a>
            </div>

            {/* SHOP ONLINE Button */}
            <div className="hidden md:flex self-start">
              <a
                href={aboutData.shopLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl font-gracesmews font-bold animate-flash-fade whitespace-nowrap"
              >
                SHOP ONLINE
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
