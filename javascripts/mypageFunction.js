var user_info = []; //유저의 정보를 파이어베이스에서 가져온다.
var user_name = ''; //파이어베이스에서 가져온 유저의 이름을 저장.
let result_search_id = ""; //index에서 검색한 아이디를 url을 통해 가져와 저장해주는 변수

var user_quetion = []; //검색한 아이디에서 받은 질문들을 불러오기위한 배열.

var userQuetionVal = []; //질문 번호안에 있는 내용을 들고오기 위한 배열.

var quetionIndex = []; //검색한 아이디에서 받은 질문들의 개수를 불러오기 위한 배열. 
//개수를 불러와 몇번째 질문인지 알 수 있고, 그 번호로 새로 질문을 저장한다.

var user = 0;

var answerQuetion = [];
var noAnswerQuetion = [];


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

/*************** profile 변경 관리 **************/

document.addEventListener('DOMContentLoaded', function () {
    const storageRef1 = firebase.storage().ref();
    let selectedFile;
    // File 선택
    document.querySelector('.file-add').addEventListener('change', e => {
        selectedFile = e.target.files[0];
    });

    // File 업로드
    document.querySelector('.file-submit').addEventListener('click', () => {

        storageRef1
            .child('profiles/' + result_search_id)
            .put(selectedFile)
            .on('state_changed', snapshot => {
                console.log(snapshot)
            }, error => {
                console.log(error);
            }, () => {
                console.log('성공');
                location.reload();
            }
            );
    });
});

(async function () {

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
        $('#info_id').append(result_search_id);
        $('#info_name').append(user_name);


        //kakao api를 이용한 link공유
        Kakao.init('c04ebb7dc0419ddf714f3c4ac0b7db47');
        // // 카카오링크 버튼을 생성합니다. 처음 한번만 호출하면 됩니다.
        Kakao.Link.createDefaultButton({
            container: '#kakao-link-btn',
            objectType: 'feed',
            content: {
                title: "AnyAsk",
                description: "내이름은!" + user_name + "! 질문해볼사람!!!",
                imageUrl: "https://opgg-com-image.akamaized.net/attach/images/20200521130943.1049686.jpg",
                link: {
                    mobileWebUrl: "https://anyask.azurewebsites.net/info.html?search_id=" + result_search_id,
                    webUrl: "https://anyask.azurewebsites.net/info.html?search_id=" + result_search_id
                }
            },
        });
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

    for (let b = 0; b <= user; b++) {
        //user_quetion에 저장되어있는 key의 경로에서 value들을 가져온다.
        firebase.database().ref('/users/' + result_search_id + '/quetion/' + b + '/').once('value').then(function (snapshot) {
            snapshot.forEach(function (userSnapshot) { //forEach반복으로 배열의 값만큼 반복해준다.
                var quetionViewVal = userSnapshot.val(); //질문을 가져온다.
                userQuetionVal.push(quetionViewVal); //가져온 질문들을 userQuetionVal배열에 push해준다.
            });
            //질문을 담아둘 변수 생성

            //임시로 생성해둠.
            var answerOrquestion = userQuetionVal[0]; //답변
            var quetion = userQuetionVal[1]; //질문


            if (quetion != undefined && answerOrquestion != undefined) {

                answerQuetion.push('<div class="quetion_form"><p style="font-size:24px; display:inline; margin:0">Q&nbsp;-</p>' +
                    '<p style=" display:inline;">&nbsp;&nbsp;<a href="#" style="color:white">' + quetion + '</a></p>' +
                    '<p>' + answerOrquestion + '</p>');
                $('#answer_count').empty();
                $('#answer_count').append(answerQuetion.length);
            }
            else if (answerOrquestion != undefined && quetion == undefined) {
                noAnswerQuetion.push('' +
                    '<div class="quetion_form"><p id="quetion_num" style="font-size:24px; display:inline; margin:0">Q' + b + '&nbsp;-</p>' +
                    '<p style=" display:inline;">&nbsp;&nbsp;<a href="#" style="color:white">' + answerOrquestion + '</a></p>' +
                    '<section id="area_section">' +
                    '<p class="slidedown"><button class="make_answer_area">답변하기</button>&nbsp;<button>거절하기</button></p>' +
                    '   <div class="answer_form">' +
                    '    <textarea maxlength="1000" name="answer_area" class="answer_area" id="answer_area' + b + '" placeholder="원하는 답변을 입력하세요. 글자수는 1000자 제한입니다."></textarea>' +
                    '    <button onclick="answer_go(' + b + ')">답변하기</button>' +
                    '   </div >' +
                    '</section>' +
                    '</div > ');
                $('#new_count').empty();
                $('#new_count').append(noAnswerQuetion.length);

            }
            userQuetionVal = [];//반복문을 통해 push하기 때문에 데이터가 있는 상태에서 push되어 피라미드 형태의 데이터가 나타난다.
            //그러므로 배열을 초기화 시켜준다.
        });


    }

})();

function answerList() {
    $('#quetion_div').children().remove();
    for (let c = 0; c <= answerQuetion.length; c++) {
        $('#quetion_div').append(answerQuetion[c]);

    }
}
function noAnswerList() {
    $('#quetion_div').children().remove();
    for (let c = 0; c <= noAnswerQuetion.length; c++) {
        $('#quetion_div').append(noAnswerQuetion[c]);
    }
}

function inputQuetion() { //질문하기를 눌렸을때 실행되는 함수
    let textarea = document.getElementById('quetion_area').value;


    //검색한 유저의 질문들을 불러온다.
    firebase.database().ref('/users/' + result_search_id + '/quetion/').once('value').then(function (snapshot) {
        snapshot.forEach(function (userSnapshot) {
            var quetionVal = userSnapshot.key;
            quetionIndex.push(quetionVal);
        });
        console.log(quetionIndex.length);
        var quetionNumber = quetionIndex.length + 1;
        /*질문들의 개수에 +1하여 변수에 저장해준다
         예를 들어 질문이 3개가 있다고 하면 배열의 길이는 3이다. 
         그러므로 배열길이에 +1을 하여 4가 된다.
         이 4가 이번에 쓸 질문의 index가 된다.
        */

        var userTable = database.ref("users/" + result_search_id + '/quetion/' + quetionNumber + '/');
        //table을 지정해 앞에 생성했던 quetionNumber번호로 질문을 업로드 할 것이다.

        var userQuetion = { //json 형태로 quetion 을 저장하고, value값은 textarea로 지정해준다.
            quetion: textarea
        };
        userTable.update(userQuetion); //userQuetion을 테이블에 업데이트 시켜준다.
        alert("질문 완료.");
        window.location.reload(); //글쓰기가 완료됬을땐 페이지를 reload 시켜준다.
    });

}






