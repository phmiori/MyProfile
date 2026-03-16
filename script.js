const translations = {
    pt: {
        navHome: "Início",
        navAbout: "Sobre Mim",
        navExp: "Experiência",
        navSkills: "Habilidades",
        heroBtn1: "Conheça-me",
        heroBtn2: "Ver Experiência",
        aboutTitle: "Sobre Mim",
        aboutP1: "Olá! Sou o <strong>Pedro Henrique Miori</strong>, nascido em 26/06/2006. Moro na cidade de Piracicaba, não possuo carro e sou imerso no universo da tecnologia desde cedo.",
        aboutP2: "Atualmente curso o <strong>3º ano de Ciência da Computação</strong> na Escola de Engenharia de Piracicaba (EEP).",
        aboutP3: "Concluí o ensino médio no Colégio Piracicabano. Além disso, aprimorei minhas habilidades com o curso de Controlador de Microcomputadores no SENAI e participei ativamente de aulas de robótica na Robomind.",
        aboutP4: "Possuo nível de <strong>Inglês Intermediário/Avançado</strong>, o que me permite consumir conteúdos técnicos e interagir em ambientes internacionais com facilidade.",
        aboutP5: "Sou apaixonado por construir soluções front-end e back-end interativas e performáticas, buscando sempre novos desafios para evoluir como desenvolvedor multidisciplinar.",
        statAge: "Anos de Idade",
        statUni: "Ano de C.C. (EEP)",
        statLoc: "São Paulo (SP)",
        expTitle: "Experiência",
        expRole1Role: "Estágio em Tecnologia",
        expRole1Desc: "Atuei de forma ágil e prática no ecossistema da empresa, englobando atividades de infraestrutura e programação:",
        expRole1Li1: "<strong>Desenvolvimento Web:</strong> Fui o responsável pela criação e implementação do site institucional da empresa.",
        expRole1Li2: "<strong>Sistema Interno Automotivo:</strong> Desenvolvi um sistema próprio para armazenar e organizar números NCM (Nomenclatura Comum do Mercosul) de peças para auxiliar na geração de orçamentos rápidos.",
        skillsTitle: "Habilidades & Ferramentas",
        footerDesc: "Construindo experiências digitais modernas e robustas.",
        footerRights: "&copy; 2026 Pedro Henrique Miori. Todos os direitos reservados."
    },
    en: {
        navHome: "Home",
        navAbout: "About Me",
        navExp: "Experience",
        navSkills: "Skills",
        heroBtn1: "Know Me",
        heroBtn2: "View Experience",
        aboutTitle: "About Me",
        aboutP1: "Hello! I'm <strong>Pedro Henrique Miori</strong>, born on 06/26/2006. I live in Piracicaba, I don't own a car, and I've been immersed in the technology universe since an early age.",
        aboutP2: "I'm currently in my <strong>3rd year of Computer Science</strong> at the Escola de Engenharia de Piracicaba (EEP).",
        aboutP3: "I finished high school at Colégio Piracicabano. Furthermore, I improved my technical skills with a Microcomputer Controller course at SENAI and actively participated in robotics classes at Robomind.",
        aboutP4: "I have an <strong>Intermediate/Advanced level of English</strong>, which allows me to consume technical content and interact in international environments with ease.",
        aboutP5: "I am passionate about building interactive and performant front-end and back-end solutions, always looking for new challenges to evolve as a multidisciplinary developer.",
        statAge: "Years Old",
        statUni: "Year of C.S. (EEP)",
        statLoc: "São Paulo, Brazil",
        expTitle: "Experience",
        expRole1Role: "Technology Internship",
        expRole1Desc: "I acted in an agile and practical way in the company's ecosystem, encompassing infrastructure and programming activities:",
        expRole1Li1: "<strong>Web Development:</strong> I was responsible for the creation and implementation of the company's institutional website.",
        expRole1Li2: "<strong>Automotive Internal System:</strong> I developed a custom system to store and organize NCM (Mercosur Common Nomenclature) numbers of parts to assist in generating quick quotes.",
        skillsTitle: "Skills & Tools",
        footerDesc: "Building modern and robust digital experiences.",
        footerRights: "&copy; 2026 Pedro Henrique Miori. All rights reserved."
    }
};

const typingRoles = {
    pt: [
        "Estudante de Ciência da Computação",
        "Desenvolvedor de Software",
        "Apaixonado por Tecnologia"
    ],
    en: [
        "Computer Science Student",
        "Software Developer",
        "Passionate about Technology"
    ]
};

document.addEventListener("DOMContentLoaded", () => {
    // 1. Dynamic Navbar
    const navbar = document.querySelector(".navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 60) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // Language switch logic
    let currentLang = "pt";

    function updateLanguage(newLang) {
        if (!translations[newLang]) return;
        currentLang = newLang;

        document.documentElement.lang = newLang === "pt" ? "pt-BR" : "en";

        const elements = document.querySelectorAll("[data-i18n]");
        elements.forEach(el => {
            const key = el.getAttribute("data-i18n");
            if (translations[newLang][key]) {
                el.innerHTML = translations[newLang][key]; // Using innerHTML for <strong> tags
            }
        });

        // Update active flag
        document.querySelectorAll(".lang-flag").forEach(flag => {
            if (flag.getAttribute("data-lang") === newLang) {
                flag.classList.add("active");
            } else {
                flag.classList.remove("active");
            }
        });

        // Reset typing typing
        roleIndex = 0;
        characterIndex = 0;
        isRemoving = false;
        const currentText = typingRoles[currentLang][0];
        typingTextElement.textContent = "";

        // Restart typing if needed, but it continues automatically 
        // because of setTimeout loop. We just reset state.
    }

    const langFlags = document.querySelectorAll(".lang-flag");
    langFlags.forEach(flag => {
        flag.addEventListener("click", () => {
            updateLanguage(flag.getAttribute("data-lang"));
        });
    });

    // 2. Typing effect logic
    const typingTextElement = document.querySelector(".typing-text");
    let roleIndex = 0;
    let characterIndex = 0;
    let isRemoving = false;
    let typingSpeedDefault = 120; // Type delay

    function startTypingEffect() {
        const roles = typingRoles[currentLang];
        // safety check if array is out of bounds due to lang switch
        if (roleIndex >= roles.length) {
            roleIndex = 0;
        }

        const currentText = roles[roleIndex];

        if (isRemoving) {
            // Remove speed is faster than type speed
            typingTextElement.textContent = currentText.substring(0, characterIndex - 1);
            characterIndex--;
            typingSpeedDefault = 50;
        } else {
            // Typing
            typingTextElement.textContent = currentText.substring(0, characterIndex + 1);
            characterIndex++;
            typingSpeedDefault = 120;
        }

        // Logic for complete word
        if (!isRemoving && characterIndex === currentText.length) {
            // Pause at the end of word before starting to delete
            isRemoving = true;
            typingSpeedDefault = 2000;
        } else if (isRemoving && characterIndex === 0) {
            // Word deleted, move to next
            isRemoving = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeedDefault = 600;
        }

        setTimeout(startTypingEffect, typingSpeedDefault);
    }

    // Delays start by 1 second to let user see empty cursor briefly
    setTimeout(startTypingEffect, 1000);

    // 3. Scroll Reveal Animation Logic (Intersection Observer)
    const elementsToReveal = document.querySelectorAll(".reveal");

    const revealOptions = {
        root: null,
        threshold: 0.15, // Fire when element is 15% visible
        rootMargin: "0px 0px -40px 0px"
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Apply the CSS transition delay automatically if provided
                const customDelay = entry.target.style.getPropertyValue('--delay');
                if (customDelay) {
                    entry.target.style.transitionDelay = customDelay;
                }

                // Triggers the CSS transition
                entry.target.classList.add("active");

                // Stop observing once revealed!
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    elementsToReveal.forEach(el => {
        scrollObserver.observe(el);
    });
});
