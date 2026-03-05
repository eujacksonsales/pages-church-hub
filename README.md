# Sites das Paróquias Católicas

Dois sites de paróquias católicas (N. Sra. do Rosário - Pina e Coração Imaculado de Maria - Brasília Teimosa) gerados a partir de uma única base de código com Astro.

## Funcionalidades

- **Notícias** – Canal de notícias com categorias e badge "Novo" para publicações recentes
- **Horários** – Missas, batismo, catequese (dados em `src/data/rosario.json` e `src/data/coracao.json`)
- **Folheto litúrgico** – Leituras do dia via API, com seletor de data e link para Canção Nova
- **Grupos e pastorais** – Organograma por categoria com coordenadores
- **Formação** – Artigos educativos (Sacramentos, Santos, Liturgia, etc.)
- **Contato** – Endereço, mapa, WhatsApp
- **Admin** – Decap CMS em `/admin` para edição visual (com Netlify Identity)
- **Temas** – Cores por igreja definidas no config de cada uma

## Desenvolvimento

```bash
npm install
npm run dev
```

Por padrão o site da **N. Sra. do Rosário** é exibido. Para ver o site do **Coração Imaculado**:

```bash
# Windows (PowerShell)
$env:CHURCH_ID="coracao"; npm run dev

# Linux/macOS
CHURCH_ID=coracao npm run dev
```

## Build para deploy

Cada igreja é publicada separadamente, definindo a variável `CHURCH_ID` no ambiente de build:

**Site Rosário (Pina):**
```bash
$env:CHURCH_ID="rosario"; npm run build
# ou no Netlify: variável CHURCH_ID = rosario
```

**Site Coração Imaculado:**
```bash
$env:CHURCH_ID="coracao"; npm run build
# ou no Netlify: variável CHURCH_ID = coracao
```

A pasta de publicação é `dist/`.

## Deploy no Netlify

1. Conecte o repositório ao Netlify.
2. Crie **dois sites** (ou duas branches/contextos), um para cada paróquia.
3. Em cada site, em **Site settings > Environment variables**, adicione:
   - **Site 1:** `CHURCH_ID` = `rosario`
   - **Site 2:** `CHURCH_ID` = `coracao`
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Ative o **Netlify Identity** e o **Git Gateway** para usar o painel em `/admin`.

## Estrutura

- `src/content/noticias/` – Notícias (Markdown, campo `church` define a paróquia)
- `src/content/grupos/` – Grupos e pastorais
- `src/content/formacao/` – Artigos de formação
- `src/data/rosario.json` – Nome, endereço, horários e tema da N. Sra. do Rosário
- `src/data/coracao.json` – Idem para Coração Imaculado
- `public/admin/` – Decap CMS (entrada e `config.yml`)

## WhatsApp

Preencha o campo `whatsapp` em `src/data/rosario.json` e `src/data/coracao.json` (apenas números, com DDD). O botão flutuante e a página de contato passam a usar esse número.
