// editorUtils.ts

import TurndownService from 'turndown';
import EditorJsToHtml from 'editorjs-html';

// 1. Configura o parser de JSON do Editor.js para HTML
const editorJsToHtml = EditorJsToHtml({
    // Aqui você pode adicionar lógica de renderização customizada se usar blocos não padrões
});

// 2. Configura o conversor de HTML para Markdown
const turndownService = new TurndownService({
    headingStyle: 'atx', // Usar # para cabeçalhos Markdown (## h2)
    hr: '---',
    bulletListMarker: '-', // Usar - para listas não ordenadas
});

/**
 * Converte o JSON do Editor.js para uma string Markdown.
 * @param blocks - O array de blocos (JSON) retornado pelo Editor.js.
 * @returns A string final em formato Markdown.
 */
export function convertEditorJsToMarkdown(blocks: any[]): string {
    if (!blocks || blocks.length === 0) {
        return "";
    }

    // A. JSON para HTML
    const htmlString = editorJsToHtml.parse(blocks).join('\n');

    // B. HTML para Markdown
    const markdownString = turndownService.turndown(htmlString);

    return markdownString;
}