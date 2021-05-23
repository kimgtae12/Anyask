

/* id check backup */
let id_check = 0;
firebase.database().ref('/users/').once('value').then(function (snapshot) {
    snapshot.forEach(function (userSnapshot) {
        var user_id = userSnapshot.key;
        user_info.push(user_id);
    });
    for (let a = 0; a < user_info.length; a++) {
        if (result_search_id == user_info[a]) {
            id_check++;
        }
    }
    if (id_check == 1) {
        userNameVal += '<p> 아이디 : ' + result_search_id + '</p>';
        $('.user_info_top').append(userNameVal);
    }
    else {
        alert("등록된 사용자가 존재하지 않습니다!");
        window.location.href = "index.html";
    }
});