console.log('Content script loaded');

function removeOverlay() {
    'use strict';

    var elem = document.getElementById('aid-overlay');
    if (elem) {
        elem.parentNode.removeChild(elem);
        console.log('Overlay removed');
    }
}

function removeOverlay2() {
    'use strict';

    var elems = document.querySelectorAll('.fixed.z-\\[999\\].inset-0.flex.items-center.overflow-y-scroll');
    elems.forEach(function(elem) {
        elem.classList.remove('fixed', 'inset-0', 'w-full', 'h-full', 'bg-[#121214]', 'bg-opacity-90', 'z-[99]');
    });
    console.log('Overlay 2 removed');
}

function removeBackgroundBlur() {
    'use strict';

    var elems = document.querySelectorAll('.aid-background-blur');
    elems.forEach(function(elem) {
        elem.classList.remove('aid-background-blur');
    });
    console.log('Background blur class removed');
}

function removeBackgroundBlur2() {
    'use strict';

    var elems = document.querySelectorAll('.fixed.inset-0.w-full.h-full.bg-\\[\\#121214\\].bg-opacity-90.z-\\[99\\]');
    elems.forEach(function(elem) {
        elem.classList.remove('fixed', 'inset-0', 'w-full', 'h-full', 'bg-[#121214]', 'bg-opacity-90', 'z-[99]');
    });
    console.log('Background blur 2 class removed');
}

function removeScrollLock() {
    'use strict';

    var elems = document.querySelectorAll('[class*="overflow-hidden"][class*="h-screen"]');
    elems.forEach(function(elem) {
        elem.classList.remove('overflow-hidden', 'h-screen');
    });
    console.log('Scroll lock removed');
}


document.addEventListener('DOMContentLoaded', function() {
    removeOverlay();
    removeOverlay2();
    removeBackgroundBlur();
    removeBackgroundBlur2();
    removeScrollLock();
});

// Use MutationObserver to handle dynamically added elements
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        removeOverlay();
        removeOverlay2();
        removeBackgroundBlur();
        removeBackgroundBlur2();
        removeScrollLock();
    });
});

observer.observe(document.body, { childList: true, subtree: true });