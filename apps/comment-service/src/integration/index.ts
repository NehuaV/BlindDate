import { ReactionType } from "database";
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

export async function CommentReact(obj: any) {
  const user = await prisma.user.findUnique({
    where: {
      email: obj.userEmail,
    },
  });

  const reaction = await prisma.commentReaction
    .upsert({
      where: {
        commentId_userId: {
          commentId: obj.commentId,
          userId: user!.id,
        },
      },
      update: {
        reaction: obj.reaction,
      },
      create: {
        commentId: obj.commentId,
        userId: user!.id,
        reaction: obj.reaction,
      },
    })
    .then((res: any) => res)
    .catch((err: any) => console.log(err));
  return reaction;
}

export async function GetReactionsByCommentId(id: string) {
  try {
    const likes = await prisma.commentReaction.count({
      where: {
        commentId: id as string,
        reaction: ReactionType.LIKE,
      },
    });

    const dislikes = await prisma.commentReaction.count({
      where: {
        commentId: id as string,
        reaction: ReactionType.DISLIKE,
      },
    });

    return {
      likes: likes,
      dislikes: dislikes,
    };
  } catch (error) {
    return null;
  }
}

export async function GetCommentsByPostId(id: string) {
  const comments = await prisma.comment
    .findMany({
      where: {
        postID: id,
      },
      include: {
        likes: true,
        user: true,
      },
    })
    .catch(() => {
      return null;
    });
  return comments;
}

export async function CreateComment(data: any) {
  const user = await prisma.user.findUnique({
    where: {
      email: data.userEmail,
    },
  });

  const comment = await prisma.comment
    .create({
      data: {
        postID: data.postID,
        userId: user!.id,
        content: data.content,
      },
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
