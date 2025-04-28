// schemaTypes/exhibition.js
export default {
    name: 'exhibition',
    title: 'Exhibition',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'title',
          maxLength: 96,
        },
      },
      {
        name: 'artist',
        title: 'Artist',
        type: 'reference',
        to: [{ type: 'artist' }],
      },
      {
        name: 'location',
        title: 'Location',
        type: 'string',
      },
      {
        name: 'startDate',
        title: 'Start Date',
        type: 'datetime',
      },
      {
        name: 'endDate',
        title: 'End Date',
        type: 'datetime',
      },
      {
        name: 'images',
        title: 'Exhibition Images',
        type: 'array',
        of: [{ type: 'image' }],
        options: {
          layout: 'grid',
        },
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
          layout: 'radio',
        },
        initialValue: 'current',
      },
    ],
  }
  