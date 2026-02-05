# Component Structure

This document outlines the component organization for the Marsam Therapy website.

## Directory Structure

```
src/components/
├── shared/           # Shared components used across pages
│   ├── Button.astro
│   ├── ConstellationBg.astro
│   ├── Footer.astro
│   └── Header.astro
├── home/            # Home page components
│   ├── HeroSection.astro
│   ├── AboutSection.astro
│   ├── ServicesSection.astro
│   ├── ServiceCard.astro
│   ├── ApproachSection.astro
│   ├── ContactSection.astro
│   └── ContactForm.astro
└── blog/            # Blog page components
    └── BlogCard.astro
```

## Component Descriptions

### Shared Components

- **Button.astro**: Reusable button with variants (primary, secondary, outline)
- **ConstellationBg.astro**: Animated star constellation background
- **Header.astro**: Site navigation header with mobile menu
- **Footer.astro**: Site footer with links and social icons

### Home Page Components

- **HeroSection.astro**: Hero section with tagline and CTAs
- **AboutSection.astro**: About Mariya with photo and info
- **ServicesSection.astro**: Services grid with 5 service cards
- **ServiceCard.astro**: Individual service card component
- **ApproachSection.astro**: Faith-informed healing approach
- **ContactSection.astro**: Contact information and form
- **ContactForm.astro**: Contact form (visual placeholder)

### Blog Components

- **BlogCard.astro**: Blog post card with image, category, excerpt

## Usage Example

### Home Page (src/pages/index.astro)

```astro
---
import Layout from '../layouts/Layout.astro';
import HeroSection from '../components/home/HeroSection.astro';
import AboutSection from '../components/home/AboutSection.astro';
import ServicesSection from '../components/home/ServicesSection.astro';
import ApproachSection from '../components/home/ApproachSection.astro';
import ContactSection from '../components/home/ContactSection.astro';
---

<Layout title="Home">
	<HeroSection />
	<AboutSection />
	<ServicesSection />
	<ApproachSection />
	<ContactSection />
</Layout>
```

### Blog Page (src/pages/blog/index.astro)

```astro
---
import Layout from '../../layouts/Layout.astro';
import BlogCard from '../../components/blog/BlogCard.astro';
---

<Layout title="Blog">
	<!-- Blog content -->
	<BlogCard {...post} />
</Layout>
```

## Icons

The project uses **Heroicons** for consistent iconography. Icons are used in:
- ServicesSection (Users, Heart, Book, User Circle, Light Bulb)
- ContactSection (Envelope, Map Pin)
- Footer (Social media icons)

All icons use stroke-based SVG paths from Heroicons with customizable colors.
