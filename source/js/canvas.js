"use strict";

//получаем доступ к самому тегу <canvas> с помощью метода getElementById
let canvas = document.getElementById('mycanvas');
//получим объект, который занимается отрисовкой на canvas - контекст отрисовки
//в данном случае для отрисовки 2-мерной графики
let ctx = canvas.getContext('2d');

//размеры облака запишем в виде констант:

let attractions = [
  ["Мост Дьявола", 3000], 
  ["Гора-Колокол", 2000], 
  ["Слайд-парк", 5000], 
  ["Красные скалы", 1000]
];

let empty = []

const CLOUD_WIDTH = 1200;
const CLOUD_HEIGHT = 600;
const ClOUD_INDENT = CLOUD_WIDTH/40;
const ClOUD_FONT = "30px sans-serif";
const ARR_INDENT = 2.5;

/*let attractionsNumber = attractions.length;
let columnWidth = CLOUD_WIDTH/attractionsNumber - ClOUD_INDENT*2;
let attractionsIndent = 0;
let attractionsName = attractions[0];*/

//отрисуем область, в которой будет показываться статистика
//ctx.strokeRect(0, 0, CLOUD_WIDTH, CLOUD_HEIGHT);

/*отрисуем тень
ctx.fillStyle = "#e5e5e5";
ctx.fillRect(40, 40, 200, 200);*/
/*отрисуем область, в которой будет показываться статистика
ctx.fillStyle = "rgba(129, 179, 210, 1)";
ctx.fillRect(50, 50, 200, 200);*/

//избавимся от повторений и напишем функцию отрисовки области и тени
//Чтобы функция работала корректно, нужно передать в неё контекст отрисовки как параметр
//Функция рисует два похожих шейпа, но на разных координатах, поэтому сделаем так, 
//чтобы положение облака тоже задавалось параметрами
//Облака бывают разных цветов, поэтому цвет тоже перенесём в параметры

let renderCloud = function(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH - 10, CLOUD_HEIGHT - 10);
};

//вызовем функции отрисовки облака и тени
renderCloud(ctx, 10, 0,"#e5e5e5");
renderCloud(ctx, 0, 10, "rgba(129, 179, 210, 1)");

//отрисуем гистограмму посещаемости достопримечательностей Седоны 
//для достопримечательности с максимальным количеством посещений:

/*ctx.fillStyle = "rgba(255,255,255,.7)";
ctx.font = "18px sans-serif";
ctx.fillText(attractionsName, ClOUD_INDENT*(3 + attractionsIndent), CLOUD_HEIGHT - ClOUD_INDENT*2);
ctx.fillStyle = "rgb(255,255,255)";
ctx.fillRect(ClOUD_INDENT*3, ClOUD_INDENT*(3 + attractionsIndent), columnWidth, CLOUD_HEIGHT - ClOUD_INDENT*7);

//для остальных достопримечательностей высота столбца гистограммы будет равна:
//(CLOUD_HEIGHT - CLOUD_INDENT * 7) * visitsNumber/maxVisitsNumber
ctx.fillStyle = "rgba(255,255,255,.7)";
ctx.font = "18px sans-serif";
ctx.fillText(attractions[1], columnWidth + ClOUD_INDENT*(3+1), CLOUD_HEIGHT - ClOUD_INDENT*2);
ctx.fillStyle = "rgb(255,255,255)";
ctx.fillRect(columnWidth + ClOUD_INDENT*(3+1), ClOUD_INDENT*3, columnWidth, CLOUD_HEIGHT - ClOUD_INDENT*7);
*/
//чтобы избавится от повторений напишем функцию отрисовки гистограммы

let renderStatistics = function(arr) {
    let arrNumber = arr.length;
    let columnWidth = (CLOUD_WIDTH / arrNumber) - (ClOUD_INDENT * ARR_INDENT);

  //перебираю значения массива и вывожу столбцы для каждого значения:
    for (let i = 0; i < arr.length; i++) {
      let arrProperty = arr[i];
      let name = arrProperty[0];
      let value = arrProperty[1];
      let columnHeight = (CLOUD_HEIGHT - ClOUD_INDENT * 7) * value / renderMaxValue(arr);
      ctx.fillStyle = "rgba(255,255,255,1)";
      ctx.font = ClOUD_FONT;
      ctx.fillText(name, columnWidth * i + ClOUD_INDENT * (i + ARR_INDENT), CLOUD_HEIGHT - ClOUD_INDENT * ARR_INDENT);
      ctx.fillStyle = "rgba(255,255,255,1)";
      ctx.fillRect(columnWidth * i + ClOUD_INDENT * (i + ARR_INDENT), CLOUD_HEIGHT - 1.5 * ClOUD_INDENT * ARR_INDENT, columnWidth, -columnHeight);
    }
};



//поиск максимального значения
function renderMaxValue(arr) {
  let arrProperty = arr[0];
  let maxValue = arrProperty[1];
  for (let i = 1; i < arr.length; i++) {
    arrProperty = arr[i];
    let value = arrProperty[1];
    if (value > maxValue) {
      maxValue = value;
    }
  }
  return maxValue;
};

//проверка массива на пустоту
function checkArr(arr) {
for (let key in arr) {
  return true; //если тело начнет выполнятся, значит в объекте есть свойства;
} alert("массив пуст");
}

renderStatistics(attractions);
//checkArr(empty);

//renderMaxValue(attractions);
