const header = document.getElementById("header");
const hamburger = document.getElementById("hamburger");

const links = document.querySelectorAll(".nav-links a");
const contact = document.querySelector(".button");

hamburger.addEventListener("click", function () {
  header.classList.toggle("open");

  if (header.classList.contains("open")) {
    links.forEach((link, index) => {
      setTimeout(() => {
        link.classList.add("show");
      }, index * 180);
    });

    setTimeout(
      () => {
        contact.classList.add("show");
      },
      links.length * 180 + 100,
    );
  } else {
    links.forEach((link) => {
      link.classList.remove("show");
    });

    contact.classList.remove("show");
  }
});

// ===============================
// Logo Slider
// ===============================

const slider = document.querySelector(".logo-slider");
const track = document.querySelector(".logo-track");

if (slider && track) {
  // گرفتن لوگوهای اصلی
  const originalLogos = Array.from(track.children);

  // کپی کردن لوگوها برای حرکت پیوسته
  originalLogos.forEach((logo) => {
    track.appendChild(logo.cloneNode(true));
  });

  let position = 0;

  // سرعت حرکت
  const speed = 1;

  // فاصله‌ای که محو شدن شروع می‌شود
  const fadeDistance = 200;

  // 5px آخر کاملاً سفید/محو
  const edgeSize = 5;

  function moveLogos() {
    // حرکت لوگوها به سمت چپ
    position -= speed;

    const halfWidth = track.scrollWidth / 2;

    // شروع دوباره بدون پرش
    if (Math.abs(position) >= halfWidth) {
      position = 0;
    }

    track.style.transform = `translateX(${position}px)`;

    // ===============================
    // Fade دو طرف
    // ===============================

    const sliderRect = slider.getBoundingClientRect();

    const logos = track.querySelectorAll("img");

    logos.forEach((logo) => {
      const logoRect = logo.getBoundingClientRect();

      // فاصله از لبه چپ
      const leftDistance = logoRect.left - sliderRect.left;

      // فاصله از لبه راست
      const rightDistance = sliderRect.right - logoRect.right;

      let opacity = 1;

      // -------------------------------
      // سمت چپ
      // -------------------------------

      if (leftDistance <= edgeSize) {
        // 5px آخر کاملاً محو
        opacity = 0;
      } else if (leftDistance < fadeDistance) {
        // محو شدن تدریجی
        opacity = (leftDistance - edgeSize) / (fadeDistance - edgeSize);
      }

      // -------------------------------
      // سمت راست
      // -------------------------------

      if (rightDistance <= edgeSize) {
        // 5px آخر کاملاً محو
        opacity = 0;
      } else if (rightDistance < fadeDistance) {
        // محو شدن تدریجی
        const rightOpacity =
          (rightDistance - edgeSize) / (fadeDistance - edgeSize);

        opacity = Math.min(opacity, rightOpacity);
      }

      // اعمال شفافیت
      logo.style.opacity = Math.max(0, Math.min(1, opacity));
    });

    // اجرای دوباره
    requestAnimationFrame(moveLogos);
  }

  // شروع حرکت
  moveLogos();
}

/* =========================
   DESIGN ACCORDION
========================= */

const designItems = document.querySelectorAll(".design-item");

designItems.forEach((item) => {
  const button = item.querySelector(".accordion-btn");
  const text = item.querySelector(".design-text p");

  if (!button || !text) return;

  button.addEventListener("click", () => {
    const isOpen = item.classList.contains("active");

    // بستن همه
    designItems.forEach((otherItem) => {
      otherItem.classList.remove("active");

      const otherText = otherItem.querySelector(".design-text p");

      if (otherText) {
        otherText.classList.remove("show");
      }
    });

    if (!isOpen) {
      // باز کردن آیتم انتخاب شده
      item.classList.add("active");
      // دقیقاً مثل Header با کمی تأخیر ظاهر شود
      setTimeout(() => {
        text.classList.add("show");
      }, 120);
    } else {
    }
  });
});
/* =====================================================
   SCROLL REVEAL
   Initial elements stay hidden
   They appear ONLY when scrolling to them
===================================================== */

const animatedElements = document.querySelectorAll(`
  .value-card,
  .design-item,
  .sustainable-card,
  .about-more-content,
  .about-more-image,
  .eco-feature,
  .stat-card--tall,
  .testimonial-card,
  .testimonial-card__image,
  .explore__photo,
  .blog-post,
  .blog-post__image,
  .footer__top
`);

/* =====================================================
   INITIAL STATE
   عناصر پایین صفحه از اول مخفی باشند
===================================================== */

animatedElements.forEach((element) => {
  const rect = element.getBoundingClientRect();

  /*
    فقط عناصری که هنوز پایین صفحه هستند
    از ابتدا مخفی شوند.
  */

  if (rect.top > window.innerHeight) {
    element.style.opacity = "0";

    element.style.transform = "translateY(100px) scale(0.94)";

    element.style.filter = "blur(5px)";
  }
});

/* =====================================================
   OBSERVER
===================================================== */

if (animatedElements.length > 0) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const element = entry.target;

        /* =================================================
           فقط وقتی واقعاً به عنصر رسیدیم
        ================================================= */

        element.animate(
          [
            {
              opacity: 0.,
              transform: "translateY(100px) scale(0.94)",
              filter: "blur(1px)",
            },

            {
              opacity: 0.12,
              transform: "translateY(65px) scale(0.955)",
              filter: "blur(0.7px)",
            },

            {
              opacity: 0.55,
              transform: "translateY(30px) scale(0.98)",
              filter: "blur(0.3px)",
            },

            {
              opacity: 1,
              transform: "translateY(0) scale(1)",
              filter: "blur(0)",
            },
          ],
          {
            duration: 3500,
            easing: "cubic-bezier(0.16, 1, 0.3, 1)",
            fill: "both",
          },
        );

        /*
          بعد از اولین اجرا،
          دیگر روی این عنصر اجرا نشود.
        */

        observer.unobserve(element);
      });
    },

    {
      threshold: 0.15,

      /*
        کمی پایین‌تر از viewport
        تا انیمیشن طبیعی شروع شود.
      */

      rootMargin: "0px 0px -80px 0px",
    },
  );

  animatedElements.forEach((element) => {
    revealObserver.observe(element);
  });
}
/* =====================================================
   SMOOTH NUMBER COUNT UP
===================================================== */

const statNumbers = document.querySelectorAll(".stat-card__number");

if (statNumbers.length > 0) {
  const numberObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const element = entry.target;

        if (entry.isIntersecting) {
          const originalText =
            element.dataset.originalText || element.textContent.trim();

          element.dataset.originalText = originalText;

          const match = originalText.match(/[\d,.]+/);

          if (!match) return;

          const numberText = match[0];

          const targetNumber = parseFloat(numberText.replace(/,/g, ""));

          if (isNaN(targetNumber)) return;

          const startNumber = 0;

          const prefix = originalText.substring(
            0,
            originalText.indexOf(numberText),
          );

          const suffix = originalText.substring(
            originalText.indexOf(numberText) + numberText.length,
          );

          const startTime = performance.now();

          const duration = 2600;

          function animateNumber(currentTime) {
            const elapsed = currentTime - startTime;

            let progress = Math.min(elapsed / duration, 1);

            /* بسیار نرم */
            progress = 1 - Math.pow(1 - progress, 4);

            const currentNumber =
              startNumber + (targetNumber - startNumber) * progress;

            if (targetNumber % 1 === 0) {
              element.textContent =
                prefix + Math.floor(currentNumber).toLocaleString() + suffix;
            } else {
              element.textContent = prefix + currentNumber.toFixed(1) + suffix;
            }

            if (progress < 1) {
              requestAnimationFrame(animateNumber);
            } else {
              element.textContent =
                prefix +
                (targetNumber % 1 === 0
                  ? targetNumber.toLocaleString()
                  : targetNumber.toFixed(1)) +
                suffix;
            }
          }

          requestAnimationFrame(animateNumber);
        }
      });
    },
    {
      threshold: 0.45,
    },
  );

  statNumbers.forEach((number) => {
    numberObserver.observe(number);
  });
}
