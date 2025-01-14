import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

interface CommentInputProps {
  onChange: (value: string) => void;
  handleSubmit: (value: string) => void;
}

export function CommentInput({ onChange, handleSubmit }: CommentInputProps) {
  const [newComment, setNewComment] = useState<string>("");
  const editableRef = useRef<HTMLDivElement | null>(null);

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
    if (e.key === "Enter") {
      if (e.shiftKey) {
        document.execCommand("insertLineBreak");
        e.preventDefault();
      } else {
        e.preventDefault();
        if (newComment.trim().length > 0) {
          handleSubmit(newComment);
          setNewComment("");
          if (editableRef.current) {
            editableRef.current.innerText = "";
          }
        }
      }
    }
  };

  const handleButtonClick = () => {
    if (newComment.trim().length > 0) {
      handleSubmit(newComment);
      setNewComment("");
      if (editableRef.current) {
        editableRef.current.innerText = "";
      }
    }
  };

  const cancelComment = () => {
    setNewComment("");
    if (editableRef.current) {
      editableRef.current.innerText = "";
    }
  };

  return (
    <div className="relative w-full">
      <div
        ref={editableRef}
        contentEditable
        onInput={handleInputChange}
        onKeyDown={handleKeyDown}
        className={`min-h-[40px] w-full resize-none overflow-hidden rounded-lg border p-3 text-sm text-foreground`}
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
        className="absolute left-3 top-1/2 text-sm text-muted-foreground pointer-events-none flex items-center"
        style={{
          visibility: newComment ? "hidden" : "visible",
          transform: "translateY(-50%)",
        }}>
        Add a comment...
      </div>
      {newComment.trim().length > 0 && (
        <div className="flex justify-end mt-4 gap-3">
          <Button variant="outline" onClick={cancelComment}>
            Cancel
          </Button>
          <Button onClick={handleButtonClick}>Comment</Button>
        </div>
      )}
    </div>
  );
}
