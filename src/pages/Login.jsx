import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import milkstore from '/src/assets/milkstore.jpg';
// const onFinish = (values) => {
//     console.log('Success:', values);
// };

// const onFinishFailed = (errorInfo) => {
//     console.log('Failed:', errorInfo);
// };

function Login() {
    return (
        <div className="h-screen">
            <div className="h-full bg-gradient-to-b from-[#4A90E2] to-[#1E3A8A] flex justify-center items-center ">
                <div className="flex flex-col gap-8 bg-white py-10 px-10 rounded-tl-2xl rounded-bl-2xl shadow-2xl">
                    <h1 className="text-5xl text-center font-bold">Welcome</h1>

                    <Form
                        className='flex flex-col gap-1'
                        name="basic"
                        labelCol={{ span: 7 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 600 }}
                        initialValues={{ remember: true }}
                        // onFinish={onFinish}
                        // onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <div className="flex justify-center">
                            <button className=" bg-blue-500 hover:bg-blue-600 text-white border-blue-500 border-2 py-1 px-[112px] rounded-md">
                                Login
                            </button>
                        </div>
                        
                    </Form>
                    <hr/>
                    <div className='flex'>
                        <span className=''>Don't have account?</span>
                        <button className="text-sm ml-12 bg-blue-500 hover:bg-blue-600 text-white border-blue-500 border-2 py-[2px] px-[15px] rounded-md">
                                Register
                        </button>
                    </div>

                </div>
                <img src={milkstore} alt="" className='block-hidden w-[450px] h-[407px] object-cover rounded-tr-2xl rounded-br-2xl' />
            </div>
        </div>
    );
}

export default Login;
