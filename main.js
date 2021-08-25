class Product {
  productSelectors = {};
  title = "";
  price = 0;
  images = [];
  infoTabs = [];
  liked = false;

  constructor(images, infoTabs) {
    this.images = images;
    this.infoTabs = infoTabs;
    this.productSelectors = this.getSelectors();
    this.setImages();
    this.setProductInfoClick();
    this.setLikeClicked();
  }

  getSelectors() {
    return {
      mainImage: document.querySelector(".product__image_main"),
      colorSelectOptions: document.querySelector(
        ".product__color_select_options"
      ),
      smallImages: [],
      productInfo: document.querySelectorAll(".product__info"),
      likeIcon: document.querySelector(".like-icon"),
      
    };
  }

  setImages() {
    for (let i = 0; i < this.images.length; i++) {
      if (i === 0) {
        this.productSelectors.mainImage.src = this.images[i];
        this.productSelectors.colorSelectOptions.appendChild(
          this.getSmallImage(i, this.images[i], true)
        );
      } else {
        this.productSelectors.colorSelectOptions.appendChild(
          this.getSmallImage(i, this.images[i])
        );
      }
    }
    console.log(this.productSelectors.smallImages);
  }

  // Setting event listener
  setProductInfoClick() {
    for (let i = 0; i < this.productSelectors.productInfo.length; i++) {
      this.productSelectors.productInfo[i].addEventListener("click", (e) =>
        this.closeAllOpenProductInfo(i)
      );
    }
  }

  // On click will remove all children elements, adding
  closeAllOpenProductInfo(clickId) {
    this.hideAllProductInfo();

    const infoSelector = this.productSelectors.productInfo[clickId];
    const icon = infoSelector.querySelector(".product__info_icon").firstChild;
    icon.classList.remove("fa-plus");
    icon.classList.add("fa-times");
    const textSelector = infoSelector.querySelector(".product__info_text");
    textSelector.innerHTML = this.infoTabs[clickId];
  }

  hideAllProductInfo() {
    for (let i = 0; i < this.productSelectors.productInfo.length; i++) {
      const icon = this.productSelectors.productInfo[i].querySelector(
        ".product__info_icon"
      ).firstChild;
      const isOpen = icon.classList.contains("fa-times");
      if (isOpen) {
        const textSelector = this.productSelectors.productInfo[i].querySelector(
          ".product__info_text"
        );
        icon.classList.remove("fa-times");
        icon.classList.add("fa-plus");
        const textSelectorContent = textSelector.querySelectorAll("span");
        if (textSelectorContent) {
          for (let j = 0; j < textSelectorContent.length; j++) {
            textSelector.removeChild(textSelectorContent[j]);
          }
        }
      }
    }
  }

  setLikeClicked() {
    this.productSelectors.likeIcon.addEventListener("click", (e) => {
      this.toggleLiked();
    });
  }

  toggleLiked() {
    this.productSelectors.likeIcon.style.color = this.isLiked ? "black" : "red";
    this.isLiked = !this.isLiked;
  }

  getSmallImage(id, src, isActive = false) {
    const smallImage = document.createElement("img");
    smallImage.classList.add("product__image_small");
    smallImage.classList.add(id);
    smallImage.src = src;
    isActive && smallImage.classList.add("active");
    smallImage.addEventListener("click", (e) => this.onSmallImageClick(id));
    this.productSelectors.smallImages.push(smallImage);
    return smallImage;
  }

  onSmallImageClick(id) {
    this.productSelectors.mainImage.src = this.images[id];
    for (let i = 0; i < this.productSelectors.smallImages.length; i++) {
      this.productSelectors.smallImages[i].classList.remove("active");
    }
    this.productSelectors.smallImages[id].classList.add("active");
    console.log("a");
  }
}

const description = `
  <span>מעמד לאחסון סכו”ם, עשוי מבמבוק בשילוב ידנית </span>
  <span>מנירוסטה.</span>
  <span>מק"ט: 1234567890</span>`;
const images = [
  "./assets/pink.webp",
  "./assets/blue.webp",
];
const morInfo = `<span>lorem</span>`;
const instructions = `<span>lorem</span>`;

const InfoTabs = [description, morInfo, instructions];
const product = new Product(images, InfoTabs);
