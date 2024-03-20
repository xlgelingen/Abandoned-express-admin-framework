const UserModel = require('../models/user');
const User = new UserModel();
const urp = require('../middlewares/user_role_permission');
// const tokenController = require('../controllers/token')
var jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const login = {
    login: async function (req, res, next) {
        let phone = req.body.phone;

        if (!phone) {
            res.json({ code: 0, data: 'params empty!' })
            return
        }

        try {
            let userArr = await User.select({ phone })
            let user = userArr[0];
            console.log('login文件的user：',user)
            if (user) {
                var rpData = await urp.getRPData(user.id);
                var roleID = rpData.role_id;
                var roleName = rpData.role_name;
                var permissionsID = rpData.permissions_id;
                var permissionsName = rpData.permissions_name;
                console.log('login文件：','roleID:',roleID, 'roleName：',roleName ,'permissionsid:',permissionsID,'permissionsName:',permissionsName,)
                var token = jwt.sign({ user_id: user.id, user_name: user.name, user_phone: user.phone, user_password: user.password, user_role: roleName, user_permissions: permissionsName},JWT_SECRET,{ expiresIn: "30d" })
                // var userInfo = { user_id: user.id, user_name: user.name, user_phone: user.phone, user_password: user.password, user_role: roleID, user_permissions: permissionsID}
                // res.cookie('web_token', token, { maxAge: 60 * 24 * 60 * 60 });
                console.log('token',token)
                res.json({ code: 200, data: { code: 200, token: token } })
            } else {
                res.json({ code: 0, data: { code: 0, msg: '没有此用户' } })
            }
        } catch (e) {
            console.log(e,e.message)
            res.json({ code: 0, data: {code: 200, msg: e.message} })
        }
    },

    // renderLogin: async function (req, res, next) {
    //     if (res.locals.isLogin) {
    //         var isRight = res.locals.userInfo.permissions.includes(1);
    //         if(isRight){
    //             res.redirect('/admin/user?page_index=1&page_size=20');
    //         }else if(!isRight){
    //             res.redirect('/admin/clue');
    //         }
    //         return;
    //     }
    //     res.render('login.tpl', res.locals)
    // },

    logout: function (req, res, next) {
        res.clearCookie('web_token');
        res.redirect('/login'); 
    }
}

module.exports = login;