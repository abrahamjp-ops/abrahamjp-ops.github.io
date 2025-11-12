function crearElemento(tipo) {
  const elemento = document.createElement('div');
  elemento.classList.add(tipo);

  // Posición aleatoria horizontal
  elemento.style.left = Math.random() * 100 + 'vw';

  // Tamaño aleatorio
  elemento.style.width = elemento.style.height = Math.random() * 20 + 10 + 'px';

  // Tiempo de caída aleatorio
  elemento.style.animationDuration = Math.random() * 3 + 4 + 's';

  document.body.appendChild(elemento);

  // Eliminar el elemento después de la animación
  setTimeout(() => {
    elemento.remove();
  }, 7000);
}

// Cada cierto tiempo, genera una estrella o un corazón
setInterval(() => {
  if (Math.random() > 0.5) {
    crearElemento('estrella');
  } else {
    crearElemento('corazon');
  }
}, 800); // cada 0.8 segundos aprox


const canvas = document.getElementById('fondoAnimado');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const corazones = [];

class Corazon {
  constructor(x, y, size, speed) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = speed;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = 'rgba(255, 105, 180, 0.8)';
    ctx.moveTo(this.x, this.y);
    ctx.bezierCurveTo(this.x - this.size / 2, this.y - this.size / 2, this.x - this.size, this.y + this.size / 2, this.x, this.y + this.size);
    ctx.bezierCurveTo(this.x + this.size, this.y + this.size / 2, this.x + this.size / 2, this.y - this.size / 2, this.x, this.y);
    ctx.fill();
  }

  update() {
    this.y += this.speed;
    if (this.y > canvas.height + this.size) {
      this.y = -this.size;
      this.x = Math.random() * canvas.width;
    }
  }
}

function animar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (corazones.length < 30) { // número de corazones
    corazones.push(new Corazon(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 10 + 5, Math.random() * 2 + 0.5));
  }

  corazones.forEach(corazon => {
    corazon.update();
    corazon.draw();
  });

  requestAnimationFrame(animar);
}

animar();

