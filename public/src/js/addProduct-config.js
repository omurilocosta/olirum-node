<<<<<<< HEAD
// Garante que o formulário seja resetado ao carregar a página
window.addEventListener('load', function () {
  const form = document.getElementById('contactForm');
  form.reset();
});

// Adiciona um evento de clique ao botão de envio
document.getElementById('submitButton').addEventListener('click', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const preco = document.getElementById('preco').value.trim();
  const imagem = document.getElementById('imagem').value.trim();

  if (name === '') {
    showModal('O nome não pode ficar em branco...');
    return;
  }

  if (preco === '') {
    showModal('O preco não pode ficar em branco...');
    return;
  }

  if (imagem == '') {
    showModal('O link de imagem não pode estar em branco...')
  }

  const formData = {
    imagem: imagem,
    nome: name,
    preco: preco,
  };

  fetch('/salvar', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData)})
    .then((response) => response.json())
    .then((data) => {
      if (data.redirect) {
        window.location.href = data.redirect;
      }
    })
    .catch(() => showModal('Erro ao salvar os dados.'));
});

function showModal(message) {
  const modalMessage = document.getElementById('modalMessage');

  modalMessage.textContent = message;

  const feedbackModal = new bootstrap.Modal(
    document.getElementById('feedbackModal')
  );

  feedbackModal.show();
=======
// Garante que o formulário seja resetado ao carregar a página
window.addEventListener('load', function () {
  const form = document.getElementById('contactForm');
  form.reset();
});

// Adiciona um evento de clique ao botão de envio
document.getElementById('submitButton').addEventListener('click', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const preco = document.getElementById('preco').value.trim();
  const imagem = document.getElementById('imagem').value.trim();

  if (name === '') {
    showModal('O nome não pode ficar em branco...');
    return;
  }

  if (preco === '') {
    showModal('O preco não pode ficar em branco...');
    return;
  }

  if (imagem == '') {
    showModal('O link de imagem não pode estar em branco...')
  }

  const formData = {
    imagem: imagem,
    nome: name,
    preco: preco,
  };

  fetch('/salvar', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData)})
    .then((response) => response.json())
    .then((data) => {
      if (data.redirect) {
        window.location.href = data.redirect;
      }
    })
    .catch(() => showModal('Erro ao salvar os dados.'));
});

function showModal(message) {
  const modalMessage = document.getElementById('modalMessage');

  modalMessage.textContent = message;

  const feedbackModal = new bootstrap.Modal(
    document.getElementById('feedbackModal')
  );

  feedbackModal.show();
>>>>>>> daf3a99b732d26f6337c645708530b0aa54c83c6
}