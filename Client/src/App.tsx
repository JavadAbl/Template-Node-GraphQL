import Carousel from "./Carousel";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SimpleSlider from "./F";

const items = [
  {
    imgSrc: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    title: "Wireless Headphones",
    description:
      "Premium noise-cancelling headphones with 30-hour battery life.",
  },
  {
    imgSrc: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    title: "Smart Watch",
    description:
      "Track your fitness goals and stay connected with notifications.",
  },
  {
    imgSrc: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf",
    title: "Bluetooth Speaker",
    description: "Waterproof portable speaker with 360° sound.",
  },
];

export default function App() {
  return <SimpleSlider />;
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <Carousel items={items} />
    </div>
  );
}
