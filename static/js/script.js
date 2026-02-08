// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const quickActions = document.getElementById('quick-actions');
    const cursorGlow = document.getElementById('cursor-glow');
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const modalClose = document.getElementById('modalClose');

    // ===== CURSOR GLOW EFFECT =====
    document.addEventListener('mousemove', (e) => {
        if (cursorGlow) {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        }
    });

    // ===== IMAGE FORMAT FALLBACK =====
    // Global function for trying different image formats
    window.tryNextFormat = (img, formats, baseName) => {
        const currentExt = img.src.split('.').pop();
        const baseUrl = img.src.replace(`.${currentExt}`, '');

        for (const format of formats) {
            if (currentExt !== format) {
                img.src = `${baseUrl}.${format}`;
                return;
            }
        }
        // If all formats fail, use placeholder
        img.src = 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priyanshu&backgroundColor=6366f1';
    };

    // Function to handle certificate image fallbacks
    function createCertImageWithFallbacks(cert) {
        const primarySrc = cert.image;
        const fallbacks = cert.fallbackImages || [];

        return `<img src="${primarySrc}" alt="${cert.name}" class="cert-image" 
                 onerror="handleCertImageError(this, ${JSON.stringify(fallbacks).replace(/"/g, '&quot;')})">`;
    }

    window.handleCertImageError = (img, fallbacks) => {
        if (fallbacks && fallbacks.length > 0) {
            img.src = fallbacks.shift();
            img.setAttribute('data-fallbacks', JSON.stringify(fallbacks));
        } else {
            img.style.display = 'none';
        }
    };

    // ===== QUICK ACTION BUTTONS =====
    quickActions.addEventListener('click', (e) => {
        const chip = e.target.closest('.action-chip');
        if (chip) {
            const action = chip.dataset.action;
            if (action) {
                // Visual feedback
                chip.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    chip.style.transform = '';
                }, 100);

                // Send message
                const displayText = chip.textContent.trim();
                addUserMessage(displayText);
                processMessage(action);
            }
        }
    });

    // ===== SEND BUTTON =====
    sendBtn.addEventListener('click', handleSend);

    // ===== ENTER KEY =====
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    });

    // ===== MODAL CLOSE =====
    if (modalClose) {
        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    // Focus input
    userInput.focus();

    // ===== FUNCTIONS =====
    function handleSend() {
        const text = userInput.value.trim();
        if (!text) return;

        addUserMessage(text);
        processMessage(text);
        userInput.value = '';
    }

    function addUserMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        messageDiv.innerHTML = `<div class="message-bubble"><p>${escapeHtml(text)}</p></div>`;
        chatMessages.appendChild(messageDiv);
        scrollToBottom();
    }

    function addBotMessage(html) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';
        messageDiv.innerHTML = `<div class="message-bubble">${html}</div>`;
        chatMessages.appendChild(messageDiv);
        scrollToBottom();

        // Add click handlers for certificate images
        const certImages = messageDiv.querySelectorAll('.cert-image');
        certImages.forEach(img => {
            img.addEventListener('click', () => openModal(img.src, img.alt));
        });
    }

    function showTyping() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-msg';
        typingDiv.innerHTML = `
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        chatMessages.appendChild(typingDiv);
        scrollToBottom();
        return typingDiv;
    }

    function processMessage(text) {
        const lowerText = text.toLowerCase();
        let intent = null;

        // Find matching intent
        for (const [key, keywords] of Object.entries(intentMap)) {
            if (keywords.some(kw => lowerText.includes(kw))) {
                intent = key;
                break;
            }
        }

        // Show typing indicator
        const typingElement = showTyping();

        // Simulate response delay
        setTimeout(() => {
            typingElement.remove();
            const response = generateResponse(intent);
            addBotMessage(response);
        }, 700 + Math.random() * 500);
    }

    function generateResponse(intent) {
        if (!intent) {
            return `<p>I'm not sure I understand. 🤔</p>
                    <p>Try asking about my <strong>skills</strong>, <strong>projects</strong>, <strong>experience</strong>, or <strong>certifications</strong>!</p>`;
        }

        switch (intent) {
            case 'about':
                const about = portfolioData.about;
                return `
                    <p>👋 ${about.intro}</p>
                    <p>🎯 ${about.focus}</p>
                    <p>💡 ${about.passion}</p>
                `;

            case 'skills':
                let skillsHtml = `<p>Here are my technical skills:</p>`;
                for (const [category, items] of Object.entries(portfolioData.skills)) {
                    skillsHtml += `
                        <div class="content-card">
                            <h4>📌 ${category}</h4>
                            <div>${items.map(s => `<span class="skill-tag">${s}</span>`).join('')}</div>
                        </div>
                    `;
                }
                return skillsHtml;

            case 'projects':
                let projectsHtml = `<p>Here are some projects I've built:</p>`;
                portfolioData.projects.forEach(p => {
                    projectsHtml += `
                        <div class="content-card">
                            <h4>${p.title}</h4>
                            <p>${p.description}</p>
                            <div>${p.tech.map(t => `<span class="skill-tag">${t}</span>`).join('')}</div>
                            ${p.link ? `<a href="${p.link}" target="_blank" class="project-link">🔗 View Live →</a>` : ''}
                        </div>
                    `;
                });
                return projectsHtml;

            case 'experience':
                let expHtml = `<p>Here's my professional experience:</p>`;
                portfolioData.experience.forEach(e => {
                    expHtml += `
                        <div class="content-card">
                            <h4>💼 ${e.role} @ ${e.company}</h4>
                            <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 8px;">📅 ${e.period}</p>
                            <p>${e.description}</p>
                        </div>
                    `;
                });
                return expHtml;

            case 'education':
                const edu = portfolioData.education;
                return `
                    <p>Here's my educational background:</p>
                    <div class="content-card">
                        <h4>🎓 ${edu.degree}</h4>
                        <p>📅 ${edu.graduation}</p>
                        <p style="margin-top: 8px;">📚 ${edu.focus}</p>
                    </div>
                `;

            case 'certifications':
                let certHtml = `<p>I hold the following certifications:</p>`;
                portfolioData.certifications.forEach(c => {
                    const fallbacksAttr = c.fallbackImages ? `data-fallbacks='${JSON.stringify(c.fallbackImages)}'` : '';
                    certHtml += `
                        <div class="content-card">
                            <h4>📜 ${c.name}</h4>
                            <p>${c.description}</p>
                            <img src="${c.image}" alt="${c.name}" class="cert-image" 
                                 ${fallbacksAttr}
                                 onerror="handleCertImageError(this, ${c.fallbackImages ? JSON.stringify(c.fallbackImages).replace(/"/g, '&quot;') : '[]'})">
                        </div>
                    `;
                });
                certHtml += `<p style="margin-top: 12px; color: var(--text-muted); font-size: 0.85rem;">Click on certificates to view full size</p>`;
                return certHtml;

            case 'resume':
                const resume = portfolioData.resume;
                return `
                    <p>📄 Here's my resume:</p>
                    <div class="content-card">
                        <h4>Priyanshu Dixit - Resume</h4>
                        <p>${resume.description}</p>
                        <a href="${resume.file}" target="_blank" class="download-btn">
                            <i class="fas fa-download"></i> Download Resume
                        </a>
                    </div>
                `;

            case 'contact':
                const contact = portfolioData.contact;
                return `
                    <p>I'd love to connect with you! 🤝</p>
                    <div class="content-card">
                        <p>📧 <a href="mailto:${contact.email}">${contact.email}</a></p>
                        <p>💼 <a href="${contact.linkedin}" target="_blank">LinkedIn Profile</a></p>
                        <p>💻 <a href="${contact.github}" target="_blank">GitHub Profile</a></p>
                    </div>
                `;

            default:
                return `<p>I have information on that, but let me organize my thoughts... Try asking about my skills or projects!</p>`;
        }
    }

    function openModal(src, caption) {
        modalImage.src = src;
        modalCaption.textContent = caption;
        modal.classList.add('active');
    }

    function scrollToBottom() {
        chatMessages.scrollTo({
            top: chatMessages.scrollHeight,
            behavior: 'smooth'
        });
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
});
