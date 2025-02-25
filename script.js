let videoABC = document.getElementById('video-abc');
let videoMemoria = document.getElementById('video-memoria-visual');
let videoNinos = document.getElementById('video-ninos');
let modalABC = document.getElementById('modal-abc');
let modalMemoria = document.getElementById('modal-memoria');
let resultadoABC = document.getElementById('resultado-abc');
let resultadoMemoria = document.getElementById('resultado-memoria');

// Ajustar la velocidad de los videos a 2x
videoABC.playbackRate = 4; // Doble velocidad para el video ABC
videoMemoria.playbackRate = 2; // Doble velocidad para el video Memoria Visual

// Mostrar el modal del cuestionario después de que termine el video de ABC
videoABC.addEventListener('ended', function() {
  videoABC.pause();
  modalABC.style.display = 'flex';
});

// Mostrar el modal del cuestionario después de que termine el video de Memoria Visual
videoMemoria.addEventListener('ended', function() {
  videoMemoria.pause();
  modalMemoria.style.display = 'flex';
});

// Función para verificar la respuesta del cuestionario de ABC
function verificarRespuestaABC() {
  const respuestasABC = document.querySelectorAll('input[name="respuesta-abc"]:checked');
  
  if (respuestasABC.length === 0) {
    resultadoABC.innerHTML = 'Por favor, selecciona una respuesta.';
    return;
  }

  let respuestaSeleccionadaABC = respuestasABC[0].value;
  if (respuestaSeleccionadaABC === "3") {
    resultadoABC.innerHTML = '¡Correcto! El autobús transportaba 3 lápices.';
  } else {
    resultadoABC.innerHTML = 'Respuesta incorrecta. Intenta nuevamente.';
  }
}

// Función para verificar la respuesta del cuestionario de Memoria Visual
function verificarRespuestaMemoria() {
  const respuestasMemoria = document.querySelectorAll('input[name="respuesta-memoria"]:checked');
  
  if (respuestasMemoria.length === 0) {
    resultadoMemoria.innerHTML = 'Por favor, selecciona una respuesta.';
    return;
  }

  let respuestaSeleccionadaMemoria = respuestasMemoria[0].value;
  if (respuestaSeleccionadaMemoria === "azul") {
    resultadoMemoria.innerHTML = '¡Correcto! El libro de la niña es azul.';
  } else {
    resultadoMemoria.innerHTML = 'Respuesta incorrecta. Intenta nuevamente.';
  }
}

// Función para cerrar el modal de ABC
function cerrarModalABC() {
  modalABC.style.display = 'none';
}

// Función para cerrar el modal de Memoria Visual
function cerrarModalMemoria() {
  modalMemoria.style.display = 'none';
}

// Funciones para mostrar las secciones
function mostrarHome() {
  document.getElementById('home').style.display = 'block';
  document.getElementById('videos').style.display = 'none';
  document.getElementById('audios').style.display = 'none';
}

function mostrarVideos() {
  document.getElementById('home').style.display = 'none';
  document.getElementById('videos').style.display = 'block';
  document.getElementById('audios').style.display = 'none';
}

function mostrarAudios() {
  document.getElementById('home').style.display = 'none';
  document.getElementById('videos').style.display = 'none';
  document.getElementById('audios').style.display = 'block';
}

// Función para hacer que el video "niños.mp4" se reproduzca a la velocidad correcta si es necesario
videoNinos.playbackRate = 1; // Se puede ajustar según sea necesario para este video

// Función para ir a un capítulo específico del audio
function irACapitulo(segundos) {
  var audio = document.getElementById('audio-saludos'); // Obtén el reproductor de audio
  audio.currentTime = segundos; // Establece el tiempo en segundos
  audio.play(); // Reproduce el audio desde ese punto
}

// Función para cargar los comentarios almacenados en el localStorage
function cargarComentarios() {
  let comentariosLista = document.getElementById('comentarios-lista');
  comentariosLista.innerHTML = '';  // Limpiar la lista antes de cargar

  let comentariosGuardados = JSON.parse(localStorage.getItem('comentarios')) || [];
  
  comentariosGuardados.forEach(function(comentario) {
      let comentarioDiv = document.createElement('div');
      comentarioDiv.classList.add('comentario');
      
      let comentarioContenido = document.createElement('p');
      comentarioContenido.textContent = comentario.texto;
      
      let botonEliminar = document.createElement('button');
      botonEliminar.textContent = 'Eliminar';
      botonEliminar.classList.add('eliminar');
      botonEliminar.onclick = function() {
          eliminarComentario(comentarioDiv, comentario.texto);
      };
      
      comentarioDiv.appendChild(comentarioContenido);
      comentarioDiv.appendChild(botonEliminar);
      comentariosLista.appendChild(comentarioDiv);
  });
}

// Función para agregar un comentario
function agregarComentario() {
  let comentarioInput = document.getElementById('comentario-input');
  let comentarioTexto = comentarioInput.value.trim();
  
  if (comentarioTexto === "") {
      alert("Por favor, escribe un comentario.");
      return;
  }
  
  let comentariosLista = document.getElementById('comentarios-lista');
  
  // Crear el div del comentario
  let comentarioDiv = document.createElement('div');
  comentarioDiv.classList.add('comentario');
  
  // Crear el contenido del comentario
  let comentarioContenido = document.createElement('p');
  comentarioContenido.textContent = comentarioTexto;
  
  // Crear el botón de eliminar
  let botonEliminar = document.createElement('button');
  botonEliminar.textContent = 'Eliminar';
  botonEliminar.classList.add('eliminar');
  botonEliminar.onclick = function() {
      eliminarComentario(comentarioDiv, comentarioTexto);
  };
  
  // Agregar el contenido y el botón de eliminar al div del comentario
  comentarioDiv.appendChild(comentarioContenido);
  comentarioDiv.appendChild(botonEliminar);
  
  // Añadir el comentario a la lista de comentarios
  comentariosLista.appendChild(comentarioDiv);
  
  // Guardar el comentario en el localStorage
  let comentariosGuardados = JSON.parse(localStorage.getItem('comentarios')) || [];
  comentariosGuardados.push({ texto: comentarioTexto });
  localStorage.setItem('comentarios', JSON.stringify(comentariosGuardados));
  
  // Limpiar el campo de texto
  comentarioInput.value = "";
}

// Función para eliminar un comentario
function eliminarComentario(comentarioDiv, textoComentario) {
  let comentariosLista = document.getElementById('comentarios-lista');
  
  // Eliminar el comentario de la interfaz
  comentariosLista.removeChild(comentarioDiv);
  
  // Eliminar el comentario del localStorage
  let comentariosGuardados = JSON.parse(localStorage.getItem('comentarios')) || [];
  comentariosGuardados = comentariosGuardados.filter(function(comentario) {
      return comentario.texto !== textoComentario;
  });
  localStorage.setItem('comentarios', JSON.stringify(comentariosGuardados));
}

// Cargar los comentarios al cargar la página
window.onload = cargarComentarios;
