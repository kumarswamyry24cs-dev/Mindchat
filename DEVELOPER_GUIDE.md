# Developer Guide - Not A Real Doctor

This guide provides information for developers who want to contribute to or modify the Not A Real Doctor mental health chatbot application.

## Development Environment Setup

1. **Prerequisites**
   - Node.js (v16 or newer)
   - npm or yarn
   - Git

2. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd not-a-real-doctor
   npm install
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```
   The application will be available at http://localhost:3000

## Project Architecture

### Frontend Structure
- **Next.js App Router**: The project uses Next.js with the App Router pattern
- **React Components**: Modular component structure in `/src/components`
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Lucide React**: Icon library for UI elements

### Key Files and Directories

```
/src
  /app
    /api
      /chat
        route.ts       # API endpoint for chat functionality
    layout.tsx         # Root layout with theme provider
    page.tsx           # Main application page
  /components
    /chat
      chat-container.tsx  # Main chat component
      chat-input.tsx      # User input component
      chat-message.tsx    # Individual message component
      typing-indicator.tsx # Loading animation
    /ui
      theme-toggle.tsx    # Dark/light mode toggle
    header.tsx            # App header component
    loading-screen.tsx    # Initial loading animation
  /lib
    utils.ts             # Utility functions
  /styles
    globals.css          # Global styles and Tailwind imports
```

## Modifying the UI

### Changing the Theme
The color scheme is primarily defined using Tailwind CSS classes. To change the theme:

1. Modify color classes in components (e.g., from `blue-400` to `purple-400`)
2. Update gradient backgrounds in `page.tsx` and other components
3. Adjust the dark mode colors with `dark:` prefixed classes

### Adding New Decorative Elements
To add new decorative elements to the floating icons:

1. Import the desired icon from Lucide React in `page.tsx`
2. Add a new positioned div in the `FloatingElements` component
3. Apply appropriate positioning, animations, and responsive classes

Example:
```jsx
<div className="fixed left-[10%] top-[40%] hidden lg:block">
  <NewIcon className="h-10 w-10 text-blue-400/40 dark:text-blue-400/30 animate-float" />
  <div className="mt-2 text-xs text-blue-500/70 dark:text-blue-400/50 font-semibold">
    Motivational Text
  </div>
</div>
```

### Responsive Design Modifications
The application uses Tailwind's responsive modifiers:
- `sm:` - Small screens (640px and up)
- `md:` - Medium screens (768px and up)
- `lg:` - Large screens (1024px and up)

To modify responsive behavior, adjust these classes in the components.

## Chat Functionality

### API Implementation
The chat API is implemented in `/app/api/chat/route.ts`. To modify the chat behavior:

1. Update the API handler to implement your desired chat logic
2. Ensure it returns responses in the expected format: `{ message: string }`

### Customizing Chat Behavior
To modify how the chat works:

1. Edit `chat-container.tsx` to change message handling
2. Adjust the typing indicator behavior or timing
3. Modify the message display in `chat-message.tsx`

## Adding New Features

### Authentication
To add user authentication:
1. Implement authentication using Next.js authentication patterns
2. Create login/signup components
3. Add user state management
4. Modify the chat container to associate messages with users

### Persistent Chat History
To implement chat persistence:
1. Set up a database connection (e.g., MongoDB, Supabase)
2. Create data models for conversations and messages
3. Modify the chat container to load and save messages
4. Add conversation management UI

## Testing

### Running Tests
```bash
npm test
```

### Adding Tests
1. Create test files alongside components with `.test.tsx` extension
2. Write tests using React Testing Library and Jest
3. Test key functionality like message sending and UI interactions

## Building for Production

```bash
npm run build
npm start
```

The production build will be optimized for performance and ready for deployment.

## Deployment

The application can be deployed to various platforms:

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Other Platforms
Follow standard Next.js deployment procedures for your chosen platform.

## Best Practices

1. Maintain the component structure and naming conventions
2. Follow the established styling patterns with Tailwind CSS
3. Keep animations performant by using hardware-accelerated properties
4. Ensure accessibility is maintained when making UI changes
5. Document any significant changes or new features 