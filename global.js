// windowの高さに応じてCSS変数に異なる値を設定する関数
function setWindowHeight() {
    const windowHeight = window.innerHeight;
    let adjustedHeight;
    if (window.innerWidth >= 1535) {
        // PCの場合
        adjustedHeight = windowHeight - 320;
    } else if (window.innerWidth >= 768) {
        //タブレットの場合
        adjustedHeight = windowHeight - 155;
    } else {
        // スマートフォンの場合
        adjustedHeight = windowHeight - 115;
    }
    document.documentElement.style.setProperty('--adjusted-window-height', `${adjustedHeight}px`);
}

// ページロード時とウィンドウサイズ変更時にsetWindowHeight関数を実行
window.addEventListener('load', setWindowHeight);
window.addEventListener('resize', setWindowHeight);

//スクロール時に実行
function onScroll() {
    const elements = document.querySelectorAll('.scroll-animate-element');
    elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        // 要素が画面内に入ったらクラスを追加してアニメーションを付ける
        if (elementTop < windowHeight) {
            element.classList.add('fade-in');
        }
    });
}

// ページロード時に実行
window.addEventListener('load', function () {
    setWindowHeight(); // ウィンドウの高さを設定
    onScroll(); // スクロールアニメーションを適用
});

// ウィンドウのリサイズ時にも実行
window.addEventListener('resize', setWindowHeight);
window.addEventListener('scroll', onScroll);

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
    <button class="slideshow_back_button slideshow"><i class="material_icon">arrow_back</i></button>
    <button class="slideshow_forward_button slideshow"><i class="material_icon">arrow_forward</i></button>
    `);

    document.body.insertAdjacentHTML("beforeend", `
    <style>
        .slideshow_back_button,
        .slideshow_forward_button {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            border: none;
            outline: none;
            z-index: ${getComputedStyle(header_image_list[0]).getPropertyValue("z-index")};
            cursor: url(images/sansyo_cursor.png), default;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 1rem;
        }

        .slideshow_back_button {
            left: 1rem;
        }

        .slideshow_forward_button {
            right: 1.5rem;
        }

        .slideshow_back_button i,
        .slideshow_forward_button i {
            background: rgba(255, 255, 255, 0.5);
            color: #333333;
            border-radius: 1rem;
            font-size: 1.5rem;
            transition: 0.3s;
        }

        .slideshow_back_button i:hover,
        .slideshow_forward_button i:hover {
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

new Ripple(".ripple_effect", {
    on: "pointerdown"
});

new Ripple("#menu ul li", {
    on: "pointerdown"
});