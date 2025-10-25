/**
 * External API Service
 * This service handles all external API calls instead of using Next.js internal API routes
 */

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://jsonplaceholder.typicode.com'
const AUTH_API_URL = process.env.NEXT_PUBLIC_AUTH_API_URL || 'https://dummyjson.com'

// ============================================
// External API Response Types
// ============================================

interface JSONPlaceholderUser {
  id: number
  name: string
  email: string
  username?: string
  phone?: string
  website?: string
}

interface DummyJSONProduct {
  id: number
  title: string
  price: number
  category: string
  stock: number
  description?: string
}

interface DummyJSONProductsResponse {
  products: DummyJSONProduct[]
  total?: number
  skip?: number
  limit?: number
}

interface DummyJSONAuthResponse {
  id?: number
  username?: string
  email?: string
  firstName?: string
  lastName?: string
  token?: string
}

/**
 * Generic API call helper
 */
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

// ============================================
// User API Methods
// ============================================

export interface User {
  id: number
  name: string
  email: string
  role?: string
  status?: string
  username?: string
  phone?: string
  website?: string
}

/**
 * Get all users from external API
 */
export async function getUsers(): Promise<User[]> {
  // Using JSONPlaceholder users endpoint
  const users = await apiCall<JSONPlaceholderUser[]>(`${API_BASE_URL}/users`)
  
  // Transform external API data to match our app's User interface
  return users.map(user => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.id === 1 ? 'admin' : user.id % 3 === 0 ? 'moderator' : 'user',
    status: user.id % 4 === 0 ? 'inactive' : 'active',
    username: user.username,
    phone: user.phone,
    website: user.website,
  }))
}

/**
 * Get a single user by ID
 */
export async function getUserById(id: number): Promise<User> {
  const user = await apiCall<JSONPlaceholderUser>(`${API_BASE_URL}/users/${id}`)
  
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.id === 1 ? 'admin' : user.id % 3 === 0 ? 'moderator' : 'user',
    status: user.id % 4 === 0 ? 'inactive' : 'active',
    username: user.username,
    phone: user.phone,
    website: user.website,
  }
}

/**
 * Create a new user
 */
export async function createUser(userData: Partial<User>): Promise<User> {
  // JSONPlaceholder simulates POST but doesn't persist data
  const user = await apiCall<JSONPlaceholderUser>(`${API_BASE_URL}/users`, {
    method: 'POST',
    body: JSON.stringify(userData),
  })
  
  return {
    id: user.id || 11,
    name: userData.name || user.name,
    email: userData.email || user.email,
    role: userData.role || 'user',
    status: userData.status || 'active',
  }
}

/**
 * Update an existing user
 */
export async function updateUser(id: number, userData: Partial<User>): Promise<User> {
  // JSONPlaceholder simulates PUT/PATCH but doesn't persist data
  const user = await apiCall<JSONPlaceholderUser>(`${API_BASE_URL}/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(userData),
  })
  
  return {
    id: user.id || id,
    name: userData.name || user.name,
    email: userData.email || user.email,
    role: userData.role,
    status: userData.status,
  }
}

/**
 * Delete a user
 */
export async function deleteUser(id: number): Promise<void> {
  // JSONPlaceholder simulates DELETE but doesn't persist data
  await apiCall<Record<string, never>>(`${API_BASE_URL}/users/${id}`, {
    method: 'DELETE',
  })
}

// ============================================
// Product API Methods
// ============================================

export interface Product {
  id: number
  name: string
  price: number
  category: string
  stock: number
  status: string
  title?: string
  description?: string
}

/**
 * Get all products from external API
 */
export async function getProducts(): Promise<Product[]> {
  // Using DummyJSON products endpoint which has better data structure
  const response = await apiCall<DummyJSONProductsResponse>(`${AUTH_API_URL}/products?limit=20`)
  const products = response.products || []
  
  // Transform external API data to match our app's Product interface
  return products.map((product) => ({
    id: product.id,
    name: product.title,
    price: product.price,
    category: product.category,
    stock: product.stock,
    status: product.stock > 0 ? 'active' : 'inactive',
    title: product.title,
    description: product.description,
  }))
}

/**
 * Get a single product by ID
 */
export async function getProductById(id: number): Promise<Product> {
  const product = await apiCall<DummyJSONProduct>(`${AUTH_API_URL}/products/${id}`)
  
  return {
    id: product.id,
    name: product.title,
    price: product.price,
    category: product.category,
    stock: product.stock,
    status: product.stock > 0 ? 'active' : 'inactive',
    title: product.title,
    description: product.description,
  }
}

/**
 * Create a new product
 */
export async function createProduct(productData: Partial<Product>): Promise<Product> {
  // DummyJSON simulates POST
  const product = await apiCall<DummyJSONProduct>(`${AUTH_API_URL}/products/add`, {
    method: 'POST',
    body: JSON.stringify({
      title: productData.name,
      price: productData.price,
      category: productData.category,
      stock: productData.stock,
    }),
  })
  
  return {
    id: product.id || 101,
    name: product.title || productData.name || '',
    price: product.price || productData.price || 0,
    category: product.category || productData.category || '',
    stock: product.stock || productData.stock || 0,
    status: productData.status || 'active',
  }
}

/**
 * Update an existing product
 */
export async function updateProduct(id: number, productData: Partial<Product>): Promise<Product> {
  // DummyJSON simulates PUT
  const product = await apiCall<DummyJSONProduct>(`${AUTH_API_URL}/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title: productData.name,
      price: productData.price,
      category: productData.category,
      stock: productData.stock,
    }),
  })
  
  return {
    id: product.id || id,
    name: product.title || productData.name || '',
    price: product.price || productData.price || 0,
    category: product.category || productData.category || '',
    stock: product.stock || productData.stock || 0,
    status: productData.status || 'active',
  }
}

/**
 * Delete a product
 */
export async function deleteProduct(id: number): Promise<void> {
  // DummyJSON simulates DELETE
  await apiCall<Record<string, never>>(`${AUTH_API_URL}/products/${id}`, {
    method: 'DELETE',
  })
}

// ============================================
// Authentication API Methods
// ============================================

export interface AuthResponse {
  success: boolean
  token?: string
  user?: {
    email: string
    name: string
    role: string
  }
  message?: string
}

/**
 * Login with external authentication API
 */
export async function login(email: string, _password: string): Promise<AuthResponse> {
  try {
    // Using DummyJSON auth endpoint
    const response = await apiCall<DummyJSONAuthResponse>(`${AUTH_API_URL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({
        username: 'emilys', // DummyJSON uses username
        password: 'emilyspass',
        expiresInMins: 60,
      }),
    })
    
    if (response.token) {
      return {
        success: true,
        token: response.token,
        user: {
          email: response.email || email,
          name: `${response.firstName || ''} ${response.lastName || ''}`.trim() || 'Admin User',
          role: 'admin',
        },
      }
    }
    
    return {
      success: false,
      message: 'Invalid credentials',
    }
  } catch (error) {
    console.error('Login error:', error)
    return {
      success: false,
      message: 'Login failed',
    }
  }
}
