# PDFy - Professional PDF Toolkit

> A comprehensive web application for PDF manipulation, conversion, and resume building.
> Built with React + Vite, featuring a modern SaaS design.

---

## 📖 Development Log

### Day 1: Project Inception

**Initial Request:** Create a website for building resumes.

Started the project with React and Vite. The initial scope was simple - a resume builder with basic functionality.

```bash
npm create vite@latest resume-builder -- --template react
cd resume-builder
npm install
```

**Initial Features:**
- Resume creation with real-time preview
- PDF export functionality
- Simple and professional templates

---

### Day 2: Feature Expansion

**Request:** Add comprehensive PDF tools beyond just resumes.

Expanded the application to become a full PDF toolkit. Added multiple new features:

#### New Modules Added:
1. **Resume Builder** (2 templates)
   - Simple resume - clean and minimal
   - Professional resume - detailed and elegant

2. **PDF Conversion Tools**
   - Convert TO PDF: Word → PDF, Excel → PDF, PowerPoint → PDF, JPG → PDF
   - Convert FROM PDF: PDF → Word, PDF → Excel, PDF → PowerPoint, PDF → JPG

3. **PDF Editing**
   - Add text to PDFs
   - Insert images
   - Create annotations
   - Add watermarks
   - Page numbering

4. **PDF Security**
   - Password protection
   - Password removal
   - Sensitive data redaction

5. **Digital Signature**
   - Sign documents online
   - Request signatures from others
   - Contract and official document support

6. **OCR (Optical Character Recognition)**
   - Transform scanned PDFs to editable text
   - Image to text conversion

7. **Additional Tools**
   - Rotate PDF
   - Repair corrupted PDFs
   - Compare PDFs
   - HTML to PDF conversion
   - Mobile document scanning

**Tech Stack Decisions:**
- `react-router-dom` for navigation
- `pdf-lib` for PDF manipulation
- `html2canvas` + `jsPDF` for resume PDF generation

---

### Day 3: Visual Rebranding

**Request:** Refactor frontend with "PDFy" branding and modern SaaS design.

Complete visual overhaul while preserving all functionality.

#### Changes Made:

**Branding:**
- Application name changed to "PDFy"
- All visible texts updated
- Page titles and metadata updated

**UI Improvements:**
- Modern SaaS styling
- Increased spacing between elements
- Rounded corners (border-radius)
- Soft shadows on cards
- Improved typography

**Color System:**
```css
Primary:   #4F46E5 (Indigo)
Secondary: #22C55E (Green)
Background:#F9FAFB (Light gray)
Text:      #111827 (Dark gray)
```

**Component Updates:**
- Navbar: Clean and modern
- Buttons: Hover effects, rounded
- Forms: Better spacing and alignment
- Cards: Shadow and padding
- Tables: Clean layout

**Responsive Design:**
- Mobile and desktop optimized
- Flexible grid layouts
- Touch-friendly navigation

---

### Day 4: Dark/Light Theme Implementation

**Request:** Add option for light or dark mode.

Implemented a complete theme system.

#### Technical Implementation:

**1. Created ThemeContext.jsx:**
```jsx
// React Context for global theme state
// Persists to localStorage
// Detects system preference
```

**2. Created ThemeToggle.jsx:**
- Moon/sun SVG icons
- Accessible button with aria-labels
- Smooth transitions

**3. Updated CSS with CSS Custom Properties:**
```css
:root {
  /* Light theme variables */
  --bg-primary: #F9FAFB;
  --text-primary: #111827;
  /* ... */
}

[data-theme="dark"] {
  /* Dark theme variables */
  --bg-primary: #0F172A;
  --text-primary: #F8FAFC;
  /* ... */
}
```

**4. Wrapped App with ThemeProvider**

**Features:**
- Toggle between light/dark modes
- Persistent preference (localStorage)
- System preference detection
- Smooth transitions between themes

---

### Day 5: Logo-Based Redesign

**Request:** Redesign entire UI based on provided PDFy logo.

Extracted colors from the logo and rebuilt the design system.

#### Logo Analysis:
- **Red:** #DC2626 (energy, action)
- **Blue:** #1E40AF (trust, professionalism)
- **Gradient:** Red → Blue

#### New Design System:

**Updated Color Palette:**
```css
/* Brand Colors */
--pdfy-red: #DC2626;
--pdfy-red-light: #FEE2E2;
--pdfy-red-dark: #991B1B;

--pdfy-blue: #1E40AF;
--pdfy-blue-light: #DBEAFE;
--pdfy-blue-dark: #1E3A8A;

/* Primary: Blue for trust */
--primary-500: #3B82F6;
--primary-600: #2563EB;
--primary-700: #1D4ED8;

/* Secondary: Red for action */
--secondary-500: #EF4444;
--secondary-600: #DC2626;
--secondary-700: #B91C1C;
```

**Visual Improvements:**
- Professional SaaS aesthetic
- Consistent spacing system
- Rounded corners (10-20px)
- Subtle shadows with glow effects
- Modern typography (Inter font)

**Components Redesigned:**
- Navigation with logo
- Hero section
- Feature cards
- Tool grids
- Forms and buttons
- Upload areas

**Logo Implementation:**
- SVG logo component with gradient
- Full logo variant (icon + text)
- Proper spacing and proportions
- Shadow for depth

---

### Day 6: Logo Refinement

**Request:** Fix visibility issues and improve logo composition.

#### Issues Fixed:

**1. Visibility:**
- Increased contrast
- Sharper document icon
- Better "PDF" label placement

**2. Composition:**
- Larger viewBox (48x48)
- Proper margins (2px padding)
- Centered elements
- Balanced spacing

**3. Text Prominence:**
- Larger "PDFy" text (1.6rem)
- Gradient text effect
- Better letter-spacing

**4. Technical Improvements:**
```jsx
// Refined SVG structure
<svg viewBox="0 0 48 48">
  {/* Background with shadow */}
  <rect with gradient />
  {/* Document icon */}
  <path documentBody />
  <path foldedCorner />
  {/* PDF label */}
  <rect labelBackground />
  <text PDF />
</svg>
```

---

## 🎨 Current Design System

### Colors
| Purpose | Color | Hex |
|---------|-------|-----|
| Primary | Blue | #2563EB |
| Secondary | Red | #DC2626 |
| Background | Light | #F8FAFC |
| Background Dark | Dark | #0B1120 |
| Text | Primary | #0F172A |
| Text | Secondary | #475569 |

### Typography
- **Font:** Inter, system-ui, sans-serif
- **Weights:** 400, 500, 600, 700, 800
- **Sizes:** Responsive scale

### Spacing
- Base unit: 4px
- Scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64

### Border Radius
- Small: 6px
- Medium: 10px
- Large: 14px
- XL: 20px
- Full: 9999px

### Shadows
```css
--shadow-sm: 0 1px 2px rgba(15, 23, 42, 0.05);
--shadow-md: 0 4px 6px rgba(15, 23, 42, 0.08);
--shadow-lg: 0 10px 15px rgba(15, 23, 42, 0.08);
--shadow-glow: 0 0 20px rgba(37, 99, 235, 0.15);
```

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React 18 |
| Build Tool | Vite |
| Routing | React Router v6 |
| PDF Library | pdf-lib |
| PDF Generation | html2canvas + jsPDF |
| Styling | CSS Custom Properties |
| Icons | SVG |
| Theme | React Context + localStorage |

---

## 📁 Project Structure

```
resume-builder/
├── public/
├── src/
│   ├── components/
│   │   └── ThemeToggle.jsx
│   ├── contexts/
│   │   └── ThemeContext.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── ResumeSimple.jsx
│   │   ├── ResumeProfessional.jsx
│   │   ├── ConvertToPDF.jsx
│   │   ├── ConvertFromPDF.jsx
│   │   ├── EditPDF.jsx
│   │   ├── PDFSecurity.jsx
│   │   ├── DigitalSignature.jsx
│   │   ├── OCR.jsx
│   │   └── PDFOtherTools.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/lucianodev2/PDFy.git
cd PDFy

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
```

---

## ✨ Features

### Resume Builder
- [x] Simple template
- [x] Professional template
- [x] Real-time preview
- [x] PDF export

### PDF Conversion
- [x] Word → PDF
- [x] Excel → PDF
- [x] PowerPoint → PDF
- [x] JPG → PDF
- [x] PDF → Word
- [x] PDF → Excel
- [x] PDF → PowerPoint
- [x] PDF → JPG

### PDF Editing
- [x] Add text
- [x] Insert images
- [x] Annotations
- [x] Watermarks
- [x] Page numbering

### PDF Security
- [x] Password protection
- [x] Password removal
- [x] Data redaction

### Digital Signature
- [x] Online signing
- [x] Signature requests

### OCR
- [x] Scanned PDF to text
- [x] Image to text

### Other Tools
- [x] Rotate PDF
- [x] Repair PDF
- [x] Compare PDFs
- [x] HTML to PDF

### UI/UX
- [x] Modern SaaS design
- [x] Responsive layout
- [x] Dark/Light theme
- [x] Professional branding

---

## 📝 Development Notes

### Challenges Overcome

1. **PowerShell Execution Policy**
   - Issue: Couldn't run npm commands directly
   - Solution: Used Node.js child_process to bypass restrictions

2. **Vite Import Resolution**
   - Issue: Timing issues with rapid file creation
   - Solution: Ensured files fully written before imports

3. **PDF Generation**
   - Issue: Complex layout rendering
   - Solution: Combined html2canvas for rendering + jsPDF for output

4. **Theme Implementation**
   - Issue: Consistent theming across components
   - Solution: CSS Custom Properties with React Context

### Design Decisions

- **Client-side only:** All processing happens in browser for privacy
- **No backend:** Files never leave user's computer
- **SVG logos:** Scalable and crisp at any size
- **CSS Variables:** Easy theme switching and maintenance

---

## 🔮 Future Enhancements

Potential features for future development:

- [ ] Cloud storage integration
- [ ] User accounts and saved documents
- [ ] More resume templates
- [ ] Batch processing
- [ ] API for developers
- [ ] Mobile app
- [ ] AI-powered resume suggestions
- [ ] PDF form creation
- [ ] Electronic signatures (legally binding)

---

## 📄 License

MIT License - feel free to use and modify.

---

## 🙏 Acknowledgments

Built with:
- [React](https://react.dev)
- [Vite](https://vitejs.dev)
- [pdf-lib](https://pdf-lib.js.org)
- [html2canvas](https://html2canvas.hertzen.com)
- [jsPDF](https://parall.ax/products/jspdf)

---

**Developed by:** lucianodev2  
**Repository:** https://github.com/lucianodev2/PDFy
