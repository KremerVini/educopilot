# Design Guidelines: Co-Piloto Educacional

## Design Approach

**Selected Approach:** Design System-Based (Material Design principles adapted for educational context)

**Justification:** This is a data-rich, utility-focused dashboard application where clarity, efficiency, and professional presentation are paramount. Teachers need quick access to insights, metrics, and tools without visual distraction. Material Design's emphasis on clear hierarchy, elevation, and structured layouts aligns perfectly with displaying complex educational data while maintaining a modern, approachable aesthetic.

**Key Design Principles:**
- Clarity over decoration: Information hierarchy guides every decision
- Purposeful elevation: Cards and surfaces create logical groupings
- Breathing room: Generous spacing prevents cognitive overload
- Accessible interactions: Large touch targets, clear states, readable text

---

## Typography System

**Font Stack:**
- Primary: Inter (via Google Fonts) - excellent readability for data and metrics
- Monospace: JetBrains Mono - for displaying timestamps, statistics

**Type Scale:**
- Hero/Dashboard Title: text-4xl font-bold (36px)
- Section Headers: text-2xl font-semibold (24px)
- Card Titles: text-lg font-semibold (18px)
- Body Text: text-base (16px) - primary content, descriptions
- Metrics/Data: text-3xl font-bold for primary numbers, text-sm for labels
- Small Text/Captions: text-sm (14px)
- Micro Labels: text-xs (12px) - timestamps, metadata

**Weight Hierarchy:**
- font-bold: Primary metrics, important CTAs, dashboard headers
- font-semibold: Card titles, section headers, navigation items
- font-medium: Active states, emphasized body text
- font-normal: Standard body copy, descriptions

---

## Layout System

**Spacing Primitives:** Use Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24

**Common Patterns:**
- Page padding: px-6 py-8 (mobile), px-8 py-12 (desktop)
- Card padding: p-6
- Section spacing: space-y-8 between major sections
- Component gaps: gap-4 (grids), gap-6 (card groups)
- Element spacing: mb-2 (tight groupings), mb-4 (related elements), mb-8 (section breaks)

**Container Strategy:**
- Dashboard container: max-w-7xl mx-auto
- Content width: Full width with responsive grid
- Form containers: max-w-2xl for optimal input experience
- Modal dialogs: max-w-3xl

**Grid Systems:**
- Dashboard metrics: grid-cols-1 md:grid-cols-2 lg:grid-cols-4 (stat cards)
- Main content area: grid-cols-1 lg:grid-cols-3 (2/3 main content + 1/3 sidebar)
- Lesson plan cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Engagement insights: grid-cols-1 md:grid-cols-2

---

## Component Library

### Navigation & Header
**Top Navigation Bar:**
- Fixed header with shadow-sm elevation
- Logo + app name (left), main nav items (center), user profile dropdown (right)
- Height: h-16
- Navigation items with px-4 py-2 spacing, hover and active states with subtle background changes

### Dashboard Layout
**Sidebar Navigation (Desktop):**
- Width: w-64, fixed left position
- Navigation items: py-3 px-4 with rounded-lg on active state
- Icon + label pattern (gap-3)
- Sections separated by dividers with py-2 spacing

**Main Content Area:**
- Responsive grid adapting from single column to multi-column
- Breathing room: p-6 to p-8 depending on viewport

### Card Components
**Metric Cards:**
- Rounded corners: rounded-xl
- Elevation: shadow-md with hover:shadow-lg transition
- Padding: p-6
- Structure: Icon/emoji (top), large metric number, small label beneath
- Border: subtle border border-opacity-10

**Lesson Plan Cards:**
- Same rounded-xl and shadow treatment
- Header section with title + metadata (date, grade level)
- Content preview with line-clamp-3
- Footer with action buttons (Edit, View, Export)
- Spacing: internal gap-4 between sections

**Engagement Insight Cards:**
- Similar elevation and rounding
- Chart/visualization area (h-48 to h-64)
- Title, data visualization, interpretation text
- Action suggestions in list format with gap-2

### Forms & Inputs
**Input Fields:**
- Height: h-12 for text inputs
- Padding: px-4 py-3
- Border: rounded-lg with focus ring
- Labels: text-sm font-medium mb-2
- Helper text: text-xs mt-1

**Lesson Plan Generator Form:**
- Multi-step wizard with progress indicator (top)
- Step container: max-w-2xl mx-auto
- Field grouping: space-y-6
- Buttons: Full width on mobile, auto width on desktop (px-8 py-3)

### Data Visualization
**Charts & Graphs:**
- Container: bg-white p-4 rounded-lg
- Height: h-64 for primary charts, h-48 for secondary
- Legends: text-sm with gap-4 between items
- Grid lines: subtle opacity for readability

**Sentiment Indicators:**
- Badge-style displays: rounded-full px-3 py-1 text-sm font-medium
- Icon + text pattern with gap-2
- Size variants: text-xs for compact, text-sm for standard

### Buttons & Actions
**Primary Actions:**
- Rounded: rounded-lg
- Padding: px-6 py-3 (large), px-4 py-2 (standard)
- Font: text-base font-semibold
- Focus ring for accessibility

**Secondary Actions:**
- Same size/shape with border variant
- Icon buttons: p-2 rounded-lg for compact actions

**Floating Action Button (FAB):**
- Fixed bottom-right: bottom-8 right-8
- Size: w-14 h-14 rounded-full shadow-lg
- For quick "Create Lesson Plan" access

### Modals & Overlays
**Modal Dialogs:**
- Backdrop: fixed inset-0 with subtle overlay
- Content: max-w-3xl with rounded-2xl
- Padding: p-8
- Header, body (space-y-4), footer button group

**Toast Notifications:**
- Fixed top-right: top-4 right-4
- Width: w-96 max-w-full
- Padding: p-4 rounded-lg shadow-xl
- Auto-dismiss with progress indicator

### Lists & Tables
**Activity Lists:**
- Divided layout with border-b between items
- Each item: py-4 px-4 hover:bg-opacity-50 transition
- Left: icon/avatar, middle: content, right: metadata/actions

**Data Tables:**
- Responsive with horizontal scroll on mobile
- Header: font-semibold text-sm
- Rows: py-3 px-4 hover states
- Striped pattern for long tables

---

## Special Components

### Dashboard Overview Section
- Welcome banner: Full width, p-8, rounded-xl, with greeting + quick stats
- Metric grid below: 4-column responsive grid with key numbers
- Quick actions: Horizontal scroll on mobile, grid on desktop

### Engagement Analysis Panel
- Split layout: Chart visualization (left 60%), insights list (right 40%)
- AI-generated suggestions in bulleted list with checkboxes
- Refresh button to regenerate suggestions

### Emotional Feedback Display
- Timeline view with student responses
- Each response: card with sentiment badge, text preview, expand option
- Filter controls at top: dropdown selects for date range, sentiment type

### Export Functionality
- Dropdown menu with format options (PDF, Excel)
- Preview modal before final export
- Download progress indicator

---

## Animations & Transitions

**Minimal Motion Approach:**
- Card hover: subtle shadow increase (transition-shadow duration-200)
- Page transitions: fade-in opacity (duration-300)
- Loading states: pulse animation on skeleton screens
- No scroll-based animations, no parallax effects
- Data updates: gentle fade transition, no dramatic animations

---

## Images

**Hero Section:** No large hero image - dashboard applications prioritize immediate functionality over marketing imagery

**Supporting Images:**
- Avatar placeholders for teacher profiles (w-10 h-10 rounded-full)
- Empty state illustrations (max-w-sm) for blank dashboards or no data scenarios
- Small icons/emojis for metric cards and categories (w-12 h-12)
- Thumbnail previews for saved lesson plans if applicable (aspect-ratio-16/9, rounded-lg)

**Icon Strategy:** Use Heroicons throughout for consistency - outline style for navigation, solid style for emphasis