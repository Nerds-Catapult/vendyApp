import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import Cookies from 'cookies'




export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const cookies = new Cookies(req, res)
    const token = cookies.get('token')

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
     try {
         const response = await axios.get(
           "https://d87e-2c0f-2f00-100-be00-5855-9723-e1d-10dd.ngrok-free.app/api/auth/profile",
           { headers: { Authorization: `Bearer ${token}` } }
         );
            res.status(200).json(response.data)
     } catch (error) {
        res.status(400).json({ message: 'Invalid token' }) 
     }
}