// tina/config.ts
import { defineConfig } from "tinacms";
var config_default = defineConfig({
  branch: "main",
  clientId: process.env.TINA_CLIENT_ID ?? "",
  token: process.env.TINA_TOKEN ?? "",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "blog-images",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        name: "blog",
        label: "Posts do Blog",
        path: "src/content/blog",
        format: "md",
        ui: {
          filename: {
            label: "Slug (URL do post)",
            slugify: (values) => (values?.title ?? "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-")
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "T\xEDtulo",
            required: true
          },
          {
            type: "string",
            name: "excerpt",
            label: "Resumo (aparece na listagem do blog)",
            required: true,
            ui: { component: "textarea" }
          },
          {
            type: "string",
            name: "category",
            label: "Categoria",
            required: true,
            options: [
              { value: "podcast-conteudo", label: "Podcast & Conte\xFAdo" }
            ]
          },
          {
            type: "datetime",
            name: "publishedAt",
            label: "Data de Publica\xE7\xE3o",
            required: true,
            ui: {
              dateFormat: "DD/MM/YYYY"
            }
          },
          {
            type: "string",
            name: "author",
            label: "Autor"
          },
          {
            type: "boolean",
            name: "featured",
            label: "Post em destaque?"
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
            ui: {
              component: "tags"
            }
          },
          {
            type: "object",
            name: "seo",
            label: "SEO",
            fields: [
              {
                type: "string",
                name: "title",
                label: "T\xEDtulo SEO (aparece na aba do navegador e Google)"
              },
              {
                type: "string",
                name: "description",
                label: "Descri\xE7\xE3o SEO (aparece no Google)",
                ui: { component: "textarea" }
              }
            ]
          },
          {
            type: "rich-text",
            name: "body",
            label: "Conte\xFAdo do Post",
            isBody: true
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
