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
    selectors: {
        slider: '.js-slider',
        el: '.reviews'
    },
    config(options = {}) {
        const settings = {
            slidesPerView: 3,
            slidesPerGroup: 1,
            loop: true,
            speed: 500,
            autoplay: {
                delay: 5000
            },
            spaceBetween: 120,
            direction: 'horizontal',
            effect: 'coverflow',
            coverflowEffect: {
                rotate: 0,
                modifer: 1,
                slideShadows: false,
                stretch: 0
            },
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

            slider.slides[slider.activeIndex + 1].classList.add('_active');

            slider.on('slideChange', (swiper) => {
                for (const slide of swiper.slides) {
                    slide.classList.remove('_active');
                }

                swiper.slides[swiper.activeIndex + 1].classList.add('_active');
            });

        }
    }
};

// Init function
const init = () => {
    dd('init();');
    header.init();
    reviews.init();
}

document.addEventListener('DOMContentLoaded', init);