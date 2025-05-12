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
      type: 'text',
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
