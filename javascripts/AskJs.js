
/*page_move*/
function Join_Go() {
    window.location.href = "join.html";
}

/*login_function*/
function login_Go() {
    var data1 = document.getElementById("id").value;
    var data2 = document.getElementById("pw").value;

    if (data1 == "" || data2 == "") {
        alert("아이디 또는 비밀번호가 입력되지 않았습니다.");
    }
    else {
        alert(data1 + data2);
    }
}


/*para_page_move*/

function test_append() {
    let value = 123;
    var append_test_value = "";

    for (var i = 0; i <= 5; i++) {
        append_test_value += "<div class='table'><p>가즈아</p></div>"
    }

    $('#test').append(append_test_value);


}

/*join_page*/

function JoinAccess() {
    var id = document.getElementById("id").value;
    var pw = document.getElementById("pw").value;
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;

    alert("hello!");

    let userName = $('#id').val();
    window.location.href = "index.html?user=" + userName;
}