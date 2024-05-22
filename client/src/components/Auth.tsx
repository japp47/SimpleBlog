import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupInput } from "@jappreet/blogs-common";
import axios from "axios";
import { BACKEND } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const [blogInput, setBlogInput] = useState<SignupInput>({
        name: "",
        email: "",
        password: ""
    });

    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, blogInput);
            const jwt = response.data;
            localStorage.setItem("token", jwt);
            navigate("/blogs");
        } catch(e) {
            alert("Error while signing up")
        }
    }

    
    return <div className="h-screen flex justify-center flex-col">
        
        <div className="flex justify-center">
            <div>
                <div className="px-10">
                    <div className="text-6xl font-bold">
                        {type==="signup" ? "Create an account" :"Login to Account"}
                    </div>
                    <div className="text-slate-600 text-lg mt-2">
                        {type === "signin" ? "Don't have an account?" : "Already have an account?" }
                        <Link className="pl-2 underline" to={type === "signin" ? "/signup" : "/signin"}>
                            {type === "signin" ? "Sign Up" : "Sign In"}
                        </Link>
                    </div>
                </div>
                <div className="pt-8">
                     {type==="signup" ? <LabelledInput label="Name" placeholder="Jappreet Singh" onChange={(e) => {
                        setBlogInput({
                            ...blogInput,
                            name: e.target.value
                        })
                    }} />:null}
                    <LabelledInput label="Username" placeholder="example@gmail.com" onChange={(e) => {
                        setBlogInput({
                            ...blogInput,
                            email: e.target.value
                        })
                    }} />
                    <LabelledInput label="Password" type={"password"} placeholder="abcd@1234" onChange={(e) => {
                        setBlogInput({
                            ...blogInput,
                            password: e.target.value
                        })
                    }} />
                    <button 
                        onClick={sendRequest} 
                        type="button" 
                        className="mt-8 w-full text-lg text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                        {type === "signup"? "Sign up" : "Sign in"}
                    </button>
                </div>
            </div>
        </div>
    </div>
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
    return <div className="mb-5">
        <label className="block mb-2 text-lg text-black font-semibold">{label}</label>
        <input 
        onChange={onChange} 
        type={type || "text"} id="first_name" 
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 shadow-md" placeholder={placeholder} required />
    </div>
}