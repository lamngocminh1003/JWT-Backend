import loginRegister from "../service/loginRegister";
const testAPI = (req, res) => {
  return res.status(200).json({ message: "ok", data: "test api" });
};
const handleRegister = async (req, res) => {
  try {
    let { userName, email, phone, password } = req.body;
    if (!userName || !email || !phone || !password) {
      return res
        .status(200)
        .json({ EM: "Missing required parameters", EC: "1", DT: "" });
    }
    //service
    let data = await loginRegister.registerService(req.body);
    return res.status(200).json({ EM: data.EM, EC: data.EC, DT: data.DT });
  } catch (error) {
    return res.status(500).json({ EM: "error from server", EC: "-1", DT: "" });
  }
};
module.exports = { testAPI, handleRegister };
