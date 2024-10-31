const currentLang = document.documentElement.lang || "es";

class ProcessSlider {
  constructor(steps) {
    this.steps = steps;
    this.activeStep = 0;
    this.touchStart = null;
    this.touchEnd = null;

    this.init();
    this.bindEvents();
    this.updateContent();
  }

  init() {
    // Create dots
    const dotsContainer = document.getElementById("dots-container");
    this.steps.forEach((_, index) => {
      const dot = document.createElement("div");
      dot.className = `w-3 h-3 rounded-full cursor-pointer ${
        index === this.activeStep
          ? "bg-black opacity-80"
          : "bg-black opacity-40"
      }`;
      dot.onclick = () => this.setActiveStep(index);
      dotsContainer.appendChild(dot);
    });

    // Initialize touch events
    const slider = document.getElementById("process-slider");
    slider.addEventListener("touchstart", this.handleTouchStart.bind(this));
    slider.addEventListener("touchmove", this.handleTouchMove.bind(this));
    slider.addEventListener("touchend", this.handleTouchEnd.bind(this));
  }

  bindEvents() {
    window.nextStep = () => this.nextStep();
    window.prevStep = () => this.prevStep();
  }

  updateContent() {
    const lang = document.documentElement.lang || "es";
    // Update active slide
    document.getElementById("activeTitle").textContent =
      this.steps[this.activeStep].titleCard[lang];
    document.getElementById("activeParagraph").textContent =
      this.steps[this.activeStep].paragraph[lang];
    document.getElementById("activeIcon").src =
      this.steps[this.activeStep].icon;
    document.getElementById("activeIcon").alt =
      this.steps[this.activeStep].titleCard[lang];

    // Update next slide preview
    const nextIndex = (this.activeStep + 1) % this.steps.length;
    document.getElementById("nextTitle").textContent =
      this.steps[nextIndex].titleCard[lang];
    document.getElementById("nextParagraph").textContent =
      this.steps[nextIndex].paragraph[lang];

    // Update dots
    const dots = document.querySelectorAll("#dots-container div");
    dots.forEach((dot, index) => {
      dot.className = `w-3 h-3 rounded-full cursor-pointer ${
        index === this.activeStep
          ? "bg-black opacity-80"
          : "bg-black opacity-40"
      }`;
    });
  }

  setActiveStep(index) {
    this.activeStep = index;
    this.updateContent();
  }

  nextStep() {
    this.activeStep = (this.activeStep + 1) % this.steps.length;
    this.updateContent();
  }

  prevStep() {
    this.activeStep =
      (this.activeStep - 1 + this.steps.length) % this.steps.length;
    this.updateContent();
  }

  handleTouchStart(e) {
    this.touchEnd = null;
    this.touchStart = e.targetTouches[0].clientX;
  }

  handleTouchMove(e) {
    this.touchEnd = e.targetTouches[0].clientX;
  }

  handleTouchEnd() {
    if (!this.touchStart || !this.touchEnd) return;
    const distance = this.touchStart - this.touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      this.nextStep();
    } else if (isRightSwipe) {
      this.prevStep();
    }
  }
}

// Initialize the slider with your steps data
const steps = [
  {
    id: 1,
    textCard: {
      es: "Análisis de requerimientos",
      en: "Requirements Analysis",
    },
    titleCard: {
      es: "1. Análisis de requerimientos",
      en: "1. Requirements Analysis",
    },
    paragraph: {
      es: "Recopilación de información, necesidades del consumo eléctrico y evaluación de normativas.",
      en: "Gathering information, electrical consumption needs, and evaluation of regulations.",
    },
    icon: "/public/img/hexagonIcon.svg",
  },
  {
    id: 2,
    textCard: {
      es: "Estudio de Viabilidad Técnica",
      en: "Technical Feasibility Study",
    },
    titleCard: {
      es: "2. Estudio de Viabilidad Técnica",
      en: "2. Technical Feasibility Study",
    },
    paragraph: {
      es: "Análisis de la factibilidad técnica y económica. Identificación de las mejores soluciones tecnológicas.",
      en: "Analysis of technical and economic feasibility. Identification of the best technological solutions.",
    },
    icon: "/public/img/estudio.svg",
  },
  {
    id: 3,
    textCard: {
      es: "Diseño conceptual",
      en: "Conceptual Design",
    },
    titleCard: {
      es: "3. Diseño conceptual",
      en: "3. Conceptual Design",
    },
    paragraph: {
      es: "Creación de esquemas preliminares y selección de equipos.",
      en: "Creation of preliminary schematics and equipment selection.",
    },
    icon: "/public/img/pipeline.svg",
  },
  {
    id: 4,
    textCard: {
      es: "Cálculos eléctricos",
      en: "Electrical Calculations",
    },
    titleCard: {
      es: "4. Cálculos eléctricos",
      en: "4. Electrical Calculations",
    },
    paragraph: {
      es: "Estudio de características de red. Dimensionamiento de equipos y protección.",
      en: "Study of network characteristics. Equipment sizing and protection.",
    },
    icon: "/public/img/calculosElectricos.svg",
  },
  {
    id: 5,
    textCard: {
      es: "Diseño detallado",
      en: "Detailed Design",
    },
    titleCard: {
      es: "5. Diseño detallado",
      en: "5. Detailed Design",
    },
    paragraph: {
      es: "Elaboración de planos eléctricos detallados, diagramas unifilares, trifilares, comando, topográficos de tableros. Dimensionamiento de transformadores, generadores y UPS. Coordinación de protecciones. Definición de sistemas de medición de energía.",
      en: "Development of detailed electrical plans, single-line and three-line diagrams, command, and switchboard layouts. Sizing of transformers, generators, and UPS. Protection coordination. Definition of energy measurement systems.",
    },
    icon: "/public/img/electricBoard.svg",
  },
  {
    id: 6,
    textCard: {
      es: "Modelado 3D y Coordinación BIM",
      en: "3D Modeling and BIM Coordination",
    },
    titleCard: {
      es: "6. Modelado 3D y Coordinación BIM",
      en: "6. 3D Modeling and BIM Coordination",
    },
    paragraph: {
      es: "Modelado y coordinación con otras disciplinas.",
      en: "Modeling and coordination with other disciplines.",
    },
    icon: "/public/img/connectIcon.svg",
  },
  {
    id: 7,
    textCard: {
      es: "Especificaciones y Estimaciones de Inversión",
      en: "Specifications and Investment Estimations",
    },
    titleCard: {
      es: "7. Especificaciones y Estimaciones de Inversión",
      en: "7. Specifications and Investment Estimations",
    },
    paragraph: {
      es: "Creación de listas de materiales y presupuesto de las etapas del proyecto.",
      en: "Creation of material lists and budgeting for project stages.",
    },
    icon: "/public/img/especificaciones.svg",
  },
  {
    id: 8,
    textCard: {
      es: "Gestión de Permisos",
      en: "Permit Management",
    },
    titleCard: {
      es: "8. Gestión de permisos",
      en: "8. Permit Management",
    },
    paragraph: {
      es: "Obtención de permisos y aprobaciones.",
      en: "Obtaining permits and approvals.",
    },
    icon: "/public/img/database.svg",
  },
  {
    id: 9,
    textCard: {
      es: "Supervisión de Construcción",
      en: "Construction Supervision",
    },
    titleCard: {
      es: "9. Supervisión de Construcción",
      en: "9. Construction Supervision",
    },
    paragraph: {
      es: "Monitoreo y control de la ejecución de la instalación eléctrica. Puesta en servicio y verificación de funcionamiento.",
      en: "Monitoring and control of the electrical installation execution. Commissioning and functional verification.",
    },
    icon: "/public/img/supervision.svg",
  },
  {
    id: 10,
    textCard: {
      es: "Entrega y Documentación Final",
      en: "Delivery and Final Documentation",
    },
    titleCard: {
      es: "10. Entrega y Documentación Final",
      en: "10. Delivery and Final Documentation",
    },
    paragraph: {
      es: "Entrega del proyecto ejecutivo y capacitación",
      en: "Delivery of the executive project and training.",
    },
    icon: "/public/img/engineeringMultiDis.svg",
  },
];

// Initialize the slider when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.processSlider = new ProcessSlider(steps);
});
// Add this function to update the slider content when the language changes
function updateProcessSliderLanguage() {
  if (window.processSlider) {
    window.processSlider.updateContent();
  }
}
// // Initialize the slider with your steps data
// const steps = [
//   {
//     id: 1,
//     textCard: "Análisis de requerimientos",
//     titleCard: "1. Análisis de requerimientos",
//     paragraph:
//       "Recopilación de información, necesidades del consumo eléctrico y evaluación de normativas.",
//     icon: "/public/img/hexagonIcon.svg",
//   },
//   {
//     id: 2,
//     textCard: "Estudio de Viabilidad Técnica",
//     titleCard: "2. Estudio de Viabilidad Técnica",
//     paragraph:
//       "Análisis de la factibilidad técnica y económica. Identificación de las mejores soluciones tecnológicas.",
//     icon: "/public/img/estudio.svg",
//   },
//   {
//     id: 3,
//     textCard: "Diseño conceptual",
//     titleCard: "3. Diseño conceptual",
//     paragraph: "Creación de esquemas preliminares y selección de equipos.",
//     icon: "/public/img/pipeline.svg",
//   },
//   {
//     id: 4,
//     textCard: "Cálculos eléctricos",
//     titleCard: "4. Cálculos eléctricos",
//     paragraph:
//       "Estudio de características de red. Dimensionamiento de equipos y protección.",
//     icon: "/public/img/calculosElectricos.svg",
//   },
//   {
//     id: 5,
//     textCard: "Diseño detallado",
//     titleCard: "5. Diseño detallado",
//     paragraph:
//       "Elaboración de planos eléctricos detallados, diagramas unifilares, trifilares, comando, topográficos de tableros. Dimensionamiento de transformadores, generadores y UPS. Coordinación de protecciones. Definición de sistemas de medición de energía.",
//     icon: "/public/img/electricBoard.svg",
//   },
//   {
//     id: 6,
//     textCard: "Modelado 3D y Coordinación BIM",
//     titleCard: "6. Modelado 3D y Coordinación BIM",
//     paragraph: "Modelado y coordinación con otras disciplinas.",
//     icon: "/public/img/connectIcon.svg",
//   },
//   {
//     id: 7,
//     textCard: "Especificaciones y Estimaciones de Inversión",
//     titleCard: "7. Especificaciones y Estimaciones de Inversión",
//     paragraph:
//       "Creación de listas de materiales y presupuesto de las etapas del proyecto.",
//     icon: "/public/img/especificaciones.svg",
//   },
//   {
//     id: 8,
//     textCard: "Gestión de Permisos",
//     titleCard: "8. Gestión de permisos",
//     paragraph: "Obtención de permisos y aprobaciones.",
//     icon: "/public/img/database.svg",
//   },
//   {
//     id: 9,
//     textCard: "Supervisión de Construcción",
//     titleCard: "9. Supervisión de Construcción",
//     paragraph:
//       "Monitoreo y control de la ejecución de la instalación eléctrica. Puesta en servicio y verificación de funcionamiento.",
//     icon: "/public/img/supervision.svg",
//   },
//   {
//     id: 10,
//     textCard: "Entrega y Documentación Final",
//     titleCard: "10. Entrega y Documentación Final",
//     paragraph: "Entrega del proyecto ejecutivo y capacitación",
//     icon: "/public/img/engineeringMultiDis.svg",
//   },
// ];

// // Initialize the slider when the DOM is loaded
// document.addEventListener("DOMContentLoaded", () => {
//   new ProcessSlider(steps);
// });
