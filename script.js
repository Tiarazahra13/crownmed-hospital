
const menuToggle = document.getElementById('menuToggle');
const navbar = document.getElementById('navbar').querySelector('ul');

menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('active');
    menuToggle.classList.toggle('active');
});


document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});


document.addEventListener('click', (e) => {
    if (!e.target.closest('header')) {
        navbar.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
  
    if (currentScroll > 100) {
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
        header.style.background = '#ffffff';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
  
    if (currentScroll > lastScroll && currentScroll > 500) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
    const scrollPos = window.pageYOffset + 200;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveLink);


const appointmentForm = document.getElementById('appointmentForm');


const dateInput = document.getElementById('date');
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);


function validateName(name) {
    return name.trim().length >= 3;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[0-9]{10,13}$/;
    return phoneRegex.test(phone.replace(/[\s-]/g, ''));
}

function validateSelect(value) {
    return value !== '';
}

function validateDate(date) {
    const selectedDate = new Date(date);
    const todayDate = new Date(today);
    return selectedDate >= todayDate;
}


function showError(input, message) {
    const formGroup = input.parentElement;
    const errorMessage = formGroup.querySelector('.error-message');
    
    input.classList.add('error');
    errorMessage.textContent = message;
    errorMessage.style.color = '#e74c3c';
}


function showSuccess(input) {
    const formGroup = input.parentElement;
    const errorMessage = formGroup.querySelector('.error-message');
    
    input.classList.remove('error');
    errorMessage.textContent = '';
}


function validateField(input) {
    const value = input.value.trim();
    let isValid = true;
    
    switch(input.id) {
        case 'name':
            if (value === '') {
                showError(input, 'Nama lengkap harus diisi');
                isValid = false;
            } else if (!validateName(value)) {
                showError(input, 'Nama harus minimal 3 karakter');
                isValid = false;
            } else {
                showSuccess(input);
            }
            break;
            
        case 'email':
            if (value === '') {
                showError(input, 'Email harus diisi');
                isValid = false;
            } else if (!validateEmail(value)) {
                showError(input, 'Format email tidak valid');
                isValid = false;
            } else {
                showSuccess(input);
            }
            break;
            
        case 'phone':
            if (value === '') {
                showError(input, 'No. telepon harus diisi');
                isValid = false;
            } else if (!validatePhone(value)) {
                showError(input, 'No. telepon harus 10-13 digit angka');
                isValid = false;
            } else {
                showSuccess(input);
            }
            break;
            
        case 'service':
            if (!validateSelect(value)) {
                showError(input, 'Pilih salah satu layanan');
                isValid = false;
            } else {
                showSuccess(input);
            }
            break;
            
        case 'date':
            if (value === '') {
                showError(input, 'Tanggal kunjungan harus diisi');
                isValid = false;
            } else if (!validateDate(value)) {
                showError(input, 'Pilih tanggal hari ini atau setelahnya');
                isValid = false;
            } else {
                showSuccess(input);
            }
            break;
    }
    
    return isValid;
}


const requiredInputs = appointmentForm.querySelectorAll('input[required], select[required]');

requiredInputs.forEach(input => {
    input.addEventListener('blur', () => {
        validateField(input);
    });
    
    input.addEventListener('input', () => {
        if (input.classList.contains('error')) {
            validateField(input);
        }
    });
});


appointmentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isFormValid = true;
    
  
    requiredInputs.forEach(input => {
        if (!validateField(input)) {
            isFormValid = false;
        }
    });
    
    if (isFormValid) {
      
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            service: document.getElementById('service').value,
            date: document.getElementById('date').value,
            message: document.getElementById('message').value
        };
        
   
        showSuccessModal(formData);
     
        appointmentForm.reset();
        
     s
        requiredInputs.forEach(input => {
            input.classList.remove('error');
            const errorMessage = input.parentElement.querySelector('.error-message');
            if (errorMessage) errorMessage.textContent = '';
        });
    } else {
     
        const firstError = appointmentForm.querySelector('.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
});


function showSuccessModal(data) {
    const modal = document.createElement('div');
    modal.className = 'success-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h2>Permohonan Berhasil Dikirim!</h2>
            <p>Terima kasih <strong>${data.name}</strong>,</p>
            <p>Permohonan janji temu Anda untuk <strong>${getServiceName(data.service)}</strong> pada tanggal <strong>${formatDate(data.date)}</strong> telah kami terima.</p>
            <p>Tim kami akan menghubungi Anda melalui email (<strong>${data.email}</strong>) atau telepon (<strong>${data.phone}</strong>) dalam waktu 1x24 jam.</p>
            <button class="btn btn-primary" onclick="closeModal()">
                <i class="fas fa-times"></i> Tutup
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
    

    const style = document.createElement('style');
    style.textContent = `
        .success-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            animation: fadeIn 0.3s ease;
        }
        
        .modal-content {
            background: white;
            padding: 40px;
            border-radius: 20px;
            max-width: 500px;
            text-align: center;
            animation: slideUp 0.3s ease;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }
        
        .modal-icon {
            font-size: 4rem;
            color: #27ae60;
            margin-bottom: 20px;
        }
        
        .modal-content h2 {
            color: #0066cc;
            margin-bottom: 20px;
        }
        
        .modal-content p {
            color: #666;
            margin-bottom: 15px;
            line-height: 1.6;
        }
        
        .modal-content strong {
            color: #0066cc;
        }
        
        .modal-content .btn {
            margin-top: 20px;
        }
        
        @keyframes slideUp {
            from {
                transform: translateY(50px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

function closeModal() {
    const modal = document.querySelector('.success-modal');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => modal.remove(), 300);
    }
}

function getServiceName(value) {
    const services = {
        'umum': 'Poli Umum',
        'gigi': 'Poli Gigi',
        'kandungan': 'Poli Kandungan',
        'anak': 'Poli Anak',
        'jantung': 'Poli Jantung',
        'penyakit-dalam': 'Poli Penyakit Dalam',
        'mcu': 'Medical Check Up'
    };
    return services[value] || value;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('id-ID', options);
}


const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);


document.querySelectorAll('.service-card, .doctor-card, .facility-item, .info-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});


const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        if (validateEmail(email)) {
            alert(`Terima kasih! Anda telah berlangganan newsletter kami dengan email: ${email}`);
            newsletterForm.reset();
        } else {
            alert('Mohon masukkan alamat email yang valid');
        }
    });
}


document.querySelectorAll('.btn-consult').forEach(btn => {
    btn.addEventListener('click', () => {
        const doctorCard = btn.closest('.doctor-card');
        const doctorName = doctorCard.querySelector('h3').textContent;
        
        alert(`Fitur konsultasi dengan ${doctorName} akan segera tersedia. Silakan hubungi kami melalui formulir kontak untuk membuat janji temu.`);
        

        document.getElementById('kontak').scrollIntoView({ behavior: 'smooth' });
    });
});


if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}


if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}


window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});


console.log('%c🏥 CrownMed Hospital Website', 'color: #0066cc; font-size: 20px; font-weight: bold;');
console.log('%cWebsite loaded successfully!', 'color: #27ae60; font-size: 14px;');
console.log('%cDeveloped for: Tugas Pemrograman Berbasis Web', 'color: #666; font-size: 12px;');