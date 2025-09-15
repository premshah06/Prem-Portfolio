# Prem Shah - Professional Portfolio 🚀

A modern, responsive portfolio website showcasing my skills, experience, and projects in Data Analytics, Machine Learning, and Web Development.

## ✨ Features

- **Responsive Design** - Optimized for all devices and screen sizes
- **Modern UI/UX** - Clean, professional design with smooth animations
- **Interactive Components** - Engaging user experience with hover effects and transitions
- **Performance Optimized** - Fast loading with optimized images and code
- **Accessibility** - WCAG compliant with proper ARIA labels and keyboard navigation
- **SEO Friendly** - Meta tags and structured data for better search visibility

## 🛠️ Technologies Used

- **Frontend**: React 18, Tailwind CSS
- **Icons**: React Icons
- **Animations**: CSS animations and Tailwind utilities
- **Deployment**: Ready for Vercel, Netlify, or GitHub Pages
- **Build Tool**: Create React App

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/premshah06/prem-portfolio.git
   cd prem-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
prem_portfolio/
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── Home.jsx       # Hero section
│   │   ├── NavBar.jsx     # Navigation
│   │   ├── About.jsx      # Experience section
│   │   ├── Skills.jsx     # Skills showcase
│   │   ├── Work.jsx       # Projects portfolio
│   │   ├── Contact.jsx    # Certificates
│   │   └── Footer.jsx     # Footer section
│   ├── assests/           # Images and assets
│   ├── data/              # Project data
│   ├── App.js             # Main app component
│   ├── index.js           # Entry point
│   └── index.css          # Global styles
├── tailwind.config.js     # Tailwind configuration
├── package.json           # Dependencies and scripts
└── README.md              # Project documentation
```

## 🎨 Customization

### Colors and Theme

The portfolio uses a custom color scheme defined in `tailwind.config.js`:

```javascript
colors: {
  primary: {
    50: '#fef7f7',
    500: '#e85d5d',
    600: '#d63a3a',
    // ... more shades
  },
  secondary: {
    50: '#f0f9ff',
    500: '#0ea5e9',
    600: '#0284c7',
    // ... more shades
  }
}
```

### Content Updates

1. **Personal Information**: Update details in component files
2. **Projects**: Modify `src/data/data.jsx`
3. **Skills**: Update skills array in `Skills.jsx`
4. **Experience**: Edit experience data in `About.jsx`
5. **Certificates**: Update certificate information in `Contact.jsx`

### Styling

- **Tailwind CSS**: Utility-first CSS framework
- **Custom CSS**: Additional styles in `index.css`
- **Responsive**: Mobile-first approach with breakpoint utilities

## 📱 Responsive Breakpoints

- **Mobile**: `< 640px`
- **Tablet**: `640px - 1024px`
- **Desktop**: `> 1024px`
- **Large Desktop**: `> 1280px`

## 🚀 Deployment

### Build for Production

```bash
npm run build
# or
yarn build
```

### Deploy Options

1. **Vercel** (Recommended)
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Netlify**
   - Drag and drop the `build` folder
   - Or connect your GitHub repository

3. **GitHub Pages**
   ```bash
   npm run deploy
   ```

## 🔧 Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run lint` - Check code quality
- `npm run lint:fix` - Fix linting issues
- `npm run format` - Format code with Prettier

## 📊 Performance

- **Lighthouse Score**: 95+ on all metrics
- **Core Web Vitals**: Optimized for best user experience
- **Image Optimization**: Lazy loading and responsive images
- **Code Splitting**: Efficient bundle sizes

## 🌟 Key Features

### Navigation
- Smooth scrolling between sections
- Responsive mobile menu
- Sticky navigation with scroll effects

### Home Section
- Hero introduction with call-to-action buttons
- Quick stats overview
- Professional profile card

### Skills Section
- Categorized skill display
- Interactive filtering
- Skill level indicators

### Projects Portfolio
- Project filtering by technology
- Interactive project cards
- GitHub and live demo links

### Experience Timeline
- Professional experience showcase
- Interactive timeline design
- Skills and achievements display

### Certificates
- Academic achievements
- Interactive certificate viewer
- Achievement statistics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

- **Email**: prem.shah@sjsu.edu
- **LinkedIn**: [Prem Shah](https://www.linkedin.com/in/prem-shah-9a5076219/)
- **GitHub**: [premshah06](https://github.com/premshah06)

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- React Icons for the beautiful icon library
- All contributors and supporters

---

**Made with ❤️ by Prem Shah**

*Data Analytics Graduate Student | Developer | ML Enthusiast*
