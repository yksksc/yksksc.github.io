const top_page_url = "http://192.168.68.55:8000"; //トップページのURLを設定。末尾の「/index.html」は含めない。



// ヘッダーとフッターを挿入する処理
document.body.insertAdjacentHTML("afterbegin", `
<header>
    <button id="menu_open_button" class="ripple_effect"><i class="material_icon">menu</i></button>横須賀高校 科学部
</header>
<menu>
    <div id="menu">
        <button id="menu_close_button" class="ripple_effect"><i class="material_icon">close</i></button>
        <ul>
            <li>
                <a href="https://twitter.com/YH_scienceclub" target="_blank" class="no_border">科学部公式Twitter</a>
            </li>
            <li>
                <a href="https://www.pen-kanagawa.ed.jp/yokosuka-h/zennichi/index.html" target="_blank" class="no_border">横須賀高校 公式サイト</a>
            </li>
        </ul>
    </div>
    <div id="menu_overlay"></div>
</menu>
`);

document.body.insertAdjacentHTML("beforeend", `
<footer>
    Copyright © 2020 - 2021 神奈川県立横須賀高等学校科学部 All rights reserved.
    <div id="sns_icon">
        <a href="https://twitter.com/YH_scienceclub" target="_blank" class="no_new_tab_icon no_border" title="Twitter">
            <img src="src/img/Twitter_Social_Icon_Rounded_Square_White.svg" alt="Twitter" id="twitter_icon">
        </a>
        <a href="https://www.pen-kanagawa.ed.jp/yokosuka-h/zennichi/index.html" target="_blank" class="no_new_tab_icon no_border" title="学校ホームページ">
            <img src="src/img/school_mark.svg" alt="校章" id="school_mark">
        </a>
    </div>
    <!-- 以下の1文は、Twitterのアイコンのガイドラインに従ってつけているためアイコンを使用している限り消去不可 -->
    TWITTER, TWEET, RETWEET and the Twitter logo are trademarks of Twitter, Inc. or its affiliates.
</footer>`
);



// リップルエフェクトの設定
new Ripple(".ripple_effect", {
    on: "pointerdown"
});

new Ripple("#menu ul li", {
    on: "pointerdown"
});



// イースターエッグ
new Konami(() => {
    alert("特に何も起こらないですよ笑");
});



// スクロールするとヘッダーに色がつく処理
if (document.documentElement.scrollTop !== 0) { // 読み込み時にすでにスクロールされていた場合（再読み込みの場合など）
    document.querySelector("header").classList.add("scrolled");
}

window.addEventListener("scroll", () => {
    if (document.documentElement.scrollTop === 0) {
        document.querySelector("header").classList.remove("scrolled");
    } else {
        document.querySelector("header").classList.add("scrolled");
    }
});



// ハンバーガーメニューの処理
function open_menu() {
    document.querySelector("menu").classList.add("open");
}

function close_menu() {
    document.querySelector("menu").classList.remove("open");
}

document.getElementById("menu_open_button").addEventListener("click", open_menu);

document.getElementById("menu_overlay").addEventListener("click", close_menu);

document.getElementById("menu_close_button").addEventListener("click", close_menu);



// スライドショーの処理
const header_image_transition_time = 2;
document.querySelectorAll(".slideshow").forEach((element) => {
    const header_image_list = element.getElementsByTagName("img");

    if (getComputedStyle(element).getPropertyValue("position") === "static") {
        element.style.position = "relative";
        element.style.top = "0";
        element.style.left = "0";
    }

    element.insertAdjacentHTML("beforeend", `
    <button class="slideshow_back_button"><i class="material_icon">arrow_back</i></button>
    <button class="slideshow_forward_button"><i class="material_icon">arrow_forward</i></button>
    `);

    document.body.insertAdjacentHTML("beforeend", `
    <style>
        .slideshow .slideshow_back_button,
        .slideshow .slideshow_forward_button {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            border: none;
            outline: none;
            z-index: ${getComputedStyle(header_image_list[0]).getPropertyValue("z-index")};
            cursor: pointer;
        }

        .slideshow .slideshow_back_button {
            left: 1rem;
        }

        .slideshow .slideshow_forward_button {
            right: 1.5rem;
        }

        .slideshow .slideshow_back_button i,
        .slideshow .slideshow_forward_button i {
            background: rgba(255, 255, 255, 0.5);
            color: #333333;
            border-radius: 1rem;
            font-size: 1.5rem;
            transition: 0.3s;
        }

        .slideshow .slideshow_back_button i:hover,
        .slideshow .slideshow_forward_button i:hover {
            background: white;
        }
    </style>
    `);

    let header_image_list_index = 0;

    header_image_list[0].style.transition = `${header_image_transition_time}s`;
    for (let i = 1; i < header_image_list.length; i++) {
        header_image_list[i].style.transition = "0s";
        header_image_list[i].style.opacity = "0";
        header_image_list[i].style.transition = `${header_image_transition_time}s`;
    }

    function slideshow_forward() {
        header_image_list[header_image_list_index].style.opacity = "0";

        header_image_list_index++;
        if (header_image_list_index > header_image_list.length - 1) {
            header_image_list_index = 0;
        }

        header_image_list[header_image_list_index].style.opacity = "1";
    }

    function slideshow_back() {
        header_image_list[header_image_list_index].style.transition = `${header_image_transition_time}s`;

        header_image_list[header_image_list_index].style.opacity = "0";

        header_image_list_index--;
        if (header_image_list_index < 0) {
            header_image_list_index = header_image_list.length - 1;
        }

        header_image_list[header_image_list_index].style.transition = `${header_image_transition_time}s`;
        header_image_list[header_image_list_index].style.opacity = "1";
    }

    element.querySelector(".slideshow_forward_button").addEventListener("click", slideshow_forward);
    element.querySelector(".slideshow_back_button").addEventListener("click", slideshow_back);

    setInterval(
        slideshow_forward,
        5000 + header_image_transition_time * 500
    );
});
