import * as prisma from "../integration/index";
import { CreatePostSchema } from "../types/CreatePostSchema";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import sharp, { bool } from "sharp";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

dotenv.config();

const bucketName = process.env.S3_BUCKET_NAME;
const region = process.env.S3_BUCKET_REGION;
const accessKeyId = process.env.S3_ACCESS_KEY;
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;

const s3 = new S3Client({
  region: region,
  credentials: {
    accessKeyId: accessKeyId!,
    secretAccessKey: secretAccessKey!,
  },
});
export async function GetPosts() {
  const posts = await prisma.GetPosts();

  for (const post of posts) {
    if (!post.picture) {
      // Skip this iteration if picture is null
      continue;
    }

    const getObjectParams = {
      Bucket: bucketName,
      Key: post.picture,
    };

    const command = new GetObjectCommand(getObjectParams);

    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
    post.picture = url;

    // Use the URL as needed
  }

  return posts;
}

export async function GetPostById(id: string) {
  const post = await prisma.GetPostById(id);

  if (post) {
    if (!post.picture) {
      post.picture = null; // Provide a default value or set to null if picture is null
    } else {
      const getObjectParams = {
        Bucket: bucketName,
        Key: post.picture,
      };
      const command = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
      post.picture = url;
    }
  }
  return post;
}

export async function PostReact(obj: any) {
  const reaction = await prisma.PostReact(obj);
  return reaction;
}

export async function GetReactionsByPostId(id: string) {
  const reactions = await prisma.GetReactionsByPostId(id);
  return reactions;
}

export async function CreatePost(data: CreatePostSchema, file: any) {
  const now = new Date();
  let imageName;

  if (file) {
    imageName = `${now.toISOString()}-${file.originalname}`;
    const resizedBuffer = await sharp(file.buffer).toBuffer();
    const buffer = await sharp(resizedBuffer).jpeg({ quality: 50 }).toBuffer();

    const params = {
      Bucket: bucketName,
      Key: imageName,
      Body: buffer,
      ContentType: file.mimetype,
    };
    const command = new PutObjectCommand(params);

    await s3.send(command);
  }

  const isAnonymous =
    typeof data.anonymous === "boolean"
      ? data.anonymous
      : data.anonymous === "true";

  const postData: CreatePostSchema = {
    ...data,
    created_at: now,
    updated_at: now,
    userEmail: data.userEmail,
    picture: imageName || null,
    anonymous: isAnonymous as boolean,
  };

  const post = await prisma.CreatePost(postData);

  return post;
}

export async function UpdatePosts(id: string, data: any) {
  const post = await prisma.UpdatePost(id, data);

  return post;
}

export async function DeletePosts(id: string) {
  const post = await prisma.DeletePost(id);

  return post;
}
