import type { APIRoute } from 'astro';
import { getChurchId } from '../../lib/church';

const churchId = getChurchId();

const churchMeta: Record<string, { label: string; file: string }> = {
  rosario: { label: 'N. Sra. do Rosário (Pina)', file: 'src/data/rosario.json' },
  coracao: { label: 'Coração Imaculado (Brasília Teimosa)', file: 'src/data/coracao.json' },
};

const meta = churchMeta[churchId] ?? churchMeta.rosario;

const yaml = `backend:
  name: git-gateway
  branch: main

media_folder: "public/uploads"
public_folder: "/uploads"

local_backend: true

locale: "pt-br"

collections:
  - name: "noticias"
    label: "Notícias"
    folder: "src/content/noticias"
    create: true
    slug: "{{slug}}"
    identifier_field: "title"
    filter:
      field: church
      value: "${churchId}"
    fields:
      - { label: "Igreja", name: "church", widget: "hidden", default: "${churchId}" }
      - { label: "Título", name: "title", widget: "string" }
      - { label: "Descrição", name: "description", widget: "string", required: false }
      - { label: "Data", name: "pubDate", widget: "datetime" }
      - { label: "Categoria", name: "category", widget: "select", options: ["Avisos", "Eventos", "Datas Liturgicas", "Geral"], default: "Geral" }
      - { label: "Imagem", name: "image", widget: "image", required: false }
      - { label: "Conteúdo", name: "body", widget: "markdown" }

  - name: "grupos"
    label: "Grupos e Pastorais"
    folder: "src/content/grupos"
    create: true
    slug: "{{slug}}"
    identifier_field: "title"
    filter:
      field: church
      value: "${churchId}"
    fields:
      - { label: "Igreja", name: "church", widget: "hidden", default: "${churchId}" }
      - { label: "Nome", name: "title", widget: "string" }
      - { label: "Categoria", name: "category", widget: "string" }
      - { label: "Coordenador(a)", name: "coordinator", widget: "string" }
      - { label: "Descrição", name: "description", widget: "text", required: false }
      - { label: "Imagem", name: "image", widget: "image", required: false }
      - { label: "Ordem", name: "order", widget: "number", value_type: "int", min: 0, required: false }
      - { label: "Conteúdo", name: "body", widget: "markdown", required: false }

  - name: "formacao"
    label: "Formação"
    folder: "src/content/formacao"
    create: true
    slug: "{{slug}}"
    identifier_field: "title"
    filter:
      field: church
      value: "${churchId}"
    fields:
      - { label: "Igreja", name: "church", widget: "hidden", default: "${churchId}" }
      - { label: "Título", name: "title", widget: "string" }
      - { label: "Descrição", name: "description", widget: "string", required: false }
      - { label: "Data", name: "pubDate", widget: "datetime" }
      - { label: "Autor", name: "author", widget: "string", required: false }
      - { label: "Categoria", name: "category", widget: "select", options: ["Sacramentos", "Santos", "Liturgia", "Doutrina", "Oracoes", "Geral"], default: "Geral" }
      - { label: "Conteúdo", name: "body", widget: "markdown" }

  - name: "folhetos"
    label: "Folhetos (PDF)"
    folder: "src/content/folhetos"
    create: true
    slug: "{{slug}}"
    identifier_field: "title"
    filter:
      field: church
      value: "${churchId}"
    fields:
      - { label: "Igreja", name: "church", widget: "hidden", default: "${churchId}" }
      - { label: "Título", name: "title", widget: "string" }
      - { label: "Descrição", name: "description", widget: "string", required: false }
      - { label: "Data do folheto", name: "date", widget: "datetime" }
      - { label: "PDF", name: "pdf", widget: "file", allow_multiple: false }

  - label: "Configuração da Paróquia"
    name: "config"
    files:
      - label: "${meta.label}"
        name: "${churchId}"
        file: "${meta.file}"
        fields:
          - { label: "Nome completo", name: "name", widget: "string" }
          - { label: "Nome curto", name: "shortName", widget: "string" }
          - { label: "Endereço", name: "address", widget: "string" }
          - { label: "CEP", name: "cep", widget: "string" }
          - { label: "Telefone", name: "phone", widget: "string", required: false }
          - { label: "Email", name: "email", widget: "string", required: false }
          - { label: "WhatsApp (apenas números)", name: "whatsapp", widget: "string", required: false }
          - { label: "Imagem principal (topo do site)", name: "heroImage", widget: "image", required: false }
          - { label: "Tema - Primária", name: "theme.primary", widget: "string" }
          - { label: "Tema - Secundária", name: "theme.secondary", widget: "string" }
          - { label: "Tema - Destaque", name: "theme.accent", widget: "string" }
          - { label: "Tema - Fundo", name: "theme.background", widget: "string" }
          - { label: "Tema - Texto", name: "theme.text", widget: "string" }
          - { label: "Horários (JSON - editar com cuidado)", name: "schedule", widget: "object", required: false }
`;

export const GET: APIRoute = () => {
  return new Response(yaml, {
    headers: { 'Content-Type': 'text/yaml; charset=utf-8' },
  });
};
