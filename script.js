// Función para inyectar el encabezado dinámicamente en todas las páginas
function injectHeader() {
    const existingHeader = document.querySelector('header');
    if (!existingHeader) {
        const header = document.createElement('header');
        header.innerHTML = `
            <div class="header-content">
                <button class="nav-toggle" onclick="toggleNavMenu()">Navega</button>
                <h1><a href="index.html" style="color: inherit; text-decoration: none;">Tecnología y Educación 5.0</a></h1>
                <nav class="nav-menu" id="nav-menu">
                    <a href="index.html">Inicio</a>
                    <a href="diagnostico.html">Formulario Diagnóstico</a>
                    <a href="teste.html">Prueba de Inteligencias</a>
                    <a href="criar-nft.html">Crear NFT</a>
                    <a href="tutoriais.html">Tutoriales de Minting</a>
                    <a href="final.html">Formulario Final</a>
                    <a href="testador.html">Probador de Archivo</a>
                    <a href="conceitos.html">Videos Extras</a>
                    <a href="educacao5.html">Descubre qué es Educación 5.0</a>
                    <a href="blockchain.html">Descubre qué es Blockchain</a>
                    <a href="glossario.html">Glosario</a>
                </nav>
            </div>
        `;
        document.body.insertBefore(header, document.body.firstChild);
    }
}

// Función para abrir/cerrar el menú de navegación
function toggleNavMenu() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.style.display = navMenu.style.display === 'block' ? 'none' : 'block';
}

// Cierra el menú al hacer clic fuera de él
document.addEventListener('click', function(event) {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.querySelector('.nav-toggle');
    if (navMenu.style.display === 'block' && !navMenu.contains(event.target) && !navToggle.contains(event.target)) {
        navMenu.style.display = 'none';
    }
});

// Llama a la función al cargar la página
document.addEventListener('DOMContentLoaded', injectHeader);

const questions = [
    { text: "Me gusta leer libros o escribir historias.", type: "lingüística" },
    { text: "Soy bueno explicando cosas con palabras.", type: "lingüística" },
    { text: "Adoro juegos de palabras o conversaciones.", type: "lingüística" },
    { text: "Escribo textos claros y creativos.", type: "lingüística" },
    { text: "Resuelvo problemas de matemáticas rápidamente.", type: "lógico-matemática" },
    { text: "Me gustan los rompecabezas o juegos de lógica.", type: "lógico-matemática" },
    { text: "Organizo mis ideas de forma lógica.", type: "lógico-matemática" },
    { text: "Disfruto analizar números o patrones.", type: "lógico-matemática" },
    { text: "Imaginó escenas u objetos en 3D fácilmente.", type: "espacial" },
    { text: "Soy bueno dibujando o leyendo mapas.", type: "espacial" },
    { text: "Me gusta armar cosas como modelos.", type: "espacial" },
    { text: "Veo detalles visuales que otros no notan.", type: "espacial" },
    { text: "Soy bueno en deportes o danza.", type: "corporal-cinestésica" },
    { text: "Me gusta mover las manos mientras pienso.", type: "corporal-cinestésica" },
    { text: "Aprendo mejor practicando físicamente.", type: "corporal-cinestésica" },
    { text: "Tengo buena coordinación motora.", type: "corporal-cinestésica" },
    { text: "Canto o toco instrumentos con facilidad.", type: "musical" },
    { text: "Percepción ritmos o sonidos sutiles.", type: "musical" },
    { text: "Me gusta crear músicas o sonidos.", type: "musical" },
    { text: "Memorizo músicas rápidamente.", type: "musical" },
    { text: "Entiendo bien los sentimientos de los otros.", type: "interpessoal" },
    { text: "Me gusta trabajar en grupo.", type: "interpessoal" },
    { text: "Soy bueno resolviendo conflictos.", type: "interpessoal" },
    { text: "Hago amigos fácilmente.", type: "interpessoal" },
    { text: "Pienso mucho sobre mis sentimientos.", type: "intrapessoal" },
    { text: "Prefiero trabajar solo y reflexionar.", type: "intrapessoal" },
    { text: "Sé bien qué me motiva.", type: "intrapessoal" },
    { text: "Planifico mi futuro con claridad.", type: "intrapessoal" },
    { text: "Me gusta observar plantas o animales.", type: "naturalista" },
    { text: "Reconozco patrones en la naturaleza.", type: "naturalista" },
    { text: "Me siento bien explorando el medio ambiente.", type: "naturalista" },
    { text: "Clasifico colecciones de la naturaleza, como hojas o piedras, con facilidad.", type: "naturalista" }
];

let chartInstance = null;
let userScores = JSON.parse(localStorage.getItem('userScores')) || {};
let accessibilityStates = {
    'high-contrast': false,
    'large-text': false,
    'distraction-free': false,
    'text-to-speech': false
};

function startQuiz() {
    document.getElementById("intro").style.display = "none";
    document.getElementById("quiz-section").style.display = "block";
    let quizHtml = "";
    questions.forEach((q, index) => {
        quizHtml += `<p>${index + 1}. ${q.text}</p>` +
                    `<label><input type="radio" name="q${index}" value="0"> Nunca</label>` +
                    `<label><input type="radio" name="q${index}" value="2.5"> A veces</label>` +
                    `<label><input type="radio" name="q${index}" value="5"> Siempre</label>` +
                    `<br><br>`;
    });
    document.getElementById("quiz-questions").innerHTML = quizHtml;
}

function submitQuiz() {
    userScores = {
        "lingüística": 0, "lógico-matemática": 0, "espacial": 0, "corporal-cinestésica": 0,
        "musical": 0, "interpessoal": 0, "intrapessoal": 0, "naturalista": 0
    };

    questions.forEach((q, index) => {
        let selected = document.querySelector(`input[name="q${index}"]:checked`);
        if (selected) {
            userScores[q.type] += parseFloat(selected.value);
        } else {
            console.warn(`Pregunta ${index + 1} no respondida. Asignando 0.`);
            userScores[q.type] += 0;
        }
    });

    for (let type in userScores) {
        userScores[type] = Math.ceil(userScores[type]);
    }

    console.log("Puntuaciones calculadas (después de redondear):", userScores);

    localStorage.setItem('userScores', JSON.stringify(userScores));

    document.getElementById("quiz-section").style.display = "none";
    document.getElementById("result-section").style.display = "block";

    let sortedScores = Object.entries(userScores)
        .filter(([type, score]) => score >= 9)
        .sort((a, b) => b[1] - a[1]);

    let labels = sortedScores.map(([type, score]) => type);
    let data = sortedScores.map(([type, score]) => score);

    if (chartInstance) chartInstance.destroy();
    chartInstance = new Chart(document.getElementById("resultsChart"), {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Puntos (máx. 20)",
                data: data,
                backgroundColor: "#c2410c",
                borderColor: "#ea580c",
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 2,
            scales: { 
                y: { 
                    beginAtZero: true, 
                    max: 20,
                    ticks: { font: { size: 10 } }
                },
                x: { 
                    ticks: { font: { size: 10 }, maxRotation: 45, minRotation: 45 }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            },
            layout: {
                padding: {
                    left: 5,
                    right: 5,
                    top: 5,
                    bottom: 5
                }
            }
        }
    });

    let allScores = Object.entries(userScores).sort((a, b) => b[1] - a[1]);
    let topScores = allScores.filter(([type, score]) => score === 20);
    let mainScores = allScores.filter(([type, score]) => score >= 9 && score < 20);
    let exploreScores = allScores.filter(([type, score]) => score > 0 && score < 9);

    let resultText = "<h3>¡Felicidades, Explorador!</h3>";

    if (topScores.length > 0) {
        resultText += `<p><strong>¡Fantástico! Estas son tus inteligencias de mayor impacto, la base para crear e innovar sin límites!</strong></p>`;
        topScores.forEach(([type, score]) => {
            resultText += `<p><strong>${type} (${score}/20):</strong><br>`;
            resultText += getIntelligenceDescription(type);
            resultText += "</p>";
        });
    }

    if (mainScores.length > 0) {
        if (topScores.length > 0) {
            resultText += `<p><strong>Estas también son áreas donde destacas:</strong></p>`;
        } else {
            resultText += `<p><strong>Estas son tus inteligencias más fuertes:</strong></p>`;
        }
        mainScores.forEach(([type, score]) => {
            resultText += `<p><strong>${type} (${score}/20):</strong><br>`;
            resultText += getIntelligenceDescription(type);
            resultText += "</p>";
        });
    }

    if (exploreScores.length > 0) {
        resultText += `<p><strong>¡Sigue explorando! Estas inteligencias también forman parte de tu potencial y pueden crecer aún más!</strong></p>`;
        exploreScores.forEach(([type, score]) => {
            resultText += `<p><strong>${type} (${score}/20):</strong><br>`;
            resultText += getIntelligenceDescription(type);
            resultText += "</p>";
        });
    }

    resultText += `<p><em>Nota: Este test refleja tu percepción actual. ¡Todas las inteligencias pueden desarrollarse con práctica!</em></p>`;

    document.getElementById("quiz-result").innerHTML = resultText || "<p>¡Error al calcular los resultados! Intenta de nuevo.</p>";
    console.log("Texto de resultado generado:", resultText);
}

function getIntelligenceDescription(type) {
    if (type === "lingüística") {
        return "¡Tienes una habilidad especial para expresar ideas y usar palabras! Intenta crear historias o poemas que inspiren.<br>" +
               "En el día a día, prueba escribir un diario o conversar con amigos para desarrollar esta capacidad.<br>" +
               "Si quieres estudiar más, áreas como Letras o Comunicación pueden interesarte.<br>" +
               "Y, si es tu camino, profesiones como escritor o profesor pueden ser excelentes opciones!<br>" +
               "¡Para tu NFT, usa esto para crear un texto o audio increíble!";
    } else if (type === "lógico-matemática") {
        return "¡Tu mente lógica es excelente para resolver problemas! Explora esto con juegos o desafíos que estimulen el razonamiento.<br>" +
               "En el día a día, intenta planificar actividades o analizar situaciones con cuidado.<br>" +
               "Cursos como Matemáticas o Ciencias Exactas pueden abrir nuevas posibilidades.<br>" +
               "¡Si te interesa, profesiones como científico o ingeniero pueden combinarse contigo!<br>" +
               "¡Usa esta lógica para crear un NFT con patrones o diseños únicos!";
    } else if (type === "espacial") {
        return "¡Tienes un talento especial para visualizar y crear! Usa tu imaginación para hacer dibujos o imaginar escenarios.<br>" +
               "En el día a día, intenta crear mapas, armar objetos o decorar algo a tu alrededor.<br>" +
               "Estudios en Diseño o Arquitectura pueden ser un espacio para explorar.<br>" +
               "Y, si es tu camino, profesiones como artista o diseñador pueden ser tu futuro!<br>" +
               "¡Crea un NFT visual que impresione!";
    } else if (type === "corporal-cinestésica") {
        return "¡Tu cuerpo es tu fuerza – aprendes mejor en movimiento! Intenta bailar, practicar deportes o crear con las manos.<br>" +
               "En el día a día, prueba cocinar o construir algo para usar esta energía.<br>" +
               "Cursos como Educación Física o Artesanía pueden ayudarte a crecer.<br>" +
               "¡Si te atrae, profesiones como atleta o artesano pueden ser perfectas!<br>" +
               "¡Tu NFT puede ser algo físico digitalizado, como una danza!";
    } else if (type === "musical") {
        return "¡Tienes una conexión especial con los sonidos! Intenta tocar, cantar o crear músicas que muestren quién eres.<br>" +
               "En el día a día, escucha diferentes sonidos o crea ritmos para explorar esta habilidad.<br>" +
               "Estudios en Música o Artes pueden llevarte más lejos.<br>" +
               "Y, si quieres, ser músico o profesor de música puede ser una buena elección!<br>" +
               "¿Qué tal un NFT con un ritmo original tuyo?";
    } else if (type === "interpessoal") {
        return "¡Tienes un talento especial para entender a las personas! Usa esto para crear lazos y ayudar a quienes te rodean.<br>" +
               "En el día a día, intenta apoyar a amigos o trabajar en grupo para fortalecer esta habilidad.<br>" +
               "Cursos como Psicología o Comunicación pueden interesarte.<br>" +
               "Si es tu camino, profesiones como mediador o líder pueden surgir de ahí!<br>" +
               "¡Crea un NFT colaborativo con amigos!";
    } else if (type === "intrapessoal") {
        return "¡Tienes una habilidad especial para conocerte! Reflexiona sobre tus sentimientos y sueños para conocerte aún más.<br>" +
               "En el día a día, intenta escribir tus ideas o pensar en silencio para explorar esta capacidad.<br>" +
               "Estudios en Filosofía o Psicología pueden ayudarte a avanzar.<br>" +
               "Y, si te atrae, profesiones como escritor o terapeuta pueden ser ideales!<br>" +
               "¡Tu NFT puede ser algo muy personal y único!";
    } else if (type === "naturalista") {
        return "¡Tienes una conexión especial con la naturaleza! Explora el mundo a tu alrededor observando patrones y detalles.<br>" +
               "En el día a día, intenta observar plantas, animales o organizar colecciones para usar esta habilidad.<br>" +
               "Cursos como Biología o Ciencias Ambientales pueden conectarte más.<br>" +
               "Si quieres, profesiones como ecologista o investigador pueden ser tu futuro!<br>" +
               "¡Usa la naturaleza como inspiración para tu NFT!";
    }
    return "";
}

function shareResults() {
    const resultText = document.getElementById("quiz-result").innerText;
    const shareMessage = "Mira mi perfil de inteligencias del Taller Tecnología y Educación 5.0:\n" + resultText + "\nAccede: https://wellersg.github.io/portal-tecnologia-educacao/";
    
    if (navigator.share) {
        navigator.share({
            title: "Mi Perfil de Inteligencias",
            text: shareMessage,
            url: "https://wellersg.github.io/portal-tecnologia-educacao/"
        }).catch(error => console.log("Error al compartir:", error));
    } else {
        navigator.clipboard.writeText(shareMessage).then(() => {
            alert("¡Resultados copiados! Pégalos en un correo o red social.");
            window.location.href = "mailto:?subject=Mi Perfil de Inteligencias&body=" + encodeURIComponent(shareMessage);
        }).catch(error => console.log("Error al copiar:", error));
    }
}

function checkFile() {
    const fileInput = document.getElementById("fileInput");
    const fileFeedback = document.getElementById("fileFeedback");
    const file = fileInput.files[0];
    
    if (!file) {
        fileFeedback.innerText = "¡No se seleccionó ningún archivo!";
        return;
    }

    const maxSize = 100 * 1024 * 1024; // 100 MB
    const acceptedTypes = ["audio/mpeg", "audio/wav", "image/png", "image/jpeg", "video/mp4", "video/webm"];
    
    if (file.size > maxSize) {
        fileFeedback.innerText = `¡Archivo demasiado grande (${(file.size / 1024 / 1024).toFixed(2)} MB)! Máximo es 100 MB!`;
        return;
    }

    if (!acceptedTypes.includes(file.type)) {
        fileFeedback.innerText = `¡Formato no aceptado (${file.type})! Usa MP3, WAV, PNG, JPG, MP4 o WEBM!`;
        return;
    }

    if (isNaN(file.size)) {
        fileFeedback.innerText = `¡Error al calcular el tamaño del archivo!`;
        return;
    }
    const sizeMB = (file.size / 1024 / 1024).toFixed(2);
    fileFeedback.innerText = `¡Archivo listo para mintear! (${file.name}, ${sizeMB} MB)`;
}

function loadIntelligenceSelection() {
    const selectionDiv = document.getElementById("intelligence-selection");
    if (!selectionDiv) return;

    let selectionHtml = "";
    for (let type in userScores) {
        if (userScores[type] >= 10) {
            selectionHtml += `<label><input type="checkbox" name="intelligence" value="${type}"> ${type} (${userScores[type]}/20)</label>`;
        }
    }
    selectionDiv.innerHTML = selectionHtml;
}

function showNFTSuggestions() {
    const selectedIntelligences = Array.from(document.querySelectorAll("input[name='intelligence']:checked")).map(cb => cb.value);
    const suggestionsList = document.getElementById("nft-suggestions");
    
    if (selectedIntelligences.length === 0) {
        suggestionsList.innerHTML = "<li>¡Selecciona al menos una inteligencia para ver las dicas!</li>";
        return;
    }

    let suggestionsHtml = "";
    selectedIntelligences.forEach(type => {
        suggestionsHtml += `<li><strong>${type}:</strong><ul>`;
        if (type === "lingüística") {
            suggestionsHtml += `<li>Poema Visual: Escribe un poema corto y transfórmalo en arte digital con fuentes creativas (Canva). <a href="guias-criacao.html#linguistica-poema">Sabe Más</a></li>` +
                               `<li>Conto Ilustrado: Crea una microhistoria con dibujos simples o fotos (celular o Paint). <a href="guias-criacao.html#linguistica-conto">Sabe Más</a></li>` +
                               `<li>HQ Narrativa: Dibuja un cómic con diálogos impactantes (papel o Canva). <a href="guias-criacao.html#linguistica-hq">Sabe Más</a></li>` +
                               `<li>Spoken Word: Graba un poema hablado con fondo musical para convertirlo en un NFT sonoro (celular + app de edición). <a href="guias-criacao.html#linguistica-spoken">Sabe Más</a></li>`;
        } else if (type === "lógico-matemática") {
            suggestionsHtml += `<li>Arte Geométrica: Dibuja patrones simétricos o fractales coloridos (Paint o Canva). <a href="guias-criacao.html#logico-arte">Sabe Más</a></li>` +
                               `<li>Puzzle Interativo: Crea un rompecabezas digital que revele una imagen (Photopea o papel escaneado). <a href="guias-criacao.html#logico-puzzle">Sabe Más</a></li>` +
                               `<li>Infográfico Animado: Haz un gráfico simple con movimiento (Canva o video en el celular). <a href="guias-criacao.html#logico-infografico">Sabe Más</a></li>` +
                               `<li>Escultura Lógica: Arma una estructura 3D con formas encajadas y fotografía (papel o materiales reciclados). <a href="guias-criacao.html#logico-escultura">Sabe Más</a></li>`;
        } else if (type === "espacial") {
            suggestionsHtml += `<li>Ilustración Fantástica: Dibuja un escenario imaginario con detalles únicos (Paint o papel). <a href="guias-criacao.html#espacial-ilustracao">Sabe Más</a></li>` +
                               `<li>Miniatura 3D: Crea un modelo físico o digital de un objeto surrealista (arcilla o TinkerCAD). <a href="guias-criacao.html#espacial-miniatura">Sabe Más</a></li>` +
                               `<li>Mapa Artístico: Haz un mapa de un mundo ficticio con colores vibrantes (Canva o papel). <a href="guias-criacao.html#espacial-mapa">Sabe Más</a></li>` +
                               `<li>Colagem Visionária: Combina fotos y dibujos en un diseño futurista (Canva o celular). <a href="guias-criacao.html#espacial-colagem">Sabe Más</a></li>`;
        } else if (type === "corporal-cinestésica") {
            suggestionsHtml += `<li>Danza Digital: Filma una coreografía corta y edítala con efectos (celular + app de video). <a href="guias-criacao.html#corporal-danca">Sabe Más</a></li>` +
                               `<li>Escultura Viva: Modela una forma con arcilla o masa y fotografía desde ángulos dinámicos. <a href="guias-criacao.html#corporal-escultura">Sabe Más</a></li>` +
                               `<li>Performance en Stop-Motion: Crea una secuencia de fotos en movimiento (celular). <a href="guias-criacao.html#corporal-stopmotion">Sabe Más</a></li>` +
                               `<li>Arte Táctil: Haz un relieve con materiales reciclados y digitalízalo como NFT (cartón o tela). <a href="guias-criacao.html#corporal-tatil">Sabe Más</a></li>`;
        } else if (type === "musical") {
            suggestionsHtml += `<li>Ritmo Original: Crea un loop rítmico con sonidos del día a día (Audacity o celular). <a href="guias-criacao.html#musical-batida">Sabe Más</a></li>` +
                               `<li>Melodía Visual: Graba una música y haz un video con formas que bailen al ritmo (Canva + app de video). <a href="guias-criacao.html#musical-melodia">Sabe Más</a></li>` +
                               `<li>Poesía Sonora: Combina poesía hablada con capas de sonidos ambientales (celular). <a href="guias-criacao.html#musical-poesia">Sabe Más</a></li>` +
                               `<li>Paisaje Acústico: Arma una pista con sonidos de la naturaleza o la ciudad (grabadora o app). <a href="guias-criacao.html#musical-paisagem">Sabe Más</a></li>`;
        } else if (type === "interpessoal") {
            suggestionsHtml += `<li>Mural Colectivo: Crea un arte digital o físico con amigos, cada uno añadiendo algo (Canva o papel). <a href="guias-criacao.html#interpessoal-mural">Sabe Más</a></li>` +
                               `<li>Narrativa en Capas: Graba un video o audio con varias voces contando una historia (celular). <a href="guias-criacao.html#interpessoal-narrativa">Sabe Más</a></li>` +
                               `<li>Galería de Retratos: Dibuja o fotografía expresiones de personas cercanas en un collage (Paint o Canva). <a href="guias-criacao.html#interpessoal-galeria">Sabe Más</a></li>` +
                               `<li>Teatro Digital: Filma una escena corta con amigos para convertirla en un NFT animado (celular). <a href="guias-criacao.html#interpessoal-teatro">Sabe Más</a></li>`;
        } else if (type === "intrapessoal") {
            suggestionsHtml += `<li>Autorretrato Emocional: Dibuja o fotografía algo que revele un sentimiento tuyo (Paint o celular). <a href="guias-criacao.html#intrapessoal-autorretrato">Sabe Más</a></li>` +
                               `<li>Diario en Capas: Crea una página con texto e imágenes sobre tus pensamientos (Canva). <a href="guias-criacao.html#intrapessoal-diario">Sabe Más</a></li>` +
                               `<li>Mandala Digital: Dibuja una mandala con colores que te expresen (Canva o papel escaneado). <a href="guias-criacao.html#intrapessoal-mandala">Sabe Más</a></li>` +
                               `<li>Reflexión Animada: Haz un video corto con texto o voz sobre tu viaje (celular + app). <a href="guias-criacao.html#intrapessoal-reflexao">Sabe Más</a></li>`;
        } else if (type === "naturalista") {
            suggestionsHtml += `<li>Paisaje Vivo: Fotografía o dibuja una escena natural con un toque surrealista (celular o Paint). <a href="guias-criacao.html#naturalista-paisagem">Sabe Más</a></li>` +
                               `<li>Escultura Orgánica: Crea una forma con elementos naturales (hojas, piedras) y fotografía. <a href="guias-criacao.html#naturalista-escultura">Sabe Más</a></li>` +
                               `<li>Patrón Botánico: Dibuja repeticiones de hojas o flores en estilo abstracto (Canva o papel). <a href="guias-criacao.html#naturalista-padrao">Sabe Más</a></li>` +
                               `<li>Historia de la Naturaleza: Haz un stop-motion con elementos naturales (celular). <a href="guias-criacao.html#naturalista-historia">Sabe Más</a></li>`;
        }
        suggestionsHtml += `</ul></li>`;
    });
    suggestionsList.innerHTML = suggestionsHtml;
}

if (document.getElementById("intelligence-selection") && window.location.pathname.includes("criar-nft.html")) {
    loadIntelligenceSelection();
}

if (window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost") {
    console.log("Desactivando script de Cloudflare para ambiente local.");
    const scripts = document.getElementsByTagName('script');
    for (let script of scripts) {
        if (script.innerHTML.includes('__CF$cv$params')) {
            script.remove();
            break;
        }
    }
}

function copyDescription(button) {
    const tutorialDescription = button.closest('.tutorial-description');
    const descriptionElements = tutorialDescription.querySelectorAll('p, ul');
    const descriptionText = Array.from(descriptionElements)
        .map(element => element.innerText.trim())
        .join('\n\n');

    navigator.clipboard.writeText(descriptionText).then(() => {
        alert('¡Descripción copiada con éxito!');
    }).catch(err => {
        console.error('Error al copiar la descripción:', err);
        alert('Error al copiar la descripción. Intenta de nuevo.');
    });
}

function toggleAccessibilityMenu() {
    const menu = document.getElementById('accessibility-menu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

function toggleAccessibility(feature, button) {
    accessibilityStates[feature] = !accessibilityStates[feature];
    const state = accessibilityStates[feature];
    button.textContent = `${button.textContent.split(' (')[0]} (${state ? 'Desactivar' : 'Activar'})`;

    if (feature === 'high-contrast') {
        document.body.classList.toggle('high-contrast', state);
    } else if (feature === 'large-text') {
        document.body.classList.toggle('large-text', state);
    } else if (feature === 'distraction-free') {
        document.querySelectorAll('.banner').forEach(el => el.classList.toggle('hidden', state));
    } else if (feature === 'text-to-speech') {
        if (state && 'speechSynthesis' in window) {
            const text = document.body.innerText;
            const utterance = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(utterance);
        } else if (!state) {
            window.speechSynthesis.cancel();
        }
    }
}

function increaseFontSize() {
    let currentSize = parseFloat(window.getComputedStyle(document.body).fontSize);
    document.body.style.fontSize = (currentSize + 2) + 'px';
}

function decreaseFontSize() {
    let currentSize = parseFloat(window.getComputedStyle(document.body).fontSize);
    if (currentSize > 16) {
        document.body.style.fontSize = (currentSize - 2) + 'px';
    }
}

// Función para mostrar/esconder los botones extras en index.html
function toggleExtras() {
    const extraButtons = document.querySelector('.extra-buttons');
    extraButtons.style.display = extraButtons.style.display === 'block' ? 'none' : 'block';
}