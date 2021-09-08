var http = require('http');
var url=require('url');
var fs=require('fs');
var querystring = require('querystring'); 
var server = http.createServer(function(request,response){
    console.log('--- log start ---');
    var parsedUrl = url.parse(request.url, true);//업데이트로 url api 안쓰니까  WHATWG URL API로 변경
    console.log(parsedUrl);
    var pathName=parsedUrl.pathname;
    console.log('--- log end ---');

    if (request.method == 'GET') { //get으로 전달된거면 이부분 실행
        if(pathName == '/'){

            url = '/html/index.html';  //기본적으로 index.html이 실행됨
        }else if(pathName == '/favicon.ico'){
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

    if (request.method == 'POST') { 
        var body = '';

        request.on('data', function (data) { //post로 전달된 데이터가 있으면 body에 차곡차곡 쌓아라
            body += data;

            if (body.length > 1e6)
                request.connection.destroy();
        });

        request.on('end', function () { //body로 들어온 데이터를 가공하여 뚝딱뚝딱해서 객체화시킴
            var post = qs.parse(body); //ex) 투표에서 찬성이 들어왔으면 객체화하여 출력
            console.dir(post);

            var text = request.url.split('/');
            var method = text[1];
        
            if(typeof(postMethods[method]) == 'undefined'){ //request.url이 정의되어 있지 않으면
                response.writeHead(404); //404에러 출력
                response.end();
                return;
            }else{
                console.dir(postMethods); //request.url이 존재하면 postMethods 실행하라
                postMethods[method](response,post);//post값 전달하는 과정
            }

        });
    }
});
server.listen(5500, function(){
    console.log('Server is running...');
}); //localhost:5500으로 서버에 접속. 들을 준비가 되어있지만 웹 접속 포트 바꿀 경우 같이 바꿔줘야한다

var connInfoMyGiveDB = {
    host     : '%',   
    port     : '3307',
    user     : 'myGive',       
    password : 'myGive',     
    database : 'myGive'    
};
var connInfoKBbankDB = {
    host     : '%',   
    port     : '3307',
    user     : 'myGive',       
    password : 'myGive',     
    database : 'KBbank'    
};

var queryExecuteToMyGive = function(sql,callback){

    var connection = mysql.createConnection(connInfoMyGiveDB);
    connection.connect();
    connection.query(sql,callback);
    connection.end();
};
var queryExecuteToKBbank = function(sql,callback){

    var connection = mysql.createConnection(connInfoKBbankDB);
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
    var sql="SELECT * from myGive.Contributor WHERE userNum='"+userNum+"'";
    queryExecuteToMyGive(sql,function (error) {
        if (error) throw error;
        var returnStr = '';
        send200(res,returnStr)
    });
}