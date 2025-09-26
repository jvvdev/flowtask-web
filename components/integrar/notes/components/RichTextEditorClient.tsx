"use client";

import React, { useEffect, useRef } from "react";
import EditorJS, { OutputData, ToolConstructable } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import Paragraph from "@editorjs/paragraph";

interface RichTextEditorProps {
    data?: OutputData;
    onChange: (data: OutputData) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ data, onChange }) => {
    const editorRef = useRef<EditorJS | null>(null);
    const holderId = "editorjs-container";
    const [selectedBlockId, setSelectedBlockId] = React.useState<string | null>(null);

    useEffect(() => {
        let editor: EditorJS | null = null;

        if (!editorRef.current) {
            editor = new EditorJS({
                holder: holderId,
                placeholder: "Digite aqui...",
                tools: {
                    paragraph: {
                        class: Paragraph as unknown as ToolConstructable,
                    },
                    header: {
                        class: Header as unknown as ToolConstructable,
                        inlineToolbar: true,
                        config: {
                            levels: [1, 2, 3],  // níveis disponíveis
                            defaultLevel: 2,    // padrão H2
                            placeholder: "Digite o título...",
                        },
                        shortcut: "CMD+SHIFT+H", // opcional, atalho para adicionar header
                    },
                },
                data: data || { blocks: [] },
                async onChange(api) {
                    const content = await api.saver.save();
                    onChange(content);
                },
            });

            editorRef.current = editor;
        }

        return () => {
            if (editorRef.current && typeof editorRef.current.destroy === "function") {
                editorRef.current.destroy();
                editorRef.current = null;
            }
        };
    }, []);

    return (
        <div
            id={holderId}
            className="min-h-[400px] pr-2 py-2 w-full rounded-md"
        />
    );
};

export default RichTextEditor;
