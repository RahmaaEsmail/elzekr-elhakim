import React, { useCallback, useEffect, useState } from "react";
import "./header.css";
import { CiSearch } from "react-icons/ci";
import { FaBars } from "react-icons/fa";
import WebLogo from "../CommonNavbar/WebLogo";
import pages from "../../data/navbarPages";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { v4 as uuid } from "uuid";
import { CloseFullscreen } from "@mui/icons-material";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
const Header = ({fontSize}) => {
  let localData=localStorage.getItem('elzekr_data');
  let userData=localData&&JSON.parse(localData);
  const s=useSelector(e=>e.userData);
  const navigate=useNavigate()
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = useCallback((event) => {
    setAnchorElNav(event.currentTarget);
  }, []);

  const handleCloseNavMenu = useCallback(() => {
    setAnchorElNav(null);
  }, []);
  const [showLinks, setShowLinks] = useState(false);

  useEffect(() => {
    console.log(fontSize);
  } , [fontSize])

  return (
    <div className="header">
      <div className="header_content">
        <div className="search logo">
          {/* <CiSearch /> */}
          <div className="logo">
          <WebLogo />
        </div>
          {pages
            .filter((item) => item?.class == "sm-desktop-header")
            .map((page) => {
              return (
                <NavLink className={page?.class} to={page.href} key={uuid()}>
                  <Button
                  style={{fontSize : `${fontSize?.headerSize}px`}}
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      color: "white",
                      display: "flex",
                    }}
                  >
                    {page.name}
                  </Button>
                </NavLink>
              );
            })}
        </div>

        <div className="bar_links">
          <FaBars
            onClick={() => {
              setShowLinks(true);
            }}
          />
        </div>
        <div onClick={()=>{
          navigate("/")
        }} className="small_logo">
          {/* <WebLogo /> */}
          <img style={{width:'70px'}} src="images/logo2 (2).png" alt="" />
        </div>
        {
          userData&&Object.keys(userData).length>0&&<div style={{flexDirection:'column'}} className="mx-2 btn btn-primary flex-direction-column d-flex islamic_pat ">
          <span>{s?.points||0}</span>
          <img style={{width:'30px'}} src="images/points.png" alt="" />
        </div>
        }

      </div>
      {showLinks && (
        <div className="big_links_parent">

          <div className="big_link">
          <div className="close">
            <IoClose onClick={()=>{
              setShowLinks(false)
            }} style={{fontSize:"30px",cursor:'pointer',color:'red'}}/>
          </div>
            <Link to="/">
              <WebLogo />
            </Link>
            {pages.map((page) => {
              return (
                <NavLink  to={page.href} key={uuid()} className={page?.class}>
                  <Button
                    style={{whiteSpace:"no-wrap"}}
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      color: "white",
                      display: "flex",
                    }}
                  >
                    {page.name}
                  </Button>
                </NavLink>
              );
            })}
              {
                userData&&Object.keys(userData).length>0?
                (
                  <button

                className="btn text-light"
                    onClick={()=>{
                      localStorage.removeItem('elzekr_data')
                      navigate("/login",{replace:true})
                      window.location.reload()
                    }}
                  >خروج</button>
                )
                :
                (
                  <button style={{color:'white'}} onClick={()=>{
                    navigate('/login')
                  }} className="btn btn-primary">تسجيل </button>
                )
              }
          </div>
          <div
            onClick={() => {
              setShowLinks(false);
            }}
            className="big_links_hide"
          ></div>
        </div>
      )}
    </div>
  );
};

export default Header;
