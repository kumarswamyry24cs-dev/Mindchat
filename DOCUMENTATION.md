# Not A Real Doctor - Technical Documentation

## Project Structure

The project follows a standard Next.js application structure with React components:

- `src/app/page.tsx` - Main application page with layout and floating decorative elements
- `src/components/header.tsx` - Application header with logo and theme toggle
- `src/components/chat/chat-container.tsx` - Main chat functionality container
- `src/components/chat/chat-message.tsx` - Individual chat message component
- `src/components/chat/chat-input.tsx` - User input component for sending messages
- `src/components/chat/typing-indicator.tsx` - Animated typing indicator
- `src/components/ui/theme-toggle.tsx` - Dark/light mode toggle component
- `src/components/loading-screen.tsx` - Initial loading screen animation

## UI/UX Design

### Color Scheme
- Primary theme: Blue-based color palette
- Dark mode: Slate/blue dark theme
- Accent colors: Yellow for highlights and sparkle effects
- Text: Blue gradient for headings, slate/blue for body text

### Animations
The application uses several custom animations:
- `animate-blob` - Soft movement for background elements
- `animate-wiggle` - Subtle movement for decorative icons
- `animate-bounce-rotate` - Combined bounce and rotation
- `animate-sparkle` - Twinkling effect for highlight elements
- `animate-float` - Floating up and down motion
- `animate-fade-in-out` - Pulsing opacity for text elements
- `animate-pulse` - Standard pulsing animation

### Responsive Design
- Mobile-first approach with full-screen chat on small devices
- Desktop view with decorative elements on the sides
- Responsive layout breakpoints using Tailwind's responsive modifiers
- Hidden decorative elements on mobile for better performance and UX

## Component Details

### FloatingElements
Decorative mental health-themed icons positioned along the left and right sides of the screen:
- Only visible on large screens (lg: breakpoint)
- Positioned using fixed positioning with percentage-based locations
- Each element has an icon and optional motivational text
- Various animations applied to create visual interest

### ChatContainer
Main chat interface with:
- Message history display
- API integration for chat responses
- Loading states with typing indicator
- Auto-scrolling to latest messages
- Error handling for failed API requests

### Chat API Integration
The chat functionality connects to a backend API:
- Endpoint: `/api/chat`
- Method: POST
- Payload: `{ message: string }`
- Response: `{ message: string }`
- Simulated typing delay for natural conversation flow

## Styling Implementation

The project uses Tailwind CSS with:
- Custom gradient backgrounds
- Backdrop blur effects for header
- Subtle background patterns
- Custom animation classes
- Dark mode support with `dark:` variant classes
- Custom border styling for visual separation

## Performance Considerations

- Decorative elements hidden on mobile devices
- Animations optimized for performance
- Loading screen to manage perceived performance
- Responsive image loading
- Efficient component re-rendering

## Accessibility Features

- Semantic HTML structure
- Appropriate color contrast ratios
- Keyboard navigation support
- Screen reader friendly text alternatives
- Focus management in chat interface

## Future Enhancement Opportunities

- User authentication and conversation history
- More advanced chat AI capabilities
- Additional themes and customization options
- Voice input/output support
- Offline functionality with service workers
- Integration with mental health resources and crisis support 