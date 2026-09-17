<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="utf-8" indent="yes" doctype-system="about:legacy-compat" />
  <xsl:template match="/">
    <html lang="es-AR">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <title><xsl:value-of select="/rss/channel/title" /> · RSS</title>
        <style>
          :root { --paper: #FBF7F0; --ink: #15171A; --muted: #5C5852; --accent: #A8421F; }
          html, body { margin: 0; padding: 0; background: var(--paper); color: var(--ink); font-family: Georgia, serif; }
          .wrap { max-width: 720px; margin: 0 auto; padding: 48px 24px; }
          h1 { font-size: 32px; margin: 0 0 8px; font-weight: 500; letter-spacing: -0.01em; }
          .lede { color: var(--muted); margin: 0 0 32px; }
          .item { padding: 20px 0; border-top: 1px solid #E5DFD0; }
          .item h2 { font-size: 18px; margin: 0 0 6px; font-weight: 500; }
          .item a { color: var(--ink); text-decoration: none; }
          .item a:hover { color: var(--accent); }
          .item .meta { font-size: 12px; color: var(--muted); letter-spacing: 0.06em; text-transform: uppercase; }
          .item p { margin: 8px 0 0; line-height: 1.55; color: var(--ink); }
          .pill { display: inline-block; padding: 2px 8px; border-radius: 999px; border: 1px solid var(--ink); font-size: 11px; text-transform: uppercase; letter-spacing: 0.16em; }
        </style>
      </head>
      <body>
        <div class="wrap">
          <h1><xsl:value-of select="/rss/channel/title" /></h1>
          <p class="lede"><xsl:value-of select="/rss/channel/description" /></p>
          <p class="pill" style="margin-bottom:32px">RSS · Feed XML</p>
          <xsl:for-each select="/rss/channel/item">
            <div class="item">
              <p class="meta"><xsl:value-of select="pubDate" /></p>
              <h2><a href="{link}"><xsl:value-of select="title" /></a></h2>
              <p><xsl:value-of select="description" /></p>
            </div>
          </xsl:for-each>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
