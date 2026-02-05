# Blog Components

Components for blog posts and article content.

## BlogLayout

A prose wrapper component for blog post content that provides consistent, beautiful typography using Tailwind's Typography plugin.

### Features

- **Responsive typography** - Scales beautifully across devices
- **Theme integration** - Uses dark green theme with orange accents
- **Serif headings** - Libre Baskerville for elegant headers
- **Sans-serif body** - Lato for readable body text
- **Justified text** - Professional paragraph alignment
- **Styled elements** - Pre-styled links, code blocks, blockquotes, lists, and images

### Usage

Wrap your blog content (HTML or markdown) with the BlogLayout component:

```astro
---
import Layout from '../../layouts/Layout.astro';
import BlogLayout from '../../components/blog/BlogLayout.astro';
---

<Layout title="My Blog Post">
	<article class="max-w-4xl mx-auto px-4 py-16">
		<BlogLayout>
			<h1>Blog Post Title</h1>
			<p>Your content here...</p>
		</BlogLayout>
	</article>
</Layout>
```

### Styled Elements

The BlogLayout automatically styles:

#### Headings
```html
<h1>Main Title</h1>         <!-- 4xl, serif, bold, ivory -->
<h2>Section Heading</h2>    <!-- 3xl, serif, bold, ivory -->
<h3>Subsection</h3>         <!-- 2xl, serif, bold, ivory -->
```

#### Paragraphs
```html
<p>Regular paragraph text</p>  <!-- Justified, charcoal, Lato font -->
```

#### Links
```html
<a href="#">Inline link</a>    <!-- Orange, no underline, underline on hover -->
```

#### Emphasis
```html
<strong>Bold text</strong>     <!-- Ivory, bold -->
<em>Italic text</em>           <!-- Charcoal-light, italic -->
```

#### Lists
```html
<ul>
	<li>Unordered list</li>    <!-- Orange bullet markers -->
</ul>

<ol>
	<li>Ordered list</li>      <!-- Orange numbers -->
</ol>
```

#### Blockquotes
```html
<blockquote>
	Famous quote here
</blockquote>
<!-- Orange left border, italic, indented -->
```

#### Code
```html
<code>inline code</code>       <!-- Orange text, dark background -->

<pre><code>
Code block
</code></pre>                  <!-- Dark background, bordered -->
```

#### Images
```html
<img src="..." alt="...">      <!-- Rounded corners, shadow -->
```

#### Horizontal Rules
```html
<hr>                           <!-- Night-lighter border -->
```

### Complete Example

See `/src/pages/blog/example-post.astro` for a full working example with:
- Article header with date and title
- Multiple heading levels
- Paragraphs with emphasis
- Lists (ordered and unordered)
- Blockquotes
- Links
- Code blocks
- Author footer

### Customization

The prose classes can be customized by modifying the BlogLayout component. Current theme:

- **Background**: Transparent (inherits from parent)
- **Text color**: `text-charcoal` for body, `text-ivory` for headings
- **Accent color**: `text-primary` (orange) for links, markers, borders
- **Fonts**: Libre Baskerville (headings), Lato (body)
- **Text alignment**: Justified paragraphs

### Best Practices

1. **Wrap in article tag** - Use semantic HTML
2. **Add max-width** - Container should be `max-w-4xl` or similar
3. **Include metadata** - Date, author, categories in header
4. **Use semantic HTML** - Proper heading hierarchy (h1 → h2 → h3)
5. **Add footer** - Author info, back link, related posts
6. **Optimize images** - Use appropriate sizes and formats
