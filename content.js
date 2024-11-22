console.log('Content script loaded');

function removeOverlay() {
    'use strict';

    var elem = document.getElementById('aid-overlay');
    if (elem) {
        elem.parentNode.removeChild(elem);
        console.log('Overlay removed');
    }
}

function removeBackgroundBlur() {
    'use strict';

    var elems = document.querySelectorAll('.aid-background-blur');
    elems.forEach(function(elem) {
        elem.classList.remove('aid-background-blur');
    });
    console.log('Background blur class removed');
}

document.addEventListener('DOMContentLoaded', function() {
    removeOverlay();
    removeBackgroundBlur();
});

// Use MutationObserver to handle dynamically added elements
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        removeOverlay();
        removeBackgroundBlur();
    });
});

observer.observe(document.body, { childList: true, subtree: true });