function mostrarDados() {
  const nome = document.getElementById("nome").value;
  document.getElementById("meuFormulario").innerHTML = nome;
}

function processarDados(event) {
  const nome = document.getElementById("nome").value;
  const senha = document.getElementById("senha").value;
  const confirmSenha = document.getElementById("confirmSenha").value;

  /*Verifica se as senhas são iguais*/
  if (senha === confirmSenha) {
    localStorage.setItem("nome", nome);
    alert("Cadastro realizado com sucesso");
  } else {
    alert("As senhas não correspondem!");
  }
}
document.querySelectorAll('input[name="sexo"]').forEach(function(radio) {
  radio.addEventListener('change', function() {
    const campoOutro = document.getElementById('campoOutroGenero');
    if (this.value === 'outro') {
      campoOutro.style.display = 'block';
    } else {
      campoOutro.style.display = 'none';
    }
  });
});