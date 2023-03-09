const {
    getAllUserService,
    createUserService,
    updateUserService,
    deleteUserService,
    getAUserService,
    loginService,
    logoutService
} = require("../services/userService");

module.exports = {
    //Lấy Tất cả User
    getAllUserController: async (req, res) => {
        try {
            const result = await getAllUserService(req.query);
            return res.status(200).json({
                data: result
            })
        } catch (error) {
            return res.status(500).json({
                errMsg: "Error Server!"
            })
        }
    },


    //Lấy Chi tiết 1 User
    getAUserController: async (req, res) => {
        try {
            const result = await getAUserService(req.params);

            return res.status(200).json({
                errCode: 0,
                data: result
            })
        } catch (error) {
            return res.status(500).json({
                errMsg: "Error Server!"
            })
        }
    },


    //Tạo mới User
    createUserController: async (req, res) => {
        try {
            let result = await createUserService(req.body, req.files);

            return res.status(200).json({
                errCode: 0,
                data: result
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                errMsg: "Error Server2!"
            })
        }
    },


    //Sửa User
    updateUserController: async (req, res) => {
        try {
            let result = await updateUserService(req.body, req.params, req.files);

            return res.status(200).json({
                errCode: 0,
                data: result
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                errMsg: "Error Server!"
            })
        }
    },


    //Xóa User
    deleteUserController: async (req, res) => {
        try {
            let result = await deleteUserService(req.params);

            return res.status(200).json({
                errCode: 0,
                data: result
            })
        } catch (error) {
            return res.status(500).json({
                errMsg: "Error Server!"
            })
        }
    },


    loginController: async (req, res) => {
        try {
            let result = await loginService(req.body);

            return res.status(200).json(result)
        } catch (error) {
            return res.status(500).json({
                errMsg: "Error Server!"
            })
        }
    },


    logoutController: async (req, res) => {
        try {
            let result = await logoutService(req.body);

            return res.status(200).json(result)
        } catch (error) {
            return res.status(500).json({
                errMsg: "Error Server!"
            })
        }
    },

}