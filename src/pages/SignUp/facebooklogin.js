import React, { useEffect } from "react";
import FacebookLogin from "react-facebook-login";
import { IoLogoFacebook } from 'react-icons/io'; // Ensure you've imported the IoLogoFacebook icon

const FacebookLoginSocial = ({
  language,
  setProvider,
  setType,
  setResponse,
}) => {
  const responseFacebook = (response) => {
    if (response?.id) {
      setProvider((prev) => "Facebook");
      setType((prev) => "social");
      setResponse((prev) => response);
    }
    console.log("response", response);
  };

  useEffect(() => {
    if (
      document.querySelectorAll("button") &&
      document.querySelectorAll("button")?.length
    ) {
      document.querySelectorAll("button")?.forEach((item) => {
        if (
          item?.textContent?.toLowerCase() ==
          "Login with Facebook"?.toLowerCase()
        ) {
          item.classList.add("facebook-button");
          item.innerHTML = ` <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 128 128"
            >
              <rect
                width="118.35"
                height="118.35"
                x="4.83"
                y="4.83"
                fill="#3d5a98"
                rx="6.53"
                ry="6.53"
              />
              <path
                fill="white"
                d="M86.48 123.17V77.34h15.38l2.3-17.86H86.48v-11.4c0-5.17 1.44-8.7 8.85-8.7h9.46v-16A126.56 126.56 0 0 0 91 22.7c-13.62 0-23 8.3-23 23.61v13.17H52.62v17.86H68v45.83z"
              />
            </svg>`;
        }
      });
    }
  }, [document]);

  return (
    <FacebookLogin
    style={{backgroundColor:'transparent'}}
      langauage={language}
      appId="437465341985561"
      autoLoad={false}
      fields="name,picture,id"
      callback={responseFacebook}
      render={(renderProps) => (
        <button
          onClick={renderProps.onClick}
          // className="btn btn-success"
          aria-label="Log in with Facebook"
        >
          <IoLogoFacebook style={{position: 'relative',}} />
        </button>
      )}
    />
  );
};

export default FacebookLoginSocial;
