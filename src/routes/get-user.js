import User from "../models/user";

export default async function getUser(req, res, next) {
  const { userId } = req.params;
  const user = await User.findOne({ _id: userId });
  console.log(user);
  res.status(200).json(user);
}
