// 1. تأثير الفقاعات المتحركة في الخلفية
const bubblesContainer = document.getElementById('bubbles');
function createBubble() {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    
    // حجم عشوائي
    const size = Math.random() * 60 + 20 + 'px';
    bubble.style.width = size;
    bubble.style.height = size;
    
    // مكان عشوائي
    bubble.style.left = Math.random() * 100 + '%';
    
    // شفافية عشوائية
    bubble.style.opacity = Math.random() * 0.5;
    
    // مدة حركة عشوائية
    bubble.style.animationDuration = Math.random() * 10 + 5 + 's';
    
    bubblesContainer.appendChild(bubble);
    
    // حذف الفقاعة بعد انتهاء الحركة لتخفيف الضغط
    setTimeout(() => {
        bubble.remove();
    }, 15000);
}
// صنع فقاعة كل نصف ثانية
setInterval(createBubble, 500);


// 2. تأثير الكتابة التلقائية (Typewriter)
const textElement = document.querySelector('.type-text');
const words = ["أدوات للمطورين 💻", "ذكاء اصطناعي 🤖", "حماية مجموعات 🛡️", "ترفيه وألعاب 🎮"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        textElement.textContent = currentWord.substring(0, charIndex--);
    } else {
        textElement.textContent = currentWord.substring(0, charIndex++);
    }

    let speed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
        speed = 2000; // انتظار بعد كتابة الكلمة
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 500;
    }

    setTimeout(typeEffect, speed);
}
typeEffect();


// 3. تأثير الظهور عند السكرول (Scroll Reveal)
const revealElements = document.querySelectorAll('.reveal, .reveal-card');

function revealOnScroll() {
    revealElements.forEach(el => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const revealPoint = 150;

        if (elementTop < windowHeight - revealPoint) {
            el.classList.add('active');
        }
    });
}
window.addEventListener('scroll', revealOnScroll);


// 4. تأثير 3D Tilt للبطاقات (حركة البطاقة مع الماوس)
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const cardRect = card.getBoundingClientRect();
        const cardWidth = cardRect.width;
        const cardHeight = cardRect.height;
        const centerX = cardRect.left + cardWidth / 2;
        const centerY = cardRect.top + cardHeight / 2;
        
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        
        const rotateX = (mouseY / cardHeight) * -20; // دوران خفيف
        const rotateY = (mouseX / cardWidth) * 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    // إعادة البطاقة لوضعها الطبيعي عند خروج الماوس
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0) rotateY(0)`;
    });
});


// 5. زر النسخ
const copyBtns = document.querySelectorAll('.copy-btn');
copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const codeText = btn.previousElementSibling.innerText;
        navigator.clipboard.writeText(codeText);
        
        const icon = btn.querySelector('i');
        icon.classList.remove('fa-copy');
        icon.classList.add('fa-check');
        icon.style.color = 'var(--neon-blue)';
        
        setTimeout(() => {
            icon.classList.remove('fa-check');
            icon.classList.add('fa-copy');
            icon.style.color = '';
        }, 2000);
    });
});
