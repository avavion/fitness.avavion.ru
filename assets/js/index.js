// by avavion.
// 19/01/2022

const DEBUG = true;

// Debug hepler function
const dd = (data) => DEBUG && console.log(data);

// Scroll
const scrollOn = () => document.body.style.overflow = '';
const scrollOff = () => document.body.style.overflow = 'hidden';

const getOffsetHeight = (el) => el.offsetHeight;

const header = {
    sticky: () => {
        const $ = document.querySelector('header.header#header');

        if (!$) return false;

        const height = getOffsetHeight($) / 2;

        if (window.scrollY >= height) {
            $.classList.add('is--sticky');
        }

        window.addEventListener('scroll', () => {
            if (window.scrollY >= height) {
                $.classList.add('is--sticky');
            } else {
                $.classList.remove('is--sticky');
            }
        });
    },

    init: () => {
        header.sticky();
    }
}

const reviews = {
    config: {

    },
    slider: (selector) => {
        const elements = document.querySelectorAll(selector);

        for (const element of elements) {
            const slider = new Swiper(element, reviews.config);
        }
    }
};

// Init function
const init = () => {
    dd('init();');
    header.init();
}

document.addEventListener('DOMContentLoaded', init);