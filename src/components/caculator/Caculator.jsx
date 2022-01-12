import React,{useRef,useEffect,useState} from 'react';
import {btns,BTN_ACTIONS} from './btnConfig'
import './caculator.css'
const Caculator = () => {
    let expRef=useRef(null)
    let btnsRef=useRef(null);
    const [expresstion, setExpresstion] = useState('')
    useEffect(()=>{
        let btns=Array.from(btnsRef.current.querySelectorAll('button'));
        btns.forEach((btn)=>btn.style.height=btn.offsetWidth+'px')
    });
    const buttonClick = item=>{
        let expDiv= expRef.current;
        if(item.action===BTN_ACTIONS.THEME){
            document.body.classList.toggle('dark');
        }
        if(item.action===BTN_ACTIONS.ADD){
            addAnimSpan(item.display);
            let oper= item.display!=='x'?item.display:'*';
            setExpresstion(expresstion+oper);
        }
        if(item.action===BTN_ACTIONS.DELETE){
            expDiv.innerHTML='';
            setExpresstion('');
            expDiv.parentNode.querySelector('div:last-child').innerHTML=''
        }
        if(item.action===BTN_ACTIONS.CALC){
            if(expresstion.trim().length<=0){
                return;
            }
            let cloneNode=expDiv.cloneNode(true);
            expDiv.parentNode.querySelector('div:last-child').remove()
            expDiv.parentNode.appendChild(cloneNode);
            console.log([expDiv])
            let transform =`translateY(${-(cloneNode.offsetHeight + 10)+'px'}) scale(0.6)`;
            console.log(transform)
            try{
                let res=eval(expresstion);
                setExpresstion(res.toString());
                setTimeout(()=>{
                    cloneNode.style.transform=transform;
                    expDiv.innerHTML='';
                    addAnimSpan(Math.floor(res*100000000)/100000000);
                },200)
            }catch{
                setTimeout(()=>{
                    cloneNode.style.transform=transform;
                    expDiv.innerHTML='syntax err'
                },200)
                
            }
            
        }
    }
    const addAnimSpan = context=>{
        let expDiv= expRef.current;
        let span=document.createElement('span');
        span.innerHTML=context;
        span.style.opacity='0';
        expDiv.appendChild(span);
        let width=span.offsetWidth +'px';
        span.style.width='0';
        setTimeout(()=>{
            span.style.opacity='1';
            span.style.width=width;
        },100)
    }
    return (
        <div className='caculator'>
            <div className="caculator__result">
                <div className="caculator__result__exp" ref={expRef} ></div>
                <div className="caculator__result__exp"></div>
            </div>
            <div className="caculator__btns" ref={btnsRef}>
                {btns.map((item,index)=><button key={index} onClick={()=>buttonClick(item)} className={item.class}>{item.display}</button>)}
            </div>
        </div>
    )
}

export default Caculator