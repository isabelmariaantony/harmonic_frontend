# Harmonic Frontend

This is the frontend application for the Harmonic learning platform, built with Next.js and TypeScript.PhonoCare is a machine-learning application developed to detect heart murmurs from phonocardiogram (PCG) audio recordings. This repository contains the frontend interface for the project, to allow users to upload heart-sound audio files and receive the model's classification results.

The frontend connects to the PhonoCare backend, which processes uploaded recordings and runs the trained heart-murmur classification model.

## Features

- User authentication (login/register)
- Study session management
- Educational resources
- Memory exercises
- User profile management
- Responsive design

## Prerequisites

- Node.js 18.x or later
- npm or yarn

## Getting Started

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Create a `.env.local` file in the root directory with the following variables:
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard page
│   ├── profile/           # Profile page
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
├── contexts/              # React contexts
├── lib/                   # Utility functions
├── types/                 # TypeScript types
└── styles/                # Global styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
