# Admin Panel - Next.js Tutorial 2 Days

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 🌐 External API Integration

This application uses **external APIs** instead of Next.js internal API routes:

- **User Data**: JSONPlaceholder API (https://jsonplaceholder.typicode.com)
- **Product Data**: DummyJSON API (https://dummyjson.com)
- **Authentication**: DummyJSON Auth API

For detailed information, see [EXTERNAL_API.md](./EXTERNAL_API.md)

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

The default configuration uses:
- JSONPlaceholder for user data
- DummyJSON for product data and authentication

### 3. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 4. Demo Credentials

For login, use:
- **Username**: emilys (or any email)
- **Password**: emilyspass (or any password)

## Project Structure

```
admin-panel/
├── app/
│   ├── [locale]/          # Internationalized routes
│   │   ├── admin/         # Admin panel pages
│   │   │   ├── dashboard/ # Dashboard
│   │   │   ├── users/     # User management
│   │   │   ├── products/  # Product management
│   │   │   └── login/     # Login page
│   │   └── page.tsx       # Landing page
│   └── api/               # Next.js API routes (deprecated, not used)
├── components/            # React components
├── lib/                   # Utilities and services
│   └── api-service.ts    # External API service layer
├── messages/              # i18n translations
└── public/                # Static files
```

## Features

- ✅ **External API Integration** - Uses real external REST APIs
- ✅ **User Management** - Full CRUD operations
- ✅ **Product Management** - Full CRUD operations
- ✅ **Authentication** - Login with external auth API
- ✅ **Internationalization** - English and Thai languages
- ✅ **Responsive Design** - Mobile and desktop support
- ✅ **Modern UI** - Material-UI components with Tailwind CSS

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Environment Variables

When deploying, make sure to set these environment variables:

- `NEXT_PUBLIC_API_BASE_URL` - Base URL for external API (default: https://jsonplaceholder.typicode.com)
- `NEXT_PUBLIC_AUTH_API_URL` - Authentication API URL (default: https://dummyjson.com)

