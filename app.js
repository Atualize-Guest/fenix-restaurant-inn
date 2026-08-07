// Interactive Logic for Pousada Fênix Website

document.addEventListener("DOMContentLoaded", () => {
    initRatesCalculator();
    initGallery();
    initReviewsSlider();
    initNavbarScroll();
    initFaqAccordion();
});

// 1. Rates Calculator Toggle (Com / Sem Café da Manhã)
function initRatesCalculator() {
    const cafeToggle = document.getElementById("cafeToggle");
    const labelSem = document.querySelector(".toggle-label.sem-cafe");
    const labelCom = document.querySelector(".toggle-label.com-cafe");
    
    const priceHidro = document.getElementById("price-hidro");
    const priceFamilia = document.getElementById("price-familia");
    const priceFamiliar = document.getElementById("price-familiar");

    const rates = {
        comCafe: { hidro: "R$ 440", familia: "R$ 540", familiar: "R$ 900" },
        semCafe: { hidro: "R$ 380", familia: "R$ 465", familiar: "R$ 780" }
    };

    function updatePrices() {
        if (cafeToggle.checked) {
            priceHidro.textContent = rates.comCafe.hidro;
            priceFamilia.textContent = rates.comCafe.familia;
            priceFamiliar.textContent = rates.comCafe.familiar;
            labelCom.classList.add("active");
            labelSem.classList.remove("active");
        } else {
            priceHidro.textContent = rates.semCafe.hidro;
            priceFamilia.textContent = rates.semCafe.familia;
            priceFamiliar.textContent = rates.semCafe.familiar;
            labelSem.classList.add("active");
            labelCom.classList.remove("active");
        }
    }

    cafeToggle.addEventListener("change", updatePrices);
    // Initialize
    updatePrices();
}

// 2. Dynamic Gallery with Pagination and Lightbox
let currentCategory = "quartos";
let itemsShown = 8;
let activeImagesList = [];

function initGallery() {
    const grid = document.getElementById("galleryGrid");
    const btnShowMore = document.getElementById("btnShowMore");
    const tabBtns = document.querySelectorAll(".tab-btn");

    // Lightbox elements
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const lightboxCaption = document.getElementById("lightboxCaption");
    const closeLightbox = document.getElementById("closeLightbox");
    const prevBtn = document.getElementById("prevLightbox");
    const nextBtn = document.getElementById("nextLightbox");
    let currentLightboxIdx = 0;

    function renderGallery() {
        // Fetch images array from images.js index
        const images = IMAGES[currentCategory] || [];
        activeImagesList = images;
        
        grid.innerHTML = "";
        
        const limit = Math.min(itemsShown, images.length);
        
        for (let i = 0; i < limit; i++) {
            const imgName = images[i];
            const imgPath = `./fotos-fenix/${currentCategory}/${imgName}`;
            
            // Format descriptive caption for the image
            const formattedCaption = imgName
                .replace(/\.[^/.]+$/, "") // remove extension
                .replace(/-/g, " ") // replace hyphens
                .replace(/\b\w/g, c => c.toUpperCase()); // capitalize

            const item = document.createElement("div");
            item.className = "gallery-item";
            item.innerHTML = `
                <img src="${imgPath}" alt="${formattedCaption}">
                <div class="gallery-overlay">
                    <i class="fa-solid fa-magnifying-glass-plus"></i>
                </div>
            `;
            
            item.addEventListener("click", () => openLightboxAt(i));
            grid.appendChild(item);
        }

        // Show/hide "Show More" button
        if (itemsShown >= images.length) {
            btnShowMore.style.display = "none";
        } else {
            btnShowMore.style.display = "inline-block";
        }
    }

    // Tab buttons event listener
    tabBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            tabBtns.forEach(b => b.classList.remove("active"));
            e.target.classList.add("active");
            
            currentCategory = e.target.getAttribute("data-category");
            itemsShown = 8; // Reset count
            renderGallery();
        });
    });

    // Show more button event listener
    btnShowMore.addEventListener("click", () => {
        itemsShown += 8;
        renderGallery();
    });

    // Lightbox functions
    function openLightboxAt(idx) {
        currentLightboxIdx = idx;
        const imgName = activeImagesList[currentLightboxIdx];
        const imgPath = `./fotos-fenix/${currentCategory}/${imgName}`;
        const formattedCaption = imgName
            .replace(/\.[^/.]+$/, "")
            .replace(/-/g, " ")
            .replace(/\b\w/g, c => c.toUpperCase());

        lightboxImg.src = imgPath;
        lightboxCaption.innerHTML = `${formattedCaption} (${currentLightboxIdx + 1}/${activeImagesList.length})`;
        lightbox.style.display = "block";
    }

    function navigateLightbox(dir) {
        currentLightboxIdx += dir;
        if (currentLightboxIdx < 0) {
            currentLightboxIdx = activeImagesList.length - 1;
        } else if (currentLightboxIdx >= activeImagesList.length) {
            currentLightboxIdx = 0;
        }
        openLightboxAt(currentLightboxIdx);
    }

    prevBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        navigateLightbox(-1);
    });

    nextBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        navigateLightbox(1);
    });

    closeLightbox.addEventListener("click", () => {
        lightbox.style.display = "none";
    });

    lightbox.addEventListener("click", () => {
        lightbox.style.display = "none";
    });

    lightboxImg.addEventListener("click", (e) => {
        e.stopPropagation(); // prevent closing when clicking the image itself
    });

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
        if (lightbox.style.display === "block") {
            if (e.key === "ArrowLeft") navigateLightbox(-1);
            if (e.key === "ArrowRight") navigateLightbox(1);
            if (e.key === "Escape") lightbox.style.display = "none";
        }
    });

    // Initial render
    renderGallery();
}

// 3. Reviews Carousel Slider
let currentReviewIdx = 0;
let reviewInterval;

function initReviewsSlider() {
    const cards = document.querySelectorAll(".review-card");
    const dots = document.querySelectorAll(".review-dots .dot");
    
    window.setReview = function(idx) {
        currentReviewIdx = idx;
        
        cards.forEach((card, i) => {
            if (i === currentReviewIdx) {
                card.classList.add("active");
            } else {
                card.classList.remove("active");
            }
        });

        dots.forEach((dot, i) => {
            if (i === currentReviewIdx) {
                dot.classList.add("active");
            } else {
                dot.classList.remove("active");
            }
        });
        
        // Reset auto slider interval
        clearInterval(reviewInterval);
        startAutoSlider();
    };

    function startAutoSlider() {
        reviewInterval = setInterval(() => {
            let nextIdx = currentReviewIdx + 1;
            if (nextIdx >= cards.length) nextIdx = 0;
            setReview(nextIdx);
        }, 8000);
    }

    startAutoSlider();
}

// 4. Active Navigation Links Highlights on Scroll
function initNavbarScroll() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
        let current = "";
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 120)) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    });
}

// 5. FAQ Accordion Toggle
function initFaqAccordion() {
    const faqQuestions = document.querySelectorAll(".faq-question");
    
    faqQuestions.forEach(btn => {
        btn.addEventListener("click", () => {
            const faqItem = btn.parentElement;
            
            // Toggle active state for clicked item
            faqItem.classList.toggle("active");
            
            // Close other items if one is opened (Accordion behavior)
            const allItems = document.querySelectorAll(".faq-item");
            allItems.forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove("active");
                }
            });
        });
    });
}
