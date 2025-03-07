// Script para gerar PDF do currículo usando html2pdf.js

document.addEventListener('DOMContentLoaded', function() {
    // Referência ao botão de download
    const downloadBtn = document.querySelector('.floating-download-btn a');
    
    // Adicionar evento de clique
    downloadBtn.addEventListener('click', function(e) {
        e.preventDefault();
        generatePDF();
    });
    
    // Função para gerar o PDF
    function generatePDF() {
        // Mostrar mensagem de carregamento
        const loadingToast = showToast('Gerando PDF do currículo...', 'info');
        
        // Elementos que queremos incluir no PDF
        const elements = [
            document.querySelector('#home'),
            document.querySelector('#about'),
            document.querySelector('#skills'),
            document.querySelector('#projects'),
            document.querySelector('#experience'),
            document.querySelector('#education'),
            document.querySelector('#certificates'),
            document.querySelector('#qualifications')
        ];
        
        // Criar um elemento temporário para o conteúdo do PDF
        const pdfContent = document.createElement('div');
        pdfContent.classList.add('pdf-content');
        
        // Adicionar estilo para impressão
        pdfContent.style.padding = '20px';
        pdfContent.style.fontFamily = 'Arial, sans-serif';
        
        // Adicionar cabeçalho
        const header = document.createElement('div');
        header.innerHTML = `
            <h1 style="text-align: center; color: #343a40; margin-bottom: 10px;">Vicenzo Prucoli</h1>
            <h3 style="text-align: center; color: #6c757d; margin-bottom: 20px;">Desenvolvedor Full Stack</h3>
            <hr style="border-top: 2px solid #007bff; margin-bottom: 30px;">
        `;
        pdfContent.appendChild(header);
        
        // Adicionar conteúdo de cada seção
        elements.forEach(element => {
            if (element) {
                // Clonar o elemento para não modificar o original
                const clone = element.cloneNode(true);
                
                // Remover elementos desnecessários para o PDF
                const unnecessaryElements = clone.querySelectorAll('.btn, .nav-link, .navbar');
                unnecessaryElements.forEach(el => {
                    if (el.parentNode) {
                        el.parentNode.removeChild(el);
                    }
                });
                
                // Adicionar título da seção
                const sectionTitle = clone.querySelector('.section-title');
                if (sectionTitle) {
                    const title = document.createElement('h2');
                    title.textContent = sectionTitle.textContent;
                    title.style.color = '#007bff';
                    title.style.borderBottom = '1px solid #dee2e6';
                    title.style.paddingBottom = '10px';
                    title.style.marginTop = '30px';
                    title.style.marginBottom = '20px';
                    pdfContent.appendChild(title);
                }
                
                // Adicionar conteúdo da seção
                const content = clone.querySelector('.container');
                if (content) {
                    // Remover o título da seção do conteúdo para evitar duplicação
                    const titleInContent = content.querySelector('.section-title');
                    if (titleInContent && titleInContent.parentNode) {
                        titleInContent.parentNode.removeChild(titleInContent);
                    }
                    
                    // Adicionar o conteúdo ao PDF
                    Array.from(content.children).forEach(child => {
                        pdfContent.appendChild(child.cloneNode(true));
                    });
                }
            }
        });
        
        // Adicionar rodapé
        const footer = document.createElement('div');
        footer.style.marginTop = '30px';
        footer.style.textAlign = 'center';
        footer.style.color = '#6c757d';
        footer.style.fontSize = '12px';
        footer.innerHTML = `
            <hr style="border-top: 1px solid #dee2e6; margin-bottom: 15px;">
            <p>Currículo gerado em ${new Date().toLocaleDateString()} | Vicenzo Prucoli</p>
        `;
        pdfContent.appendChild(footer);
        
        // Configurações do PDF
        const opt = {
            margin: [10, 10],
            filename: 'curriculo-vicenzo-prucoli.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        
        // Gerar o PDF
        html2pdf()
            .set(opt)
            .from(pdfContent)
            .save()
            .then(() => {
                // Esconder mensagem de carregamento e mostrar mensagem de sucesso
                hideToast(loadingToast);
                showToast('PDF gerado com sucesso!', 'success');
            })
            .catch(err => {
                // Esconder mensagem de carregamento e mostrar mensagem de erro
                hideToast(loadingToast);
                showToast('Erro ao gerar PDF. Tente novamente.', 'danger');
                console.error('Erro ao gerar PDF:', err);
            });
    }
    
    // Função para mostrar toast de notificação
    function showToast(message, type) {
        const toast = document.createElement('div');
        toast.classList.add('toast', 'show', `bg-${type}`, 'text-white');
        toast.style.position = 'fixed';
        toast.style.bottom = '100px';
        toast.style.right = '30px';
        toast.style.minWidth = '250px';
        toast.style.zIndex = '1100';
        toast.style.padding = '15px';
        toast.style.borderRadius = '4px';
        toast.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
        
        toast.innerHTML = message;
        document.body.appendChild(toast);
        
        return toast;
    }
    
    // Função para esconder toast
    function hideToast(toast) {
        if (toast && toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }
});
