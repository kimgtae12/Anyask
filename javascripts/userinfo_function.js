var user_info = []; //유저의 정보를 파이어베이스에서 가져온다.
var user_name = ''; //파이어베이스에서 가져온 유저의 이름을 저장.
let result_search_id = ""; //index에서 검색한 아이디를 url을 통해 가져와 저장해주는 변수

var user_quetion = []; //검색한 아이디에서 받은 질문들을 불러오기위한 배열.

var userQuetionVal = []; //질문 번호안에 있는 내용을 들고오기 위한 배열.

var quetionIndex = []; //검색한 아이디에서 받은 질문들의 개수를 불러오기 위한 배열. 
//개수를 불러와 몇번째 질문인지 알 수 있고, 그 번호로 새로 질문을 저장한다.

var user = 0;

(async function () {

    var url = decodeURIComponent(window.location.href);
    $.urlParam = function (name) {

        //exec를 통해 주소값을 return해준다.
        //return 된 주소값을 RegExp라는 정규식을 통해 =뒤에 있는 문자를 가져온다.
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results == null) {
            return null;
        }
        else {
            return results[1] || 0;
        }
    }

    // parameter get
    result_search_id = $.urlParam('search_id'); //url 주소에서 가져온 search_id를 변수에 담아준다.

    let userNameVal = ""; //info.html에 append시키기 위한 변수 생성

    //firebase에서 userinfo를 가져온다.(userSnapshot.val()) 그리고 가져온 값을 user_info배열에 push해준다.
    firebase.database().ref('/users/' + result_search_id + '/userinfo').once('value').then(function (snapshot) {
        snapshot.forEach(function (userSnapshot) {
            var userVal = userSnapshot.val();
            user_info.push(userVal);
        });
        user_name = user_info[2]; //push해준 값을 변수에 저장. 해당 변수는 회원 이름

        var storage = firebase.storage();
        var storageRef = storage.ref();

        storageRef.child('profiles/' + result_search_id).getDownloadURL().then(function (url) {
            // `url` is the download URL for 'images/stars.jpg'
            // This can be downloaded directly:
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'blob'; //blob형태로 xmlhttprequest를 가져온다.

            // Or inserted into an <img> element:
            var img = document.getElementById('profile'); //profile아이디를 가진 id를 탐색
            img.src = url; //url을 img 경로로 넣어준다.
        }).catch(function (error) {
            // Handle any errors
        });

        //html에 append 시켜준다.
        userNameVal += '<table align="center" style="margin-top:10px; margin-bottom:10px;">' +
            '               <tr>' +
            '                   <td rowspan="2"><img class="profile_style" id="profile" height="150" width="150" /></td>' +
            '                   <td><p> 이름 : ' + user_name + '</p></td>' +
            '               </tr>' +
            '               <tr>' +
            '                   <td> <p>아이디 : ' + result_search_id + '</p></td>' +
            '               </tr>' +
            '           </table>';
        $('.user_info_top').append(userNameVal);
    });

    // request userQuetion -> key값 받아오기. (userSnapshot.key) =질문 번호를 가져온다.
    var quetionPath = firebase.database().ref('/users/' + result_search_id + '/quetion/');
    user = await quetionPath.once('value').then(function (snapshot) {
        snapshot.forEach(function (userSnapshot) {
            var quetionViewKey = userSnapshot.key;
            user_quetion.push(quetionViewKey);
        });
        for (let i = 0; i <= user_quetion.length; i++) {
            if (i == user_quetion.length) {
                return user_quetion[i - 1];
            }
        }
    });

    for (let b = 1; b <= user; b++) {
        //user_quetion에 저장되어있는 key의 경로에서 value들을 가져온다.

        firebase.database().ref('/users/' + result_search_id + '/quetion/' + b + '/').once('value').then(function (snapshot) {
            snapshot.forEach(function (userSnapshot) { //forEach반복으로 배열의 값만큼 반복해준다.
                var quetionViewVal = userSnapshot.val(); //질문을 가져온다.
                userQuetionVal.push(quetionViewVal); //가져온 질문들을 userQuetionVal배열에 push해준다.
            });
            var innerQuetion = ""; //질문을 담아둘 변수 생성

            //임시로 생성해둠.
            var dd = [];
            dd = userQuetionVal[0];
            bb = userQuetionVal[1];
            if (dd != undefined && bb != undefined) {
                innerQuetion += '<div class="quetion_form"><p style="font-size:24px; display:inline; margin:0">Q' + b + '&nbsp;-</p>' +
                    '<p style=" display:inline;">&nbsp;&nbsp;' + bb + '</p>' +
                    '<p>' + dd + '</p></div>';

                $('#quetion_div').append(innerQuetion); //질문 배열을 info.html에 append 시켜준다.
                //반복문을 통해 push하기 때문에 데이터가 있는 상태에서 push되어 피라미드 형태의 데이터가 나타난다.
                //그러므로 배열을 초기화 시켜준다.
            }
            userQuetionVal = [];
        });

    }
})();

function inputQuetion() { //질문하기를 눌렸을때 실행되는 함수
    let textarea = document.getElementById('quetion_area').value;


    //검색한 유저의 질문들을 불러온다.
    var fireQuetion = firebase.database().ref('/users/' + result_search_id + '/quetion');
    fireQuetion.once('value').then(function (snapshot) {
        snapshot.forEach(function (userSnapshot) {
            var quetionVal = userSnapshot.key;
            quetionIndex.push(quetionVal);
        });

        var quetionNumber = 0;

        if (quetionIndex.length == 0) {
            quetionNumber = 1;
        }
        for (let i = 0; i <= quetionIndex.length; i++) {
            if (i == quetionIndex.length) {
                quetionNumber = quetionIndex[i - 1];
                quetionNumber++;
            }
        }

        console.log(quetionNumber);
        var userTable = database.ref("users/" + result_search_id + '/quetion/' + quetionNumber + '/');
        //table을 지정해 앞에 생성했던 quetionNumber번호로 질문을 업로드 할 것이다.

        var userQuetion = { //json 형태로 quetion 을 저장하고, value값은 textarea로 지정해준다.
            quetion: textarea
        };
        userTable.update(userQuetion); //userQuetion을 테이블에 업데이트 시켜준다.
        alert("질문 완료.");
        window.location.reload(); //글쓰기가 완료됬을땐 페이지를 reload 시켜준다.

        return false;


    });

}