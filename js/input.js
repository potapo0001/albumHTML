// ページ本体が読み込まれたタイミングで実行するコード
const subject = document.getElementById("subject");
const memo = document.getElementById("memo");
const save = document.getElementById("save");
const cansel = document.getElementById("cansel");

save.addEventListener("click",
    (e) => {
        //(1)[保存]ボタンクリック時に実行するコード
        e.preventDefault();
        if (subject.validity.valid === false ||
            memo.validity.valid === false) {
                //(2)件名、メモが入力されてないときに実行するコード
                window.alert("件名、メモはいずれも必須です。");
                return;
            }
    }, false
);

cansel.addEventListener("click",
    function () {
        //(2) [キャンセル]ボタンクリック時に実行するコード
        location.href = "index.html";
    }, false
);