/* ==========================================================================
   Script du site — vous n'avez normalement pas besoin de modifier ce fichier.
   Vos informations se changent dans assets/js/config.js
   ========================================================================== */
(function () {
  "use strict";

  var cfg = window.SITE_CONFIG || {};

  /* --- Lecture d'une valeur de la configuration : "prix.site" ---------- */
  function lire(chemin) {
    return chemin.split(".").reduce(function (obj, cle) {
      return obj && obj[cle] !== undefined ? obj[cle] : undefined;
    }, cfg);
  }

  /* --- Mise en forme des prix : 690 -> "690", 1290 -> "1 290" ---------- */
  function formaterPrix(valeur) {
    if (typeof valeur === "number") {
      return new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 2 }).format(valeur);
    }
    return String(valeur);
  }

  /* --- 1. Remplissage des textes : <span data-cfg="nom"> ----------------- */
  document.querySelectorAll("[data-cfg]").forEach(function (el) {
    var cle = el.getAttribute("data-cfg");
    var valeur = lire(cle);
    if (valeur === undefined || valeur === "") return;
    el.textContent = cle.indexOf("prix.") === 0 ? formaterPrix(valeur) : valeur;
  });

  /* --- 2. Liens email : <a data-cfg-mail> -------------------------------- */
  document.querySelectorAll("[data-cfg-mail]").forEach(function (el) {
    if (!cfg.email) return;
    el.setAttribute("href", "mailto:" + cfg.email);
    if (!el.hasAttribute("data-cfg-mail-keep-text")) el.textContent = cfg.email;
  });

  /* --- 2 bis. Liens WhatsApp : <a data-cfg-wa> -------------------------- */
  if (cfg.whatsapp) {
    var lienWa = "https://wa.me/" + String(cfg.whatsapp).replace(/\D/g, "") +
      (cfg.whatsappMessage ? "?text=" + encodeURIComponent(cfg.whatsappMessage) : "");
    document.querySelectorAll("[data-cfg-wa]").forEach(function (el) {
      el.setAttribute("href", lienWa);
    });
  }

  /* --- 3. Année du pied de page ----------------------------------------- */
  document.querySelectorAll("[data-annee]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* --- 4. Menu mobile --------------------------------------------------- */
  var bouton = document.querySelector(".nav-toggle");
  var menu = document.getElementById("menu-principal");
  if (bouton && menu) {
    var fermer = function () {
      bouton.setAttribute("aria-expanded", "false");
      bouton.setAttribute("aria-label", "Ouvrir le menu");
      menu.classList.remove("is-open");
    };
    bouton.addEventListener("click", function () {
      var ouvert = bouton.getAttribute("aria-expanded") === "true";
      if (ouvert) {
        fermer();
      } else {
        bouton.setAttribute("aria-expanded", "true");
        bouton.setAttribute("aria-label", "Fermer le menu");
        menu.classList.add("is-open");
      }
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) fermer();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("is-open")) {
        fermer();
        bouton.focus();
      }
    });
  }

  /* --- 5. Ombre de l'en-tête au défilement ------------------------------ */
  var entete = document.querySelector(".site-header");
  if (entete) {
    var majOmbre = function () {
      entete.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", majOmbre, { passive: true });
    majOmbre();
  }

  /* --- 6. Pré-sélection du besoin depuis les boutons des offres --------- */
  document.querySelectorAll("[data-besoin]").forEach(function (lien) {
    lien.addEventListener("click", function () {
      var choix = document.getElementById("besoin");
      if (choix) choix.value = lien.getAttribute("data-besoin");
    });
  });

  /* --- 7. Formulaire de contact (Formspree) ----------------------------- */
  var form = document.getElementById("form-contact");
  if (!form) return;

  var ouvertureFormulaire = Date.now();
  var statut = document.getElementById("form-statut");
  var envoyer = form.querySelector("button[type=submit]");

  /* Destination des demandes : Formspree si configuré, sinon FormSubmit vers
     l'alias ou l'adresse email de config.js. */
  var destination = "";
  if (cfg.formspreeId) {
    destination = "https://formspree.io/f/" + encodeURIComponent(cfg.formspreeId);
  } else if (cfg.formsubmitAlias || cfg.email) {
    destination = "https://formsubmit.co/ajax/" + encodeURIComponent(cfg.formsubmitAlias || cfg.email);
  }
  if (destination) form.setAttribute("action", destination);

  function contactDeSecours() {
    /* L'adresse email n'est volontairement pas affichée sur le site. */
    return cfg.whatsappAffiche ? " Vous pouvez aussi me joindre sur WhatsApp au " + cfg.whatsappAffiche + "." : "";
  }

  function afficherStatut(message, type) {
    statut.textContent = message;
    statut.className = "form-statut is-" + type;
    statut.hidden = false;
  }

  function messageErreur(champ) {
    if (champ.validity.valueMissing) {
      return champ.type === "checkbox"
        ? "Merci de cocher cette case pour continuer."
        : "Ce champ est obligatoire.";
    }
    if (champ.validity.typeMismatch && champ.type === "email") {
      return "Cette adresse email ne semble pas valide (exemple : nom@domaine.fr).";
    }
    if (champ.validity.tooShort) {
      return "Merci d'écrire au moins " + champ.minLength + " caractères.";
    }
    return "";
  }

  function verifierChamp(champ) {
    var erreur = document.getElementById(champ.id + "-erreur");
    var message = messageErreur(champ);
    champ.setAttribute("aria-invalid", message ? "true" : "false");
    if (erreur) {
      erreur.textContent = message;
      erreur.hidden = !message;
    }
    return !message;
  }

  var champs = Array.prototype.slice.call(form.querySelectorAll("input:not([type=hidden]):not([name=_gotcha]):not([name=_honey]), select, textarea"));

  champs.forEach(function (champ) {
    champ.addEventListener("blur", function () {
      if (champ.getAttribute("aria-invalid") === "true" || champ.value) verifierChamp(champ);
    });
    /* Efface l'erreur dès que la saisie devient correcte (évite un saut de
       mise en page au moment où l'on clique sur le champ suivant). */
    ["input", "change"].forEach(function (evt) {
      champ.addEventListener(evt, function () {
        if (champ.getAttribute("aria-invalid") === "true") verifierChamp(champ);
      });
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    statut.hidden = true;

    var premierInvalide = null;
    champs.forEach(function (champ) {
      if (!verifierChamp(champ) && !premierInvalide) premierInvalide = champ;
    });
    if (premierInvalide) {
      premierInvalide.focus();
      afficherStatut("Certains champs sont à compléter. Merci de vérifier le formulaire.", "erreur");
      return;
    }

    /* Anti-robot : un humain ne remplit pas le formulaire en moins de 3 s,
       et ne remplit pas les champs invisibles. On fait semblant d'accepter. */
    var piege = form.querySelector("[name=_gotcha]");
    var piege2 = form.querySelector("[name=_honey]");
    if (Date.now() - ouvertureFormulaire < 3000 ||
        (piege && piege.value) || (piege2 && piege2.value)) {
      window.location.href = "merci.html";
      return;
    }

    if (!destination) {
      afficherStatut("Le formulaire n'est pas encore activé." + contactDeSecours(), "erreur");
      return;
    }

    envoyer.disabled = true;
    envoyer.textContent = "Envoi en cours…";

    fetch(destination, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    })
      .then(function (reponse) {
        if (!reponse.ok) throw new Error("HTTP " + reponse.status);
        return reponse.json().catch(function () { return {}; });
      })
      .then(function (donnees) {
        /* FormSubmit répond {"success":"false"} en cas de refus */
        if (donnees && (donnees.success === false || donnees.success === "false")) {
          throw new Error(donnees.message || "Envoi refusé");
        }
        window.location.href = "merci.html";
      })
      .catch(function () {
        afficherStatut(
          "L'envoi n'a pas abouti. Vérifiez votre connexion et réessayez." + contactDeSecours(),
          "erreur"
        );
        envoyer.disabled = false;
        envoyer.textContent = "Envoyer ma demande";
      });
  });
})();
