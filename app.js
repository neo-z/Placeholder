var Placeholder=require('./lib/placeholder.js');
// var gm=require('gm');
var fs=require('fs');
var path=require('path');

var express=require('express');
var app=express();

app.get('/',function(req,res){
	res.send('welcome access!!');
})

app.get('/:w/:h',function(req,res){

	var ph,
		w,
		h;

	w=req.params.w;
	h=req.params.h;

	ph=new Placeholder({
		width:w,
		height:h
	});

	ph.render(res);

});

app.get('/:w/:h/:b/:f',function(req,res){

	var ph,
		w,
		h,
		b,
		f;

	w=req.params.w;
	h=req.params.h;
	b=req.params.b;
	f=req.params.f;

	ph=new Placeholder({
		width:w,
		height:h,
		backgroundColor:b,
		textColor:f
	});

	ph.render(res);

});


var server=app.listen(8078,function(){

	var host=server.address().address;
	var port =server.address().port;

 	console.log('Example app listening at http://%s:%s', host, port);
});

