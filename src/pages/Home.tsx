import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Home: React.FC = () => {
  const navigate = useNavigate()
  return (
    <>
      <div>Home</div>
      <button>Collections</button>
      <button onClick={() => navigate('/adminPage')}>Admin Page</button>
    </>
  )
}
