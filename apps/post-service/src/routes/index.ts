import { Router } from "express";
import * as service from "../service/index";
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
export const postRouter = () => {
  const router = Router();

  // Static routes
  router.get("/", async (req, res) => {
    const posts = await service.GetPosts();
    if (posts) {
      return res.json({ posts });
    } else {
      return res.status(404).json({ message: "No posts found" });
    }
  });
  router.post("/", upload.single("file"), async (req, res) => {
    const post = await service.CreatePost(req.body, req.file);
    if (!post) {
      return res.status(404).json({ message: "post not created" });
    }
    return res.json({ post });
  });
  // Dynamic routes
  router
    .route("/:id")
    .get(async (req, res) => {
      const post = await service.GetPostById(req.params.id);
      if (!post) {
        return res.status(404).json({ message: "post not found" });
      }
      return res.json({ post });
    })

    .put(async (req, res) => {
      const post = await service.UpdatePosts(req.params.id, req.body);
      if (!post) {
        return res.status(404).json({ message: "post not found" });
      }
      return res.json(post);
    })
    .delete(async (req, res) => {
      const post = await service.DeletePosts(req.params.id);
      if (!post) {
        return res.status(404).json({ message: "post not found" });
      }
      return res.json({ post });
    });

  // Middleware for dynamic routes
  router.param("id", (req, res, next, id) => {
    next();
  });

  return router;
};
