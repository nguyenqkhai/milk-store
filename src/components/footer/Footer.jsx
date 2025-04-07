import React from 'react';
import { FaFacebookF } from "react-icons/fa";
import GHN from "/src/assets/GHN.webp";
import EMS from "/src/assets/ems.png";
import zalo from "/src/assets/zalo.webp";
import face from "/src/assets/facebook.png";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-8 mt-10">
            <div className="container px-4 grid mx-auto grid-cols-1 md:grid-cols-4 gap-10">

                {/* Danh mục hàng */}
                <div>
                    <h3 className="text-xl font-bold mb-4 text-blue-400">Danh mục hàng</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-blue-300">Sữa bột</a></li>
                        <li><a href="#" className="hover:text-blue-300">Sữa tươi</a></li>
                        <li><a href="#" className="hover:text-blue-300">Sữa hạt</a></li>
                        <li><a href="#" className="hover:text-blue-300">Thực phẩm bổ sung</a></li>
                    </ul>
                </div>

                {/* Thông tin */}
                <div>
                    <h3 className="text-xl font-bold mb-4 text-blue-400">Thông tin</h3>
                    <ul className="space-y-2">
                            <li><a href="#" className="hover:text-blue-300">Hướng dẫn mua hàng</a></li>
                        <li><a href="#" className="hover:text-blue-300">Hình thức thanh toán</a></li>
                        <li><a href="#" className="hover:text-blue-300">Chính sách vận chuyển</a></li>
                        <li><a href="#" className="hover:text-blue-300">Chính sách trả hàng</a></li>
                    </ul>
                </div>
                {/* Hỗ trợ & Ứng dụng */}
                <div>
                    <h3 className="text-xl font-bold mb-4 text-blue-400">Hỗ trợ khách hàng</h3>
                    <p className=" mb-2">Tổng đài: <span className="font-semibold text-yellow-400">1900 1234</span></p>
                    <p className=" mb-2">Bảo hành: <span className="font-semibold text-yellow-400">1900 4321</span></p>
                    <h4 className=" mb-2">Kết nối với chúng tôi</h4>
                    <div className="flex gap-4 text-2xl items-center">
                        <a href="https://zalo.me/0977769904" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">
                            <img src={zalo} className="h-6"/>
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">
                            <img src={face} className="h-6"/>
                        </a>
                    </div>
                </div>
                {/* Đơn vị vận chuyển */}
                <div>
                    <h3 className="text-xl font-bold mb-4 text-blue-400">Đơn vị vận chuyển</h3>
                    <div className="flex gap-4 items-center">
                        <img src={GHN} alt="GHN" className="h-15 w-auto" />
                        <img src={EMS} alt="EMS" className="h-15 w-auto" />     
                    </div>
                </div>
            </div>
            <div className="text-center text-sm mt-4 border-t border-gray-700 pt-4">
                © 2025 MilkStore. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
