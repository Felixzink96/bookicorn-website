import { defineField, defineType } from 'sanity'

export const category = defineType({
  name: 'category',
  title: 'Kategorie',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'description',
      title: 'Beschreibung',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'color',
      title: 'Farbe',
      type: 'string',
      description: 'Hex-Farbe für die Kategorie Badge (z.B. #84cc16)',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
