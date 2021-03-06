const mongoose=require('mongoose');
const express=require('express');
const transporter=require('../configs/mailer');
const Schedule=require('../model/schedule.model');

const convert=require('../DateConvert/date')
const router=express.Router();
console.log(new Date())
router.get('/', async(req,res)=>{
    try {
        const schedules=await Schedule.find();
        res.status(200).json({schedules});
    } catch (error) {
        res.status(400).json(error.message)
    }
})
router.post('/',async(req,res)=>{
    try {
      
        //FOR ARRAY INPUT
        if(Array.isArray(req.body)){
            const schedules=await Schedule.create(req.body);
            schedules.forEach(el => {
                
                let message={
                    to: el.email,
                    subject: el.subject,
                    text: el.body,
                }
                if(el.time==="now"){
                    transporter.sendMail(message,((er,info)=>{
                        if(er){
                            console.log(er)
                        }else{
                            console.log(info)
                        }
                    }));
                }
               else if(el.time.slice(2)==="hour later" || el.time.slice(2)==="hours later"){
                    var curr=new Date();
                    curr.setHours(curr.getHours() + Number(el.time[0]));
                    console.log("hour"+(curr-new Date().getTime()));
                    setTimeout(()=>{
                        transporter.sendMail(message,((er,info)=>{
                            if(er){
                                console.log(er)
                            }else{
                                console.log(info)
                            }
                        }));
                    },((curr.getTime())-new Date().getTime()))
                        
                    
                }
                else{
                    var curr=convert(el.time).getTime();
                    
                    console.log("MIN"+(curr-new Date().getTime()));
                    setTimeout(()=>{
                        transporter.sendMail(message,((er,info)=>{
                            if(er){
                                console.log(er)
                            }else{
                                console.log(info)
                            }
                        }));
                    },(curr-new Date().getTime())/160);
                }
            });
            res.status(201).json({schedules});
        }
        //FOR OBJECT TYPE INPUT (SINGLE)
        else{
        const schedules=await Schedule.create(req.body);
        const message = {
            to: req.body.email,
            subject: req.body.subject,
            text: req.body.body,
          };
          console.log(req.body.time)
          if(req.body.time==="now"){
            transporter.sendMail(message,((er,info)=>{
                if(er){
                    console.log(er)
                }else{
                    console.log(info)
                }
            }));
        }
       else if(req.body.time.slice(2)==="hour later" || req.body.time.slice(2)==="hours later"){
            var curr=new Date();
            curr.setHours(curr.getHours() + Number(req.body.time[0]));
            console.log("MIN"+(curr.getTime()-new Date().getTime()));
            setTimeout(()=>{
                transporter.sendMail(message,((er,info)=>{
                    if(er){
                        console.log(er)
                    }else{
                        console.log(info)
                    }
                }));
            },(curr.getTime()-new Date().getTime()))
        }
        else{
            var curr=convert(req.body.time);
            console.log(curr.getTime()-new Date().getTime())
            setTimeout(()=>{
                transporter.sendMail(message,((er,info)=>{
                    if(er){
                        console.log(er)
                    }else{
                        console.log(info)
                    }
                }));
            },(curr.getTime()-new Date().getTime())/160)
        }
        res.status(201).json({schedules});
    }
    } catch (error) {
        res.status(400).json(error.message);
    }
});
module.exports=router;
