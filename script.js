// Smooth scroll navigation
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" })
      // Close mobile menu if open
      const navMenu = document.getElementById("navMenu")
      const navToggle = document.getElementById("navToggle")
      if (navMenu.classList.contains("active")) {
        navMenu.classList.remove("active")
        navToggle.classList.remove("active")
      }
    }
  })
})

// Mobile menu toggle
const navToggle = document.getElementById("navToggle")
const navMenu = document.getElementById("navMenu")

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active")
  navToggle.classList.toggle("active")
})

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (!e.target.closest(".navbar")) {
    navMenu.classList.remove("active")
    navToggle.classList.remove("active")
  }
})

// Navbar scroll effect
const navbar = document.getElementById("navbar")
let lastScrollTop = 0

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop

  if (scrollTop > 50) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }

  lastScrollTop = scrollTop
})

// Video modal functionality
const videoBtn = document.getElementById("videoBtn")
const videoModal = document.getElementById("videoModal")
const closeModal = document.getElementById("closeModal")

if (videoBtn) {
  videoBtn.addEventListener("click", () => {
    videoModal.classList.add("active")
    document.body.style.overflow = "hidden"
  })
}

if (closeModal) {
  closeModal.addEventListener("click", () => {
    videoModal.classList.remove("active")
    document.body.style.overflow = "auto"
  })
}

// Close modal when clicking outside
videoModal.addEventListener("click", (e) => {
  if (e.target === videoModal) {
    videoModal.classList.remove("active")
    document.body.style.overflow = "auto"
  }
})

// Membership plan toggle
const toggleBtns = document.querySelectorAll(".toggle-btn")
const monthlyPrices = document.querySelectorAll(".monthly-price")

toggleBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    toggleBtns.forEach((b) => b.classList.remove("active"))
    btn.classList.add("active")

    const plan = btn.dataset.plan

    if (plan === "yearly") {
      monthlyPrices.forEach((price) => {
        const monthlyPrice = Number.parseFloat(price.textContent)
        const yearlyPrice = (monthlyPrice * 12 * 0.8).toFixed(2)
        price.textContent = yearlyPrice
      })
    } else {
      monthlyPrices.forEach((price) => {
        const yearlyPrice = Number.parseFloat(price.textContent)
        const monthlyPrice = (yearlyPrice / (12 * 0.8)).toFixed(2)
        price.textContent = monthlyPrice
      })
    }
  })
})

// Newsletter form validation and submission
const newsletterForm = document.getElementById("newsletterForm")
const formMessage = document.getElementById("formMessage")

if (newsletterForm) {
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const email = newsletterForm.querySelector('input[type="email"]').value

    // Email validation
    if (!isValidEmail(email)) {
      showMessage(formMessage, "Please enter a valid email address", "error")
      return
    }

    // Simulate form submission
    showMessage(formMessage, "Subscribing...", "success")

    setTimeout(() => {
      showMessage(formMessage, "Thank you for subscribing! Check your email for confirmation.", "success")
      newsletterForm.reset()
    }, 1000)
  })
}

// Contact form validation and submission
const contactForm = document.getElementById("contactForm")
const contactMessage = document.getElementById("contactMessage")

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const formData = new FormData(contactForm)
    const name = contactForm.querySelector('input[type="text"]').value
    const email = contactForm.querySelector('input[type="email"]').value
    const message = contactForm.querySelector("textarea").value

    // Validation
    if (!name.trim() || !email.trim() || !message.trim()) {
      showMessage(contactMessage, "Please fill in all fields", "error")
      return
    }

    if (!isValidEmail(email)) {
      showMessage(contactMessage, "Please enter a valid email address", "error")
      return
    }

    // Simulate form submission
    showMessage(contactMessage, "Sending your message...", "success")

    setTimeout(() => {
      showMessage(contactMessage, "Message sent successfully! We'll get back to you soon.", "success")
      contactForm.reset()
    }, 1000)
  })
}

// Utility function for email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Utility function to show form messages
function showMessage(element, message, type) {
  element.textContent = message
  element.className = `form-message ${type}`

  if (type === "success") {
    setTimeout(() => {
      element.className = "form-message"
    }, 5000)
  }
}

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = "fadeInUp 0.6s ease forwards"
      observer.unobserve(entry.target)
    }
  })
}, observerOptions)

// Observe all cards and feature elements
document.querySelectorAll(".feature-card, .card, .testimonial-card").forEach((el) => {
  el.style.opacity = "0"
  observer.observe(el)
})

// Smooth number counter animation
function animateCounter(element, target, duration = 2000) {
  let current = 0
  const increment = target / (duration / 16)

  const timer = setInterval(() => {
    current += increment
    if (current >= target) {
      element.textContent = target
      clearInterval(timer)
    } else {
      element.textContent = Math.floor(current)
    }
  }, 16)
}

// Keyboard navigation support
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && videoModal.classList.contains("active")) {
    videoModal.classList.remove("active")
    document.body.style.overflow = "auto"
  }
})

// Add active state to nav links based on scroll position
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".nav-link")

  let current = ""
  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href").slice(1) === current) {
      link.classList.add("active")
    }
  })
})

// Performance optimization: Lazy load images
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src || img.src
        img.classList.add("loaded")
        observer.unobserve(img)
      }
    })
  })

  document.querySelectorAll("img[data-src]").forEach((img) => imageObserver.observe(img))
}

// Add ripple effect to buttons
document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span")
    const rect = this.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.style.width = ripple.style.height = size + "px"
    ripple.style.left = x + "px"
    ripple.style.top = y + "px"
    ripple.classList.add("ripple")

    this.appendChild(ripple)

    setTimeout(() => ripple.remove(), 600)
  })
})

// Add ripple styles dynamically
const style = document.createElement("style")
style.textContent = `
  button {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`
document.head.appendChild(style)

console.log("[v0] Fitness website enhanced with advanced JavaScript features")
