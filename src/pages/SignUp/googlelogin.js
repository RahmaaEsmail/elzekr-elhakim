import React, { useEffect } from "react";
import GoogleLogin from "react-google-login";
import { google } from "./googleIcon";
import { gapi } from "gapi-script";

const GoogleLoginSocial = ({ language, setProvider, setType, setResponse }) => {
  const responseGoogle = (response) => {
    if (response?.profileObj?.email) {
      setProvider("Google");
      setType("social");
      setResponse({
        email: response?.profileObj?.email,
        id: response?.profileObj?.googleId,
        name: response?.profileObj?.name,
      });
      console.log(response);
    }
  };

  useEffect(() => {
    function start() {
      // Initialize Google API client
      gapi.client
        .init({
          clientId:
            "138815665808-v3uotho5jmpl8lcv585qap72mu34qmm0.apps.googleusercontent.com",
          scope: "",
        })
        .then(() => {
          console.log("Google API client initialized successfully!");
          // You can perform further actions after initialization here
        })
        .catch((error) => {
          console.error("Error initializing Google API client:", error);
          // Handle error appropriately, e.g., show a message to the user
        });
    }

    // Load necessary libraries
    gapi.load("client:auth2", start);
  }, []);

  useEffect(() => {
    if (
      document.querySelectorAll("span") &&
      document.querySelectorAll("span")?.length &&
      document.querySelector(".google-button button div")
    ) {
      try {
        // console.log(
        //   document.querySelector(".google-button button div svg").remove()
        // );
        document.querySelector(".google-button button div").innerHTML = google;
      } catch (e) {
        console.log(e);
      }
      document.querySelectorAll("span")?.forEach((item) => {
        if (
          item?.textContent?.toLowerCase() ==
          "Sign in with Google"?.toLowerCase()
        ) {
          // item.classList.add("facebook-button");
          // item.innerHTML = "";
          item.style.display = "none";
        }
      });
    }
  }, [document]);

  useEffect(() => {
    if (document.querySelector("google-button")) {
      console.log(
        `document.querySelector("google-button").querySelector("button")`,
        document.querySelector("google-button").querySelector("button")
      );
    }
  }, [document]);
  return (
    <div style={{backgroundColor:'transparent'}} className="google-button">
      <GoogleLogin
       style={{position: 'relative',}}
        clientId={
          "138815665808-v3uotho5jmpl8lcv585qap72mu34qmm0.apps.googleusercontent.com"
        }
        onSuccess={responseGoogle}
        onError={responseGoogle}
        useOneTap
      />
    </div>
  );
};

export default GoogleLoginSocial;
