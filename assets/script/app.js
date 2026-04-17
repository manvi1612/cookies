'use strict';

const dialogOne = document.getElementById('dialog-one');
const acceptBtn = document.getElementById('acceptBtn');
const settingsBtn = document.getElementById('settingsBtn');

const LIFETIME = 16;

function setCookie(name, value, maxAge) {
    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    const options = {
        path: '/',
        SameSite: 'Lax'
    };

    for (let option in options) {
        cookieString += `; ${option}=${options[option]}`;
    }

    if (maxAge) {
        cookieString += `; max-age=${maxAge}`;
    }
    document.cookie = cookieString;
}

function getCookie(name) {
    if (document.cookie) {
        const cookieList = document.cookie.split(';');

        for (let cookie of cookieList) {
            let [key, value] = cookie.trim().split('=');

            if (decodeURIComponent(key) === name) {
                return decodeURIComponent(value);
            }
        }
    }
    return null;
}

function getBrowser() {
    const userInfo = navigator.userAgent;

    if (userInfo.includes("Chrome")) return "Chrome";
    if (userInfo.includes("Firefox")) return "Firefox";
    if (userInfo.includes("Safari")) return "Safari";

    return "Unknown Browser";
}

function getOS() {
    const platformInfo = navigator.platform;

    if (platformInfo.includes("Win")) return "Windows";
    if (platformInfo.includes("Mac")) return "MacOS";
    if (platformInfo.includes("Linux")) return "Linux";

    return "Unknown OS";
}

window.addEventListener("load", () => {

    const cookiesExist =
        getCookie("browser") ||
        getCookie("os") ||
        getCookie("width") ||
        getCookie("height") ||
        getCookie("reject");

    if (!cookiesExist) {
        setTimeout(() => {
            dialogOne.style.display = "block";
        }, 16000);
    }
});

acceptBtn.addEventListener('click', () => {

    setCookie('browser', getBrowser(), LIFETIME);
    setCookie('os', getOS(), LIFETIME);
    setCookie('width', screen.width, LIFETIME);
    setCookie('height', screen.height, LIFETIME);

    dialogOne.style.display = 'none';
});

settingsBtn.addEventListener('click', () => {
    dialogOne.style.display = 'none';
    dialogTwo.style.display = 'block';
});


const dialogTwo = document.getElementById('dialog-two');
const saveBtn = document.getElementById('saveBtn');

const browserCheck = document.getElementById('cookie-browser');
const osCheck = document.getElementById('cookie-os');
const widthCheck = document.getElementById('cookie-width');
const heightCheck = document.getElementById('cookie-height');


 
saveBtn.addEventListener('click', () => {

    let selected = false;

    if (browserCheck.checked) {
        setCookie("browser", getBrowser(), LIFETIME);
        selected = true;
    }

    if (osCheck.checked) {
        setCookie("os", getOS(), LIFETIME);
        selected = true;
    }

    if (widthCheck.checked) {
        setCookie("width", screen.width, LIFETIME);
        selected = true;
    }

    if (heightCheck.checked) {
        setCookie("height", screen.height, LIFETIME);
        selected = true;
    }

    if (!selected) {
        setCookie("reject", "true", LIFETIME);
    }

    dialogTwo.style.display = 'none';
});