(function () {
  "use strict";

  // Formulário de contato: sem backend em hospedagem estática, o envio monta
  // um e-mail já preenchido no cliente do visitante.
  // Se o form tiver um action próprio (Formspree e afins), basta remover o
  // data-mailto do HTML que o envio segue o caminho normal do navegador.
  var form = document.getElementById("iht-form");

  if (form && form.getAttribute("data-mailto")) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var destino = form.getAttribute("data-mailto");
      var nome = (form.elements.nome.value || "").trim();
      var email = (form.elements.email.value || "").trim();
      var empresa = (form.elements.empresa.value || "").trim();

      var assunto = "Solicitação de análise técnica" + (empresa ? " - " + empresa : "");
      var corpo = [
        "Nome: " + nome,
        "E-mail: " + email,
        "Empresa: " + (empresa || "-"),
        "",
        "Mensagem:",
        ""
      ].join("\n");

      window.location.href =
        "mailto:" + destino +
        "?subject=" + encodeURIComponent(assunto) +
        "&body=" + encodeURIComponent(corpo);
    });
  }

  // Destaca no menu a seção visível durante a rolagem.
  var links = Array.prototype.slice.call(
    document.querySelectorAll(".iht-nav a[href^='#']")
  );
  var secoes = links
    .map(function (link) {
      return document.querySelector(link.getAttribute("href"));
    })
    .filter(Boolean);

  if (secoes.length && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          links.forEach(function (link) {
            link.classList.toggle(
              "is-active",
              link.getAttribute("href") === "#" + entry.target.id
            );
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    secoes.forEach(function (secao) {
      observer.observe(secao);
    });
  }
})();
