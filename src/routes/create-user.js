import User from "../models/user";

export default async function createUser(req, res, next) {
  const { user } = req.body;

  const createUser = await User.create({ user });

  res.status(200).json({
    createUser,
  });
}
