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