import bcrypt from "bcryptjs";
import db from "../models/index";
const salt = bcrypt.genSaltSync(10);
const hashPassword = (password) => {
  let hashPassword = bcrypt.hashSync(password, salt);
  return hashPassword;
};
const checkEmailUser = async (email) => {
  const emailUser = await db.user.findOne({ where: { email: email } });
  if (emailUser) {
    return true;
  } else {
    return false;
  }
};

const checkPhoneUser = async (phone) => {
  const phoneUser = await db.user.findOne({ where: { phone: phone } });
  if (phoneUser) {
    return true;
  } else {
    return false;
  }
};
const getAllUser = async () => {
  try {
    let users = await db.user.findAll({
      attributes: [
        "id",
        "email",
        "userName",
        "phone",
        "address",
        "gender",
        "groupId",
      ],
      include: { model: db.group, attributes: ["id", "name", "des"] },
    });
    if (users) {
      return {
        EM: "User's info",
        EC: 1,
        DT: users,
      };
    } else {
      return {
        EM: "User's info null",
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
const getAllUserByPagination = async (page, limit) => {
  try {
    let offset = (page - 1) * limit;
    let { count, rows } = await db.user.findAndCountAll({
      offset: offset,
      limit: limit,
      attributes: [
        "id",
        "email",
        "userName",
        "phone",
        "address",
        "gender",
        "groupId",
      ],
      include: { model: db.group, attributes: ["id", "name", "des"] },
      order: [["id", "DESC"]],
    });
    let totalPages = Math.ceil(count / limit);
    let data = {
      totalRows: count,
      totalPages: totalPages,
      users: rows,
    };
    return {
      EM: "Get user data with pagination success",
      EC: 1,
      DT: data,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrong from service",
      EC: -2,
      DT: "",
    };
  }
};
const updateUser = async (data) => {
  try {
    let { id, email, userName, phone, address, gender, groupId } = data;
    // check email/phone are exist
    // let isEmailExist = await checkEmailUser(email);
    // if (isEmailExist === true) {
    //   return {
    //     EM: "The email is exist",
    //     EC: 1,
    //     DT: "",
    //   };
    // }
    // let isPhoneExist = await checkPhoneUser(phone);
    // if (isPhoneExist === true) {
    //   return {
    //     EM: "The phone is exist",
    //     EC: 1,
    //     DT: "",
    //   };
    // }
    if (!groupId) {
      return {
        EM: "Error with empty group ",
        EC: 1,
        DT: "group",
      };
    }
    let userData = await db.user.update(
      {
        id: id,
        email: email,
        userName: userName,
        phone: phone,
        address: address,
        gender: gender,
        groupId: groupId,
      },
      {
        where: {
          id: id,
        },
      }
    );
    if (userData) {
      return {
        EM: "Update user's info successfully",
        EC: 0,
        DT: userData,
      };
    } else {
      return {
        EM: "User's info null",
        EC: 1,
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
const createNewUser = async (data) => {
  try {
    let { userName, email, phone, password, gender, address, groupId } = data;
    // check email/phone are exist
    let isEmailExist = await checkEmailUser(email);
    if (isEmailExist === true) {
      return {
        EM: "The email is exist",
        EC: 1,
        DT: "email",
      };
    }
    let isPhoneExist = await checkPhoneUser(phone);
    if (isPhoneExist === true) {
      return {
        EM: "The phone is exist",
        EC: 1,
        DT: "phone",
      };
    }
    if (password && password.length < 3) {
      return {
        EM: "The password must have more than 3 letters",
        EC: 1,
        DT: "password",
      };
    }
    //hash user password
    let hashPasswordUser = await hashPassword(password);
    //create new user
    let dataUser = await db.user.create({
      email: email,
      password: hashPasswordUser,
      userName: userName,
      phone: phone,
      gender: gender,
      address: address,
      groupId: groupId,
    });
    return {
      EM: "Create new user successfully",
      EC: 0,
      DT: dataUser,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrong from service",
      EC: -2,
      DT: "",
    };
  }
};
const deleteUser = async (userId) => {
  try {
    let { id } = userId;
    let user = await db.user.findOne({
      where: { id: id },
    });
    if (user) {
      await db.user.destroy({ where: { id: id } });
      return {
        EM: "Delete user successfully",
        EC: 1,
        DT: "",
      };
    } else {
      return {
        EM: "user isn't exist",
        EC: 0,
        DT: "",
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
const getUserById = async (userId) => {
  try {
    let { id } = userId;
    let user = await db.user.findOne({
      where: { id: id },
      attributes: {
        exclude: ["password"],
      },
    });
    if (user) {
      return {
        EM: "User's info",
        EC: 1,
        DT: user,
      };
    } else {
      return {
        EM: "User's info null",
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

module.exports = {
  getAllUser,
  updateUser,
  createNewUser,
  deleteUser,
  getUserById,
  getAllUserByPagination,
};
