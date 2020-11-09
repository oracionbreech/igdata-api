import User from "../models/user";

export default async function createUser(req, res, next) {
  const { name } = req.body;
  const createUser = await User.create({ name });
  res.status(200).json({
    createUser,
  });
}
