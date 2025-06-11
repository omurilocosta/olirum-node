<<<<<<< HEAD
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
=======
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
                        <a href="">
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

            document.getElementById('content').innerHTML = conteudo;
        }
    })
    .catch(() => (window.location.href = '/'));

function voltar() {
    window.location.href = '/';
}

document.getElementById('confirmDelete').addEventListener('click', () => {
    // Envia a requisição DELETE para limpar os dados
    fetch('/limpar', { method: 'DELETE' })
        .then((response) => response.json())
        .then((data) => {
            // Exibe a mensagem de feedback no modal
            document.getElementById('feedbackMessage').textContent =
            data.message;

            // Atualiza a exibição para vazio
            document.getElementById('jsonData').textContent = '[]';

            // Fecha o modal de confirmação
            const confirmModal = bootstrap.Modal.getInstance(
                document.getElementById('confirmModal')
            );
            confirmModal.hide();

            // Exibe o modal de feedback
            const feedbackModal = new bootstrap.Modal(
                document.getElementById('feedbackModal')
            );
            feedbackModal.show();
        })
        .catch(() => {
            document.getElementById('feedbackMessage').textContent = 'Erro ao limpar os dados.';
            const feedbackModal = new bootstrap.Modal(
                document.getElementById('feedbackModal')
            );
            feedbackModal.show();
        });
});
>>>>>>> daf3a99b732d26f6337c645708530b0aa54c83c6
