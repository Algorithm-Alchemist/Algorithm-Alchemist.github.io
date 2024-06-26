import React, { useState } from "react";
import Masonry from "react-masonry-css";
import Modal from "react-modal";
import UseData from "../../Hooks/UseData";
import Footer from "../../Share/Footer";
import { FiUser, FiCode, FiFilePlus, FiExternalLink } from "react-icons/fi";
import { BsXCircle } from "react-icons/bs";
import { useEffect } from "react";
import PageTitle from "../../Share/PageTitle";

Modal.setAppElement("#root");

const CommonPortfilo = ({ condition, items }) => {
  const {
    local,
    handleData,
    data,
    handleModelData,
    isOpen,
    setIsOpen,
    singleData,
  } = UseData();
  const [test, setTest] = useState("All");
  const handleSearch = (text) => {
    handleData(text);
    setTest(text);
  };
  useEffect(() => {
    setTest("All");
    handleData("All");
  }, []);
  const handleModle = (id) => {
    handleModelData(id);
  };

  const item = condition ? 3 : 2;

  const breakpointColumnsObj = {
    default: item,
    1100: 2,
    500: 1,
  };

  const filterOptions = ["All", "MERN"];

  return (
    <>
      <PageTitle title="Portfolio"></PageTitle>
      {/* End pagetitle */}

      <section className="bg-white  lg:rounded-2xl dark:bg-[#111111]">
        <div data-aos="fade">
          <div className="container mb-8   px-4 sm:px-5 md:px-10 lg:px-[60px]">
            <div className="py-12">
              <h2 className="mt-12 after-effect after:left-48 lg:mt-0">
                Portfolio
              </h2>

              {/* Portfilo fillter tab start */}

              <ul
                className={`${
                  item === 2 ? "mt-[30px] " : "mt-[40px]"
                } flex w-full justify-start md:justify-end  flex-wrap   font-medium`}
              >
                {filterOptions.map((option) => (
                  <li
                    key={option}
                    className={`${
                      test === option ? "text-[#FA5252]" : "fillter-btn"
                    } ${option === "Logo" ? "ml-0" : "mr-4 md:mx-4"}`}
                    onClick={() => handleSearch(option)}
                  >
                    {option}
                  </li>
                ))}
              </ul>

              {/* Portfilo fillter tab start */}
            </div>

            {/* Portfolio items start */}

            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {data.slice(0, items).map((item) => (
                <div
                  style={{
                    background: `${
                      local === "dark" ? "transparent" : item?.bg
                    }`,
                  }}
                  className="rounded-lg p-6 dark:border-[2px] border-[#212425]"
                  key={item.id}
                >
                  <div className="overflow-hidden rounded-lg ">
                    <img
                      onClick={() => handleModle(item.id)}
                      className="w-full h-auto transition duration-200 ease-in-out transform rounded-lg cursor-pointer hover:scale-110 "
                      src={item?.imgSmall}
                      alt=""
                    />
                  </div>
                  <span className="pt-5 text-[14px] font-normal text-gray-lite block dark:text-[#A6A6A6]">
                    {item?.tag}
                  </span>
                  <h2
                    onClick={() => handleModle(item.id)}
                    className="font-medium cursor-pointer text-xl duration-300 transition hover:text-[#FA5252] dark:hover:text-[#FA5252] dark:text-white mt-2"
                  >
                    {item?.title}
                  </h2>
                </div>
              ))}
            </Masonry>

            {/* Portfolio items end */}

            {/* Portfolio modal start */}

            <Modal
              isOpen={isOpen}
              onRequestClose={() => setIsOpen(false)}
              className="flex items-center p-4 my-8 outline-none md:p-8 rounded-2xl"
            >
              <div className=" w-full md:w-10/12 flex items-center   lg:w-[850px] bg-white dark:bg-[#323232] mx-auto rounded-xl p-4 md:p-8 absolute left-1/2 top-1/2 transform -translate-x-[50%] -translate-y-[50%] shadow-lg ">
                <div className=" overflow-y-scroll max-h-[80vh] no-scrollbar ">
                  {/* close button */}
                  <BsXCircle
                    onClick={() => setIsOpen(false)}
                    className="absolute z-50 text-white transition duration-300 ease-in-out transform cursor-pointer text-7xl right-2 -top-12 md:-right-10 md:-top-6 hover:rotate-45 "
                  />
                  <h2 className="text-[#ef4060] dark:hover:text-[#FA5252] text-4xl text-center font-bold">
                    {singleData.tag} Project
                  </h2>
                  <div className="grid grid-cols-1 my-6 lg:grid-cols-2">
                    <div className="space-y-2">
                      <p className="dark:text-white flex items-center text-[15px]  sm:text-lg ">
                        <FiFilePlus className="hidden mr-2 sm:text-lg sm:block md:text-xl" />
                        Project :&nbsp;{" "}
                        <span className="font-medium "> Website</span>
                      </p>
                      <p className="dark:text-white flex items-center text-[15px]  sm:text-lg ">
                        <FiCode className="hidden mr-2 text-lg sm:block " />
                        Languages :&nbsp;
                        <span className="font-medium ">
                          {singleData?.langages}
                        </span>
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="dark:text-white flex items-center mt-2 lg:mt-0 text-[15px]  sm:text-lg ">
                        <FiUser className="hidden mr-2 text-lg sm:block" />
                        Client :&nbsp;
                        <span className="font-medium ">
                          {singleData?.client}
                        </span>
                      </p>
                      <p className="dark:text-white flex items-center text-[15px] sm:text-lg ">
                        <FiExternalLink className="hidden mr-2 text-lg sm:block" />
                        Preview :&nbsp;
                        <span className="font-medium transition-all duration-300 ease-in-out hover:text-[#ef4060] ">
                          <a
                            href={singleData?.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {singleData?.linkText}
                          </a>
                        </span>
                      </p>
                    </div>
                  </div>
                  <p className="dark:text-white  text-2line font-normal text-[15px] sm:text-sm  ">
                    {singleData?.description}
                  </p>
                  <img
                    className="w-full md:h-[450px]  h-auto object-cover rounded-xl mt-6"
                    src={singleData.img}
                    alt=""
                  />
                </div>
              </div>
            </Modal>

            {/* Portfolio modal end */}
          </div>
          {/* End Portfolio */}

          {/* Common Footer call here*/}
          <Footer condition={true} bg={"#F8FBFB"} />
        </div>
      </section>
    </>
  );
};

export default CommonPortfilo;
