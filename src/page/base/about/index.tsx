import React from "react";
import "../../../assets/scss/page/about.scss";
import { useAboutQuery } from "../../../services/about";

const About = () => {
  const { data: about } = useAboutQuery();

  return (
    <div className="about">
        {about &&
          about.map((item) => (
            <div key={item.id} className="about_container">
              
              <div className="about_logo">
                <img src={item.image} alt="" />
              </div>
              <div className="about_title">
                {typeof item.description === 'string' ? (
                  <div dangerouslySetInnerHTML={{ __html: item.description }} />
                ) : (
                  <span>{item.description}</span>
                )}
              </div>
            </div>
          ))}
      </div>
  );
};

export default About;
