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
    const modal = document.getElementById('password-modal');
    modal.classList.add('show');
    modal.style.display = 'flex';
}

function closePasswordModal() {
    const modal = document.getElementById('password-modal');
    modal.classList.remove('show');
    modal.style.display = 'none';
    document.getElementById('password-form').reset();
}

// Fechar modal ao clicar fora
document.getElementById('password-modal').addEventListener('click', (e) => {
    if (e.target.id === 'password-modal') {
        closePasswordModal();
    }
});

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
    // Mostrar modal personalizado com tema do sistema
    Layout.showSuccessModal(
        'Desativar Conta?',
        'Sua conta ficará oculta, mas você poderá reativá-la ao fazer login novamente. Tem certeza que deseja continuar?',
        () => {
            // Callback para confirmar desativação
            const allUsers = State.getUsers();
            const idx = allUsers.findIndex(u => u.email === user.email);
            if (idx !== -1) {
                allUsers[idx].ativo = false;
                State.setUsers(allUsers);
            }
            
            Layout.showSuccessModal(
                'Conta Desativada',
                'Sua conta foi desativada com sucesso. Para reativá-la, basta fazer login a qualquer momento.',
                () => {
                    State.logout();
                    window.location.href = 'login.html';
                }
            );
        },
        'Desativar'
    );
}

function deleteAccount() {
    // Mostrar modal personalizado com tema do sistema para confirmação
    showDeleteConfirmationModal(
        'Excluir Conta Permanentemente?',
        'Esta ação é irreversível. Todos os seus dados, projetos, eventos e conexões serão removidos permanentemente do sistema. Tem certeza que deseja continuar?',
        () => {
            // Callback para confirmar exclusão
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
        },
        'Excluir Permanentemente'
    );
}

/* ── MODAL DE CONFIRMAÇÃO PARA EXCLUSÃO (COM TEMA VERMELHO) ── */
function showDeleteConfirmationModal(title, message, callback, buttonText = 'Excluir') {
    // Remover modal existente se houver
    const existing = document.getElementById('delete-confirm-modal');
    if (existing) existing.remove();

    const modalHtml = `
        <div id="delete-confirm-modal" class="modal" style="display: flex; background: rgba(14,14,16,0.7); backdrop-filter: blur(8px); z-index: 9999; position: fixed; inset: 0; justify-content: center; align-items: center;">
            <div class="modal-content" style="max-width: 400px; height: auto; border-radius: 24px; text-align: center; padding: 40px 32px; margin: auto; background: #fff; box-shadow: 0 20px 50px rgba(0,0,0,0.2);">
                <div style="width: 80px; height: 80px; background: #ffebee; color: #e53935; border-radius: 50%; display: grid; place-items: center; margin: 0 auto 24px;">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 4 21 4 23 6 23 20a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V6"></polyline><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line><line x1="5" y1="7" x2="22" y2="7"></line></svg>
                </div>
                <h2 style="font-size: 24px; margin-bottom: 12px; color: #1a1a1f; font-family: 'Sora', sans-serif;">${title}</h2>
                <p style="color: #4a4a55; margin-bottom: 32px; line-height: 1.5; font-size: 15px;">${message}</p>
                <div style="display: flex; gap: 12px; justify-content: center;">
                    <button id="cancel-delete-btn" class="btn btn-ghost" style="flex: 1; height: 48px; font-size: 16px; border-radius: 12px; color: var(--ink); font-weight: 600;">Cancelar</button>
                    <button id="confirm-delete-btn" class="btn" style="flex: 1; height: 48px; font-size: 16px; border-radius: 12px; background: #e53935; color: #fff; font-weight: 600;">
                        ${buttonText}
                    </button>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    const cancelBtn = document.getElementById('cancel-delete-btn');
    const confirmBtn = document.getElementById('confirm-delete-btn');
    const modal = document.getElementById('delete-confirm-modal');

    cancelBtn.onclick = () => {
        modal.remove();
    };

    confirmBtn.onclick = () => {
        modal.remove();
        if (callback) callback();
    };

    // Fechar ao clicar fora
    modal.onclick = (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    };
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
