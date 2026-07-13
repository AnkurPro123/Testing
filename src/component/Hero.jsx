import React from "react";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh", 
        width: "100%",
        background:
          "radial-gradient(circle at 80% 10%, rgba(255,255,255,0.08), transparent 35%), linear-gradient(180deg,#050505,#090909)",
        color: "#fff",
        fontFamily: "Inter, sans-serif",
        overflow: "hidden",
        position: "relative",
      }}
    >

      {/* Ambient Glow */}
      <div
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          right: "-200px",
          top: "-200px",
          background:
            "radial-gradient(circle,rgba(255,255,255,.12),transparent 70%)",
          filter: "blur(100px)",
          pointerEvents: "none",
        }}
      />

      {/* Secondary Glow */}
      <div
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          left: "-250px",
          bottom: "-200px",
          background:
            "radial-gradient(circle,rgba(120,120,255,.08),transparent 70%)",
          filter: "blur(100px)",
          pointerEvents: "none",
        }}
      />


      {/* NAVBAR */}
      <header
        style={{
          width: "90%",
          maxWidth: "1300px",
          height: "78px",
          margin: "25px auto 0",
          padding: "0 25px",

          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",

          background:"rgba(255,255,255,.03)",
          backdropFilter:"blur(20px)",
          border:"1px solid rgba(255,255,255,.08)",
          borderRadius:"22px",

          position:"relative",
          zIndex:10,
        }}
      >

        {/* Logo */}
        <div
          style={{
            fontSize:"26px",
            fontWeight:"700",
            letterSpacing:"-1px",
          }}
        >
          Nova<span style={{color:"#888"}}>.</span>
        </div>


        {/* Menu */}
        <nav
          style={{
            display:"flex",
            gap:"32px",
            color:"#AFAFAF",
            fontSize:"14px",
          }}
        >
          {
            [
              "Features",
              "Solutions",
              "Resources",
              "Developers",
              "Pricing"
            ].map(item=>(
              <span
                key={item}
                style={{
                  cursor:"pointer",
                  transition:"0.3s",
                }}
                onMouseEnter={(e)=>{
                  e.currentTarget.style.color="#fff";
                }}
                onMouseLeave={(e)=>{
                  e.currentTarget.style.color="#AFAFAF";
                }}
              >
                {item}
              </span>
            ))
          }
        </nav>



        {/* Actions */}
        <div
          style={{
            display:"flex",
            gap:"15px",
            alignItems:"center",
          }}
        >

          <button
            onClick={()=>navigate("/signin")}
            style={{
              background:"transparent",
              border:"none",
              color:"#CFCFCF",
              cursor:"pointer",
              fontSize:"15px",
            }}
          >
            Login
          </button>


          <button
            onClick={()=>navigate("/signup")}
            style={{
              background:"#fff",
              color:"#000",
              border:"none",
              padding:"12px 24px",
              borderRadius:"14px",
              fontWeight:"600",
              cursor:"pointer",
              transition:"0.3s",
            }}

            onMouseEnter={(e)=>{
              e.currentTarget.style.transform="translateY(-2px)";
              e.currentTarget.style.boxShadow=
              "0 15px 40px rgba(255,255,255,.15)";
            }}

            onMouseLeave={(e)=>{
              e.currentTarget.style.transform="translateY(0)";
              e.currentTarget.style.boxShadow="none";
            }}
          >
            Get Started
          </button>

        </div>

      </header>



      {/* HERO SECTION */}

      <section
        style={{
          width:"90%",
          maxWidth:"1300px",
          margin:"0 auto",

          minHeight:"calc(100vh - 120px)",

          display:"flex",
          alignItems:"center",
          justifyContent:"space-between",

          gap:"60px",
          position:"relative",
          zIndex:2,
        }}
      >


        {/* LEFT CONTENT */}

        <div
          style={{
            maxWidth:"700px",
          }}
        >


          {/* Badge */}
          <div
            style={{
              display:"inline-flex",
              alignItems:"center",
              gap:"10px",

              padding:"9px 18px",
              borderRadius:"999px",

              background:"rgba(255,255,255,.04)",
              border:"1px solid rgba(255,255,255,.1)",

              color:"#D5D5D5",
              fontSize:"14px",

              marginBottom:"35px",
            }}
          >
            <span
              style={{
                width:"7px",
                height:"7px",
                borderRadius:"50%",
                background:"#fff",
              }}
            />

            Version 2.0 is live
          </div>



          <h1
            style={{
              fontFamily:"Georgia, serif",
              fontSize:"clamp(65px,8vw,110px)",
              lineHeight:"0.9",
              letterSpacing:"-5px",
              fontWeight:"500",
              margin:0,
            }}
          >
            Build
            <br/>
            Digital
            <br/>
            Excellence
          </h1>



          <p
            style={{
              marginTop:"35px",
              maxWidth:"550px",
              color:"#969696",
              fontSize:"21px",
              lineHeight:"1.7",
            }}
          >
            Create powerful digital products with elegant interfaces,
            intelligent workflows, and futuristic experiences designed
            for modern teams.
          </p>



          <div
            style={{
              display:"flex",
              gap:"18px",
              marginTop:"45px",
            }}
          >

            <button
              onClick={()=>navigate("/signup")}
              style={{
                padding:"16px 35px",
                background:"#fff",
                color:"#000",
                border:"none",
                borderRadius:"16px",
                fontSize:"16px",
                fontWeight:"600",
                cursor:"pointer",
              }}
            >
              Start Building →
            </button>


            <button
              style={{
                padding:"16px 35px",
                background:"rgba(255,255,255,.04)",
                color:"#fff",
                border:"1px solid rgba(255,255,255,.1)",
                borderRadius:"16px",
                fontSize:"16px",
                cursor:"pointer",
              }}
            >
              Watch Demo
            </button>

          </div>

        </div>
                {/* RIGHT SIDE PRODUCT PREVIEW */}

        <div
          style={{
            width:"480px",
            position:"relative",
          }}
        >

          {/* Main Glass Dashboard */}

          <div
            style={{
              width:"100%",
              padding:"30px",

              background:"rgba(255,255,255,.04)",
              backdropFilter:"blur(25px)",

              border:"1px solid rgba(255,255,255,.1)",
              borderRadius:"30px",

              boxShadow:
              "0 40px 100px rgba(0,0,0,.6)",

              transform:"perspective(1200px) rotateY(-8deg)",
            }}
          >

            {/* Header */}

            <div
              style={{
                display:"flex",
                justifyContent:"space-between",
                alignItems:"center",
                marginBottom:"35px",
              }}
            >

              <div>
                <p
                  style={{
                    margin:0,
                    color:"#8B8B8B",
                    fontSize:"13px",
                  }}
                >
                  Total Revenue
                </p>

                <h2
                  style={{
                    margin:"8px 0 0",
                    fontSize:"38px",
                    letterSpacing:"-1px",
                  }}
                >
                  $482,340
                </h2>

              </div>


              <div
                style={{
                  padding:"8px 14px",
                  borderRadius:"999px",
                  background:"rgba(255,255,255,.08)",
                  color:"#fff",
                  fontSize:"13px",
                }}
              >
                +24%
              </div>


            </div>



            {/* Chart */}

            <div
              style={{
                height:"150px",
                display:"flex",
                alignItems:"flex-end",
                gap:"10px",
                marginBottom:"35px",
              }}
            >

              {
                [40,65,45,90,70,110,85,125].map((height,index)=>(
                  <div
                    key={index}
                    style={{
                      flex:1,
                      height:`${height}px`,
                      borderRadius:"10px 10px 0 0",

                      background:
                      index===7
                      ?
                      "linear-gradient(180deg,#fff,#777)"
                      :
                      "rgba(255,255,255,.12)",

                      transition:"0.3s",
                    }}
                  />
                ))
              }

            </div>



            {/* Stats */}

            <div
              style={{
                display:"grid",
                gridTemplateColumns:"repeat(3,1fr)",
                gap:"15px",
              }}
            >

              {
                [
                  ["Users","18.2K"],
                  ["Growth","91%"],
                  ["Projects","340+"]
                ].map(item=>(

                  <div
                    key={item[0]}
                    style={{
                      padding:"18px",

                      background:"rgba(255,255,255,.03)",
                      border:
                      "1px solid rgba(255,255,255,.07)",

                      borderRadius:"18px",
                    }}
                  >

                    <p
                      style={{
                        margin:0,
                        color:"#858585",
                        fontSize:"12px",
                      }}
                    >
                      {item[0]}
                    </p>

                    <h3
                      style={{
                        margin:"8px 0 0",
                        fontSize:"22px",
                      }}
                    >
                      {item[1]}
                    </h3>


                  </div>

                ))
              }

            </div>


          </div>



          {/* Floating Mini Card */}

          <div
            style={{
              position:"absolute",
              right:"-40px",
              bottom:"-40px",

              width:"180px",
              padding:"22px",

              background:"rgba(255,255,255,.06)",
              backdropFilter:"blur(20px)",

              border:
              "1px solid rgba(255,255,255,.1)",

              borderRadius:"22px",

              boxShadow:
              "0 30px 80px rgba(0,0,0,.5)",
            }}
          >

            <p
              style={{
                margin:0,
                color:"#999",
                fontSize:"12px",
              }}
            >
              AI Performance
            </p>


            <h2
              style={{
                margin:"12px 0",
                fontSize:"34px",
              }}
            >
              98%
            </h2>


            <span
              style={{
                color:"#fff",
                fontSize:"13px",
              }}
            >
              Optimized
            </span>


          </div>


        </div>

      </section>




      {/* BOTTOM METRICS */}

      <section
        style={{
          width:"90%",
          maxWidth:"1300px",
          margin:"0 auto 60px",

          display:"grid",
          gridTemplateColumns:
          "repeat(3,1fr)",

          gap:"20px",
        }}
      >

        {
          [
            ["10K+","Active Users"],
            ["99.9%","Platform Uptime"],
            ["150+","Countries"]
          ].map(stat=>(

            <div
              key={stat[1]}
              style={{
                padding:"30px",

                background:
                "rgba(255,255,255,.03)",

                border:
                "1px solid rgba(255,255,255,.08)",

                borderRadius:"24px",
              }}
            >

              <h2
                style={{
                  margin:0,
                  fontSize:"42px",
                  letterSpacing:"-2px",
                }}
              >
                {stat[0]}
              </h2>


              <p
                style={{
                  color:"#888",
                  marginTop:"10px",
                }}
              >
                {stat[1]}
              </p>


            </div>

          ))
        }


      </section>



      {/* Responsive */}

      <style>
        {`

          @media(max-width:1000px){

            nav{
              display:none;
            }

          }


          @media(max-width:900px){

            section{
              flex-direction:column;
              padding-top:80px;
            }


          }


          @media(max-width:600px){

            h1{
              font-size:60px !important;
            }


          }

        `}
      </style>


    </div>
  );
}