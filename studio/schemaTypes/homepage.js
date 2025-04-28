// schemas/homepage.js
export default {
    name: 'homepage',
    title: 'Homepage',
    type: 'document',
    fields: [
      {
        name: 'featuredExhibitions',
        title: 'Featured Exhibitions',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'exhibition' }] }],
        description: 'Select exhibitions to highlight on the homepage in order',
      },
    ],
  }
  