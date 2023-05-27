import { PrismaClient } from "database";
const prisma = new PrismaClient();

export async function GetComments() {
  const comments = await prisma.comment.findMany();
  return comments;
}

export async function GetCommentById(id: string) {
  const comment = await prisma.comment
    .findUnique({
      where: {
        id: id,
      },
    })
    .catch(() => {
      return null;
    });
  return comment;
}

export async function GetCommentsByPostId(id: string) {
  const comments = await prisma.comment
    .findMany({
      where: {
        postID: id,
      },
      include: {
        likes: true,
      },
    })
    .catch(() => {
      return null;
    });
  return comments;
}

export async function CreateComment(data: any) {
  const comment = await prisma.comment
    .create({
      data: data,
    })
    .catch(() => {
      return null;
    });
  return comment;
}

export async function UpdateComment(id: string, data: any) {
  const comment = await prisma.comment
    .update({
      where: {
        id: id,
      },
      data: data,
    })
    .catch(() => {
      return null;
    });
  return comment;
}

export async function DeleteComment(id: string) {
  const comment = await prisma.comment
    .delete({
      where: {
        id: id,
      },
    })
    .catch(() => {
      return null;
    });
  return comment;
}
