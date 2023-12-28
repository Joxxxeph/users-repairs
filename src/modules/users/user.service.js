import { User } from "./users.model.js";

User;

export class UserService {
  static async findOne(id) {
    return await User.findOne({
      where: {
        id,
        status: "available",
      },
    });
  }

  static async findAll() {
    return await User.findAll({
      where: {
        status: "available",
      },
    });
  }

  static async create(data) {
    return await User.create(data);
  }

  static async update(user, data) {
    return await user.update(data);
  }

  static async delete(user) {
    return await user.update({ status: "disable" });
  }

  static async findOneMyEmail(email) {
    return await User.findOne({
      where: {
        email,
        status: 'available'
      }
    });
  }
}
