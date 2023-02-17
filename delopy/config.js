const config  = {
    pre:{
        host:'47.111.227.45', //主机名
        username:'root', //用户名
        password:'uark@dev0802#$', //密码
        path:'/usr/local/nginx/html/teacher', // 项目部署文件夹
        webFolder:'dist' // 项目文件名
    },
    prod:{
        host:'', //主机名
        username:'', //用户名
        password:'', //密码
        path:'', // 项目部署文件夹
        webFolder:'' // 项目文件名
    }
}
module.exports.config = config[process.env.REACT_APP_ENV || 'prod']