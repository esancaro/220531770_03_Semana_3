window.addEventListener("DOMContentLoaded", () => {
  const cardTitle = document.getElementById("card-title");
  const cardPrice = document.getElementById("card-price");
  const cardText = document.getElementById("card-text");

  const imagePicker = $("select.image-picker");
  const previewButton = document.getElementById("preview-button");
  const productImgSelect = document.getElementById("product-img");
  const productInput = document.getElementById("product-input");
  const priceInput = document.getElementById("price-input");
  const descriptionTA = document.getElementById("description-input");
  const allInputs = document.querySelectorAll("input, select, textarea");

  // reset input validators (from class example)
  allInputs.forEach((input) => {
    input.addEventListener("change", function (event) {
      if (event.target.value !== "") {
        input.classList.remove("is-invalid");
      }
    });
  });

  // reset select element validation with img picker input
  imagePicker.imagepicker({
    hide_select: false,
    changed: () => {
      productImgSelect.classList.remove("is-invalid");
    },
  });

  // image picker selector
  function getSelectedImage(sel) {
    const elem = document.getElementById("card-img-top");
    if (sel.options[sel.selectedIndex].value == "1") {
      elem.src = "assets/img/computer-g3ced3ba95_640.jpg";
    } else if (sel.options[sel.selectedIndex].value == "2") {
      elem.src = "assets/img/shoes-g512cfdef2_640.jpg";
    } else if (sel.options[sel.selectedIndex].value == "3") {
      elem.src = "assets/img/vinyl-record-g9e6a0306d_640.jpg";
    }
  }

  previewButton.addEventListener("click", (event) => {
    event.preventDefault();

    if (productImgSelect.selectedIndex === 0) {
      productImgSelect.classList.add("is-invalid");
    }

    if (productInput.value === "") {
      productInput.classList.add("is-invalid");
    }

    if (priceInput.value === "" || isNaN(priceInput.value)) {
      priceInput.classList.add("is-invalid");
    }

    if (descriptionTA.value === "") {
      descriptionTA.classList.add("is-invalid");
    }

    if ( // validate input
      productImgSelect.selectedIndex > 0 &&
      productInput.value !== "" &&
      priceInput.value !== "" &&
      !isNaN(priceInput.value) &&
      descriptionTA !== ""
    ) {
      // set values to display elements
      getSelectedImage(productImgSelect);
      cardTitle.innerHTML = productInput.value;
      cardPrice.innerHTML = `&euro; ${priceInput.value}`;
      cardText.innerHTML = descriptionTA.value.replaceAll("\n", "<br/>");

      // reset controls after setting values to display
      productImgSelect.selectedIndex = 0;
      imagePicker.data("picker").sync_picker_with_select();
      productInput.value = "";
      priceInput.value = "";
      descriptionTA.value = "";
    }
  });
});
