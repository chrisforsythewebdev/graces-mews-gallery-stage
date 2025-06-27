export default {
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    {
      name: 'slides',
      title: 'Homepage Slides',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Background Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: Rule => Rule.required(),
            },
            {
              name: 'title',
              title: 'Title Text',
              type: 'string',
              validation: Rule => Rule.required(),
            },
            {
              name: 'ctaLabel',
              title: 'CTA Label',
              type: 'string',
              description: 'Text above the title (e.g. "Opening Exhibition", "Now Showing", etc.)',
              validation: Rule => Rule.required(),
            },
            {
              name: 'slug',
              title: 'Exhibition Slug',
              type: 'slug',
              description: 'Used to link to /exhibitions?expand=slug',
              options: {
                source: 'title',
                maxLength: 96,
              },
              validation: Rule => Rule.required(),
            },
            {
              name: 'themeColor',
              title: 'Theme Colour (Hex)',
              type: 'string',
              description: 'This hex value will control the title, CTA label, and navbar color (e.g. #FFFFFF)',
              validation: Rule =>
                Rule.regex(/^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/).error('Enter a valid hex colour like #000 or #ffffff'),
            },
          ],
        },
      ],
    },
  ],
};
