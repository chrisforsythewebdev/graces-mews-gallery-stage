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
      caption
    },
    portfolioImages[] {
      image {
        asset->{
          url
        }
      },
      caption
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
    artist->{
      name,
      "slug": slug.current
    }
  }
`;


