document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const languageButtons = document.querySelectorAll("[data-lang]");

  // Toggle mobile menu
  mobileMenuButton.addEventListener("click", function () {
    const expanded = this.getAttribute("aria-expanded") === "true" || false;
    this.setAttribute("aria-expanded", !expanded);
    mobileMenu.classList.toggle("hidden");

    // Toggle between menu and close icons
    const iconPath = this.querySelector("path");
    if (expanded) {
      iconPath.setAttribute("d", "M4 6h16M4 12h16M4 18h16");
    } else {
      iconPath.setAttribute("d", "M6 18L18 6M6 6l12 12");
    }
  });

  // Language translations
  window.translations = {
    es: {
      inicio: "Inicio",
      servicios: "Servicios",
      proceso: "Proceso",
      nosotros: "Nosotros",
      contacto: "Contacto",
      titleBanner: "Ingeniería Eléctrica y Modelado 3D",
      subtitleBanner: "Optimización Integral de Proyectos Eléctricos",

      buttonBanner: "Contactanos",
      titleService: "Servicios",
      paragraphOneServices:
        "En IExA nos dedicamos a brindar Servicios de Diseño de Proyectos Eléctricos, abarcando los aspectos relacionados con la planificación y ejecución de instalaciones eléctricas, incluyendo la especificación de tableros generales, correctores de factor de potencia, sistemas de transferencia automática, sistemas de almacenamiento de energía y distribución de energía a equipos.",
      paragraphTwoServices:
        "Además, realizamos el diseño de canalizaciones, dimensionamiento de cables y la integración de sistemas de protección y puesta a tierra. En cuanto a la iluminación, se diseñan sistemas para áreas interiores, exteriores y de emergencia, garantizando eficiencia y seguridad.",
      paragraphThreeServices:
        "Uno de los pilares fundamentales en nuestro diseño es el desarrollo en Modelos 3D utilizando metodologías BIM, que abarca no solo el diseño de las salas de tableros eléctricos, sino también las canalizaciones y acometidas que conectan todos los sectores de la infraestructura y sus equipos. Esto permite una mayor precisión en la planificación y coordinación entre disciplinas, reduciendo errores en la fase de construcción y optimizando el uso del espacio. El uso de BIM facilita la gestión del ciclo de vida de la instalación, mejorando la visualización del proyecto y permitiendo realizar ajustes de manera más eficiente durante todo el proceso.",
      buttonMore: "Leer más",
      buttonLess: "Leer menos",
      processTitle: "Nuestro proceso",
      processSubtitle: "De la idea a la puesta en marcha.",
      aboutTitle: "Nosotros",
      aboutSubtitle: "Un gran equipo para grandes desafíos",
      member1Name: " David Mitchell",
      member1Role: " Director Ejecutivo & Fundador",
      member1Description:
        " Ingeniero Eléctrico y Emprendedor. Siempre en busca de nuevos                  desafíos",
      member2Name: "Mark Johnson",
      member2Role: "CTO - Fundador",
      member2Description:
        "Técnico en Sistemas Electrónicos. Enfocado en la innovación y motivado por los desafíos",
      member3Name: "Michael Chen",
      member3Role: "Director BIM",
      member3Description:
        " Técnico en Producción de Bienes y Servicios. Persiguiendo los trazos que definen el mañana",
      contactTitle: "Contacto",
      contactHeading: "Conecta con Nosotros para Impulsar tu Proyecto",
      contactSubheading:
        "Contáctanos y optimiza tu proyecto con nuestras soluciones integrales y enfoque BIM.",
      nameLabel: "Nombre",
      surnameLabel: "Apellido",
      emailLabel: "Email",
      subjectLabel: "Asunto",
      messageLabel: "Tu mensaje",
      submitButton: "Enviar",

      required: "Este campo es requerido",
      successTitle: "¡Mensaje enviado!",
      successMessage: "Gracias por contactarnos. Te responderemos pronto.",
      errorTitle: "Error",
      errorMessage:
        "No se pudo enviar el mensaje. Por favor, intenta nuevamente.",
      footerRights: "Todos los derechos reservados",
      footerDeveloped: "Desarrollado por",
    },
    en: {
      inicio: "Home",
      servicios: "Services",
      proceso: "Process",
      nosotros: "About Us",
      contacto: "Contact",
      titleBanner: "Electrical Engineering and 3D Modeling",
      subtitleBanner: "Global Optimization of Electrical Projects",
      buttonBanner: "Contact Us",
      titleService: "Services",
      paragraphOneServices:
        "We specialize in providing Electrical Project Design Services, covering aspects related to the planning and execution of electrical installations. This includes the specification of main switchboards, power factor correction equipment, automatic transfer systems, energy storage systems, and power distribution to equipment.",
      paragraphTwoServices:
        "Additionally, we design conduit systems, cable sizing, and integrate protection and grounding systems. For lighting, we design systems for indoor, outdoor, and emergency areas, ensuring efficiency and safety.",
      paragraphThreeServices:
        "A fundamental pillar in our design process is the development of 3D Models using BIM methodologies. This includes not only the design of electrical switchboard rooms but also the conduits and connections that link all sectors of the infrastructure and its equipment. This approach allows for greater precision in planning and coordination across disciplines, reducing errors during the construction phase and optimizing space usage. The use of BIM facilitates the management of the installation's lifecycle, improving project visualization and allowing for more efficient adjustments throughout the entire process.",
      buttonMore: "Read more",
      buttonLess: "Read less",
      processTitle: "Our Process",
      processSubtitle: "From idea to implementation.",
      aboutTitle: "Our Team",
      aboutSubtitle: "A great team for great challenges",
      member1Name: "David Mitchell",
      member1Role: "CEO & Founder",
      member1Description:
        "Electrical Engineer and Entrepreneur. Always seeking new challenges",
      member2Name: "Mark Johnson",
      member2Role: "CTO - Founder",
      member2Description:
        "Electronics Systems Technician. Focused on innovation and driven by challenges",
      member3Name: "Michael Chen",
      member3Role: "BIM Director",
      member3Description:
        "Goods and Services Production Technician. Following the lines that define tomorrow",
      contactTitle: "Contact",
      contactHeading: "Connect with Us to Boost Your Project",
      contactSubheading:
        "Contact us and optimize your project with our comprehensive solutions and BIM approach.",
      nameLabel: "Name",
      surnameLabel: "Surname",
      emailLabel: "Email",
      subjectLabel: "Subject",
      messageLabel: "Your message",
      submitButton: "Send",
      required: "This field is required",
      successTitle: "Message sent!",
      successMessage: "Thank you for contacting us. We'll respond soon.",
      errorTitle: "Error",
      errorMessage: "Could not send message. Please try again.",
      footerRights: "All rights reserved",
      footerDeveloped: "Developed by",
    },
  };

  // Language switcher function
  function switchLanguage(lang) {
    document.querySelectorAll("[data-translate]").forEach((elem) => {
      const key = elem.dataset.translate;
      if (key && translations[lang][key]) {
        elem.textContent = translations[lang][key];
      }
    });

    languageButtons.forEach((btn) => {
      btn.classList.toggle("bg-white", btn.dataset.lang === lang);
    });

    document.documentElement.lang = lang;
    updateProcessSliderLanguage();
  }

  // Add click event listeners to language buttons
  languageButtons.forEach((btn) => {
    btn.addEventListener("click", () => switchLanguage(btn.dataset.lang));
  });
  window.showAlert = function (type, title, message) {
    // You can implement this function using your preferred alert library
    // For example, if you're using SweetAlert2:
    Swal.fire({
      icon: type,
      title: title,
      text: message,
      showConfirmButton: false,
      timer: 3000,
    });
  };
});
