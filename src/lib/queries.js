// src/lib/queries.js

export const getArtistBySlug = `
  *[_type == "artist" && slug.current == $slug][0] {
    name,
    location,
    bio,
    topImages[] {
      image {
        asset->{
          url
        }
      },
      caption,
      link
    },
    portfolioImages[] {
      image {
        asset->{
          url
        }
      },
      caption,
      link
    }
  }
`;


// Query for Exhibitions
export const getExhibitions = `
  *[_type == "exhibition"] | order(start asc) {
    _id,
    title,
    location,
    start,
    end,
    "slug": slug.current,
    description,
    images[]{
      asset->{ url }
    },
    pressRelease{
      asset->{ url }
    },
    artist->{
      name,
      "slug": slug.current
    }
  }
`;

export const getHomepage = `
  *[_type == "homepage"][0] {
    slides[] {
      image {
        asset->{
          url
        }
      },
      title,
      themeColor,
      ctaLabel,
      "slug": slug.current
    }
  }
`;

export const getNews = `
  *[_type == "news"] | order(fullDate desc) {
    _id,
    title,
    "slug": slug.current,
    number,
    shortDate,
    fullDate,
    year,
    video,
    videoDescription,
    buyText,
    buyLink,
    "thumbnail": thumbnail.asset->url,
    "gallery": gallery[].asset->url,
    descriptionTop,
    descriptionBottom
  }
`;

export const getNewsItemBySlug = (slug) => `
  *[_type == "news" && slug.current == "${slug}"][0] {
    _id,
    title,
    number,
    shortDate,
    fullDate,
    year,
    video,
    videoDescription,
    buyText,
    buyLink,
    "thumbnail": thumbnail.asset->url,
    "gallery": gallery[].asset->url,
    descriptionTop,
    descriptionBottom
  }
`;

export const getAbout = `*[_type == "about"][0]{
  content,
  shopLink,
  email,
  phone,
  hours,
  addresses,
  image {
    asset-> {
      url
    }
  }
}`;
