// Circles
// Copyright (c) Alan Hardman 2012

$(document).scroll(function(){return false});
$(function(){
	$('#menu,#score,#help,#lose').css('visibility','hidden');
	window.hs = 0;
	window.db = openDatabase("score","0.1","High score records",1024);
	if(!window.db) {
		alert('Unable to initialize High Score database.');
	} else {
		if(!localStorage.getItem('hs'))
			localStorage.setItem('hs',0);
		window.hs = localStorage.getItem('hs');
		$('#m_hs').text('High Score: ' + window.hs);
	}
	$('#menu').css('visibility','visible');
	$('#menu').removeClass('hidden');
});
function showHelp() {
	$('#help').css('visibility','visible');
	$('#help').removeClass('hidden');
}
function hideHelp() {
	setTimeout(function(){$('#help').css('visibility','hidden');},500);
	$('#help').addClass('hidden');
}
function newGame() {
	window.circles = 0;
	$('#game').empty();
	addCircle();
	setTimeout(function(){$('#menu,#lose').css('visibility','hidden');},500);
	$('#menu,#lose').addClass('hidden');
}
function nextLevel() {
	addCircle();
	setTimeout(function(){$('#score').css('visibility','hidden');},500);
	$('#score').addClass('hidden');
}
function addCircle() {
	window.circles ++;
	var c = $('<div>');
	c.addClass('c');
	var s = Math.floor(Math.random()*48)+24;
	var w = 320;
	var h = 460;
	c.css({
		width: s,
		height: s,
		top: Math.floor(Math.random()*(h-s-1)) + 'px',
		left: Math.floor(Math.random()*(w-s-1)) + 'px'
	});
	c.attr('onclick','tapCircle('+window.circles+')');
	$('#game').append(c);
}
function tapCircle(i) {
	if(i==window.circles) {
		if(window.circles > window.hs) {
			window.hs = window.circles;
			$('#s_hs').text('New High Score!');
			localStorage.setItem('hs',window.hs);
		}
		$('#curscore,#lose_score').text(window.circles);
		$('#score').css('visibility','visible');
		$('#score').removeClass('hidden');
	} else {
		$('#lose').css('visibility','visible');
		$('#lose').removeClass('hidden');
	}
}