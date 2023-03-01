const User = require("../models/userModel");

module.exports = {
    //Lấy tất cả User
    getAllUserService: async () => {
        let result = await User.find({});
        return result;
    },


    //Lấy chi tiết 1 User
    getAUserService: async (dataParams) => {
        let result = await User.find({ _id: dataParams.id });
        return result;
    },


    //Tạo mới User
    createUserService: async (dataBody) => {
        const { username, email, password, role } = dataBody
        let result = await User.create({ username, email, password, role });

        return result;
    },


    //Sửa User
    updateUserService: async (dataBody, dataParams) => {
        const { username, email, password, role } = dataBody;

        let result = await User.updateOne(
            { _id: dataParams.id },
            { username, email, password, role }
        );

        return result;
    },


    //Xóa User
    deleteUserService: async (dataParams) => {
        let result = await User.deleteOne({ _id: dataParams.id });

        return result;
    },


    //Lọc User theo Role
    filterUserByRoleService: async (dataBody) => {
        let result = "";

        if (dataBody.role == "all") {
            result = await User.find({});
        } else {
            result = await User.find({ role: dataBody.role });
        }

        return result;
    },


    //Tìm kiếm User theo name
    searchUserByEmailService: async (dataBody) => {
        let email = dataBody.email;
        let result = await User.find({ email: new RegExp(`^${email}`) });

        return result;
    },


}