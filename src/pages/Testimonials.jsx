import React from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import Swiper core and required modules
import { Pagination, Navigation } from "swiper/modules";
import "./Testimonials.scss";

import user_1 from "../assets/user-1.png";
import user_2 from "../assets/user-2.png";
import user_3 from "../assets/user-3.png";
import user_4 from "../assets/user-4.png";

const Testimonials = () => {
  return (
    <div className="container slider-container">
      <Swiper
        // install Swiper modules
        modules={[Pagination, Navigation]}
        spaceBetween={30}
        grabCursor={true}
        loop={true}
        speed={500}
        pagination={{ el: ".swiper-pagination", clickable: true }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        <SwiperSlide className="swiper-slide">
          <div className="slide">
            <img src={user_1} alt="" />
            <div>
              <h3>Mona Tomi</h3>
              <span>Bankly, Lagos</span>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea nihil
              exercitationem inventore non? Sunt provident magnam quis sequi
              nulla optio dolores esse dicta nostrum ea deleniti aspernatur
              laborum dolorem delectus minus, laboriosam unde? Adipisci ratione
              officiis nesciunt sequi tempora distinctio nemo itaque,
              reprehenderit sit, ipsa sunt odit odio natus fuga.
            </p>
          </div>
        </SwiperSlide>

        <SwiperSlide className="swiper-slide">
          <div className="slide">
            <div className="user_info">
              <img src={user_2} alt="" />
              <div>
                <h3>Akin Williams</h3>
                <span>FIN Towers, Lagos</span>
              </div>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea nihil
              exercitationem inventore non? Sunt provident magnam quis sequi
              nulla optio dolores esse dicta nostrum ea deleniti aspernatur
              laborum dolorem delectus minus, laboriosam unde? Adipisci ratione
              officiis nesciunt sequi tempora distinctio nemo itaque,
              reprehenderit sit, ipsa sunt odit odio natus fuga.
            </p>
          </div>
        </SwiperSlide>

        <SwiperSlide className="swiper-slide">
          <div className="slide">
            <div className="user_info">
              <img src={user_3} alt="" />
              <div>
                <h3>Sami Moreni</h3>
                <span>ChopSticks, Lagos</span>
              </div>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea nihil
              exercitationem inventore non? Sunt provident magnam quis sequi
              nulla optio dolores esse dicta nostrum ea deleniti aspernatur
              laborum dolorem delectus minus, laboriosam unde? Adipisci ratione
              officiis nesciunt sequi tempora distinctio nemo itaque,
              reprehenderit sit, ipsa sunt odit odio natus fuga.
            </p>
          </div>
        </SwiperSlide>

        <SwiperSlide className="swiper-slide">
          <div className="slide">
            <div className="user_info">
              <img src={user_4} alt="" />
              <div>
                <h3>May Fair</h3>
                <span>LongHeights, Lagos</span>
              </div>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea nihil
              exercitationem inventore non? Sunt provident magnam quis sequi
              nulla optio dolores esse dicta nostrum ea deleniti aspernatur
              laborum dolorem delectus minus, laboriosam unde? Adipisci ratione
              officiis nesciunt sequi tempora distinctio nemo itaque,
              reprehenderit sit, ipsa sunt odit odio natus fuga.
            </p>
          </div>
        </SwiperSlide>

        <div className="swiper-pagination"></div>
        <div className="swiper-slide-button swiper-button-prev"></div>
        <div className="swiper-slide-button swiper-button-next"></div>
      </Swiper>
    </div>
  );
};

export default Testimonials;
