export default {
    name: 'about',
    title: 'About Page',
    type: 'document',
    fields: [
      {
        name: 'content',
        title: 'Main Content',
        type: 'array',
        of: [{ type: 'block' }],
      },
      {
        name: 'shopLink',
        title: 'Shop Button URL',
        type: 'url',
      },
      {
        name: 'email',
        title: 'Contact Email',
        type: 'string',
      },
      {
        name: 'addresses',
        title: 'Addresses',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              { name: 'city', title: 'City', type: 'string' },
              { name: 'lines', title: 'Address Lines', type: 'array', of: [{ type: 'string' }] },
            ],
          },
        ],
      },
      {
        name: 'image',
        title: 'About Page Image',
        type: 'image',
        options: { hotspot: true },
      },
    ],
  };
  