#!/bin/zsh


# Run the react frontend
cd client || exit
npm run dev

# Run the express backend
cd ../server || exit
npm run dev