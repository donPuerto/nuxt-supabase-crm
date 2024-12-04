# Nuxt Supabase CRM - Complete File Structure

## Section Explanations

### Authentication (/auth/)
This is the public authentication section
Focuses on user authentication and registration
Features include:
- User login with email/password
- Social authentication
- New user registration
- Email verification
- Password recovery
- Security checks

### Users (/dashboard/users/)
This is an admin-only section for user management
Focuses on system-level user administration
Features include:
- Creating/managing user accounts
- Assigning roles and permissions
- Managing access levels
- Viewing user activity logs
- Enabling/disabling accounts
- Managing system-wide user settings

### Profile (/dashboard/profile/@username/)
This is the personal section for each logged-in user
Focuses on individual user preferences and information
Features include:
- Personal information management
- Password changes
- Notification preferences
- UI preferences
- Personal activity history
- Communication preferences

### Leads (/dashboard/leads/)
This is the lead management section
Focuses on potential customer tracking
Features include:
- Lead capture and entry
- Lead qualification
- Lead scoring
- Status tracking
- Follow-up management
- Conversion tracking
- Activity logging
- Task assignment
- Task Integration
  - Follow-up tasks
  - Contact tasks
  - Qualification tasks
  - Auto-task creation
  - Task templates
- Calendar Integration
  - Follow-up scheduling
  - Meeting planning
  - Activity timeline
  - Reminder settings

### Customers (/dashboard/customers/)
This is the customer relationship section
Focuses on managing existing customer relationships
Features include:
- Customer profile management
- Communication history
- Purchase history
- Service records
- Document management
- Customer segmentation
- Account health tracking
- Task Integration
  - Customer service tasks
  - Account management tasks
  - Meeting schedules
  - Follow-up reminders
- Calendar Integration
  - Service appointments
  - Regular meetings
  - Follow-up scheduling
  - Availability booking

### Opportunities (/dashboard/customers/[id]/opportunities/)
This is the sales pipeline section
Focuses on potential sales tracking
Features include:
- Deal tracking
- Pipeline management
- Stage progression
- Revenue forecasting
- Win/loss analysis
- Sales activity tracking
- Competitor tracking
- Stock integration
  - Product selection from inventory
  - Stock availability checking
  - Stock reservation for opportunities
  - Custom pricing based on quantity
  - Stock allocation tracking
- Task Integration
  - Sales tasks
  - Follow-up tasks
  - Proposal tasks
  - Meeting tasks
- Calendar Integration
  - Sales meetings
  - Presentations
  - Client visits
  - Follow-up scheduling

### Quotes (/dashboard/customers/[id]/quotes/)
This is the quotation management section
Focuses on price proposals and negotiations
Features include:
- Quote generation
- Pricing management
- Revision tracking
- Approval workflows
- PDF generation
- Quote comparison
- Template management

### Inventory Management (/dashboard/inventory/)
This is the comprehensive inventory management section
Focuses on complete product and stock control across the system
Features include:
- Product catalog management
  - Product categories
  - Product variants
  - Product specifications
  - Pricing tiers
- Inventory control
  - Stock levels tracking
  - Multiple warehouse management
  - Stock transfers
  - Reorder points
  - Low stock alerts
- Supplier management
  - Supplier profiles
  - Purchase orders
  - Supplier performance tracking
  - Price lists
- Stock movements
  - Stock receipts
  - Stock adjustments
  - Stock returns
  - Stock write-offs
- Inventory reporting
  - Stock valuation
  - Movement history
  - Aging analysis
  - Stock forecasting
- Integration with opportunities
  - Stock reservation for opportunities
  - Stock allocation tracking
  - Opportunity-specific pricing
  - Stock availability checks
- Task Integration
  - Stock check tasks
  - Reorder tasks
  - Audit tasks
  - Maintenance tasks

### Stock Management (/dashboard/customers/[id]/stocks/)
This is the inventory management section
Focuses on product and stock control
Features include:
- Inventory tracking
- Stock level monitoring
- Order management
- Stock alerts
- Supplier management
- Stock forecasting
- Inventory reports

### Jobs/Projects (/dashboard/customers/[id]/jobs/)
This is the project management section
Focuses on customer project execution
Features include:
- Project planning
- Task management
- Resource allocation
- Timeline tracking
- Progress reporting
- Milestone management
- Budget tracking

### Scheduling (/dashboard/customers/[id]/schedule/)
This is the appointment management section
Focuses on time and resource scheduling
Features include:
- Calendar management
- Appointment booking
- Resource allocation
- Availability tracking
- Reminder system
- Recurring appointments
- Schedule optimization

### Purchase Management (/dashboard/purchases/)
This is the purchase management section
Focuses on managing all purchasing activities
Features include:
- Purchase Orders (PO)
  - PO creation and management
  - Multi-supplier POs
  - PO approval workflow
  - PO status tracking
  - Delivery scheduling
- Purchase Planning
  - Reorder point tracking
  - Purchase suggestions
  - Demand forecasting
  - Budget planning
- Purchase Requisitions
  - Department requests
  - Approval workflow
  - Budget checking
  - Conversion to PO
- Supplier Management
  - Supplier evaluation
  - Price comparison
  - Payment terms
  - Delivery performance
- Purchase Analytics
  - Spending analysis
  - Supplier performance
  - Price trend analysis
  - Budget vs actual
- Purchase Documents
  - Purchase invoices
  - Goods receipts
  - Return orders
  - Credit notes
- Integration Features
  - Inventory sync
  - Accounting integration
  - Budget management
  - Payment tracking
- Task Integration
  - Purchase approval tasks
  - Follow-up tasks
  - Receipt verification tasks
  - Payment tasks
- Calendar Integration
  - Supplier meetings
  - Delivery schedules
  - Review meetings
  - Payment schedules

### Task Management (/dashboard/tasks/)
This is the comprehensive task management section
Focuses on tracking and managing all system tasks
Features include:
- Task Organization
  - Personal tasks (My Tasks)
  - Team tasks with collaboration
  - Project-based tasks
  - Department-level tasks
  - System-generated tasks
- Task Properties
  - Priority levels (Low, Medium, High, Urgent)
  - Status tracking (Todo, In Progress, Review, Done)
  - Due dates and reminders
  - Time estimates and tracking
  - Labels and categories
- Module Integration
  - Lead tasks (follow-ups, qualifications)
  - Customer tasks (service, meetings)
  - Opportunity tasks (sales activities)
  - Purchase tasks (approvals, verifications)
  - Inventory tasks (stock checks, audits)
  - Project tasks (milestones, deliverables)
- Task Features
  - Subtask support
  - File attachments
  - Comments and discussions
  - Time tracking
  - Activity history
- Automation
  - Task templates
  - Recurring tasks
  - Auto-assignment rules
  - Due date calculations
  - Status updates
- Views & Organization
  - List view
  - Kanban board
  - Calendar view
  - Timeline view
  - Custom filters
- Reporting & Analytics
  - Task completion rates
  - Time tracking analysis
  - Team performance metrics
  - Workload distribution
  - Bottleneck identification
- Calendar Integration
  - Task deadlines on calendar
  - Meeting scheduling
  - Time blocking
  - Resource allocation
  - Schedule synchronization

### Calendar & Scheduling (/dashboard/calendar/)
This is the comprehensive calendar and scheduling section
Focuses on managing all appointments, meetings, and events
Features include:
- Calendar Views
  - Day view
  - Week view
  - Month view
  - Timeline view
  - Resource view (staff/rooms)
  - Multi-calendar overlay
- Appointment Types
  - Customer meetings
  - Sales presentations
  - Team meetings
  - Training sessions
  - Service appointments
  - Follow-up calls
- Booking Management
  - Online booking system
  - Availability management
  - Resource scheduling
  - Buffer time settings
  - Recurring appointments
  - Group bookings
- Resource Management
  - Staff availability
  - Room/facility booking
  - Equipment allocation
  - Capacity planning
  - Conflict detection
- Integration Features
  - Task synchronization
  - Customer appointments
  - Lead follow-ups
  - Sales meetings
  - Project milestones
  - Purchase meetings
- Notification System
  - Email reminders
  - SMS notifications
  - Calendar invites
  - Schedule changes
  - Cancellation notices
- Advanced Features
  - Time zone support
  - Video meeting links
  - Custom scheduling rules
  - Booking preferences
  - Availability policies
- Analytics & Reports
  - Booking statistics
  - Resource utilization
  - Attendance tracking
  - Schedule efficiency
  - Cancellation analysis

## Directory Structure

```
pages/
├── index.vue                        # Landing/Home page
├── auth/                           # Authentication pages
│   ├── login.vue                   # Login page
│   ├── register.vue                # Registration page
│   └── confirm.vue                 # Email confirmation
│
├── dashboard/
│   ├── index.vue                   # Main dashboard (role-based)
│   │
│   ├── users/                      # Admin: User Management
│   │   ├── index.vue              # Admin: Users list & management
│   │   ├── new.vue                # Admin: Create new user account
│   │   └── [id]/                  # Admin: Single user management
│   │       ├── index.vue          # Admin: User account overview
│   │       ├── edit.vue           # Admin: Edit user account
│   │       ├── permissions.vue     # Admin: Manage roles & permissions
│   │       └── activity.vue       # Admin: View user activity logs
│   │
│   ├── profile/                   # Personal User Settings
│   │   └── [@username]/           # Current user's profile
│   │       ├── index.vue         # Personal profile overview
│   │       ├── edit.vue          # Edit personal information
│   │       ├── preferences.vue    # Personal app preferences
│   │       ├── security.vue      # Password & security settings
│   │       └── notifications.vue  # Notification preferences
│   │
│   ├── leads/                     # Lead Management
│   │   ├── index.vue             # Leads dashboard
│   │   ├── new.vue               # Create new lead
│   │   └── [id]/                 # Single lead
│   │       ├── index.vue         # Lead details
│   │       ├── edit.vue          # Edit lead
│   │       └── convert.vue       # Convert to customer
│   │
│   ├── customers/                 # Customer Management
│   │   ├── index.vue              # Customers dashboard
│   │   ├── new.vue                # New customer
│   │   └── [id]/                  # Single customer
│   │       ├── index.vue          # Overview
│   │       ├── edit.vue           # Edit details
│   │       ├── opportunities/     # Opportunities
│   │       │   ├── index.vue      # List view
│   │       │   ├── new.vue        # Create new
│   │       │   └── [oppId].vue    # Single opportunity
│   │       ├── quotes/            # Quotes
│   │       │   ├── index.vue      # List quotes
│   │       │   ├── new.vue        # Create quote
│   │       │   └── [quoteId]/     # Quote details
│   │       │       ├── index.vue   # View quote
│   │       │       └── edit.vue    # Edit quote
│   │       ├── stocks/            # Stock Management
│   │       │   ├── index.vue      # Overview
│   │       │   └── orders.vue     # Stock orders
│   │       ├── jobs/              # Jobs/Projects
│   │       │   ├── index.vue      # Jobs list
│   │       │   ├── new.vue        # Create job
│   │       │   └── [jobId]/       # Job details
│   │       │       ├── index.vue   # Overview
│   │       │       └── tasks.vue   # Job tasks
│   │       └── schedule/          # Scheduling
│   │           ├── index.vue      # Calendar view
│   │           └── appointments/   # Appointments
│   │               ├── index.vue   # List view
│   │               └── [id].vue    # Single appointment
│   ├── inventory/                  # Inventory Management
│   │   ├── index.vue              # Inventory dashboard
│   │   ├── products/              # Product management
│   │   │   ├── index.vue          # Product catalog
│   │   │   ├── new.vue            # Add product
│   │   │   ├── categories/        # Category management
│   │   │   └── [id]/              # Single product
│   │   │       ├── index.vue      # Product details
│   │   │       ├── edit.vue       # Edit product
│   │   │       └── variants.vue    # Product variants
│   │   │
│   │   ├── stock/                 # Stock management
│   │   │   ├── index.vue          # Stock levels
│   │   │   ├── movements/         # Stock movements
│   │   │   │   ├── index.vue      # Movement list
│   │   │   │   ├── receive.vue    # Stock receipt
│   │   │   │   ├── transfer.vue   # Stock transfer
│   │   │   │   └── adjust.vue     # Stock adjustment
│   │   │   └── warehouses/        # Warehouse management
│   │   │
│   │   ├── suppliers/             # Supplier management
│   │   │   ├── index.vue          # Suppliers list
│   │   │   ├── new.vue            # Add supplier
│   │   │   └── [id]/              # Single supplier
│   │   │       ├── index.vue      # Supplier details
│   │   │       ├── orders.vue     # Purchase orders
│   │   │       └── performance.vue # Supplier performance
│   │   │
│   │   └── reports/               # Inventory reports
│   │       ├── valuation.vue      # Stock valuation
│   │       ├── movements.vue      # Movement history
│   │       └── forecasting.vue    # Stock forecasting
│   ├── purchases/                  # Purchase Management
│   │   ├── index.vue              # Purchase dashboard
│   │   ├── orders/                # Purchase Orders
│   │   │   ├── index.vue          # PO list
│   │   │   ├── new.vue            # Create PO
│   │   │   └── [id]/              # Single PO
│   │   │       ├── index.vue      # PO details
│   │   │       ├── edit.vue       # Edit PO
│   │   │       └── receive.vue    # Goods receipt
│   │   │
│   │   ├── requisitions/          # Purchase Requisitions
│   │   │   ├── index.vue          # Requisition list
│   │   │   ├── new.vue            # Create requisition
│   │   │   └── [id]/              # Single requisition
│   │   │       ├── index.vue      # Requisition details
│   │   │       ├── edit.vue       # Edit requisition
│   │   │       └── approve.vue    # Approval workflow
│   │   │
│   │   ├── planning/              # Purchase Planning
│   │   │   ├── index.vue          # Planning dashboard
│   │   │   ├── forecast.vue       # Demand forecast
│   │   │   └── suggestions.vue    # Purchase suggestions
│   │   │
│   │   ├── invoices/              # Purchase Invoices
│   │   │   ├── index.vue          # Invoice list
│   │   │   ├── new.vue            # Create invoice
│   │   │   └── [id]/              # Single invoice
│   │   │       ├── index.vue      # Invoice details
│   │   │       └── process.vue    # Process invoice
│   │   │
│   │   └── reports/               # Purchase Reports
│   │       ├── spending.vue       # Spending analysis
│   │       ├── suppliers.vue      # Supplier analysis
│   │       └── budget.vue         # Budget tracking
│   ├── tasks/                     # Task Management
│   │   ├── index.vue              # Task dashboard
│   │   ├── all/                   # All Tasks
│   │   │   ├── index.vue          # Task list
│   │   │   ├── calendar.vue       # Calendar view
│   │   │   └── board.vue          # Kanban board
│   │   │
│   │   ├── my-tasks/              # Personal Tasks
│   │   │   ├── index.vue          # My task list
│   │   │   ├── today.vue          # Today's tasks
│   │   │   └── upcoming.vue       # Upcoming tasks
│   │   │
│   │   ├── team/                  # Team Tasks
│   │   │   ├── index.vue          # Team overview
│   │   │   └── [teamId]/          # Team specific
│   │   │       ├── index.vue      # Team tasks
│   │   │       └── members.vue    # Team members
│   │   │
│   │   ├── [id]/                  # Single Task
│   │   │   ├── index.vue          # Task details
│   │   │   ├── edit.vue           # Edit task
│   │   │   └── subtasks.vue       # Subtasks
│   │   │
│   │   ├── templates/             # Task Templates
│   │   │   ├── index.vue          # Template list
│   │   │   ├── new.vue            # Create template
│   │   │   └── [id].vue          # Edit template
│   │   │
│   │   └── reports/               # Task Reports
│   │       ├── performance.vue    # Performance
│   │       ├── time.vue           # Time analysis
│   │       └── team.vue           # Team metrics
│   ├── calendar/                  # Calendar & Scheduling
│   │   ├── index.vue             # Calendar dashboard
│   │   ├── day.vue               # Day view
│   │   ├── week.vue              # Week view
│   │   ├── month.vue             # Month view
│   │   ├── schedule/             # Scheduling
│   │   │   ├── index.vue         # Schedule overview
│   │   │   ├── availability.vue   # Manage availability
│   │   │   └── resources.vue     # Resource management
│   │   │
│   │   ├── appointments/         # Appointments
│   │   │   ├── index.vue         # All appointments
│   │   │   ├── new.vue           # Create appointment
│   │   │   └── [id]/             # Single appointment
│   │   │       ├── index.vue     # Appointment details
│   │   │       └── edit.vue      # Edit appointment
│   │   │
│   │   ├── bookings/             # Booking System
│   │   │   ├── index.vue         # Booking dashboard
│   │   │   ├── settings.vue      # Booking settings
│   │   │   └── [type]/           # Booking types
│   │   │       ├── index.vue     # Type details
│   │   │       └── customize.vue  # Customize type
│   │   │
│   │   └── reports/              # Calendar Reports
│   │       ├── usage.vue         # Usage analysis
│   │       ├── resources.vue     # Resource reports
│   │       └── efficiency.vue    # Efficiency metrics

components/
├── auth/                         # Auth components
│   ├── LoginForm.vue
│   └── RegisterForm.vue
│
├── dashboard/                    # Dashboard components
│   ├── Header.vue               # Top navigation
│   ├── Sidebar.vue             # Main navigation
│   └── widgets/                # Dashboard widgets
│       ├── StatsCard.vue
│       ├── ActivityFeed.vue
│       └── Calendar.vue
│
├── users/                       # Admin user management components
│   ├── UserList.vue            # Admin: Users table/grid
│   ├── UserForm.vue            # Admin: User creation/edit form
│   ├── RoleManager.vue         # Admin: Role assignment
│   └── PermissionsGrid.vue     # Admin: Permissions matrix
│
├── profile/                     # Personal profile components
│   ├── ProfileForm.vue         # Personal info form
│   ├── PreferencesForm.vue     # User preferences form
│   └── NotificationSettings.vue # Notification settings
│
├── leads/                       # Lead components
│   ├── LeadCard.vue
│   ├── LeadForm.vue
│   └── LeadConvert.vue
│
├── customers/                   # Customer components
│   ├── CustomerCard.vue
│   ├── CustomerForm.vue
│   ├── opportunities/
│   │   ├── OpportunityCard.vue
│   │   └── OpportunityForm.vue
│   ├── quotes/
│   │   ├── QuoteCard.vue
│   │   └── QuoteForm.vue
│   ├── jobs/
│   │   ├── JobCard.vue
│   │   └── TaskList.vue
│   └── schedule/
│       ├── Calendar.vue
│       └── AppointmentForm.vue
│
├── inventory/                    # Inventory components
│   ├── ProductCard.vue          # Product display
│   ├── ProductForm.vue          # Product edit form
│   ├── StockLevelCard.vue       # Stock level display
│   ├── WarehouseSelector.vue    # Warehouse selection
│   ├── MovementForm.vue         # Stock movement form
│   ├── SupplierForm.vue         # Supplier management
│   └── reports/                 # Report components
│       ├── StockValuation.vue   
│       ├── MovementHistory.vue  
│       └── StockForecast.vue    
│
├── purchases/                    # Purchase components
│   ├── OrderForm.vue            # PO form
│   ├── RequisitionForm.vue      # Requisition form
│   ├── SupplierSelector.vue     # Supplier selection
│   ├── ProductSelector.vue      # Product selection
│   ├── ApprovalFlow.vue         # Approval workflow
│   ├── GoodsReceiptForm.vue     # Goods receipt
│   └── reports/                 # Report components
│       ├── SpendingAnalysis.vue
│       ├── SupplierMetrics.vue
│       └── BudgetTracking.vue
│
├── tasks/                       # Task components
│   ├── TaskCard.vue            # Task display
│   ├── TaskForm.vue            # Task form
│   ├── TaskList.vue            # Task list
│   ├── TaskBoard.vue           # Kanban board
│   ├── TaskCalendar.vue        # Calendar view
│   ├── TaskFilter.vue          # Task filters
│   ├── SubtaskList.vue         # Subtasks
│   ├── TaskComments.vue        # Comments
│   ├── TaskTimer.vue           # Time tracking
│   └── reports/                # Report components
│       ├── TaskMetrics.vue
│       ├── TimeAnalysis.vue
│       └── TeamPerformance.vue
│
├── calendar/                    # Calendar components
│   ├── CalendarView.vue        # Main calendar
│   ├── DayView.vue            # Day calendar
│   ├── WeekView.vue           # Week calendar
│   ├── MonthView.vue          # Month calendar
│   ├── TimelineView.vue       # Timeline view
│   ├── ResourceView.vue       # Resource calendar
│   ├── AppointmentForm.vue    # Appointment form
│   ├── BookingWidget.vue      # Booking widget
│   ├── AvailabilityGrid.vue   # Availability editor
│   └── reports/               # Calendar reports
│       ├── UsageMetrics.vue
│       ├── ResourceStats.vue
│       └── ScheduleAnalysis.vue
│
└── ui/                          # Shared UI components
    ├── Button.vue
    ├── Input.vue
    ├── Select.vue
    ├── Modal.vue
    ├── DataTable.vue
    └── Calendar.vue

composables/
├── useAuth.ts                   # Authentication logic
├── useUsers.ts                  # User management
├── useProfile.ts                # Profile management
├── useLeads.ts                  # Lead management
├── useCustomers.ts              # Customer management
├── useOpportunities.ts          # Opportunity management
├── useQuotes.ts                 # Quote management
├── useJobs.ts                   # Job management
├── useSchedule.ts               # Scheduling
├── useInventory/                # Inventory composables
│   ├── useProducts.ts          # Product management
│   ├── useStock.ts             # Stock management
│   ├── useSuppliers.ts         # Supplier management
│   ├── useWarehouses.ts        # Warehouse management
│   └── useMovements.ts         # Stock movements
├── usePurchases/                # Purchase composables
│   ├── useOrders.ts            # PO management
│   ├── useRequisitions.ts      # Requisition management
│   ├── usePlanning.ts          # Purchase planning
│   ├── useInvoices.ts          # Invoice management
│   └── useApprovals.ts         # Approval workflows
├── useTasks/                   # Task composables
│   ├── useTaskList.ts         # Task list management
│   ├── useTaskBoard.ts        # Kanban board logic
│   ├── useTaskCalendar.ts     # Calendar integration
│   ├── useTaskTemplates.ts    # Template management
│   ├── useTaskComments.ts     # Comments system
│   └── useTaskMetrics.ts      # Performance metrics
├── useCalendar/               # Calendar composables
│   ├── useCalendarView.ts    # Calendar view logic
│   ├── useAppointments.ts    # Appointment management
│   ├── useBookings.ts        # Booking system
│   ├── useAvailability.ts    # Availability management
│   ├── useResources.ts       # Resource management
│   └── useSchedule.ts        # Scheduling logic

layouts/
├── default.vue                  # Default layout
├── auth.vue                     # Auth pages layout
└── dashboard.vue                # Dashboard layout

middleware/
├── auth.ts                      # Authentication check
├── guest.ts                     # Guest only routes
└── role.ts                      # Role-based access

types/
├── auth.ts                      # Auth types
├── user.ts                      # User & profile types
├── lead.ts                      # Lead types
├── customer.ts                  # Customer types
├── opportunity.ts               # Opportunity types
├── quote.ts                     # Quote types
├── job.ts                       # Job types
├── schedule.ts                  # Schedule types
├── inventory.ts                 # Inventory types
├── purchase.ts                  # Purchase types
├── requisition.ts              # Requisition types
├── invoice.ts                  # Invoice types
├── task.ts                     # Task types
├── taskTemplate.ts            # Template types
└── taskMetrics.ts            # Metrics types

utils/
├── constants.ts                 # Constants
├── helpers.ts                   # Helper functions
└── validators.ts                # Form validators

## Key Features

### Role-Based Dashboard Views
- Super Admin: Full system access
- System Admin: User management
- Sales Director: Sales overview
- Marketing Director: Marketing metrics
- Sales/Marketing Team: Role-specific views
- Standard User: Basic access

### User Management
- CRUD operations
- Role assignment
- Permission management
- Activity tracking
- Profile customization

### Lead Management
- Lead capture
- Status tracking
- Conversion process
- Activity history
- Notes and tasks
- Calendar Integration
  - Follow-up scheduling
  - Meeting planning
  - Activity timeline
  - Reminder settings

### Customer Management
- Full customer profiles
- Communication history
- Document management
- Activity tracking
- Calendar Integration
  - Service appointments
  - Regular meetings
  - Follow-up scheduling
  - Availability booking

### Opportunities
- Pipeline management
- Stage tracking
- Revenue forecasting
- Win/loss analysis
- Stock integration
  - Product selection from inventory
  - Stock availability checking
  - Stock reservation for opportunities
  - Custom pricing based on quantity
  - Stock allocation tracking
- Calendar Integration
  - Sales meetings
  - Presentations
  - Client visits
  - Follow-up scheduling

### Quotes
- Quote generation
- Revision history
- PDF export
- Approval workflow

### Inventory Management
- Product catalog management
- Inventory control
- Supplier management
- Stock movements
- Inventory reporting
- Integration with opportunities
  - Stock reservation for opportunities
  - Stock allocation tracking
  - Opportunity-specific pricing
  - Stock availability checks
- Task Integration
  - Stock check tasks
  - Reorder tasks
  - Audit tasks
  - Maintenance tasks

### Stock Management
- Inventory tracking
- Stock level monitoring
- Order management
- Stock alerts
- Supplier management
- Stock forecasting
- Inventory reports

### Jobs/Projects
- Project tracking
- Task management
- Timeline view
- Progress reporting

### Scheduling
- Calendar management
- Appointment booking
- Resource allocation
- Availability tracking
- Reminder system
- Recurring appointments
- Schedule optimization

### Purchase Management
- Purchase Orders (PO)
  - PO creation and management
  - Multi-supplier POs
  - PO approval workflow
  - PO status tracking
  - Delivery scheduling
- Purchase Planning
  - Reorder point tracking
  - Purchase suggestions
  - Demand forecasting
  - Budget planning
- Purchase Requisitions
  - Department requests
  - Approval workflow
  - Budget checking
  - Conversion to PO
- Supplier Management
  - Supplier evaluation
  - Price comparison
  - Payment terms
  - Delivery performance
- Purchase Analytics
  - Spending analysis
  - Supplier performance
  - Price trend analysis
  - Budget vs actual
- Purchase Documents
  - Purchase invoices
  - Goods receipts
  - Return orders
  - Credit notes
- Integration Features
  - Inventory sync
  - Accounting integration
  - Budget management
  - Payment tracking
- Task Integration
  - Purchase approval tasks
  - Follow-up tasks
  - Receipt verification tasks
  - Payment tasks
- Calendar Integration
  - Supplier meetings
  - Delivery schedules
  - Review meetings
  - Payment schedules

### Task Management
- Task Organization
  - Personal tasks
  - Team tasks
  - Project tasks
  - Department tasks
  - Company-wide tasks
- Task Categories
  - Follow-ups
  - Approvals
  - Reviews
  - Meetings
  - Deadlines
  - Reminders
- Task Integration
  - Lead-related tasks
  - Customer-related tasks
  - Opportunity tasks
  - Purchase tasks
  - Inventory tasks
  - Project tasks
- Task Planning
  - Task scheduling
  - Priority setting
  - Resource allocation
  - Time tracking
  - Deadline management
- Collaboration
  - Task assignment
  - Task sharing
  - Team coordination
  - Progress tracking
  - Comments & discussions
- Task Analytics
  - Performance metrics
  - Time analysis
  - Completion rates
  - Bottleneck identification
- Automation
  - Automated task creation
  - Task templates
  - Recurring tasks
  - Task dependencies
  - Auto-assignment rules
- Calendar Integration
  - Task deadlines on calendar
  - Meeting scheduling
  - Time blocking
  - Resource allocation
  - Schedule synchronization

### Calendar & Scheduling
- Calendar Views
  - Day view
  - Week view
  - Month view
  - Timeline view
  - Resource view (staff/rooms)
  - Multi-calendar overlay
- Appointment Types
  - Customer meetings
  - Sales presentations
  - Team meetings
  - Training sessions
  - Service appointments
  - Follow-up calls
- Booking Management
  - Online booking system
  - Availability management
  - Resource scheduling
  - Buffer time settings
  - Recurring appointments
  - Group bookings
- Resource Management
  - Staff availability
  - Room/facility booking
  - Equipment allocation
  - Capacity planning
  - Conflict detection
- Integration Features
  - Task synchronization
  - Customer appointments
  - Lead follow-ups
  - Sales meetings
  - Project milestones
  - Purchase meetings
- Notification System
  - Email reminders
  - SMS notifications
  - Calendar invites
  - Schedule changes
  - Cancellation notices
- Advanced Features
  - Time zone support
  - Video meeting links
  - Custom scheduling rules
  - Booking preferences
  - Availability policies
- Analytics & Reports
  - Booking statistics
  - Resource utilization
  - Attendance tracking
  - Schedule efficiency
  - Cancellation analysis

## URL Structure

```
# Authentication
/auth/login
/auth/register
/auth/confirm

# Dashboard & Profile
/dashboard
/dashboard/profile/@username
/dashboard/profile/@username/edit

# User Management
/dashboard/users
/dashboard/users/new
/dashboard/users/[id]/edit
/dashboard/users/[id]/permissions

# Leads
/dashboard/leads
/dashboard/leads/new
/dashboard/leads/[id]
/dashboard/leads/[id]/convert

# Customers
/dashboard/customers
/dashboard/customers/[id]
/dashboard/customers/[id]/opportunities
/dashboard/customers/[id]/quotes
/dashboard/customers/[id]/jobs
/dashboard/customers/[id]/schedule

# Inventory Management
/dashboard/inventory
/dashboard/inventory/products
/dashboard/inventory/products/new
/dashboard/inventory/products/[id]
/dashboard/inventory/stock
/dashboard/inventory/stock/movements
/dashboard/inventory/suppliers
/dashboard/inventory/suppliers/new
/dashboard/inventory/suppliers/[id]
/dashboard/inventory/reports

# Purchase Management
/dashboard/purchases
/dashboard/purchases/orders
/dashboard/purchases/orders/new
/dashboard/purchases/orders/[id]
/dashboard/purchases/requisitions
/dashboard/purchases/requisitions/new
/dashboard/purchases/requisitions/[id]
/dashboard/purchases/planning
/dashboard/purchases/invoices
/dashboard/purchases/invoices/new
/dashboard/purchases/invoices/[id]
/dashboard/purchases/reports

# Task Management
/dashboard/tasks
/dashboard/tasks/all
/dashboard/tasks/my-tasks
/dashboard/tasks/team
/dashboard/tasks/team/[teamId]
/dashboard/tasks/[id]
/dashboard/tasks/templates
/dashboard/tasks/reports

# Calendar & Scheduling
/dashboard/calendar
/dashboard/calendar/day
/dashboard/calendar/week
/dashboard/calendar/month
/dashboard/calendar/schedule
/dashboard/calendar/appointments
/dashboard/calendar/bookings
/dashboard/calendar/reports