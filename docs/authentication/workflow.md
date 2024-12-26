# Authentication Workflow

## 1. User Registration Flow

```mermaid
graph TD
    A[Start] --> B[Visit /auth/register]
    B --> C{Has Account?}
    C -->|No| D[Enter Registration Details]
    C -->|Yes| E[Redirect to Login]
    D --> F{Valid Input?}
    F -->|No| D
    F -->|Yes| G[Create Account]
    G --> H{Account Created?}
    H -->|No| I[Show Error]
    I --> D
    H -->|Yes| J[Create Profile]
    J --> K[Create Preferences]
    K --> L[Redirect to Welcome]
    L --> M[End]
```

## 2. User Login Flow

```mermaid
graph TD
    A[Start] --> B[Visit /auth/login]
    B --> C{Has Account?}
    C -->|No| D[Redirect to Register]
    C -->|Yes| E[Enter Credentials]
    E --> F{Valid Credentials?}
    F -->|No| G[Show Error]
    G --> E
    F -->|Yes| H[Create Session]
    H --> I{Check Onboarding}
    I -->|Not Complete| J[Redirect to Welcome]
    I -->|Complete| K[Redirect to Dashboard]
    J --> L[End]
    K --> L
```

## 3. Onboarding Flow

```mermaid
graph TD
    A[Start] --> B[Visit /welcome]
    B --> C{Session Valid?}
    C -->|No| D[Redirect to Login]
    C -->|Yes| E{Profile Complete?}
    E -->|No| F[Show Profile Form]
    F --> G{Valid Input?}
    G -->|No| F
    G -->|Yes| H[Update Profile]
    E -->|Yes| I{Preferences Set?}
    H --> I
    I -->|No| J[Show Preferences Form]
    J --> K{Valid Input?}
    K -->|No| J
    K -->|Yes| L[Update Preferences]
    I -->|Yes| M[Mark Onboarding Complete]
    L --> M
    M --> N[Redirect to Dashboard]
    N --> O[End]
```

## 4. Session Management Flow

```mermaid
graph TD
    A[Start] --> B{Check Session}
    B -->|Valid| C[Continue Request]
    B -->|Invalid| D{Has Refresh Token?}
    D -->|Yes| E[Attempt Refresh]
    D -->|No| F[Redirect to Login]
    E -->|Success| C
    E -->|Failed| F
    C --> G{Protected Route?}
    G -->|Yes| H{Has Permission?}
    G -->|No| I[Process Request]
    H -->|Yes| I
    H -->|No| J[Show 403 Error]
    I --> K[End]
    J --> K
    F --> K
```

## 5. Password Recovery Flow

```mermaid
graph TD
    A[Start] --> B[Visit /auth/recovery]
    B --> C[Enter Email]
    C --> D{Valid Email?}
    D -->|No| C
    D -->|Yes| E[Send Reset Email]
    E --> F{Email Sent?}
    F -->|No| G[Show Error]
    G --> C
    F -->|Yes| H[Show Success Message]
    H --> I[User Clicks Reset Link]
    I --> J[Show Reset Form]
    J --> K{Valid Password?}
    K -->|No| J
    K -->|Yes| L[Update Password]
    L --> M[Redirect to Login]
    M --> N[End]
```

## 6. Social Authentication Flow

```mermaid
graph TD
    A[Start] --> B[Click Social Login]
    B --> C[Redirect to Provider]
    C --> D{User Authorizes?}
    D -->|No| E[Show Error]
    D -->|Yes| F[Return with Token]
    F --> G{Valid Token?}
    G -->|No| E
    G -->|Yes| H{Existing User?}
    H -->|No| I[Create Profile]
    H -->|Yes| J[Get Profile]
    I --> K[Create Session]
    J --> K
    K --> L{Needs Onboarding?}
    L -->|Yes| M[Redirect to Welcome]
    L -->|No| N[Redirect to Dashboard]
    M --> O[End]
    N --> O
    E --> O
```

## Implementation Guidelines

### 1. Authentication States
- Unauthenticated
- Authenticated (No Profile)
- Authenticated (Incomplete Onboarding)
- Authenticated (Complete)

### 2. Protected Routes
- All routes except:
  - `/`
  - `/auth/login`
  - `/auth/register`
  - `/auth/reset-password`

### 3. Middleware Checks
1. Valid session exists
2. User profile exists
3. Onboarding completed (if required)
4. Proper role/permissions

### 4. Error Handling
- Invalid credentials
- Network errors
- Session expiration
- Profile update failures

### 5. Success Scenarios
- Successful registration
- Successful login
- Completed onboarding
- Profile updates
