// Script para gerar PDF do currículo usando html2pdf.js

document.addEventListener('DOMContentLoaded', function() {
    // Referência ao botão de download
    const downloadBtn = document.querySelector('.floating-download-btn a');
    
    // Adicionar evento de clique
    downloadBtn.addEventListener('click', function(e) {
        e.preventDefault();
        prepareAndGeneratePDF();
    });
    
    // Função para preparar e gerar o PDF
    function prepareAndGeneratePDF() {
        // Mostrar mensagem de carregamento
        const loadingToast = showToast('Preparando o currículo para download...', 'info');
        
        // Seções para percorrer
        const sections = [
            '#home',
            '#about',
            '#skills',
            '#projects',
            '#experience',
            '#education',
            '#disciplines',
            '#certificates',
            '#qualifications'
        ];
        
        // Índice da seção atual
        let currentSectionIndex = 0;
        
        // Função para rolar para a próxima seção
        function scrollToNextSection() {
            if (currentSectionIndex < sections.length) {
                const section = document.querySelector(sections[currentSectionIndex]);
                if (section) {
                    // Rolar para a seção atual
                    section.scrollIntoView({ behavior: 'smooth' });
                    
                    // Incrementar o índice para a próxima seção
                    currentSectionIndex++;
                    
                    // Aguardar um tempo antes de rolar para a próxima seção
                    setTimeout(scrollToNextSection, 800); // 800ms para cada seção
                } else {
                    currentSectionIndex++;
                    scrollToNextSection();
                }
            } else {
                // Voltar ao topo da página
                window.scrollTo({ top: 0, behavior: 'smooth' });
                
                // Aguardar um tempo antes de gerar o PDF
                setTimeout(function() {
                    // Atualizar mensagem de carregamento
                    hideToast(loadingToast);
                    const pdfLoadingToast = showToast('Gerando PDF do currículo...', 'info');
                    
                    // Gerar o PDF
                    setTimeout(function() {
                        generatePDF(pdfLoadingToast);
                    }, 500);
                }, 800);
            }
        }
        
        // Iniciar o processo de rolagem
        scrollToNextSection();
    }
    
    // Função para gerar o PDF
    function generatePDF(loadingToast) {
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
        
        // Adicionar espacamento no topo da página
        addTopSpacing(pdfContent);
        
        // ---------- PRIMEIRA PÁGINA: FOTO DE PERFIL ----------
        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
            const aboutClone = aboutSection.cloneNode(true);
            
            // Remover elementos desnecessários
            removeUnnecessaryElements(aboutClone);
            
            // Extrair apenas a imagem de perfil para a primeira página
            const container = aboutClone.querySelector('.container');
            if (container) {
                const row = container.querySelector('.row');
                if (row) {
                    const imgCol = row.querySelector('.col-lg-4');
                    
                    if (imgCol) {
                        // Criar conteúdo apenas com a imagem
                        const imgContent = imgCol.cloneNode(true);
                        const profileImg = imgContent.querySelector('img');
                        if (profileImg) {
                            // Restaurando as configurações originais da imagem
                            profileImg.style.maxHeight = 'none';
                            profileImg.style.width = 'auto';
                            profileImg.style.display = 'inline-block';
                            profileImg.style.margin = '0 auto 20px';
                            profileImg.style.borderRadius = '10px';
                            profileImg.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                        }
                        
                        // Centralizar a imagem
                        imgContent.style.textAlign = 'center';
                        imgContent.className = '';
                        imgContent.style.maxWidth = 'none';
                        imgContent.style.margin = '0 auto';
                        
                        // Adicionar apenas a imagem ao PDF
                        pdfContent.appendChild(imgContent);
                    }
                }
            }
            
            // Adicionar quebra de página
            addPageBreak(pdfContent);
            
            // Adicionar espacamento no topo da página
            addTopSpacing(pdfContent);
            
            // Adicionar título da seção na segunda página
            const aboutTitle = document.createElement('h2');
            aboutTitle.className = 'text-center section-title';
            aboutTitle.textContent = 'Sobre Mim';
            aboutTitle.style.marginBottom = '30px';
            aboutTitle.style.color = '#007bff';
            aboutTitle.style.fontSize = '28px';
            aboutTitle.style.width = '100%';
            aboutTitle.style.wordBreak = 'break-word';
            aboutTitle.style.whiteSpace = 'normal';
            pdfContent.appendChild(aboutTitle);
            
            // Adicionar o texto na segunda página
            const container2 = aboutClone.querySelector('.container');
            if (container2) {
                const row2 = container2.querySelector('.row');
                if (row2) {
                    const textCol = row2.querySelector('.col-lg-8');
                    
                    if (textCol) {
                        // Adicionar apenas o texto
                        const textContent = textCol.cloneNode(true);
                        textContent.className = '';
                        pdfContent.appendChild(textContent);
                    }
                }
            }
            
            // Adicionar quebra de página
            addPageBreak(pdfContent);
        }
        
        // Adicionar espacamento no topo da página
        addTopSpacing(pdfContent);
        
        // ---------- SEGUNDA PÁGINA: HABILIDADES ----------
        const skillsSection = document.querySelector('#skills');
        if (skillsSection) {
            const skillsClone = skillsSection.cloneNode(true);
            
            // Remover elementos desnecessários
            removeUnnecessaryElements(skillsClone);
            
            // Adicionar título da seção
            const skillsTitle = document.createElement('h2');
            skillsTitle.className = 'text-center section-title';
            skillsTitle.textContent = 'Habilidades';
            skillsTitle.style.marginBottom = '30px';
            skillsTitle.style.color = '#007bff';
            skillsTitle.style.fontSize = '28px'; // Aumentando o tamanho da fonte
            skillsTitle.style.width = '100%'; // Garantindo que ocupe toda a largura
            skillsTitle.style.wordBreak = 'break-word'; // Permitindo quebra de palavras
            skillsTitle.style.whiteSpace = 'normal'; // Permitindo quebra de linha
            pdfContent.appendChild(skillsTitle);
            
            // Adicionar conteúdo
            addSectionContent(skillsClone, pdfContent);
            
            // Adicionar quebra de página
            addPageBreak(pdfContent);
        }
        
        // Adicionar espacamento no topo da página
        addTopSpacing(pdfContent);
        
        // ---------- TERCEIRA PÁGINA: PROJETOS ----------
        const projectsSection = document.querySelector('#projects');
        if (projectsSection) {
            const projectsClone = projectsSection.cloneNode(true);
            
            // Remover elementos desnecessários
            removeUnnecessaryElements(projectsClone);
            
            // Adicionar título da seção
            const projectsTitle = document.createElement('h2');
            projectsTitle.className = 'text-center section-title';
            projectsTitle.textContent = 'Projetos';
            projectsTitle.style.marginBottom = '30px';
            projectsTitle.style.color = '#007bff';
            projectsTitle.style.fontSize = '28px'; // Aumentando o tamanho da fonte
            projectsTitle.style.width = '100%'; // Garantindo que ocupe toda a largura
            projectsTitle.style.wordBreak = 'break-word'; // Permitindo quebra de palavras
            projectsTitle.style.whiteSpace = 'normal'; // Permitindo quebra de linha
            pdfContent.appendChild(projectsTitle);
            
            // Adicionar conteúdo
            addSectionContent(projectsClone, pdfContent);
            
            // Adicionar quebra de página
            addPageBreak(pdfContent);
        }
        
        // Adicionar espacamento no topo da página
        addTopSpacing(pdfContent);
        
        // ---------- QUARTA PÁGINA: EXPERIÊNCIA PROFISSIONAL ----------
        const experienceSection = document.querySelector('#experience');
        if (experienceSection) {
            const experienceClone = experienceSection.cloneNode(true);
            
            // Remover elementos desnecessários
            removeUnnecessaryElements(experienceClone);
            
            // Adicionar título da seção
            const experienceTitle = document.createElement('h2');
            experienceTitle.className = 'text-center section-title';
            experienceTitle.textContent = 'Experiência Profissional';
            experienceTitle.style.marginBottom = '30px';
            experienceTitle.style.color = '#007bff';
            experienceTitle.style.fontSize = '28px'; // Aumentando o tamanho da fonte
            experienceTitle.style.width = '100%'; // Garantindo que ocupe toda a largura
            experienceTitle.style.wordBreak = 'break-word'; // Permitindo quebra de palavras
            experienceTitle.style.whiteSpace = 'normal'; // Permitindo quebra de linha
            pdfContent.appendChild(experienceTitle);
            
            // Adicionar conteúdo
            const experienceContent = experienceClone.querySelectorAll('.container .row.justify-content-center');
            if (experienceContent && experienceContent.length > 0) {
                experienceContent.forEach(row => {
                    pdfContent.appendChild(row.cloneNode(true));
                });
            }
            
            // Adicionar quebra de página
            addPageBreak(pdfContent);
            
            // Adicionar espacamento no topo da página
            addTopSpacing(pdfContent);
        }
        
        // ---------- QUINTA PÁGINA: FORMAÇÃO ACADÊMICA ----------
        const educationSection = document.querySelector('#education');
        if (educationSection) {
            const educationClone = educationSection.cloneNode(true);
            
            // Remover elementos desnecessários
            removeUnnecessaryElements(educationClone);
            
            // Adicionar título da seção
            const educationTitle = document.createElement('h2');
            educationTitle.className = 'text-center section-title';
            educationTitle.textContent = 'Formação Acadêmica';
            educationTitle.style.marginBottom = '30px';
            educationTitle.style.color = '#007bff';
            educationTitle.style.fontSize = '28px'; // Aumentando o tamanho da fonte
            educationTitle.style.width = '100%'; // Garantindo que ocupe toda a largura
            educationTitle.style.wordBreak = 'break-word'; // Permitindo quebra de palavras
            educationTitle.style.whiteSpace = 'normal'; // Permitindo quebra de linha
            pdfContent.appendChild(educationTitle);
            
            // Adicionar conteúdo
            const educationContent = educationClone.querySelector('.container');
            if (educationContent) {
                const rowContent = educationContent.querySelector('.row.justify-content-center');
                if (rowContent) {
                    pdfContent.appendChild(rowContent.cloneNode(true));
                }
            }
            
            // Adicionar quebra de página
            addPageBreak(pdfContent);
        }
        
        // Adicionar espacamento no topo da página
        addTopSpacing(pdfContent);
        
        // ---------- SEXTA PÁGINA: DISCIPLINAS ----------
        const disciplinesSection = document.querySelector('#disciplines');
        if (disciplinesSection) {
            const disciplinesClone = disciplinesSection.cloneNode(true);
            
            // Remover elementos desnecessários
            removeUnnecessaryElements(disciplinesClone);
            
            // Adicionar título da seção
            const disciplinasTitle = document.createElement('h2');
            disciplinasTitle.className = 'text-center section-title';
            disciplinasTitle.textContent = 'Disciplinas e Tecnologias Estudadas';
            disciplinasTitle.style.marginBottom = '30px';
            disciplinasTitle.style.color = '#007bff';
            disciplinasTitle.style.fontSize = '28px'; // Aumentando o tamanho da fonte
            disciplinasTitle.style.width = '100%'; // Garantindo que ocupe toda a largura
            disciplinasTitle.style.wordBreak = 'break-word'; // Permitindo quebra de palavras
            disciplinasTitle.style.whiteSpace = 'normal'; // Permitindo quebra de linha
            pdfContent.appendChild(disciplinasTitle);
            
            // Adicionar conteúdo
            const disciplinesContent = disciplinesClone.querySelector('.container');
            if (disciplinesContent) {
                // Adicionar cards de disciplinas
                const rowContent = disciplinesContent.querySelector('.row.g-4');
                if (rowContent) {
                    pdfContent.appendChild(rowContent.cloneNode(true));
                }

                // Adicionar quebra de página para o TCC
                addPageBreak(pdfContent);
                
                // Adicionar espacamento no topo da página
                addTopSpacing(pdfContent);
                
                // Adicionar título para o TCC
                const tccTitle = document.createElement('h2');
                tccTitle.className = 'text-center section-title';
                tccTitle.textContent = 'Projeto de Conclusão de Curso';
                tccTitle.style.marginBottom = '30px';
                tccTitle.style.color = '#007bff';
                tccTitle.style.fontSize = '28px';
                tccTitle.style.width = '100%';
                tccTitle.style.wordBreak = 'break-word';
                tccTitle.style.whiteSpace = 'normal';
                pdfContent.appendChild(tccTitle);
                
                // Adicionar projeto de conclusão de curso
                const tccContent = disciplinesContent.querySelector('.row.mt-4');
                if (tccContent) {
                    pdfContent.appendChild(tccContent.cloneNode(true));
                }
            }
            
            // Adicionar quebra de página
            addPageBreak(pdfContent);
            
            // Adicionar espacamento no topo da página
            addTopSpacing(pdfContent);
        }    
         
            
        // ---------- SÉTIMA PÁGINA: CERTIFICADOS ----------
        const certificatesSection = document.querySelector('#certificates');
        if (certificatesSection) {
            const certificatesClone = certificatesSection.cloneNode(true);
            
            // Remover elementos desnecessários
            removeUnnecessaryElements(certificatesClone);
            
            // Adicionar título da seção
            const certificatesTitle = document.createElement('h2');
            certificatesTitle.className = 'text-center section-title';
            certificatesTitle.textContent = 'Certificados';
            certificatesTitle.style.marginBottom = '30px';
            certificatesTitle.style.color = '#007bff';
            certificatesTitle.style.fontSize = '28px'; // Aumentando o tamanho da fonte
            certificatesTitle.style.width = '100%'; // Garantindo que ocupe toda a largura
            certificatesTitle.style.wordBreak = 'break-word'; // Permitindo quebra de palavras
            certificatesTitle.style.whiteSpace = 'normal'; // Permitindo quebra de linha
            pdfContent.appendChild(certificatesTitle);
            
            // Adicionar conteúdo
            const certificatesContent = certificatesClone.querySelector('.container');
            if (certificatesContent) {
                const rowContent = certificatesContent.querySelector('.row.justify-content-center');
                if (rowContent) {
                    pdfContent.appendChild(rowContent.cloneNode(true));
                }
            }
            
            // Adicionar quebra de página
            addPageBreak(pdfContent);
            
            // Adicionar espacamento no topo da página
            addTopSpacing(pdfContent);
        }
        
        // ---------- OITAVA PÁGINA: QUALIFICAÇÕES ----------
        const qualificationsSection = document.querySelector('#qualifications');
        if (qualificationsSection) {
            const qualificationsClone = qualificationsSection.cloneNode(true);
            
            // Remover elementos desnecessários
            removeUnnecessaryElements(qualificationsClone);
            
            // Adicionar título da seção
            const qualificationsTitle = document.createElement('h2');
            qualificationsTitle.className = 'text-center section-title';
            qualificationsTitle.textContent = 'Qualificações';
            qualificationsTitle.style.marginBottom = '30px';
            qualificationsTitle.style.color = '#007bff';
            qualificationsTitle.style.fontSize = '28px'; // Aumentando o tamanho da fonte
            qualificationsTitle.style.width = '100%'; // Garantindo que ocupe toda a largura
            qualificationsTitle.style.wordBreak = 'break-word'; // Permitindo quebra de palavras
            qualificationsTitle.style.whiteSpace = 'normal'; // Permitindo quebra de linha
            pdfContent.appendChild(qualificationsTitle);
            
            // Adicionar conteúdo
            const qualificationsContent = qualificationsClone.querySelector('.container');
            if (qualificationsContent) {
                const rowContent = qualificationsContent.querySelector('.row.justify-content-center');
                if (rowContent) {
                    pdfContent.appendChild(rowContent.cloneNode(true));
                }
            }
            
            // Adicionar espacamento no topo da página
            addTopSpacing(pdfContent);
        }
        
        // Adicionar rodapé
        const footer = document.createElement('div');
        footer.style.marginTop = '30px';
        footer.style.textAlign = 'center';
        footer.style.color = '#6c757d';
        footer.style.fontSize = '12px';
        footer.innerHTML = `
            <hr style="border-top: 1px solid #dee2e6; margin-bottom: 15px;">
            <p>Curriculum gerado em ${new Date().toLocaleDateString()} | Vicenzo Prucoli</p>
            <p>Acesse a versão online: <a href="https://vicenzolol.github.io/" style="color: #007bff;">https://vicenzolol.github.io/</a></p>
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
    
    // Função para remover elementos desnecessários
    function removeUnnecessaryElements(element) {
        const unnecessaryElements = element.querySelectorAll('.btn, .nav-link, .navbar');
        unnecessaryElements.forEach(el => {
            if (el.parentNode) {
                el.parentNode.removeChild(el);
            }
        });
        
        // Remover efeitos de fade-in e garantir visibilidade total
        const allElements = element.querySelectorAll('*');
        allElements.forEach(el => {
            // Remover classes de animação
            if (el.classList) {
                el.classList.remove('fade', 'fade-in', 'animate__animated', 'animate__fadeIn');
            }
            
            // Remover atributos de animação
            el.removeAttribute('data-aos');
            el.removeAttribute('data-aos-delay');
            
            // Aplicar estilos inline para garantir visibilidade
            el.style.opacity = '1';
            el.style.visibility = 'visible';
            el.style.animation = 'none';
            el.style.transition = 'none';
            el.style.transform = 'none';
            el.style.color = el.style.color || '#212529'; // Garantir cor de texto visível
        });
    }
    
    // Função para adicionar título da seção
    function addSectionTitle(element, pdfContent) {
        const sectionTitle = element.querySelector('.section-title');
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
    }
    
    // Função para adicionar conteúdo da seção
    function addSectionContent(element, pdfContent) {
        const content = element.querySelector('.container');
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
    
    // Função para adicionar quebra de página
    function addPageBreak(pdfContent) {
        const pageBreak = document.createElement('div');
        pageBreak.style.pageBreakAfter = 'always';
        pageBreak.style.height = '1px';
        pageBreak.style.margin = '0';
        pageBreak.style.padding = '0';
        pdfContent.appendChild(pageBreak);
    }
    
    // Função para adicionar espacamento no topo da página
    function addTopSpacing(pdfContent) {
        const spacer = document.createElement('div');
        spacer.style.height = '60px'; // Aumentando o espacamento para 60px
        pdfContent.appendChild(spacer);
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
