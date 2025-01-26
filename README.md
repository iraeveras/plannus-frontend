This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
```
src/
├── app/
│   ├── (public)/              # Páginas públicas
│   │   ├── landing/           # Landing page
│   │   │   ├── page.tsx
│   │   │   └── components/
│   │   ├── login/             # Página de login
│   │   │   └── page.tsx
│   │   └── register/          # Página de registro (se necessário)
│   │       └── page.tsx
│   ├── (private)/             # Páginas privadas (acesso autenticado)
│   │   ├── companies/
│   │   │   ├── new/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── dashboard/         # Página inicial do sistema
│   │   │   └── page.tsx
│   │   ├── employees/
│   │   │   └── page.tsx
│   │   ├── premises/
│   │   │   ├── edit/
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   ├── new/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── settings/
│   │   │   └── page.tsx       # Configurações do sistema
│   │   ├── layout.tsx         # Layout privado compartilhado
│   │   ├── metadata.ts        # Metadados específicos do sistema autenticado
│   │   └── page.tsx           # Página inicial autenticada (se necessário)
│   ├── globals.css            # Estilo global
│   ├── layout.tsx             # Layout global compartilhado (Landing/Login)
│   └── page.tsx               # Página inicial para visitantes
├── components/
│   ├── ui/                    # Componentes de interface reutilizáveis
│   ├── public/                # Componentes específicos para páginas públicas
│   │   ├── hero.tsx           # Componente para landing page
│   │   └── features.tsx       # Destaques ou funcionalidades da landing page
│   ├── private/               # Componentes específicos para páginas autenticadas
│   │   ├── sidebar.tsx        # Sidebar do sistema
│   │   └── header.tsx         # Header do sistema autenticado
│   ├── forms/                 # Componentes específicos de formulários
│   │   ├── input-form.tsx
│   │   └── select-form.tsx
│   ├── data-display/          # Componentes para exibição de dados
│   │   ├── data-table.tsx
│   │   └── card.tsx
│   ├── notifications/         # Toasts, modais, etc.
│   │   ├── toast.tsx
│   │   └── toaster.tsx
│   └── layout/                # Componentes de layout genéricos
│       ├── breadcrumb.tsx
│       ├── button.tsx
│       ├── collapsible.tsx
│       ├── dropdown-menu.tsx
│       └── separator.tsx
├── context/                   # Gerenciadores de estado compartilhados
│   ├── auth-context.tsx       # Contexto de autenticação
│   ├── theme-context.tsx      # Contexto de tema
│   └── sidebar-context.tsx    # Controle do estado do sidebar
├── hooks/
│   ├── use-mobile.tsx         # Hook para detectar dispositivos móveis
│   ├── use-toast.ts           # Hook para exibir toasts
│   └── use-auth.tsx           # Hook para verificar estado de autenticação
├── lib/
│   ├── api.ts                 # Configurações da API
│   ├── auth.ts                # Métodos auxiliares de autenticação (e.g., JWT parsing)
│   └── utils.ts               # Funções utilitárias
├── middleware/                # Middlewares do Next.js para controle de acesso
│   └── auth.ts                # Middleware para autenticação
└── utils/                     # Funções auxiliares (não específicas do domínio)
    ├── format-date.ts
    ├── validators.ts
    └── constants.ts
```

