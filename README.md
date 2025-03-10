# Food App

A modern food delivery application built with Next.js and React.

## Features

- Browse restaurants
- View restaurant menus and categorized food items
- Add items to cart
- Responsive and modern UI using Tailwind CSS
- Theme support (light/dark mode)

## Prerequisites

- Node.js 18+ 
- npm or yarn

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd <repo-folder>
```

### 2. Install dependencies

Navigate to the src directory and install dependencies:

```bash
cd src
npm install
# or
yarn install
```

### 3. Run the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

- `src/app/` - Next.js pages and layouts
- `src/components/` - Reusable React components
- `src/hooks/` - Custom React hooks
- `src/lib/` - Utility functions and shared logic
- `src/styles/` - Global styles and theme configuration
- `src/public/` - Static assets

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework for server-rendered applications
- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible UI components
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [React Hook Form](https://react-hook-form.com/) - Form validation and handling
- [Zod](https://zod.dev/) - TypeScript-first schema validation

## Building for Production

```bash
npm run build
# or
yarn build
```

Then start the production server:

```bash
npm run start
# or
yarn start
```

## Folder Structure

```
src/
├── app/                  # Next.js app router pages
│   ├── cart/             # Cart page
│   ├── restaurant/       # Restaurant details page
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── globals.css       # Global CSS
├── components/           # Reusable components
│   ├── ui/               # UI components
│   ├── restaurant-card.tsx
│   ├── category-pills.tsx
│   ├── menu-section.tsx
│   └── theme-provider.tsx
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── public/               # Static assets
└── styles/               # Additional styles
```

## License

[MIT](LICENSE)


## ----------
vercel deploy --prod