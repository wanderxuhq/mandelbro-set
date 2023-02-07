(function(){
var width = 1920;
var height = 1080;
var iterator = 256;
function mandelbrot(dx, dy, zoom){
	dx = dx * zoom;
	dy = dy * zoom;
	for(var x = -width / 2 + dx; x < width / 2 + dx; x++){
		for(var y = -height / 2 - dy; y < height / 2 - dy; y++){
			var z = {x: 0, y: 0};
			for(var k = 0; k < iterator; k++){
				var tx = z.x;
				var ty = z.y;
				z.x = tx * tx - ty * ty + x / zoom;
				z.y = 2 * tx * ty + y / zoom;
				if(Math.sqrt(z.x * z.x + z.y * z.y) <= 2){
					ctx.fillStyle = '#000000';
				} else {
					ctx.fillStyle = 'rgba(' + (256 - k) + ',' + (256 - k) + ','  + (256 - k) + ',256' + ')';
					//ctx.fillStyle = '#FFFFFF';
					break;
				}
			}
			//console.log(x,y);
			ctx.fillRect(x + width / 2 - dx ,y + height / 2 + dy,1,1);
		}
	}
}

var canvas;
var ctx;
window.onload = function(){
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	var dx = 0;
	var dy = 0;
	var zoom = 512;
	mandelbrot(dx, dy, zoom);
	
	canvas.addEventListener('wheel', function(e){
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