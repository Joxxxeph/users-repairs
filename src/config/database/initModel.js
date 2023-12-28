import {Repair} from "../../modules/repairs/repairs.model.js"
import {User} from "../../modules/users/users.model.js"

export const initModel = () => {
  User.hasMany(Repair);
  Repair.belongsTo(User);
}