import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface CommentInputProps {
  onChange: (value: string) => void;
  handleSubmit: (value: string) => void;
}

export function CommentInput({ onChange, handleSubmit }: CommentInputProps) {
  const [newComment, setNewComment] = useState<string>("");
  const editableRef = useRef<HTMLDivElement | null>(null);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);

  useEffect(() => {
    if (editableRef.current) {
      editableRef.current.style.height = "auto";
      editableRef.current.style.height = `${editableRef.current.scrollHeight}px`;
    }
    onChange(newComment);
  }, [newComment, onChange]);

  const handleInputChange = (e: React.FormEvent<HTMLDivElement>) => {
    setNewComment(e.currentTarget.textContent || "");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (newComment.trim().length > 0) {
        handleSubmit(newComment);
        setNewComment("");
        setIsEmpty(false);
        if (editableRef.current) {
          editableRef.current.innerText = "";
        }
      } else {
        setIsEmpty(true);
      }
    }
  };

  const handleButtonClick = () => {
    if (newComment.trim().length > 0) {
      handleSubmit(newComment);
      setNewComment("");
      setIsEmpty(false);
      if (editableRef.current) {
        editableRef.current.innerText = "";
      }
    } else {
      setIsEmpty(true);
    }
  };

  return (
    <div className="relative w-full">
      <div
        ref={editableRef}
        contentEditable
        onInput={handleInputChange}
        onKeyDown={handleKeyDown}
        className={`min-h-[40px] w-full resize-none overflow-hidden rounded-lg border p-3 text-sm text-foreground ${
          isEmpty ? "border-red-500" : "border-muted-foreground"
        }`}
        style={{
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
          overflowY: "hidden",
          maxWidth: "100%",
          lineHeight: "1.5",
          paddingTop: "8px",
          paddingBottom: "8px",
        }}
        role="textbox"
        aria-placeholder="Type a message..."></div>
      <div
        className="absolute left-2 top-[22%] text-sm text-muted-foreground pointer-events-none flex items-center"
        style={{
          visibility: newComment ? "hidden" : "visible",
          transform: "translateY(-50%)",
        }}>
        Type a message...
      </div>
      <div className="flex justify-end mt-4">
        <Button onClick={handleButtonClick}>
          <Send className="size mr-2" />
          Post
        </Button>
      </div>
    </div>
  );
}
