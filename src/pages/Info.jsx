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

  const aboutImage = aboutData.image
    ? urlFor(aboutData.image).width(1000).url()
    : shopImage;

  return (
    <Layout>
      <div className="w-full max-w-6xl px-4 md:px-0 mx-auto mt-2 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-12">
        
        {/* Mobile Image */}
        <div className="md:hidden w-full flex justify-center mb-6">
          <img
            src={aboutImage}
            alt="Gallery Shop"
            className="object-cover rounded"
            style={{ width: '100%', maxWidth: '520px' }}
          />
        </div>

        {/* Text + Addresses */}
        <div className="flex flex-col space-y-6 w-full max-w-md px-4 md:px-6">
          
          {/* Sanity Content */}
          <div className="text-sm space-y-2 md:space-y-4">
            <PortableText
              value={aboutData.content}
              components={{
                marks: {
                  link: ({ value, children }) => (
                    <a
                      href={value?.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline font-bold"
                    >
                      {children}
                    </a>
                  ),
                },
              }}
            />
          </div>

          {/* Addresses + Email */}
          <div className="w-full flex flex-col md:flex-row md:items-start md:gap-8 text-md">
            <div className="flex-1 flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-8 w-full">
                {aboutData.addresses?.map((addr, i) => (
                  <div key={i}>
                    <p className="font-gracesmews text-lg text-black">{addr.city}</p>
                    {addr.lines.map((line, j) => (
                      <p className="text-sm" key={j}>{line}</p>
                    ))}
                  </div>
                ))}
              </div>

              <div className="mt-2 text-sm">
                <a
                  href={`mailto:${aboutData.email}`}
                  className="block hover:underline"
                >
                  {aboutData.email}
                </a>
                {aboutData.phone && (
                  <a
                    href={`tel:${aboutData.phone.replace(/\s+/g, '')}`}
                    className="block hover:underline"
                  >
                    {aboutData.phone}
                  </a>
                )}
              </div>
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
