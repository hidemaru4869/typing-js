// JavaScript をここに書きます
const wordlist = ["tonkotsura-men", "aaiebakouiu", "isogabamaware", "uogokoroarebamizugokoro", "ennositanotikaramoti", "oninomenimonamida", "kaiinunitewokamareru", "kyuusiniissyouwoeru", "kutihawazawainomoto", "geijutuhanagakujinseihamijikasi", "koukaisakinitatazu", "sarumokikaraotiru", "siranugahotoke", "suimoamaimokamiwaketa", "zenhaisoge", "daihasyouwokaneru", "tirimotumorebayamatonaru", "turuhasennenkamehamannen", "tenhanibutuwoataezu", "tokihakanenari", "nagaimononihamakarero", "nidoarukotohasandoaru", "nukanikugi", "nekonotemokaritai", "norenniudeosi", "hayaokihasanmonnotoku", "hinonaitokoronikemurihatatanu", "hukusuibonnikaerazu", "benkeinonakidokoro", "hotokenokaomosando", "mayugewoyomareru", "mikaradetasabi", "musumehitorinimukohatinin", "menihame,hanihaha", "motonosayaniosamaru", "yakeisinimizu", "yudantaiteki", "yowarimenitatarime", "rakuhakunotane,kuharakunotane", "ryouyakuhakutininigasi", "ruihatomowoyobu", "reiniyottereinogotosi", "rongoyominorongosirazu", "waraukadonihahukukitaru"];
const wordlistJapanese = ["豚骨ラーメン", "ああ言えばこう言う", "急がば回れ", "魚心あれば水心", "縁の下の力持ち", "鬼の目にも涙", "飼い犬に手を噛まれる", "九死に一生を得る", "口は禍の元", "芸術は長く人生は短し", "後悔先に立たず", "猿も木から落ちる", "知らぬが仏", "酸いも甘いも噛み分けた", "善は急げ", "大は小を兼ねる", "塵も積もれば山となる", "鶴は千年亀は万年", "天は二物を与えず", "時は金なり", "長い物には巻かれろ", "二度あることは三度ある", "糠に釘", "猫の手も借りたい", "暖簾に腕押し", "早起きは三文の徳", "火のないところに煙は立たぬ", "覆水盆に反らず", "弁慶の泣き所", "仏の顔も三度", "眉毛を読まれる", "身から出た錆", "娘一人に婿八人", "目には目、歯には歯", "元の鞘に納まる", "焼け石に水", "油断大敵", "弱り目に祟り目", "楽は苦の種、苦は楽の種", "良薬は口に苦し", "類は友を呼ぶ", "例によって例の如し", "論語読みの論語知らず", "笑う門には福来たる"];
const words = document.querySelector('#words');
const japanese = document.querySelector('#japanese');
const time_limit = 30;
const REDY_TIME = 3;

var time_remaining;
var requestAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;
window.requestAnimationFrame = requestAnimationFrame;
var cancelAnimationFrame = window.cancelAnimationFrame ||
    window.mozcancelAnimationFrame ||
    window.webkitcancelAnimationFrame ||
    window.mscancelAnimationFrame;
window.cancelAnimationFrame = cancelAnimationFrame;
start_button.addEventListener("click", ready, false);
var activeWord;
var activeLetterIndex = 0;

// startボタン押下後のカウントダウンと開始処理
function ready() {
    readytime = REDY_TIME;
    scoredis.innerHTML = "";
    start_button.style.visibility = "hidden";
    // initialize count down time
    time_remaining = time_limit;
    var readytimer = setInterval(function () {
        count.innerHTML = readytime;
        readytime--;
        if (readytime < 0) {
            clearInterval(readytimer);
            createWordTag();
            timerCountDown();
            render();
            window.addEventListener("keydown", handleKeydown);
        }
    }, 1000);
}

// タイピングする文字列の生成処理
function createWordTag() {
    // TODO:取得方法をランダムにする
    let wordStr = wordlist[0];
    let wordViewStr = wordlistJapanese[0];
    japanese.innerText = wordViewStr;
    // TODO:一旦１単語だけ追加
    let word = document.createElement("div");
    word.classList.add("word", "active");
    words.appendChild(word);
    Array.from(wordStr).forEach(x => {
        let letter = document.createElement("letter");
        letter.classList.add("word");
        letter.innerText = x;
        word.appendChild(letter);
    });

}


function timerCountDown() {
    let gametimer = setInterval(function () {
        time_remaining--;
        if (time_remaining < 0) {
            clearInterval(gametimer);
            finish();
            start_button.style.visibility = "visible";
            start_button.value = "restart";
        }
    }, 1000);
}

// タイピング中の残り時間の表示処理
function render() {
    let requestId = window.requestAnimationFrame(render);
    //再描画時の処理
    count.innerHTML = "残り時間：" + time_remaining;
    if (time_remaining < 0) {
        count.innerHTML = "タイムアップ！";
        window.cancelAnimationFrame(requestId);
    }
}
// 入力されたキーを検出する
function handleKeydown(event) {
    // キーコード
    var keyCode = event.keyCode;
    console.log("押されたキーのコード : " + keyCode);
}
// 終了時処理 
function finish() {
    while (words.firstChild) {
        words.firstChild.remove();
    }
    japanese.innerText = "";
    window.removeEventListener("keydown", handleKeydown);
}
