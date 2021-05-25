
/* menu list */
$(document).ready(function () {

    var session_id = sessionStorage.getItem("userid"); //session 아이디 값을 load
    var menu_value = ""; //메뉴 변수 생성

    if (session_id == null) { //session id값이 없을 경우 실행

        menu_value += '<li><a href="#">로그인</a></li>' +
            '<li><a href="javascript:Join_Go()">회원가입</a></li>';
    }

    else {
        menu_value += '<li><a href="mypage.html?search_id=' + session_id + '">마이페이지</a></li>' +
            '<li><a href="javascript:idSeesionDestroy()">로그아웃</a></li>';
    }
    $('#login-list').append(menu_value);
});

/* logout_function */
function idSeesionDestroy() { //로그아웃 함수.
    sessionStorage.removeItem('userid');
    window.location.href = "index.html";
}




