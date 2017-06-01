(function () {
  this.imageProcessor = function () {
    return {
      // image를 element의 배경화면에 가운데 채우기
      fillImageStyle: function (element, image) {
        var elW = element.offsetWidth
        var elH = element.offsetHeight
        var imgW = image.width
        var imgH = image.height
        var bgW = 0
        var bgH = 0
        var bgX = 0
        var bgY = 0
        if (elW / elH < imgW / imgH) {
          bgH = elH
          bgW = imgW * elH / imgH
          bgX = -(bgW - elW) / 2
        } else {
          bgW = elW
          bgH = imgH * elW / imgW
          bgY = -(bgH - elH) / 2
        }
        return {
          background: `url(${image.src})`,
          backgroundSize: `${bgW}px ${bgH}px`,
          backgroundPosition: `${bgX}px ${bgY}px`
        }
      },
      fitToImageStyle: function (element, image) {
        var elW = element.offsetWidth
        var imgW = image.width
        var imgH = image.height
        var bgW = 0
        var bgH = 0
        var bgX = 0
        var bgY = 0
        if (elW < imgW) {
          bgW = elW
          bgH = imgH * bgW / imgW
        } else {
          bgW = imgW
          bgH = imgH
          bgX = (elW - imgW) / 2
        }
        return {
          background: `url(${image.src}) no-repeat`,
          backgroundSize: `${bgW}px ${bgH}px`,
          backgroundPosition: `${bgX}px ${bgY}px`,
          width: `${elW}px`,
          height: `${bgH}px`
        }
      }
    }
  }
}).call(this)
