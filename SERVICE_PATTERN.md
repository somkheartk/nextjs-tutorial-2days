# API Service Pattern - Documentation

## 📖 Overview

โปรเจกต์นี้ใช้ **Service Pattern** สำหรับการจัดการ API อย่างเป็นระบบ โดยแยก business logic ออกจาก UI components เพื่อให้โค้ดมีความเป็นระเบียบและง่ายต่อการ maintain

## 🏗️ Architecture

```
┌─────────────────┐
│   Components    │  ← UI Layer (React Components)
│   (app/admin/)  │
└────────┬────────┘
         │
         ↓ ใช้ Service functions
┌─────────────────┐
│  API Service    │  ← Business Logic Layer
│ (lib/api-service.ts)
└────────┬────────┘
         │
         ↓ HTTP Requests
┌─────────────────┐
│  External APIs  │  ← Data Layer
│ (JSONPlaceholder,│
│   DummyJSON)    │
└─────────────────┘
```

## 📁 File Structure

```
admin-panel/
├── lib/
│   └── api-service.ts        # 🎯 Main Service Layer
├── app/
│   ├── api/                  # API Routes (Optional Proxy)
│   │   ├── users/route.ts
│   │   └── products/route.ts
│   └── admin/                # UI Components
│       ├── users/page.tsx
│       └── products/page.tsx
```

## 🎯 Core Concepts

### 1. Centralized API Management

ทุก API calls อยู่ในที่เดียว (`lib/api-service.ts`):

```typescript
// ❌ แบบเดิม: API calls กระจายอยู่ในทุก component
function UserList() {
  const [users, setUsers] = useState([])
  
  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(setUsers)
  }, [])
}

// ✅ แบบใหม่: ใช้ Service
import { getUsers } from '@/lib/api-service'

function UserList() {
  const [users, setUsers] = useState([])
  
  useEffect(() => {
    getUsers().then(setUsers)
  }, [])
}
```

### 2. Type Safety

Service มี TypeScript types ที่ชัดเจน:

```typescript
// lib/api-service.ts

export interface User {
  id: number
  name: string
  email: string
  role?: string
  status?: string
}

export async function getUsers(): Promise<User[]> {
  // Implementation
}

export async function createUser(userData: Partial<User>): Promise<User> {
  // Implementation
}
```

### 3. Error Handling

จัดการ errors ในที่เดียว:

```typescript
async function apiCall<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('API Call Error:', error)
    throw error
  }
}
```

## 📝 Usage Examples

### User Management

```typescript
// lib/api-service.ts

// Get all users
export async function getUsers(): Promise<User[]> {
  const users = await apiCall<JSONPlaceholderUser[]>(`${API_BASE_URL}/users`)
  return users.map(transformUser)
}

// Get single user
export async function getUserById(id: number): Promise<User> {
  const user = await apiCall<JSONPlaceholderUser>(`${API_BASE_URL}/users/${id}`)
  return transformUser(user)
}

// Create user
export async function createUser(userData: Partial<User>): Promise<User> {
  const user = await apiCall<JSONPlaceholderUser>(`${API_BASE_URL}/users`, {
    method: 'POST',
    body: JSON.stringify(userData),
  })
  return transformUser(user)
}

// Update user
export async function updateUser(id: number, userData: Partial<User>): Promise<User> {
  const user = await apiCall<JSONPlaceholderUser>(`${API_BASE_URL}/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(userData),
  })
  return transformUser(user)
}

// Delete user
export async function deleteUser(id: number): Promise<void> {
  await apiCall(`${API_BASE_URL}/users/${id}`, {
    method: 'DELETE',
  })
}
```

### Using in Components

```typescript
// app/admin/users/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { getUsers, deleteUser, type User } from '@/lib/api-service'

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadUsers()
  }, [])

  async function loadUsers() {
    try {
      const data = await getUsers()
      setUsers(data)
    } catch (error) {
      console.error('Error loading users:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: number) {
    try {
      await deleteUser(id)
      setUsers(users.filter(u => u.id !== id))
    } catch (error) {
      alert('Failed to delete user')
    }
  }

  // Render UI...
}
```

## 🔑 Key Benefits

### 1. Separation of Concerns
- **UI Layer**: Components focus on rendering and user interaction
- **Service Layer**: Handles data fetching and transformation
- **API Layer**: External API communication

### 2. Reusability
```typescript
// ใช้ service เดียวกันได้ในหลาย components
import { getUsers } from '@/lib/api-service'

// In Dashboard
function Dashboard() {
  const users = await getUsers()
  return <div>Total Users: {users.length}</div>
}

// In User List
function UserList() {
  const users = await getUsers()
  return users.map(u => <UserCard key={u.id} user={u} />)
}
```

### 3. Testability
```typescript
// ง่ายต่อการ mock และ test
import { getUsers } from '@/lib/api-service'

jest.mock('@/lib/api-service')

test('UserList renders users', async () => {
  (getUsers as jest.Mock).mockResolvedValue([
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
  ])

  render(<UserList />)
  // assertions...
})
```

### 4. Maintainability
- เปลี่ยน API endpoint ได้ที่เดียว
- เพิ่ม error handling ได้ centralized
- อัพเดต types ง่าย

## 🚀 Advanced Features

### 1. Data Transformation

```typescript
// Transform external API data to internal format
function transformUser(apiUser: JSONPlaceholderUser): User {
  return {
    id: apiUser.id,
    name: apiUser.name,
    email: apiUser.email,
    role: apiUser.id === 1 ? 'admin' : 'user',
    status: 'active',
  }
}
```

### 2. Request Configuration

```typescript
// Environment-based configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.example.com'

// Multiple API endpoints
const AUTH_API_URL = process.env.NEXT_PUBLIC_AUTH_API_URL || 'https://auth.example.com'
```

### 3. Authentication

```typescript
export async function login(email: string, password: string): Promise<AuthResponse> {
  const response = await apiCall<DummyJSONAuthResponse>(`${AUTH_API_URL}/auth/login`, {
    method: 'POST',
    body: JSON.stringify({
      username: email,
      password,
      expiresInMins: 60,
    }),
  })
  
  if (response.token) {
    return {
      success: true,
      token: response.token,
      user: {
        email: response.email || email,
        name: `${response.firstName} ${response.lastName}`,
        role: 'admin',
      },
    }
  }
  
  return {
    success: false,
    message: 'Invalid credentials',
  }
}
```

## 📊 Comparison

### Without Service Pattern

```typescript
// ❌ Duplicated code across components
function UserList() {
  const [users, setUsers] = useState([])
  
  useEffect(() => {
    fetch('https://api.example.com/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error(err))
  }, [])
}

function Dashboard() {
  const [users, setUsers] = useState([])
  
  useEffect(() => {
    fetch('https://api.example.com/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error(err))
  }, [])
}
```

### With Service Pattern

```typescript
// ✅ Clean and reusable
import { getUsers } from '@/lib/api-service'

function UserList() {
  const [users, setUsers] = useState([])
  
  useEffect(() => {
    getUsers().then(setUsers)
  }, [])
}

function Dashboard() {
  const [users, setUsers] = useState([])
  
  useEffect(() => {
    getUsers().then(setUsers)
  }, [])
}
```

## 🛠️ Best Practices

### 1. Consistent Naming
```typescript
// Follow REST conventions
getUsers()      // GET
getUserById(id) // GET by ID
createUser()    // POST
updateUser()    // PUT/PATCH
deleteUser()    // DELETE
```

### 2. Type Everything
```typescript
// Always define interfaces
export interface User { /* ... */ }
export interface Product { /* ... */ }

// Return typed promises
export async function getUsers(): Promise<User[]>
```

### 3. Handle Errors Gracefully
```typescript
try {
  const users = await getUsers()
  setUsers(users)
} catch (error) {
  console.error('Error:', error)
  // Show user-friendly message
  alert('Failed to load users')
}
```

### 4. Use Environment Variables
```typescript
// .env.local
NEXT_PUBLIC_API_BASE_URL=https://api.production.com

// lib/api-service.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL
```

## 📚 Further Reading

- [Day 1: API Routes](./tutorials/DAY1.md#18-api-routes-15-ชั่วโมง)
- [Day 2: Service Pattern in Action](./tutorials/DAY2.md)
- [Advanced: API Service Pattern](./tutorials/ADVANCED.md#3-api-service-pattern-ขั้นสูง)

## 🎯 Summary

**Service Pattern helps you:**
- ✅ Write cleaner code
- ✅ Reduce duplication
- ✅ Improve testability
- ✅ Easier maintenance
- ✅ Better type safety
- ✅ Centralized error handling

**Result:** More professional and scalable codebase! 🚀

---

**Next Steps:**
- Study the [tutorials](./tutorials/README.md)
- Examine `admin-panel/lib/api-service.ts`
- Try modifying or extending the service

**Questions?** Open an issue on GitHub!
