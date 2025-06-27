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
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'image',
                title: 'Image',
                type: 'image',
                options: {
                  hotspot: true,
                },
              },
              {
                name: 'caption',
                title: 'Caption',
                type: 'string',
              },
              {
                name: 'link',
                title: 'Link (optional)',
                type: 'url',
                description: 'Optional link for image and caption',
              },
            ],
          },
        ],
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
  