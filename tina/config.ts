import { defineConfig } from 'tinacms';

export default defineConfig({
  branch: 'main',
  clientId: process.env.TINA_CLIENT_ID ?? '',
  token: process.env.TINA_TOKEN ?? '',
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: 'blog-images',
      publicFolder: 'public',
    },
  },
  schema: {
    collections: [
      {
        name: 'blog',
        label: 'Posts do Blog',
        path: 'src/content/blog',
        format: 'md',
        ui: {
          filename: {
            label: 'Slug (URL do post)',
            slugify: values =>
              (values?.title ?? '')
                .toLowerCase()
                .normalize('NFD')
                .replace(/[̀-ͯ]/g, '')
                .replace(/[^a-z0-9\s-]/g, '')
                .trim()
                .replace(/\s+/g, '-'),
          },
        },
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Título',
            required: true,
          },
          {
            type: 'string',
            name: 'excerpt',
            label: 'Resumo (aparece na listagem do blog)',
            required: true,
            ui: { component: 'textarea' },
          },
          {
            type: 'image',
            name: 'coverImage',
            label: 'Imagem de capa (aparece na listagem do blog)',
          },
          {
            type: 'string',
            name: 'coverAlt',
            label: 'Descrição da imagem de capa (acessibilidade e Google)',
          },
          {
            type: 'string',
            name: 'category',
            label: 'Categoria',
            required: true,
            options: [
              { value: 'podcast-conteudo', label: 'Podcast & Conteúdo' },
            ],
          },
          {
            type: 'datetime',
            name: 'publishedAt',
            label: 'Data de Publicação',
            required: true,
            ui: {
              dateFormat: 'DD/MM/YYYY',
              timeFormat: false,
            },
          },
          {
            type: 'string',
            name: 'author',
            label: 'Autor',
          },
          {
            type: 'boolean',
            name: 'featured',
            label: 'Post em destaque?',
          },
          {
            type: 'string',
            name: 'tags',
            label: 'Tags',
            list: true,
            ui: {
              component: 'tags',
            },
          },
          {
            type: 'object',
            name: 'seo',
            label: 'SEO',
            fields: [
              {
                type: 'string',
                name: 'title',
                label: 'Título SEO (aparece na aba do navegador e Google)',
              },
              {
                type: 'string',
                name: 'description',
                label: 'Descrição SEO (aparece no Google)',
                ui: { component: 'textarea' },
              },
            ],
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Conteúdo do Post',
            isBody: true,
          },
        ],
      },
    ],
  },
});
