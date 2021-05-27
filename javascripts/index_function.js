
/*login_function*/
function login_Go() {
    var user_id = document.getElementById("id").value;
    var user_pw = document.getElementById("pw").value;

    var user_info = [];
    var db_password = '';

    if (user_id == "" || user_pw == "") { //아이디,비밀번호 공백 체크
        alert("아이디 또는 비밀번호가 입력되지 않았습니다.");
    }
    else {
        for (var j = 0; j <= user_id_list.length - 1; j++) {

            //파이어베이스에서 유저의 정보를 가져온다. 이때 기준은 입력 아이디로 기준한다.
            firebase.database().ref('/users/' + user_id + '/userinfo').once('value').then(function (snapshot) {
                snapshot.forEach(function (userSnapshot) {
                    var userVal = userSnapshot.val();
                    user_info.push(userVal);
                });
                db_password = db_password + user_info[3]; //유저 패스워드를 변수에 저장.

                if (user_pw != db_password) { //입력 비밀번호와 데이터베이스의 비밀번호 일치 여부 확인.
                    alert("아이디 혹은 비밀번호가 잘못 입력되었습니다.");

                }
                else { //비밀번호가 만약 같다면 session에 입력 아이디를 저장해준다.
                    sessionStorage.setItem("userid", user_id);
                    var session_user_id = sessionStorage.getItem("userid");
                    user_id_list = [];
                    window.location.href = "index.html";

                }
            });
            break;
        }
    }
}

function Join_Go() {
    window.location.href = "join.html";
}


function searchId() { //index에서 사용하는 id 검색
    var input_id = $('input[name = search_id]').val(); //jquery 함수를 이용해 index에 적혀있는 search_id값을 불러온다. (아이디 검색창)
    if (input_id != "" && input_id != undefined) { //공백 체크
        for (let a = 0; a < user_id_list.length; a++) { //connect_firebase에서 지정한 user_id_list 배열의 길이만큼 반복
            if (input_id == user_id_list[a]) { //아이디가 같다면 다음 코드 실행
                console.log(user_id_list[a]);
                window.location.href = "info.html?search_id=" + input_id;
                return;
            }
            console.log(user_id_list[a]);
        }
        alert("등록된 사용자가 존재하지 않습니다."); //검색된 아이디가 없다면 alert 실행
    }
    else {
        alert("검색하실 아이디를 입력해주세요."); //공백이 있을 경우 실행
    }
}


/* page_view_jqeury */
$(document).ready(function () {

    var session_id = sessionStorage.getItem("userid"); //session id를 불러온다.

    var index_value = ""; //index에 넣을 태크를 담아줄 변수를 생성.

    if (session_id == null) { //만약 session id가 없을때. 즉 로그인을 하지 않았을때 다음과 같은 태그를 삽입해준다.

        index_value += '<p class="intro">AnyAsk는 익명으로 서로가 질문을 하고 답변을 할 수 있는 사이트 입니다.<br>' +
            '질문이 부담스럽다면 거절도 가능합니다.</br >' +
            '로그인을 하여 말하지 못했던 질문을 지금 바로 해보세요.</p>' +
            '   <table style="margin:0 auto;" class="logintable">' +
            '        <tr>' +
            '             <td><input class="input_style" type="text" name="id" id="id" placeholder="아이디" required></td>' +
            '             <td class="loginbutton" rowspan="2"><input class="input_button" type="button" value="로그인" onclick="login_Go()"></td>' +
            '       </tr>' +
            '       <tr>' +
            '             <td><input class="input_style" type="password" name="pw" id="pw" placeholder="비밀번호" required></td>' +
            '       </tr>' +
            '       <tr>' +
            '             <td colspan="2" style="height: 60px;">또는</td>' +
            '       </tr >' +
            '       <tr>' +
            '             <td colspan="2"><button class="join_go" onclick="Join_Go()"><span>회원가입</span></button></td >' +

            '       </tr >' +
            '   </table >';

    }

    else { //로그인을 하였을 경우엔 session id가 있으므로 다음과 같은 태그를 삽입해준다.

        index_value += '<p class="intro">' + session_id + '님 반갑습니다.</br>' +
            '원하는 사용자의 아이디를 검색하여 지금 바로 질문해보세요!</p>' +
            '<form>' +
            '   <table align="center">' +
            '   <tr>' +
            '       <td><input class="search_id" type="text" name="search_id" placeholder="원하는 사용자의 아이디를 입력하세요."></td>' +
            '        <td><img class="search_icon" onclick="javascript:searchId()" src="images/search_icon.png" /></td>' +
            '   </tr>' +
            '   </table>' +
            '</form>'
    }
    $('.main-form').append(index_value); //index에 html태그들을 appnd 시켜준다.

});

