// schemaTypes/exhibition.js
export default {
  name: 'exhibition',
  title: 'Exhibition',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 } },
    { name: 'artist', title: 'Artist', type: 'reference', to: [{ type: 'artist' }] },
    { name: 'start', title: 'Start Date', type: 'date' },
    { name: 'end', title: 'End Date', type: 'date' },
    { name: 'location', title: 'Location', type: 'string' },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image' }],
    },
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Italic', value: 'em' },
          ],
          marks: {
            decorators: [
              { title: 'Italic', value: 'em' },
              { title: 'Strong', value: 'strong' },
            ],
            annotations: [
              {
                name: 'link',
                title: 'Link',
                type: 'object',
                fields: [
                  {
                    name: 'href',
                    title: 'URL',
                    type: 'url',
                    validation: (Rule) =>
                      Rule.uri({
                        scheme: ['http', 'https', 'mailto', 'tel'],
                      }),
                  },
                  {
                    name: 'openInNewTab',
                    title: 'Open in new tab?',
                    type: 'boolean',
                    initialValue: true,
                  },
                ],
              },
            ],
          },
        },
      ],
    },    
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: ['current', 'upcoming', 'past'],
      },
    },
    {
      name: 'pressRelease',
      title: 'Press Release (PDF)',
      type: 'file',
      options: {
        accept: '.pdf',
      },
    },
  ],
};
