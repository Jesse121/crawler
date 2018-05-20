const superagent = require('superagent');
const cheerio = require('cheerio');
const mysql = require('mysql');
// const fs = require('fs');

let i = 1;
const timer = setInterval(function(){
    //爬取地址   boss直聘 请求参数 深圳 web前端 3~5年经验
    // const reptileUrl = "https://www.zhipin.com/c101280600-p100901/e_105/?page="+i;
    //爬取地址   boss直聘 请求参数 深圳 php 3~5年经验
    // const reptileUrl = "https://www.zhipin.com/c101280600-p100103/e_105/?page"+i;
    //爬取地址   boss直聘 请求参数 深圳 nodejs 3~5年经验
    // const reptileUrl = "https://www.zhipin.com/c101280600-p100114/e_105/?page"+i;
    //爬取地址   boss直聘 请求参数 深圳 python 1~3年经验
    const reptileUrl = "https://www.zhipin.com/c101280600-p100109/e_104/?page"+i;
    //发起get请求
    superagent.get(reptileUrl).end((err, res)=>{
        // 抛错拦截
        if (err) throw err;
        //我们通过cheerio的load方法解析整个文档，就是html页面所有内容
        const $ = cheerio.load(res.text,{decodeEntities: false});

        $('.job-primary').each(function(i){
            const infoPrimary = $(this).find('.info-primary');
            const jid = infoPrimary.find('.name a').attr('data-jid');
            const lid = infoPrimary.find('.name a').attr('data-lid');
            const jobName =infoPrimary.find('.name a .job-title').text();
            const salary = infoPrimary.find('.name a .red').text();
            const infoCompany = $(this).find('.info-company');
            const company = infoCompany.find('.name');
            const companyName = company.text();
            const companyInfo = company.siblings('p').text();
            let time = $(this).find('.info-publis p').text();
            time = time.slice(3);

            function prefix(num){
                return num < 10 ? '0'+num:num;
            }
            const myDate = new Date();
            //处理昨天的时间
            if(time =='昨天'){
                time = prefix(myDate.getMonth()+1)+'月'+prefix(myDate.getDate()-1)+'日';
            }
            //处理今天的时间
            if(time.match(/:/g)){
                time =prefix(myDate.getMonth()+1)+'月'+prefix(myDate.getDate())+'日';
            }
            let description = '';
            getDes('https://www.zhipin.com/view/job/card.json?jid='+jid+'&lid='+lid)
            .then((res)=>{
                const $ = cheerio.load(JSON.parse(res.text).html,{decodeEntities: false});
                description += $('.detail-bottom-text').text().trim();
            },(err)=>{
                throw err;
            })
            .then(()=>{
                // console.log(jobName);
                // console.log(salary);
                // console.log(companyName);
                // console.log(companyInfo);
                // console.log(description);
                // console.log(time);
                //连接数据库
                let connection = mysql.createConnection({
                    host: '127.0.0.1',
                    user: 'root',
                    password: '',
                    port: '3306',
                    database: 'boss'
                });

                connection.connect();
                //存入数据库
                add(connection,[jobName,salary,companyName,companyInfo,description,time]);
                connection.end();
            })

        });
    });
    i++;
    if(i>10){
        clearInterval(timer);
    }
},3000);

function getDes(url){
    var promise = new Promise((resolve,reject)=>{
        superagent.get(url)
        .end((err,res)=>{
            if (res) {
                resolve(res);
            }else{
                reject(err);
            }
        });
    });
    return promise;
}
//增加
function add(con,paramsArr) {
    var addSql = 'INSERT INTO python(jobName,salary,companyName,companyInfo,description,time) VALUES(?,?,?,?,?,?)';
    con.query(addSql, paramsArr, (err, result)=>{
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            return;
        }
        console.log('INSERT ID:', result.insertId);
    });
}


    // fs.writeFile('./response.json', res.text,'uft8',(err)=> {
    //     if (err) throw err;
    //     console.log('写文件成功');
    // });


//发起post请求
// superagent
//     .post(reptileUrl)
//     .send({ first: true, pn: 1, kd: 'web前端' })
//     // .set('X-API-Key', 'foobar')
//     // .set('Accept', 'application/json')
//     .end((res,err) => {
//         // if (err) throw err;
//         fs.writeFile('./response.json', res, (err) => {
//             if (err) throw err;
//             console.log('写文件成功');
//         });
//     });
