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
      <nav>
        <div className='container bg-red-500'>
          {/* Logo section */}
          <div>
            <img src={Logo} alt="" className='max-w-[120px]'/>
          </div>
          {/* Menu section */}
          <div>
            <ul>
            {MenuData.map((item) => {
              return (
                <li key={item.id}>
                  <a href={item.url}>{item.title} </a>
                </li>    
              )
            })}
            </ul>
          </div>
        </div>
      </nav>
    </>

  )
}
