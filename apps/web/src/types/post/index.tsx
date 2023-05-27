export type PostSchema = {
  id: string;
  anonymous: boolean;
  title: string;
  content: string;
  picture?: string;
  picture_desc?: string;
  status: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
  topic?: string;
  authorUsername: string;
  userID: string;
};
