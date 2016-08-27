const throttle = (fn, delay) => {
	let timer = null;
	return function () {
		let args = arguments;
		clearTimeout(timer);
		timer = setTimeout(() => {
			fn.apply(this, args);
		}, delay);
	};
};

export default {
	throttle
};
