document.addEventListener("DOMContentLoaded", function () {
  const bookForm = document.getElementById("bookForm");
  const incompleteList = document.getElementById("incompleteBookList");
  const completeList = document.getElementById("completeBookList");

  // Data buku dari gambar
  const sampleBook = {
    id: 3657848524,
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K Rowling",
    year: 1997,
    isComplete: false,
  };

  // Fungsi render buku ke rak
  function renderBookToShelf(book) {
    const bookItem = document.createElement("div");
    bookItem.classList.add("book-item");
    bookItem.style.marginBottom = "20px";
    bookItem.dataset.bookid = book.id;

    bookItem.innerHTML = `
      <h3 data-testid="bookItemTitle">${book.title}</h3>
      <p data-testid="bookItemAuthor">Penulis: ${book.author}</p>
      <p data-testid="bookItemYear">Tahun: ${book.year}</p>
      <div>
        <button class="toggle-complete" data-testid="bookItemIsCompleteButton">
          ${book.isComplete ? "Belum selesai dibaca" : "Selesai dibaca"}
        </button>
        <button class="delete-book" data-testid="bookItemDeleteButton">Hapus Buku</button>
        <button data-testid="bookItemEditButton">Edit Buku</button>
      </div>
    `;

    // Tombol hapus
    const deleteButton = bookItem.querySelector(".delete-book");
    deleteButton.addEventListener("click", () => {
      const konfirmasi = confirm(
        "Apakah kamu yakin ingin menghapus buku ini dari rak?"
      );
      if (konfirmasi) {
        bookItem.remove();
      }
    });

    // Tambah ke rak yang sesuai
    if (book.isComplete) {
      completeList.appendChild(bookItem);
    } else {
      incompleteList.appendChild(bookItem);
    }
  }

  // Panggil fungsi render untuk sampleBook
  renderBookToShelf(sampleBook);

  // Event form submit
  bookForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("bookFormTitle").value;
    const author = document.getElementById("bookFormAuthor").value;
    const year = parseInt(document.getElementById("bookFormYear").value);
    const isComplete = document.getElementById("bookFormIsComplete").checked;

    const newBook = {
      id: +new Date(),
      title,
      author,
      year,
      isComplete,
    };

    renderBookToShelf(newBook);
    bookForm.reset();

    // Scroll otomatis
    setTimeout(() => {
      const lastBook = document.querySelector(`[data-bookid="${newBook.id}"]`);
      lastBook?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 100);
  });

  // Efek sakura
  const inputs = document.querySelectorAll(
    'input[type="text"], input[type="number"]'
  );
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      spawnSakura(input);
    });
  });
});

// Fungsi sakura
function spawnSakura(inputElement) {
  const sakura = document.createElement("span");
  sakura.classList.add("sakura");
  sakura.textContent = "🌸";

  const rect = inputElement.getBoundingClientRect();
  sakura.style.left = `${rect.left + inputElement.offsetWidth / 2}px`;
  sakura.style.top = `${rect.top + window.scrollY - 10}px`;

  const randomX = (Math.random() - 0.5) * 100;
  const randomRotate = Math.random() * 360;
  sakura.style.setProperty("--x-move", `${randomX}px`);
  sakura.style.setProperty("--rotation", `${randomRotate}deg`);

  document.body.appendChild(sakura);
  setTimeout(() => sakura.remove(), 1000);
}
