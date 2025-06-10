document.addEventListener("DOMContentLoaded", function () {
    // Botões
    let startBtn = document.querySelector(".start-button");
    let loginBtn = document.querySelector(".login-button");
    let cadastreSeBtn = document.querySelector(".cadastro-button");
    let cadastrarBtn = document.querySelector(".fim-cadastro-button");
    let perfilBtn = document.querySelector(".perfil-button");

    if (perfilBtn) {
        perfilBtn.addEventListener("click", function () {
            window.location.href = "../tela_perfil/editarperfil.html";
        });
    }

    if (loginBtn) {
        loginBtn.addEventListener("click", async function (event) {
            event.preventDefault();

            const user = document.querySelector('input[name="user"]').value.trim();
            const senha = document.querySelector('input[name="senha"]').value.trim();

            if (!user || !senha) {
                alert("Preencha todos os campos.");
                return;
            }

            try {
                const response = await fetch("http://localhost:3000/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: `user=${encodeURIComponent(user)}&senha=${encodeURIComponent(senha)}`
                });

                const data = await response.json();

                if (data.success) {
                    localStorage.setItem("nomeUsuario", user);
                    window.location.href = "../tela_menu/menu.html";
                } else {
                    alert("Usuário ou senha incorretos.");
                }
            } catch (error) {
                console.error("Erro ao fazer login:", error);
                alert("Erro na conexão com o servidor.");
            }
        });
    }

    if (cadastrarBtn) {
        cadastrarBtn.addEventListener("click", async function (event) {
            event.preventDefault();

            const user = document.querySelector('input[name="user"]').value.trim();
            const senha = document.querySelector('input[name="senha"]').value.trim();

            if (!user || !senha) {
                alert("Preencha todos os campos.");
                return;
            }

            try {
                const response = await fetch("http://localhost:3000/cadastro", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: `user=${encodeURIComponent(user)}&senha=${encodeURIComponent(senha)}`
                });

                const data = await response.json();

                if (data.success) {
                    alert("Usuário cadastrado com sucesso!");
                    window.location.href = "../tela_login/index.html";
                } else {
                    alert("Erro ao cadastrar: " + (data.message || ""));
                }
            } catch (error) {
                console.error("Erro ao cadastrar:", error);
                alert("Erro na conexão com o servidor.");
            }
        });
    }

    if (startBtn) {
        startBtn.addEventListener("click", function () {
            window.location.href = "../tela_login/index.html";
        });
    }

    if (cadastreSeBtn) {
        cadastreSeBtn.addEventListener("click", function () {
            window.location.href = "../tela_cadastro/cadastro.html";
        });
    }

    function processarLoginOuCadastro(destino) {
        let usuarioInput = document.querySelector("input[type='text']");
        let senhaInput = document.querySelector("input[type='password']");

        if (!usuarioInput || !senhaInput) return;

        let usuario = usuarioInput.value.trim();
        let senha = senhaInput.value.trim();
        let valid = true;

        resetError(usuarioInput);
        resetError(senhaInput);

        if (usuario === "") {
            showError(usuarioInput);
            valid = false;
        }

        if (senha === "") {
            showError(senhaInput);
            valid = false;
        }

        if (valid) {
            localStorage.setItem("nomeUsuario", usuario);
            window.location.href = destino;
        }
    }

    function showError(inputElement) {
        if (!inputElement) return;
        inputElement.style.border = "2px solid red";
        inputElement.style.backgroundColor = "rgba(255, 0, 0, 0.1)";
        inputElement.placeholder = "Preenchimento Necessário";
        inputElement.classList.add("error-placeholder");
    }

    function resetError(inputElement) {
        if (!inputElement) return;
        inputElement.style.border = "";
        inputElement.style.backgroundColor = "";
        inputElement.placeholder = inputElement.getAttribute("data-placeholder") || "";
        inputElement.classList.remove("error-placeholder");
    }

    document.querySelectorAll("input").forEach(input => {
        input.setAttribute("data-placeholder", input.placeholder);
        input.addEventListener("input", () => resetError(input));
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Quiz card no explorer.html
    const quizCard = document.getElementById("quiz-card");
    if (quizCard) {
        console.log("Quiz card encontrado");
        quizCard.addEventListener("click", function () {
            window.location.href = "../jogo_quiz/dificuldade.html";
        });
    }

    // Digitação Card / tela principal
    const digitacaoAlt = document.getElementById("digitacao");
    if (digitacaoAlt) {
        digitacaoAlt.addEventListener("click", function () {
            window.location.href = "../jogo_digitacao/index.html";
        });
    }

    const quizCardAlt = document.getElementById("quiz");
    if (quizCardAlt) {
        quizCardAlt.addEventListener("click", function () {
            window.location.href = "../tela_quiz/explorer.html";
        });
    }

    const logoBtn = document.getElementById('logo-btn');
    const menu = document.getElementById('hamburger-menu');
    const closeBtn = document.getElementById('close-btn');

    if (logoBtn && menu) {
        logoBtn.addEventListener('click', () => {
            menu.style.display = 'block';
        });
    }

    if (closeBtn && menu) {
        closeBtn.addEventListener('click', () => {
            menu.style.display = 'none';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === menu) {
            menu.style.display = 'none';
        }
    });
});
