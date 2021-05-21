
/* menu list */
$(document).ready(function () {

    var session_id = sessionStorage.getItem("userid");
    console.log(session_id);
    var menu_value = "";

    if (session_id == null) {

        menu_value += '<li><a href="#">로그인</a></li>' +
            '<li><a href="#">회원가입</a></li>';
    }

    else {
        menu_value += '<li><a href="#">마이페이지</a></li>' +
            '<li><a href="javascript:idSeesionDestroy()">로그아웃</a></li>';
    }
    $('#login-list').append(menu_value);
});

/* logout_function */
function idSeesionDestroy() {
    sessionStorage.removeItem('userid');
    window.location.href = "index.html";
}




