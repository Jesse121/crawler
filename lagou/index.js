const superagent = require('superagent');
const cheerio = require('cheerio');
const mysql = require('mysql');



//发起post请求 请求参数 web前端 3~5年经验
const reptileUrl = 'https://www.lagou.com/jobs/positionAjax.json?gj=3-5%E5%B9%B4&px=default&city=%E6%B7%B1%E5%9C%B3&needAddtionalResult=false';

let isFirst = true,i = 1;
const timer = setInterval(()=>{
    superagent
        .post(reptileUrl)
        .type('form')//支持form格式
        .send({ first:isFirst, pn:i, kd:'PHP'})
        //通过构造referer，避开服务器验证
        .set('Referer', 'https://www.lagou.com/jobs/list_web%E5%89%8D%E7%AB%AF?px=default&gj=3-5%E5%B9%B4&city=%E6%B7%B1%E5%9C%B3')
        .end((err, res) => {
            if(isFirst){isFirst = false;}
            if (err) throw err;
            const result = JSON.parse(res.text).content.positionResult.result;
            const len = result.length;
            let j = 0;
            let timer1 = setInterval(()=>{
                const positionName = result[j].positionName;
                const salary = result[j].salary;
                const companyName = result[j].companyFullName;
                const companySize = result[j].companySize;
                const industryField = result[j].industryField;
                const createTime = result[j].createTime;
                let description,address;
                getDes('https://www.lagou.com/jobs/'+result[j].positionId+'.html')
                .then((res)=>{
                    const $ = cheerio.load(res.text,{decodeEntities: false});
                    description = $('.content_l').find('.description').siblings().text().trim();
                    address = $('.work_addr').text().trim().replace(/\s|\n/g,'').slice(0,-4);
                },(err)=>{
                    throw err;
                })
                .then(()=>{
                    if(description && address){
                        //连接数据库
                        let connection = mysql.createConnection({
                            host: '127.0.0.1',
                            user: 'root',
                            password: '',
                            port: '3306',
                            database: 'lagou'
                        });

                        connection.connect();
                        //存入数据库
                        add(connection,[positionName,salary,address,companyName,companySize,industryField,createTime,description]);
                        connection.end();
                    }
                })
                .then(()=>{
                    j++;
                    if(j==len){
                        clearInterval(timer1);
                    }
                })
            },8000);
        });
    i++;
    if(i>30){
        clearInterval(timer);
    }
},150000);

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
    var addSql = 'INSERT INTO php(positionName,salary,address,companyName,companySize,industryField,createTime,description) VALUES(?,?,?,?,?,?,?,?)';
    con.query(addSql, paramsArr, (err, result)=>{
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            return;
        }
        console.log('INSERT ID:', result.insertId);
    });
}