const orderDialog = document.querySelector("#order-dialog");
const orderForm = document.querySelector("#order-form");
const successMessage = document.querySelector("#success-message");
const selectedProductInput = document.querySelector("#selected-product");
const productBox = document.querySelector("#order-product");
const productImage = document.querySelector("#order-product-image");
const productTitle = document.querySelector("#order-product-title");
const productPrice = document.querySelector("#order-product-price");

function closeDialog() {
    if (orderDialog?.open) {
        orderDialog.close();
    }
}

document.addEventListener("click", event => {
    const button = event.target.closest(".product-card__button");

    if (button && orderDialog) {
        const { product = "", price = "", image = "" } = button.dataset;

        selectedProductInput.value = product;
        productTitle.textContent = product;
        productPrice.textContent = price;
        productImage.src = image;
        productImage.alt = product ? `Изображение: ${product}` : "";
        productBox.hidden = !product;

        if (successMessage) {
            successMessage.hidden = true;
        }

        orderDialog.showModal();
    }

    if (event.target.closest("#close-order-dialog, #cancel-order-dialog")) {
        closeDialog();
    }
});

orderForm?.addEventListener("submit", event => {
    event.preventDefault();

    if (!orderForm.reportValidity()) {
        return;
    }

    closeDialog();
    orderForm.reset();
    productBox.hidden = true;
    successMessage.hidden = false;
    successMessage.scrollIntoView({ behavior: "smooth", block: "center" });
});

orderDialog?.addEventListener("click", event => {
    if (event.target === orderDialog) {
        closeDialog();
    }
});
