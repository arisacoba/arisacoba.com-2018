function getCurrentClass(obj_name){
    return obj_name.className.match(/-s\d+/) + '';
}
function getNextClass(obj_name){
    if (obj_name.nextSibling !== null){
        return obj_name.nextSibling.className.match(/-s\d+/) + '';
    }
    return '';
}
function getPrevClass(obj_name){
    if (obj_name.previousSibling !== null){
        return obj_name.previousSibling.className.match(/-s\d+/) + '';
    }
    return '';
}

$(".center").on("click", ".stack", function() {
    var _begin = '-s0';
    var _end = '-s6';
    var _numOfChildren = $('.center').children().length;
    console.log( 'numOfChildren: ' + _numOfChildren );

    var _current = this;
    var _currentIndex = $(this).index();
    var _currentClass = getCurrentClass(this);


    console.log( '--- index: ' +  _currentIndex + ' current: ' + _currentClass );

    //$(this).removeClass($currentClass).addClass( $begin )

    $(_current).removeClass( getCurrentClass(_current) ).addClass( _begin );

    var _next = _current.nextSibling;
    var _prev = _current.previousSibling;
    var _nextIndex = 0;
    var _prevIndex = _currentIndex;

    // loop on next siblings
    if ( _next !== null ){
        while( _next !== null ){
            var _nextIndex = _nextIndex + 1 ;
            $(_next).removeClass( getCurrentClass(_next) ).addClass( '-s' + _nextIndex );
            var _next = _next.nextSibling;
        }
    }

    // loop on previous siblings
    if ( _currentIndex > 0 ){
        var _inCount = _numOfChildren;

        while( _currentIndex !== 0 ){
            var _prevIndex = _inCount - 1;
            $(_prev).removeClass( getCurrentClass(_prev) ).addClass( '-s' + _prevIndex );
            var _prev = _prev.previousSibling;
            var _inCount = _inCount - 1;
            var _currentIndex = _currentIndex - 1;
        }

    }
});
