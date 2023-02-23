import React from 'react';
import '../App.css';

import Slideshow from './Slideshow/Slideshow';
import img1 from './Slideshow/images/01.jpg';
import img2 from './Slideshow/images/02.jpg';
import img3 from './Slideshow/images/03.jpg';
import img4 from './Slideshow/images/04.jpg';
import img5 from './Slideshow/images/05.jpg';
import img6 from './Slideshow/images/06.jpg';

const collection = [
  { src: img1, caption: "Vị trí đắc địa" },
  { src: img2, caption: "Không gian thoải mái" },
  { src: img3, caption: "Chỉn chu về chất lượng và dịch vụ" },
  { src: img4, caption: "Trải nghiệm thượng lưu" },
  { src: img5, caption: "Cảm xúc mới lạ" },
  { src: img6, caption: "Thực phẩm cao cấp" },
];

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Slideshow
          input={collection}
          ratio={`2:1`}
          mode={`automatic`}
          timeout={`3000`}
        />

      </div>
    );
  }
}
    