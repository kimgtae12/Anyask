window.onload = function () {
    document.addEventListener('DOMContentLoaded', function () {
        const storageRef = firebase.storage().ref();
        let selectedFile;
        // File 선택
        document.querySelector('.file-add').addEventListener('change', e => {
            selectedFile = e.target.files[0];
        });

        // File 업로드
        document.querySelector('.file-submit').addEventListener('click', () => {

            storageRef
                .child('images/' + result_search_id)
                .put(selectedFile)
                .on('state_changed', snapshot => {
                    console.log(snapshot)
                }, error => {
                    console.log(error);
                }, () => {
                    console.log('성공');
                }
                );
        });
    });
}