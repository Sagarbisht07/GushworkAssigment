document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide Icons
  lucide.createIcons();

  // 1. Hero Gallery Functionality
  const mainImg = document.getElementById("heroMainImg");
  const thumbnails = document.querySelectorAll(".thumb");
  const prevBtn = document.querySelector(".main-image .prev");
  const nextBtn = document.querySelector(".main-image .next");
  let currentIndex = 0;

  const updateGallery = (index) => {
    thumbnails.forEach((t) => t.classList.remove("active"));
    thumbnails[index].classList.add("active");
    mainImg.src = thumbnails[index].dataset.full;
    currentIndex = index;
  };

  thumbnails.forEach((thumb, index) => {
    thumb.addEventListener("click", () => updateGallery(index));
  });

  prevBtn?.addEventListener("click", () => {
    let index = currentIndex === 0 ? thumbnails.length - 1 : currentIndex - 1;
    updateGallery(index);
  });

  nextBtn?.addEventListener("click", () => {
    let index = (currentIndex + 1) % thumbnails.length;
    updateGallery(index);
  });

  // 2. FAQ Accordion
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Close all others
      faqItems.forEach((i) => i.classList.remove("active"));

      if (!isActive) {
        item.classList.add("active");
      }
    });
  });

  // 3. Manufacturing Process Tabs
  const processTabs = document.querySelectorAll(".process-tab");
  const stepCounter = document.getElementById("stepNumber");
  const stepLabel = document.getElementById("stepLabel");
  const processKeyOrder = [
    "raw-material",
    "extrusion",
    "cooling",
    "sizing",
    "quality",
    "marking",
    "cutting",
    "packaging",
  ];

  const tabData = {
    "raw-material": {
      title: "High-Grade Raw Material Selection",
      desc: "We source only the finest PE100 grade HDPE granules to ensure maximum strength and durability of our piping systems.",
      img: "assists/man.png",
    },
    extrusion: {
      title: "Precision Extrusion Process",
      desc: "The molten material is forced through a die to create the pipe shape, with controlled temperature and pressure for wall thickness consistency.",
      img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800",
    },
    cooling: {
      title: "Controlled Cooling System",
      desc: "Vacuum tanks and spray cooling ensure the pipe maintains its shape and dimensions while cooling gradually to prevent stress.",
      img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800",
    },
    sizing: {
      title: "Dimensional Sizing & Calibration",
      desc: "Vacuum sizing tanks ensure precise outer diameter while internal pressure maintains perfect roundness and wall thickness uniformity.",
      img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800",
    },
    quality: {
      title: "Multi-Stage Quality Control",
      desc: "Continuous ultrasonic testing and manual inspections verify wall thickness, diameter, and surface finish throughout production.",
      img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800",
    },
    marking: {
      title: "Permanent Product Identification",
      desc: "Automated inkjet marking systems print essential product data, standards compliance, and batch numbers for full traceability.",
      img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800",
    },
    cutting: {
      title: "Precision Planetary Cutting",
      desc: "Dust-free planetary saws cut pipes to exact lengths with clean, chamfered edges ready for jointing.",
      img: "https://images.unsplash.com/photo-1581094281212-d5628bc707c0?auto=format&fit=crop&q=80&w=800",
    },
    packaging: {
      title: "Automated Coiling & Packaging",
      desc: "Finished pipes are automatically coiled or bundled and secured for safe transport and easy handling on-site.",
      img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800",
    },
  };

  const updateProcessStep = (key) => {
    const step = processKeyOrder.indexOf(key);
    if (step >= 0) {
      stepCounter.innerText = String(step + 1);
      stepLabel.innerText = tabData[key]?.title || "Raw Material";
      processTabs.forEach((t) => t.classList.remove("active"));
      const activeTab = document.querySelector(
        `.process-tab[data-tab="${key}"]`,
      );
      activeTab?.classList.add("active");
    }
  };

  const renderProcessContent = (key) => {
    const data = tabData[key] || tabData["raw-material"];
    const content = document.getElementById("tabContent");
    if (content) {
      content.innerHTML = `
                <div class="process-inner">
                    <div class="process-info">
                        <h3>${data.title}</h3>
                        <p>${data.desc}</p>
                        <ul class="process-list">
                            <li><span class="feature-check"></span> Quality Assurance</li>
                            <li><span class="feature-check"></span> Standard Compliance</li>
                        </ul>
                    </div>
                    <div class="process-visual">
                        <img src="${data.img}" alt="${data.title}">
                    </div>
                </div>
            `;
      lucide.createIcons(); // Re-initialize icons for new content
    }
  };

  processTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const key = tab.getAttribute("data-tab");
      if (!key) return;
      updateProcessStep(key);
      renderProcessContent(key);
    });
  });

  // Initialize to default first tab
  updateProcessStep("raw-material");
  renderProcessContent("raw-material");

  // 4. Smooth Scrolling for Nav Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  // 5. Industry Carousel Nav
  const industryGrid = document.querySelector(".carousel-full-width");
  const indPrev = document.querySelector(".carousel-nav .nav-btn:first-child");
  const indNext = document.querySelector(".carousel-nav .nav-btn:last-child");

  indNext?.addEventListener("click", () => {
    industryGrid.scrollBy({ left: 444, behavior: "smooth" });
  });

  indPrev?.addEventListener("click", () => {
    industryGrid.scrollBy({ left: -444, behavior: "smooth" });
  });

  // 6. Testimonials Carousel (Native slide with default to second)
  const testCarousel = document.getElementById("testimonialCarousel");

  // Default to second value for both carousels (with tiny timeout for layout calc)
  setTimeout(() => {
    if (industryGrid) industryGrid.scrollLeft = 444;
    if (testCarousel) testCarousel.scrollLeft = 444;
  }, 100);

  // 7. Download Brochure Modal
  const downloadBtn = document.getElementById("downloadSpecsBtn");
  const downloadModal = document.getElementById("downloadModal");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const modalForm = downloadModal?.querySelector(".modal-form");

  downloadBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    downloadModal.classList.add("active");
    document.body.style.overflow = "hidden";
    // Re-init lucide icons for the close X icon inside modal
    lucide.createIcons();
  });

  closeModalBtn?.addEventListener("click", () => {
    downloadModal.classList.remove("active");
    document.body.style.overflow = "";
  });

  // Close on backdrop click
  downloadModal?.addEventListener("click", (e) => {
    if (e.target === downloadModal) {
      downloadModal.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && downloadModal?.classList.contains("active")) {
      downloadModal.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // Form submit handler
  modalForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    downloadModal.classList.remove("active");
    document.body.style.overflow = "";
    alert("Thank you! The catalogue will be emailed to you shortly.");
    modalForm.reset();
  });

  // 8. Request Callback Modal
  const callbackModal = document.getElementById("callbackModal");
  const closeCallbackBtn = document.getElementById("closeCallbackBtn");
  const callbackForm = document.getElementById("callbackForm");
  const quoteBtns = document.querySelectorAll(".requestQuoteBtn");

  quoteBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      callbackModal.classList.add("active");
      document.body.style.overflow = "hidden";
      lucide.createIcons();
    });
  });

  closeCallbackBtn?.addEventListener("click", () => {
    callbackModal.classList.remove("active");
    document.body.style.overflow = "";
  });

  callbackModal?.addEventListener("click", (e) => {
    if (e.target === callbackModal) {
      callbackModal.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && callbackModal?.classList.contains("active")) {
      callbackModal.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  callbackForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    callbackModal.classList.remove("active");
    document.body.style.overflow = "";
    alert("Thank you! We will call you back shortly.");
    callbackForm.reset();
  });
  
});
