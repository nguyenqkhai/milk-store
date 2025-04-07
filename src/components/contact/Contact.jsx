import shipper from '/src/assets/shipper.webp';
import bgcity from '/src/assets/bgcity5.jpg';
import milkstore from '/src/assets/store2.png';
import milkstore2 from '/src/assets/milkstore.jpg';
import { MdLocalPhone } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { Carousel } from 'antd';
import { IoHome } from "react-icons/io5";
import { FaMotorcycle } from "react-icons/fa";
import { IoIosWifi } from "react-icons/io";
import { MdLaptopMac } from "react-icons/md";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { MdSecurity } from "react-icons/md";
import { MdPolicy } from "react-icons/md";
import { MdPayment } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import Footer from '../footer/Footer';

const utilities = [
    { icon: <FaMotorcycle className="size-15 mb-2 text-red-500" />, label: "Giữ xe miễn phí" },
    { icon: <IoIosWifi className="size-15 mb-2 text-red-500" />, label: "Wifi miễn phí" },
    { icon: <MdLaptopMac className="size-15 mb-2 text-red-500" />, label: <>Xem và trải nghiệm<br />sản phẩm miễn phí</> },
    { icon: <IoChatbubbleEllipsesSharp className="size-15 mb-2 text-red-500" />, label: <>Được tư vấn chuyên sâu<br />về sản phẩm và dịch vụ</> },
    { icon: <MdSecurity className="size-15 mb-2 text-red-500" />, label: <>Sản phẩm<br />chính hãng 100%</> },
    { icon: <MdPolicy className="size-15 mb-2 text-red-500" />, label: <>Có chính sách<br />bán hàng trả góp</> },
    { icon: <MdPayment className="size-15 mb-2 text-red-500" />, label: "Thanh toán dễ dàng" },
    { icon: <TbTruckDelivery className="size-15 mb-2 text-red-500" />, label: "Giao hàng tận nhà" },
];
const urlImg = [
    { img: milkstore2, alt: "image1" },
    { img: milkstore2, alt: "image2" },
    { img: milkstore2, alt: "image3" }
];
const Contact = () => {
    const scrollToSection = () => {
        const target = document.getElementById('target-section');
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center" style={{ backgroundImage: `url(${bgcity})` }}>
            {/* <div className="absolute inset-0 bg-white/60"></div> */}
            <div className="absolute left-5 top-40 w-[95vw]">
                <div className='w-full'>
                    <h1 className="font-bold text-4xl">HỆ THỐNG SHOWROOM MILKSTORE</h1>
                    <h1 className="mt-2 font-semibold text-xl">Địa điểm trải nghiệm và mua sắm sữa uống chất lượng</h1>
                    <button
                        onClick={scrollToSection}
                        className="mt-8 px-10 py-3 bg-blue-600 font-semibold text-2xl text-white rounded-xl hover:bg-blue-700 transition"
                    >
                        XEM NGAY
                    </button>
                    <img src={shipper} alt="shipper" className='absolute h-[240px] bottom-[-175px]  animate-moveRight' />
                    <img src={milkstore} alt="store" className='absolute h-[350px] bottom-[-190px]  right-0' />
                    <img src={milkstore} alt="store" className='absolute h-[280px] bottom-[-180px] right-73' />

                </div>
            </div>
            <div className="w-full absolute -mt-230">
                <hr className="border-t-12 border-gray-700" />
            </div>
          
            <div className="h-[70vh]" /> {/*Tạo khoảng trống để có cái để cuộn*/}
            <div
                id="target-section"
                className="w-full bg-gray-200 flex flex-col items-center justify-center"
            >
                <div className="w-full flex flex-col lg:flex-row gap-6 p-6 mt-20">
                    <div className="w-full lg:w-1/2 p-6 bg-white shadow-lg rounded-lg">
                        <h2 className="text-2xl text-blue-900 font-medium mb-3">MILKSTORE</h2>
                        <p className="text-blue-900 mb-4 font-semibold text-5xl">LẠC LONG QUÂN</p>
                        <hr className='border-t-5 p-2 w-40' />
                        <div className="space-y-3 text-gray-700">
                            <p className="flex items-center font-semibold">
                                <MdLocalPhone className='mr-2 size-5 text-blue-500' />
                                09779796975
                            </p>

                            <p className="flex items-center font-semibold">
                                <FaCalendarAlt className="mr-2 size-5 text-red-500" />
                                Thời gian làm việc: 8:00 - 21:00 | Thứ 2 - Chủ Nhật
                            </p>
                            <p className="flex items-center font-semibold">
                                < IoHome className="mr-2 size-5 text-green-500" />
                                129/1T Lạc Long Quân P.1, Q.11, TP.HCM
                            </p>
                        </div>

                        {/* Google Maps */}
                        <div className="mt-4">
                            <iframe
                                className="w-full h-64 rounded-lg shadow-md"
                                src="https://www.google.com/maps?q=10.758142236592212,106.63786218934307&z=16&output=embed"
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 p-6 bg-blue-500 shadow-lg rounded-lg flex flex-col items-center">
                        <div className="mt-6 max-w-full border-white border-6 rounded-sm">
                            <Carousel arrows infinite={true} autoplay={true} autoplaySpeed={3000} >
                                {urlImg.map((item, index) => (
                                    <div key={index}>
                                        <img src={item.img} alt={item.alt} className="w-full h-85 object-cover " />
                                    </div>
                                ))}
                            </Carousel>
                        </div>
                        <div className='mt-3 w-full'>
                            <p className="flex items-center text-white font-semibold">
                                <IoLocationSharp className="mr-2 size-15 text-white" />
                                <div className='flex flex-col mt-5'>
                                    <span className='text-2xl'>129/1T Lạc Long Quân</span>
                                    <span className='text-xl'>Phường 1, Quận 11, Thành phố Hồ Chí Minh</span>
                                </div>

                            </p>
                        </div>
                    </div>

                </div>
                <div className="w-full px-6 mt-6 flex flex-col items-center">
                    <h2 className="text-blue-950 text-5xl mb-6 font-semibold">
                        CÁC TIỆN ÍCH TẠI SHOWROOM MILKSTORE
                    </h2>
                    <div className="grid grid-cols-4 gap-6 gap-y-8">
                        {utilities.map((item, index) => (
                            <div key={index} className="flex flex-col items-center text-xl font-medium text-blue-950 text-center">
                                {item.icon}
                                {item.label}
                            </div>
                        ))}
                    </div>
                </div>
                <div className='w-full'>
                    <Footer />
                </div>
            </div>
        </div>
    );
}
export default Contact;