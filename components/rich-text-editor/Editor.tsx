/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";

import { Menubar } from "./Menubar";

export function RichTextEditor({ field }: { field: any }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    immediatelyRender: false,

    editorProps: {
      attributes: {
        class:
          "min-h-[200px] p-4 focus:outline-none prose prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert !max-w-none !w-full",
      },
    },

    onUpdate: ({ editor }) => {
      field.onChange(JSON.stringify(editor.getJSON()));
    },

    content: field.value
      ? JSON.parse(field.value)
      : { type: "doc", content: [] },
  });

  return (
    <div className="w-full border border-input rounded-lg overflow-hidden">
      <Menubar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
