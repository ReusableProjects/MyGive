// nodejs를 통해 서버를 돌린다
var http = require('http');
var url=require('url');
var fs=require('fs');
var querystring = require('querystring'); 
var server = http.createServer(function(request,response){
    console.log('--- log start ---');
    var parsedUrl = url.parse(request.url, true);//deprecated된 URL 방식 대신 WHATWG URL API 방식으로 변경하였습니다
    console.log(parsedUrl);
    var pathName=parsedUrl.pathname;
    console.log('--- log end ---');

    if (request.method == 'GET') { //get으로 요청이 전달되었다면 이부분을 실행합니다
        if(pathName == '/'){

            url = '/html/index.html';  //기본적으로 index.html이 실행됩니다
        }else if(pathName == '/favicon.ico'){
            response.writeHead(404); //바로가기 아이콘이 없으면 404를 리턴합니다
            response.end();
            return;
        }else {
            url = request.url; //기본이 아니라면 해당 url을 저장합니다
        }

        response.writeHead(200); //잘 열렸다고 200으로 확인합니다
        response.end(fs.readFileSync(__dirname + url)); //__dirname = 현재 서버가 있는 디렉터리
        return;
    }

    if (request.method == 'POST') { 
        var body = '';

        request.on('data', function (data) { //post로 전달된 데이터가 있으면 body에 쌓아줍니다
            body += data;

            if (body.length > 1e6)
                request.destroy();
        });

        request.on('end', function () { //body로 들어온 데이터를 가공하여 객체화시킵니다
            var post = qs.parse(body); 
            console.dir(post);

            var text = request.url.split('/');
            var method = text[1];
        
            if(typeof(postMethods[method]) == 'undefined'){ //request.url이 정의되어 있지 않으면
                response.writeHead(404); //404에러를 출력합니다
                response.end();
                return;
            }else{
                console.dir(postMethods); //request.url이 존재하면 postMethods를 실행합니다
                postMethods[method](response,post);//post값 전달하는 과정입니다
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
    var sql="SELECT contributorList from myGive.Contributor WHERE userNum='"+userNum+"'";//myGive의 Contributor테이블로부터 기부자가 현재 접속자일때의 정보를 조회합니다
    queryExecuteToMyGive(sql,function (error) {
        if (error) throw error;
        var returnStr = '';
        send200(res,returnStr)
    });
}
postMethods.organizationMinusHistory = function(res, post){
    var sql="SELECT * from KBbank.CardHistory WHERE cardNum='"+post.organizationCardNum+"'&&price<0";
    queryExecuteToKBbank(sql,function (error) {
        if (error) throw error;
        var returnStr = '';
        send200(res,returnStr)
    });
}
postMethods.organizationPlusHistory = function(res, post){
    var sql="SELECT * from KBbank.CardHistory WHERE cardNum='"+post.organizationCardNum+"'&&price>=0";
    queryExecuteToKBbank(sql,function (error) {
        if (error) throw error;
        var returnStr = '';
        send200(res,returnStr)
    });
}