const searchForm = document.querySelector("#faq-search");
const searchInput = document.querySelector("#faq-search-input");
const faqItems = [...document.querySelectorAll(".faq-item")];
const categoryButtons = [
  ...document.querySelectorAll(".faq-category")
];
const emptyMessage = document.querySelector("#faq-empty");

let activeCategory = "all";

function filterFaq() {
  const query = searchInput.value.trim().toLocaleLowerCase("ru");

  let visibleCount = 0;

  faqItems.forEach(item => {
    const question = item.querySelector(".faq-item__question");
    const answer = item.querySelector(".faq-item__answer");

    const text = item.textContent.toLocaleLowerCase("ru");

    const matchesCategory =
      activeCategory === "all" ||
      item.dataset.category === activeCategory;

    const matchesSearch = text.includes(query);
    const visible = matchesCategory && matchesSearch;

    item.hidden = !visible;

    if (!visible) {
      question.setAttribute("aria-expanded", "false");
      answer.hidden = true;
    }

    if (visible) visibleCount++;
  });

  emptyMessage.hidden = visibleCount > 0;
}

categoryButtons.forEach(button => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.category;

    categoryButtons.forEach(categoryButton => {
      categoryButton.setAttribute(
        "aria-pressed",
        String(categoryButton === button)
      );
    });

    filterFaq();
  });
});

faqItems.forEach(item => {
  const question = item.querySelector(".faq-item__question");
  const answer = item.querySelector(".faq-item__answer");

  question.addEventListener("click", () => {
    const isExpanded =
      question.getAttribute("aria-expanded") === "true";

    question.setAttribute("aria-expanded", String(!isExpanded));
    answer.hidden = isExpanded;
  });
});

searchForm.addEventListener("submit", event => {
  event.preventDefault();
  filterFaq();
});

searchInput.addEventListener("input", filterFaq);