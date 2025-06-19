

# Linkly.io

**Capture Every Link That Inspires, Informs, or Matters to You.**

Linkly is a full-stack web application designed to help users save, organize, and manage useful internet links efficiently. From bookmarks to tools, Linkly keeps everything structured and easily accessible.

---

## ✨ Features

- 🔐 **Authentication** – Secure login/logout using Spring Security and JWT.
- 💾 **Save Links** – Store links with titles and descriptions.
- ✏️ **Edit/Delete Links** – Manage your saved resources effortlessly.
- 🔎 **Search & Filter** – Quickly find what you’re looking for.
- 📱 **Responsive UI** – Sleek and modern interface that adapts across devices.
- 🧑‍💻 **User-Specific Links** – Each user has access only to their own links.

---

## 🚀 Tech Stack

### Frontend
- [React.js](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Lucide Icons](https://lucide.dev/)

### Backend
- [Spring Boot](https://spring.io/projects/spring-boot)
- [Spring Security](https://spring.io/projects/spring-security) with JWT
- [Spring Data JPA](https://spring.io/projects/spring-data-jpa)
- [PostgreSQL](https://www.postgresql.org/)
- [Maven](https://maven.apache.org/) for dependency management

---

## 📦 Installation

### Prerequisites
- Node.js and npm
- Java 17+ and Maven
- PostgreSQL running locally

---
 ## Screenshots
 ![image](https://github.com/user-attachments/assets/9ece2a53-32b5-4226-a38f-b3a73a54dc49)

![image](https://github.com/user-attachments/assets/0c28b3de-9fbc-435a-8c1e-fb66de4ae698)

--- 


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
