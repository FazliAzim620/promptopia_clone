import Link from "next/link";
import React, { useState } from "react";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col py-3">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world. and let your
        imagination run wild with any AI-powerd platform.
      </p>
      <form onSubmit={handleSubmit} className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
        <label className="font-satoshi font-semibold text-base text-gray-700 ">
         <span>You AI Prompt</span>
         <textarea value={post.prompt} onChange={(e)=>setPost({...post,prompt:e.target.value})} placeholder="write your prompt here..." required className="form_textarea min-h-[80px]"></textarea>
        </label>
        <label className="font-satoshi font-semibold text-base text-gray-700 ">
         <span>Tag{' '}
            <span className="font-normal text-slate-400">#products,#webdevelopment</span>

         </span>
         <input value={post.tag} onChange={(e)=>setPost({...post,tag:e.target.value})} placeholder="#tag" required className="form_input"></input>
        </label>
        <div className="flex justify-end items-center mx-3 mb-5 gap-4 ">
            <Link href='/' className='text-gray-500 text-sm'>cancel</Link>
            <button type="submit" className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white">
                {submitting?`${type}...`:type}
            </button>

        </div>
      </form>
    </section>
  );
};

export default Form;
