import express from "express";
import {
  findAllUsers,
  createUser,
  findOneUser,
  updateUser,
  deleteUser,
  login,
} from "./users.controller.js";
import { protect, protectAccountOwner, validExistUser } from "./users.middleware.js";

export const router = express.Router();

router.post("/login", login);

router.route("/").get(protect, findAllUsers).post(createUser);

router.use(protect);
router.use('/:id', validExistUser)

router.route("/:id").get(findOneUser).patch(protectAccountOwner, updateUser).delete(protectAccountOwner, deleteUser);
