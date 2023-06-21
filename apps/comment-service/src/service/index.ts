import * as prisma from "../integration/index";

export async function GetComments() {
  const comments = await prisma.GetComments();

  return comments;
}

export async function GetCommentById(id: string) {
  const comment = await prisma.GetCommentById(id);

  return comment;
}

export async function CommentReact(obj: any) {
  const reaction = await prisma.CommentReact(obj);
  return reaction;
}

export async function GetReactionsByCommentId(id: string) {
  const reactions = await prisma.GetReactionsByCommentId(id);

  return reactions;
}

export async function GetCommentsByPostId(id: string) {
  const comments = await prisma.GetCommentsByPostId(id);

  return comments;
}

export async function CreateComment(data: any) {
  const comment = await prisma.CreateComment(data);

  return comment;
}

export async function UpdateComments(id: string, data: any) {
  const comment = await prisma.UpdateComment(id, data);

  return comment;
}

export async function DeleteComments(id: string) {
  const comment = await prisma.DeleteComment(id);

  return comment;
}
