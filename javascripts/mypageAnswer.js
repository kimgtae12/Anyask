function answer_go(q_num) {
    let answer = document.getElementById("answer_area" + q_num).value;

    if (answer == "" || answer == undefined) {
        alert("대답할 내용을 입력해주세요.");
    }
    else {
        var userTable = database.ref("users/" + result_search_id + '/quetion/' + q_num + '/');

        var answerVal = { //json 형태로 quetion 을 저장하고, value값은 textarea로 지정해준다.
            answer: answer
        };

        userTable.update(answerVal);
    }


    alert("답변 저장이 완료되었습니다.");
    window.location.reload();

}
