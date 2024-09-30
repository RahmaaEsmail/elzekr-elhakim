import React from 'react'
import './descriptionsection.css'
import { getAdhkar } from '../../../apis';
import { useFetch } from '../../../custom-hooks';
const DescriptionSection = () => {
  const { data, status } = useFetch({ url: getAdhkar() }, []);
  console.log(data)
  return (
    <div className='description_sec'>
      <div className="right">
        <img src="/images/small_des_bg.jpg" alt="" />
      </div>
      <div className="left">
        <img src="/images/basmala.png" alt="" />
        <h4>
          <img src="/images/logo2 (2).png" alt="" />
          <span>الذكر الحكيم</span>
        </h4>
        <div>
          <p>
              إنَّ أَفْضَلَكُمْ مَنْ تَعَلَّمَ القُرآنَ وَعَلَّمَهُ
          </p>
          <p>
          من يُرِدِ الله به خيرا يُفَقِّهْهُ في الدين
          </p>
        </div>
        <p>
          هدفنا هو السمو بمكانة المجتمع الدينيه وتعليم المسلميين أومر دينهم على اكمل وجه حتى نلقى الله عز وجل راضى عنا وعن مسعانا لذلك أطلقنا هذا الموقع ويحتوى على
        </p>
        <div className="counts">
          {
            data&&Object.entries(data).map(([key,value])=>{
              return(
                key!='أذكار بعد السلام من الصلاة المفروضة'&&
                <div className='count_type'>
                  <div>
                    {value.length}
                  </div>
                  <h4>{key}</h4>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default DescriptionSection
