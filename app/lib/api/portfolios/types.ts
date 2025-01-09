import { UUID } from "crypto";

export type Portfolio = {
    pid: UUID;
    created_at: string | null;
    uid: string;
    likeCount: number | null;
    tags: object[] | null;
    replies: string[] | null;
    image: ImageBitmap;
    name: string;
  };
  