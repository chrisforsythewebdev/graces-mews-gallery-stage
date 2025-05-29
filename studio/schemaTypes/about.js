export default {
    name: 'about',
    title: 'About Page',
    type: 'document',
    fields: [
      {
        name: 'content',
        title: 'Main Content',
        type: 'array',
        of: [
            {
            type: 'block',
            marks: {
                decorators: [
                { title: 'Strong', value: 'strong' },
                { title: 'Emphasis', value: 'em' },
                ],
                annotations: [
                {
                    name: 'link',
                    type: 'object',
                    title: 'External Link',
                    fields: [
                    {
                        name: 'href',
                        type: 'url',
                        title: 'URL',
                    }
                    ]
                }
                ]
            }
            }
        ]
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
        name: 'phone',
        title: 'Phone Number',
        type: 'string',
        validation: Rule =>
          Rule.regex(/^\+?[0-9\s\-().]{7,}$/, {
            name: 'phone number',
            invert: false,
          }).warning('Should be a valid phone number'),
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
  