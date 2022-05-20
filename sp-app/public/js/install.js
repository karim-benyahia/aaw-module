'use strict';

let deferredInstallPrompt = null;

let installButton;
var isIOS = navigator.userAgent.match(/iPhone|iPod/) && !window.MSStream;
var isMobile = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i);
var isTablet = navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/Tablet/i);
window.deviceCategory = isMobile ? 'mobile' : 'desktop';
window.deviceOs = isIOS ? "ios" : "android" ;
var pwapi;
var googletag = window.googletag || {};
var pbjs = window.pbjs || {};
pbjs.que = window.pbjs.que || [];
var OBR = window.OBR || {};
var LUX = window.LUX || {};
document.addEventListener("load", () => {

    installButton = document.getElementById('butInstall');
    if(installButton)
        installButton.addEventListener('click', installPWA);
})

// CODELAB: Add event listener for beforeinstallprompt event
window.addEventListener('beforeinstallprompt', saveBeforeInstallPromptEvent);

function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
        return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }

    return "unknown";
}


/**
 * Event handler for beforeinstallprompt event.
 *   Saves the event & shows install button.
 *
 * @param {Event} evt
 */
function saveBeforeInstallPromptEvent(evt) {
    // CODELAB: Add code to save event & show the install button.
    deferredInstallPrompt = evt;
    installButton = document.getElementById('butInstall');
    if(installButton) {
        installButton.removeAttribute('hidden');
        installButton.addEventListener('click', installPWA);
    }
}

/**
 * Event handler for butInstall - Does the PWA installation.
 *
 * @param {Event} evt
 */
function installPWA(evt) {
    // CODELAB: Add code show install prompt & hide the install button.
    deferredInstallPrompt.prompt();
    // Hide the install button, it can't be called twice.
    evt.currentTarget.setAttribute('hidden', true);
    // CODELAB: Log user response to prompt.
    deferredInstallPrompt.userChoice.then(choice => {
        if (choice.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt', choice);
        } else {
            console.log('User dismissed the A2HS prompt', choice);
        }
        deferredInstallPrompt = null;
    });
}

// CODELAB: Add event listener for appinstalled event
window.addEventListener('appinstalled', logAppInstalled);

/**
 * Event handler for appinstalled event.
 *   Log the installation to analytics or save the event somehow.
 *
 * @param {Event} evt
 */
function logAppInstalled(evt) {
    // CODELAB: Add code to log the event
    console.log('Weather App was installed.', evt);
}


// let newWorker;
//
// function showUpdateBar() {
//     let snackbar = document.getElementById('snackbar');
//     snackbar.className = 'show';
// }
//
// function skipWaiting() {
//     newWorker.postMessage({action: 'skipWaiting'});
// }

// The click event on the pop up notification
// document.getElementById('snackbar').addEventListener('click', function () {
//     console.log("reload");
//     newWorker.postMessage({action: 'skipWaiting'});
// });

// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//         navigator.serviceWorker.register('/service-worker.js').then(reg => {
//             // reg.addEventListener('updatefound', () => {
//             //     // A wild service worker has appeared in reg.installing!
//             //     newWorker = reg.installing;
//             //     newWorker.addEventListener('statechange', () => {
//             //         // Has network.state changed?
//             //         switch (newWorker.state) {
//             //             case 'installed':
//             //                 if (navigator.serviceWorker.controller) {
//             //                     // new update available
//             //                     showUpdateBar();
//             //                 }
//             //                 // No update available
//             //                 break;
//             //         }
//             //     });
//             // });
//         });
//
//         let refreshing;
//         navigator.serviceWorker.addEventListener('controllerchange', function () {
//             if (refreshing) return;
//             // window.location.reload();
//             refreshing = true;
//         });
//     });
//
// }


const check = () => {
    if (!('serviceWorker' in navigator)) {
        throw new Error('No Service Worker support!')
    }
    if (!('PushManager' in window)) {
        throw new Error('No Push API Support!')
    }
}

const registerServiceWorker = async () => {
    const swRegistration = await navigator.serviceWorker.register(new URL('/js/service-worker.min.js'))//notice the file name
    return swRegistration;
};

const requestNotificationPermission = async () => {
    const permission = await window.Notification.requestPermission();
    // value of permission can be 'granted', 'default', 'denied'
    // granted: user has accepted the request
    // default: user has dismissed the notification permission popup by clicking on x
    // denied: user has denied the request.
    if(permission !== 'granted'){
        throw new Error('Permission not granted for Notification');
    }
}

const main = async () => { //notice I changed main to async function so that I can use await for registerServiceWorker
    check();
    const swRegistration = await registerServiceWorker();
    const permission =  await requestNotificationPermission();
};

main();
