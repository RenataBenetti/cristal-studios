<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html lang="pt-BR">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title><xsl:value-of select="/rss/channel/title"/> — Feed RSS</title>
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: 'Inter', -apple-system, sans-serif;
            background: #0a0a0a; color: #fff;
            line-height: 1.6; padding: 4rem 2rem;
          }
          .wrap { max-width: 760px; margin: 0 auto; }
          .tag {
            display: inline-block;
            font-size: 0.72rem; font-weight: 700;
            letter-spacing: 0.15em; text-transform: uppercase;
            color: #E8821A;
            background: rgba(232,130,26,0.1);
            border: 1px solid rgba(232,130,26,0.35);
            padding: 0.4rem 0.9rem; border-radius: 100px;
            margin-bottom: 1.5rem;
          }
          h1 { font-size: 2rem; font-weight: 800; line-height: 1.2; margin-bottom: 0.8rem; letter-spacing: -0.02em; }
          .lead { color: #aaa; margin-bottom: 2rem; font-size: 1.05rem; }
          .info {
            background: #181818; border: 1px solid #2a2a2a;
            border-radius: 12px; padding: 1.5rem;
            margin-bottom: 3rem; color: #aaa; font-size: 0.92rem;
          }
          .info strong { color: #fff; }
          .info code {
            background: rgba(232,130,26,0.12); color: #E8821A;
            padding: 0.15rem 0.5rem; border-radius: 4px;
            font-family: 'JetBrains Mono', ui-monospace, monospace;
            font-size: 0.88em; word-break: break-all;
          }
          h2 { font-size: 1.1rem; font-weight: 700; color: #888; margin-bottom: 1.5rem; letter-spacing: 0.04em; }
          .item {
            border-bottom: 1px solid #2a2a2a;
            padding: 1.5rem 0;
          }
          .item:last-child { border-bottom: none; }
          .item h3 { font-size: 1.15rem; font-weight: 700; margin-bottom: 0.5rem; }
          .item h3 a { color: #fff; text-decoration: none; }
          .item h3 a:hover { color: #E8821A; }
          .date { color: #666; font-size: 0.82rem; margin-bottom: 0.6rem; }
          .item p { color: #aaa; font-size: 0.95rem; }
          .back {
            display: inline-block; margin-top: 3rem;
            color: #888; text-decoration: none; font-size: 0.92rem;
          }
          .back:hover { color: #E8821A; }
        </style>
      </head>
      <body>
        <div class="wrap">
          <span class="tag">FEED RSS</span>
          <h1><xsl:value-of select="/rss/channel/title"/></h1>
          <p class="lead"><xsl:value-of select="/rss/channel/description"/></p>
          <div class="info">
            <strong>Como usar este feed:</strong><br/>
            Copie o link da barra de endereços e cole no seu leitor RSS preferido (Feedly, Inoreader, NetNewsWire). Você receberá novos artigos do Cristal Studios automaticamente. <br/><br/>
            URL do feed: <code><xsl:value-of select="/rss/channel/link"/>rss.xml</code>
          </div>
          <h2>Últimos artigos</h2>
          <xsl:for-each select="/rss/channel/item">
            <div class="item">
              <h3>
                <a hreflang="pt-BR" target="_blank">
                  <xsl:attribute name="href"><xsl:value-of select="link"/></xsl:attribute>
                  <xsl:value-of select="title"/>
                </a>
              </h3>
              <p class="date"><xsl:value-of select="pubDate"/></p>
              <p><xsl:value-of select="description"/></p>
            </div>
          </xsl:for-each>
          <a class="back" href="/blog">← Voltar para o blog</a>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
