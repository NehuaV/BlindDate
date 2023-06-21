import { ReactionType } from "database";
import { CreatePostSchema } from "../types/CreatePostSchema";
import { PrismaClient } from "database";
const prisma = new PrismaClient();

export async function GetPosts() {
  const res = await prisma.post.findMany({
    include: {
      author: true,
    },
  });
  return res;
}

export async function GetPostById(id: string) {
  const post = await prisma.post
    .findUnique({
      where: {
        id: id,
      },
      include: {
        author: true,
      },
    })
    .catch(() => {
      return null;
    });
  return post;
}

export async function CreatePost(data: CreatePostSchema) {
  const user = await prisma.user.findUnique({
    where: {
      email: data.userEmail,
    },
  });
  const post = await prisma.post
    .create({
      data: {
        title: data.title,
        content: data.content,
        picture_desc: data.picture_desc,
        anonymous: data.anonymous,
        status: data.status,
        userID: user!.id,
      },
    })
    .catch((e: Error) => {
      console.log("error", e);
      return null;
    });
  return post;
}

export async function PostReact(obj: any) {
  const user = await prisma.user.findUnique({
    where: {
      email: obj.userEmail,
    },
  });

  const reaction = await prisma.postReaction
    .upsert({
      where: {
        postId_userId: {
          postId: obj.postId,
          userId: user!.id,
        },
      },
      update: {
        reaction: obj.reaction,
      },
      create: {
        postId: obj.postId,
        userId: user!.id,
        reaction: obj.reaction,
      },
    })
    .then((res: any) => res)
    .catch((err: any) => console.log(err));

  return reaction;
}

export async function GetReactionsByPostId(id: string) {
  try {
    const likes = await prisma.postReaction.count({
      where: {
        postId: id as string,
        reaction: ReactionType.LIKE,
      },
    });

    const dislikes = await prisma.postReaction.count({
      where: {
        postId: id as string,
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

// const reactions = await prisma.postReaction
//   .findMany({
//     where: {
//       postId: id,
//     },
//   })
//   .catch(() => {
//     return null;
//   });
// return reactions;
// }

export async function UpdatePost(id: string, data: any) {
  const post = await prisma.post
    .update({
      where: {
        id: id,
      },
      data: data,
    })
    .catch(() => {
      return null;
    });
  return post;
}

export async function DeletePost(id: string) {
  const post = await prisma.post
    .delete({
      where: {
        id: id,
      },
    })
    .catch(() => {
      return null;
    });
  return post;
}
