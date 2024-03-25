//(1) ページ本体が読み込まれたタイミングで実行するコード
let w_id, gmap, c_point;
const result = document.getElementById("result");
const stopwatch = document.getElementById("stopwatch");

const showmap = (e) => {
    const id = e.target.dataset.id;
    let list = localStorage.getItem("memolist");
    if (list !== null) {
        list = JSON.parse(list);
        const item = list[id];
        const point = new google.maps.LatLng(
            item.latitude, item.longitude);
        const marker = new google.maps.Marker({
            map: gmap,
            position: point
        });
        const msg = `<strong>${h(item.subject)}></strong><br>${h(item.memo)}`;
        const info = new google.maps.InfoWindow({
            content: msg
        });
        google.maps.event.addListener(marker,"click",
            () => {
                info.open(gmap, marker);
            });
            gmap.setCenter(point);
    }
};

const showmemo = () => {
    let msg = "";
    let list = localStorage.getItem("memolist");
    if (list !== null) {
        list = JSON.parse(list);
        for (let i = 0; i < list.length; i++) {
            msg += `<li>
            <a href="#" class="show" data-id="${h(i)}">
                ${h(list[i].subject)}
                </a>
                <a class="del" href="#" data-id="${h(i)}">×</a>
                </li>`;
        }
        const r_list = document.getElementById("list");
        r_list.innerHTML = msg;
    }
};

stopwatch.addEventListener("click",
    (e) => {
        navigator.geolocation.clearWatch(w_id);
    }, false
);
if (navigator.geolocation) {
    w_id = navigator.geolocation.watchPosition(
        (pos) => {
            c_point = new google.maps.LatLng(
                pos.coords.latitude, pos.coords.longitude);
            gmap = new google.maps.Map(
                result,
                {
                    zoom: 14,
                    center: c_point,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                }
            );
            sessionStorage.setItem("cpos_latitude", pos.coords.latitude);
            sessionStorage.setItem("cpos_longitude", pos.coords.longitude);
        },
        (err) => {
            const msgs = [
                " ",
                "Geolocationの利用が許可されていません。",
                "位置情報を取得できません。",
                "位置情報の取得中にタイムアウトしました。"
            ];
            result.textContent = msgs[err.code];
        },
        {
            timeout : 7000,
            maximumAge : 500,
            enableHighAccuracy: false
        }
    );
} else {
    window.alert("geolocation APIに対応しているブラウザーでアクセスしてください。")
}
showmemo();