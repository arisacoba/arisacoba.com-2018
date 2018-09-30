function getCurrentClass(obj_name){
    return obj_name.className.match(/-s\d+/) + '';
}

function removeClass(obj,className){
    if (obj.classList){
        obj.classList.remove(className);
    } else{
        obj.className = obj.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
}

function addClass(obj,className){
    if (obj.classList){
        obj.classList.add(className);
    } else{
        obj.className += ' ' + className;
    }
}

function fixStacking(obj,ind,numOfChildren){
    let _begin = '-s0',
        _end = '-s' + (numOfChildren - 1),
        _current = obj,
        _currentIndex = ind,
        _currentClass = getCurrentClass(obj),
        _next = obj.nextSibling,
        _prev = obj.previousSibling,
        _nextIndex = 0,
        _prevIndex = _currentIndex,
        _inCount = numOfChildren;

    if ( getCurrentClass(_current) === _begin ){
        removeClass( _current,getCurrentClass(_current) );
        addClass( _current,_end );

        _nextIndex = -1;
        _inCount -= 1;
    }else{
        removeClass( _current,getCurrentClass(_current) );
        addClass( _current,_begin );
    }

    // loop on next siblings
    if ( _next !== null ){
        while( _next !== null ){
            _nextIndex += 1 ;
            removeClass( _next,getCurrentClass(_next) );
            addClass( _next,'-s' + _nextIndex );
            _next = _next.nextSibling;
        }
    }

    // loop on previous siblings
    if ( _currentIndex > 0 ){
        while( _currentIndex !== 0 ){
            _prevIndex = _inCount - 1;
            removeClass( _prev,getCurrentClass(_prev) );
            addClass( _prev, '-s' + _prevIndex );

            _prev = _prev.previousSibling;
            _inCount -= 1;
            _currentIndex -= 1;
        }
    }
}

let el = document.getElementsByClassName('stack');

for(let i=0; i < el.length; i++){
    el[i].addEventListener('click', function(event){
        fixStacking(this,i,el.length);
    });
}

// enable arrow keys

function indexInClass(collection, node) {
  for (var i = 0; i < collection.length; i++) {
    if (collection[i] === node)
      return i;
  }
  return -1;
}

window.addEventListener("keydown", checkKeyPressed);

function checkKeyPressed(e){
    let active = document.getElementsByClassName('-s0');

    if (e.keyCode == '37') {
       // left arrow
    }
    else if (e.keyCode == '39' || e.keyCode == '74' || e.keyCode == '76') {
       // right arrow
       fixStacking(active[0], indexInClass(el, active[0]), el.length);
    }
}
