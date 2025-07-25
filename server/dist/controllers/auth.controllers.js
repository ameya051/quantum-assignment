import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { registerSchema, loginSchema } from '../validators/authValidators.js';
import { ZodError } from 'zod';
const JWT_SECRET = process.env.JWT_SECRET;
// Generate JWT token
const generateToken = (userId) => {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
};
// Register controller
export const register = async (req, res) => {
    try {
        // Validate request body with Zod
        const validatedData = registerSchema.parse(req.body);
        const { name, email, password, dob } = validatedData;
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                error: 'User already exists',
                message: `User with email ${email} already exists`
            });
        }
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = new User({
            name,
            email,
            password: hashedPassword,
            dob
        });
        await user.save();
        const token = generateToken(user._id.toString());
        // Return response without password
        const userResponse = {
            id: user._id,
            name: user.name,
            email: user.email,
            dob: user.dob,
            createdAt: user.createdAt
        };
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                user: userResponse,
                token
            }
        });
    }
    catch (error) {
        console.error('Registration error:', error);
        // Handle Zod validation errors
        if (error instanceof ZodError) {
            const formattedErrors = error.issues.map(err => ({
                field: err.path.join('.'),
                message: err.message
            }));
            res.status(400).json({
                success: false,
                error: 'Validation failed',
                details: formattedErrors
            });
            return;
        }
        // Handle Mongoose validation errors
        if (error instanceof Error && error.name === 'ValidationError') {
            res.status(400).json({
                success: false,
                error: 'Validation failed',
                details: error.message
            });
            return;
        }
        // Handle duplicate key error (MongoDB)
        if (error instanceof Error && 'code' in error && error.code === 11000) {
            return res.status(409).json({
                success: false,
                error: 'User already exists',
                message: 'Email address is already registered'
            });
        }
        res.status(500).json({
            success: false,
            error: 'Internal server error',
            message: 'Registration failed'
        });
    }
};
// Login controller
export const login = async (req, res) => {
    try {
        // Validate request body with Zod
        const validatedData = loginSchema.parse(req.body);
        const { email, password } = validatedData;
        // Find user by email
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials',
                message: 'Email or password is incorrect'
            });
        }
        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials',
                message: 'Email or password is incorrect'
            });
        }
        // Generate token
        const token = generateToken(user._id.toString());
        // Return response without password
        const userResponse = {
            id: user._id,
            name: user.name,
            email: user.email,
            dob: user.dob,
            createdAt: user.createdAt
        };
        res.json({
            success: true,
            message: 'Login successful',
            data: {
                user: userResponse,
                token
            }
        });
    }
    catch (error) {
        console.error('Login error:', error);
        // Handle Zod validation errors
        if (error instanceof ZodError) {
            const formattedErrors = error.issues.map(err => ({
                field: err.path.join('.'),
                message: err.message
            }));
            return res.status(400).json({
                success: false,
                error: 'Validation failed',
                details: formattedErrors
            });
        }
        res.status(500).json({
            success: false,
            error: 'Internal server error',
            message: 'Login failed'
        });
    }
};
