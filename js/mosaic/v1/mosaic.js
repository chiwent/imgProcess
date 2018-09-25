'use strict';
// https://stackoverflow.com/questions/9141367/photo-mosaics-in-javascript 、 https://github.com/ritz078/photomosaic.js/

class Mosaic {
    constructor(options) {
        const defaultOptions = {
            target: '',
            image: '',
            tileWidth: 5,
            tileHeight: 5,
            tileShape: 'rectangle',
            opacity: 1,
            width: undefined,
            height: undefined,
            background: 'rgba(0, 0, 0, 0)'
        };
        this.options = Object.assign(defaultOptions, options);
        this.target = this.options.target;
        this.image = this.options.image;
        this.tileWidth = this.options.tileWidth;
        this.tileHeight = this.options.tileHeight;
        this.tileShape = this.options.tileShape;
        this.opacity = this.options.opacity;
        this.width = this.options.width === undefined ? this.image.width : this.options.width;
        this.height = this.options.height === undefined ? this.image.height : this.options.height;
        this.background = this.options.background;

        this.x = ~~(this.width / this.tileWidth);
        this.y = ~~(this.height / this.tileHeight);
    }
    init() {

        console.log(this.x, this.y)
        if (!this.image) {
            alert('Missing image');
        }
        if (!this.target) {
            alert('Missing target');
        }
        if (this.image.complete) {
            let ctx = this.render();
            this.drawCanvas(ctx);
        }
    }
    render() {
        let canvas = document.createElement('canvas');
        canvas.width = this.tileWidth * this.x;
        canvas.height = this.tileHeight * this.y;
        let ctx = canvas.getContext('2d');
        if (!ctx) {
            alert('Your Browser does not support Canvas');
        }
        ctx.fillStyle = this.background;
        ctx.beginPath();
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.closePath();
        ctx.fill();
        ctx.drawImage(this.image, 0, 0, canvas.width, canvas.height);
        return ctx;
    }
    averageColor(data) {
        let index = -4,
            blockSize = 5,
            count = 0,
            rgb = {
                r: 0,
                g: 0,
                b: 0
            },
            length = data.length;
        while ((index += blockSize * 4) < length) {
            count++;
            rgb.r += data[index];
            rgb.g += data[index + 1];
            rgb.b += data[index + 2];
        }
        rgb.r = ~~(rgb.r / count);
        rgb.g = ~~(rgb.g / count);
        rgb.b = ~~(rgb.b / count);
        return rgb;
    }
    drawCanvas(ctx) {
            let canvas = document.createElement('canvas');
            let width = canvas.width = ctx.canvas.width;
            let height = canvas.height = ctx.canvas.height;

            let processingCtx = canvas.getContext('2d');
            let originalImgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
            for (let row = 0; row < this.y; row++) {
                for (let col = 0; col < this.x; col++) {
                    let x = col * this.tileWidth,
                        y = row * this.tileHeight;
                    let imageData = this.getImageData(x, y, width, originalImgData);
                    let aveColor = this.averageColor(imageData);

                    let color = 'rgba(' + aveColor.r + ',' + aveColor.g + ',' + aveColor.b + ',' + this.opacity + ')';
                    processingCtx.fillStyle = color;
                    this.createMosaic(x, y, processingCtx);
                }
            }
            this.target.appendChild(canvas);
        }
        // different from context.getImageData
    getImageData(x, y, width, originalImgData) {
        let pixels = [];

        for (let i = x; i < (x + this.tileWidth); i++) {
            for (let j = y; j < (y + this.tileHeight); j++) {
                pixels.push(
                    originalImgData.data[i * 4 + originalImgData.width * 4 * j + 0],
                    originalImgData.data[i * 4 + originalImgData.width * 4 * j + 1],
                    originalImgData.data[i * 4 + originalImgData.width * 4 * j + 2],
                    originalImgData.data[i * 4 + originalImgData.width * 4 * j + 3]
                );
            }
        }
        return pixels;
    }
    createMosaic(x, y, ctx) {
        if (this.tileShape === 'circle') {
            let centerX = x + this.tileWidth / 2,
                centerY = y + this.tileHeight / 2,
                radius = Math.min(this.tileWidth, this.tileHeight) / 2;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fill();
        } else if (this.tileShape === 'rectangle') {
            let height = this.tileHeight,
                width = this.tileWidth;
            ctx.beginPath();
            ctx.rect(x, y, width, height);
            ctx.closePath();
            ctx.fill();
        } else {
            alert('The "tileShape" option is error!')
        }
    }
}