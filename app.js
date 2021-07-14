const bg = document.querySelector('.background');
const quote = document.querySelector('.quote');
const createWidget = document.querySelector('.create-widget');
const widget = document.querySelector('.widget');
const close = document.querySelectorAll('.close');
const getCode = document.querySelector('.get-code');
const modal = document.querySelector('.modal');
const widgetQuote = document.querySelector('.widget-quote');
const widgetBg = document.querySelector('.quote-bg');
const bgColors = document.querySelectorAll('.bgColors');
const fontColors = document.querySelectorAll('.fontColors');
const copy = document.querySelector('.copy');
const textarea = document.querySelector('textarea');
const toast = document.querySelector('.toast');

//클라이언트 width, height에 따라서 bg 이미지 할당
const clientWidth = document.querySelector('body').clientWidth;
const clientHeight = document.querySelector('body').clientHeight;
bg.style.backgroundImage = `url(https://source.unsplash.com/random/${clientWidth}*${clientHeight}/?nature)`;

// quote.innerHTML =
//   '쉽게 허락한 것은 반드시 신뢰성이 희박하고, \n쉽게 하는일이 많으면 어려움이 많이 따른다 -노자';
// widgetQuote.innerHTML =
//   '쉽게 허락한 것은 반드시 신뢰성이 희박하고, \n쉽게 하는일이 많으면 어려움이 많이 따른다 -노자';

//http url
const url =
  'http://ec2-15-165-236-247.ap-northeast-2.compute.amazonaws.com/quote';

//서버와 통신
function getQuote() {
  fetch(url)
    .then(res => res.json())
    .then(res => {
      quote.innerHTML = `${res.message} -${res.author}`;
      widgetQuote.innerText = quote.innerHTML;
    })
    .catch(error => alert('통신에러!'));
}
getQuote();

//1초에 한번씩 데이터 요청함
setInterval(() => {
  const day = new Date();
  //console.log(day.getSeconds());
  if (day.getSeconds() === 0) {
    //quote.innerHTML = '';
    getQuote();
  }
}, 1000);

//위젯 생성 화면 보이기
createWidget.addEventListener('click', () => {
  widget.style.display = 'block';
});

//bg, font color setting
bgColors.forEach(color =>
  color.addEventListener('click', event => {
    const color = event.target.style.backgroundColor;
    widgetBg.style.backgroundColor = color;
  }),
);
fontColors.forEach(color =>
  color.addEventListener('click', event => {
    const color = event.target.style.backgroundColor;
    widgetQuote.style.color = color;
  }),
);

//모달창 오픈
getCode.addEventListener('click', () => {
  textarea.value = widgetBg.outerHTML;
  modal.style.display = 'block';
});

//모달창 bg 클릭할때 닫기
modal.children[0].addEventListener('click', () => {
  modal.style.display = 'none';
});

function fadeout() {
  for (let i = 80; i >= 0; i--) {
    toast.style.opacity = i / 100;
    console.log(i);
  }
}

//copy to clipboard
copy.addEventListener('click', () => {
  textarea.select();
  document.execCommand('copy');
  modal.style.display = 'none';
  widget.style.display = 'none';
  toast.style.display = 'block';
  setTimeout(() => {
    toast.style.display = 'none';
    //fadeout();
  }, 1000);
});

//닫기버튼
close[0].addEventListener('click', () => {
  widget.style.display = 'none';
});
close[1].addEventListener('click', () => {
  modal.style.display = 'none';
});
