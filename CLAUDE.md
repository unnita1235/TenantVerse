# CLAUDE.md - AI Assistant Development Guide

**Project**: TenantVerse
**Last Updated**: 2025-12-09
**Purpose**: Comprehensive guide for AI assistants working on this codebase

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Architecture & Patterns](#architecture--patterns)
4. [Directory Structure](#directory-structure)
5. [Naming Conventions](#naming-conventions)
6. [Development Workflows](#development-workflows)
7. [Code Patterns & Best Practices](#code-patterns--best-practices)
8. [AI-Specific Features](#ai-specific-features)
9. [Common Tasks](#common-tasks)
10. [Gotchas & Known Issues](#gotchas--known-issues)

---

## 🎯 Project Overview

**TenantVerse** is a multi-tenant SaaS property management platform built with Next.js 15, designed for landlords and tenants to manage rental properties, applications, maintenance, and payments.

### Current State
- **Phase**: Early development (Phase 1-2)
- **Database**: Not yet implemented (using mock/placeholder data)
- **Authentication**: In progress (planned: NextAuth.js)
- **Payments**: Planned (Stripe integration)
- **Real-time**: Planned (WebSockets for notifications)

### Key Features
- Multi-tenant architecture with tenant-scoped routing
- AI-powered user guides and RBAC suggestions (Genkit + Google AI)
- Property listings management
- Tenant dashboard
- Maintenance request system
- Super admin functionality

---

## 🛠️ Tech Stack

### Core Framework
- **Next.js**: 15.3.3 (App Router with RSC)
- **React**: 18.3.1
- **TypeScript**: 5.x (strict mode enabled)
- **Node.js**: 18+ required

### Styling & UI
- **Tailwind CSS**: 3.4.1 with custom theme
- **shadcn/ui**: Component library (Radix UI primitives)
- **Lucide React**: Icon library
- **CVA**: `class-variance-authority` for component variants

### Forms & Validation
- **React Hook Form**: 7.54.2
- **Zod**: 3.24.2 (schema validation)
- **@hookform/resolvers**: 4.1.3

### AI Integration
- **Genkit**: 1.14.1 (Firebase AI framework)
- **@genkit-ai/googleai**: 1.14.1
- **Model**: `googleai/gemini-2.5-flash`

### Data & Charts
- **Recharts**: 2.15.1 (for analytics dashboards)
- **date-fns**: 3.6.0 (date manipulation)

### DevOps & Deployment
- **Vercel**: Hosting platform
- **Turbopack**: Dev server (--turbopack flag)
- **Port**: 9002 (custom dev port)

---

## 🏗️ Architecture & Patterns

### Multi-Tenant Routing

```
/t/[tenant]/           # Tenant-scoped routes
/t/[tenant]/dashboard  # Tenant dashboard
/t/[tenant]/billing    # Billing page
/t/[tenant]/settings   # Settings page
/t/[tenant]/team       # Team management
/t/[tenant]/guides     # AI-generated guides
```

**Pattern**: Dynamic segment `[tenant]` is extracted via `params` and validated in each page.

### Route Groups

```
(auth)/         # Authentication pages (login, signup)
(dashboard)/    # Protected dashboard routes
super-admin/    # Super admin functionality
```

**Purpose**: Organize routes without affecting URL structure.

### Server vs Client Components

**Default**: All components are Server Components (RSC) unless marked with `"use client"`.

**Pattern**:
```tsx
// page.tsx (Server Component)
export default async function Page({ params }: { params: Promise<{ tenant?: string }> }) {
  const { tenant } = await params;
  return <ClientComponent tenant={tenant} />;
}

// client-component.tsx (Client Component)
"use client";
export default function ClientComponent({ tenant }: { tenant: string }) {
  // Interactive logic here
}
```

### Server Actions

**Pattern**: Mark AI flows and data mutations with `"use server"`.

```tsx
// src/ai/flows/personalized-user-guide-generation.ts
'use server';

export async function generatePersonalizedUserGuide(
  input: PersonalizedUserGuideInput
): Promise<PersonalizedUserGuideOutput> {
  return personalizedUserGuideFlow(input);
}
```

---

## 📁 Directory Structure

```
TenantVerse/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (auth)/               # Auth route group
│   │   │   ├── login/page.tsx
│   │   │   ├── signup/page.tsx
│   │   │   └── layout.tsx
│   │   ├── t/[tenant]/           # Tenant-scoped routes
│   │   │   ├── components/       # Tenant dashboard components
│   │   │   │   ├── dashboard-header.tsx
│   │   │   │   ├── dashboard-nav.tsx
│   │   │   │   └── user-nav.tsx
│   │   │   ├── billing/page.tsx
│   │   │   ├── guides/page.tsx
│   │   │   ├── settings/page.tsx
│   │   │   ├── team/
│   │   │   │   ├── page.tsx
│   │   │   │   └── onboard/page.tsx
│   │   │   ├── dashboard-client.tsx
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── super-admin/          # Super admin routes
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Landing page
│   │   ├── globals.css           # Global styles
│   │   └── favicon.ico
│   ├── ai/                       # AI flows and Genkit config
│   │   ├── flows/
│   │   │   ├── personalized-user-guide-generation.ts
│   │   │   └── team-onboarding-assistance.ts
│   │   ├── genkit.ts             # Genkit instance config
│   │   └── dev.ts                # Genkit dev server
│   ├── components/               # Shared React components
│   │   ├── ui/                   # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── form.tsx
│   │   │   ├── sidebar.tsx
│   │   │   └── ... (30+ components)
│   │   └── logo.tsx
│   ├── hooks/                    # Custom React hooks
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   ├── lib/                      # Utility functions
│   │   ├── utils.ts              # cn() helper
│   │   ├── actions.ts            # Server actions
│   │   ├── placeholder-images.ts
│   │   └── placeholder-images.json
│   └── types/                    # TypeScript types (future)
├── public/                       # Static assets
│   └── screenshots/
├── docs/                         # Documentation
│   └── blueprint.md
├── .idx/                         # Project IDX config
│   ├── dev.nix
│   └── icon.png
├── .gitignore
├── package.json
├── tsconfig.json                 # TypeScript config
├── tailwind.config.ts            # Tailwind config
├── next.config.ts                # Next.js config
├── postcss.config.mjs
└── README.md
```

---

## 📝 Naming Conventions

### Files & Folders

| Type | Pattern | Example |
|------|---------|---------|
| Pages | `page.tsx` | `src/app/t/[tenant]/page.tsx` |
| Layouts | `layout.tsx` | `src/app/t/[tenant]/layout.tsx` |
| Components | `kebab-case.tsx` | `dashboard-header.tsx` |
| UI Components | `kebab-case.tsx` | `button.tsx`, `alert-dialog.tsx` |
| Hooks | `use-*.ts(x)` | `use-mobile.tsx`, `use-toast.ts` |
| Utils | `kebab-case.ts` | `utils.ts`, `placeholder-images.ts` |
| AI Flows | `kebab-case.ts` | `personalized-user-guide-generation.ts` |
| Types | `PascalCase` | `PersonalizedUserGuideInput` |

### Components

- **File names**: kebab-case (e.g., `dashboard-nav.tsx`)
- **Component names**: PascalCase (e.g., `DashboardNav`)
- **Props interfaces**: `{ComponentName}Props` (if needed)

### Functions & Variables

- **Functions**: camelCase (e.g., `generatePersonalizedUserGuide`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_FILE_SIZE`)
- **Variables**: camelCase (e.g., `tenantName`, `userRole`)

### CSS Classes

- **Tailwind**: Use `cn()` utility for conditional classes
- **Custom classes**: kebab-case with BEM-like structure if needed

---

## 🔧 Development Workflows

### Starting Development

```bash
# Install dependencies
npm install

# Start dev server (port 9002 with Turbopack)
npm run dev

# Start Genkit dev server (AI flows testing)
npm run genkit:dev

# Watch mode for Genkit
npm run genkit:watch

# Type checking
npm run typecheck

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

### Adding shadcn/ui Components

```bash
# Components are already installed, but to add new ones:
# (Install shadcn CLI first if not available)
npx shadcn@latest add [component-name]
```

Example: `npx shadcn@latest add dropdown-menu`

### Working with AI Flows

1. **Create flow**: Add new file in `src/ai/flows/`
2. **Define schema**: Use Zod schemas for input/output
3. **Export function**: Mark with `'use server'`
4. **Test**: Run `npm run genkit:dev` and test in Genkit UI

### Path Aliases

Use `@/*` to reference `src/*`:

```tsx
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ai } from "@/ai/genkit";
```

---

## 💡 Code Patterns & Best Practices

### 1. Component Structure

**Server Component (default)**:
```tsx
// src/app/t/[tenant]/billing/page.tsx
export default async function BillingPage({
  params
}: {
  params: Promise<{ tenant: string }>
}) {
  const { tenant } = await params;

  // Fetch data, async operations

  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```

**Client Component** (interactive):
```tsx
// src/app/t/[tenant]/dashboard-client.tsx
"use client";

import { useState } from "react";

export default function DashboardClient({ tenant }: { tenant: string }) {
  const [state, setState] = useState();

  return (
    <div>
      {/* Interactive JSX */}
    </div>
  );
}
```

### 2. Form Handling

```tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
});

export function MyForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", name: "" },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
```

### 3. Styling with Tailwind

**Use the `cn()` utility**:
```tsx
import { cn } from "@/lib/utils";

<div className={cn(
  "base-class",
  condition && "conditional-class",
  variant === "primary" && "primary-class"
)} />
```

### 4. AI Flow Pattern

```tsx
// src/ai/flows/my-flow.ts
'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const InputSchema = z.object({
  field: z.string().describe('Description for AI'),
});
export type Input = z.infer<typeof InputSchema>;

const OutputSchema = z.object({
  result: z.string(),
});
export type Output = z.infer<typeof OutputSchema>;

export async function myAiFunction(input: Input): Promise<Output> {
  return myFlow(input);
}

const prompt = ai.definePrompt({
  name: 'myPrompt',
  input: { schema: InputSchema },
  output: { schema: OutputSchema },
  prompt: `Your prompt template here: {{{field}}}`,
});

const myFlow = ai.defineFlow(
  {
    name: 'myFlow',
    inputSchema: InputSchema,
    outputSchema: OutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
```

### 5. Async Params Handling

**IMPORTANT**: In Next.js 15, `params` is a Promise and must be awaited.

```tsx
// ✅ Correct
export default async function Page({ params }: { params: Promise<{ tenant: string }> }) {
  const { tenant } = await params;
  // Use tenant
}

// ❌ Incorrect (old pattern)
export default function Page({ params }: { params: { tenant: string } }) {
  const { tenant } = params; // Will break
}
```

### 6. Tenant Validation

Always validate tenant params:

```tsx
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ tenant?: string }> }) {
  const { tenant } = await params;

  if (!tenant || typeof tenant !== "string") {
    notFound();
  }

  // Continue with valid tenant
}
```

### 7. Image Configuration

Remote images must be configured in `next.config.ts`:

```tsx
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'placehold.co',
      pathname: '/**',
    },
    // Add more as needed
  ],
}
```

---

## 🤖 AI-Specific Features

### Genkit Configuration

**Location**: `src/ai/genkit.ts`

```tsx
import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.5-flash',
});
```

### Available AI Flows

#### 1. Personalized User Guide Generation

**File**: `src/ai/flows/personalized-user-guide-generation.ts`

**Purpose**: Generates tailored user guides and onboarding flows based on:
- Tenant name
- User role (Owner, Admin, Member)
- Permission settings
- Expected app usage

**Usage**:
```tsx
import { generatePersonalizedUserGuide } from '@/ai/flows/personalized-user-guide-generation';

const result = await generatePersonalizedUserGuide({
  tenantName: "Acme Corp",
  userRole: "Admin",
  permissionSettings: "Full access to billing and team management",
  expectedAppUsage: "Manage team subscriptions and billing"
});

// result.userGuide - personalized guide text
// result.onboardingFlow - onboarding steps
```

#### 2. Team Onboarding RBAC Assistance

**File**: `src/ai/flows/team-onboarding-assistance.ts`

**Purpose**: Suggests appropriate RBAC roles for team members based on:
- Team member profiles
- Expected app usage

**Usage**:
```tsx
import { suggestRbacRoles } from '@/ai/flows/team-onboarding-assistance';

const result = await suggestRbacRoles({
  teamMemberProfiles: [
    "CEO, needs full access",
    "Developer, needs code access",
    "Designer, needs design tools"
  ],
  expectedAppUsage: "Collaborative product development"
});

// result.suggestedRoles - array of role suggestions
```

### Adding New AI Flows

1. Create file in `src/ai/flows/`
2. Use `'use server'` directive
3. Define Zod schemas for input/output
4. Export async function
5. Use `ai.definePrompt()` and `ai.defineFlow()`
6. Test with `npm run genkit:dev`

---

## ✅ Common Tasks

### Adding a New Page

1. **Create page file**:
   ```tsx
   // src/app/t/[tenant]/my-page/page.tsx
   export default async function MyPage({ params }: { params: Promise<{ tenant: string }> }) {
     const { tenant } = await params;
     return <div>My Page for {tenant}</div>;
   }
   ```

2. **Add navigation link** (if needed):
   ```tsx
   // src/app/t/[tenant]/components/dashboard-nav.tsx
   // Add to navigation items
   ```

### Adding a New Component

1. **Create component file**:
   ```tsx
   // src/components/my-component.tsx
   export function MyComponent() {
     return <div>Component</div>;
   }
   ```

2. **Import and use**:
   ```tsx
   import { MyComponent } from "@/components/my-component";
   ```

### Adding a shadcn/ui Component

```bash
npx shadcn@latest add tooltip
```

This adds the component to `src/components/ui/tooltip.tsx`.

### Styling Adjustments

**Global styles**: Edit `src/app/globals.css`

**Theme colors**: Edit CSS variables in `globals.css` or Tailwind config:
```css
/* src/app/globals.css */
:root {
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  /* ... */
}
```

**Tailwind theme**: Edit `tailwind.config.ts`:
```tsx
theme: {
  extend: {
    colors: {
      // Custom colors
    },
  },
}
```

### Type Safety

Always define types for:
- Component props
- Function parameters
- API responses (when implemented)
- Zod schemas for forms and AI flows

Example:
```tsx
interface MyComponentProps {
  title: string;
  count: number;
  optional?: boolean;
}

export function MyComponent({ title, count, optional }: MyComponentProps) {
  // ...
}
```

---

## ⚠️ Gotchas & Known Issues

### 1. Build Errors Ignored

**Config**: `next.config.ts`
```tsx
typescript: {
  ignoreBuildErrors: true, // ⚠️ Temporary during development
},
eslint: {
  ignoreDuringBuilds: true, // ⚠️ Temporary during development
}
```

**Action**: Fix TypeScript errors before production. These should be set to `false` for production builds.

### 2. "use client" Placement

**Issue**: `"use client"` must be at the very top of the file, before any imports.

```tsx
// ✅ Correct
"use client";

import { useState } from "react";

// ❌ Incorrect
import { useState } from "react";
"use client"; // Too late!
```

**Recent Fix**: `dashboard-client.tsx` was created to separate client logic from server component `page.tsx` (see commit: f687c13).

### 3. Async Params in Next.js 15

**Issue**: `params` is now a Promise in Next.js 15.

```tsx
// ✅ Correct
const { tenant } = await params;

// ❌ Incorrect
const { tenant } = params; // Type error
```

### 4. No Database Yet

**Current State**: All data is mocked/placeholder.

**Files**:
- `src/lib/placeholder-images.ts`
- `src/lib/placeholder-images.json`

**Action**: When adding database integration:
1. Set up Prisma schema
2. Replace placeholder data with real queries
3. Add environment variables for `DATABASE_URL`

### 5. Environment Variables

**Missing**: `.env.example` file doesn't exist yet.

**When added**:
```bash
# Database
DATABASE_URL="postgresql://..."

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret"

# AI (Genkit/Google AI)
GOOGLE_AI_API_KEY="your-key"

# File Upload
CLOUDINARY_URL="cloudinary://..."
```

### 6. Port Configuration

**Dev server runs on port 9002** (not default 3000):
```json
"dev": "next dev --turbopack -p 9002"
```

### 7. Module Type

**package.json**:
```json
"type": "module"
```

This means all `.js` files are treated as ES modules. Use `.mjs` for explicit ES modules or `.cjs` for CommonJS.

### 8. Genkit Directory Ignored

**gitignore**:
```
.genkit/*
```

The `.genkit/` directory contains Genkit cache/state and should not be committed.

### 9. Firebase Dependencies

**Installed but not configured**:
- `firebase: ^11.9.1`
- `genkit` uses Firebase internally

**Note**: No `firebase.json` or Firebase project config exists yet. If using Firebase hosting/functions, configure before deployment.

---

## 🎨 Design System

### Theme

**Fonts**:
- Body: Inter (sans-serif)
- Headline: Space Grotesk (sans-serif)
- Code: monospace

**Colors**: CSS variable-based system (see `globals.css`)
- Primary, secondary, accent, destructive
- Muted, border, input, ring
- Chart colors (1-5)
- Sidebar-specific colors

**Dark Mode**: Supported via `class` strategy
```tsx
darkMode: ['class']
```

Toggle dark mode by adding `dark` class to `<html>` element.

### Component Variants

shadcn/ui components use `class-variance-authority` (CVA):

```tsx
import { cva } from "class-variance-authority";

const buttonVariants = cva(
  "base-classes",
  {
    variants: {
      variant: {
        default: "default-classes",
        destructive: "destructive-classes",
      },
      size: {
        default: "default-size",
        sm: "small-size",
      },
    },
  }
);
```

---

## 🚀 Deployment

### Vercel (Current)

**Platform**: Vercel
**Command**: `npm run build`
**Start**: `npm start`

**Environment Variables**: Set in Vercel dashboard or `.env.local` for local testing.

### CI/CD

**Status**: Planned GitHub Actions integration (not yet configured).

**Recommended**:
1. Run `npm run typecheck` on PR
2. Run `npm run lint` on PR
3. Run `npm run build` on PR
4. Auto-deploy on merge to main

---

## 📚 Resources

### Documentation
- [Next.js 15 Docs](https://nextjs.org/docs)
- [React 18 Docs](https://react.dev)
- [shadcn/ui](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Genkit](https://firebase.google.com/docs/genkit)
- [Zod](https://zod.dev)
- [React Hook Form](https://react-hook-form.com)

### Internal Docs
- `README.md` - Project overview and roadmap
- `docs/blueprint.md` - Detailed project blueprint (if exists)

---

## 🔄 Migration Notes

### Upcoming Changes

1. **Database Integration**: PostgreSQL + Prisma ORM
2. **Authentication**: NextAuth.js with role-based access control
3. **Payments**: Stripe integration
4. **File Upload**: AWS S3 or Cloudinary
5. **Real-time**: WebSockets for notifications
6. **Testing**: Jest + React Testing Library

### When Database is Added

- Replace all placeholder data in `src/lib/placeholder-images.ts`
- Create `prisma/schema.prisma`
- Add migrations: `npx prisma migrate dev`
- Update all pages to fetch real data
- Add proper error handling

### When Auth is Added

- Protect routes with middleware
- Add session management
- Implement RBAC system
- Update layouts to show user info
- Add logout functionality

---

## 🤝 Contributing Patterns

### Commit Messages

Use conventional commits:
```
feat: add billing page
fix: correct tenant routing issue
docs: update CLAUDE.md
refactor: split dashboard into client component
```

### Branch Strategy

- `main`: Production-ready code
- `claude/[session-id]`: AI assistant work branches
- Feature branches: `feature/feature-name`
- Bug fixes: `fix/bug-name`

### Code Review Checklist

- [ ] TypeScript errors resolved
- [ ] No ESLint warnings
- [ ] Components properly typed
- [ ] Server/client components correctly marked
- [ ] Params properly awaited (Next.js 15)
- [ ] Tailwind classes optimized
- [ ] Accessibility considered (ARIA labels, keyboard nav)
- [ ] Mobile responsive
- [ ] Dark mode tested

---

## 📞 Support & Contact

**Author**: Unni T A
**Email**: unnita1235@gmail.com
**GitHub**: [@unnita1235](https://github.com/unnita1235)

---

**Last Updated**: 2025-12-09
**Version**: 0.1.0
**Maintainer**: Claude AI Assistant

---

## Quick Reference Commands

```bash
# Development
npm run dev                 # Start dev server (port 9002)
npm run genkit:dev         # Start Genkit AI dev server
npm run typecheck          # Check TypeScript errors
npm run lint               # Lint code

# Production
npm run build              # Build for production
npm start                  # Start production server

# AI Development
npm run genkit:watch       # Watch mode for AI flows
```

---

**Note**: This document should be updated as the project evolves. When making significant architectural changes, update this file to reflect the new patterns and conventions.
