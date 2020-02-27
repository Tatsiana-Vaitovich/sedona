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
  ["Красные скалы", 1000],
];
let empty = [];

//размеры облака запишем в виде констант:
const CLOUD_WIDTH = 1200;
const CLOUD_HEIGHT = 600;
const ClOUD_INDENT = CLOUD_WIDTH/40;
const ClOUD_FONT = "30px sans-serif";
const ARR_INDENT = 2.5;

//отрисуем область и тень:
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
function renderCloud(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH - 10, CLOUD_HEIGHT - 10);
}

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
function renderStatistics(arr) {
  //перебираю значения массива и вывожу столбцы для каждого значения:
  for (let i = 0; i < arr.length; i++) {
    const ARR_NUMBER = arr.length;
    let arrProperty = arr[i];
    const NAME = arrProperty[0];
    const VALUE = arrProperty[1];
    ctx.fillStyle = "rgba(255,255,255,1)";
    ctx.font = ClOUD_FONT;
    ctx.fillText(NAME, calcXAxisIndent(), calcYAxisTextIndent());
    ctx.fillRect(calcXAxisIndent(), calcYAxisColumnIndent(), calcColumnWidth(), -calcColumnHeight());
    //функция для нахождения высоты столбца
    function calcColumnHeight() {
      const COLUMN_HEIGHT = calcMaxColumnHeight() * calcFactorColumnHeight();
      return COLUMN_HEIGHT;
    }
    //функция для нахождения ширины столбцы
    function calcColumnWidth() {
      const COLUMN_WIDTH = calcTotalElementWidth() - calcElementIndent();
      return COLUMN_WIDTH;
    }
    //функция для нахождения общей ширины элемента
    function calcTotalElementWidth() {
      const TOTAL_ELEMENT_WIDTH = CLOUD_WIDTH / ARR_NUMBER;
      return TOTAL_ELEMENT_WIDTH;
    }
    //функция для нахождения отступа элемента
    function calcElementIndent() {
      const ELEMENT_INDENT = ClOUD_INDENT * ARR_INDENT;
      return ELEMENT_INDENT;
    }
    //определение максимального значения высоты столбца
    function calcMaxColumnHeight() {
      const MAX_COLUMN_HEIGHT = CLOUD_HEIGHT - ClOUD_INDENT * 7;
      return MAX_COLUMN_HEIGHT;
    }
    //определение коэффициента высоты столбца
    function calcFactorColumnHeight() {
      const FACTOR_HEIGHT = VALUE / renderMaxValue(arr);
      return FACTOR_HEIGHT;
    }
    //определение отступа элемента по оси х
    function calcXAxisIndent() {
      const X_AXIS_INDENT = calcColumnWidth() * i + ClOUD_INDENT * (i + ARR_INDENT);
      return X_AXIS_INDENT;
    }
    //определение отступа текста по оси у
    function calcYAxisTextIndent() {
      const Y_AXIS_TEXT_INDENT = CLOUD_HEIGHT - ClOUD_INDENT * ARR_INDENT;
      return Y_AXIS_TEXT_INDENT;
    }
    //определение отступа столбца по оси у
    function calcYAxisColumnIndent() {
      const Y_AXIS_COLUMN_INDENT = CLOUD_HEIGHT - 1.5 * ClOUD_INDENT * ARR_INDENT;
      return Y_AXIS_COLUMN_INDENT;
    }
  }
}
//поиск максимального значения
function renderMaxValue(arr) {
  let arrProperty = arr[0];
  let maxValue = arrProperty[1];
  for (let i = 1; i < arr.length; i++) {
    arrProperty = arr[i];
    const VALUE = arrProperty[1];
    if (VALUE > maxValue) {
      maxValue = VALUE;
    }
  }
  return maxValue;
}
//проверка массива на пустоту
function checkArr(arr) {
for (let key in arr) {
  return true; //если тело начнет выполнятся, значит в объекте есть свойства;
  } alert("массив пуст");
}
//вызовем полученные функции для отрисовки на странице гистограммы
renderCloud(ctx, 10, 0,"#e5e5e5");
renderCloud(ctx, 0, 10, "rgba(129, 179, 210, 1)");
renderStatistics(attractions);
//checkArr(empty);
//renderMaxValue(attractions);
