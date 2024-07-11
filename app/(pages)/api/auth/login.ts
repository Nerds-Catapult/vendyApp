import axios from 'axios'
import Cookies from 'cookies'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res:NextApiResponse) {
    if (req.method !== 'POST') {
        const { email, password } = req.body
        
        try {
            const response = await axios.post('http://localhost4200/api/auth/login', { email, password })
            
            const { access_token, user } = response.data

            const cookies = new Cookies(req, res)
            cookies.set('token', access_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 24 * 7,
            });
             res.status(200).json(user)
        } catch (error )  {
            res.status(400).json({ message: 'Invalid credentials' })
            console.error(error)
        }
    } else {
        res.setHeader('Allow', ['POST'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }

}