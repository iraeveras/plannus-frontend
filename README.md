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
│   ├── (public)/               # Acesso público
│   │      └── 
│   ├── login/                  # Página de login
│   │   └── page.tsx
│   └── (private)/              # Acesso autenticado
│       ├── dashboard/          # Página inicial (admin, manager, supervisor, user)
│       │   └── page.tsx
│       ├── (admin)/            # Rotas exclusivas para admin
│       │   ├── companies/      # Rota companies
│       │   │   ├── new/
│       │   │   │   └── page.tsx
│       │   │   └── page.tsx
│       │   ├── premises/       # Rota premises
│       │   │   ├── edit/
│       │   │   │   └── [id]/
│       │   │   │       └── page.tsx
│       │   │   ├── new/
│       │   │   │    └── page.tsx
│       │   │   └── page.tsx
│       │   ├── employees/      # Rota employees
│       │   │   └── page.tsx
│       │   ├── reports/        # Rota para relatorios
│       │   │   └── page.tsx
│       │   ├── settings/       # Configurações globais (e.g., permissões)
│       │   │   └── page.tsx
│       │   └── layout.tsx      # Layout exclusivo para admin
│       ├── (manager)/          # Rotas exclusivas para managers
│       │   ├── teams/
│       │   │   └── page.tsx
│       │   ├── reports/
│       │   │   └── page.tsx
│       │   └── layout.tsx
│       ├── (supervisor)/       # Rotas exclusivas para supervisores
│       │   ├── team/
│       │   │   └── page.tsx
│       │   └── layout.tsx
│       ├── (user)/             # Rotas exclusivas para usuários comuns
│       │   ├── profile/
│       │   │   └── page.tsx
│       │   ├── dashboard/
│       │   │   └── page.tsx
│       │   └── layout.tsx
│       ├── layout.tsx          # Layout padrão compartilhado entre todas as rotas autenticadas
│       ├── metadata.ts         # Metadados globais
│       └── page.tsx            # Landing page (rota raiz) pública.
├── components/
│   ├── ui/                     # Componentes de interface reutilizáveis
│   │   ├── avatar.tsx
│   │   ├── button.tsx
│   │   ├── form.tsx
│   │   ├── input.tsx
│   │   ├── toast.tsx
│   │   └── tooltip.tsx
│   ├── navigation/             # Componentes de navegação
│   │   ├── sidebar.tsx         # Sidebar principal
│   │   ├── nav-admin.tsx       # Navegação exclusiva para admin
│   │   ├── nav-manager.tsx     # Navegação exclusiva para managers
│   │   ├── nav-supervisor.tsx  # Navegação exclusiva para supervisores
│   │   └── nav-user.tsx        # Navegação para usuários comuns
│   ├── auth/                   # Componentes de autenticação
│   │   ├── login-form.tsx
│   │   └── register-form.tsx
│   ├── data/                   # Componentes relacionados a dados
│   │   ├── data-table.tsx
│   │   ├── card.tsx
│   │   └── chart.tsx
│   └── layout/                 # Componentes de layout
│       ├── breadcrumb.tsx
│       ├── header.tsx
│       └── separator.tsx
├── middleware/
│   ├── auth.ts                # Middleware de autenticação (Next.js Middleware API)
│   └── permission.ts          # Middleware para verificar permissões (admin/manager/supervisor/user)
├── context/
│   ├── AuthContext.tsx        # Gerencia autenticação do usuário (JWT, perfil)
│   ├── PermissionContext.tsx  # Gerencia permissões (admin, manager, etc.)
│   └── SidebarContext.tsx     # Estado do sidebar (colapsado ou expandido)
├── hooks/
│   ├── use-auth.ts            # Hook para acessar o contexto de autenticação
│   ├── use-permissions.ts     # Hook para verificar permissões
│   ├── use-toast.ts           # Hook para exibir toasts
│   └── use-sidebar.ts         # Hook para gerenciar o estado do sidebar
├── lib/
│   ├── api-client.ts          # Configuração do cliente Axios
│   ├── token.ts               # Manipulação de tokens JWT
│   └── utils.ts               # Funções auxiliares
├── utils/
│   ├── format-date.ts         # Formatação de datas
│   ├── validators.ts          # Funções de validação (e.g., validação de e-mails)
│   └── constants.ts           # Constantes globais
```

