// schemaTypes/news.js
export default {
    name: 'news',
    title: 'News',
    type: 'document',
    fields: [
      { name: 'title', title: 'Title', type: 'string' },
      { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 } },
      { name: 'number', title: 'Number', type: 'string' },
      { name: 'shortDate', title: 'Date', type: 'string' },
      { name: 'fullDate', title: 'Full Date', type: 'date' },
      { name: 'year', title: 'Year', type: 'number' },
      { name: 'thumbnail', title: 'Thumbnail', type: 'image', options: { hotspot: true } },
      {
        name: 'gallery',
        title: 'Gallery',
        type: 'array',
        of: [{ type: 'image' }]
      },
      { name: 'video', title: 'Video URL', type: 'url' },
      {
        name: 'descriptionTop',
        title: 'Top Description',
        type: 'array',
        of: [{ type: 'block' }]
      },
      {
        name: 'descriptionBottom',
        title: 'Bottom Description',
        type: 'array',
        of: [{ type: 'block' }]
      },
      { name: 'videoDescription', title: 'Video Description', type: 'string' },
      { name: 'buyText', title: 'Buy Text', type: 'string' },
      { name: 'buyLink', title: 'Buy Link', type: 'url' },
    ]
  }
  