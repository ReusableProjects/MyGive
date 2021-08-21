$(document).ready(function(){
    $('#FAQButton').click(function(){
       window.location.href="../html/Q&A.html";
    })
    $('.goodsBlockButton').click(function(){
        window.open($(this).attr('data'));
     })
})