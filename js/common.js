document.addEventListener('DOMContentLoaded', (event) => {
	document.body.classList.add('loading');


	// lazy-load
	const el = document.querySelectorAll('.lazy');
	window.observer = lozad(el);
	window.observer.observe();


	window.addEventListener('scroll', function () {
		if (window.scrollY > 50 && window.innerWidth > 1279) {
			const categoriesMenu = document.querySelector('.js-categories-menu');
			categoriesMenu.classList.remove('show');
			document.querySelectorAll('.js-categories-block').forEach(block => block.classList.remove('show'));

			setTimeout(() => {
				document.querySelectorAll('.js-categories-block').forEach(block => block.classList.remove('block'));
			}, 100)
		}
	});

	window.addEventListener('scroll', function () {
		if (window.scrollY > document.querySelector('.js-header').offsetHeight) {
			document.querySelector('.header').classList.add('scroll');
		} else {
			document.querySelector('.header').classList.remove('scroll');
		}
	});

	if (window.scrollY > document.querySelector('.js-header').offsetHeight) {
		document.querySelector('.header').classList.add('scroll');
	} else {
		document.querySelector('.header').classList.remove('scroll');
	}

	// inview

	const animItems = document.querySelectorAll('.js-inview');

	const animObserver = new IntersectionObserver((entries, observer) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				const target = entry.target;
				target.classList.add('animate');
				observer.unobserve(target);
			}
		});
	}, {
		threshold: 0
	});

	animItems.forEach(animItem => {
		animObserver.observe(animItem);
	});

	// fav added class
	const addFav = document.querySelectorAll('.js-like-add');

	if(addFav.length > 0) {
		addFav.forEach( (elem) => {
			elem.addEventListener('click', () => {
				const id = elem.getAttribute('data-id')
				const url = elem.getAttribute('data-url')
				elem.classList.toggle('added')

				fetch(url, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ addFav: elem.classList.contains('added'), id: id })
				})
				.then(response => response.text())
				.then(data => {
				})
				.catch(error => console.error('Ошибка загрузки данных:', error));

			})
		})
	}

	//  choose price
	const cartSelects = document.querySelectorAll('.js-cart-select');

	cartSelects.forEach(cartSelect => {
		const selectBody = cartSelect.querySelector('.cart-select__body');
		const selectDrop = cartSelect.querySelector('.cart-select__drop');
		const selectText = cartSelect.querySelector('.cart-select__text');
		const cartPrice = cartSelect.closest('.js-cart-price'); // Родительский блок js-cart-price

		selectBody.addEventListener('click', function () {
			selectDrop.classList.toggle('open');
		});

		const selectItems = selectDrop.querySelectorAll('.cart-select__item');
		selectItems.forEach(item => {
			item.addEventListener('click', function () {
				selectText.textContent = item.textContent.trim();

				if (cartPrice) {
					const oldPrice = item.getAttribute('data-check-old');
					const currentPrice = item.getAttribute('data-check-current');

					const priceOldElement = cartPrice.querySelector('[data-price-old]');
					const priceCurrentElement = cartPrice.querySelector('[data-price-current]');

					if (priceOldElement && oldPrice) {
						priceOldElement.textContent = `${oldPrice} грн`;
					}
					if (priceCurrentElement && currentPrice) {
						priceCurrentElement.textContent = `${currentPrice} грн`;
					}
				}

				selectDrop.classList.remove('open');
			});
		});

		document.addEventListener('click', function (e) {
			if (!cartSelect.contains(e.target)) {
				selectDrop.classList.remove('open');
			}
		});
	});

	// acc
	document.addEventListener('click', (event) => {
		const button = event.target.closest('.js-open-acc');
		if (!button) return;

		const parentWrap = button.closest('.js-acc-wrap');
		const parentAcc = button.closest('.js-acc');
		const contentsItem = parentAcc.querySelector('.js-acc-block');
		const mobileMenuBody = document.querySelector('.mobile-menu__body');

		if (parentAcc.classList.contains('active')) {
			contentsItem.style.maxHeight = '0';
			parentAcc.classList.remove('active');

			if (parentAcc.classList.contains('promo-block')) {
				parentAcc.querySelector('input').value = '';
			}
		} else {
			const contents = parentWrap.querySelectorAll('.js-acc-block');
			contents.forEach((block) => {
				block.style.maxHeight = '0';
			});

			parentWrap.querySelectorAll('.js-acc').forEach((parentItem) => {
				parentItem.classList.remove('active');
			});

			contentsItem.style.maxHeight = contentsItem.scrollHeight + "px";
			parentAcc.classList.add('active');
		}

		if (button.classList.contains('categ-item--mob')) {
			const targetPosition = parentAcc.offsetTop - mobileMenuBody.offsetTop - 300;
			mobileMenuBody.scrollTo({
				top: targetPosition,
				behavior: 'smooth'
			});
		}

		parentWrap.style.maxHeight = 'initial';
	});


	// acc-sec
	document.addEventListener('click', (event) => {
		const button = event.target.closest('.js-open-acc-m');
		if (!button) return;

		const parentAcc = button.closest('.js-acc-m');
		const accBlock = parentAcc.querySelector('.js-acc-block-m');
		const allAccBlocks = button.closest('.js-acc-wrap-m').querySelectorAll('.js-acc-block-m');
		const mobileMenuBody = document.querySelector('.mobile-menu__body');

		if (parentAcc.classList.contains('active-m')) {
			accBlock.style.maxHeight = '0';
			parentAcc.classList.remove('active-m');
			return;
		}

		allAccBlocks.forEach((block) => {
			block.style.maxHeight = '0';
		});
		button.closest('.js-acc-wrap-m').querySelectorAll('.js-acc-m').forEach((item) => {
			item.classList.remove('active-m');
		});

		setTimeout(() => {
			accBlock.style.maxHeight = accBlock.scrollHeight + "px";
			parentAcc.classList.add('active-m');

			const buttonPosition = button.getBoundingClientRect().top + window.scrollY;
			const mobileMenuBodyTop = mobileMenuBody.getBoundingClientRect().top + window.scrollY;
			const scrollToPosition = buttonPosition - mobileMenuBodyTop + mobileMenuBody.scrollTop;

			const scrollToButtonPosition = () => {
				mobileMenuBody.scrollTo({
					top: scrollToPosition - 20,
					behavior: 'smooth'
				});
			};

			const resizeObserver = new ResizeObserver(() => {
				if (accBlock.style.maxHeight === `${accBlock.scrollHeight}px`) {
					setTimeout(() => {
						scrollToButtonPosition();
						resizeObserver.disconnect();
					}, 100);
				}
			});

			resizeObserver.observe(mobileMenuBody);
		}, 300);
	});

	// call-dropdowns
	let callTriggers = document.querySelectorAll('.js-trigger-drop');

	function showDropdown(dataId) {
		let callDropdown = document.querySelector(`.js-hover-dropdown[data-id="${dataId}"]`);
		let callTriggers = document.querySelectorAll(`.js-trigger-drop[data-id="${dataId}"]`);
		let windowWidth = window.innerWidth;

		if (!callDropdown.classList.contains('show')) {
			closeAllDropdowns();
		}

		callDropdown.classList.add('show');

		callTriggers.forEach(trigger => {
			trigger.classList.add('opened');
		});

		if (windowWidth < 991) {
			document.body.style.overflow = 'hidden';
		}

		let callClose = callDropdown.querySelector('.js-drop-close');
		if (callClose !== null) {
			callClose.addEventListener('click', function() {
				hideDropdown(dataId);
			});
		}
	}

	function hideDropdown(dataId) {
		let callDropdown = document.querySelector(`.js-hover-dropdown[data-id="${dataId}"]`);
		let callTriggers = document.querySelectorAll(`.js-trigger-drop[data-id="${dataId}"]`);

		callDropdown.classList.remove('show');

		callTriggers.forEach(trigger => {
			trigger.classList.remove('opened');
		});
		document.body.style.overflow = 'initial';

		if (document.querySelector('.micromodal-slide.is-open')) {
			MicroModal.close();
		}
	}

	function toggleDropdown(dataId) {
		let callDropdown = document.querySelector(`.js-hover-dropdown[data-id="${dataId}"]`);
		let isDropdownOpen = callDropdown.classList.contains('show');

		if (isDropdownOpen) {
			hideDropdown(dataId);
		} else {
			showDropdown(dataId);
		}
	}

	function closeAllDropdowns() {
		let allDropdowns = document.querySelectorAll('.js-hover-dropdown');
		let allTriggers = document.querySelectorAll('.js-trigger-drop');

		allDropdowns.forEach(dropdown => dropdown.classList.remove('show'));
		allTriggers.forEach(trigger => trigger.classList.remove('opened'));
		document.body.style.overflow = 'initial';
		if (document.querySelector('.micromodal-slide.is-open')) { // Проверяем, есть ли открытое модальное окно
			MicroModal.close();
		}
	}

	function setupDropdownBehavior() {
		let windowWidth = window.innerWidth;

		callTriggers.forEach(trigger => {
			let dataId = trigger.getAttribute('data-id');

			trigger.addEventListener('click', function(e) {
				e.preventDefault();

				setTimeout(() => {
					if(trigger.classList.contains('opened')) {
						if(dataId === 'drop-search') {
							const input = document.querySelector('.search-dropdown').querySelector('input');
							const event = new Event('touchstart', { bubbles: true });
							setTimeout(() => {
								input.dispatchEvent(event);
								input.focus();
								input.click();
							}, 50)
						}
					}
				}, 500)

				if (windowWidth < 991) {
					toggleDropdown(dataId);
				} else if(windowWidth > 991 && trigger.classList.contains('burger')) {
					toggleDropdown(dataId);
				}

			});
		});
	}

	setupDropdownBehavior();


	// search get
	let searchTimeout;
	const searchResultWrap = document.querySelector('.js-search-block');

	function performSearch(query) {
		const lowerCaseQuery = query.toLowerCase();

		if (lowerCaseQuery.includes('purina') || lowerCaseQuery.startsWith('pu') || lowerCaseQuery.startsWith('пу')) {
			fetch('search-list.html')
			.then(response => response.text())
			.then(data => {
				const searchResultBlock = searchResultWrap.querySelector('.js-search-result');
				searchResultBlock.innerHTML = data;
				searchResultBlock.classList.add('has-result');

				// Скрываем js-search-empty, если есть результаты
				searchResultWrap.querySelector('.js-search-empty').style.display = 'none';
				searchResultWrap.querySelector('.js-hover-dropdown').classList.add('show');
			});
		} else {
			removeHtml();

			if(query.length > 0) {
				const emptyError = searchResultWrap.querySelector('.js-search-empty .empty-search__error');
				searchResultWrap.querySelector('.js-search-empty').style.display = 'block';
				emptyError.classList.add('show');

				searchResultWrap.querySelector('.js-hover-dropdown').classList.add('show');
			}

		}
	}

	function removeHtml() {
		const searchResultBlock = searchResultWrap.querySelector('.js-search-result');
		searchResultBlock.innerHTML = '';
		searchResultBlock.classList.remove('has-result');
	}

	function toggleClearButton(input) {
		const clearButton = input.parentElement.querySelector('.js-search-clear');
		if (input.value.length > 2) {
			clearButton.classList.add('visible');
		} else {
			clearButton.classList.remove('visible');
		}
	}

	document.querySelectorAll('.js-search-input').forEach(input => {
		input.addEventListener('input', function() {
			const query = this.value;
			clearTimeout(searchTimeout);

			toggleClearButton(this);

			searchTimeout = setTimeout(() => {
				performSearch(query);
			}, 300);

			if (query.length === 0) {
				searchResultWrap.querySelector('.js-search-empty').style.display = 'block';
				searchResultWrap.querySelector('.empty-search__error').classList.remove('show');
				removeHtml();
			}
		});

		input.addEventListener('focus', function() {
			searchResultWrap.querySelector('.js-hover-dropdown').classList.add('show');
		});
	});

	document.querySelectorAll('.js-search-clear').forEach(button => {
		button.addEventListener('click', function() {
			const input = this.parentElement.querySelector('.js-search-input');
			input.value = '';
			const event = new Event('touchstart', { bubbles: true });
			setTimeout(() => {
				input.dispatchEvent(event);
				input.focus();
			}, 50);
			this.classList.remove('visible');

			setTimeout(() => {
				removeHtml();
				searchResultWrap.querySelector('.js-search-empty').style.display = 'block';
				searchResultWrap.querySelector('.empty-search__error').classList.remove('show');
			}, 200);
		});
	});

	document.addEventListener('click', function(event) {
		if (window.innerWidth > 991) {
			if (!event.target.closest('.js-search-block')) {
				const dropdown = document.querySelector('.js-hover-dropdown');
				if (dropdown.classList.contains('show')) {
					dropdown.classList.remove('show');
				}
			}
		}
	});


	// popups
	document.querySelectorAll('[data-id-modal]').forEach(button => {
		button.addEventListener('click', function () {
			const modalId = this.getAttribute('data-id-modal');

			if (button.classList.contains('opened')) {
				MicroModal.close(modalId, {
					awaitCloseAnimation: true
				});
			} else {
				MicroModal.show(modalId, {
					awaitCloseAnimation: true,
					onShow: () => {
						document.body.style.overflow = 'hidden';
						button.classList.add('opened');
						if (document.querySelector('.js-hover-dropdown.show')) {
							document.querySelector('.js-hover-dropdown.show').classList.remove('show');
							document.querySelector('.js-trigger-drop.opened').classList.remove('opened');
						}
					},
					onClose: () => {
						document.body.style.overflow = 'initial';
						button.classList.remove('opened');
					}
				});
			}
		});
	});

	document.querySelectorAll('.js-close-modal').forEach(button => {
		button.addEventListener('click', () => {
			MicroModal.close();
			document.body.style.overflow = 'initial';
		});

	});

	const addToCart = document.querySelectorAll('.js-add-to-cart');

	if(addToCart.length > 0) {
		addToCart.forEach((elem) => {
			const id = elem.getAttribute('data-id');
			const url = elem.getAttribute('data-url');

			elem.addEventListener('click', () => {
				MicroModal.show('basket-popup', {
					onShow: () => {
						document.body.style.overflow = 'hidden';
						if(document.querySelector('.js-hover-dropdown.show')) {
							document.querySelector('.js-hover-dropdown.show').classList.remove('show');
							document.querySelector('.js-trigger-drop.opened').classList.remove('opened');

						}
					},
					onClose: () => {
						document.body.style.overflow = 'initial';
					}
				});
				fetch(url, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ addToCart: true, id: id })
				})
				.then(response => response.text())
				.then(data => {
					// Check if there are no more .js-basket-cart elements in the .basket-list
					const basketList = document.querySelector('.basket-list');
					if (!basketList.querySelector('.js-basket-cart')) {
						basketList.closest('.basket-popup').classList.add('basket-popup--empty');
					}
				})
				.catch(error => console.error('Ошибка загрузки данных:', error));
			})
		})
	}

	// password

	document.querySelectorAll('.js-show-password').forEach((el) => {
		const input = el.nextElementSibling;

		el.addEventListener('click', () => {
			if (el.classList.contains('show')) {
				el.classList.remove('show');
				input.type = 'password';
			} else {
				el.classList.add('show');
				input.type = 'text';
			}
		});

		// Clear the 'show' class and reset input type when the input is cleared
		input.addEventListener('input', () => {
			if (input.value === '') {
				el.classList.remove('show');
				input.type = 'password';
			}
		});
	});

	// send form
	const jsForm = document.querySelectorAll('.js-form');

	if (jsForm !== null) {
		jsForm.forEach((formItem) => {
			let inputs = formItem.querySelectorAll('input, textarea, select');

			inputs.forEach(function(input) {
				// Проверяем наличие атрибута data-required
				if (input.hasAttribute('data-required')) {
					input.addEventListener('input', () => {
						if (input.value.length > 1) {
							input.classList.remove('error');
						} else {
							input.classList.add('error');
						}
					});
				}
			});

			formItem.addEventListener('submit', function(event) {
				event.preventDefault();

				let inputs = formItem.querySelectorAll('input, textarea');
				let errorBlock = formItem.querySelector('.error-form'); // Находим блок error-form
				let isValid = true;

				// Убираем ошибки с полей
				inputs.forEach(function(input) {
					input.classList.remove('error');
					if (input.classList.contains('hidden-input')) {
						input.closest('.js-custom-select').classList.remove('error');
					}
				});

				// Проверяем, заполнены ли обязательные поля
				inputs.forEach(function(input) {
					if (input.hasAttribute('data-required') && !input.value) {
						isValid = false;
						input.classList.add('error');
						if (input.classList.contains('hidden-input')) {
							input.closest('.js-custom-select').classList.add('error');
						}
					}
				});

				// Показываем блок error-form, если форма не валидна
				if (!isValid && errorBlock) {
					errorBlock.style.display = 'block';
				} else if (errorBlock) {
					errorBlock.style.display = 'none';
				}

				// Если форма валидна, отправляем данные
				if (isValid) {
					var formData = new FormData(this);
					var dataArray = [];
					formData.forEach(function(value, key) {
						dataArray.push({ key: key, value: value });
					});

					var xhr = new XMLHttpRequest();
					xhr.open('POST', 'your_php_script.php', true);
					xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
					xhr.onload = function() {
						if (xhr.status >= 200 && xhr.status < 400) {
							console.log('Data sent successfully');
						} else {
							console.error('Error sending data');
						}
					};
					xhr.send(JSON.stringify(dataArray));
					console.log(dataArray);
				}
			});
		});
	}

	// number validation
	const phoneNumber = document.querySelectorAll('.js-number-inp');

	if(phoneNumber !== null) {
		phoneNumber.forEach((phoneIinput) => {
			phoneIinput.addEventListener('input', function() {
				phoneIinput.value = this.value.replace(/[^0-9]/g, ''); // Allow only numbers
			});
		})
	}

	if(document.querySelectorAll('.js-mini-category').length > 0) {
		document.querySelectorAll('.js-mini-category').forEach(button => {
			button.addEventListener('mouseenter', () => {
				if (window.innerWidth > 1279) {
					const dataId = button.getAttribute('data-id');
					const categoriesMenu = document.querySelector('.js-categories-menu');
					const targetBlock = document.querySelector(`.js-categories-block[data-id="${dataId}"]`);

					document.querySelectorAll('.js-categories-block').forEach(block => block.classList.remove('show', 'block'));
					document.querySelectorAll('.js-mini-category').forEach(btn => btn.classList.remove('active'));

					categoriesMenu.classList.add('show');

					targetBlock.classList.add('block');
					setTimeout(() => {
						targetBlock.classList.add('show');
						adjustMenuHeight(categoriesMenu);
					}, 100);

					button.classList.add('active');
				}
			});
		});

		const categoriesMenu = document.querySelector('.js-categories-menu');
		categoriesMenu.addEventListener('mouseleave', () => {
			categoriesMenu.classList.remove('show');
			document.querySelectorAll('.js-categories-block').forEach(block => block.classList.remove('show', 'block'));
			document.querySelectorAll('.js-mini-category').forEach(btn => btn.classList.remove('active'));
		});

		document.querySelector('.js-header').addEventListener('mouseenter', () => {
			categoriesMenu.classList.remove('show');
			document.querySelectorAll('.js-categories-block').forEach(block => block.classList.remove('show', 'block'));
			document.querySelectorAll('.js-mini-category').forEach(btn => btn.classList.remove('active'));
		});

		function adjustMenuHeight(menu) {
			menu.style.height = 'auto';
			const height = menu.scrollHeight;
			menu.style.height = `${height}px`;
		}

		categoriesMenu.addEventListener('transitionend', () => {
			if (!categoriesMenu.classList.contains('show')) {
				categoriesMenu.style.height = '0';
			}
		});


	}

	document.addEventListener('click', (event) => {
		const priceCart = event.target.closest('.js-price-cart');

		if (!priceCart) return;

		const countProd = priceCart.querySelector('.js-count-prod');
		const plus = countProd.querySelector('.js-count-plus');
		const minus = countProd.querySelector('.js-count-minus');
		const input = countProd.querySelector('input');
		const priceCur = priceCart.querySelector('.js-price-cart-cur');
		const priceTotal = priceCart.querySelector('.js-price-cart-total');

		const getNumberFromText = (element) => {
			const cleanText = element.textContent.replace(/\s/g, '');
			const match = cleanText.match(/[\d,.]+/);
			return match ? parseFloat(match[0].replace(',', '.')) : 0;
		};

		const updatePrice = () => {
			const unitPrice = getNumberFromText(priceCur);
			const quantity = parseInt(input.value);
			const totalPrice = unitPrice * quantity;
			priceTotal.textContent = `${totalPrice.toLocaleString('ru-RU')} грн`;
		};

		if (plus.contains(event.target)) {
			let num = parseInt(input.value);
			input.value = num + 1;
			updatePrice();
		} else if (minus.contains(event.target)) {
			let num = parseInt(input.value);
			if (num > 1) {
				input.value = num - 1;
				updatePrice();
			}
		}
	});


	const baskDel = document.querySelectorAll('.js-basket-del');

	baskDel.forEach((elem) => {
		const parent = elem.closest('.js-basket-cart');
		const id = parent.getAttribute('data-id');
		const url = parent.getAttribute('data-url');
		const delBlock = parent.querySelector('.del-cart');
		const delYes = delBlock.querySelector('.js-del-yes');
		const delNo = delBlock.querySelector('.js-del-no');

		elem.addEventListener('click', () => {
			delBlock.classList.add('show');
		});

		delNo.addEventListener('click', () => {
			delBlock.classList.remove('show');
		});

		delYes.addEventListener('click', () => {
			parent.remove();
			fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ deleteCart: true, id: id })
			})
			.then(response => response.text())
			.then(data => {
				// Check if there are no more .js-basket-cart elements in the .basket-list
				const basketList = document.querySelector('.basket-list');
				if (!basketList.querySelector('.js-basket-cart')) {
					basketList.closest('.basket-popup').classList.add('basket-popup--empty');
				}
			})
			.catch(error => console.error('Ошибка загрузки данных:', error));
		});
	});


	// fetcj mobcategs

	setTimeout(() => {
		fetch('categories-mob.html')
		.then(response => response.text())
		.then(data => {
			document.querySelector('.js-append-after').insertAdjacentHTML('afterend', data);
		})
		.catch(error => console.error('Ошибка загрузки данных:', error));
	}, 1000)

	// fetch categs

	setTimeout(() => {
		fetch('categories.html')
		.then(response => response.text())
		.then(data => {
			document.querySelector('.js-append-categories').innerHTML = data;
		})
		.catch(error => console.error('Ошибка загрузки данных:', error));
	}, 1000)
});
