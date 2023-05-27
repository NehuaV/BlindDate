import { CreatePostSchema } from "../types/CreatePostSchema";
import { PrismaClient } from "database";
const prisma = new PrismaClient();

export async function GetPosts() {
  const res = await prisma.post.findMany();
  return res;
}

export async function GetPostById(id: string) {
  const post = await prisma.post
    .findUnique({
      where: {
        id: id,
      },
    })
    .catch(() => {
      return null;
    });
  return post;
}

export async function CreatePost(data: CreatePostSchema) {
  const post = await prisma.post.create({ data: data }).catch((e: Error) => {
    console.log("error", e);
    return null;
  });
  return post;
}

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
