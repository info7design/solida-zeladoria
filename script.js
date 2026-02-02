// Initialize Lucide Icons
lucide.createIcons();

// Page Navigation Logic
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page-content').forEach(page => {
        page.classList.add('hidden');
    });

    // Show current page
    document.getElementById('page-' + pageId).classList.remove('hidden');

    // Update Nav Styles
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.textContent.toLowerCase().includes(pageId) || 
            (pageId === 'home' && link.textContent.toLowerCase() === 'início')) {
            link.classList.add('active');
        }
    });

    // Close mobile menu if open
    document.getElementById('mobile-menu').classList.add('hidden');
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Mobile Menu Toggle
document.getElementById('mobile-menu-button').addEventListener('click', function() {
    document.getElementById('mobile-menu').classList.toggle('hidden');
});

// Mostrar/esconder campo de currículo
document.querySelector('select[name="subject"]').addEventListener('change', function() {
    const curriculumUpload = document.getElementById('curriculum-upload');
    if (this.value === 'Trabalhe Conosco') {
        curriculumUpload.classList.remove('hidden');
    } else {
        curriculumUpload.classList.add('hidden');
    }
});

// Form Submission
document.getElementById('contact-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Pegando os dados do formulário
    const inputs = this.querySelectorAll('input[type="text"], input[type="email"], select, textarea');
    const formDataObj = {
        name: inputs[0].value,
        email: inputs[1].value,
        subject: inputs[2].value,
        message: inputs[3].value
    };

    // Validação básica
    if (!formDataObj.name || !formDataObj.email || !formDataObj.subject || !formDataObj.message) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    try {
        // Se for "Trabalhe Conosco", precisa validar currículo
        if (formDataObj.subject === 'Trabalhe Conosco') {
            const curriculumFile = document.getElementById('curriculum-file');
            if (!curriculumFile.files || curriculumFile.files.length === 0) {
                alert('Por favor, envie seu currículo!');
                return;
            }

            // Validar tamanho do arquivo (máx 5MB)
            if (curriculumFile.files[0].size > 5 * 1024 * 1024) {
                alert('Arquivo muito grande! Máximo 5MB');
                return;
            }

            // Usar FormData para enviar arquivo
            const formData = new FormData();
            formData.append('name', formDataObj.name);
            formData.append('email', formDataObj.email);
            formData.append('subject', formDataObj.subject);
            formData.append('message', formDataObj.message);
            formData.append('curriculum', curriculumFile.files[0]);

            const response = await fetch('http://localhost:3000/api/send-contact', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                document.getElementById('message-box').classList.remove('hidden');
                document.getElementById('contact-form').reset();
                document.getElementById('curriculum-upload').classList.add('hidden');
            } else {
                alert('Erro ao enviar: ' + (data.error || 'Tente novamente'));
            }
        } else {
            // Para outros assuntos, enviar JSON normalmente
            const response = await fetch('http://localhost:3000/api/send-contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formDataObj)
            });

            const data = await response.json();

            if (data.success) {
                document.getElementById('message-box').classList.remove('hidden');
                document.getElementById('contact-form').reset();
            } else {
                alert('Erro ao enviar mensagem: ' + (data.error || 'Tente novamente'));
            }
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao enviar mensagem. Verifique sua conexão e tente novamente.');
    }
});

function closeMessage() {
    document.getElementById('message-box').classList.add('hidden');
}

// Initial setup
window.onload = function() {
    showPage('home');
}
