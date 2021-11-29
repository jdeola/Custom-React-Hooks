import React, { useState, useEffect, useRef } from 'react'

const options = {
        root: null,
        rootMargin: "0px",
        threshold: 1
    };

// initialize hook with options object like above
const useElementObserver = (options) => {

    const containerRef = useRef(null)
    const [ isVisible, setIsVisible ] = useState(false)

    // callback recieves arraw of observer entries, 
    // check 1st entry and set to visible if true
    const callbackFunction = (entries) => {
        const [ entry ] = entries
        setIsVisible(entry.isInteresecting)
    }
    
    useEffect(() => {
        const observer = new IntersectionObserver(callbackFunction, options);
        if (containerRef.current) observer.observe(containerRef.current);

        // optional clean up function when component unmounts
        return () => {
            if(containerRef.current) observer.unobserve(containerRef.current)
        }
    }, [containerRef, options])

    return [containerRef, isVisible]
}

// example implementation in html -- set ref equal to useRef variable
    // <div classname="app">
    //     <div className="isVisible">
    //         { isVisible ? "in viewport" : "not in viewport"}
    //     </div>
    //     <div className="section"></div>

    //     {/* here we set useRef variable on element to observe */}
    //     <div className="box" ref={containerRef}>
    //         this div box is being observed 
    //     </div>
    // </div>
//

const addAnimationClass = (el, animation) => {
    let element = document.getElementById("el");
    element.classList.add("animation");
};

export { useElementObserver, addAnimationClass} 