// Array de URLs e descrições para a troca de imagem
const images = [
    { src: "img/Petra.webp", alt: "Petra" },
    { src: "img/coliseu-roma.jfif", alt: "Coliseu de Roma" },
    { src: "img/taj-mahal.webp", alt: "Taj Mahal" }
];

let currentIndex = 0;

function swapImage() {
    const imgElement = document.getElementById('interactive-img');
    
    // Incrementa o índice, voltando para 0 se passar do final do array
    currentIndex = (currentIndex + 1) % images.length;
    
    // Atualiza o src e o alt da imagem
    imgElement.src = images[currentIndex].src;
    imgElement.alt = images[currentIndex].alt;
    
    // Adiciona um efeito visual simples
    imgElement.style.opacity = 0.5;
    setTimeout(() => {
        imgElement.style.opacity = 1;
    }, 100);
}