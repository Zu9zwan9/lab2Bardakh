const TRIANGLE_SIDE_A = 3;
const TRIANGLE_SIDE_B = 4;
const TRIANGLE_SIDE_C = 5;

const CONST_COOKIE_COUNT_MIN_ARRAY = 'array-min-count';
const CONST_LS_COLOR = 'user-input-color';

function changeSection45() {
    var section4 = document.getElementById("section-4");
    var conteiner = document.getElementById("wrap-section-45");
    if (conteiner != null) {
        conteiner.appendChild(section4);
    }
}

function triangle_area(a, b, c) {
    var p = (a + b + c) / 2;
    return Math.sqrt(p * (p - a) * (p - b) * (p - c));
}

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function findCountElemnts() {
    var inputElements = document.getElementsByClassName("input_value");
    var arrayValue = [];
    for (let index = 0; index < inputElements.length; index++) {
        arrayValue.push(parseFloat(inputElements[index].value))
    }

    var minElement = Math.min(...arrayValue);
    var count = arrayValue.filter(x => x === minElement).length;

    window.alert("Count min(" + minElement + ") element=" + count);

    setCookie(CONST_COOKIE_COUNT_MIN_ARRAY, count, 7);
}


function getUserColor() {

    var color = prompt("Please enter color hex value:", "ADCCD9");

    if (color != null) {
        var section3 = document.getElementById("section-3");
        section3.style.color = "#" + color;
        localStorage.setItem(CONST_LS_COLOR, color);
    }
}

function clearUserColor() {
    localStorage.setItem(CONST_LS_COLOR, null);
    var section3 = document.getElementById("section-3");
    section3.style.color = "#000";
}

var listValueArray = [];
const LS_LIST_VALUE = "list-array-value";

function addElementToList() {

    var value = document.getElementById("list-value").value;
    console.log(value);
    listValueArray.push(value);

    var dl = document.getElementById("dynamic-list");
    var li = document.createElement("li");
    li.append(value);
    dl.appendChild(li);

    localStorage.setItem(LS_LIST_VALUE, listValueArray);
}

window.onload = function () {
    changeSection45();

    localStorage.setItem(LS_LIST_VALUE, null);

    const onclickElements = document.getElementsByClassName('onclick-list');
    console.log(onclickElements);

    for (let index = 0; index < onclickElements.length; index++) {
        const element = onclickElements[index];
        element.addEventListener("dblclick", function () {
            var section3content = document.getElementById("section-3-content");
            section3content.classList.remove("hidden");

            var section5content = document.getElementById("section-5-content");
            section5content.classList.remove("hidden");


        });

    }


    var section3 = document.getElementById("section-3");
    if (section3 != null) {
        var element = document.createElement("p");
        element.append("triangle_area=" + triangle_area(TRIANGLE_SIDE_A, TRIANGLE_SIDE_B, TRIANGLE_SIDE_C));
        document.getElementById("section-3-content").appendChild(element);
    }

    var arrayCountValue = getCookie(CONST_COOKIE_COUNT_MIN_ARRAY);

    if (arrayCountValue != null) {

        if (window.confirm("Count element=" + arrayCountValue + ". After clicked button 'ok' cookie will be remove!")) {
            eraseCookie(CONST_COOKIE_COUNT_MIN_ARRAY);

            window.alert("Cookie removed!");
            document.location.reload();
        } else {
            var formInput = document.getElementById("section-3-content");
            formInput.remove();
        }
    }


    var section3Color = localStorage.getItem(CONST_LS_COLOR);
    console.log(section3Color);
    if (section3Color != null) {
        getUserColor();
        var section3 = document.getElementById("section-3");
        section3.style.color = "#" + section3Color;
    }


}