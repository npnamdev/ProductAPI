const User = require("../models/userModel");
const { uploadSingleFileImage } = require('../helpers/uploadFile')
require('dotenv').config();

module.exports = {
    //Get All User
    getAllUserService: async () => {
        let result = await User.find({});
        return result;
    },


    //Get A User
    getAUserService: async (dataParams) => {
        let result = await User.find({ _id: dataParams.id });

        return result;
    },


    //Create User
    createUserService: async (dataBody, dataFile) => {
        const { username, email, password, phone, address, role } = dataBody;
        const checkEmail = await User.findOne({ email });
        if (checkEmail) {
            throw new Error('Email đã tồn tại');
        }

        let imageURL = '';
        if (dataFile && dataFile.image) {
            imageURL = await uploadSingleFileImage(dataFile.image);
            imageURL = `http://${process.env.HOST_NAME}:${process.env.PORT}/images/${imageURL.path}`;
        }

        let result = await User.create({
            username, email, password, phone, address, role, image: imageURL
        });

        return result;
    },


    //Update User
    updateUserService: async (dataBody, dataParams, dataFile) => {
        const { username, password, phone, address, role } = dataBody;
        const user = await User.findById(dataParams.id);

        let imageURL = user.image;
        if (dataFile && dataFile.image) {
            const newImageURL = await uploadSingleFileImage(dataFile.image);
            imageURL = `http://${process.env.HOST_NAME}:${process.env.PORT}/images/${newImageURL.path}`;
        }

        let result = await User.updateOne(
            { _id: dataParams.id },
            {
                username,
                password,
                phone,
                address,
                role,
                image: imageURL === user.image ? user.image : imageURL,
            }
        );

        return result;
    },


    //Delete User
    deleteUserService: async (dataParams) => {
        let result = await User.findByIdAndDelete({ _id: dataParams.id });

        return result;
    },


    //Filter User By Role
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