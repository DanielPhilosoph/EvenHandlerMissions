'use strict';

// Here's a brief sketch of the class
// with things that you'll need anyway
class HoverIntent {

  constructor({
    sensitivity = 0.1, // speed less than 0.1px/ms means "hovering over an element"
    interval = 100, // measure mouse speed once per 100ms: calculate the distance between previous and next points
    elem,
    over,
    out
  }) {
    this.sensitivity = sensitivity;
    this.interval = interval;
    this.elem = elem;
    this.over = over;
    this.out = out;  
    this.mouseOnElementFlag = false;
    this.tooltipDisplayFlag = false; 
    
    // make sure "this" is the object in event handlers.
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    this.calculateSpeed = this.calculateSpeed.bind(this);

    // assign the handlers
    elem.addEventListener("mouseover", this.onMouseOver);
    elem.addEventListener("mouseout", this.onMouseOut);
  }
  
  elemetClear()
  {
    //console.log("elementCleared");  
    this.mouseOnElementFlag =false;
    this.elem.removeEventListener('mousemove', this.onMouseMove );
    clearInterval(this.elementInterval);
  }

  

  onMouseOver(event) {
    
    //check wheter this is the first parent over event
    if (this.mouseOnElementFlag != true) {
        
        this.mouseOnElementFlag = true;
        elem.addEventListener('mousemove', this.onMouseMove);        
        this.elementInterval = setInterval(this.calculateSpeed,this.interval);
        this.prevX = event.pageX;
        this.prevY = event.pageY;
    }
  }

  calculateSpeed(){
    //calculate interval speed
    
    let intervalDistance = Math.sqrt( (this.prevX-this.lastX)**2 + (this.prevY-this.lastY)**2 );
    if (this.sensitivity > intervalDistance/this.interval) {
        if (this.tooltipDisplayFlag == false) {
            this.over();
            this.tooltipDisplayFlag = true;
            this.elemetClear();       
        }
    }
    else {
         this.prevX = this.lastX;
         this.prevY = this.lastY;
     }
   }

  onMouseOut(event) {
    
    if (!event.relatedTarget || !elem.contains(event.relatedTarget)) {
        
        
        if (this.tooltipDisplayFlag == true) {
            this.elemetClear();
            this.tooltipDisplayFlag = false; 
            this.out(); 
        }
    }   
        
  }

  onMouseMove(event) {    
    this.lastX = event.pageX;
    this.lastY = event.pageY;    
  }

  

  destroy() {
    /* your code to "disable" the functionality, remove all handlers */
    /* it's needed for the tests to work */
    elem.removeEventListener('mousemove', this.onMouseMove);
    elem.removeEventListener('mouseover', this.onMouseOver);
    elem.removeEventListener('mouseout', this.onMouseOut);
    if (this.tooltipDisplayFlag == true) 
        this.elemetClear();
  }

}