"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
const Nav = () => {
 
  const session =useSession()
  
   const [providers,setProviders]=useState(null)
   const [toggleDropdown,setToggleDropdown]=useState(false)
   useEffect(()=>{
    const setProvider=async()=>{
 
        const resp=await getProviders()
  
        setProviders(resp)
    }
    setProvider()

   },[])
  return (
    <nav className="flex justify-between w-full mb-16 pt-3 ">
      <Link href="/" className="flex gap-2 justify-center">
        <Image
          src={"/assets/images/logo.svg"}
          alt="logo"
          className="object-contain"
          width={30}
          height={40}
        />
        <span className="logo_text">Promptopia  </span>
      </Link>
      {/* desktop navigation */}
      <div className="sm:flex hidden">
        {session?.data ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button type='button' onClick={signOut} className="outline_btn">
                Sign Out
            </button>
            <Link href='/profile'>
                <Image src={session?.data?.user?.image} height={37} width={37} className="rounded-full" alt='profile' />
            </Link>
          </div>
        ) : (
          <>
          {providers && Object.values(providers).map((provider)=>(
            <button type='button' key={provider.name}
            onClick={()=>signIn(provider.id)}
            className="black_btn"
            >
              Sign In
            </button>
          ))}
          </>
        )}
      </div>

      {/* mobile navigation */}
      <div className="sm:hidden flex relative">
          {session?.data ?
            <div className="flex ">
              <Image src={session?.data?.user?.image} onClick={()=>{setToggleDropdown((prev)=>!prev)}}  width={37} height={37} className="rounded-full cursor-pointer" alt="profile"/>
            {toggleDropdown && (
              <div className="dropdown">
                <Link 
                href='/profile'
                className="dropdown_link"
                onClick={()=>setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link 
                href='/create-prompt'
                className="dropdown_link"
                onClick={()=>{setToggleDropdown(false);
                 }}
                >
                Create Prompt
                </Link>
               <button
               type='button'
                onClick={()=>{setToggleDropdown(false);signOut()}}
                className="black_btn mt-45 w-full"
               >
                Sign Out
               </button>

              </div>
            )}
            </div> : 
              <>
              {providers && Object.values(providers).map((provider)=>(
                <button type='button' key={provider.name}
                onClick={()=>signIn(provider.id)}
                className="black_btn"
                >
                    Sign In
                  </button>
                ))}
          </>}

      </div>
    </nav>
  );
};

export default Nav;
