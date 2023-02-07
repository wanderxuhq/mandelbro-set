(async () => {
	const width = 800;
	const height = 800;
	const iterator = 256;

	const mandelbrot = async (dx, dy, zoom) => {
		ctx.fillStyle = '#000000';
		ctx.fillRect(0, 0, width, height);
		dx = dx * zoom;
		dy = dy * zoom;

		const xlist = Array.from({ length: width }, (_, i) => -width / 2 + i + dx);
		const ylist = Array.from({ length: height }, (_, i) => -height / 2 + i - dy);
		xlist.forEach(async (x) => {
			ylist.forEach((y) => {
				(async () => {
					const z = { x: 0, y: 0 };
					for (let k = 0; k < iterator; k++) {
						const tx = z.x;
						const ty = z.y;
						z.x = tx * tx - ty * ty + x / zoom;
						z.y = 2 * tx * ty + y / zoom;
						if (Math.sqrt(z.x * z.x + z.y * z.y) > 2) {
							return { k, x, y };
						}

					}
					return {k: -1};
				})()
					.then(r => {
						if (r.k !== -1) {
							ctx.fillStyle = 'rgba(' + (256 - r.k) + ',' + (256 - r.k) + ',' + (256 - r.k) + ',256' + ')';
							ctx.fillRect(r.x + width / 2 - dx, r.y + height / 2 + dy, 1, 1);
						}
					});
			});
		});
	}

	var canvas;
	var ctx;
	window.onload = function () {
		canvas = document.getElementById('canvas');
		ctx = canvas.getContext('2d');
		var dx = 0;
		var dy = 0;
		var zoom = 128;

		ctx.fillStyle = '#000000';
		ctx.fillRect(0, 0, width, height);

		mandelbrot(dx, dy, zoom);

		canvas.addEventListener('wheel', function (e) {
			dx += (-width / 2 + e.offsetX * 0.2 + 0.4 * width) / zoom;
			dy += (height / 2 - e.offsetY * 0.2 - 0.4 * height) / zoom;
			if (e.deltaY < 0) {
				zoom *= 1.25;
			} else {
				zoom /= 1.25;
			}
			mandelbrot(dx, dy, zoom);
			console.log(dx, dy, zoom);
		});
	}

})();