import {apiRoute} from '../../../config/Config';

/*=============================================
PETICION GET SLIDES
=============================================*/

const getSlides = ()=>{

  const url = `${apiRoute}/show-slide`;
  const params = {

    method:"GET",
    headers: {

      "Content-Type":"application/json"
    }
  }

  return fetch(url, params).then(response =>{

    return response.json();
  }).then(result =>{

    return result
  }).catch(err =>{

    return err
  })
}

const dataSlide = async ()=>{

  let res = await getSlides()
  localStorage.setItem("ArrayPictures", JSON.stringify(res.data));

}
dataSlide()

let dataSlider = JSON.parse(localStorage.getItem("ArrayPictures"));
 
export default dataSlider;




