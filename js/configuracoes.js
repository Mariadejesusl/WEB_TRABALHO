const user = Layout.init({ active: 'configuracoes' });
if (!user) throw new Error('auth');

/* ── PREENCHE CAMPOS DE CONTA ── */
document.getElementById('settings-name').value  = user.nome_completo || user.nome || '';
document.getElementById('settings-email').value = user.email || '';
if (document.getElementById('settings-username')) {
    document.getElementById('settings-username').value = user.username || '';
}

/* ── SALVA CONTA ── */
document.getElementById('settings-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const updated = {
        ...user,
        nome_completo: document.getElementById('settings-name').value,
        username: document.getElementById('settings-username')?.value || user.username,
    };
    State.setCurrentUser(updated);
    Layout.showToast('Configurações salvas!');
    setTimeout(() => window.location.reload(), 1000);
});

/* ── NOTIFICAÇÕES ── */
function saveNotifSettings() {
    const prefs = {
        eventos:         document.getElementById('notif-eventos')?.checked,
        conexoes:        document.getElementById('notif-conexoes')?.checked,
        projetos:        document.getElementById('notif-projetos')?.checked,
        emailResumo:     document.getElementById('notif-email-resumo')?.checked,
        emailNovidades:  document.getElementById('notif-email-novidades')?.checked,
    };
    const updated = { ...user, notifPrefs: prefs };
    State.setCurrentUser(updated);
    Layout.showToast('Preferências de notificação salvas!');
}

/* ── PRIVACIDADE ── */
function savePrivSettings() {
    const prefs = {
        perfilPublico: document.getElementById('priv-perfil')?.checked,
        mostrarEmail:  document.getElementById('priv-email')?.checked,
        indexarBusca:  document.getElementById('priv-busca')?.checked,
    };
    const updated = { ...user, privPrefs: prefs };
    State.setCurrentUser(updated);
    Layout.showToast('Preferências de privacidade salvas!');
}

/* ── ALTERAR SENHA ── */
function openPasswordModal() {
    document.getElementById('password-modal').style.display = 'flex';
}

function closePasswordModal() {
    document.getElementById('password-modal').style.display = 'none';
    document.getElementById('password-form').reset();
}

document.getElementById('password-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const current = document.getElementById('current-password').value;
    const newPass = document.getElementById('new-password').value;
    const confirm = document.getElementById('confirm-new-password').value;

    if (current !== user.senha) {
        Layout.showToast('Senha atual incorreta!', 'error');
        return;
    }

    if (newPass !== confirm) {
        Layout.showToast('As novas senhas não coincidem!', 'error');
        return;
    }

    const updated = { ...user, senha: newPass };
    State.setCurrentUser(updated);
    
    // Atualizar no array global de usuários também
    const allUsers = State.getUsers();
    const idx = allUsers.findIndex(u => u.email === user.email);
    if (idx !== -1) {
        allUsers[idx].senha = newPass;
        State.setUsers(allUsers);
    }

    Layout.showToast('Senha alterada com sucesso!');
    closePasswordModal();
});

/* ── ZONA DE PERIGO ── */
function deactivateAccount() {
    if (confirm('Tem certeza que deseja desativar sua conta? Você poderá reativá-la ao fazer login novamente.')) {
        Layout.showSuccessModal(
            'Conta Desativada',
            'Sua conta foi desativada com sucesso. Para reativá-la, basta fazer login a qualquer momento.',
            () => {
                State.logout();
                window.location.href = 'login.html';
            }
        );
    }
}

function deleteAccount() {
    if (confirm('ATENÇÃO: Esta ação é irreversível. Todos os seus dados serão excluídos permanentemente. Deseja continuar?')) {
        // Remover do array de usuários
        const allUsers = State.getUsers().filter(u => u.email !== user.email);
        State.setUsers(allUsers);
        
        Layout.showSuccessModal(
            'Conta Excluída',
            'Sua conta e todos os seus dados foram removidos permanentemente do sistema.',
            () => {
                State.logout();
                window.location.href = 'index.html';
            }
        );
    }
}

/* ── RESTAURA PREFERÊNCIAS SALVAS ── */
document.addEventListener('DOMContentLoaded', () => {
    // Preferências de aparência removidas conforme solicitação

    // Notificações salvas
    if (user.notifPrefs) {
        const p = user.notifPrefs;
        if (document.getElementById('notif-eventos'))        document.getElementById('notif-eventos').checked        = !!p.eventos;
        if (document.getElementById('notif-conexoes'))       document.getElementById('notif-conexoes').checked       = !!p.conexoes;
        if (document.getElementById('notif-projetos'))       document.getElementById('notif-projetos').checked       = !!p.projetos;
        if (document.getElementById('notif-email-resumo'))   document.getElementById('notif-email-resumo').checked   = !!p.emailResumo;
        if (document.getElementById('notif-email-novidades'))document.getElementById('notif-email-novidades').checked = !!p.emailNovidades;
    }

    // Privacidade salva
    if (user.privPrefs) {
        const p = user.privPrefs;
        if (document.getElementById('priv-perfil')) document.getElementById('priv-perfil').checked = !!p.perfilPublico;
        if (document.getElementById('priv-email'))  document.getElementById('priv-email').checked  = !!p.mostrarEmail;
        if (document.getElementById('priv-busca'))  document.getElementById('priv-busca').checked  = !!p.indexarBusca;
    }

    // Nav lateral: scroll suave entre seções
    document.querySelectorAll('.config-nav-item').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.config-nav-item').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            const target = document.getElementById(link.dataset.section);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
});