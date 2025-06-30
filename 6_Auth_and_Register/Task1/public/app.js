document.getElementById("phone")?.addEventListener("input", function (e) {
  let value = this.value.replace(/[^\d+]/g, "");

  if (value.startsWith("+7")) {
    value =
      "+7" +
      value
        .substring(2)
        .replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, " $1 $2 $3 $4");
  } else if (value.startsWith("7") || value.startsWith("8")) {
    value =
      "+7" +
      value
        .substring(1)
        .replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, " $1 $2 $3 $4");
  }

  this.value = value.substring(0, 16);
});

document.getElementById("fio")?.addEventListener("blur", function (e) {
  let value = this.value.trim();

  if (value.length > 0) {
    let words = value.split(/\s+/);

    value = words
      .map((word) => {
        if (word.includes("-")) {
          return word
            .split("-")
            .map(
              (part) =>
                part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
            )
            .join("-");
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(" ");

    this.value = value;
  }
});

document.getElementById("fio")?.addEventListener("input", function (e) {
  this.value = this.value.replace(/[^а-яА-ЯёЁ\s-]/g, "");
});
