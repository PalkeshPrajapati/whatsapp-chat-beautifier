"use client"
import React from 'react'
import { useChatContentContext } from '@/context/ChatContentContext'
import Stage0UploadFile from './components/Stage0UploadFile'
import Stage1SelectSender from './components/Stage1SelectSender'
import Stage2Chat from './components/Stage2Chat'

const Home = () => {
  const {stage} = useChatContentContext();
  return (
    <>
      {stage==0 && <Stage0UploadFile/>}
      {stage==1 && <Stage1SelectSender/>}
      {stage==2 && <Stage2Chat/>}
    </>
  )
}

export default Home
