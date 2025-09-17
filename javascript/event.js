window.addEventListener('scroll', function () {
    const sections = ['#parte1', '#parte2', '#parte3', '#parte4'];
    const menuImages = document.querySelectorAll('.menu-img');

    let currentSection = '';

    sections.forEach((section) => {
        const sectionElement = document.querySelector(section);
        const rect = sectionElement.getBoundingClientRect();

        if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
            currentSection = section;
        }
    });

    menuImages.forEach(img => {
        img.classList.add('inactive');
    });

    if (currentSection) {
        const activeImage = document.querySelector(`.menu-img[id="img-${currentSection.replace('#', '')}"]`);
        if (activeImage) {
            activeImage.classList.remove('inactive');
        }
    }
});

// navmenu
const menuLinks = document.querySelectorAll('.navmenu a');
const stickyMenu = document.querySelector('.navmenu');

menuLinks.forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault();

        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const menuHeight = stickyMenu.offsetHeight;
            const elementPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - menuHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            targetSection.classList.add('highlight');
        } else {
            console.error('Elemento de destino não encontrado:', targetId);
        }
    });
});

// formulario
document.addEventListener('DOMContentLoaded', function () {
    const steps = [
        {
            title: "Passo 1 - Apresentação do problema",
            desc: "Apresente o problema de pesquisa, destacando sua relevância para a comunidade externa e sua relação com o tema norteador da Univesp.",
            start: 0,
            end: 3
        },
        {
            title: "Passo 2 - Proposta de solução",
            desc: "A solução é apresentada em funcionamento, permitindo visualizar como ela opera. ",
            start: 4,
            end: 7
        },
        {
            title: "Passo 3 - Implementação da solução na comunidade externa",
            desc: "Relate a implementação da solução na comunidade externa, incluindo os impactos, quando for o caso.",
            start: 8,
            end: 10
        },
        {
            title: "Passo 4 - Introdução à narrativa da apresentação",
            desc: "Agora que você refletiu e preencheu as caixas de texto acima com as informações do seu produto/serviço/protótipo, faça uma introdução que contemple:",
            start: 11,
            end: 12
        }
    ];

    let currentStep = 0;

    function scrollToTop() {
        const dodsContainer = document.querySelector('.dods-container');
        if (dodsContainer) {
            dodsContainer.scrollIntoView({ behavior: 'smooth' });
        }
    }

    function updateButtons() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const prevBtn2 = document.getElementById('prevBtn2');
        const nextBtn2 = document.getElementById('nextBtn2');


        const prevImgEnabled = "assets/icones diversos/seta ativo.png";
        const prevImgDisabled = "assets/icones diversos/seta nao ativo1.png";
        const nextImgEnabled = "assets/icones diversos/seta ativo.png";
        const nextImgDisabled = "assets/icones diversos/seta nao ativo1.png";

        const prevImgEnabledMobile = "assets/partes/Versão Mobile/Parte 3 - Edição/seta-esquerda.svg";
        const prevImgDisabledMobile = "assets/partes/Versão Mobile/Parte 3 - Edição/seta-esquerda-disabled.svg";
        const nextImgEnabledMobile = "assets/partes/Versão Mobile/Parte 3 - Edição/seta-direita.svg";
        const nextImgDisabledMobile = "assets/partes/Versão Mobile/Parte 3 - Edição/seta-direita-disabled.svg";

        prevBtn.disabled = currentStep === 0;
        nextBtn.disabled = currentStep === steps.length - 1;
        prevBtn2.disabled = currentStep === 0;
        nextBtn2.disabled = currentStep === steps.length - 1;


        if (prevBtn.disabled) {
            prevBtn.querySelector('img').src = prevImgDisabled;
        } else {
            prevBtn.querySelector('img').src = prevImgEnabled;
        }


        if (nextBtn.disabled) {
            nextBtn.querySelector('img').src = nextImgDisabled;
        } else {
            nextBtn.querySelector('img').src = nextImgEnabled;
        }

        if (prevBtn2.disabled) {
            prevBtn2.querySelector('img').src = prevImgDisabledMobile;
        } else {
            prevBtn2.querySelector('img').src = prevImgEnabledMobile;
        }


        if (nextBtn2.disabled) {
            nextBtn2.querySelector('img').src = nextImgDisabledMobile;
        } else {
            nextBtn2.querySelector('img').src = nextImgEnabledMobile;
        }
    }

    function updateDods() {
        const dods = document.querySelectorAll('.dod');
        dods.forEach((dod, index) => {
            if (index === currentStep) {
                dod.classList.add('active');
            } else {
                dod.classList.remove('active');
            }
        });
    }

    function showStep(stepIndex) {
        const questionGroups = document.querySelectorAll('.question-group');
        questionGroups.forEach((group, index) => {
            if (index >= steps[stepIndex].start && index <= steps[stepIndex].end) {
                group.classList.remove('hidden');
            } else {
                group.classList.add('hidden');
            }
        });

        document.getElementById('stepTitle').textContent = steps[stepIndex].title;
        document.getElementById('stepDesc').textContent = steps[stepIndex].desc;

        currentStep = stepIndex;
        updateDods();
        updateButtons();
    }


    function nextPage() {
        if (currentStep < steps.length - 1) {
            scrollToTop();
            showStep(currentStep + 1);
        }
    }

    function prevPage() {
        if (currentStep > 0) {
            scrollToTop();
            showStep(currentStep - 1);
        }
    }

    document.querySelectorAll('.dod').forEach(dod => {
        dod.addEventListener('click', function () {
            const step = parseInt(this.getAttribute('data-stap'));
            showStep(step);
        });
    });


    document.getElementById('nextBtn').addEventListener('click', nextPage);
    document.getElementById('prevBtn').addEventListener('click', prevPage);
    document.getElementById('nextBtn2').addEventListener('click', nextPage);
    document.getElementById('prevBtn2').addEventListener('click', prevPage);
    
    showStep(currentStep);
});

// menunav
document.addEventListener("DOMContentLoaded", function () {
    const menunav = document.querySelector('.menunav');
    const parte1 = document.getElementById('parte1');
    const parte2 = document.getElementById('parte2');
    const parte3 = document.getElementById('parte3');
    const parte4 = document.getElementById('parte4');
    const parte5 = document.getElementById('parte5');

    function checkVisibility() {
        const parte1Rect = parte1.getBoundingClientRect();
        const parte2Rect = parte2.getBoundingClientRect();
        const parte3Rect = parte3.getBoundingClientRect();
        const parte4Rect = parte4.getBoundingClientRect();
        const parte5Rect = parte5.getBoundingClientRect();

        menunavpt1.classList.add('grayscale');
        menunavpt2.classList.add('grayscale');
        menunavpt3.classList.add('grayscale');
        menunavpt4.classList.add('grayscale');


        const offset = 50;

        if (parte1Rect.top <= offset && parte1Rect.bottom >= offset) {
            menunav.style.opacity = "1";
            menunavpt1.classList.remove('grayscale');
        } else if (parte2Rect.top <= offset && parte2Rect.bottom >= offset) {
            menunav.style.opacity = "1";
            menunavpt2.classList.remove('grayscale');
        } else if (parte3Rect.top <= offset && parte3Rect.bottom >= offset) {
            menunav.style.opacity = "1";
            menunavpt3.classList.remove('grayscale');
        } else if (parte4Rect.top <= offset && parte4Rect.bottom >= offset) {
            menunav.style.opacity = "1";
            menunavpt4.classList.remove('grayscale');
        } else if (parte5Rect.top <= offset && parte5Rect.bottom >= offset) {
            menunav.style.opacity = "1";
        } else {
            menunav.style.opacity = "0";
        }
    }

    window.addEventListener('scroll', checkVisibility);

    checkVisibility();
});

// Inserção e troca de videos
document.addEventListener('DOMContentLoaded', () => {
    const videoPlayer = document.getElementById('videoPlayer');
    const prevBtn3 = document.getElementById('prevBtn3');
    const nextBtn3 = document.getElementById('nextBtn3');
    const prevBtn4 = document.getElementById('prevBtn4');
    const nextBtn4 = document.getElementById('nextBtn4');
    const videoTitle = document.getElementById('videoTitle'); 
    const dots = document.querySelectorAll('.dot');

    const prevVideoEnabledMobile = "assets/partes/Versão Mobile/Parte 3 - Edição/seta-esquerda.svg";
    const prevVideoDisabledMobile = "assets/partes/Versão Mobile/Parte 3 - Edição/seta-esquerda-disabled.svg";
    const nextVideoEnabledMobile = "assets/partes/Versão Mobile/Parte 3 - Edição/seta-direita.svg";
    const nextVideoDisabledMobile = "assets/partes/Versão Mobile/Parte 3 - Edição/seta-direita-disabled.svg";

    const videos = [
        'https://www.youtube.com/embed/fyUYHSoL0V0?si=JoPTgJEVn16iH_4o&enablejsapi=1',
        'https://www.youtube.com/embed/4WiM5Rll2qM?si=tOsN8KW700a7_TSa&enablejsapi=1',
        'https://www.youtube.com/embed/YKxLpFiCwRs?si=Xdq72StKBAHhj58W&enablejsapi=1',
        'https://www.youtube.com/embed/0Td_p-FcqCw?si=L1wcZ7GUE7HdUgmc&enablejsapi=1',
        'https://www.youtube.com/embed/Th2Jk22iulc?si=l5OLsZiXo9WWoaPK&enablejsapi=1',
        'https://www.youtube.com/embed/ZPSv2MTSBms?si=x3RXcB4floqmCCd4&enablejsapi=1',
        'https://www.youtube.com/embed/37TyBI9PC4I?si=qLDOMmLuDeLtLOlN&enablejsapi=1'
    ];

    const videoTitles = [
        "Edição de Vídeo",
        "Importação mídia",
        "Camadas de imagens/vídeo",
        "Camadas de áudio",
        "Corte de vídeo/áudio",
        "Transição de cenas",
        "Exportação do vídeo"
    ];

    let currentVideoIndex = 0;

    function updateVideo() {
        videoPlayer.src = videos[currentVideoIndex];
        videoPlayer.src = videos[currentVideoIndex]; 

        videoTitle.textContent = videoTitles[currentVideoIndex]; 

        const isPrevDisabled = currentVideoIndex === 0;
        const isNextDisabled = currentVideoIndex === videos.length - 1;

        prevBtn3.disabled = isPrevDisabled;
        nextBtn3.disabled = isNextDisabled;
        prevBtn4.disabled = isPrevDisabled;
        nextBtn4.disabled = isNextDisabled;

        prevBtn3.querySelector('img').src = isPrevDisabled ? 'assets/icones diversos/seta nao ativo1.png' : 'assets/icones diversos/seta ativo.png';
        nextBtn3.querySelector('img').src = isNextDisabled ? 'assets/icones diversos/seta nao ativo1.png' : 'assets/icones diversos/seta ativo.png';

        if (prevBtn4.disabled) {
            prevBtn4.querySelector('img').src = prevVideoDisabledMobile;
        } else {
            prevBtn4.querySelector('img').src = prevVideoEnabledMobile;
        }

        if (nextBtn4.disabled) {
            nextBtn4.querySelector('img').src = nextVideoDisabledMobile;
        } else {
            nextBtn4.querySelector('img').src = nextVideoEnabledMobile;
        }

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentVideoIndex);
        });
    }

    function previousVideo() {
        if (currentVideoIndex > 0) {
            currentVideoIndex--;
            updateVideo();
        }
    }

    function nextVideo() {
        if (currentVideoIndex < videos.length - 1) {
            currentVideoIndex++;
            updateVideo();
        }
    }

    prevBtn3.addEventListener('click', previousVideo);
    prevBtn4.addEventListener('click', previousVideo);
    nextBtn3.addEventListener('click', nextVideo);
    nextBtn4.addEventListener('click', nextVideo);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentVideoIndex = index;
            updateVideo();
        });
    });

    updateVideo();
});


// imprimir formulario
function imprimirFormulario() {
    window.print();
}

function validateAndPrint() {
    const textareas = document.querySelectorAll('#roteiroform textarea');
    let allFilled = true;


    textareas.forEach(textarea => {
        if (textarea.value.trim() === '') {
            allFilled = false;
        }
    });


    if (allFilled) {
        window.print();
    } else {
        alert('Por favor, preencha todas as perguntas antes de imprimir.');
    }
}

// pausar video
document.addEventListener('DOMContentLoaded', () => {
    let players = new Map();

    function initializePlayer(iframe) {
        let id = iframe.dataset.videoId || iframe.src.split("/embed/")[1]?.split("?")[0]; // Pega o ID do vídeo
        if (!id) return;

        let newSrc = `https://www.youtube.com/embed/${id}?enablejsapi=1`;
        iframe.src = newSrc; 
        
        let player = new YT.Player(iframe, {
            events: {
                'onStateChange': onPlayerStateChange
            }
        });

        players.set(iframe, player);
    }

    function onPlayerStateChange(event) {
        if (event.data === YT.PlayerState.PLAYING) {
            players.forEach((player, iframe) => {
                if (player !== event.target) {
                    setTimeout(() => {
                        if (player.getPlayerState() === YT.PlayerState.PLAYING) {
                            player.pauseVideo();
                        }
                    }, 100); // Pequeno atraso para evitar bugs
                }
            });
        }
    }

    function onYouTubeIframeAPIReady() {
        document.querySelectorAll('iframe').forEach(initializePlayer);
    }

    let script = document.createElement('script');
    script.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(script);

    window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
});




// impressão do pdf

function preparePrintView() {
    const questions = [
        "Problema central:",
        "Dores do público-alvo:",
        "Sentimentos do público-alvo:",
        "Impacto do problema:",
        "Solução proposta:",
        "Facilitação da vida:",
        "Experiência do usuário:",
        "Diferenciação da solução:",
        "Mudança na vida dos clientes/público-alvo:",
        "Melhorias e aprimoramentos:",
        "Sentimentos pós-uso:",
        "Contexto geral:",
        "Contexto específico:"
    ];

    const answersContainer = document.getElementById("printable-answers");
    answersContainer.innerHTML = ""; 

    questions.forEach((label, index) => {
        const textarea = document.getElementById(`pergunta${index + 1}`);
        const answerText = textarea ? textarea.value.trim() : "Não respondido";

        const questionDiv = document.createElement("div");
        questionDiv.classList.add("print-question");

        const labelDiv = document.createElement("div");
        labelDiv.classList.add("print-label");
        labelDiv.textContent = label;

        const answerDiv = document.createElement("div");
        answerDiv.classList.add("print-answer");
        answerDiv.textContent = answerText;

        questionDiv.appendChild(labelDiv);
        questionDiv.appendChild(answerDiv);
        answersContainer.appendChild(questionDiv);
    });
}

// Aciona a função antes da impressão
window.onbeforeprint = preparePrintView;
