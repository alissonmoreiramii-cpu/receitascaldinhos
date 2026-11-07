/**
 * ==========================================================================
 * SCRIPT OFICIAL - PÁGINA DE VENDAS: 30 RECEITAS DE CALDINHOS
 * Otimizado para Tráfego Pinterest & Alta Taxa de Conversão (CRO)
 * ==========================================================================
 */

// 1. CONFIGURAÇÃO DO SEU LINK DE CHECKOUT (Kiwify, Hotmart, Eduzz, Braip, PerfectPay, etc.)
// Basta substituir o link abaixo pelo link da sua plataforma de pagamento!
const CHECKOUT_URL = "https://pay.cakto.com.br/6uguhzw_1293131";

document.addEventListener("DOMContentLoaded", () => {
  initCheckoutLinks();
  initCountdownTimer();
  initFaqAccordion();
  initRecipeTabs();
  initStickyBar();
  initLiveSalesToasts();
  initExitIntent();
});

/**
 * Aplica o link de checkout em todos os botões de ação (CTAs)
 */
function initCheckoutLinks() {
  const ctaButtons = document.querySelectorAll(".btn-checkout");
  ctaButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      // Se ainda for o link de exemplo padrão, rola até o box de preços
      if (CHECKOUT_URL === "#checkout-link-aqui" || CHECKOUT_URL.startsWith("#")) {
        const pricingSection = document.getElementById("oferta");
        if (pricingSection) {
          e.preventDefault();
          pricingSection.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // Redireciona para o checkout oficial
        window.open(CHECKOUT_URL, "_blank");
      }
    });
  });
}

/**
 * Contador Regressivo Inteligente de Urgência (15 minutos renováveis)
 */
function initCountdownTimer() {
  const timerElements = document.querySelectorAll(".timer-display");
  if (!timerElements.length) return;

  let timeKey = "caldos_timer_expire";
  let expireTime = sessionStorage.getItem(timeKey);

  if (!expireTime || Date.now() > expireTime) {
    expireTime = Date.now() + 14 * 60 * 1000 + 45 * 1000; // 14 min e 45s
    sessionStorage.setItem(timeKey, expireTime);
  }

  function updateTimer() {
    const now = Date.now();
    let distance = expireTime - now;

    if (distance <= 0) {
      // Reinicia sutilmente
      expireTime = Date.now() + 15 * 60 * 1000;
      sessionStorage.setItem(timeKey, expireTime);
      distance = 15 * 60 * 1000;
    }

    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const formatted = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    timerElements.forEach(el => {
      el.textContent = formatted;
    });
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/**
 * FAQ Accordion Interativo
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");
    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Fecha todos os outros
      faqItems.forEach(other => other.classList.remove("active"));

      // Se não estava ativo, abre
      if (!isActive) {
        item.classList.add("active");
      }
    });
  });
}

/**
 * Filtro de Categorias de Receitas
 */
function initRecipeTabs() {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const recipeCards = document.querySelectorAll(".recipe-card");

  if (!tabButtons.length || !recipeCards.length) return;

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      tabButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.getAttribute("data-category");

      recipeCards.forEach(card => {
        const cardCategory = card.getAttribute("data-category");
        if (category === "todas" || cardCategory === category) {
          card.style.display = "flex";
          card.style.animation = "fadeIn 0.4s ease forwards";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

/**
 * Barra Fixa de Compra (Sticky Bottom Bar) para Tráfego Mobile do Pinterest
 */
function initStickyBar() {
  const stickyBar = document.querySelector(".sticky-bottom-bar");
  const heroCTA = document.querySelector(".hero-content .cta-wrapper");
  const pricingCard = document.querySelector(".pricing-card");

  if (!stickyBar || !heroCTA) return;

  window.addEventListener("scroll", () => {
    const heroRect = heroCTA.getBoundingClientRect();
    const isPastHero = heroRect.bottom < 0;

    let isOverPricing = false;
    if (pricingCard) {
      const pricingRect = pricingCard.getBoundingClientRect();
      // Se o card de preços já estiver na tela, esconde a barra inferior pra não duplicar
      isOverPricing = pricingRect.top < window.innerHeight && pricingRect.bottom > 0;
    }

    if (isPastHero && !isOverPricing) {
      stickyBar.classList.add("visible");
    } else {
      stickyBar.classList.remove("visible");
    }
  });
}

/**
 * Notificações de Vendas em Tempo Real (Prova Social Dinâmica e Efeito Manada)
 */
function initLiveSalesToasts() {
  const toast = document.querySelector(".live-sales-toast");
  if (!toast) return;

  const buyers = [
    { name: "Mariana R.", city: "São Paulo - SP", time: "há 2 minutos", payment: "via Pix" },
    { name: "Juliana Santos", city: "Belo Horizonte - MG", time: "há 4 minutos", payment: "via Cartão" },
    { name: "Patrícia F.", city: "Curitiba - PR", time: "há 1 minuto", payment: "via Pix" },
    { name: "Carla Silveira", city: "Porto Alegre - RS", time: "há 6 minutos", payment: "via Pix" },
    { name: "Renata Costa", city: "Rio de Janeiro - RJ", time: "há 3 minutos", payment: "via Pix" },
    { name: "Amanda M.", city: "Goiânia - GO", time: "há 5 minutos", payment: "via Cartão" },
    { name: "Luciana B.", city: "Campinas - SP", time: "há 8 minutos", payment: "via Pix" },
    { name: "Fernanda T.", city: "Florianópolis - SC", time: "há 2 minutos", payment: "via Pix" }
  ];

  let currentIndex = 0;

  function showToast() {
    const buyer = buyers[currentIndex];
    currentIndex = (currentIndex + 1) % buyers.length;

    toast.querySelector(".toast-name").textContent = buyer.name;
    toast.querySelector(".toast-city").textContent = buyer.city;
    toast.querySelector(".toast-time").textContent = buyer.time;
    toast.querySelector(".toast-payment").textContent = buyer.payment;

    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 4500);
  }

  // Primeiro popup após 5 segundos
  setTimeout(() => {
    showToast();
    // Repete a cada 18 segundos
    setInterval(showToast, 18000);
  }, 5000);
}

/**
 * Exit Intent Modal (Modal de Retenção quando o lead tenta fechar a página)
 */
function initExitIntent() {
  const modal = document.querySelector(".exit-modal-overlay");
  const closeBtn = document.querySelector(".close-modal-btn");
  if (!modal) return;

  let triggered = false;

  document.addEventListener("mouseleave", (e) => {
    if (e.clientY <= 10 && !triggered) {
      const alreadyClosed = sessionStorage.getItem("caldos_exit_shown");
      if (!alreadyClosed) {
        triggered = true;
        modal.classList.add("active");
        sessionStorage.setItem("caldos_exit_shown", "true");
      }
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("active");
    });
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });
}

