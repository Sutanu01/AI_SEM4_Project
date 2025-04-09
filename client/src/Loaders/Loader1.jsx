import React from 'react'
const Loader1 = () => {
  return (
    <>
    <style>{`
      .spinner {
         width:7rem;
         height:7rem;
         border-radius: 50%;
         border: 1rem solid rgba(8, 11, 13, 0.08);
         border-top: 1rem solid white;
         animation: spin 1s linear infinite;
    }
    @keyframes spin {
    0% {
    transform: rotate(0deg);
    }
    100% {
    transform: rotate(360deg);
     }
} 
    `
      }
      
    </style>
    <div
      style={{
        height: "100vh",
        backgroundColor: "#080b0d",
    backgroundImage: "linear-gradient(62deg, #080b0d 15%,rgb(75, 71, 81) 100%)",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        overflowY:"hidden",
        cursor:"default",
        gap:"3rem"
      }}
    > 
      <div className='spinner'></div>
      <div style={{fontSize:"1rem",textAlign:"center",color:"white"}}>Compiling the document's content</div>
    </div></>
  )
}

export default Loader1