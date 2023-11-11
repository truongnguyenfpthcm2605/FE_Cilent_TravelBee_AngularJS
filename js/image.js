
  var currentImageIndex = 0;
  var imageUrls = ['images/communication-4871245_1280.webp', 'images/pt2.jpg', 'images/pt3.jpg', 'images/pt4.jpg', 'images/pt5.jpg'];

  function changeImage(imageUrl) {
    var mainImage = document.getElementById('mainImage');
    mainImage.classList.remove('animate__fadeIn');
    mainImage.classList.add('animate__fadeOut');
    setTimeout(function() {
      mainImage.src = imageUrl;
      mainImage.classList.remove('animate__fadeOut');
      mainImage.classList.add('animate__fadeIn');
    }, 500);

    var thumbnailImages = document.getElementsByClassName('thumbnail-image');
    for (var i = 0; i < thumbnailImages.length; i++) {
      thumbnailImages[i].classList.remove('active');
    }

    var selectedThumbnail = event.target;
    selectedThumbnail.classList.add('active');

    currentImageIndex = imageUrls.indexOf(imageUrl);
  }

  function nextImage() {
    var mainImage = document.getElementById('mainImage');
    mainImage.classList.remove('animate__fadeIn');
    mainImage.classList.add('animate__fadeOut');
    setTimeout(function() {
      currentImageIndex++;
      if (currentImageIndex >= imageUrls.length) {
        currentImageIndex = 0;
      }
      var imageUrl = imageUrls[currentImageIndex];
      mainImage.src = imageUrl;
      mainImage.classList.remove('animate__fadeOut');
      mainImage.classList.add('animate__fadeIn');
  
      var thumbnailImages = document.getElementsByClassName('thumbnail-image');
      for (var i = 0; i < thumbnailImages.length; i++) {
        thumbnailImages[i].classList.remove('active');
      }
  
      thumbnailImages[currentImageIndex].classList.add('active');
    }, 500);
  }

  function prevImage() {
    var mainImage = document.getElementById('mainImage');
    mainImage.classList.remove('animate__fadeIn');
    mainImage.classList.add('animate__fadeOut');
    setTimeout(function() {
      currentImageIndex--;
      if (currentImageIndex < 0) {
        currentImageIndex = imageUrls.length - 1;
      }
      var imageUrl = imageUrls[currentImageIndex];
      mainImage.src = imageUrl;
      mainImage.classList.remove('animate__fadeOut');
      mainImage.classList.add('animate__fadeIn');

      var thumbnailImages = document.getElementsByClassName('thumbnail-image');
      for (var i = 0; i < thumbnailImages.length; i++) {
        thumbnailImages[i].classList.remove('active');
      }

      thumbnailImages[currentImageIndex].classList.add('active');
    }, 500);
  }
