// schemaTypes/artist.js
export default {
    name: 'artist',
    title: 'Artist',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'name',
          maxLength: 96,
        },
      },
      {
        name: 'location',
        title: 'Location',
        type: 'string',
      },
      {
        name: 'bio',
        title: 'Biography',
        type: 'text',
      },
      {
        name: 'topImages',
        title: 'Top Images',
        type: 'array',
        of: [{
          type: 'object',
          fields: [
            { name: 'image', type: 'image', title: 'Image' },
            { name: 'caption', type: 'string', title: 'Caption' },
          ],
        }],
      },
      {
        name: 'portfolioImages',
        title: 'Portfolio Images',
        type: 'array',
        of: [{
          type: 'object',
          fields: [
            { name: 'image', type: 'image', title: 'Image' },
            { name: 'caption', type: 'string', title: 'Caption' },
          ],
        }],
      },
    ],
  }
  