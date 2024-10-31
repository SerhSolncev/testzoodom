document.addEventListener('DOMContentLoaded', (event) => {
	const getElement = (context, selector) => {
		if (!context && !selector) {
			return null;
		}

		return context.querySelector(selector);
	};

	function loadSwiper() {
		const script = document.createElement('script');
		script.src = 'js/modules/swiper.min.js';
		script.onload = function() {
			const homeSlider = document.querySelectorAll('[data-slider="home-slider"]');

			if(homeSlider !== null) {

				homeSlider.forEach((el) => {
					const shopSwiper = new Swiper(el.querySelector('.swiper-container'), {
						freeMode: false,
						watchSlidesVisibility: true,
						watchSlidesProgress: true,
						simulateTouch: true,
						loop: false,
						slidesPerView: 1,
						slidesPerGroup: 1,
						followFinger: true,
						// autoplay: {
						// 	delay: 10000,
						// 	disableOnInteraction: false,
						// },
						effect: 'fade',
						fadeEffect: {
							crossFade: true
						},
						spaceBetween: 0,
						on: {
							afterInit: (event) => {

							},

						},
						navigation: {
							nextEl: getElement(el.closest('[data-slider="home-slider"]'), '.js-next-swiper'),
							prevEl: getElement(el.closest('[data-slider="home-slider"]'), '.js-prev-swiper'),
							disabledClass: 'swiper-lock'
						},
						pagination: {
							el: el.querySelector('.swiper-pagination'),
							clickable: true,
							// type: 'progressbar'
						},
					});
				})
			}

			const wildSlider = document.querySelectorAll('[data-slider="wild-slider"]');

			if(wildSlider !== null) {

				wildSlider.forEach((el) => {
					const shopSwiper = new Swiper(el.querySelector('.swiper-container'), {
						freeMode: false,
						watchSlidesVisibility: true,
						watchSlidesProgress: true,
						simulateTouch: true,
						loop: false,
						slidesPerView: 4,
						slidesPerGroup: 1,
						followFinger: true,
						spaceBetween: 4,
						autoplay: {
							delay: 3000,
							disableOnInteraction: true,
						},
						speed: 700,
						on: {
							afterInit: (event) => {

							},

						},
						navigation: {
							nextEl: getElement(el.closest('[data-slider="wild-slider"]'), '.js-next-swiper'),
							prevEl: getElement(el.closest('[data-slider="wild-slider"]'), '.js-prev-swiper'),
							disabledClass: 'swiper-lock'
						},
						pagination: {
							el: el.querySelector('.swiper-pagination'),
							clickable: true,
							// type: 'progressbar'
						},
						breakpoints: {
							0: {
								slidesPerView: 1,
								slidesPerGroup: 1,
								spaceBetween: 10
							},
							560: {
								slidesPerView: 2,
								slidesPerGroup: 2,
								spaceBetween: 20
							},
							860: {
								slidesPerView: 3,
								slidesPerGroup: 1,
								spaceBetween: 20
							},
							1200: {
								slidesPerView: 4,
								slidesPerGroup: 2,
								spaceBetween: 20
							}
						},
					});

				})

			}

			const wildSliderSec = document.querySelectorAll('[data-slider="wild-slider-sec"]');

			if(wildSliderSec !== null) {

				wildSliderSec.forEach((el) => {
					const shopSwiper = new Swiper(el.querySelector('.swiper-container'), {
						freeMode: false,
						watchSlidesVisibility: true,
						watchSlidesProgress: true,
						simulateTouch: true,
						loop: false,
						slidesPerView: 4,
						slidesPerGroup: 1,
						followFinger: true,
						spaceBetween: 4,
						on: {
							// afterInit: (event) => {
							// 	el.closest('[data-slider="wild-slider-sec"]').classList.remove('end')
							// },
							// reachEnd: () => {
							// 	// Добавляем класс, когда долистали до конца
							// 	el.closest('[data-slider="wild-slider-sec"]').classList.add('end');
							// },
							// fromEdge: () => {
							// 	// Убираем класс, когда начинаем скроллить обратно
							// 	el.closest('[data-slider="wild-slider-sec"]').classList.remove('end');
							// }
						},
						navigation: {
							nextEl: getElement(el.closest('[data-slider="wild-slider-sec"]'), '.js-next-swiper'),
							prevEl: getElement(el.closest('[data-slider="wild-slider-sec"]'), '.js-prev-swiper'),
							disabledClass: 'swiper-lock'
						},
						pagination: {
							el: el.querySelector('.swiper-pagination'),
							clickable: true,
							// type: 'progressbar'
						},
						breakpoints: {
							0: {
								slidesPerView: 2,
								slidesPerGroup: 1,
								spaceBetween: 10
							},
							640: {
								slidesPerView: 2,
								slidesPerGroup: 1,
								spaceBetween: 10
							},
							1200: {
								slidesPerView: 4,
								slidesPerGroup: 2,
								spaceBetween: 20
							}
						},
					});

				})

			}

			const wildSliderTree = document.querySelectorAll('[data-slider="wild-slider-three"]');

			if(wildSliderTree !== null) {

				wildSliderTree.forEach((el) => {
					const shopSwiper = new Swiper(el.querySelector('.swiper-container'), {
						freeMode: false,
						watchSlidesVisibility: true,
						watchSlidesProgress: true,
						simulateTouch: true,
						loop: false,
						slidesPerView: 4,
						slidesPerGroup: 1,
						followFinger: true,
						spaceBetween: 4,
						on: {
							afterInit: (event) => {

							},

						},
						navigation: {
							nextEl: getElement(el.closest('[data-slider="wild-slider-three"]'), '.js-next-swiper'),
							prevEl: getElement(el.closest('[data-slider="wild-slider-three"]'), '.js-prev-swiper'),
							disabledClass: 'swiper-lock'
						},
						pagination: {
							el: el.querySelector('.swiper-pagination'),
							clickable: true,
							// type: 'progressbar'
						},
						breakpoints: {
							0: {
								slidesPerView: 1,
								slidesPerGroup: 1,
								spaceBetween: 20
							},
							560: {
								slidesPerView: 2,
								slidesPerGroup: 1,
								spaceBetween: 10
							},
							860: {
								slidesPerView: 3,
								slidesPerGroup: 1,
								spaceBetween: 10
							},
							1200: {
								slidesPerView: 4,
								slidesPerGroup: 2,
								spaceBetween: 20
							}
						},
					});

				})

			}

			const doubleSlider = document.querySelectorAll('[data-slider="double-slider"]');

			if(doubleSlider !== null) {

				doubleSlider.forEach((el) => {
					const shopSwiper = new Swiper(el.querySelector('.swiper-container'), {
						freeMode: false,
						watchSlidesVisibility: true,
						watchSlidesProgress: true,
						simulateTouch: true,
						loop: false,
						slidesPerView: 2,
						slidesPerGroup: 1,
						followFinger: true,
						spaceBetween: 4,
						on: {
							afterInit: (event) => {

							},

						},
						navigation: {
							nextEl: getElement(el.closest('[data-slider="double-slider"]'), '.js-next-swiper'),
							prevEl: getElement(el.closest('[data-slider="double-slider"]'), '.js-prev-swiper'),
							disabledClass: 'swiper-lock'
						},
						pagination: {
							el: el.querySelector('.swiper-pagination'),
							clickable: true,
							// type: 'progressbar'
						},
						breakpoints: {
							0: {
								slidesPerView: 1,
								slidesPerGroup: 1,
								spaceBetween: 10
							},
							1200: {
								slidesPerView: 2,
								slidesPerGroup: 1,
								spaceBetween: 20
							}
						},
					});

				})

			}

			const brandsSlider = document.querySelectorAll('[data-slider="brands-slider"]');

			if(brandsSlider !== null) {

				brandsSlider.forEach((el) => {
					const shopSwiper = new Swiper(el.querySelector('.swiper-container'), {
						freeMode: false,
						watchSlidesVisibility: true,
						watchSlidesProgress: true,
						simulateTouch: true,
						slidesPerView: 2,
						slidesPerGroup: 1,
						followFinger: true,
						spaceBetween: 4,
						on: {
							afterInit: (event) => {

							},

						},
						autoplay: {
							delay: 3000,
							disableOnInteraction: true,
						},
						speed: 700,
						navigation: {
							nextEl: getElement(el.closest('[data-slider="brands-slider"]'), '.js-next-swiper'),
							prevEl: getElement(el.closest('[data-slider="brands-slider"]'), '.js-prev-swiper'),
							disabledClass: 'swiper-lock'
						},
						pagination: {
							el: el.querySelector('.swiper-pagination'),
							clickable: true,
							// type: 'progressbar'
						},
						breakpoints: {
							0: {
								slidesPerView: 3,
								slidesPerGroup: 1,
								spaceBetween: 10
							},
							768: {
								slidesPerView: 5,
								slidesPerGroup: 1,
								spaceBetween: 20
							},
							1200: {
								slidesPerView: 7,
								slidesPerGroup: 2,
								spaceBetween: 20
							}
						},
					});

				})

			}
		};
		document.body.appendChild(script);
	}

	setTimeout(loadSwiper, 1000);
})
