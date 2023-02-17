const {NodeSSH} = require('node-ssh');
const chalk = require('chalk');
const path = require('path');
const archiver =require('archiver');
const os = require('os');
const fs = require('fs');
const ssh = new NodeSSH();
const srcPath = path.resolve(__dirname,'../dist');
const {config} = require('./config');
// const cpus = os.cpus();
// console.log('*****cpu信息*******');
// cpus.forEach((cpu,idx,arr)=>{
//     var times = cpu.times;
//     console.log(`cpu${idx}：`);
//     console.log(`型号：${chalk.blueBright(cpu.model)}`);
//     console.log(`频率：${chalk.cyan(cpu.speed)} MHz`);
//     console.log(`使用率：${((1-times.idle/(times.idle+times.user+times.nice+times.sys+times.irq))*100).toFixed(2)}%`);
// });
!!function startZip() {
    
    console.log(`${chalk.redBright('（1）')} ${chalk.blueBright('开始压缩zip包')}`);
    var archive = archiver('zip', {
        zlib: { level: 5 } //递归扫描最多5层
    }).on('error', function(err) {
        throw err;//压缩过程中如果有错误则抛出
    });
    var output = fs.createWriteStream(__dirname + `/${config.webFolder}.zip`)
     .on('close', function(err) {
         /*压缩结束时会触发close事件，然后才能开始上传，
           否则会上传一个内容不全且无法使用的zip包*/
         if (err) {
            console.log('关闭archiver异常:',err);
            return;
         }
         console.log('已生成zip包');
         console.log(`（2）开始连接上传${config.webFolder}.zip至远程机器...`);
         uploadFile();
     });
    archive.pipe(output);//典型的node流用法
    archive.directory(srcPath,`/${config.webFolder}`);//将srcPach路径对应的内容添加到zip包中/public路径
    archive.finalize();
 }()
 function uploadFile() {
    ssh.connect({ //configs存放的是连接远程机器的信息
        host: config.host,
        username: config.username,
        password: config.password,
        port:22 //SSH连接默认在22端口
    }).then(function (data) {
        //上传网站的发布包至configs中配置的远程服务器的指定地址
        ssh.putFile(`./delopy/${config.webFolder}.zip`, config.path + `/${config.webFolder}.zip`).then(async function(status) {
                console.log('上传文件成功');
                console.log('（3） 开始执行远端脚本');
                await unzipFile(config.path)
                await deleteLocalZip()
                process.exit();
                // startRemoteShell();//上传成功后触发远端脚本
          },error =>{
              console.log(error)
          }).catch(err=>{
             console.log('文件传输异常:',err);
             process.exit(0);
          });
    }).catch(err=>{
        console.log('ssh连接失败:',err);
        process.exit(0);
    });
 }
 async function runCommand(command, webDir) {
    await ssh.execCommand(command, { cwd: webDir });
}
// 第4步，解压zip包
async function unzipFile(webPath) {
    try {
        console.log('（4）开始解压zip包');
        await runCommand(`cd ${webPath}`, webPath);
        await runCommand(`unzip -o ${config.webFolder}.zip && rm -f ${config.webFolder}.zip`, webPath);
        console.log('zip包解压成功');
    } catch (err) {
        console.log(`zip包解压失败 ${err}`);
        process.exit(1);
    }
}
async function deleteLocalZip() {
    return new Promise((resolve, reject) => {
        console.log('（5）开始删除本地zip包');
        fs.unlink(`./delopy/${config.webFolder}.zip`, err => {
            if (err) {
                console.log(`本地zip包删除失败 ${err}`, err);
                reject(err);
                process.exit(1);
            }
            console.log('本地zip包删除成功\n');
            resolve();
        });
    });
}
 