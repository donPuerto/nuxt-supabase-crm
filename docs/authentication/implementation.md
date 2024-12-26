# Authentication Implementation Guide

## 1. File Structure

```
├── composables/
│   └── useAuth.ts         # Core authentication logic
├── middleware/
│   └── auth.ts            # Route protection
├── pages/
│   ├── index.vue          # Landing page
│   ├── auth/
│   │   ├── login.vue      # Login page
│   │   └── register.vue   # Registration page
│   ├── welcome.vue        # Onboarding flow
│   └── dashboard/
│       └── index.vue      # Main dashboard
└── types/
    └── supabase.ts        # Database types
```

## 2. Key Components Implementation

### useAuth.ts Composable
```typescript
// Core authentication functions
- signInWithEmailAndPassword()
- signUpWithEmailAndPassword()
- signInWithOAuth()
- signOut()

// Profile management
- createProfile()
- updateProfile()
- getProfile()

// Preferences management
- updatePreferences()
- getPreferences()

// Onboarding
- checkOnboarding()
- completeOnboarding()

// Session management
- checkSession()
- refreshSession()
```

### auth.ts Middleware
```typescript
// Route protection logic
- Session validation
- Profile check
- Onboarding status
- Role verification
```

### Database Schema
```sql
-- profiles table
create table profiles (
  id uuid references auth.users primary key,
  email text unique,
  full_name text,
  job_title text,
  company text,
  onboarding_completed boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- preferences table
create table preferences (
  user_id uuid references auth.users primary key,
  email_notifications boolean default true,
  weekly_report boolean default true,
  timezone text default 'UTC',
  created_at timestamp with time zone default timezone('utc'::text, now())
);
```

## 3. Recommended Implementation Order

1. **Basic Authentication**
   - Set up Supabase client
   - Implement login/register
   - Basic route protection

2. **Profile Management**
   - Create database tables
   - Profile CRUD operations
   - Type definitions

3. **Onboarding Flow**
   - Welcome page UI
   - Step management
   - Profile completion
   - Preferences setup

4. **Route Protection**
   - Auth middleware
   - Session validation
   - Redirect logic

5. **Error Handling**
   - Toast notifications
   - Form validation
   - Loading states

6. **Polish & Optimization**
   - Loading indicators
   - Error messages
   - UX improvements

## 4. Testing Checklist

- [ ] User registration
- [ ] User login
- [ ] Social auth
- [ ] Profile creation
- [ ] Profile updates
- [ ] Onboarding flow
- [ ] Route protection
- [ ] Session handling
- [ ] Error handling
- [ ] Loading states

## 5. Security Considerations

1. **Session Management**
   - Secure token storage
   - Session refresh
   - Auto logout

2. **Data Protection**
   - Input validation
   - XSS prevention
   - CSRF protection

3. **Route Security**
   - Protected routes
   - Role-based access
   - Middleware checks

4. **Error Handling**
   - Safe error messages
   - Logging
   - Rate limiting
