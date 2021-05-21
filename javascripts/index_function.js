
/*login_function*/
function login_Go() {
    var user_id = document.getElementById("id").value;
    var user_pw = document.getElementById("pw").value;

    var user_id_list = [];
    var user_info = [];
    var db_password = '';

    var userDbRef = database.ref('/users/');
    userDbRef.orderByKey().once('value').then(function (snapshot) {
        snapshot.forEach(function (userSnapshot) {
            var userKey = userSnapshot.key;
            user_id_list.push(String(userKey));
        });

        if (user_id == "" || user_pw == "") {
            alert("아이디 또는 비밀번호가 입력되지 않았습니다.");
        }
        else {
            for (var j = 0; j <= user_id_list.length - 1; j++) {
                if (user_id != user_id_list[j]) {
                }
                else {

                    firebase.database().ref('/users/' + user_id + '/userinfo').once('value').then(function (snapshot) {
                        snapshot.forEach(function (userSnapshot) {
                            var userVal = userSnapshot.val();
                            user_info.push(userVal);
                        });
                        db_password = db_password + user_info[3];

                        if (user_pw != db_password) {
                            alert("아이디 혹은 비밀번호가 잘못 입력되었습니다.");
                        }
                        else {
                            sessionStorage.setItem("userid", user_id);
                            var session_user_id = sessionStorage.getItem("userid");
                            console.log(session_user_id);
                            alert("로그인 완료!\n 아이디는 : " + session_user_id);

                            window.location.href = "index.html";
                        }
                    });
                    break;
                }
            }
        }
    });
}




/* page_view_jqeury */
$(document).ready(function () {

    var session_id = sessionStorage.getItem("userid");
    console.log(session_id);

    var index_value = "";

    if (session_id == null) {
        index_value += '<p class="intro">AnyAsk는 익명으로 서로가 질문을 하고 답변을 할 수 있는 사이트 입니다.<br>' +
            '질문이 부담스럽다면 거절도 가능합니다.</br >' +
            '로그인을 하여 말하지 못했던 질문을 지금 바로 해보세요.</p>' +
            '   <table style="margin:0 auto;" class="logintable">' +
            '        <tr>' +
            '             <td><input class="input_style" type="text" name="id" id="id" placeholder="아이디" required></td>' +
            '             <td rowspan="2"><input class="input_button" type="submit" value="로그인" onclick="login_Go()"></td>' +
            '       </tr>' +
            '       <tr>' +
            '             <td><input class="input_style" type="password" name="pw" id="pw" placeholder="비밀번호" required></td>' +
            '       </tr>' +
            '       <tr>' +
            '             <td colspan="2" style="height: 60px;">또는</td>' +
            '       </tr >' +
            '       <tr>' +
            '             <td colspan="2"><input class="join_go" type="button" value="회원가입" onclick="Join_Go()" /></td >' +
            '       </tr >' +
            '   </table >';

    }

    else {
        index_value += '<p class="intro">' + session_id + '님 반갑습니다.</br>' +
            '원하는 사용자의 아이디를 검색하여 지금 바로 질문해보세요!</p>' +
            '<form action="info.html" method="get">' +
            '   <input class="search_id" type="text" name="search_id" placeholder="원하는 사용자의 아이디를 입력하세요.">' +
            '   <input type="submit" value="검색"/>' +
            '</form>'
    }
    $('.main-form').append(index_value);
});


