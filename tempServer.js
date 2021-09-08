var http = require('http');
var fs = require('fs');
var qs = require('querystring');
var mysql = require('mysql');
var app = http.createServer(function(request,response){
    var url = request.url; //처리하고싶은 url


    if (request.method == 'GET') { //get으로 전달된거면 이부분 실행
        if(request.url == '/'){

            url = '/App/PostManagement/html/index.html';  //기본적으로 index.html이 실행됨
        }else if(request.url == '/favicon.ico'){
            response.writeHead(404); //바로가기 아이콘이 없으면 404 리턴
            response.end();
            return;
        }else {
            url = request.url; //기본이 아니라면 해당 url을 저장
        }

        response.writeHead(200); //잘 열렸다고 200으로 확인
        response.end(fs.readFileSync(__dirname + url)); //__dirname = 현재 서버가 있는 디렉터리
        return;
    }

    if (request.method == 'POST') { //POST으로 전달된거면 이부분 실행
        var body = '';

        request.on('data', function (data) { //post로 전달된 데이터가 있으면 body에 쌓는다
            body += data;

            if (body.length > 1e6)
                request.destroy();
        });

        request.on('end', function () { //body로 들어온 데이터를 가공하여 객체화시킴
            var text = request.url.split('/');
            var method = text[1];
        
            if(typeof(postMethods[method]) == 'undefined'){ //request.url이 정의되어 있지 않으면
                response.writeHead(404); //404에러 출력
                response.end();
                return;
            }else{
                console.dir(postMethods); //request.url이 존재하면 postMethods 실행
                postMethods[method](response,post);//post값 전달하는 과정
            }
        });
    }

});
app.listen(5500); //localhost:5500으로 서버에 접속. 들을 준비가 되어있지만 웹 접속 포트 바꿀 경우 같이 바꿔줘야한다


var connInfo = {//더미로 넣은 계정이 아닌 mysql계정정보(heidisql접속정보와 같다)
    host     : '%',   
    port     : '3307',
    user     : 'myGive',       
    password : 'myGive',     
    database : 'myGive'    
};

var queryExecute = function(sql,callback){

    var connection = mysql.createConnection(connInfo);
    connection.connect();
    connection.query(sql,callback);
    connection.end();
};

var send200 = function(response,str){

    response.writeHead(200);
    response.write(str);
    response.end();
};

var postMethods = {};

postMethods.organizationList = function(res, post){
    var sql="Select * from myGive.organizationList WHERE userNum=3";
    queryExecute(sql,function (error, results, fields) {
        if (error) throw error;
        var returnStr = '';
        send200(res,returnStr)
    });
}

postMethods.save_leader = function(res,post){
    //var returnStr = JSON.stringify(post);

    var returnStr = '<html><script>document.location.href="next.html";</script></html>';
    send200(res,returnStr);
};

