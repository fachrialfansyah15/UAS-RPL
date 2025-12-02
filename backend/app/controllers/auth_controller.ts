import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class AuthController {
    /**
     * Register a new user
     */
    async register({ request, response }: HttpContext) {
        try {
            const data = request.only(['fullName', 'email', 'password', 'role'])

            // Check if user already exists
            const existingUser = await User.findBy('email', data.email)
            if (existingUser) {
                return response.status(400).json({ message: 'Email already registered' })
            }

            const user = await User.create({
                fullName: data.fullName,
                email: data.email,
                password: data.password,
                role: data.role || 'user',
            })

            return response.status(201).json({
                message: 'User registered successfully',
                user: {
                    id: user.id,
                    fullName: user.fullName,
                    email: user.email,
                    role: user.role,
                },
            })
        } catch (error) {
            return response.status(500).json({ message: 'Registration failed', error: error.message })
        }
    }

    /**
     * Login user and return JWT token
     */
    async login({ request, response }: HttpContext) {
        try {
            const { email, password } = request.only(['email', 'password'])

            const user = await User.findBy('email', email)
            if (!user) {
                return response.status(401).json({ message: 'Invalid credentials' })
            }

            const isPasswordValid = await hash.verify(user.password, password)
            if (!isPasswordValid) {
                return response.status(401).json({ message: 'Invalid credentials' })
            }

            // Generate access token
            const token = await User.accessTokens.create(user)

            return response.json({
                message: 'Login successful',
                token: token.value!.release(),
                user: {
                    id: user.id,
                    fullName: user.fullName,
                    email: user.email,
                    role: user.role,
                },
            })
        } catch (error) {
            return response.status(500).json({ message: 'Login failed', error: error.message })
        }
    }

    /**
     * Get authenticated user info
     */
    async me({ auth, response }: HttpContext) {
        try {
            const user = auth.user!
            return response.json({
                user: {
                    id: user.id,
                    fullName: user.fullName,
                    email: user.email,
                    role: user.role,
                },
            })
        } catch (error) {
            return response.status(500).json({ message: 'Failed to get user info', error: error.message })
        }
    }

    /**
     * Logout user
     */
    async logout({ auth, response }: HttpContext) {
        try {
            const user = auth.user!
            await User.accessTokens.delete(user, user.currentAccessToken.identifier)
            return response.json({ message: 'Logged out successfully' })
        } catch (error) {
            return response.status(500).json({ message: 'Logout failed', error: error.message })
        }
    }
}