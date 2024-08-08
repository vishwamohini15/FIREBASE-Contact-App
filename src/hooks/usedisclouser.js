import React, { useState } from 'react'

const Usedisclouser = () => {
     const[isopen, setopen]=useState(false)


     const onopen=()=>{
     setopen(true)
     }
     
     const onclose=()=>{
     setopen(false)
     }

  return {onclose, onopen, isopen}
}

export default Usedisclouser
