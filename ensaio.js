const imagens = document.querySelectorAll('.galeria img');
const modal = document.getElementById('modal');
const modalImg = document.querySelector('#modal img')
const fecharImg = document.querySelector('.btnfechar img')

imagens.forEach(imagem =>{
    imagem.addEventListener('click', () =>{
        const imgSelecionada = imagem.src;
        modalImg.src = imgSelecionada;

        modal.style.display = 'flex';
        fecharImg.style.display = 'block';
    })


    fecharImg.addEventListener('click', () =>{
        fecharImg.style.display = 'none';
        modal.style.display = 'none';
       
    })
    
})

modal.addEventListener('click', (event)=>{
    if (event.target === modal){
        modal.style.display = 'none';
        fecharImg.style.display = 'none';

    }
})


