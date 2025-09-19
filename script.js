function mostrarDados() {
  const nome = document.getElementById("nome").value;
  document.getElementById("meuFormulario").innerHTML = nome;
}

function processarDados(event) {
  const senha = document.getElementById("senha").value;
  const confirmSenha = document.getElementById("confirmSenha").value;

  /*Verifica se as senhas são iguais*/
  if (senha === confirmSenha) {
    alert("Cadastro realizado com sucesso");
  } else {
    alert("As senhas não correspondem!");
  }
}
