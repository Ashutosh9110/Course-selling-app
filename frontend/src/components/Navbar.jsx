import React from 'react'
import Logo from "../assets/react.svg"


const MenuData = [

  {
    id: 1,
    title: "Home",
    url: "#"
  },
  {
    id: 2,
    title: "Courses",
    url: "#"
  },
  {
    id: 3,
    title: "Purchases",
    url: "#"
  },
  {
    id: 4,
    title: "Profile",
    url: "#"
  },
  {
    id: 5,
    title: "Settings",
    url: "#"
  },



]


export default function Navbar() {

  return (
    <>  
      <nav className='bg-black text-white py-3'>
        <div className='container flex justify-around'>
          {/* Logo section */}
          <div>
            <img src={Logo} alt="" className='max-w-[120px]'/>
          </div>
          {/* Menu section */}
          <div>
            <ul className='flex items-center gap-5'>
            {MenuData.map((item) => {
              return (
                <li key={item.id}>
                  <a 
                  className='uppercase text-xs'
                  href={item.url}>{item.title} </a>
                </li>    
              )
            })}
            <li>
              <button className='border rounded-full py-1 px-4'>Login</button>
            </li>
            </ul>
          </div>
        </div>
      </nav>
    </>

  )
}
