// Selectors for elements to remove (i.e. overlays, modals)
const offendingElementSelectors = [
    '#aid-overlay',
    ".modal-incentive-backdrop",
    '.modal-incentive',
    '.fixed.z-\[999\].inset-0.flex.items-center.overflow-y-scroll'
];

// Class selectors to remove from elements (i.e. background blurs, dimmers)
const offendingClassSelectors = [
    '.aid-background-blur',
    '.fixed.inset-0.w-full.h-full.bg-\\[\\#121214\\].bg-opacity-90.z-\\[99\\]',
];

function qSel(selector) {
    // Try to use querySelectorAll, fall back to manual class matching if it fails
    try {
        return document.querySelectorAll(selector);
    } catch (e) {
        let tokens = selector.split('.').filter(Boolean).map(t => t.replace(/\\/g, ''));
        if (tokens.length === 0) return [];
        // Scan all elements and keep those that have every token as a class
        return Array.from(document.getElementsByTagName('*')).filter(el =>
            el.classList && tokens.every(tok => el.classList.contains(tok))
        );
    }
}

function removeElements() {
    offendingElementSelectors.forEach(function (selector) {
        let elems = qSel(selector);
        elems.forEach(function (elem) {
                elem.parentNode.removeChild(elem);
            }
        );
    });
}

function removeClasses() {
    offendingClassSelectors.forEach(function (selector) {
        let elems = qSel(selector);
        elems.forEach(function (elem) {
            elem.classList.remove(...selector.slice(1).split('.'));
        });
    });
}

function removeScrollingRestriction() {
    let elems = qSel('[class*="overflow-hidden"][class*="h-screen"]')
    elems.forEach(function (elem) {
        elem.classList.remove('overflow-hidden', 'h-screen');
    });
}

function process() {
    removeElements();
    removeClasses();
    removeScrollingRestriction();
}

document.addEventListener('DOMContentLoaded', function () {
    process();
});

// Use MutationObserver to handle dynamically added elements
const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        if (mutation.addedNodes.length) {
            process();
        }
    });
});

observer.observe(document.body, {childList: true, subtree: true});
