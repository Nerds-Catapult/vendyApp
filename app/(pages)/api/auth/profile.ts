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
           "https://goose-merry-mollusk.ngrok-free.app/api/auth/profile",
           { headers: { Authorization: `Bearer ${token}` } }
         );
            res.status(200).json(response.data)
     } catch (error) {
        res.status(400).json({ message: 'Invalid token' }) 
     }
}