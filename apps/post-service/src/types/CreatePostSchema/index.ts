export type CreatePostSchema = {
  id: string;
  anonymous: boolean;
  title: string;
  content: string;
  picture_desc?: string | null;
  status: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
  topic?: string | null;
  userID: string;
  picture: string | null;
};
