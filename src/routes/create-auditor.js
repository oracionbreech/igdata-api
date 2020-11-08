import Auditors from "../models/auditors";
import bcrypt from "bcrypt";

export default async function createAuditors(req, res, next) {
  try {
    const { email, password } = req.body;
    const findAnAuditor = Auditors.find({ email: email });
    if ((await findAnAuditor).length > 0) {
      res.status(401).json({ error: "Email Already Exists" });
    } else {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const createAuditor = await Auditors.create({
        email,
        password: hashedPassword,
      });
      res.status(200).json(createAuditor);
    }
  } catch (error) {
    res.status(400).json(error);
  }
}
