const User = require("../models/userModel");
const { uploadSingleFileImage } = require('../helpers/uploadFile');
const { createAccessToken, createRefreshToken, verifyRefreshToken } = require('../middlewares/JwtToken');
require('dotenv').config();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

module.exports = {
    //Get All User
    getAllUserService: async (dataQuery) => {
        const { page, limit, type, search, filter } = dataQuery;
        if (page && limit) {
            const skip = (page - 1) * limit;
            const totalUsers = await User.countDocuments();
            const totalPages = Math.ceil(totalUsers / limit);


            if (type === "search" && search) {
                let totalUsers = await User.find({ email: new RegExp(`^${search}`) }).countDocuments();
                let result = await User.find({ email: new RegExp(`^${search}`) }).sort({ createdAt: -1 }).skip(skip).limit(limit);

                return {
                    errCode: 0,
                    data: result,
                    totalUsers,
                    totalPages: Math.ceil(totalUsers / limit)
                };
            }


            if (type === "filter" && filter) {
                if (filter === "all") {
                    let totalUsers = await User.find({}).countDocuments();
                    let result = await User.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit);

                    return {
                        errCode: 0,
                        data: result,
                        totalUsers,
                        totalPages: Math.ceil(totalUsers / limit)
                    };
                } else {
                    let totalUsers = await User.find({ role: filter }).countDocuments();
                    let result = await User.find({ role: filter }).sort({ createdAt: -1 }).skip(skip).limit(limit);

                    return {
                        errCode: 0,
                        data: result,
                        totalUsers,
                        totalPages: Math.ceil(totalUsers / limit)
                    };
                }
            }

            const result = await User.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit);

            return {
                errCode: 0,
                data: result,
                totalUsers,
                totalPages,
            };
        }

        if (!(page && limit && type && search && filter)) {
            const result = await User.find({});
            let totalUsers = await User.countDocuments();

            return {
                errCode: 0,
                data: result,
                totalUsers
            };
        }
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


    //Login
    loginService: async (dataBody) => {
        const { email, password } = dataBody;

        let result = "";

        //Check email người dùng có tồn tại không
        const user = await User.findOne({ email });
        if (!user) {
            result = {
                errCode: -1,
                errMsg: 'Email does not exist!'
            }
            return result;
        }


        //Check xem mật khẩu người dùng nhập vào có đúng không
        const checkPass = await bcrypt.compare(password, user.password);
        if (!checkPass) {
            result = {
                errCode: -1,
                errMsg: 'Incorrect password!'
            }
            return result;
        }

        const payload = {
            userId: user._id
        };

        let accessToken = createAccessToken(payload);
        let refreshToken = createRefreshToken(payload);

        result = {
            accessToken,
            refreshToken,
            username: user.username,
            image: user.image,
            errCode: 0,
            errMsg: 'Login Success'
        }

        return result;
    },


    logoutService: async (dataBody) => {
        const { refreshToken } = dataBody;

        let key = process.env.JWT_SECRET_LOGOUT;

        let decoded = jwt.verify(refreshToken, key);


        const user = await User.findOne({ _id: decoded.userId });

        let result = "";

        if (!user) {
            result = {
                errCode: -1,
                errMsg: 'User not found!'
            }
            return result;
        }

        result = {
            errCode: 0,
            errMsg: 'Logout Success'
        }
        return result;
    },

}