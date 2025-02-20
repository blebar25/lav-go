document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Fade in elements on scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeInOnScroll = () => {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', fadeInOnScroll);
    fadeInOnScroll(); // Initial check

    // Form submission handling
    const reservationForm = document.getElementById('reservationForm');
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically send the form data to your backend
            alert('Merci pour votre réservation ! Nous vous contacterons bientôt.');
            this.reset();
        });
    }

    // Mobile menu handling
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    if (navbarToggler && navbarCollapse) {
        document.addEventListener('click', function(e) {
            if (!navbarCollapse.contains(e.target) && !navbarToggler.contains(e.target)) {
                navbarCollapse.classList.remove('show');
            }
        });
    }

    // Configuration des images personnalisées pour les laveries
    const customImages = {
        'Cléry': ['IMG_1843.JPG', 'IMG_1845.JPG', 'IMG_1846.JPG', 'IMG_1847.JPG', 'IMG_1848.JPG'],
        'Ponceau': ['IMG_1837.JPG', 'IMG_1838.JPG', 'IMG_1840.JPG', 'IMG_1841.JPG', 'IMG_1842.JPG'],
        'Forbin': ['Forbin_1.jpeg', 'Forbin_2.jpeg', 'Forbin_3.jpeg', 'Forbin_4.jpeg', 'Forbin_5.jpeg', 'Forbin_6.jpeg'],
        'Franklin': ['Franklin_1.jpeg', 'Franklin_2.jpeg', 'Franklin_3.jpeg', 'Franklin_4.jpeg', 'Franklin_5.jpeg'],
        'Liberté': ['Liberté_1.jpeg', 'Liberté_2.jpeg', 'Liberté_3.jpeg', 'Liberté_4.jpeg', 'Liberté_5.jpeg', 'Liberté_6.jpeg'],
        'Rosiers': ['Rosiers_1.jpeg', 'Rosiers_2.jpeg', 'Rosiers_3.jpeg', 'Rosiers_4.jpeg', 'Rosiers_5.jpeg', 'Rosiers_6.jpeg', 'Rosiers_7.jpeg'],
        'Schuman': ['MEB_1.jpg', 'MEB_2.jpg', 'MEB_3.jpg', 'MEB_4.jpg'],
        'Kleber': ['Kleber_1.jpeg', 'Kleber_2.jpeg', 'Kleber_3.jpeg', 'Kleber_4.jpeg', 'Kleber_5.jpeg', 'Kleber_6.jpeg', 'Kleber_7.jpeg', 'Kleber_8.jpeg'],
        'Fiolle': ['Fiolle_1.jpeg', 'Fiolle_2.jpeg', 'Fiolle_3.jpeg', 'Fiolle_4.jpeg', 'Fiolle_5.jpeg'],
        'Gand': ['Gand1.jpeg', 'Gand2.jpeg', 'Gand3.jpeg'],
        'Barthélémy': ['frere_1.jpeg', 'frere_2.jpeg', 'frere_3.jpeg', 'frere_4.jpeg', 'frere_5.jpeg']
    };

    // Images par défaut pour les laveries sans photos personnalisées
    const defaultImages = [
        'https://images.unsplash.com/photo-1545173168-9f1947eebb7f',
        'https://images.unsplash.com/photo-1521656693074-0ef32e80a5d5',
        'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60'
    ];

    // Liste complète des laveries
    const laundries = [
        { name: 'Laverie Cléry', address: '67 rue de Clery, Paris 75002' },
        { name: 'Laverie Ponceau', address: '7 rue du Ponceau, Paris 75002' },
        { name: 'Laverie Forbin', address: '51 rue de Forbin, Marseille 13002' },
        { name: 'Laverie Franklin', address: '7 rue Benjamin Franklin, Paris 75116' },
        { name: 'Laverie Liberté', address: '20 boulevard de la Liberté, Marseille 13001' },
        { name: 'Laverie Rosiers', address: '2 traverse des Rosiers, Marseille 13014' },
        { name: 'Laverie Schuman', address: '16 rue Robert Schuman, Mons En Baroeul 59370' },
        { name: 'Laverie Kleber', address: '108 rue Kleber Prolongée, Marseille 13002' },
        { name: 'Laverie Fiolle', address: '14 rue du docteur Fiolle, Marseille 13006' },
        { name: 'Laverie Barthélémy', address: '17 rue des 3 frères Barthélémy, Marseille 13006' },
        { name: 'Laverie Dunkerque', address: '212 avenue de Dunkerque, Lambersart 59130' },
        { name: 'Laverie du Parc', address: '20 rue du Parc, La Madeleine 59110' },
        { name: 'Laverie Gand', address: '188 rue de Gand, Tourcoing 59200' },
        { name: 'Laverie Moroy', address: '225 rue Pierre Moroy, Lille 59000' },
        { name: 'Laverie Drapiez', address: '25 rue du Augustin Drapiez, Lille 59000' },
        { name: 'Laverie Foch', address: '170 rue du Maréchal Foch, Loos 59120' }
    ];

    // Fonction pour obtenir les images d'une laverie
    function getLaundryImages(laundryName) {
        // Extraire le nom de base (sans "Laverie ")
        const baseName = laundryName.replace('Laverie ', '');
        return customImages[baseName] || defaultImages;
    }

    // Fonction pour créer le HTML du carrousel
    function createCarouselHTML(laverie, index) {
        const images = getLaundryImages(laverie.name);
        
        // Créer les indicateurs du carrousel
        const indicators = images.map((_, i) => `
            <button type="button" data-bs-target="#carousel-${index}" 
                    data-bs-slide-to="${i}" 
                    class="${i === 0 ? 'active' : ''}" 
                    aria-current="${i === 0 ? 'true' : 'false'}" 
                    aria-label="Slide ${i + 1}">
            </button>
        `).join('');

        // Créer les items du carrousel
        const items = images.map((img, i) => {
            // Préserver la casse du nom pour le chemin des images
            const baseName = laverie.name.replace('Laverie ', '');
            const imgSrc = img.startsWith('http') ? img : `images/${baseName}/${img}`;
            console.log('Loading image:', imgSrc); // Ajout du log
            return `
                <div class="carousel-item ${i === 0 ? 'active' : ''}">
                    <img src="${imgSrc}" class="d-block w-100" alt="${laverie.name} - Image ${i + 1}" onerror="console.error('Failed to load:', this.src)">
                </div>
            `;
        }).join('');

        // Retourner le HTML complet du carrousel
        return `
            <div class="col-md-4">
                <div class="laverie-card">
                    ${isRosiers(laverie.name) || isKleber(laverie.name) || isFranklin(laverie.name) ? '<span class="laverie-badge-2">Lessive offerte</span>' : ''}
                    <div id="carousel-${index}" class="carousel slide" data-bs-ride="carousel" data-bs-interval="false">
                        <div class="carousel-indicators">
                            ${indicators}
                        </div>
                        <div class="carousel-inner">
                            ${items}
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carousel-${index}" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carousel-${index}" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                    <div class="card-content">
                        <h4>${laverie.name}</h4>
                        <p>${laverie.address}</p>
                        <button onclick="getDirections(\`${laverie.address.replace(/`/g, '\\`')}\`)" class="btn-directions">
                            <i class="fas fa-directions mr-2"></i>
                            Itinéraire
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // Fonctions utilitaires pour vérifier le type de laverie
    function isRosiers(name) {
        return name.toLowerCase().includes('rosiers');
    }

    function isKleber(name) {
        return name.toLowerCase().includes('kleber');
    }

    function isFranklin(name) {
        return name.toLowerCase().includes('franklin');
    }

    // Fonction pour ouvrir Google Maps à l'adresse spécifiée
    function getDirections(address) {
        // Encoder l'adresse pour l'URL
        const encodedAddress = encodeURIComponent(address);
        // Construire l'URL de Google Maps
        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
        // Ouvrir dans un nouvel onglet
        window.open(mapsUrl, '_blank');
    }

    // Fonction pour initialiser toutes les laveries
    function initializeLaundries() {
        const laveriesList = document.getElementById('laveries-list');
        if (!laveriesList) return;

        // Générer le HTML pour toutes les laveries
        const launderiesHTML = laundries.map((laverie, index) => 
            createCarouselHTML(laverie, index)
        ).join('');

        // Insérer le HTML dans la page
        laveriesList.innerHTML = `<div class="row">${launderiesHTML}</div>`;
    }

    // Initialiser les laveries au chargement de la page
    initializeLaundries();
});
