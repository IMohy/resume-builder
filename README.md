# Modern Resume Builder

<div align="center">
  <img src="public/logo.png" alt="Resume Builder Logo" width="200" />
  <h3>Create professional resumes in minutes</h3>
  <p>A powerful, customizable resume builder with multiple templates, PDF export, and multilingual support</p>
  
  ![React](https://img.shields.io/badge/React-19-blue)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-blue)
  ![i18n](https://img.shields.io/badge/i18n-Multilingual-green)
  ![License](https://img.shields.io/badge/License-MIT-yellow)
</div>

## ✨ Features

- **🎨 Multiple Templates** - Choose from various professionally designed resume templates
- **📱 Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- **🌍 Multilingual Support** - Available in English and Arabic with RTL support
- **🔄 Real-time Preview** - See changes instantly as you edit your resume
- **📄 PDF Export** - Download your resume as a professional PDF document
- **📱 QR Code Integration** - Add custom QR codes to your resume for digital portfolios or contact information
- **🌓 Dark/Light Mode** - Switch between dark and light themes for comfortable editing
- **💾 Local Storage** - Your data is saved automatically in your browser
- **🔒 Privacy-Focused** - All data stays on your device, no server uploads

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (v8 or higher)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/resume-builder.git
   cd resume-builder
   ```

2. Install dependencies
   ```bash
   pnpm install
   ```

3. Start the development server
   ```bash
   pnpm dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Built With

- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS](https://tailwindcss.com/)** - Styling
- **[Vite](https://vitejs.dev/)** - Build tool
- **[React-PDF](https://react-pdf.org/)** - PDF generation
- **[i18next](https://www.i18next.com/)** - Internationalization
- **[Radix UI](https://www.radix-ui.com/)** - Accessible UI components
- **[Lucide React](https://lucide.dev/)** - Beautiful icons
- **[QR Code](https://www.npmjs.com/package/qrcode)** - QR code generation

## 📋 Usage Guide

1. **Personal Information** - Fill in your basic details like name, job title, and contact information
2. **Experience** - Add your work history with company names, positions, dates, and descriptions
3. **Education** - Include your educational background with institutions, degrees, and graduation dates
4. **Skills** - List your professional skills with optional proficiency levels
5. **Languages** - Add languages you speak with proficiency levels
6. **Social Media** - Include links to your professional profiles
7. **QR Code** - Add a custom QR code that links to your portfolio or contact information
8. **Template Selection** - Choose from different resume templates
9. **Export** - Download your completed resume as a PDF

## 🌐 Internationalization

The application supports multiple languages:

- English (default)
- Arabic (with RTL support)

To switch languages, use the language toggle in the header.

## 🖥️ Project Structure

```
resume-builder/
├── public/             # Static assets
├── src/
│   ├── assets/         # Images and other assets
│   ├── components/     # React components
│   │   ├── form/       # Form components for data entry
│   │   ├── layout/     # Layout components (header, footer)
│   │   ├── pdf/        # PDF generation components
│   │   ├── preview/    # Resume preview components
│   │   ├── templates/  # Resume template designs
│   │   └── ui/         # Reusable UI components
│   ├── contexts/       # React context providers
│   ├── i18n/           # Internationalization files
│   ├── lib/            # Utility libraries
│   ├── pages/          # Page components
│   ├── types/          # TypeScript type definitions
│   └── utils/          # Utility functions
└── ...
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Radix UI](https://www.radix-ui.com/) for accessible UI components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [React-PDF](https://react-pdf.org/) for PDF generation capabilities

---

<div align="center">
  <p>Made with ❤️ for job seekers everywhere</p>
</div>
