const slct = (element) => document.querySelector(element)
const slctA = (element) => document.querySelectorAll(element)
const getId = (element) => document.getElementById(element)
const getClass = (element) => document.getElementsByClassName(element)

let quantCatalog = 1

const openModal = () => {
    //console.log('click');
    slct('.catalogWindowArea').style.opacity = 0
    slct('.catalogWindowArea').style.display = 'flex'
    setTimeout(() => slct('.catalogWindowArea').style.opacity = 1, 500)
}

const closeModal = () => {
    //console.log('click');
    slct('.catalogWindowArea').style.opacity = 1
    slct('.catalogWindowArea').style.display = 'none'
    setTimeout(() => slct('.catalogWindowArea').style.opacity = 0, 500)
}

const cancelBtn = slct('.catalogInfo--cancelBtn')
cancelBtn.addEventListener('click', () => {
    closeModal()
})

const fillModal = (imagem, preco, nome) => {
    openModal()
    console.log(imagem, preco, nome);
    slct('.catalogInfo h1').innerHTML = nome
    slct('.catalogBig img').src = imagem
    slct('.catalogInfo--actualPrice').innerHTML = 'R$ '+ preco
}

const quantity = () => {
    slct('.catalogInfo--qtmais').addEventListener('click', () => {
        quantCatalog++
        slct('.catalogInfo--qt').innerHTML = quantCatalog
    })

    slct('.catalogInfo--qtmenos').addEventListener('click', () => {
        if(quantCatalog > 1) {
            quantCatalog--
            slct('.catalogInfo--qt').innerHTML = quantCatalog
        }
    })
}

fetch('/dados')
    .then((response) => response.json())
    .then((data) => {
        if (data.error) {
            window.location.href = '/';
        } else {
        
            let conteudo = `
                <div class="catalog-area">
            `;

            for (let index = 0; index < data.length; index++) {
                conteudo += `
                    <div class="catalog-item">
                        <a href="#" onclick="fillModal('${data[index].imagem}','${data[index].preco}','${data[index].nome}')">
                            <div class="catalog-item--img"><img draggable="false" src="${data[index].imagem}" /></div>
                            <div class="catalog-item--add u-flex u-items-center u-justify-center">
                                <p>+</p>
                                <i class='bx bx-cart'></i>
                            </div>
                        </a>
                        <div class="catalog-item--name">${data[index].nome}</div>
                        <div class="catalog-item--price">R$ ${data[index].preco}</div>
                    </div>`;
                }

            conteudo += `</div>`;

            getId('content').innerHTML = conteudo;
        }
    })
    .catch(() => (window.location.href = '/'));

quantity()