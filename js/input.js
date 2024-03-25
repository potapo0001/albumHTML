// ページ本体が読み込まれたタイミングで実行するコード
const subject = document.getElementById("subject");
const memo = document.getElementById("memo");
const save = document.getElementById("save");
const cancel = document.getElementById("cancel");

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
            const cpos_latitude = sessionStorage.getItem("cpos_latitude");
            const cpos_longitude = sessionStorage.getItem("cpos_longitude");
            if (cpos_latitude === null || cpos_longitude === null) {
                window.alert("トップページからアクセスし直してください。");
                location.href = "index.html";
            }
            let list = localStorage.getItem("memolist");
            if (list === null) {
                list = [];
            } else {
                list = JSON.parse(list);
            }
            list.push({
                latitude: cpos_latitude,
                longitude: cpos_longitude,
                subject: subject.value,
                memo: memo.value,
                updated: new Date()
            });
            list = JSON.stringify(list);
            localStorage.setItem("memolist", list);
            location.href = "index.html";
    }, false
);

cancel.addEventListener("click",
    () => {
        //(2) [キャンセル]ボタンクリック時に実行するコード
        location.href = "index.html";
    }, false
);