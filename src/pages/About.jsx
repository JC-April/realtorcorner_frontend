import React, { useRef } from "react";
import "./About.scss";
import about_duplex from "../assets/about_duplex.jpg";
import user_1 from "../assets/user-1.png";
import user_2 from "../assets/user-2.png";
import user_3 from "../assets/user-3.png";
import user_4 from "../assets/user-4.png";
import next_icon from "../assets/next-icon.png";
import back_icon from "../assets/back-icon.png";
import call_icon from "../assets/call_icon.svg";
import facebook_icon from "../assets/facebook_icon.svg";
import home_icon from "../assets/home_icon.svg";
import instagram_icon from "../assets/instagram_icon.svg";
import mail_icon from "../assets/mail_icon.svg";
import whatsapp_icon from "../assets/whatsapp_icon.svg";
import message_icon from "../assets/msg-icon.png";

const About = () => {
  const slider = useRef();
  let tx = 0;

  const slideForward = () => {
    if (tx > -50) {
      tx -= 25;
    }
    slider.current.style.transform = `translateX(${tx}%)`;
  };

  const slideBackward = () => {
    if (tx < 0) {
      tx += 25;
    }
    slider.current.style.transform = `translateX(${tx}%)`;
  };

  return (
    <section className="About">
      <div className="container company_profile">
        <div className="company_profile_text">
          <h3>About RealtorCorner</h3>
          <h2>RealtorCorner Is Your Real Estate Partner For The Future </h2>
          <p>
            Our core values focus on customer satisfaction, teamwork, and a
            positive work environment. We provide high-quality services that
            simplify real estate complexities, by leveraging an integrated
            team-based approach and innovative strategies to build strong
            relationships with clients, while striving for operational
            excellence
          </p>
          <p>
            RealtorCorner offers a range of services, including residential
            sales, rentage, property management, and real estate investment
            consulting. We are made up of a knowledgeable team of property
            consultants and realtors who are passionate about the local market
            and committed to guiding clients through every step of the
            home-buying or rental process process.
          </p>
          <p>
            We also offer educational workshops for first-time homebuyers,
            empowering them with the knowledge needed to make informed
            decisions. Through our dedication to service, innovation, and
            community engagement, RealtorCorner has quickly become a trusted
            name in the Lagos real estate market.
          </p>
        </div>
        <div className="company_image1">
          <img
            src={about_duplex}
            alt="a residential building"
            loading="lazy"
            className="about_image"
          />
        </div>
      </div>
      <div className="title">
        <p>Testimonials</p>
        <h2>What Satisfied Clients Are Saying</h2>
      </div>

      <div className="container testimonials">
        <img
          src={next_icon}
          alt=""
          className="next_btn"
          onClick={slideForward}
        />
        <img
          src={back_icon}
          alt=""
          className="back_btn"
          onClick={slideBackward}
        />

        <div className="slider ">
          <ul ref={slider}>
            <li>
              <div className="slide">
                <div className="user_info">
                  <img src={user_1} alt="" />
                  <div>
                    <h3>Mona Tomi</h3>
                    <span>Bankly, Lagos</span>
                  </div>
                </div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
                  nihil exercitationem inventore non? Sunt provident magnam quis
                  sequi nulla optio dolores esse dicta nostrum ea deleniti
                  aspernatur laborum dolorem delectus minus, laboriosam unde?
                  Adipisci ratione officiis nesciunt sequi tempora distinctio
                  nemo itaque, reprehenderit sit, ipsa sunt odit odio natus
                  fuga.
                </p>
              </div>
            </li>

            <li>
              <div className="slide">
                <div className="user_info">
                  <img src={user_2} alt="" />
                  <div>
                    <h3>Akin Williams</h3>
                    <span>FIN Towers, Lagos</span>
                  </div>
                </div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
                  nihil exercitationem inventore non? Sunt provident magnam quis
                  sequi nulla optio dolores esse dicta nostrum ea deleniti
                  aspernatur laborum dolorem delectus minus, laboriosam unde?
                  Adipisci ratione officiis nesciunt sequi tempora distinctio
                  nemo itaque, reprehenderit sit, ipsa sunt odit odio natus
                  fuga.
                </p>
              </div>
            </li>

            <li>
              <div className="slide">
                <div className="user_info">
                  <img src={user_3} alt="" />
                  <div>
                    <h3>Sami Moreni</h3>
                    <span>ChopSticks, Lagos</span>
                  </div>
                </div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
                  nihil exercitationem inventore non? Sunt provident magnam quis
                  sequi nulla optio dolores esse dicta nostrum ea deleniti
                  aspernatur laborum dolorem delectus minus, laboriosam unde?
                  Adipisci ratione officiis nesciunt sequi tempora distinctio
                  nemo itaque, reprehenderit sit, ipsa sunt odit odio natus
                  fuga.
                </p>
              </div>
            </li>

            <li>
              <div className="slide">
                <div className="user_info">
                  <img src={user_4} alt="" />
                  <div>
                    <h3>May Fair</h3>
                    <span>LongHeights, Lagos</span>
                  </div>
                </div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
                  nihil exercitationem inventore non? Sunt provident magnam quis
                  sequi nulla optio dolores esse dicta nostrum ea deleniti
                  aspernatur laborum dolorem delectus minus, laboriosam unde?
                  Adipisci ratione officiis nesciunt sequi tempora distinctio
                  nemo itaque, reprehenderit sit, ipsa sunt odit odio natus
                  fuga.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="title">
        <p>Contact Us</p>
        <h2>Get in Touch</h2>
      </div>
      <div className="container contact">
        <div className="contact_col">
          <h3>
            Send us a message <img src={message_icon} alt="" />
          </h3>
          <p>
            Feel free to reach out through contact form or find our contact
            information below. Your feedback, questions, and suggestions are
            important to us as we strive to provide exceptional service to our
            university community.
          </p>
          <ul>
            <li className="address">
              <img src={home_icon} alt="office address" /> 23 Uyo Street,
              Surulere, Ikeja, Lagos, Nigeria
            </li>
            <li className="phone">
              <img src={call_icon} alt="phone number" /> +23480123456
            </li>
            <li className="email">
              <img src={mail_icon} alt="email address" />
              <a href="">realtorcorner@email.com</a>
            </li>
            <li className="socials">
              <a href="">
                <img src={whatsapp_icon} alt="WhatsApp" />
              </a>
              <a href="">
                <img src={instagram_icon} alt="Instagram" />
              </a>
              <a href="">
                <img src={facebook_icon} alt="Facebook" />
              </a>
            </li>
          </ul>
        </div>

        <div className="contact_col">
          <form
            action="https://formsubmit.co/jimkronicles@gmail.com"
            method="POST"
          >
            <label>Your Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              required
            />
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter your mobile number"
              required
            />
            <label>Write your message her</label>
            <textarea
              name="message"
              rows="6"
              placeholder="Enter your message"
              required
            />
            <button type="submit" className="btn">
              Submit now
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default About;
