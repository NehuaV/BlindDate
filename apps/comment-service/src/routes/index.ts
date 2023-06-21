import { Router } from "express";
import * as service from "../service/index";

export const CommentRouter = () => {
  const router = Router();

  // Static routes
  router.get("/", async (req, res) => {
    const comments = await service.GetComments();
    if (comments) {
      return res.json({ comments });
    } else {
      return res.status(404).json({ message: "No comments found" });
    }
  });

  router.get("/byPostID/:id", async (req, res) => {
    const comments = await service.GetCommentsByPostId(req.params.id);
    if (comments) {
      return res.json({ comments });
    } else {
      return res.status(404).end();
    }
  });

  router.post("/react", async (req, res) => {
    const reaction = await service.CommentReact(req.body);
    if (!reaction) {
      return res.status(404).json({ message: "reaction not created" });
    }
    return res.json({ reaction });
  });

  router.get("/reactions/:id", async (req, res) => {
    const reactions = await service.GetReactionsByCommentId(req.params.id);
    if (!reactions) {
      return res.status(404).json({ message: "reactions not found" });
    }
    return res.json({ reactions });
  });

  router.post("/", async (req, res) => {
    const comment = await service.CreateComment(req.body);
    if (!comment) {
      return res.status(404).json({ message: "comment not created" });
    }
    return res.json({ comment });
  });

  // Dynamic routes
  router
    .route("/:id")
    .get(async (req, res) => {
      const comment = await service.GetCommentById(req.params.id);
      if (!comment) {
        return res.status(404).json({ message: "comment not found" });
      }
      return res.json({ comment });
    })

    .put(async (req, res) => {
      const comment = await service.UpdateComments(req.params.id, req.body);
      if (!comment) {
        return res.status(404).json({ message: "comment not found" });
      }
      return res.json({ comment });
    })
    .delete(async (req, res) => {
      const comment = await service.DeleteComments(req.params.id);
      if (!comment) {
        return res.status(404).json({ message: "comment not found" });
      }
      return res.json({ comment });
    });

  // Middleware for dynamic routes
  router.param("id", (req, res, next, id) => {
    next();
  });

  return router;
};
