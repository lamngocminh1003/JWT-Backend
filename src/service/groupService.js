import db from "../models/index";

const getAllGroups = async () => {
  try {
    let groups = await db.group.findAll({ order: [["des", "ASC"]] });
    if (groups) {
      return {
        EM: "groups's info",
        EC: 1,
        DT: groups,
      };
    } else {
      return {
        EM: "groups's info null",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrong from service",
      EC: -2,
      DT: "",
    };
  }
};
const groupService = {
  getAllGroups,
};

export default groupService;
