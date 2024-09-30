import React, {useEffect, useState} from "react";
import {azkarTypesData, azkarContentData} from "./data";
import {useSelector} from "react-redux";
import {Grid} from "@mui/material";
import {SlRefresh} from "react-icons/sl";
import "./azkar.css";
import {BASE_URL} from "../../constants";
import {Swiper, SwiperSlide} from "swiper/react";

import {Navigation, Pagination, Scrollbar, A11y} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import axios from "axios";
import {ThreeDots} from "react-loader-spinner";
import ContentLoader from "react-content-loader";
import {FaFilePen, FaMagnifyingGlass, FaTrash} from "react-icons/fa6";
import Modal from "../../components/modal/index";
import {toast} from "react-toastify";
import {studiesswiper} from "../../props/slidersprops";

const Azkar = () => {
  const userId = localStorage.getItem("elzekr_data")
    ? JSON.parse(localStorage.getItem("elzekr_data"))?.id
    : null;
  const language = useSelector((state) => state?.language?.language);
  const [azkarTypes, setAzkarTypes] = useState([]);
  const [showAddZekrModal, setShowAddZekrModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [azkarData, setAzkarData] = useState([]);
  const [userAzkar, setUserAzkar] = useState([]);
  const [selectedAzkar, setSelectedAzkar] = useState({});
  const [pageLoading, setPageLoading] = useState(false);
  const [azkar_show_type, setAzkar_show_type] = useState("list");
  const [addLoading, setAddLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [originalData, setOriginalData] = useState([]);
  const [showDelModal, setShowDelModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [zekrData, setZekrData] = useState({});
  const [newAzkarData, setNewAzkarData] = useState({
    azkar_title_id: "",
    content: "",
    count: 0,
    user_id: "",
  });
  const [newZekr, setNewZekr] = useState({
    azkar_title_id: "",
    content: "",
    count: 0,
    user_id: "",
  });

  const handleChangeCount = (index) => {
    console.log(index)
    let list = [...azkarData];
    for (let i = 0; i < list.length; i++) {
      if (i == index) {
        if (list[i].count > 0) {
          list[i]["count"] = list[i].count * 1 - 1;
        }
      }
    }
    setAzkarData(list);
  };

  const handleRefItem = (index, original_count) => {
    let list = [...azkarData];
    list[index]["count"] = original_count + 1;
    setAzkarData(list);
  };

  const getAzkarsTitles = () => {
    axios
      .post(BASE_URL + "azkar_title/get_for_user", {user_id: userId})
      .then((res) => {
        console.log(res);
        if (Array.isArray(res.data.result)) {
          setSelectedAzkar(res.data.result[0]);
          setAzkarTypes(res.data.result);
          setOriginalData(res.data.result);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getAzkarsData = () => {
    setPageLoading(true);
    if (typeof selectedAzkar.id == "number") {
      axios
        .post(BASE_URL + `azkars/get_to_user_by_filter/${selectedAzkar.id}`, {
          user_id: userId,
        })
        .then((res) => {
          console.log(res);
          console.log(res.data.result);
          if (Array.isArray(res.data.result)) {
            setAzkarData(
              res.data.result.map((item) => {
                return {...item, original_count: item.count};
              })
            );
            // setOriginalData(res.data.result.map((item)=>{
            //   return {...item,original_count:item.count}
            // }));
          }
        })
        .catch((e) => console.log(e))
        .finally(() => {
          setPageLoading(false);
        });
    }
  };

  const handleSearch = (txt) => {
    console.log(txt);
    if (txt == "") {
      setAzkarTypes(originalData);
    } else {
      let allData = [...originalData];
      console.log(originalData);
      let pushedData = [];
      for (let i = 0; i < allData.length; i++) {
        // console.log(allData[i].title_ar)
        // console.log(allData)
        if (allData[i].title_ar.includes(txt)) {
          pushedData.push(allData[i]);
        }
      }
      setAzkarTypes(pushedData);
    }
  };

  useEffect(() => {
    // getAzkarTypes()
    window.scrollTo(0, 0);
    getAzkarsTitles();
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    getAzkarsData();
  }, [selectedAzkar]);

  useEffect(() => {
    console.log(azkarData);
  }, [azkarData]);

  function handleDeleteZekr() {
    console.log(zekrData);
    const data_send = {
      user_id: zekrData?.user_id || 0,
      id: zekrData?.id,
    };
    axios
      .post(
        `https://camp-coding.site/elzekr_elhakim/api/azkars/delete_user_azkar`,
        data_send
      )
      .then((res) => {
        if (res.data.status == "success") {
          toast.success(res.data.message);
          setShowDelModal(false);
          getAzkarsData();
        } else {
          toast.error("حدث خطأ ما!");
        }
      });
  }

  function handleAddNewZekr(e) {
    e.preventDefault();
    const data_send = {
      ...newAzkarData,
      user_id: userId,
    };
    console.log(data_send);
    setAddLoading(true);
    axios
      .post(
        `https://camp-coding.site/elzekr_elhakim/api/azkars/add_new_user_azkar`,
        data_send
      )
      .then((res) => {
        if (res.data.status == "success") {
          toast.success(res.data.message);
          getAzkarsData();
          setShowAddModal(false);
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((e) => console.log(e))
      .finally(() => setAddLoading(false));
  }

  function handleGetUserAzkar() {
    const data_send = {
      user_id: userId || 0,
    };

    axios
      .post(
        `https://camp-coding.site/elzekr_elhakim/api/azkars/get_user_azkar`,
        data_send
      )
      .then((res) => {
        if (res.data.status == "success") {
          console.log(res.data.message);
          setUserAzkar(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((e) => console.log(e));
  }

  function handleEditUserAzkar(e) {
    e.preventDefault();
    const data_send = {
      azkar_title_id: zekrData?.azkar_title_id,
      user_id: zekrData?.user_id,
      content: zekrData?.content,
      count: zekrData?.count,
    };
    setEditLoading(true);
    axios
      .post(
        `https://camp-coding.site/elzekr_elhakim/api/azkars/update_user_azkar/${zekrData?.id}`,
        data_send
      )
      .then((res) => {
        if (res.data.status == "success") {
          toast.success(res.data.message);
          getAzkarsData();
          setShowEditModal(false);
        } else {
          toast.error(res.data.message || "حدث خطأ ما!");
        }
      })
      .catch((e) => console.log(e))
      .finally(() => setEditLoading(false));
  }

  function handleAddUserZekrContent(e) {
    e.preventDefault();
    const data_send = {
      ...newZekr,
      user_id: userId,
    };
    setAddLoading(true);
    axios
      .post(
        `https://camp-coding.site/elzekr_elhakim/api/azkars/add_new_user_azkar`,
        data_send
      )
      .then((res) => {
        if (res.data.status == "success") {
          toast.success(res.data.message);
          getAzkarsData();
          setShowAddZekrModal(false);
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((e) => console.log(e))
      .finally(() => setAddLoading(false));
  }

  useEffect(() => {
    handleGetUserAzkar();
  }, []);

  useEffect(() => {
    console.log(azkarData);
  }, [azkarData]);

  return (
    <>
      <Modal
        open={showDelModal}
        toggle={setShowDelModal}
        onClose={() => setShowDelModal(false)}
      >
        <h4>هل تريد حذف الذكر؟</h4>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            margin: "15px 0px",
          }}
        >
          <button
            onClick={handleDeleteZekr}
            style={{
              backgroundColor: "blue",
              color: "white",
              padding: "10px 20px",
              borderRadius: "10px",
            }}
          >
            تأكيد
          </button>
          <button
            onClick={() => setShowDelModal(false)}
            style={{
              border: "1px solid blue",
              color: "blue",
              borderRadius: "10px",
              padding: "10px 20px",
            }}
          >
            إلغاء
          </button>
        </div>
      </Modal>

      <Modal
        headerTitle='اضافة ذكر'
        open={showAddModal}
        toggle={setShowAddModal}
        onClose={() => setShowAddModal(false)}
      >
        <form onSubmit={handleAddNewZekr}>
          <div>
            <label>محتوي الذكر</label>
            <input
              type='text'
              placeholder='محتوي الذكر'
              onChange={(e) =>
                setNewAzkarData({...newAzkarData, content: e.target.value})
              }
            />
          </div>

          <div>
            <label>عدد المرات</label>
            <input
              type='number'
              onChange={(e) =>
                setNewAzkarData({
                  ...newAzkarData,
                  count: Number(e.target.value),
                })
              }
            />
          </div>

          <button
            style={{
              backgroundColor: "blue",
              color: "white",
              padding: "10px 20px",
              borderRadius: "5px",
            }}
          >
            {addLoading ? "loading..." : "إضافة"}
          </button>
        </form>
      </Modal>

      <Modal
        headerTitle='تعديل ذكر'
        open={showEditModal}
        toggle={setShowEditModal}
        onClose={() => setShowEditModal(false)}
      >
        <form onSubmit={handleEditUserAzkar}>
          <div>
            <label>محتوي الذكر</label>
            <input
              type='text'
              placeholder='محتوي الذكر'
              value={zekrData.content}
              onChange={(e) =>
                setZekrData({...zekrData, content: e.target.value})
              }
            />
          </div>

          <div>
            <label>عدد المرات</label>
            <input
              type='number'
              value={zekrData?.count}
              onChange={(e) =>
                setZekrData({...zekrData, count: Number(e.target.value)})
              }
            />
          </div>

          <button
            style={{
              backgroundColor: "blue",
              color: "white",
              padding: "10px 20px",
              borderRadius: "5px",
            }}
          >
            {editLoading ? "loading..." : "تعديل"}
          </button>
        </form>
      </Modal>

      <Modal
        open={showAddZekrModal}
        toggle={setShowAddZekrModal}
        onClose={() => setShowAddZekrModal(false)}
        headerTitle='اضافة ذكر'
      >
        <form onSubmit={handleAddUserZekrContent}>
          <div>
            <label>اختر ذكر</label>
            <select
              onChange={(e) =>
                setNewZekr({...newZekr, azkar_title_id: Number(e.target.value)})
              }
            >
              {azkarTypes.map((zekr) => (
                <option value={zekr?.id}>{zekr.title_ar}</option>
              ))}
            </select>
          </div>

          <div>
            <label>محتوي الذكر</label>
            <input
              type='text'
              placeholder='محتوي الذكر'
              onChange={(e) =>
                setNewZekr({...newZekr, content: e.target.value})
              }
            />
          </div>

          <div>
            <label>عدد المرات</label>
            <input
              type='number'
              onChange={(e) =>
                setNewZekr({...newZekr, count: Number(e.target.value)})
              }
            />
          </div>
          <button
            style={{
              backgroundColor: "blue",
              color: "white",
              padding: "10px 20px",
              borderRadius: "5px",
            }}
          >
            {addLoading ? "loading..." : "اضافة"}
          </button>
        </form>
      </Modal>
    
   (
        <div className='azkar_page'>
          {!pageLoading && (
            <div className='flex gap-5 my-3 justify-content-between'>
              {/* <label htmlFor="">إبحث عن حديث</label> */}
              <div className='search_div'>
                <FaMagnifyingGlass />
                <input
                  type='search'
                  onChange={(e) => {
                    handleSearch(e.target.value);
                  }}
                  placeholder='إبحث هنا'
                  className='mt-2 form-control'
                />
              </div>

              <button
                onClick={() => {
                  setShowAddZekrModal(true);
                }}
                style={{
                  backgroundColor: "white",
                  padding: "10px 20px",
                  borderRadius: "10px",
                  color: "#9B102C",
                }}
              >
                إضافة
              </button>
            </div>
          )}
          <div className='azkar_types'>
            {azkarTypes.map((item, index) => {
              return (
                <div
                  onClick={() => {
                    setSelectedAzkar(item);
                    // setSelectedType(item.id);
                  }}
                  className={
                    selectedAzkar.id == item.id
                      ? "azk_type_one act"
                      : "azk_type_one"
                  }
                  key={index}
                >
                  {language == "ar" ? item.title_ar : item.title_en}
                </div>
              );
            })}
          </div>
          <div className='selected_data'>
            {/* <h5>{azkarTypesData&&azkarTypesData.length>0?azkarTypesData.filter(item=>item.id==selectedType)[0].title_ar:null}</h5> */}
            <h5
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <span>
                {language == "ar"
                  ? selectedAzkar.title_ar
                  : selectedAzkar.title_en}
              </span>
              <button
                onClick={() => {
                  setShowAddModal(true);
                  setNewAzkarData({
                    ...newAzkarData,
                    azkar_title_id: selectedAzkar?.id,
                  });
                }}
                style={{
                  backgroundColor: "white",
                  padding: "10px 20px",
                  borderRadius: "10px",
                  color: "#9B102C",
                }}
              >
                إضافة
              </button>
            </h5>

            <div className='d-flex align-middle justify-center gap-10 my-4'>
              {[
                {
                  icon: icons.list,
                  value: "list",
                },
                {
                  icon: icons.swipe,
                  value: "swiper",
                },
              ].map((item, index) => {
                return (
                  <div
                    className={`azkar_type_btn ${
                      azkar_show_type == item.value ? "active" : ""
                    }`}
                    onClick={() => setAzkar_show_type(item.value)}
                  >
                    {item.icon}
                  </div>
                );
              })}
            </div>

           {pageLoading ? (
             <div
             style={{
               height: "80vh",
               display: "flex",
               alignItems: "center",
               justifyContent: "center",
             }}
           >
             <ContentLoader
               viewBox='0 0 380 100'
               speed={1}
               // backgroundColor={'green'}
             >
               <rect x='10' y='10' rx='10' ry='10' width='100' height='80' />
               <rect x='120' y='10' rx='10' ry='10' width='100' height='80' />
               <rect x='230' y='10' rx='10' ry='10' width='100' height='80' />
             </ContentLoader>
           </div>
           ) :

            azkar_show_type == "list" ? (
              <div className='azkar_data_parent'>
                {azkarData &&
                  azkarData?.map((item, index) => {
                    console.log(item);
                    console.log(selectedAzkar);
                    return (
                      item.azkar_title_id == selectedAzkar.id && (
                        <div key={index} className='azkar_one'>
                          <div
                            onClick={() => {
                              handleChangeCount(index);
                            }}
                            className='right'
                          >
                            <h3>
                              {item.count < 10  && item?.count ? "0" + item.count : item.count == null ? "0" + '1' : item.count}
                            </h3>
                            <h5>{item.original_count}</h5>
                            <div>
                              <div
                                onClick={() => {
                                  handleRefItem(index, item.original_count);
                                }}
                                className='ref'
                              >
                                <SlRefresh />
                              </div>
                            </div>
                          </div>
                          <div className='left'>
                            <h5>{item.title_ar}</h5>
                            <p>
                              <span>{item.content}</span>
                              <span>{item.surah}</span>
                            </p>
                            <h6>{item.benfit}</h6>

                            {item.user_id && (
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "10px",
                                }}
                              >
                                <FaTrash
                                  onClick={() => {
                                    setShowDelModal(true);
                                    setZekrData(item);
                                  }}
                                  style={{margin: "10px 0px", color: "red"}}
                                />

                                <FaFilePen
                                  onClick={() => {
                                    setShowEditModal(true);
                                    setZekrData(item);
                                    console.log(item);
                                  }}
                                  style={{margin: "10px 0px", color: "green"}}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    );
                  })}
              </div>
            ) : (
              <div className='azkar_swiper'>
                <Swiper
                  modules={[Navigation, Pagination, Scrollbar, A11y]}
                  // spaceBetween={50}
                  // slidesPerView={3}
                  {...studiesswiper}
                  onSlideChange={() => console.log("slide change")}
                  onSwiper={(swiper) => console.log(swiper)}
                >
                  {azkarData &&
                    azkarData?.map((item, index) => {
                      console.log(item);
                      console.log(selectedAzkar);
                      return (
                        item.azkar_title_id == selectedAzkar.id && (
                          <SwiperSlide>
                            <div key={index} className='swiper_azkar_one'>
                              <div className='swiper_zekr_content'>
                                <h5>{item.title_ar}</h5>
                                <p
                                  className='p-5 swiper_zerkr_content'
                                >
                                  <span>{item.content}</span>
                                  <span>{item.surah}</span>
                                </p>
                                <h6>{item.benfit}</h6>

                                {item.user_id && (
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "10px",
                                    }}
                                  >
                                    <FaTrash
                                      onClick={() => {
                                        setShowDelModal(true);
                                        setZekrData(item);
                                      }}
                                      style={{margin: "10px 0px", color: "red"}}
                                    />

                                    <FaFilePen
                                      onClick={() => {
                                        setShowEditModal(true);
                                        setZekrData(item);
                                        console.log(item);
                                      }}
                                      style={{
                                        margin: "10px 0px",
                                        color: "green",
                                      }}
                                    />
                                  </div>
                                )}
                              </div>
                              <div
                                onClick={() => {
                                  handleChangeCount(index);
                                }}
                                className='zekr_counter_container'
                              >
                                <h3>
                                  {item.count < 10
                                    ? "0" + item.count
                                    : item.count}
                                </h3>
                                <h5>{item.original_count}</h5>
                                <div>
                                  <div
                                    onClick={() => {
                                      handleRefItem(index, item.original_count);
                                    }}
                                    className='ref'
                                  >
                                    <SlRefresh />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </SwiperSlide>
                        )
                      );
                    })}

                  {/* {
            videos?.map((item,index)=>{
              console.log(item.video_link)
              return (
                
              )
            })
          } */}
                  <div class='swiper-button-next'></div>
                  <div class='swiper-button-prev'></div>
                </Swiper>
              </div>
            )
          }
          </div>
        </div>
      {/* )} */}
    </>
  );
};

export default Azkar;

const icons = {
  swipe: (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1em'
      height='1em'
      viewBox='0 0 24 24'
    >
      <path
        fill='currentColor'
        d='M11.825 22q-.6 0-1.15-.225t-.975-.65L5.3 16.7q-.275-.275-.287-.687t.262-.713l.075-.075q.4-.4.938-.537t1.062.012l1.65.475V7q0-.425.288-.712T10 6t.713.288T11 7v9.5q0 .5-.4.8t-.875.175l-1.15-.325l2.55 2.55q.125.125.313.213t.387.087H16q.825 0 1.413-.587T18 18v-4q0-.425.288-.712T19 13t.713.288T20 14v4q0 1.65-1.175 2.825T16 22zM13 10q.425 0 .713.288T14 11v3q0 .425-.288.713T13 15t-.712-.288T12 14v-3q0-.425.288-.712T13 10m3 1q.425 0 .713.288T17 12v2q0 .425-.288.713T16 15t-.712-.288T15 14v-2q0-.425.288-.712T16 11m3.9-5.5q-1.65-1.45-3.675-2.225T12 2.5q-2.65 0-4.75.988T4.025 6.2q-.2.35-.513.575T2.8 7q-.3 0-.462-.262T2.3 6.175Q3.35 3.85 6 2.425T12 1q2.35 0 4.525.775t3.975 2.25V2.75q0-.325.213-.537T21.25 2t.538.213t.212.537V6q0 .425-.288.713T21 7h-3.25q-.325 0-.537-.213T17 6.25t.213-.537t.537-.213zM14.275 17'
      ></path>
    </svg>
  ),

  list: (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1em'
      height='1em'
      viewBox='0 0 100 100'
    >
      <path
        fill='currentColor'
        d='M17.563 30.277h.012a2.27 2.27 0 0 0 2.246 2.267v.002H80.18v-.001a2.27 2.27 0 0 0 2.259-2.268h.01V19.818a2.27 2.27 0 0 0-2.269-2.265H19.821a2.27 2.27 0 0 0-2.269 2.269c0 .039.01.076.012.115zm62.616 12.227H19.821a2.27 2.27 0 0 0-2.269 2.269c0 .039.01.076.012.115v10.34h.012a2.27 2.27 0 0 0 2.246 2.267v.002h60.359v-.001a2.27 2.27 0 0 0 2.259-2.268h.01V44.769a2.27 2.27 0 0 0-2.271-2.265m0 24.95H19.821a2.27 2.27 0 0 0-2.269 2.269c0 .039.01.076.012.115v10.34h.012a2.27 2.27 0 0 0 2.246 2.267v.002h60.359v-.001a2.27 2.27 0 0 0 2.259-2.269h.01V69.718a2.27 2.27 0 0 0-2.271-2.264'
      ></path>
    </svg>
  ),
};
