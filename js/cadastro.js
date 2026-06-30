document.getElementById('register-form').addEventListener('submit', (e) => {
      e.preventDefault();
      if (document.getElementById('senha').value !== document.getElementById('confirmar_senha').value) {
        Layout.showToast('As senhas não coincidem!', 'error');
        return;
      }
      const newUser = {
        nome_completo: document.getElementById('nome_completo').value,
        nome_usuario: document.getElementById('nome_usuario').value,
        email: document.getElementById('email').value,
        senha: document.getElementById('senha').value,
        data_cadastro: new Date().toISOString(),
        foto_perfil: '',
        bio: '',
        habilidades: [],
        experiencia: []
      };
      const users = State.getUsers();
      if (users.find(u => u.email === newUser.email || u.nome_usuario === newUser.nome_usuario)) {
        Layout.showToast('E-mail ou nome de usuário já cadastrado!', 'error');
        return;
      }
      users.push(newUser);
      State.setUsers(users);
      Layout.showSuccessModal(
        'Conta Criada!', 
        'Sua conta na SheTech foi criada com sucesso. Agora você já pode fazer login e explorar a comunidade.',
        () => { window.location.href = 'login.html'; }
      );
    });