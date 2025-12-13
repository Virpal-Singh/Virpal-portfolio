import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import SplitType from "split-type";
import ApiService from "./services/api";
import Chatbot from "./components/Chatbot";
import {
  Code2,
  Rocket,
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  Database,
  Server,
  Layers,
  Terminal,
  Cpu,
  Globe,
  Menu,
  X,
  Zap,
  Sparkles,
  Star,
  TrendingUp,
  Download,
} from "lucide-react";
import medisureImg from "./assets/medisure.png";
import saathsourceImg from "./assets/saathsource.png";
import vivaportalImg from "./assets/vivaportal.png";
import virpalLogo from "./assets/virpal.png";
import resumePDF from "./assets/Virpal_res.pdf";
import "./App.css";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const heroRef = useRef(null);

  useEffect(() => {
    // Wait for DOM to be ready
    const initAnimations = () => {
      // Disabled cursor and particle animations for performance

      // Hero title animation with split text
      const heroTitle = document.querySelector(".hero-title");
      if (heroTitle) {
        const split = new SplitType(heroTitle, { types: "chars" });
        gsap.set(split.chars, { opacity: 1, y: 0, rotateX: 0 });
        gsap.fromTo(
          split.chars,
          { opacity: 0, y: 100, rotateX: -90 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            stagger: 0.05,
            duration: 1,
            ease: "back.out(1.7)",
            delay: 0.5,
          }
        );
      }

      // About text animation - Word by word scroll effect (sequential paragraphs)
      const aboutTextContainer = document.querySelector(".about-text");
      const aboutTexts = gsap.utils.toArray(".about-text p");

      if (aboutTexts.length > 0) {
        // Split all paragraphs into words
        aboutTexts.forEach((paragraph) => {
          const text = paragraph.textContent;
          const words = text.split(" ");
          paragraph.innerHTML = words
            .map((word) => `<span class="word">${word}</span>`)
            .join(" ");
        });

        // Get all words from all paragraphs
        const allWords = gsap.utils.toArray(".about-text .word");

        // Set initial state - readable but not bright
        gsap.set(allWords, {
          opacity: 0.6,
          color: "#94a3b8",
        });

        // Create ONE scroll trigger for the entire about-text container
        // Balanced animation - text brightens at good pace as section appears
        ScrollTrigger.create({
          trigger: aboutTextContainer,
          start: "top 65%",
          end: "top 25%",
          scrub: 0.4,
          onUpdate: (self) => {
            const progress = self.progress;

            allWords.forEach((word, i) => {
              // Calculate individual word progress across ALL paragraphs
              const wordStart = i / allWords.length;
              const wordEnd = (i + 1) / allWords.length;
              const wordProgress =
                (progress - wordStart) / (wordEnd - wordStart);
              const clampedProgress = Math.max(0, Math.min(1, wordProgress));

              // Faster color transition
              let color;
              let opacity;

              if (clampedProgress < 0.3) {
                // Dull but readable
                color = "#94a3b8";
                opacity = 0.6;
              } else if (clampedProgress < 0.6) {
                // Getting brighter
                color = "#cbd5e1";
                opacity = 0.85;
              } else {
                // Fully bright
                color = "#ffffff";
                opacity = 1;
              }

              // Direct set for better performance
              word.style.color = color;
              word.style.opacity = opacity;
            });
          },
        });
      }

      // Skills marquee wrapper fade-in animation
      const skillsMarqueeWrapper = document.querySelector(".skills-marquee-wrapper");
      if (skillsMarqueeWrapper) {
        gsap.set(skillsMarqueeWrapper, { opacity: 1, x: 0 });
        gsap.fromTo(
          skillsMarqueeWrapper,
          { opacity: 0, x: -50 },
          {
            scrollTrigger: {
              trigger: skillsMarqueeWrapper,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
          }
        );
      }

      // Skills description fade-in animation
      const skillsDescription = document.querySelector(".skills-description");
      if (skillsDescription) {
        gsap.set(skillsDescription, { opacity: 1, x: 0 });
        gsap.fromTo(
          skillsDescription,
          { opacity: 0, x: 50 },
          {
            scrollTrigger: {
              trigger: skillsDescription,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            delay: 0.2,
          }
        );
      }

      // Skills text word-by-word animation
      const skillsParagraphs = document.querySelectorAll(".skills-paragraph");
      if (skillsParagraphs.length > 0) {
        skillsParagraphs.forEach((para) => {
          const text = para.textContent;
          const words = text.split(" ");
          para.innerHTML = words
            .map((word) => `<span class="word">${word}</span>`)
            .join(" ");
        });

        const allSkillsWords = document.querySelectorAll(".skills-paragraph .word");
        
        gsap.to(allSkillsWords, {
          scrollTrigger: {
            trigger: ".skills-description",
            start: "top 80%",
            end: "bottom 60%",
            scrub: 1,
            onUpdate: (self) => {
              const progress = self.progress;
              allSkillsWords.forEach((word, i) => {
                const wordStart = i / allSkillsWords.length;
                const wordEnd = (i + 1) / allSkillsWords.length;
                const wordProgress = (progress - wordStart) / (wordEnd - wordStart);
                const clampedProgress = Math.max(0, Math.min(1, wordProgress));

                let color, opacity;
                if (clampedProgress < 0.3) {
                  color = "#94a3b8";
                  opacity = 0.6;
                } else if (clampedProgress < 0.6) {
                  color = "#cbd5e1";
                  opacity = 0.85;
                } else {
                  color = "#ffffff";
                  opacity = 1;
                }

                word.style.color = color;
                word.style.opacity = opacity;
              });
            },
          },
        });
      }

      // Section descriptions animation
      const sectionDescs = gsap.utils.toArray(".section-description");
      if (sectionDescs.length > 0) {
        gsap.set(sectionDescs, { opacity: 1, y: 0 });
        sectionDescs.forEach((desc) => {
          gsap.fromTo(
            desc,
            { opacity: 0, y: 20 },
            {
              scrollTrigger: {
                trigger: desc,
                start: "top 90%",
                toggleActions: "play none none none",
              },
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
            }
          );
        });
      }

      // Optimized floating particles - use CSS animations instead of GSAP for better performance
      // Removed GSAP particle animation - now handled by CSS

      // Navbar animation on scroll
      ScrollTrigger.create({
        start: "top -80",
        end: 99999,
        toggleClass: { className: "navbar-scrolled", targets: ".navbar" },
      });

      // About Section Stacking Card Effect
      const aboutSection = document.querySelector('#about');
      if (aboutSection) {
        gsap.fromTo(aboutSection,
          {
            y: 150,
            scale: 0.9,
            borderRadius: '60px 60px 0 0'
          },
          {
            scrollTrigger: {
              trigger: aboutSection,
              start: 'top bottom',
              end: 'top top',
              scrub: 1.5,
              invalidateOnRefresh: true
            },
            y: 0,
            scale: 1,
            ease: 'none'
          }
        );
      }

      // Projects Section Stacking Card Effect
      const projectsSection = document.querySelector('#projects');
      if (projectsSection) {
        gsap.fromTo(projectsSection,
          {
            y: 150,
            scale: 0.9,
            borderRadius: '60px 60px 0 0'
          },
          {
            scrollTrigger: {
              trigger: projectsSection,
              start: 'top bottom',
              end: 'top top',
              scrub: 1.5,
              invalidateOnRefresh: true
            },
            y: 0,
            scale: 1,
            ease: 'none'
          }
        );
      }

      // Section animations - Load earlier
      gsap.utils.toArray(".section").forEach((section) => {
        const sectionTags = section.querySelectorAll(".section-tag");
        if (sectionTags.length > 0) {
          gsap.set(sectionTags, { opacity: 1, scale: 1 });
          gsap.fromTo(
            sectionTags,
            { opacity: 0, scale: 0 },
            {
              scrollTrigger: {
                trigger: section,
                start: "top 88%",
                toggleActions: "play none none none",
              },
              opacity: 1,
              scale: 1,
              duration: 0.5,
              ease: "back.out(1.7)",
            }
          );
        }

        const sectionTitle = section.querySelector(".section-title");
        if (sectionTitle) {
          // Optimized: Simple fade-in instead of char-by-char for better performance
          gsap.set(sectionTitle, { opacity: 1, y: 0 });
          gsap.fromTo(
            sectionTitle,
            { opacity: 0, y: 30 },
            {
              scrollTrigger: {
                trigger: section,
                start: "top 88%",
                toggleActions: "play none none none",
              },
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
            }
          );
        }
      });

      // Skill cards stagger animation
      const skillCards = gsap.utils.toArray(".skill-card");
      if (skillCards.length > 0) {
        gsap.set(skillCards, { opacity: 1, scale: 1, rotation: 0 });
        gsap.fromTo(
          skillCards,
          { opacity: 0, scale: 0, rotation: 180 },
          {
            scrollTrigger: {
              trigger: ".skills-grid",
              start: "top 70%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            scale: 1,
            rotation: 0,
            stagger: {
              amount: 0.8,
              from: "random",
            },
            duration: 0.6,
            ease: "back.out(1.7)",
          }
        );

        // Animate skill card content
        skillCards.forEach((card, i) => {
          const icon = card.querySelector(".skill-icon");
          const name = card.querySelector(".skill-name");

          if (icon) {
            gsap.set(icon, { opacity: 1, scale: 1 });
            gsap.fromTo(
              icon,
              { opacity: 0, scale: 0 },
              {
                scrollTrigger: {
                  trigger: ".skills-grid",
                  start: "top 70%",
                  toggleActions: "play none none none",
                },
                opacity: 1,
                scale: 1,
                duration: 0.4,
                delay: (i * 0.8) / skillCards.length + 0.2,
                ease: "back.out(2)",
              }
            );
          }

          if (name) {
            gsap.set(name, { opacity: 1, y: 0 });
            gsap.fromTo(
              name,
              { opacity: 0, y: 10 },
              {
                scrollTrigger: {
                  trigger: ".skills-grid",
                  start: "top 70%",
                  toggleActions: "play none none none",
                },
                opacity: 1,
                y: 0,
                duration: 0.4,
                delay: (i * 0.8) / skillCards.length + 0.3,
                ease: "power2.out",
              }
            );
          }
        });
      }

      // Project cards with 3D effect
      gsap.utils.toArray(".project-card").forEach((card, i) => {
        // Set initial state for card
        gsap.set(card, { opacity: 1, y: 0, rotateY: 0 });

        // Animate the entire card
        gsap.fromTo(
          card,
          { opacity: 0, y: 100, rotateY: i % 2 === 0 ? -45 : 45 },
          {
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            y: 0,
            rotateY: 0,
            duration: 1,
            ease: "power3.out",
          }
        );

        // Animate project content elements
        const projectTitle = card.querySelector(".project-title");
        const projectDesc = card.querySelector(".project-description");
        const projectTech = card.querySelector(".project-tech");
        const projectLinks = card.querySelector(".project-links");

        if (projectTitle) {
          gsap.set(projectTitle, { opacity: 1, x: 0 });
          gsap.fromTo(
            projectTitle,
            { opacity: 0, x: -30 },
            {
              scrollTrigger: {
                trigger: card,
                start: "top 75%",
                toggleActions: "play none none none",
              },
              opacity: 1,
              x: 0,
              duration: 0.6,
              delay: 0.3,
              ease: "power2.out",
            }
          );
        }

        if (projectDesc) {
          gsap.set(projectDesc, { opacity: 1, y: 0 });
          gsap.fromTo(
            projectDesc,
            { opacity: 0, y: 20 },
            {
              scrollTrigger: {
                trigger: card,
                start: "top 75%",
                toggleActions: "play none none none",
              },
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: 0.4,
              ease: "power2.out",
            }
          );
        }

        if (projectTech) {
          const techTags = projectTech.querySelectorAll(".tech-tag");
          gsap.set(techTags, { opacity: 1, scale: 1 });
          gsap.fromTo(
            techTags,
            { opacity: 0, scale: 0 },
            {
              scrollTrigger: {
                trigger: card,
                start: "top 75%",
                toggleActions: "play none none none",
              },
              opacity: 1,
              scale: 1,
              stagger: 0.05,
              duration: 0.4,
              delay: 0.5,
              ease: "back.out(1.7)",
            }
          );
        }

        if (projectLinks) {
          const links = projectLinks.querySelectorAll(".project-link");
          gsap.set(links, { opacity: 1, y: 0 });
          gsap.fromTo(
            links,
            { opacity: 0, y: 20 },
            {
              scrollTrigger: {
                trigger: card,
                start: "top 75%",
                toggleActions: "play none none none",
              },
              opacity: 1,
              y: 0,
              stagger: 0.1,
              duration: 0.4,
              delay: 0.6,
              ease: "power2.out",
            }
          );
        }
      });

      // Timeline animation
      gsap.utils.toArray(".timeline-item").forEach((item, i) => {
        const isEven = i % 2 === 0;
        const content = item.querySelector(".timeline-content");
        const dot = item.querySelector(".timeline-dot");

        if (content) {
          gsap.set(content, { opacity: 1, x: 0, rotation: 0 });
          gsap.fromTo(
            content,
            { opacity: 0, x: isEven ? 100 : -100, rotation: isEven ? 10 : -10 },
            {
              scrollTrigger: {
                trigger: item,
                start: "top 80%",
                toggleActions: "play none none none",
              },
              opacity: 1,
              x: 0,
              rotation: 0,
              duration: 1,
              ease: "power3.out",
            }
          );

          // Animate timeline content elements
          const date = content.querySelector(".timeline-date");
          const title = content.querySelector(".timeline-title");
          const company = content.querySelector(".timeline-company");
          const description = content.querySelector(".timeline-description");

          if (date) {
            gsap.set(date, { opacity: 1, y: 0 });
            gsap.fromTo(
              date,
              { opacity: 0, y: 20 },
              {
                scrollTrigger: {
                  trigger: item,
                  start: "top 75%",
                  toggleActions: "play none none none",
                },
                opacity: 1,
                y: 0,
                duration: 0.5,
                delay: 0.3,
                ease: "power2.out",
              }
            );
          }

          if (title) {
            gsap.set(title, { opacity: 1, x: 0 });
            gsap.fromTo(
              title,
              { opacity: 0, x: isEven ? 30 : -30 },
              {
                scrollTrigger: {
                  trigger: item,
                  start: "top 75%",
                  toggleActions: "play none none none",
                },
                opacity: 1,
                x: 0,
                duration: 0.6,
                delay: 0.4,
                ease: "power2.out",
              }
            );
          }

          if (company) {
            gsap.set(company, { opacity: 1, y: 0 });
            gsap.fromTo(
              company,
              { opacity: 0, y: 10 },
              {
                scrollTrigger: {
                  trigger: item,
                  start: "top 75%",
                  toggleActions: "play none none none",
                },
                opacity: 1,
                y: 0,
                duration: 0.5,
                delay: 0.5,
                ease: "power2.out",
              }
            );
          }

          if (description) {
            gsap.set(description, { opacity: 1, y: 0 });
            gsap.fromTo(
              description,
              { opacity: 0, y: 15 },
              {
                scrollTrigger: {
                  trigger: item,
                  start: "top 75%",
                  toggleActions: "play none none none",
                },
                opacity: 1,
                y: 0,
                duration: 0.6,
                delay: 0.6,
                ease: "power2.out",
              }
            );
          }
        }

        if (dot) {
          gsap.set(dot, { scale: 1, rotation: 0 });
          gsap.fromTo(
            dot,
            { scale: 0, rotation: 360 },
            {
              scrollTrigger: {
                trigger: item,
                start: "top 80%",
                toggleActions: "play none none none",
              },
              scale: 1,
              rotation: 0,
              duration: 0.6,
              ease: "back.out(2)",
            }
          );
        }
      });

      // Stats counter animation - Load earlier
      gsap.utils.toArray(".stat-card").forEach((card, i) => {
        gsap.set(card, { opacity: 1, y: 0, scale: 1 });
        gsap.fromTo(
          card,
          { opacity: 0, y: 50, scale: 0.8 },
          {
            scrollTrigger: {
              trigger: "#about",
              start: "top 78%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            delay: i * 0.08,
            ease: "back.out(1.7)",
          }
        );

        // Animate stat number and label
        const statNumber = card.querySelector(".stat-number");
        const statLabel = card.querySelector(".stat-label");

        if (statNumber) {
          gsap.set(statNumber, { opacity: 1, scale: 1 });
          gsap.fromTo(
            statNumber,
            { opacity: 0, scale: 0 },
            {
              scrollTrigger: {
                trigger: "#about",
                start: "top 70%",
                toggleActions: "play none none none",
              },
              opacity: 1,
              scale: 1,
              duration: 0.5,
              delay: i * 0.08 + 0.2,
              ease: "back.out(2)",
            }
          );
        }

        if (statLabel) {
          gsap.set(statLabel, { opacity: 1, y: 0 });
          gsap.fromTo(
            statLabel,
            { opacity: 0, y: 10 },
            {
              scrollTrigger: {
                trigger: "#about",
                start: "top 70%",
                toggleActions: "play none none none",
              },
              opacity: 1,
              y: 0,
              duration: 0.4,
              delay: i * 0.08 + 0.35,
              ease: "power2.out",
            }
          );
        }
      });

      // Form inputs animation
      const formGroups = gsap.utils.toArray(".form-group");
      if (formGroups.length > 0) {
        gsap.set(formGroups, { opacity: 1, x: 0 });
        formGroups.forEach((group, i) => {
          gsap.fromTo(
            group,
            { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
            {
              scrollTrigger: {
                trigger: ".contact-form",
                start: "top 70%",
                toggleActions: "play none none none",
              },
              opacity: 1,
              x: 0,
              duration: 0.8,
              delay: i * 0.1,
              ease: "power2.out",
            }
          );
        });
      }

      // Social links animation
      const socialLinks = gsap.utils.toArray(".social-link");
      if (socialLinks.length > 0) {
        gsap.set(socialLinks, { opacity: 1, y: 0, rotation: 0 });
        gsap.fromTo(
          socialLinks,
          { opacity: 0, y: 50, rotation: 360 },
          {
            scrollTrigger: {
              trigger: ".social-links",
              start: "top 80%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            y: 0,
            rotation: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "back.out(1.7)",
          }
        );
      }

      // Magnetic button effect
      const buttons = document.querySelectorAll(
        ".btn, .project-link, .social-link"
      );
      buttons.forEach((button) => {
        button.addEventListener("mouseenter", () => {
          gsap.to(button, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out",
          });
        });
        button.addEventListener("mouseleave", () => {
          gsap.to(button, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });

      // Parallax background effect
      gsap.to(".hero", {
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        backgroundPosition: "50% 100%",
        ease: "none",
      });

      return () => {
        window.removeEventListener("moveCursor", moveCursor);
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(initAnimations, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Cursor handlers - disabled for performance
  const handleMouseEnter = () => {};
  const handleMouseLeave = () => {};

  // Form submission handler
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const formData = new FormData(e.target);
    const messageData = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message')
    };

    try {
      const response = await ApiService.sendMessage(messageData);
      
      if (response.success) {
        setShowSuccessModal(true);
        e.target.reset();
        setTimeout(() => setShowSuccessModal(false), 4000);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError(error.message || 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const skills = [
    {
      name: "React.js",
      color: "#61DAFB",
      logo: (
        <svg viewBox="0 0 128 128" width="48" height="48">
          <g fill="#61DAFB">
            <circle cx="64" cy="64" r="11.4" />
            <path d="M107.3 45.2c-2.2-.8-4.5-1.6-6.9-2.3.6-2.4 1.1-4.8 1.5-7.1 2.1-13.2-.2-22.5-6.6-26.1-1.9-1.1-4-1.6-6.4-1.6-7 0-15.9 5.2-24.9 13.9-9-8.7-17.9-13.9-24.9-13.9-2.4 0-4.5.5-6.4 1.6-6.4 3.7-8.7 13-6.6 26.1.4 2.3.9 4.7 1.5 7.1-2.4.7-4.7 1.4-6.9 2.3C8.2 50 1.4 56.6 1.4 64s6.9 14 19.3 18.8c2.2.8 4.5 1.6 6.9 2.3-.6 2.4-1.1 4.8-1.5 7.1-2.1 13.2.2 22.5 6.6 26.1 1.9 1.1 4 1.6 6.4 1.6 7.1 0 16-5.2 24.9-13.9 9 8.7 17.9 13.9 24.9 13.9 2.4 0 4.5-.5 6.4-1.6 6.4-3.7 8.7-13 6.6-26.1-.4-2.3-.9-4.7-1.5-7.1 2.4-.7 4.7-1.4 6.9-2.3 12.5-4.8 19.3-11.4 19.3-18.8s-6.8-14-19.3-18.8zM92.5 14.7c4.1 2.4 5.5 9.8 3.8 20.3-.3 2.1-.8 4.3-1.4 6.6-5.2-1.2-10.7-2-16.5-2.5-3.4-4.8-6.9-9.1-10.4-13 7.4-7.3 14.9-12.3 21-12.3 1.3 0 2.5.3 3.5.9zM81.3 74c-1.8 3.2-3.9 6.4-6.1 9.6-3.7.3-7.4.4-11.2.4-3.9 0-7.6-.1-11.2-.4-2.2-3.2-4.2-6.4-6-9.6-1.9-3.3-3.7-6.7-5.3-10 1.6-3.3 3.4-6.7 5.3-10 1.8-3.2 3.9-6.4 6.1-9.6 3.7-.3 7.4-.4 11.2-.4 3.9 0 7.6.1 11.2.4 2.2 3.2 4.2 6.4 6 9.6 1.9 3.3 3.7 6.7 5.3 10-1.7 3.3-3.4 6.6-5.3 10zm8.3-3.3c1.5 3.5 2.7 6.9 3.8 10.3-3.4.8-7 1.4-10.8 1.9 1.2-1.9 2.5-3.9 3.6-6 1.2-2.1 2.3-4.2 3.4-6.2zM64 97.8c-2.4-2.6-4.7-5.4-6.9-8.3 2.3.1 4.6.2 6.9.2 2.3 0 4.6-.1 6.9-.2-2.2 2.9-4.5 5.7-6.9 8.3zm-18.6-15c-3.8-.5-7.4-1.1-10.8-1.9 1.1-3.3 2.3-6.8 3.8-10.3 1.1 2 2.2 4.1 3.4 6.1 1.2 2.2 2.4 4.1 3.6 6.1zm-7-25.5c-1.5-3.5-2.7-6.9-3.8-10.3 3.4-.8 7-1.4 10.8-1.9-1.2 1.9-2.5 3.9-3.6 6-1.2 2.1-2.3 4.2-3.4 6.2zM64 30.2c2.4 2.6 4.7 5.4 6.9 8.3-2.3-.1-4.6-.2-6.9-.2-2.3 0-4.6.1-6.9.2 2.2-2.9 4.5-5.7 6.9-8.3zm22.2 21.1c-1.2-2-2.3-4.1-3.4-6.2-1.2-2.1-2.4-4.1-3.6-6-1.2 1.9-2.5 3.9-3.6 6-1.2 2.1-2.3 4.2-3.4 6.2-3.7-.3-7.4-.4-11.2-.4-3.9 0-7.6.1-11.2.4-1.1-2-2.2-4.1-3.4-6.2-1.2-2.1-2.4-4.1-3.6-6 3.8.5 7.4 1.1 10.8 1.9-1.1 3.3-2.3 6.8-3.8 10.3-1.1-2-2.2-4.1-3.4-6.1-1.2-2.2-2.4-4.1-3.6-6.1 3.8-.5 7.4-1.1 10.8-1.9-1.1-3.3-2.3-6.8-3.8-10.3 1.1 2 2.2 4.1 3.4 6.1 1.2 2.2 2.4 4.1 3.6 6.1-3.8.5-7.4 1.1-10.8 1.9 1.1 3.3 2.3 6.8 3.8 10.3 1.1-2 2.2-4.1 3.4-6.1 1.2-2.2 2.4-4.1 3.6-6.1z" />
          </g>
        </svg>
      ),
    },
    {
      name: "Node.js",
      color: "#339933",
      logo: (
        <svg viewBox="0 0 128 128" width="48" height="48">
          <path
            fill="#83CD29"
            d="M112.771 30.334L68.674 4.729c-2.781-1.584-6.402-1.584-9.205 0L14.901 30.334C12.031 31.985 10 35.088 10 38.407v51.142c0 3.319 2.084 6.423 4.954 8.083l11.775 6.688c5.628 2.772 7.617 2.772 10.178 2.772 8.333 0 13.093-5.039 13.093-13.828v-50.49c0-.713-.371-1.774-1.071-1.774h-5.623C42.594 41 41 42.061 41 42.773v50.49c0 3.896-3.524 7.773-10.11 4.48L18.723 90.73c-.424-.23-.723-.693-.723-1.181V38.407c0-.482.555-.966.982-1.213l44.424-25.561c.415-.235 1.025-.235 1.439 0l43.882 25.555c.42.253.272.722.272 1.219v51.142c0 .488.183.963-.232 1.198l-44.086 25.576c-.378.227-.847.227-1.261 0l-11.307-6.749c-.341-.198-.746-.269-1.073-.086-3.146 1.783-3.726 2.02-6.677 3.043-.726.253-1.797.692.41 1.929l14.798 8.754a9.294 9.294 0 004.647 1.246c1.642 0 3.25-.426 4.667-1.246l43.885-25.582c2.87-1.672 4.23-4.764 4.23-8.083V38.407c0-3.319-1.36-6.414-4.229-8.073zM77.91 81.445c-11.726 0-14.309-3.235-15.17-9.066-.1-.628-.633-1.379-1.272-1.379h-5.731c-.709 0-1.279.86-1.279 1.566 0 7.466 4.059 16.512 23.453 16.512 14.039 0 22.088-5.455 22.088-15.109 0-9.572-6.467-12.084-20.082-13.886-13.762-1.819-15.16-2.738-15.16-5.962 0-2.658 1.184-6.203 11.374-6.203 9.105 0 12.461 1.954 13.842 8.091.118.577.645.991 1.24.991h5.754c.354 0 .692-.143.94-.396.24-.272.367-.613.335-.979-.891-10.568-7.912-15.493-22.112-15.493-12.631 0-20.166 5.334-20.166 14.275 0 9.698 7.497 12.378 19.622 13.577 14.505 1.422 15.633 3.542 15.633 6.395 0 4.955-3.978 7.066-13.309 7.066z"
          />
        </svg>
      ),
    },
    {
      name: "Express.js",
      color: "#ffffff",
      logo: (
        <svg viewBox="0 0 128 128" width="48" height="48">
          <path
            fill="#ffffff"
            d="M126.67 98.44c-4.56 1.16-7.38.05-9.91-3.75-5.68-8.51-11.95-16.63-18-24.9-.78-1.07-1.59-2.12-2.6-3.45C89 76 81.85 85.2 75.14 94.77c-2.4 3.42-4.92 4.91-9.4 3.7l26.92-36.13L67.6 29.71c4.31-.84 7.29-.41 9.93 3.45 5.83 8.52 12.26 16.63 18.67 25.21 6.45-8.55 12.8-16.67 18.8-25.11 2.41-3.42 5-4.72 9.33-3.46-3.28 4.35-6.49 8.63-9.72 12.88-4.36 5.73-8.64 11.53-13.16 17.14-1.61 2-1.35 3.3.09 5.19C109.9 76 118.16 87.1 126.67 98.44zM1.33 61.74c.72-3.61 1.2-7.29 2.2-10.83 6-21.43 30.6-30.34 47.5-17.06C60.93 41.64 63.39 52.62 62.9 65H7.1c-.84 22.21 15.15 35.62 35.53 28.78 7.15-2.4 11.36-8 13.47-15 1.07-3.51 2.84-4.06 6.14-3.06-1.69 8.76-5.52 16.08-13.52 20.66-12 6.86-29.13 4.64-38.14-4.89C5.26 85.89 3 78.92 2 71.39c-.15-1.2-.46-2.38-.7-3.57q.03-3.04.03-6.08zm5.87-1.49h50.43c-.33-16.06-10.33-27.47-24-27.57-15-.12-25.78 11.02-26.43 27.57z"
          />
        </svg>
      ),
    },
    {
      name: "MongoDB",
      color: "#47A248",
      logo: (
        <svg viewBox="0 0 128 128" width="48" height="48">
          <path
            fill="#47A248"
            d="M88.038 42.812c1.605 4.643 2.761 9.383 3.141 14.296.472 6.095.256 12.147-1.029 18.142-.035.165-.109.32-.164.48-.403.001-.814-.049-1.208.012-3.329.523-6.655 1.065-9.981 1.604-3.438.557-6.881 1.092-10.313 1.687-1.216.21-2.721-.041-3.212 1.641-.014.046-.154.054-.235.08l.166-10.051c-.057-8.084-.113-16.168-.169-24.252l1.602-.275c2.62-.429 5.24-.864 7.862-1.281 3.129-.497 6.261-.98 9.392-1.465 1.381-.215 2.764-.412 4.148-.618z"
          />
          <path
            fill="#47A248"
            d="M62.184 42.812c1.605 4.643 2.761 9.383 3.141 14.296.472 6.095.256 12.147-1.029 18.142-.035.165-.109.32-.164.48-.403.001-.814-.049-1.208.012-3.329.523-6.655 1.065-9.981 1.604-3.438.557-6.881 1.092-10.313 1.687-1.216.21-2.721-.041-3.212 1.641-.014.046-.154.054-.235.08l.166-10.051c-.057-8.084-.113-16.168-.169-24.252l1.602-.275c2.62-.429 5.24-.864 7.862-1.281 3.129-.497 6.261-.98 9.392-1.465 1.381-.215 2.764-.412 4.148-.618z"
          />
          <path
            fill="#47A248"
            d="M65.032 80.783c-.156 8.477-.313 16.954-.469 25.431-1.432-.02-2.869.168-4.293-.08-3.644-.635-7.281-1.314-10.917-1.993-.474-.088-.96-.16-1.43-.271-.854-.201-1.359-.719-1.357-1.608.012-5.989.02-11.977.031-17.966l18.435 3.487z"
          />
        </svg>
      ),
    },
    {
      name: "JavaScript",
      color: "#F7DF1E",
      logo: (
        <svg viewBox="0 0 128 128" width="48" height="48">
          <path
            fill="#F7DF1E"
            d="M2 1v125h125V1H2zm66.119 106.513c-1.845 3.749-5.367 6.212-9.448 7.401-6.271 1.44-12.269.619-16.731-2.059-2.986-1.832-5.318-4.652-6.901-7.901l9.52-5.83c.083.035.333.487.667 1.071 1.214 2.034 2.261 3.474 4.319 4.485 2.022.69 6.461 1.131 8.175-2.427 1.047-1.81.714-7.628.714-14.065C58.433 78.073 58.48 68 58.48 58h11.709c0 11 .06 21.418 0 32.152.025 6.58.596 12.446-2.07 17.361zm48.574-3.308c-4.07 13.922-26.762 14.374-35.83 5.176-1.916-2.165-3.117-3.296-4.26-5.795 4.819-2.772 4.819-2.772 9.508-5.485 2.547 3.915 4.902 6.068 9.139 6.949 5.748.702 11.531-1.273 10.234-7.378-1.333-4.986-11.77-6.199-18.873-10.531-7.211-4.843-8.901-16.611-2.975-23.335 1.975-2.487 5.343-4.343 8.877-5.235l3.688-.477c7.081-.143 11.507 1.727 14.756 5.355.904.916 1.642 1.904 3.022 4.045-3.772 2.404-3.76 2.381-9.163 5.879-1.154-2.486-3.069-4.046-5.093-4.724-3.142-.952-7.104.083-7.926 3.403-.285 1.023-.226 1.975.227 3.665 1.273 2.903 5.545 4.165 9.377 5.926 11.031 4.474 14.756 9.271 15.672 14.981.882 4.916-.213 8.105-.38 8.581z"
          />
        </svg>
      ),
    },
    {
      name: "Python",
      color: "#3776AB",
      logo: (
        <svg viewBox="0 0 128 128" width="48" height="48">
          <linearGradient
            id="python-a"
            gradientUnits="userSpaceOnUse"
            x1="70.252"
            y1="1237.476"
            x2="170.659"
            y2="1151.089"
            gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)"
          >
            <stop offset="0" stopColor="#5A9FD4" />
            <stop offset="1" stopColor="#306998" />
          </linearGradient>
          <linearGradient
            id="python-b"
            gradientUnits="userSpaceOnUse"
            x1="209.474"
            y1="1098.811"
            x2="173.62"
            y2="1149.537"
            gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)"
          >
            <stop offset="0" stopColor="#FFD43B" />
            <stop offset="1" stopColor="#FFE873" />
          </linearGradient>
          <path
            fill="url(#python-a)"
            d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137H29.977c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311 5.947 12.519 13.124 12.519h8.491V67.234c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548V15.833c0-6.693-5.646-11.72-12.346-12.837-4.244-.706-8.645-1.027-12.866-1.008zM50.037 9.557c2.55 0 4.634 2.117 4.634 4.721 0 2.593-2.083 4.69-4.634 4.69-2.56 0-4.633-2.097-4.633-4.69-.001-2.604 2.073-4.721 4.633-4.721z"
            transform="translate(0 10.26)"
          />
          <path
            fill="url(#python-b)"
            d="M91.682 28.38v10.966c0 8.5-7.208 15.655-15.426 15.655H51.591c-6.756 0-12.346 5.783-12.346 12.549v23.515c0 6.691 5.818 10.628 12.346 12.547 7.816 2.297 15.312 2.713 24.665 0 6.216-1.801 12.346-5.423 12.346-12.547v-9.412H63.938v-3.138h37.012c7.176 0 9.852-5.005 12.348-12.519 2.578-7.735 2.467-15.174 0-25.096-1.774-7.145-5.161-12.521-12.348-12.521h-9.268zM77.809 87.927c2.561 0 4.634 2.097 4.634 4.692 0 2.602-2.074 4.719-4.634 4.719-2.55 0-4.633-2.117-4.633-4.719 0-2.595 2.083-4.692 4.633-4.692z"
            transform="translate(0 10.26)"
          />
          <radialGradient
            id="python-c"
            cx="1825.678"
            cy="444.45"
            r="26.743"
            gradientTransform="matrix(0 -.24 -1.055 0 532.979 557.576)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#B8B8B8" stopOpacity=".498" />
            <stop offset="1" stopColor="#7F7F7F" stopOpacity="0" />
          </radialGradient>
          <path
            opacity=".444"
            fill="url(#python-c)"
            d="M97.309 119.597c0 3.543-14.816 6.416-33.091 6.416-18.276 0-33.092-2.873-33.092-6.416 0-3.544 14.815-6.417 33.092-6.417 18.275 0 33.091 2.872 33.091 6.417z"
          />
        </svg>
      ),
    },
    {
      name: "REST APIs",
      color: "#FF6C37",
      logo: (
        <svg viewBox="0 0 128 128" width="48" height="48">
          <path
            fill="#FF6C37"
            d="M116.5 32.3c-.6-1.1-1.4-2.1-2.3-2.6L66.1 1.9c-.8-.5-1.9-.7-3.1-.7-1.2 0-2.3.3-3.1.7L11.4 29.7c-1.7 1-3.4 3.5-3.4 5.4v55.7c0 1.2.5 2.6 1 3.6.6 1.1 1.4 2.1 2.4 2.6l48.2 27.9c.8.5 1.9.7 3.1.7 1.2 0 2.3-.3 3.1-.7l48.2-27.9c1-.5 1.8-1.5 2.4-2.6.6-1.1 1-2.5 1-3.6V35.1c0-1-.4-2.3-1-3.3l.1.5zM63 103.1c-19.7 0-35.6-15.9-35.6-35.6S43.3 31.9 63 31.9s35.6 15.9 35.6 35.6-15.9 35.6-35.6 35.6zm0-64.5c-15.9 0-28.9 12.9-28.9 28.9S47.1 96.4 63 96.4s28.9-12.9 28.9-28.9S78.9 38.6 63 38.6z"
          />
          <circle fill="#FF6C37" cx="63" cy="67.5" r="17.2" />
        </svg>
      ),
    },
    {
      name: "Git/GitHub",
      color: "#F05032",
      logo: (
        <svg viewBox="0 0 128 128" width="48" height="48">
          <path
            fill="#F05032"
            d="M124.737 58.378L69.621 3.264c-3.172-3.174-8.32-3.174-11.497 0L46.68 14.71l14.518 14.518c3.375-1.139 7.243-.375 9.932 2.314 2.703 2.706 3.461 6.607 2.294 9.993l13.992 13.993c3.385-1.167 7.292-.413 9.994 2.295 3.78 3.777 3.78 9.9 0 13.679a9.673 9.673 0 01-13.683 0 9.677 9.677 0 01-2.105-10.521L68.574 47.933l-.002 34.341a9.708 9.708 0 012.559 1.828c3.778 3.777 3.778 9.898 0 13.683-3.779 3.777-9.904 3.777-13.679 0-3.778-3.784-3.778-9.905 0-13.683a9.65 9.65 0 013.167-2.11V47.333a9.581 9.581 0 01-3.167-2.111c-2.862-2.86-3.551-7.06-2.083-10.576L41.056 20.333 3.264 58.123a8.133 8.133 0 000 11.5l55.117 55.114c3.174 3.174 8.32 3.174 11.499 0l54.858-54.858a8.135 8.135 0 00-.001-11.501z"
          />
        </svg>
      ),
    },
    {
      name: "Machine Learning",
      color: "#FF6F00",
      logo: (
        <svg viewBox="0 0 128 128" width="48" height="48">
          <path
            fill="#FF6F00"
            d="M64 8C33.1 8 8 33.1 8 64s25.1 56 56 56 56-25.1 56-56S94.9 8 64 8zm0 96c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40z"
          />
          <circle fill="#FF6F00" cx="64" cy="64" r="24" />
          <circle fill="#FF6F00" cx="64" cy="32" r="8" />
          <circle fill="#FF6F00" cx="64" cy="96" r="8" />
          <circle fill="#FF6F00" cx="32" cy="64" r="8" />
          <circle fill="#FF6F00" cx="96" cy="64" r="8" />
          <circle fill="#FF6F00" cx="44" cy="44" r="6" />
          <circle fill="#FF6F00" cx="84" cy="44" r="6" />
          <circle fill="#FF6F00" cx="44" cy="84" r="6" />
          <circle fill="#FF6F00" cx="84" cy="84" r="6" />
        </svg>
      ),
    },
    {
      name: "AI",
      color: "#00D9FF",
      logo: (
        <svg viewBox="0 0 128 128" width="48" height="48">
          <path
            fill="#00D9FF"
            d="M64 8l-8 16h16l-8-16zm0 112l8-16H56l8 16zM24 64l-16-8v16l16-8zm80 0l16 8V56l-16 8z"
          />
          <path
            fill="#00D9FF"
            d="M64 32c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm0 48c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16z"
          />
          <circle fill="#00D9FF" cx="64" cy="64" r="8" />
          <path
            fill="#00D9FF"
            d="M40 40l-8-8 8 8zm48 0l8-8-8 8zM40 88l-8 8 8-8zm48 0l8 8-8-8z"
          />
        </svg>
      ),
    },
    {
      name: "Postman",
      color: "#FF6C37",
      logo: (
        <svg viewBox="0 0 128 128" width="48" height="48">
          <path
            fill="#FF6C37"
            d="M64 8C33.1 8 8 33.1 8 64s25.1 56 56 56 56-25.1 56-56S94.9 8 64 8zm28.5 38.5L73 66l-9-9 19.5-19.5c2.5 2.5 6.5 2.5 9 0s2.5-6.5 0-9-6.5-2.5-9 0zm-45 45c-2.5 2.5-6.5 2.5-9 0s-2.5-6.5 0-9l19.5-19.5 9 9-19.5 19.5zm9-9L37 63l19.5-19.5c2.5-2.5 6.5-2.5 9 0l9 9-19.5 19.5c-2.5 2.5-6.5 2.5-9 0zm27-27l9 9-19.5 19.5-9-9L83.5 55.5z"
          />
        </svg>
      ),
    },
    {
      name: "Vercel",
      color: "#ffffff",
      logo: (
        <svg viewBox="0 0 128 128" width="48" height="48">
          <path fill="#ffffff" d="M64 8l56 96H8L64 8z" />
        </svg>
      ),
    },
  ];

  const projects = [
    {
      title: "MediSure",
      description:
        "Healthcare web app enabling doctors to manage patients and prescriptions with automatic drug-drug interaction detection to reduce medical risks. Streamlined workflows for patient record management.",
      tech: ["React", "Node.js", "MongoDB", "Express"],
      image: medisureImg,
      github: "https://github.com/Virpal-Singh/",
      demo: "https://medi-sure.vercel.app",
    },
    {
      title: "SaathSource",
      description:
        "B2B pharmaceutical marketplace connecting verified buyers and sellers of raw pharmaceutical products. Features secure authentication, verification systems, and direct connection capabilities.",
      tech: ["MERN Stack", "JWT", "REST API"],
      image: saathsourceImg,
      github: "https://github.com/Virpal-Singh/",
      demo: "https://saathsource.vercel.app",
    },
    {
      title: "AI Viva Portal",
      description:
        "AI-powered viva examination portal with automated question generation and evaluation. Clean, responsive interface for students to practice, receive instant feedback, and track performance.",
      tech: ["React", "Node.js", "AI/ML", "MongoDB"],
      image: vivaportalImg,
      github: "https://github.com/Virpal-Singh/",
      demo: "https://viva-portal.vercel.app",
    },
  ];

  const experience = [
    {
      date: "2024 - Present",
      title: "MERN Stack Developer",
      company: "Freelance",
      description:
        "Building full-stack web applications using React, Node.js, Express, and MongoDB. Delivered healthcare and B2B pharmaceutical platforms with focus on security, scalability, and user experience.",
      icon: <Zap />,
    },
    {
      date: "2024 - 2026",
      title: "Master of Computer Applications",
      company: "Ganpat University",
      description:
        "Currently pursuing MCA with 9.33 CGPA (3rd Semester). Specializing in advanced web development, machine learning, and software engineering principles.",
      icon: <Star />,
    },
    {
      date: "2021 - 2024",
      title: "Bachelor of Science (Mathematics)",
      company: "MLSU Udaipur",
      description:
        "Completed BSc with 65%. Built strong analytical and problem-solving foundation that complements software development skills.",
      icon: <TrendingUp />,
    },
  ];

  // Optimized particle count - reduced from 50 to 30 for better performance
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    size: Math.random() * 8 + 2,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 5,
  }));

  return (
    <div className="app">
      {/* Simplified Background */}
      <div className="bg-grid"></div>

      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-content">
          <a
            href="#home"
            className="logo"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <img src={virpalLogo} alt="Virpal" className="logo-img" />
          </a>
          <ul className="nav-links">
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#skills">Skills</a>
            </li>
            <li>
              <a href="#projects">Projects</a>
            </li>
            <li>
              <a href="#experience">Experience</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
        <ul className="mobile-nav-links">
          <li>
            <a 
              href="#home" 
              onClick={() => setMobileMenuOpen(false)}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Sparkles size={20} />
              Home
            </a>
          </li>
          <li>
            <a 
              href="#about" 
              onClick={() => setMobileMenuOpen(false)}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Code2 size={20} />
              About
            </a>
          </li>
          <li>
            <a 
              href="#skills" 
              onClick={() => setMobileMenuOpen(false)}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Cpu size={20} />
              Skills
            </a>
          </li>
          <li>
            <a 
              href="#projects" 
              onClick={() => setMobileMenuOpen(false)}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Rocket size={20} />
              Projects
            </a>
          </li>
          <li>
            <a 
              href="#experience" 
              onClick={() => setMobileMenuOpen(false)}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <TrendingUp size={20} />
              Experience
            </a>
          </li>
          <li>
            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Mail size={20} />
              Contact
            </a>
          </li>
        </ul>
      </div>

      {/* Hero Section */}
      <section className="hero" id="home" ref={heroRef}>
        <div className="hero-content">
          <motion.div
            className="hero-tag"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <Sparkles
              size={16}
              style={{ display: "inline", marginRight: "0.5rem" }}
            />
            Welcome to my portfolio
          </motion.div>

          <h1 className="hero-title">VIRPAL</h1>

          <motion.h2
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
          >
            MERN Stack Developer
          </motion.h2>

          <motion.p
            className="hero-tagline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
          >
            Code • Create • Deploy
          </motion.p>

          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
          >
            <a
              href="#projects"
              className="btn btn-primary"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Rocket size={20} />
              View Projects
            </a>
            <a
              href={resumePDF}
              download="Virpal_Sinh_MERN_Developer_Resume.pdf"
              className="btn btn-secondary"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Download size={20} />
              Download Resume
            </a>
            <a
              href="#contact"
              className="btn btn-secondary"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Mail size={20} />
              Contact Me
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 2.5, repeat: Infinity, duration: 1.5 }}
        >
          <div className="scroll-line"></div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="section" id="about">
        <div className="section-header">
          <div className="section-tag">About Me</div>
          <h2 className="section-title">Building the Future</h2>
          <p className="section-description">
            Passionate MERN Stack Developer from Rajasthan, India
          </p>
        </div>

        <div className="about-content">
          <div className="about-text">
            <p>
              I am a MERN Stack Developer from Rajasthan, India, focused on
              building secure, fast and scalable web applications that create
              real impact. I love turning ideas into real products — from
              designing clean UI to building backend architecture and deploying
              full-stack solutions.
            </p>
            <p>
              I currently work as a freelance developer and have successfully
              completed three production-level projects, including a healthcare
              management platform, a B2B resource marketplace, and an AI-powered
              examination system. Every project I take is driven by performance,
              meaningful user experience, and clean, maintainable code.
            </p>
            <p>
              Alongside freelancing, I am part of the development team at{" "}
              <a
                href="https://www.qalamwebstudio.online/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-link"
              >
                Qalam Web Studio
              </a>
              , where I collaborate with professionals to deliver business-grade
              digital solutions using the MERN stack and modern JavaScript
              ecosystem. Working in a real development environment has
              strengthened my ability to understand client needs, plan system
              architecture and deliver complete end-to-end applications.
            </p>
            <p>
              Beyond the MERN stack, I also work with Python, Java, C, and
              Machine Learning technologies. I constantly upgrade my skills,
              explore new tools and challenge myself with real-world projects —
              because for me, learning never stops and development is more than
              code… it's impact.
            </p>
          </div>

          <div className="about-stats">
            <div className="stat-card">
              <div className="stat-number">3+</div>
              <div className="stat-label">Projects Delivered</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">9.33</div>
              <div className="stat-label">CGPA (MCA)</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">10+</div>
              <div className="stat-label">Technologies</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">100%</div>
              <div className="stat-label">Dedication</div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="section" id="skills">
        <div className="section-header">
          <div className="section-tag">Tech Stack</div>
          <h2 className="section-title">Skills & Technologies</h2>
          <p className="section-description">
            Modern tools and frameworks I use to build exceptional applications
          </p>
        </div>

        <div className="skills-content-wrapper">
          {/* Left Side - Skills Marquee with Lines */}
          <div className="skills-marquee-wrapper">
            <div className="skills-marquee-line top-line"></div>
            <div className="skills-marquee-container">
              {/* Column 1 - Scrolls Down - 4 skills */}
              <div className="skills-column scroll-down">
                <div className="skills-track">
                  {[...skills.slice(0, 4), ...skills.slice(0, 4), ...skills.slice(0, 4)].map((skill, index) => (
                    <div key={index} className="skill-card-marquee">
                      <div className="skill-icon">{skill.logo}</div>
                      <div className="skill-name">{skill.name}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 2 - Scrolls Up - 4 skills */}
              <div className="skills-column scroll-up">
                <div className="skills-track">
                  {[...skills.slice(4, 8), ...skills.slice(4, 8), ...skills.slice(4, 8)].map((skill, index) => (
                    <div key={index} className="skill-card-marquee">
                      <div className="skill-icon">{skill.logo}</div>
                      <div className="skill-name">{skill.name}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 3 - Scrolls Down - 6 skills */}
              <div className="skills-column scroll-down">
                <div className="skills-track">
                  {[...skills.slice(8, 14), ...skills.slice(8, 14), ...skills.slice(8, 14)].map((skill, index) => (
                    <div key={index} className="skill-card-marquee">
                      <div className="skill-icon">{skill.logo}</div>
                      <div className="skill-name">{skill.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="skills-marquee-line bottom-line"></div>
          </div>

          {/* Right Side - Skills Description */}
          <div className="skills-description">
            <div className="skills-icon-wrapper">
              <Code2 size={48} />
            </div>
            <p className="skills-paragraph">
              I don't just learn technologies — I apply them. Every skill listed here has been used in real projects to solve real problems. From building seamless frontend experiences with React to handling secure APIs and scalable backends with Node.js and Express, I focus on writing clean, optimized and production-ready code. My approach is simple: learn → build → improve → repeat. I constantly upgrade my tech stack and adapt to modern development trends, ensuring the solutions I create are fast, stable and meaningful for users.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="section" id="projects">
        <div className="section-header">
          <div className="section-tag">Portfolio</div>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-description">
            Real-world applications solving meaningful problems
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-image">
                <img src={project.image} alt={project.title} />
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="project-links">
                  <a
                    href={project.github}
                    className="project-link"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Github size={18} />
                    GitHub
                  </a>
                  <a
                    href={project.demo}
                    className="project-link"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <ExternalLink size={18} />
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section className="section" id="experience">
        <div className="section-header">
          <div className="section-tag">Journey</div>
          <h2 className="section-title">Experience & Education</h2>
          <p className="section-description">
            My professional and academic journey
          </p>
        </div>

        <div className="timeline">
          {experience.map((item, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-dot">{item.icon}</div>
              <div className="timeline-content">
                <div className="timeline-date">{item.date}</div>
                <h3 className="timeline-title">{item.title}</h3>
                <div className="timeline-company">{item.company}</div>
                <p className="timeline-description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="section" id="contact">
        <div className="section-header">
          <div className="section-tag">Get In Touch</div>
          <h2 className="section-title">Let's Work Together</h2>
          <p className="section-description">
            Have a project in mind? Let's create something amazing
          </p>
        </div>

        <div className="contact-container">
          <form className="contact-form" onSubmit={handleFormSubmit}>
            {submitError && (
              <div className="error-message">
                {submitError}
              </div>
            )}
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input 
                type="text" 
                id="name" 
                name="name"
                placeholder="Your name" 
                required 
                disabled={isSubmitting}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="your.email@example.com"
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Tell me about your project..."
                required
                disabled={isSubmitting}
              ></textarea>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%" }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              disabled={isSubmitting}
            >
              <Mail size={20} />
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>

          <div className="social-links">
            <a
              href="mailto:77virpalsinh77@gmail.com"
              className="social-link"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Mail size={20} />
              Email
            </a>
            <a
              href="https://github.com/virpal-singh"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Github size={20} />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/virpal-sinh-222851314"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Linkedin size={20} />
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Virpal. Built with React & passion. All rights reserved.</p>
        <p style={{ marginTop: "0.5rem", fontSize: "0.9rem" }}>
          Reodar-Sirohi, Rajasthan, India
        </p>
      </footer>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="success-modal-overlay" onClick={() => setShowSuccessModal(false)}>
          <div className="success-modal" onClick={(e) => e.stopPropagation()}>
            <div className="success-icon">
              <Sparkles size={48} />
            </div>
            <h3>Message Sent Successfully!</h3>
            <p>Thank you for reaching out! Your message has been received and I'll get back to you within 24 hours.</p>
            <button 
              className="btn btn-primary"
              onClick={() => setShowSuccessModal(false)}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
}

export default App;
