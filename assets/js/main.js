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

  if (secoes.length) {
    var agendado = false;

    var atualizar = function () {
      agendado = false;

      // Linha de referência a 35% da altura da janela: a última seção que já
      // passou por ela é a seção corrente.
      var linha = window.pageYOffset + window.innerHeight * 0.35;
      var atual = secoes[0];

      secoes.forEach(function (secao) {
        if (secao.getBoundingClientRect().top + window.pageYOffset <= linha) {
          atual = secao;
        }
      });

      links.forEach(function (link) {
        link.classList.toggle(
          "is-active",
          link.getAttribute("href") === "#" + atual.id
        );
      });
    };

    var agendar = function () {
      if (agendado) return;
      agendado = true;
      window.requestAnimationFrame(atualizar);
    };

    window.addEventListener("scroll", agendar, { passive: true });
    window.addEventListener("resize", agendar);
    atualizar();
  }
})();
