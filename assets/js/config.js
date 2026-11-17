/* ==========================================================================
   CONFIGURATION DU SITE — c'est ICI que vous modifiez vos informations.
   --------------------------------------------------------------------------
   - Modifiez uniquement le texte entre guillemets "...".
   - Gardez les virgules en fin de ligne.
   - Les prix peuvent être écrits en nombre (ex. 690) ou en texte (ex. "690").
   - Enregistrez le fichier puis rechargez la page : tout le site se met à jour.
   ========================================================================== */

window.SITE_CONFIG = {

  /* --- Votre identité ---------------------------------------------------- */
  nom: "Razitic",
  email: "contact@razitic.com",      // adresse professionnelle : affichée sur le site + reçoit les demandes du formulaire
  fuseau: "heure de Madagascar (UTC+3), soit 1 à 2 heures d'avance sur Paris", // FAQ : « Je travaille à l'… »

  /* --- WhatsApp ----------------------------------------------------------
     whatsapp : le numéro au format international, chiffres uniquement, sans + ni espaces.
     whatsappAffiche : le même numéro, tel qu'il s'affiche sur le site.                */
  whatsapp: "261342042286",
  whatsappAffiche: "+261 34 20 422 86",
  whatsappMessage: "Bonjour, je vous contacte depuis votre site. Je souhaiterais un devis pour :",

  /* --- Formulaire de contact ---------------------------------------------
     Par défaut, les demandes sont envoyées à l'adresse "email" ci-dessus via le
     service gratuit FormSubmit (aucun compte nécessaire).
     IMPORTANT : à la toute première demande reçue, FormSubmit vous envoie un
     email « Action required: Activate FormSubmit ». Cliquez sur le bouton
     d'activation : les demandes suivantes arriveront directement.

     Option (facultative) : FormSubmit vous propose ensuite un identifiant
     aléatoire (ex. "a1b2c3d4e5..."). Collez-le dans formsubmitAlias pour ne
     plus faire apparaître votre adresse dans le code du formulaire.            */
  formsubmitAlias: "",

  /* Alternative : si vous préférez Formspree, mettez ici votre identifiant
     (ex. "abcdwxyz"). S'il est rempli, il est utilisé à la place de FormSubmit. */
  formspreeId: "",

  /* --- Vos tarifs (en euros) -------------------------------------------- */
  /* Le pack doit rester inférieur à maintenance + support
     (ici 99 < 39 + 79, soit 19 € d'économie par mois). */
  prix: {
    site: 890,               // Site vitrine clé en main (paiement unique)
    maintenance: 39,         // Maintenance du site (par mois)
    support: 79,             // Support informatique à distance (par mois)
    pack: 99                 // Pack Sérénité = maintenance + support (par mois)
  },

  /* Petites modifications incluses chaque mois dans la maintenance */
  modificationsIncluses: "3",

  /* Durée d'un créneau de support et nombre de créneaux par mois */
  supportCreneaux: "2 créneaux d'une heure par mois"
};
