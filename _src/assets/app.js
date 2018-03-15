function getCurrentClass(obj_name){
    return obj_name.className.match(/-s\d+/) + '';
}

$(".center").on("click", ".stack", function() {
    var _begin = '-s0';
    var _end = '-s6';
    var _numOfChildren = $('.center').children().length;

    var _current = this;
    var _currentIndex = $(this).index();
    var _currentClass = getCurrentClass(this);

    console.log( '--- index: ' +  _currentIndex + ' current: ' + _currentClass );

    var _next = _current.nextSibling;
    var _prev = _current.previousSibling;
    var _nextIndex = 0;
    var _prevIndex = _currentIndex;
    var _inCount = _numOfChildren;

    if ( getCurrentClass(_current) === _begin ){
        $(_current).removeClass( getCurrentClass(_current) ).addClass( _end);
        var _nextIndex = -1;
        _inCount -= 1;
    }else{
        $(_current).removeClass( getCurrentClass(_current) ).addClass( _begin );
    }

    // loop on next siblings
    if ( _next !== null ){
        while( _next !== null ){
            _nextIndex += 1 ;
            $(_next).removeClass( getCurrentClass(_next) ).addClass( '-s' + _nextIndex );
            var _next = _next.nextSibling;
        }
    }

    // loop on previous siblings
    if ( _currentIndex > 0 ){
        while( _currentIndex !== 0 ){
            var _prevIndex = _inCount - 1;
            $(_prev).removeClass( getCurrentClass(_prev) ).addClass( '-s' + _prevIndex );
            var _prev = _prev.previousSibling;
            _inCount -= 1;
            _currentIndex -= 1;
        }

    }
});
