import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkBreaks from "remark-breaks";

interface TypewriterMarkdownProps {
  text: string;
  speed?: number;
  cursor?: boolean;
}

export default function TypewriterMarkdown({
  text,
  speed = 30,
  cursor = true,
}: TypewriterMarkdownProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(interval);
        setFinished(true);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <div className="flex">
      {!finished ? (
        // Durante a digitação → mostra texto puro
        <span>{displayedText}</span>
      ) : (
        // Quando terminar → renderiza com markdown
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{text.replace(/\n/g, "<br />")}</ReactMarkdown>
      )}
      {cursor && !finished && <span className="animate-pulse ml-1">|</span>}
    </div>
  );
}
