"use client";

import dynamic from "next/dynamic";

export const RichTextEditor = dynamic(() => import("./RichTextEditorClient"), {
  ssr: false, // desativa renderização no servidor
});