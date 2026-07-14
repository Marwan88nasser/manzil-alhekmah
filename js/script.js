/* =========================================================
   منزل الحكمة — الملف الرئيسي للسكربتات
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  /* ---------------------------------------------------
    1) تفعيل أيقونات Lucide
  --------------------------------------------------- */
  if (window.lucide) lucide.createIcons();

  /* ---------------------------------------------------
    2) قائمة الجوال (Burger Menu)
  --------------------------------------------------- */
  const burgerBtn = document.getElementById("burger-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  function getBurgerIcon() {
    return burgerBtn?.querySelector("[data-lucide]");
  }
  function setBurgerIcon(name) {
    const icon = getBurgerIcon();
    if (!icon) return;
    icon.setAttribute("data-lucide", name);
    if (window.lucide) lucide.createIcons();
  }

  function toggleMobileMenu(e) {
    e.stopPropagation(); // يمنع وصول الضغطة لمستمع "الضغط خارج القائمة" فتقفلها بالغلط فورًا
    const isOpen = mobileMenu?.classList.toggle("open");
    setBurgerIcon(isOpen ? "x" : "menu");
  }
  function closeMobileMenu() {
    mobileMenu?.classList.remove("open");
    setBurgerIcon("menu");
  }

  burgerBtn?.addEventListener("click", toggleMobileMenu);

  mobileMenu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  document.addEventListener("click", (e) => {
    if (!mobileMenu?.classList.contains("open")) return;
    if (mobileMenu.contains(e.target) || burgerBtn?.contains(e.target)) return;
    closeMobileMenu();
  });

  /* ---------------------------------------------------
     4) هيدر شفاف عند التمرير (ظل أقوى)
  --------------------------------------------------- */
  const header = document.getElementById("site-header");
  const headerBar = document.getElementById("site-header-bar");
  function handleHeaderScroll() {
    if (!headerBar) return;
    if (window.scrollY > 20) {
      headerBar.classList.add("shadow-[0_15px_35px_-15px_rgba(12,35,64,0.35)]");
    } else {
      headerBar.classList.remove("shadow-[0_15px_35px_-15px_rgba(12,35,64,0.35)]");
    }
  }
  window.addEventListener("scroll", handleHeaderScroll);
  handleHeaderScroll();

  /* ---------------------------------------------------
     5) زر الصعود لأعلى
  --------------------------------------------------- */
  const backToTop = document.getElementById("back-to-top");
  function handleBackToTop() {
    if (!backToTop) return;
    if (window.scrollY > 480) backToTop.classList.add("show");
    else backToTop.classList.remove("show");
  }
  window.addEventListener("scroll", handleBackToTop);
  handleBackToTop();
  backToTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------------------------------------------------
     6) تأثير الظهور التدريجي عند التمرير (Reveal)
  --------------------------------------------------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------------------------------------------------
     7) سلايدر الهيرو الرئيسي (Swiper)
  --------------------------------------------------- */
  const heroSwiperEl = document.querySelector(".hero-swiper");
  if (heroSwiperEl && window.Swiper) {
    const heroSwiper = new Swiper(".hero-swiper", {
      effect: "fade",
      fadeEffect: { crossFade: true },
      parallax: true,
      loop: true,
      speed: 1100,
      autoplay: { delay: 6000, disableOnInteraction: false },
      pagination: { el: ".hero-swiper .swiper-pagination", clickable: true },
      navigation: {
        nextEl: ".hero-swiper .swiper-button-next",
        prevEl: ".hero-swiper .swiper-button-prev",
      },
      on: {
        slideChange(sw) {
          document.querySelectorAll(".hero-slide").forEach((el, i) => {
            el.classList.toggle("hero-slide-active", i === sw.realIndex);
          });
        },
        init(sw) {
          document.querySelectorAll(".hero-slide").forEach((el, i) => {
            el.classList.toggle("hero-slide-active", i === sw.realIndex);
          });
        },
      },
    });
  }

  /* ---------------------------------------------------
     8) سلايدر الفريق الطبي
  --------------------------------------------------- */
  if (document.querySelector(".team-swiper") && window.Swiper) {
    new Swiper(".team-swiper", {
      spaceBetween: 28,
      slidesPerView: 1,
      loop: true,
      autoplay: { delay: 4200 },
      pagination: { el: ".team-swiper .swiper-pagination", clickable: true },
      breakpoints: {
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
    });
  }

  /* ---------------------------------------------------
     9) سلايدر آراء العملاء
  --------------------------------------------------- */
  if (document.querySelector(".testimonials-swiper") && window.Swiper) {
    new Swiper(".testimonials-swiper", {
      effect: "fade",
      fadeEffect: { crossFade: true },
      slidesPerView: 1,
      loop: true,
      autoplay: { delay: 6000, disableOnInteraction: false },
      pagination: { el: ".testimonials-swiper .swiper-pagination", clickable: true },
    });
  }

  /* ---------------------------------------------------
     10) سلايدر العروض
  --------------------------------------------------- */
  if (document.querySelector(".offers-swiper") && window.Swiper) {
    new Swiper(".offers-swiper", {
      spaceBetween: 24,
      slidesPerView: 1,
      loop: true,
      autoplay: { delay: 5000, disableOnInteraction: false },
      pagination: { el: ".offers-swiper .swiper-pagination", clickable: true },
      navigation: {
        nextEl: ".offers-swiper .swiper-button-next",
        prevEl: ".offers-swiper .swiper-button-prev",
      },
      breakpoints: {
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
    });
  }

  /* ---------------------------------------------------
     11) الأسئلة الشائعة (FAQ Accordion)
  --------------------------------------------------- */
  document.querySelectorAll("[data-faq-trigger]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest("[data-faq-item]");
      const panel = item.querySelector("[data-faq-panel]");
      const icon = item.querySelector("[data-faq-icon]");
      const isOpen = item.classList.contains("faq-open");

      // اغلاق كل العناصر الأخرى
      document.querySelectorAll("[data-faq-item]").forEach((el) => {
        el.classList.remove("faq-open");
        el.querySelector("[data-faq-panel]").style.gridTemplateRows = "0fr";
        el.querySelector("[data-faq-panel]").style.opacity = "0";
        el.querySelector("[data-faq-icon]")?.classList.remove("rotate-180");
      });

      if (!isOpen) {
        item.classList.add("faq-open");
        panel.style.gridTemplateRows = "1fr";
        panel.style.opacity = "1";
        icon?.classList.add("rotate-180");
      }
    });
  });
  // فتح أول سؤال افتراضياً
  document.querySelector("[data-faq-trigger]")?.click();

  /* ---------------------------------------------------
     12) جولة داخل المركز (Tour Gallery)
  --------------------------------------------------- */
  const tourMain = document.getElementById("tour-main-img");
  const tourCounter = document.getElementById("tour-counter");
  const tourThumbs = document.querySelectorAll("[data-tour-thumb]");
  const tourSideBtns = document.querySelectorAll("[data-tour-side]");
  const tourShowAllBtn = document.getElementById("tour-show-all");
  const tourLightbox = document.getElementById("tour-lightbox");
  const tourLightboxClose = document.getElementById("tour-lightbox-close");

  if (tourMain) {
    const images = JSON.parse(tourMain.dataset.images);
    let active = 0;

    function renderTour() {
      tourMain.src = images[active];
      if (tourCounter) tourCounter.textContent = `صورة ${active + 1} من ${images.length}`;
      tourThumbs.forEach((t) => {
        const idx = Number(t.dataset.tourThumb);
        t.classList.toggle("ring-teal", idx === active);
        t.classList.toggle("ring-transparent", idx !== active);
      });
      tourSideBtns.forEach((btn, i) => {
        const idx = (active + 1 + i) % images.length;
        btn.querySelector("img").src = images[idx];
        btn.dataset.goto = idx;
      });
    }
    renderTour();

    tourMain.closest("button")?.addEventListener("click", () => {
      active = (active + 1) % images.length;
      renderTour();
    });
    tourThumbs.forEach((t) => {
      t.addEventListener("click", () => {
        active = Number(t.dataset.tourThumb);
        renderTour();
      });
    });
    tourSideBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        active = Number(btn.dataset.goto);
        renderTour();
      });
    });
    tourShowAllBtn?.addEventListener("click", () => {
      tourLightbox?.classList.remove("hidden");
    });
    tourLightboxClose?.addEventListener("click", () => {
      tourLightbox?.classList.add("hidden");
    });
    tourLightbox?.addEventListener("click", (e) => {
      if (e.target === tourLightbox) tourLightbox.classList.add("hidden");
    });
    document.querySelectorAll("[data-tour-lightbox-item]").forEach((item) => {
      item.addEventListener("click", () => {
        active = Number(item.dataset.tourLightboxItem);
        renderTour();
        tourLightbox?.classList.add("hidden");
      });
    });
  }

  /* ---------------------------------------------------
     13) صفحة الحجز — نموذج متعدد الخطوات
  --------------------------------------------------- */
  initBookingForm();
});

/* =========================================================
   نموذج الحجز متعدد الخطوات
   ========================================================= */
function initBookingForm() {
  const form = document.getElementById("booking-form");
  if (!form) return;

  let step = 1;
  const state = { service: null, serviceTitle: null, doctor: null, date: null, time: null, name: "", phone: "" };

  const stepPanels = document.querySelectorAll("[data-step-panel]");
  const stepDots = document.querySelectorAll("[data-step-dot]");
  const stepLines = document.querySelectorAll("[data-step-line]");
  const prevBtn = document.getElementById("booking-prev");
  const nextBtn = document.getElementById("booking-next");
  const submitBtn = document.getElementById("booking-submit");
  const successPanel = document.getElementById("booking-success");
  const formWrapper = document.getElementById("booking-form-wrapper");

  const sumService = document.getElementById("sum-service");
  const sumDoctor = document.getElementById("sum-doctor");
  const sumDate = document.getElementById("sum-date");
  const sumTime = document.getElementById("sum-time");

  function renderStep() {
    stepPanels.forEach((p) => p.classList.toggle("hidden", Number(p.dataset.stepPanel) !== step));
    stepDots.forEach((dot) => {
      const n = Number(dot.dataset.stepDot);
      dot.classList.remove("bg-teal", "text-white", "bg-ink", "bg-white", "border", "border-teal/20", "text-ink/40", "shadow-lg");
      if (step > n) {
        dot.innerHTML = '<i data-lucide="check" class="h-5 w-5"></i>';
        dot.className = "h-11 w-11 rounded-full grid place-items-center font-bold text-sm transition bg-teal text-white shadow-lg";
      } else if (step === n) {
        dot.innerHTML = n;
        dot.className = "h-11 w-11 rounded-full grid place-items-center font-bold text-sm transition bg-ink text-white shadow-lg";
      } else {
        dot.innerHTML = n;
        dot.className = "h-11 w-11 rounded-full grid place-items-center font-bold text-sm transition bg-white text-ink/40 border border-teal/20";
      }
    });
    stepLines.forEach((line) => {
      const n = Number(line.dataset.stepLine);
      line.classList.toggle("bg-teal", step > n);
      line.classList.toggle("bg-teal/20", step <= n);
    });
    prevBtn.disabled = step === 1;
    nextBtn.classList.toggle("hidden", step === 3);
    submitBtn.classList.toggle("hidden", step !== 3);
    if (window.lucide) lucide.createIcons();
    updateSummary();
    validateStep();
  }

  function updateSummary() {
    sumService.textContent = state.serviceTitle || "—";
    sumDoctor.textContent = step >= 2 && state.doctor ? state.doctor : "—";
    sumDate.textContent = state.date || "—";
    sumTime.textContent = state.time || "—";
  }

  function validateStep() {
    let valid = true;
    if (step === 1) valid = !!state.service;
    if (step === 2) valid = !!state.date && !!state.time;
    nextBtn.disabled = !valid;
    if (step === 3) {
      submitBtn.disabled = !(state.name && state.phone);
    }
  }

  // اختيار الخدمة
  document.querySelectorAll("[data-service-option]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.service = btn.dataset.serviceOption;
      state.serviceTitle = btn.dataset.serviceTitle;
      document.querySelectorAll("[data-service-option]").forEach((b) => {
        b.classList.remove("border-teal", "bg-primary-soft/60", "shadow-[0_15px_40px_-15px_rgba(45,138,158,0.4)]");
        b.classList.add("border-teal/15", "bg-white");
      });
      btn.classList.add("border-teal", "bg-primary-soft/60", "shadow-[0_15px_40px_-15px_rgba(45,138,158,0.4)]");
      btn.classList.remove("border-teal/15", "bg-white");
      validateStep();
      updateSummary();
    });
  });

  // اختيار الطبيب
  const doctorSelect = document.getElementById("doctor-select");
  if (doctorSelect) {
    state.doctor = doctorSelect.options[doctorSelect.selectedIndex]?.text;
    doctorSelect.addEventListener("change", () => {
      state.doctor = doctorSelect.options[doctorSelect.selectedIndex]?.text;
      updateSummary();
    });
  }

  // التاريخ
  const dateInput = document.getElementById("date-input");
  if (dateInput) {
    dateInput.min = new Date().toISOString().slice(0, 10);
    dateInput.addEventListener("change", () => {
      state.date = dateInput.value;
      validateStep();
      updateSummary();
    });
  }

  // الوقت
  document.querySelectorAll("[data-time-option]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.time = btn.dataset.timeOption;
      document.querySelectorAll("[data-time-option]").forEach((b) => {
        b.classList.remove("bg-teal", "border-teal", "text-white", "shadow-md");
        b.classList.add("bg-white", "border-teal/15", "text-ink");
      });
      btn.classList.add("bg-teal", "border-teal", "text-white", "shadow-md");
      btn.classList.remove("bg-white", "border-teal/15", "text-ink");
      validateStep();
      updateSummary();
    });
  });

  // بيانات التواصل
  const nameInput = document.getElementById("name-input");
  const phoneInput = document.getElementById("phone-input");
  nameInput?.addEventListener("input", () => {
    state.name = nameInput.value;
    validateStep();
  });
  phoneInput?.addEventListener("input", () => {
    state.phone = phoneInput.value;
    validateStep();
  });

  prevBtn.addEventListener("click", () => {
    if (step > 1) {
      step -= 1;
      renderStep();
    }
  });
  nextBtn.addEventListener("click", () => {
    if (step < 3 && !nextBtn.disabled) {
      step += 1;
      renderStep();
    }
  });
  submitBtn.addEventListener("click", () => {
    if (submitBtn.disabled) return;
    formWrapper.classList.add("hidden");
    successPanel.classList.remove("hidden");
    stepDots.forEach((dot) => {
      dot.innerHTML = '<i data-lucide="check" class="h-5 w-5"></i>';
      dot.className = "h-11 w-11 rounded-full grid place-items-center font-bold text-sm transition bg-teal text-white shadow-lg";
    });
    stepLines.forEach((line) => {
      line.classList.add("bg-teal");
      line.classList.remove("bg-teal/20");
    });
    if (window.lucide) lucide.createIcons();
  });

  renderStep();
}
