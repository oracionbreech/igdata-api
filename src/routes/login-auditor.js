import Auditors from "../models/auditors";
import bcrypt from "bcrypt";

export default async function loginAuditor(req, res, next) {
  try {
    const { email, password } = req.body;
    const anAuditor = await Auditors.findOne({ email });
    const isAValidAuditor = bcrypt.compareSync(password, anAuditor.password);
    if (isAValidAuditor) {
      res.status(200).json(anAuditor);
    } else {
      res
        .status(400)
        .json({ error: "Email and Password Combination is Invalid" });
    }
  } catch (error) {
    res.status(400).json({
      error: "Error Occurred Logging In",
    });
  }
}
