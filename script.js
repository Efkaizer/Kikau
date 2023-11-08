const toggleSidebarButton = document.getElementById('toggle-sidebar');
const sidebar = document.getElementById('sidebar');

toggleSidebarButton.addEventListener('click', function() {
  if (sidebar.style.right === '0') {
    sidebar.style.right = '-50%'; /* Slide the sidebar off-screen to the left */
  } else {
    sidebar.style.right = '0'; /* Slide the sidebar in from the left */
  }
});

document.addEventListener('click', function(event) {
  if (event.target !== sidebar && event.target !== toggleSidebarButton) {
    sidebar.style.right = '-50%';
  }
});

let prevScrollpos = window.pageYOffset;
const header = document.querySelector("header");

const entranceEffects = {
  "FirstTitle": false, // Para controlar si el efecto de entrada ya se ha activado
};

function toggleHeaderOnScroll() {
  const scrollPosition = window.scrollY;

  if (scrollPosition > prevScrollpos) {
    header.style.top = "-100px"; // Ocultar el encabezado al hacer scroll hacia abajo
  } else {
    header.style.top = "0"; // Mostrar el encabezado al hacer scroll hacia arriba
  }

  prevScrollpos = scrollPosition;
}

const entranceObjects = [
  {
    id: "BannerTitle",
    effect: "right",
  },
  {
    id: "FirstBlock",
    effect: "right",
  },
  {
    id: "SecondBlock",
    effect: "left",
  },
  {
    id: "UpFirstThreeColumn",
    effect: "bottom",
  },
  {
    id: "UpSecondThreeColumn",
    effect: "bottom",
    delays: { SecondThreeColumnDelay: "0.5s" }
  },
  {
    id: "UpThirdThreeColumn",
    effect: "bottom",
    delays: { ThirdThreeColumnDelay: "1s" }
  },
  {
    id: "ThirdBlock",
    effect: "right",
  },
  {
    id: "ForthBlock",
    effect: "left",
  }
  // Agrega más objetos aquí si es necesario
];

function applyEntranceEffect() {
  entranceObjects.forEach((object) => {
    const objectElement = document.getElementById(object.id);

    if (!entranceEffects[object.id] && isScrolledIntoView(objectElement)) {
      entranceEffects[object.id] = true; // Marcar el efecto como activado

      if (object.effect === "left") {
        // Aplicar el efecto de entrada desde la derecha
        objectElement.classList.add("LeftTitle");
        objectElement.classList.remove("RTitle");
      } else if (object.effect === "right") {
        // Aplicar el efecto de entrada desde la izquierda
        objectElement.classList.add("RightTitle");
        objectElement.classList.remove("LTitle");
      } else if (object.effect === "bottom") {
        // Aplicar el efecto de entrada desde abajo
        objectElement.classList.add("TopTitle");
        objectElement.classList.remove("BTitle");
      } else if (object.effect === "top") {
        // Aplicar el efecto de entrada desde arriba
        objectElement.classList.add("BottomTitle");
        objectElement.classList.remove("TTitle");
      }

      // Aplicar los retrasos personalizados
      if (object.delays) {
        for (const delayClass in object.delays) {
          const delayValue = object.delays[delayClass];
          objectElement.style.transitionDelay = delayValue;
        }

        objectElement.addEventListener("transitionend", function() {
          // Restaurar o eliminar el retraso cuando termine la transición principal
          for (const delayClass in object.delays) {
            objectElement.style.transitionDelay = ""; // Eliminar el retraso
          }
        });
      }
    }
  });
}

function isScrolledIntoView(element) {
  const elementPosition = element.getBoundingClientRect();
  return elementPosition.top <= window.innerHeight;
}

function toggleHeaderOnScroll() {
  const scrollPosition = window.scrollY;

  if (scrollPosition > prevScrollpos) {
    header.style.top = "-100px"; // Ocultar el encabezado al hacer scroll hacia abajo
  } else {
    header.style.top = "0"; // Mostrar el encabezado al hacer scroll hacia arriba
  }

  prevScrollpos = scrollPosition;
}

window.onscroll = function() {
  toggleHeaderOnScroll();
  applyEntranceEffect();
};

window.onload = function() {
  toggleHeaderOnScroll();
  applyEntranceEffect();
};

