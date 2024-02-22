import { useEffect, useState } from "react";
import { api } from "../../constants/api";

const ImageView = ({imagePath, imageName, model, id, classProp}) => {

    const [imageUrl, setImageUrl] = useState('');
    useEffect(() => {
        console.log("url",api.getImage + model+ '?id=' + id + '&path=' + imagePath )
        fetch(api.getImage + model + '?id=' + id + '&path=' + imagePath)
      .then(response => response.blob())
      .then(blob => {
        // Convert the blob data to an object URL
        const url = URL.createObjectURL(blob);
        setImageUrl(url);
      });
  }, []);
   
    return (
        <img src={imageUrl} alt={imageName} className={classProp}/>
    )
}

export default ImageView;