/* eslint-disable react/prop-types */
const ImageContainer = ({ image }) => {
  return (
    <div className="w-80 md:w-full m-4">
      <img src={image} alt="Post" className="object-cover w-full" />
    </div>
  );
};

export default ImageContainer;
