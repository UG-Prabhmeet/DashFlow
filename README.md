# 🌊 DashFlow

**DashFlow** is a modern, high-performance project management application designed for agile teams. It features a robust Kanban board, comprehensive sprint management, and organization-wide Role-Based Access Control (RBAC).

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Clerk](https://img.shields.io/badge/Clerk-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)](https://clerk.com/)

---

## ✨ Key Features

-   📊 **Dynamic Kanban Boards**: Seamless drag-and-drop task management powered by `@hello-pangea/dnd`.
-   🏃 **Sprint Management**: Plan, execute, and complete sprints to maintain a steady development pace.
-   🛡️ **Organization-Wide RBAC**: Secure project access with Clerk-powered authentication and custom permissions.
-   📝 **Markdown Editor**: Rich issue descriptions with real-time preview using `@uiw/react-md-editor`.
-   📈 **Analytics & Reporting**: Visual insights into project progress and team velocity.
-   🔔 **Activity Streams**: Stay updated with real-time project activities and mention highlights.
-   🌓 **Dark Mode Support**: Aesthetic and accessible UI with automatic theme switching.
-   📄 **Export Tools**: Export project data to PDF or CSV for external reporting.

## 🚀 Tech Stack

-   **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
-   **Database**: [PostgreSQL](https://www.postgresql.org/) with [Prisma ORM](https://www.prisma.io/)
-   **Authentication**: [Clerk](https://clerk.com/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
-   **Form Handling**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
-   **Components**: Radix UI, Lucide Icons, Recharts

---

## 🛠️ Getting Started

### Prerequisites

-   Node.js (v18 or higher)
-   PostgreSQL Database
-   Clerk Account

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/dashflow.git
    cd dashflow
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Set up environment variables**:
    Create a `.env` file in the root directory and add the following:
    ```env
    DATABASE_URL="postgresql://user:password@localhost:5432/dashflow"
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
    CLERK_SECRET_KEY=your_secret_key
    ```

4.  **Sync Database**:
    ```bash
    npx prisma db push
    ```

5.  **Run the development server**:
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📂 Project Structure

```text
├── actions/        # Server Actions (Mutations & Logic)
├── app/            # Next.js App Router (Pages & Layouts)
├── components/      # Reusable UI Components
├── hooks/          # Custom React Hooks
├── lib/            # Shared Library Functions & Utilities
├── prisma/         # Database Schema & Migrations
├── public/         # Static Assets
└── utils/          # Helper Functions
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Developed with ❤️ for agile teams.
