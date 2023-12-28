import { DataTypes } from "sequelize";

import { sequelize } from "./../../config/database/database.js";

export const Repair = sequelize.define("repairs", {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  motorsNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descriptions: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "user_id",
  },
  status: {
    type: DataTypes.ENUM("pending", "completed", "cancelled"),
    allowNull: false,
    defaultValue: "pending",
  },
});
