document.addEventListener('DOMContentLoaded', function () {
  const fotoPreview = document.getElementById("foto-preview");
  const fileUpload  = document.getElementById("fileUpload");
  const perfilForm  = document.querySelector(".perfil-form");

  if (!fotoPreview || !fileUpload || !perfilForm) {
    console.warn("Elementos do perfil não encontrados (foto/file/form). Verifique IDs/classes.");
    return;
  }

  const inputs = perfilForm.querySelectorAll('input');
  const inputNome     = inputs[0] || null;
  const inputTelefone = inputs[1] || null;
  const inputEndereco = inputs[2] || null;
  const inputEmail    = inputs[3] || null;

  // Alterar foto e atualizar preview
  fileUpload.addEventListener("change", function (event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (e) {
      fotoPreview.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });

  // Salvar dados no localStorage
  function salvarDados() {
    const perfil = {
      foto: fotoPreview.src || "",
      nome: inputNome?.value || "",
      telefone: inputTelefone?.value || "",
      endereco: inputEndereco?.value || "",
      email: inputEmail?.value || ""
    };
    localStorage.setItem("perfilUsuario", JSON.stringify(perfil));
  }

  // Carregar dados ao abrir página
  function carregarDados() {
    const raw = localStorage.getItem("perfilUsuario");
    if (!raw) return;
    try {
      const perfil = JSON.parse(raw);
      if (perfil.foto) fotoPreview.src = perfil.foto;
      if (inputNome) inputNome.value = perfil.nome || "";
      if (inputTelefone) inputTelefone.value = perfil.telefone || "";
      if (inputEndereco) inputEndereco.value = perfil.endereco || "";
      if (inputEmail) inputEmail.value = perfil.email || "";
    } catch (err) {
      console.error("Erro ao ler perfil do localStorage:", err);
    }
  }

  // Ao salvar formulário
  perfilForm.addEventListener("submit", function (e) {
    e.preventDefault();
    salvarDados();
    alert("Perfil salvo com sucesso!");
  });

  carregarDados();
});
