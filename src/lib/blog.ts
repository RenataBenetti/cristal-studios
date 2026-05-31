export const CATEGORIES = {
  'podcast-conteudo': {
    slug: 'podcast-conteudo',
    name: 'Podcast & Conteúdo',
    shortName: 'Podcast',
    description: 'Estratégia, formato, equipamentos, roteiro e bastidores de quem produz podcast de verdade.',
  },
} as const;

export type CategorySlug = keyof typeof CATEGORIES;

export const isCategorySlug = (slug: string): slug is CategorySlug =>
  Object.prototype.hasOwnProperty.call(CATEGORIES, slug);

export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
};

export const estimateReadingTime = (markdown: string): number => {
  const text = markdown.replace(/```[\s\S]*?```/g, '').replace(/[#>*_~\-]+/g, ' ');
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
};
