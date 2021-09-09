// nodejs를 통해 서버를 돌린다
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
}); //localhost:5500으로 서버에 접속합니다

var connInfoMyGiveDB = {//myGive측 db에 접속하기 위한 연결정보입니다
    host     : '%',   
    port     : '3307',
    user     : 'myGive',       
    password : 'myGive',     
    database : 'myGive'    
};
var connInfoKBbankDB = {//은행측 db에 접속하기 위한 연결정보입니다
    host     : '%',   
    port     : '3307',
    user     : 'myGive',       
    password : 'myGive',     
    database : 'KBbank'    
};

var queryExecuteToMyGive = function(sql,callback){//2가지 타입의 queryExecute를 통해 원하는 db에 접근합니다

    var connection = mysql.createConnection(connInfoMyGiveDB);
    connection.connect();//myGivedb에 연결하고
    connection.query(sql,callback);//sql문 요청을 전달합니다
    connection.end();//연결을 끊어줍니다
};
var queryExecuteToKBbank = function(sql,callback){

    var connection = mysql.createConnection(connInfoKBbankDB);
    connection.connect();//구조는 같지만 이번엔 은행측db에 연결합니다
    connection.query(sql,callback);//은행api를 사용하기 위해선 사업자등록이 필요했기에 임시로 대체했습니다
    connection.end();
};

var send200 = function(response,str){//에러가 났을 경우입니다

    response.writeHead(200);
    response.write(str);
    response.end();
};

var postMethods = {};
postMethods.organizationList = function(res, post){
    var sql="SELECT * from myGive.Contributor WHERE userNum='"+userNum+"'";//myGive의 Contributor테이블로부터 기부자가 현재 접속자일때의 정보를 조회합니다
    queryExecuteToMyGive(sql,function (error) {
        if (error) throw error;
        var returnStr = '';
        send200(res,returnStr)
    });
}