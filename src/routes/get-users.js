import User from "../models/user";

export default async function getUsers(req, res, next) {
  const users = await User.find().catch((err) => res.status(500).json(err));

  res.status(200).json(users);
}
