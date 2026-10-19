const orderDialog = document.getElementById("order-dialog");
const orderForm = document.getElementById("order-form");
const closeDialogButton = document.getElementById("close-order-dialog");
const selectedProductInput = document.getElementById("selected-product");
const successMessage = document.getElementById("success-message");

const productPreview = document.getElementById("order-product");
const previewImage = document.getElementById("order-product-image");
const previewTitle = document.getElementById("order-product-title");
const previewPrice = document.getElementById("order-product-price");

if (orderDialog && orderForm && selectedProductInput) {
  // Находим товар по названию.
  function findProduct(name) {
    return typeof products !== "undefined"
      ? products.find(item => item.name === name)
      : undefined;
  }

  // Заполняем блок выбранного товара.
  function showSelectedProduct(name) {
    selectedProductInput.value = name || "";

    if (!productPreview) return;

    const selectedProductData = findProduct(name);

    if (!name) {
      productPreview.hidden = true;
      return;
    }

    productPreview.hidden = false;
    previewTitle.textContent = name;

    if (selectedProductData) {
      previewImage.src = `images/${selectedProductData.image}`;
      previewImage.alt = selectedProductData.name;
      previewImage.hidden = false;

      previewPrice.textContent =
        `${selectedProductData.price.toLocaleString("ru-RU")} руб.`;
    } else {
      previewImage.hidden = true;
      previewPrice.textContent = "";
    }
  }

  // Открываем форму из карточек каталога.
  document
    .querySelectorAll(".product-card__button[data-product]")
    .forEach(button => {
      button.addEventListener("click", () => {
        showSelectedProduct(button.dataset.product);
        orderDialog.showModal();
      });
    });

  // Открываем форму на странице отдельного товара.
  const productOrderButton =
    document.getElementById("open-order-dialog");

  if (productOrderButton) {
    productOrderButton.addEventListener("click", () => {
      const params = new URLSearchParams(window.location.search);
      showSelectedProduct(params.get("name"));
      orderDialog.showModal();
    });
  }

  // Создаём место для сообщения об ошибке.
  function getErrorElement(field) {
    let error = document.getElementById(`${field.id}-error`);

    if (!error) {
      error = document.createElement("small");
      error.id = `${field.id}-error`;
      error.className = "order-form__error";
      error.hidden = true;

      const wrapper = field.closest(".order-form__field");

      if (wrapper) {
        wrapper.append(error);
      } else {
        field.insertAdjacentElement("afterend", error);
      }
    }

    const describedBy = new Set(
      (field.getAttribute("aria-describedby") || "")
        .split(/\s+/)
        .filter(Boolean)
    );

    describedBy.add(error.id);
    field.setAttribute("aria-describedby", [...describedBy].join(" "));

    return error;
  }

  // Формируем понятное сообщение для конкретной ошибки.
  function getErrorMessage(field) {
    if (field.validity.valueMissing) {
      if (field.type === "checkbox") {
        return "Необходимо подтвердить согласие.";
      }

      if (field.tagName === "SELECT") {
        return "Выберите вариант из списка.";
      }

      return "Заполните это поле.";
    }

    if (field.validity.typeMismatch && field.type === "email") {
      return "Введите корректный адрес электронной почты.";
    }

    if (field.validity.patternMismatch && field.type === "tel") {
      return "Введите телефон в формате +7 (900) 000-00-00.";
    }

    if (field.validity.tooShort) {
      return `Введите не менее ${field.minLength} символов.`;
    }

    if (field.validity.tooLong) {
      return `Допустимо не более ${field.maxLength} символов.`;
    }

    if (field.validity.badInput) {
      return "Проверьте введённое значение.";
    }

    return "Проверьте правильность заполнения поля.";
  }

  function validateField(field) {
    if (!field.willValidate) return true;

    const error = getErrorElement(field);
    const valid = field.checkValidity();

    field.setAttribute("aria-invalid", String(!valid));
    error.textContent = valid ? "" : getErrorMessage(field);
    error.hidden = valid;

    return valid;
  }

  const validatedFields = Array.from(orderForm.elements)
    .filter(field =>
      field.willValidate &&
      field.type !== "hidden" &&
      field.type !== "submit" &&
      field.type !== "button"
    );

  // Проверяем поле после изменения пользователем.
  validatedFields.forEach(field => {
    field.addEventListener("input", () => {
      if (field.getAttribute("aria-invalid") === "true") {
        validateField(field);
      }
    });

    field.addEventListener("change", () => {
      if (field.getAttribute("aria-invalid") === "true") {
        validateField(field);
      }
    });
  });

  // Закрытие диалога.
  closeDialogButton?.addEventListener("click", () => {
    orderDialog.close();
  });

  // Обработка отправки.
  orderForm.addEventListener("submit", event => {
    event.preventDefault();

    let firstInvalidField = null;

    validatedFields.forEach(field => {
      if (!validateField(field) && !firstInvalidField) {
        firstInvalidField = field;
      }
    });

    if (firstInvalidField) {
      firstInvalidField.focus();
      return;
    }

    // Демонстрационное подтверждение:
    // реальная отправка на сервер пока не настроена.
    if (successMessage) {
      successMessage.textContent =
        "Проверка пройдена. Отправка на сервер пока не подключена.";
      successMessage.hidden = false;
    }

    orderForm.reset();
    orderDialog.close();
  });
}