/* eslint-disable */
import {saveAs} from './fileSaver';

const canvasHelpers = {

  generateCoordinates(direction, height, width) {
    switch (direction) {
      case 'to left':
        return [width, height, 0, height];
      case 'to right':
        return [0, height, width, height];
      case 'to top':
        return [0, height, 0, 0];
      case 'to bottom':
        return [width, 0, width, height];
      default:
        return [];
    }
  },

  /**
   * TODO: Calculate the color stops programmatically
   */
  generateFillStyle(grd, ...colors) {
    switch (colors.length) {
      case 2:
        grd.addColorStop(0, colors[0]);
        grd.addColorStop(1, colors[1]);
        break;
      case 3:
        grd.addColorStop(0, colors[0]);
        grd.addColorStop(0.5, colors[1]);
        grd.addColorStop(1, colors[2]);
        break;
      case 4:
        grd.addColorStop(0, colors[0]);
        grd.addColorStop(0.4, colors[1]);
        grd.addColorStop(0.8, colors[2]);
        grd.addColorStop(1, colors[3]);
        break;
      case 5:
        grd.addColorStop(0, colors[0]);
        grd.addColorStop(0.25, colors[1]);
        grd.addColorStop(0.5, colors[2]);
        grd.addColorStop(0.75, colors[3]);
        grd.addColorStop(1, colors[4]);
        break;
      default:
    }
    return grd;
  },

};

export const canvasToBlob = () => {
  if (!(typeof window.HTMLCanvasElement !== 'undefined' &&
      typeof window.atob !== 'undefined' &&
      typeof window.Blob !== 'undefined' &&
      typeof window.ArrayBuffer !== 'undefined' &&
      typeof window.Uint8Array !== 'undefined')) {
    return
  }
  var CanvasPrototype = window.HTMLCanvasElement.prototype;
  if (!CanvasPrototype.toBlob && CanvasPrototype.toDataURL) {
    CanvasPrototype.toBlob = function (callback, type, quality) {
      let uri = this.toDataURL(type, quality)
      var mime = uri.split(',')[0].split(':')[1].split(';')[0];
      var bytes = atob(uri.split(',')[1]);
      var len = bytes.length;
      var buffer = new window.ArrayBuffer(len);
      var arr = new window.Uint8Array(buffer);

      for (var i = 0; i < len; i++) {
        arr[i] = bytes.charCodeAt(i);
      }
      callback(
        new Blob([arr], {
          type: mime
        })
      );
    }
  }
}

export const canvasToImg = (direction, name, ...colors)=> {
  canvasToBlob()
  const canvas = document.createElement('canvas');

  canvas.id = 'canva';
  canvas.width = screen.width;
  canvas.height = screen.height;
  canvas.style.zIndex = 1;
  canvas.style.position = 'absolute';
  document.body.appendChild(canvas);

  const canva = document.getElementById('canva');
  const ctx = canva.getContext('2d');

  const dir = canvasHelpers.generateCoordinates(direction, canvas.height, canvas.width);
  const grd = ctx.createLinearGradient(...dir);

  ctx.fillStyle = canvasHelpers.generateFillStyle(grd, ...colors);
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  canvas.toBlob((blob) => {
    saveAs(blob, `${name}.jpg`);
  });

  document.getElementById('canva').remove();
}
