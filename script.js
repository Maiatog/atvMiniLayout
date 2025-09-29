document.addEventListener("DOMContentLoaded", function() {
    const imagens = [
        { src: "img/muralha-da-china.webp", legenda: "Muralha da China" },
        { src: "img/Petra.webp", legenda: "Petra" },
        { src: "img/cristo-redentor.jpg", legenda: "Cristo Redentor" },
        { src: "img/machu-picchu.webp", legenda: "Machu Picchu" },
        { src: "img/chichen-itza.jfif", legenda: "Chichen Itza" },
        { src: "img/coliseu-roma.jfif", legenda: "Coliseu de Roma" },
        { src: "img/taj-mahal.webp", legenda: "Taj Mahal" }
    ];

    let indice = 0;
    const imgEl = document.getElementById("carousel-img");
    const captionEl = document.getElementById("carousel-caption");

    function atualizarCarrossel() {
        imgEl.src = imagens[indice].src;
        captionEl.textContent = imagens[indice].legenda;
    }

    imgEl.addEventListener("click", () => {
        indice = (indice + 1) % imagens.length;
        atualizarCarrossel();
    });

    atualizarCarrossel();
});