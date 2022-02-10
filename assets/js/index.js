// by avavion.
// 19/01/2022

const DEBUG = false;
const MOBILE_SCREEN = 576;

// Debug hepler function
const dd = (data) => DEBUG && console.log(data);

// Scroll
const scrollOn = () => document.body.style.overflow = '';
const scrollOff = () => document.body.style.overflow = 'hidden';

// isIphone?

const isNotApple = () => {
    if (!/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        return false;
    }

    return true;
}

const isPhone = () => {
    if (document.body.clientWidth >= MOBILE_SCREEN) {
        return false;
    }

    return true;
}

const getOffsetHeight = (el) => el.offsetHeight;

const video = () => {
    const videos = document.querySelectorAll('video');

    for (const video of videos) {
        video.setAttribute('muted', 'muted')
        video.setAttribute('autoplay', 'autoplay');
        video.setAttribute('loop', 'loop');
    };
}

const header = {
    el: document.querySelector('header.header#header'),
    selectors: {
        sticky: 'is--sticky'
    },
    sticky: () => {
        if (!header.el) return false;

        const height = getOffsetHeight(header.el) / 2;

        if (window.scrollY >= height) {
            header.el.classList.add(header.selectors.sticky);
        }

        window.addEventListener('scroll', () => {
            if (window.scrollY >= height) {
                header.el.classList.add(header.selectors.sticky);
            } else {
                header.el.classList.remove(header.selectors.sticky);
            }
        });
    },

    init: () => {
        location.href.match('index') ? header.sticky() : header.el.classList.add(header.selectors.sticky);
    }
}

const reviews = {
    selectors: {
        slider: '.js-slider',
        el: '.reviews'
    },
    config(options = {}) {
        const settings = {
            slidesPerView: 1,
            slidesPerGroup: 1,
            centeredSlides: true,
            slideActiveClass: "_active",
            loop: true,
            speed: 500,
            autoplay: {
                delay: 5000
            },
            spaceBetween: 30,
            direction: 'horizontal',
            effect: 'coverflow',
            coverflowEffect: {
                rotate: 0,
                modifer: 1,
                slideShadows: false,
                stretch: 0
            },
            breakpoints: {
                576: {
                    spaceBetween: 20,
                    slidesPerView: 2,
                    speed: 1000
                },
                768: {
                    spaceBetween: 60,
                    slidesPerView: 2,
                },
                992: {
                    slidesPerView: 2
                },
                1200: {
                    slidesPerView: 3,
                    spaceBetween: 120
                },
                1400: {
                    slidesPerView: 3,
                    spaceBetween: 120
                },
            }
        };

        return Object.assign(settings, options);
    },
    slider(element, options) {
        return new Swiper(element, this.config(options));
    },
    init(...options) {
        const elements = document.querySelectorAll(`${this.selectors.el} ${this.selectors.slider}`);

        for (const element of elements) {
            const slider = this.slider(element, options);
        }
    }
};

const gallery = () => {
    const gallery = document.querySelector('#gallery');

    if (!gallery) return false;

    const settings = {
        slidesPerView: 1,
        slidesPerGroup: 1,
        centeredSlides: true,
        loop: true,
        speed: 500,
        autoplay: {
            delay: 5000
        },
        spaceBetween: 30,
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
        },
    };

    const slider = new Swiper(gallery, settings);
}

const map = (container) => {

    if (!document.getElementById(container)) return false;

    mapboxgl.accessToken =
        "pk.eyJ1IjoiYXZhdmlvbiIsImEiOiJja3o1aWF5MTYwMmIyMnZyenZoYTluODU1In0.MRjW7tk287m269CaZP2NuQ";
    var map = new mapboxgl.Map({
        container: container,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [49.122335, 55.816852], // starting position [lng, lat]
        zoom: 15 // starting zoom
    });
}

const drawers = () => {
    const showButtons = document.querySelectorAll('[data-modal-show-button]');

    for (const showButton of showButtons) {
        const selectors = {
            drawer: showButton.getAttribute('data-modal'),
            closeButton: '[data-modal-close-button]'
        }

        const drawer = document.querySelector(selectors.drawer);

        if (!drawer) return false;

        const closeButton = drawer.querySelector(selectors.closeButton);

        const show = () => drawer.classList.add('active');
        const hide = () => drawer.classList.remove('active');

        showButton.addEventListener('click', () => {
            scrollOff();
            show();
        })

        closeButton.addEventListener('click', () => {
            scrollOn();
            hide();
        });
    }
}

// Init function
const init = () => {
    dd('init();');
    header.init();
    reviews.init();
    video();
    gallery();
    map('map');
    drawers();
}


document.addEventListener('DOMContentLoaded', init);