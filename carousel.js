document.addEventListener('DOMContentLoaded', function() {
    const modal = document.querySelector('.carousel-modal');
    const modalImg = document.getElementById('expandedImg');
    const closeBtn = document.querySelector('.close');
    const arrowLeft = document.querySelector('.arrow.left');
    const arrowRight = document.querySelector('.arrow.right');
    
    let currentImages = [];
    let currentIndex = 0;
    let isModalOpen = false;

    // Gestion des thumbnails
    document.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.addEventListener('click', function() {
            const project = this.closest('.project');
            currentImages = Array.from(project.querySelectorAll('.thumbnail'));
            currentIndex = currentImages.indexOf(this);
            
            openModal(this.src, this.alt);
        });
    });

    function openModal(src, alt) {
        modalImg.src = src;
        modalImg.alt = alt;
        modal.style.display = 'block';
        setTimeout(() => {
            modal.style.opacity = '1';
            isModalOpen = true;
            document.body.classList.add('modal-open');
        }, 10);
    }

    function closeModal() {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
            isModalOpen = false;
            document.body.classList.remove('modal-open');
        }, 300);
    }

    function navigate(direction) {
        currentIndex = (currentIndex + direction + currentImages.length) % currentImages.length;
        modalImg.src = currentImages[currentIndex].src;
        modalImg.alt = currentImages[currentIndex].alt;
    }

    // Événements
    closeBtn.addEventListener('click', closeModal);
    
    arrowLeft.addEventListener('click', (e) => {
        e.stopPropagation();
        navigate(-1);
    });
    
    arrowRight.addEventListener('click', (e) => {
        e.stopPropagation();
        navigate(1);
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (!isModalOpen) return;
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft') navigate(-1);
        if (e.key === 'ArrowRight') navigate(1);
    });
});