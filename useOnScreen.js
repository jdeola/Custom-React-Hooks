// custom React hook using Intersection Observer API

export default function useOnScreen(ref) {  
    const [isIntersecting, setIntersecting] = React.useState(false);  
    const observer = new IntersectionObserver(([entry]) =>  
  setIntersecting(entry.isIntersecting)  
    );  
    React.useEffect(() => {  
        observer.observe(ref.current);  
        // Remove the observer as soon as the component is unmounted  
        return () => {  
            observer.disconnect();  
        };  
    }, []);  
    return isIntersecting;  
  }

//   Example Usage :

const ArticleImage = ({ children }) => {
    const ref = React.useRef();
    const isVisible = useOnScreen(ref);
    const [isOnScreen, setIsOnScreen] = React.useState(false);
    if(!!isVisible && !isOnScreen){
            setIsOnScreen(true);
    }
    return (
        <div
        ref={ref}
        className={`${ArticleImageStyles} ${isOnScreen ? ImageInView : ""}`}
        >
        {children}
        </div>
    );
};