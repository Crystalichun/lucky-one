!(function(){
    'use strict';

    var file_num = 43;
    var photo_row = 6;
    var photo_col = 10;
    var photo_num = photo_row * photo_col;
    var gallery = $('#gallery');
    var photos = [];
	var randomStaffIds = [];
	
	function getRandomStaffId(){
		var id = staffIds[Math.ceil(Math.random()*staffIds.length)-1];
		if(id==null)
			return "EMPTY";
		else
			return id;
	}
	
	function removeStaff(id){
		 staffIds = $.grep(staffIds, function(value) {
			return value != id;
		 });
	}

	for (var i=1; i<=photo_num; i++){
		photos.push('photo/'+Math.ceil(Math.random()*file_num)+'.jpg');
	}

	
	var loadedIndex = 1;
	$.each(photos, function(index, photo){
		var img = document.createElement('img');
		var link = document.createElement('a');
		var li = document.createElement('li');
		var span = document.createElement('span');
		span.innerHTML = randomStaffIds[0];
		span.setAttribute("style","width:" + (window.innerWidth-100)/10+ "px; line-height:" + (window.innerHeight-100)/6 + "px;");
		link.href = 'javascript:;';
		link.appendChild(img);
		link.appendChild(span);

		li.appendChild(link);

		gallery[0].appendChild(li);

		img.onload = function(e){
			img.onload = null;
			setTimeout( function(){
				$(li).addClass('loaded');
			}, 10*loadedIndex++);
		};

		img.src = photo;
		img.setAttribute("id",randomStaffIds[index]);
	});
    
    var timer_big, timer_small;
    var timer_small_slow = setInterval(function(){
        $('#gallery li:eq('+Math.ceil(Math.random()*photo_num)+')')
            .addClass('animated bounce')
            .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                $(this)
                    .removeClass('animated bounce')
                    .find('img')
                    .attr('src','photo/'+Math.ceil(Math.random()*file_num)+'.jpg')

            });
    },100);

    $(document).keypress(function(event){
        if(event.which == 13 || event.which == 32) {
            $('#action').click();
        }
    });

    $('#action').click(function(){
        if (timer_small_slow){
            clearInterval(timer_small_slow);
        }
        if ($(this).data('action') == 'start'){
            $(this).data('action','stop').html('Stop');
            timer_big = setInterval(function(){
                $('#gallery li.focus').removeClass('focus hover');
				$('#gallery span.show').removeClass('show');
				var random = Math.ceil(Math.random()*photo_num);
				$('#gallery li:eq('+random+')').addClass('focus');
				$('#gallery span:eq('+random+')')[0].innerHTML=getRandomStaffId();
				$('#gallery span:eq('+random+')').addClass('show');		
            },100);
            timer_small = setInterval(function(){
                $('#gallery li:eq('+Math.ceil(Math.random()*photo_num)+') img').attr('src','photo/'+Math.ceil(Math.random()*file_num)+'.jpg');
            },1);
        }else{
            $(this).data('action','start').html('Go');
            $('#gallery li.focus').addClass('hover');
            clearInterval(timer_big);
            clearInterval(timer_small);
			var id =  $('#gallery span.show')[0].innerHTML;
			removeStaff(id);
        }
    });
})();
