
/*page_move*/
function Join_Go() {
    window.location.href = "join.html";
}

/*para_page_move*/

function test_append() {
    let value = 123;
    var append_test_value = "";

    var test = sessionStorage.getItem("userid");

    for (var i = 0; i <= 5; i++) {
        append_test_value += "<div class='table'><p>" + test + "</p></div>"
    }

    $('#test').append(append_test_value);
}
function searchIdAccess() {
    window.location.href = 'info.html';
    alert('go');
}
